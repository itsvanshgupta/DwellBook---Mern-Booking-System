const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const hostMiddleware = require("../middleware/hostMiddleware"); // ⭐ STEP 3
const upload = require("../middleware/uploadMiddleware");

const {
  createListing,
  getFilteredListings,
  getListingById,
} = require("../controllers/listingController");

// =======================
// GET LISTINGS (PUBLIC)
// Search + Filter + Sort + Pagination
// =======================
router.get("/", getFilteredListings);

// =======================
// GET LISTING BY ID (PUBLIC)
// =======================
router.get("/:id", getListingById);

// =======================
// CREATE LISTING (HOST ONLY)
// =======================
router.post(
  "/create",
  authMiddleware,      // user must be logged in
  hostMiddleware,      // ⭐ user must be HOST
  upload.array("images", 5),
  createListing
);

module.exports = router;
