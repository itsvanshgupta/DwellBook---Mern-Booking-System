const Review = require("../models/Review");
const Listing = require("../models/Listing");

// =======================
// ADD REVIEW (PART 1)
// =======================
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const listingId = req.params.listingId;
    const userId = req.userId;

    // Prevent duplicate review
    const existingReview = await Review.findOne({
      user: userId,
      listing: listingId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this listing",
      });
    }

    // Create review
    const review = await Review.create({
      rating,
      comment,
      user: userId,
      listing: listingId,
    });

    // ⭐ Recalculate average rating
    const reviews = await Review.find({ listing: listingId });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Listing.findByIdAndUpdate(listingId, {
      averageRating: Number(avgRating.toFixed(1)),
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
      averageRating: avgRating.toFixed(1),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================
// GET REVIEWS FOR LISTING (PART 2)
// =======================
exports.getReviewsForListing = async (req, res) => {
  try {
    const listingId = req.params.listingId;

    // Fetch all reviews for this listing
    const reviews = await Review.find({ listing: listingId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Calculate average rating
    let avgRating = 0;

    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      avgRating = (totalRating / reviews.length).toFixed(1);
    }

    res.status(200).json({
      totalReviews: reviews.length,
      averageRating: avgRating,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
