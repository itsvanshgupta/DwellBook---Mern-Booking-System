const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createBooking,
  getMyBookings,
  getBookingsForListing,
  cancelBooking,
} = require("../controllers/bookingController");

// 🔥 STATIC ROUTES FIRST
router.get("/my", authMiddleware, getMyBookings);
router.get("/listing/:listingId", authMiddleware, getBookingsForListing);

// 🔥 DYNAMIC ROUTES AFTER
router.post("/:listingId", authMiddleware, createBooking);
router.delete("/:bookingId", authMiddleware, cancelBooking);

module.exports = router;
