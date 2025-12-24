const Listing = require("../models/Listing");
const SearchUtils = require("../utils/searchUtils");
const Review = require("../models/Review");

// Enhanced listing controller with advanced search capabilities
class EnhancedListingController {
  
  // Advanced search with all filters
  static async getAdvancedListings(req, res) {
    try {
      const filters = {
        location: req.query.location,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        minRating: req.query.minRating,
        propertyType: req.query.propertyType,
        guests: req.query.guests,
        bedrooms: req.query.bedrooms,
        bathrooms: req.query.bathrooms,
        amenities: req.query.amenities,
        sort: req.query.sort,
        page: req.query.page,
        limit: req.query.limit
      };
      
      const result = await SearchUtils.searchListings(filters);
      
      res.status(200).json({
        success: true,
        ...result,
        filters: filters
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    }
  }
  
  // Get featured listings
  static async getFeaturedListings(req, res) {
    try {
      const limit = Number(req.query.limit) || 8;
      const listings = await SearchUtils.getFeaturedListings(limit);
      
      res.status(200).json({
        success: true,
        listings
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    }
  }
  
  // Get similar listings
  static async getSimilarListings(req, res) {
    try {
      const { listingId } = req.params;
      const limit = Number(req.query.limit) || 4;
      
      const similar = await SearchUtils.getSimilarListings(listingId, limit);
      
      res.status(200).json({
        success: true,
        listings: similar
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    }
  }
  
  // Get search statistics
  static async getSearchStats(req, res) {
    try {
      const [popularLocations, propertyTypes, priceRange] = await Promise.all([
        SearchUtils.getPopularLocations(),
        SearchUtils.getPropertyTypeStats(),
        SearchUtils.getPriceRangeStats()
      ]);
      
      res.status(200).json({
        success: true,
        stats: {
          popularLocations,
          propertyTypes,
          priceRange
        }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    }
  }
  
  // Enhanced listing details with similar listings
  static async getListingDetails(req, res) {
    try {
      const listingId = req.params.id;
      
      const listing = await Listing.findById(listingId)
        .populate("owner", "name email");
      
      if (!listing) {
        return res.status(404).json({ 
          success: false,
          message: "Listing not found" 
        });
      }
      
      const [reviews, similar] = await Promise.all([
        Review.find({ listing: listingId })
          .populate("user", "name email")
          .sort({ createdAt: -1 }),
        SearchUtils.getSimilarListings(listingId, 4)
      ]);
      
      let averageRating = 0;
      if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        averageRating = Number((totalRating / reviews.length).toFixed(1));
      }
      
      res.status(200).json({
        success: true,
        listing: {
          ...listing.toObject(),
          averageRating,
          reviews
        },
        similarListings: similar
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    }
  }
  
  // Quick search by location
  static async quickSearch(req, res) {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          message: "Search query is required"
        });
      }
      
      const filters = {
        location: query,
        limit: 6
      };
      
      const result = await SearchUtils.searchListings(filters);
      
      res.status(200).json({
        success: true,
        ...result
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    }
  }
}

module.exports = EnhancedListingController;
