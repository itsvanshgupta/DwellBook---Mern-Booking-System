const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  addReview,
  getReviewsForListing,
} = require("../controllers/reviewController");

// Add review
router.post("/:listingId", authMiddleware, addReview);

// Get reviews for a listing
router.get("/:listingId", getReviewsForListing);

module.exports = router;
