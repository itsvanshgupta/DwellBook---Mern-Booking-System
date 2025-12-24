const mongoose = require("mongoose");
const Listing = require("../models/Listing");
const User = require("../models/User");

const sampleListings = [
  {
    title: "Modern Downtown Apartment with City Views",
    description: "Stunning modern apartment in the heart of downtown with panoramic city views. This beautifully designed space features floor-to-ceiling windows, high-end appliances, and contemporary furnishings. Perfect for business travelers or couples looking for a luxury urban experience.",
    price: 185,
    location: "New York, NY",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Sarah Mitchell",
      responseRate: 98,
      superhost: true,
    },
    address: {
      street: "123 5th Avenue",
      city: "New York",
      state: "NY",
      country: "United States",
      zipCode: "10001"
    },
    averageRating: 4.8,
    totalReviews: 127
  },
  {
    title: "Cozy Beachfront Villa in Malibu",
    description: "Luxurious beachfront villa with direct beach access and stunning ocean views. This Mediterranean-style home features private beach access, infinity pool, outdoor kitchen, and beautifully landscaped gardens. Perfect for families or groups seeking a premium coastal experience.",
    price: 450,
    location: "Malibu, CA",
    propertyType: "Villa",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Hot Tub", "Washer", "Dryer", "Beach Access", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit", "Fire Extinguisher"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Michael Chen",
      responseRate: 95,
      superhost: true,
    },
    address: {
      street: "456 Pacific Coast Highway",
      city: "Malibu",
      state: "CA",
      country: "United States",
      zipCode: "90265"
    },
    averageRating: 4.9,
    totalReviews: 89
  },
  {
    title: "Historic Charleston Townhouse",
    description: "Beautifully restored historic townhouse in Charleston's famous historic district. This charming property features original hardwood floors, exposed brick walls, modern kitchen, and private courtyard. Walking distance to finest restaurants, shops, and attractions.",
    price: 225,
    location: "Charleston, SC",
    propertyType: "Townhouse",
    guests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit", "Fire Extinguisher"],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Emily Thompson",
      responseRate: 97,
      superhost: false,
    },
    address: {
      street: "789 Meeting Street",
      city: "Charleston",
      state: "SC",
      country: "United States",
      zipCode: "29401"
    },
    averageRating: 4.7,
    totalReviews: 156
  },
  {
    title: "Mountain Ski Chalet in Aspen",
    description: "Luxury ski chalet with breathtaking mountain views and ski-in/ski-out access. This alpine retreat features stone fireplace, gourmet kitchen, hot tub, and home theater. Perfect for ski enthusiasts and mountain lovers year-round.",
    price: 650,
    location: "Aspen, CO",
    propertyType: "Cabin",
    guests: 10,
    bedrooms: 5,
    beds: 6,
    bathrooms: 4,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Hot Tub", "Gym", "Washer", "Dryer", "Fireplace", "Ski Access", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit", "Fire Extinguisher"],
    images: [
      "https://images.unsplash.com/photo-1571003123894-1fbae78f60b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544480355-a64d9795a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518781716468-8e41e035f9d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "David Anderson",
      responseRate: 94,
      superhost: true,
    },
    address: {
      street: "321 Highland Avenue",
      city: "Aspen",
      state: "CO",
      country: "United States",
      zipCode: "81611"
    },
    averageRating: 4.9,
    totalReviews: 73
  },
  {
    title: "Miami Beach Luxury Condo",
    description: "Stunning oceanfront condo with floor-to-ceiling windows and private beach access. This modern luxury unit features state-of-the-art appliances, marble bathrooms, and resort-style amenities including pool, spa, and fitness center.",
    price: 320,
    location: "Miami Beach, FL",
    propertyType: "Condo",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Hot Tub", "Gym", "Washer", "Dryer", "Beach Access", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817addbffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Isabella Rodriguez",
      responseRate: 99,
      superhost: true,
    },
    address: {
      street: "555 Collins Avenue",
      city: "Miami Beach",
      state: "FL",
      country: "United States",
      zipCode: "33139"
    },
    averageRating: 4.8,
    totalReviews: 201
  },
  {
    title: "Seattle Waterfront Loft",
    description: "Industrial-chic loft with stunning waterfront views and exposed brick walls. This unique space features soaring ceilings, concrete floors, gourmet kitchen, and large private deck. Walking distance to Pike Place Market and downtown attractions.",
    price: 275,
    location: "Seattle, WA",
    propertyType: "Loft",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Washer", "Dryer", "Workspace", "Lake Access", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "James Wilson",
      responseRate: 96,
      superhost: false,
    },
    address: {
      street: "999 Alaskan Way",
      city: "Seattle",
      state: "WA",
      country: "United States",
      zipCode: "98101"
    },
    averageRating: 4.6,
    totalReviews: 94
  },
  {
    title: "Napa Valley Wine Country Estate",
    description: "Elegant estate in the heart of Napa Valley with vineyard views and luxury amenities. This Tuscan-inspired villa features infinity pool, outdoor kitchen, wine cellar, and beautifully landscaped gardens. Perfect for wine enthusiasts and special occasions.",
    price: 525,
    location: "Napa, CA",
    propertyType: "House",
    guests: 12,
    bedrooms: 6,
    beds: 8,
    bathrooms: 5,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Hot Tub", "Gym", "Washer", "Dryer", "Workspace", "Golf Course", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit", "Fire Extinguisher"],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571003123894-1fbae78f60b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Robert Martinez",
      responseRate: 93,
      superhost: true,
    },
    address: {
      street: "777 Silverado Trail",
      city: "Napa",
      state: "CA",
      country: "United States",
      zipCode: "94558"
    },
    averageRating: 4.9,
    totalReviews: 112
  },
  {
    title: "Chicago Magnificent Mile Studio",
    description: "Modern studio in the heart of Chicago's Magnificent Mile with city views. This efficiently designed space features Murphy bed, full kitchen, and luxury building amenities including rooftop pool and fitness center. Perfect for solo travelers or couples.",
    price: 145,
    location: "Chicago, IL",
    propertyType: "Studio",
    guests: 2,
    bedrooms: 0,
    beds: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Pool", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Jennifer Lee",
      responseRate: 97,
      superhost: false,
    },
    address: {
      street: "444 North Michigan Avenue",
      city: "Chicago",
      state: "IL",
      country: "United States",
      zipCode: "60611"
    },
    averageRating: 4.5,
    totalReviews: 183
  }
];

const seedListings = async () => {
  try {
    // Load environment variables
    require('dotenv').config();
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Clear existing listings
    await Listing.deleteMany({});
    console.log("Cleared existing listings");

    // Create a sample user for listings
    let sampleUser = await User.findOne({ email: "sample@dwellbook.com" });
    if (!sampleUser) {
      sampleUser = await User.create({
        name: "Sample Host",
        email: "sample@dwellbook.com",
        password: "password123",
      });
      console.log("Created sample user");
    }

    // Add sample listings
    for (const listingData of sampleListings) {
      const listing = await Listing.create({
        ...listingData,
        owner: sampleUser._id,
        hostingSince: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date within last year
      });
      console.log(`Created listing: ${listing.title}`);
    }

    console.log(`Successfully seeded ${sampleListings.length} listings`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding listings:", error);
    process.exit(1);
  }
};

seedListings();
