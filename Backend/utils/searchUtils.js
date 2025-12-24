const Listing = require("../models/Listing");

// Enhanced search utility functions
class SearchUtils {
  // Build advanced search query
  static buildSearchQuery(filters) {
    const query = {};
    
    // Location search - enhanced with multiple fields and host name
    if (filters.location) {
      query.$or = [
        { location: { $regex: filters.location, $options: "i" } },
        { "address.city": { $regex: filters.location, $options: "i" } },
        { "address.state": { $regex: filters.location, $options: "i" } },
        { "address.country": { $regex: filters.location, $options: "i" } },
        { title: { $regex: filters.location, $options: "i" } },
        { "hostDetails.name": { $regex: filters.location, $options: "i" } }
      ];
    }
    
    // Price range filter
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
    }
    
    // Rating filter
    if (filters.minRating) {
      query.averageRating = { $gte: Number(filters.minRating) };
    }
    
    // Property type filter
    if (filters.propertyType) {
      query.propertyType = filters.propertyType;
    }
    
    // Guest capacity filter
    if (filters.guests) {
      query.guests = { $gte: Number(filters.guests) };
    }
    
    // Bedrooms filter
    if (filters.bedrooms) {
      query.bedrooms = { $gte: Number(filters.bedrooms) };
    }
    
    // Bathrooms filter
    if (filters.bathrooms) {
      query.bathrooms = { $gte: Number(filters.bathrooms) };
    }
    
    // Amenities filter
    if (filters.amenities) {
      const amenityArray = Array.isArray(filters.amenities) 
        ? filters.amenities 
        : [filters.amenities];
      query.amenities = { $in: amenityArray };
    }
    
    return query;
  }
  
  // Enhanced sorting options
  static getSortOptions(sort) {
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating_high: { averageRating: -1 },
      rating_low: { averageRating: 1 },
      reviews_high: { totalReviews: -1 },
      popularity: { averageRating: -1, totalReviews: -1 }
    };
    
    return sortOptions[sort] || sortOptions.newest;
  }
  
  // Get popular locations
  static async getPopularLocations() {
    try {
      const locations = await Listing.aggregate([
        { $group: { _id: "$address.city", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]);
      
      return locations.map(loc => ({
        city: loc._id,
        count: loc.count
      }));
    } catch (error) {
      throw new Error("Error fetching popular locations: " + error.message);
    }
  }
  
  // Get property types with counts
  static async getPropertyTypeStats() {
    try {
      const types = await Listing.aggregate([
        { $group: { _id: "$propertyType", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      
      return types.map(type => ({
        propertyType: type._id,
        count: type.count
      }));
    } catch (error) {
      throw new Error("Error fetching property type stats: " + error.message);
    }
  }
  
  // Get price range statistics
  static async getPriceRangeStats() {
    try {
      const stats = await Listing.aggregate([
        {
          $group: {
            _id: null,
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" },
            avgPrice: { $avg: "$price" }
          }
        }
      ]);
      
      return stats[0] || {
        minPrice: 0,
        maxPrice: 1000,
        avgPrice: 200
      };
    } catch (error) {
      throw new Error("Error fetching price range stats: " + error.message);
    }
  }
  
  // Enhanced listing search with all filters
  static async searchListings(filters = {}) {
    try {
      const query = this.buildSearchQuery(filters);
      const sortOption = this.getSortOptions(filters.sort);
      
      // Pagination
      const page = Number(filters.page) || 1;
      const limit = Number(filters.limit) || 12;
      const skip = (page - 1) * limit;
      
      // Execute queries
      const [listings, total] = await Promise.all([
        Listing.find(query)
          .sort(sortOption)
          .skip(skip)
          .limit(limit)
          .populate("owner", "name email"),
        Listing.countDocuments(query)
      ]);
      
      return {
        listings,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalListings: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        }
      };
    } catch (error) {
      throw new Error("Error searching listings: " + error.message);
    }
  }
  
  // Get similar listings based on property
  static async getSimilarListings(listingId, limit = 4) {
    try {
      const listing = await Listing.findById(listingId);
      if (!listing) {
        throw new Error("Listing not found");
      }
      
      const similar = await Listing.find({
        _id: { $ne: listingId },
        $or: [
          { "address.city": listing.address.city },
          { propertyType: listing.propertyType },
          { 
            price: { 
              $gte: listing.price * 0.7, 
              $lte: listing.price * 1.3 
            }
          }
        ]
      })
      .limit(limit)
      .populate("owner", "name");
      
      return similar;
    } catch (error) {
      throw new Error("Error fetching similar listings: " + error.message);
    }
  }
  
  // Get featured listings (high-rated, recent)
  static async getFeaturedListings(limit = 8) {
    try {
      const featured = await Listing.find({
        averageRating: { $gte: 4.5 },
        totalReviews: { $gte: 10 }
      })
      .sort({ averageRating: -1, totalReviews: -1 })
      .limit(limit)
      .populate("owner", "name");
      
      return featured;
    } catch (error) {
      throw new Error("Error fetching featured listings: " + error.message);
    }
  }
}

module.exports = SearchUtils;
