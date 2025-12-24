const Booking = require("../models/Booking");
const Listing = require("../models/Listing");

// =======================
// CREATE BOOKING (PART 1)
// =======================
exports.createBooking = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.body;
    const listingId = req.params.listingId;
    const userId = req.userId;

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({
        message: "Check-out date must be after check-in date",
      });
    }

    // 1. Check overlapping bookings
    const overlappingBooking = await Booking.findOne({
      listing: listingId,
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) },
    });

    if (overlappingBooking) {
      return res.status(400).json({
        message: "Listing already booked for selected dates",
      });
    }

    // 3. Create booking with full listing information
    const listing = await Listing.findById(listingId);
    const days =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

    const totalPrice = days * listing.price;

    const booking = await Booking.create({
      user: userId,
      listing: listingId,
      checkIn,
      checkOut,
      totalPrice,
      // Store additional listing info for dashboard display
      listingTitle: listing.title,
      listingLocation: listing.location,
      listingImages: listing.images
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET MY BOOKINGS (PART 2)
// =======================
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate("listing", "title location price images")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET BOOKINGS FOR A LISTING (HOST VIEW)
// =======================
exports.getBookingsForListing = async (req, res) => {
  try {
    const listingId = req.params.listingId;

    const bookings = await Booking.find({ listing: listingId })
      .populate("user", "name email")
      .sort({ checkIn: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// CANCEL BOOKING
// =======================
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Only booking owner can cancel
    if (booking.user.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not authorized to cancel this booking",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
