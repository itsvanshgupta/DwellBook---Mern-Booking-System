const Listing = require("../models/Listing");
const cloudinary = require("../config/cloudinary");
const Review = require("../models/Review");
const SearchUtils = require("../utils/searchUtils");

// =======================
// CREATE LISTING
// =======================
exports.createListing = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      price, 
      location,
      propertyType,
      guests,
      bedrooms,
      beds,
      bathrooms,
      amenities,
      address
    } = req.body;

    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "dwellbook_listings" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });

          imageUrls.push(result.secure_url);
        } catch (uploadError) {
          console.error("Cloudinary upload failed:", uploadError);
        }
      }
    }

    // Get user details for host information
    const User = require("../models/User");
    const user = await User.findById(req.userId);

    const listing = await Listing.create({
      title,
      description,
      price,
      location,
      images: imageUrls.length > 0 ? imageUrls : [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      owner: req.userId,
      averageRating: 0, // ⭐ default for new listing
    });

    res.status(201).json({
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFilteredListings = async (req, res) => {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      minRating,
      propertyType,
      guests,
      bedrooms,
      bathrooms,
      amenities,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const filters = {
      location,
      minPrice,
      maxPrice,
      minRating,
      propertyType,
      guests,
      bedrooms,
      bathrooms,
      amenities,
      sort,
      page,
      limit
    };

    const result = await SearchUtils.searchListings(filters);
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET LISTING BY ID
// =======================
exports.getListingById = async (req, res) => {
  try {
    const listingId = req.params.id;

    const listing = await Listing.findById(listingId).populate("owner", "name email");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const reviews = await Review.find({ listing: listingId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    let averageRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      averageRating = Number((totalRating / reviews.length).toFixed(1));
    }

    res.status(200).json({
      ...listing.toObject(),
      averageRating,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
