const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // New DwellBook-like fields
    propertyType: {
      type: String,
      enum: ["Apartment", "House", "Villa", "Condo", "Studio", "Loft", "Townhouse", "Cabin", "Cottage", "Guesthouse"],
      default: "Apartment",
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    amenities: [
      {
        type: String,
        enum: [
          "WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", 
          "Hot Tub", "Gym", "Washer", "Dryer", "Workspace", "Breakfast",
          "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit", "Fire Extinguisher",
          "Beach Access", "Lake Access", "Ski Access", "Golf Course", "Pet Friendly", "Fireplace",
          "Elevator", "Heating", "Balcony", "Dishwasher", "Pocket WiFi", "Traditional Onsen",
          "Japanese Garden", "Tea Ceremony Room", "Marina Access", "Smart Home", "Home Theater",
          "Wine Cellar", "Rooftop Terrace", "Historic Building", "Skytrain Access", "Sea View",
          "Harbour View", "Industrial Design", "Canal View"
        ],
      },
    ],
    hostDetails: {
      name: {
        type: String,
        required: true,
      },
      hostingSince: {
        type: Date,
        default: Date.now,
      },
      responseRate: {
        type: Number,
        default: 95,
        min: 0,
        max: 100,
      },
      superhost: {
        type: Boolean,
        default: false,
      },
    },
    address: {
      street: String,
      city: {
        type: String,
        required: true,
      },
      state: String,
      country: {
        type: String,
        required: true,
        default: "United States",
      },
      zipCode: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
