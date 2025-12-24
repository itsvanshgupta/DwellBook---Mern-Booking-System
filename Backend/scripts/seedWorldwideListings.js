const mongoose = require("mongoose");
const Listing = require("../models/Listing");
const User = require("../models/User");

// Comprehensive worldwide DwellBook-style listings
const worldwideListings = [
  // PARIS PROPERTIES
  {
    title: "Charming Paris Studio near Eiffel Tower",
    description: "Cozy studio apartment in the heart of Paris, just a 5-minute walk from the Eiffel Tower. This beautifully renovated space features exposed wooden beams, modern kitchenette, and stunning city views. Perfect for couples seeking romantic Parisian experience.",
    price: 120,
    location: "Paris, France",
    propertyType: "Studio",
    guests: 2,
    bedrooms: 0,
    beds: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "TV", "Elevator", "Washer", "Heating", "Smoke Alarm", "Carbon Monoxide Alarm"],
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c6486d6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Pierre Dubois",
      responseRate: 98,
      superhost: true,
    },
    address: {
      street: "15 Rue de la Tour Eiffel",
      city: "Paris",
      state: "Île-de-France",
      country: "France",
      zipCode: "75007"
    },
    averageRating: 4.9,
    totalReviews: 234
  },
  {
    title: "Luxury Paris Apartment with Balcony View",
    description: "Elegant 2-bedroom apartment in the prestigious 7th arrondissement with private balcony overlooking Paris rooftops. This spacious residence features high ceilings, marble bathrooms, gourmet kitchen, and is walking distance to Louvre Museum and Champs-Élysées.",
    price: 280,
    location: "Paris, France",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Elevator", "Washer", "Dryer", "Balcony", "Dishwasher", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c6486d6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Sophie Laurent",
      responseRate: 99,
      superhost: true,
    },
    address: {
      street: "42 Avenue Montaigne",
      city: "Paris",
      state: "Île-de-France",
      country: "France",
      zipCode: "75008"
    },
    averageRating: 4.8,
    totalReviews: 189
  },

  // TOKYO PROPERTIES
  {
    title: "Modern Tokyo Apartment in Shibuya",
    description: "Contemporary apartment in the heart of Tokyo's vibrant Shibuya district. This stylish space features Japanese minimalist design, smart home technology, compact but functional kitchen, and is steps away from Shibuya Crossing and trendy shopping areas.",
    price: 150,
    location: "Tokyo, Japan",
    propertyType: "Apartment",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Washer", "Pocket WiFi", "Kitchen", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542051841856-8b932a7741da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Takeshi Yamamoto",
      responseRate: 97,
      superhost: true,
    },
    address: {
      street: "2-24-1 Shibuya",
      city: "Tokyo",
      state: "Shibuya",
      country: "Japan",
      zipCode: "150-0002"
    },
    averageRating: 4.7,
    totalReviews: 312
  },
  {
    title: "Traditional Ryokan Style House in Kyoto",
    description: "Authentic Japanese ryokan experience in historic Kyoto. This traditional house features tatami mat flooring, sliding shoji doors, private onsen bathroom, Japanese garden, and is located near famous temples and bamboo forests.",
    price: 220,
    location: "Kyoto, Japan",
    propertyType: "House",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    amenities: ["WiFi", "Kitchen", "TV", "Traditional Onsen", "Japanese Garden", "Tea Ceremony Room", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542051841856-8b932a7741da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Yuki Tanaka",
      responseRate: 96,
      superhost: true,
    },
    address: {
      street: "123 Gionmachi",
      city: "Kyoto",
      state: "Kyoto Prefecture",
      country: "Japan",
      zipCode: "605-0001"
    },
    averageRating: 4.9,
    totalReviews: 267
  },

  // LONDON PROPERTIES
  {
    title: "Elegant London Flat near Big Ben",
    description: "Sophisticated apartment in Westminster, walking distance to Big Ben, London Eye, and Buckingham Palace. This beautifully decorated space features Victorian architecture, modern amenities, and stunning views of the Thames River.",
    price: 180,
    location: "London, United Kingdom",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Washer", "Dryer", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1518791841210-1a1c89b23ac8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c8ed3e26c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571003123894-1fbae78f60b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "James Smith",
      responseRate: 98,
      superhost: true,
    },
    address: {
      street: "25 Parliament Street",
      city: "London",
      state: "Westminster",
      country: "United Kingdom",
      zipCode: "SW1A 2JH"
    },
    averageRating: 4.8,
    totalReviews: 198
  },
  {
    title: "Trendy London Loft in Shoreditch",
    description: "Industrial-chic loft in London's trendy Shoreditch neighborhood. This spacious open-plan apartment features exposed brick walls, high ceilings, modern kitchen, rooftop terrace, and is surrounded by vintage shops, art galleries, and trendy restaurants.",
    price: 160,
    location: "London, United Kingdom",
    propertyType: "Loft",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Washer", "Rooftop Terrace", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Emma Johnson",
      responseRate: 95,
      superhost: false,
    },
    address: {
      street: "123 Brick Lane",
      city: "London",
      state: "Shoreditch",
      country: "United Kingdom",
      zipCode: "E1 6SB"
    },
    averageRating: 4.6,
    totalReviews: 145
  },

  // DUBAI PROPERTIES
  {
    title: "Luxury Dubai Marina Apartment",
    description: "Ultra-modern apartment in Dubai Marina with panoramic views of the skyline and Persian Gulf. This premium residence features floor-to-ceiling windows, marble bathrooms, state-of-the-art kitchen, and access to infinity pool and gym.",
    price: 350,
    location: "Dubai, United Arab Emirates",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Gym", "Washer", "Dryer", "Marina Access", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Ahmed Al-Mansoori",
      responseRate: 99,
      superhost: true,
    },
    address: {
      street: "Marina Promenade",
      city: "Dubai",
      state: "Dubai Marina",
      country: "United Arab Emirates",
      zipCode: "00000"
    },
    averageRating: 4.9,
    totalReviews: 278
  },
  {
    title: "Penthouse with Burj Khalifa Views",
    description: "Exclusive penthouse apartment with breathtaking views of Burj Khalifa and Dubai skyline. This luxury residence features private elevator, rooftop pool, home theater, wine cellar, and is located in the heart of Downtown Dubai.",
    price: 850,
    location: "Dubai, United Arab Emirates",
    propertyType: "Apartment",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Hot Tub", "Gym", "Washer", "Dryer", "Home Theater", "Wine Cellar", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Mohammed Al-Nahyan",
      responseRate: 100,
      superhost: true,
    },
    address: {
      street: "Burj Khalifa Tower",
      city: "Dubai",
      state: "Downtown Dubai",
      country: "United Arab Emirates",
      zipCode: "00000"
    },
    averageRating: 5.0,
    totalReviews: 89
  },

  // SINGAPORE PROPERTIES
  {
    title: "Modern Singapore Condo near Marina Bay",
    description: "Contemporary condominium in Singapore's Marina Bay area with stunning city views. This modern apartment features smart home technology, infinity pool access, gym, and is walking distance to Gardens by the Bay and Marina Bay Sands.",
    price: 200,
    location: "Singapore, Singapore",
    propertyType: "Condo",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Gym", "Washer", "Dryer", "Smart Home", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Lim Wei Chen",
      responseRate: 98,
      superhost: true,
    },
    address: {
      street: "88 Marina Bay Drive",
      city: "Singapore",
      state: "Central Region",
      country: "Singapore",
      zipCode: "018956"
    },
    averageRating: 4.8,
    totalReviews: 167
  },

  // BARCELONA PROPERTIES
  {
    title: "Barcelona Gothic Quarter Apartment",
    description: "Charming apartment in Barcelona's historic Gothic Quarter with exposed stone walls and wooden beams. This romantic space features Catalan design elements, modern kitchen, and is steps away from Las Ramblas and Barcelona Cathedral.",
    price: 140,
    location: "Barcelona, Spain",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Washer", "Historic Building", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Carlos Rodriguez",
      responseRate: 96,
      superhost: true,
    },
    address: {
      street: "Carrer de Montjuïc del Bisbe",
      city: "Barcelona",
      state: "Catalonia",
      country: "Spain",
      zipCode: "08002"
    },
    averageRating: 4.7,
    totalReviews: 234
  },

  // ROME PROPERTIES
  {
    title: "Rome Apartment near Colosseum",
    description: "Beautiful apartment in Rome's historic center with views of the Colosseum. This elegant space features Italian design, terracotta floors, modern kitchen, and is walking distance to Roman Forum and Trevi Fountain.",
    price: 160,
    location: "Rome, Italy",
    propertyType: "Apartment",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Washer", "Historic Building", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c6486d6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Marco Rossi",
      responseRate: 97,
      superhost: true,
    },
    address: {
      street: "Via del Colosseo",
      city: "Rome",
      state: "Lazio",
      country: "Italy",
      zipCode: "00184"
    },
    averageRating: 4.8,
    totalReviews: 289
  },

  // AMSTERDAM PROPERTIES
  {
    title: "Amsterdam Canal House",
    description: "Authentic Dutch canal house in the heart of Amsterdam. This historic property features exposed wooden beams, canal views, modern kitchen, and is walking distance to Anne Frank House and Van Gogh Museum.",
    price: 180,
    location: "Amsterdam, Netherlands",
    propertyType: "House",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "TV", "Washer", "Canal View", "Historic Building", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c6486d6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Lotte Van der Berg",
      responseRate: 98,
      superhost: true,
    },
    address: {
      street: "Prinsengracht 263",
      city: "Amsterdam",
      state: "North Holland",
      country: "Netherlands",
      zipCode: "1016 GV"
    },
    averageRating: 4.9,
    totalReviews: 312
  },

  // BANGKOK PROPERTIES
  {
    title: "Bangkok Sukhumvit Condo",
    description: "Modern condominium in Bangkok's trendy Sukhumvit area. This stylish apartment features city views, rooftop pool, gym, and is close to BTS Skytrain, shopping malls, and vibrant nightlife.",
    price: 80,
    location: "Bangkok, Thailand",
    propertyType: "Condo",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Gym", "Washer", "Skytrain Access", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Somchai Wong",
      responseRate: 95,
      superhost: false,
    },
    address: {
      street: "555 Sukhumvit Road",
      city: "Bangkok",
      state: "Khlong Toei",
      country: "Thailand",
      zipCode: "10110"
    },
    averageRating: 4.6,
    totalReviews: 178
  },

  // MUMBAI PROPERTIES
  {
    title: "Mumbai Marine Drive Apartment",
    description: "Luxury apartment on Mumbai's famous Marine Drive with Arabian Sea views. This elegant residence features modern amenities, Indian design elements, and is close to Gateway of India and Colaba Causeway.",
    price: 120,
    location: "Mumbai, India",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Washer", "Sea View", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c6486d6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Raj Patel",
      responseRate: 96,
      superhost: true,
    },
    address: {
      street: "123 Marine Drive",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipCode: "400020"
    },
    averageRating: 4.7,
    totalReviews: 156
  },
  {
    title: "Bandra Sea-Facing Villa",
    description: "Beautiful villa in Mumbai's upscale Bandra area with private pool and garden. This luxury property features modern Indian architecture, spacious living areas, and stunning sunset views over the Arabian Sea.",
    price: 450,
    location: "Mumbai, India",
    propertyType: "Villa",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Gym", "Washer", "Dryer", "Sea View", "Garden", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Priya Sharma",
      responseRate: 98,
      superhost: true,
    },
    address: {
      street: "456 Bandstand",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipCode: "400050"
    },
    averageRating: 4.9,
    totalReviews: 287
  },

  // DELHI PROPERTIES
  {
    title: "South Delhi Luxury Apartment",
    description: "Premium apartment in Delhi's affluent South Delhi area with modern amenities. This spacious residence features contemporary Indian design, high-end finishes, and is close to shopping districts and historical monuments.",
    price: 180,
    location: "Delhi, India",
    propertyType: "Apartment",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c6486d6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Amit Singh",
      responseRate: 97,
      superhost: true,
    },
    address: {
      street: "789 Greater Kailash",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "110048"
    },
    averageRating: 4.8,
    totalReviews: 198
  },
  {
    title: "Connaught Place Studio",
    description: "Modern studio apartment in Delhi's bustling Connaught Place area. This compact space features smart storage, Indian artwork, and is walking distance to major attractions, restaurants, and shopping centers.",
    price: 85,
    location: "Delhi, India",
    propertyType: "Studio",
    guests: 2,
    bedrooms: 0,
    beds: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Neha Gupta",
      responseRate: 95,
      superhost: false,
    },
    address: {
      street: "25 Connaught Place",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "110001"
    },
    averageRating: 4.5,
    totalReviews: 134
  },

  // BANGALORE PROPERTIES
  {
    title: "Bangalore IT Corridor Apartment",
    description: "Modern apartment in Bangalore's tech hub with easy access to major IT companies. This contemporary space features smart home features, co-working area, and is surrounded by cafes and restaurants.",
    price: 95,
    location: "Bangalore, India",
    propertyType: "Apartment",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Workspace", "Smart Home", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Rohit Kumar",
      responseRate: 96,
      superhost: true,
    },
    address: {
      street: "123 Electronic City",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      zipCode: "560100"
    },
    averageRating: 4.6,
    totalReviews: 178
  },
  {
    title: "Indiranagar Boutique Home",
    description: "Charming boutique home in Bangalore's trendy Indiranagar neighborhood. This stylish property features garden space, modern Indian decor, and is close to nightlife, boutiques, and famous restaurants.",
    price: 140,
    location: "Bangalore, India",
    propertyType: "House",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Garden", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Ananya Reddy",
      responseRate: 98,
      superhost: true,
    },
    address: {
      street: "456 100 Feet Road",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      zipCode: "560038"
    },
    averageRating: 4.8,
    totalReviews: 223
  },

  // CHENNAI PROPERTIES
  {
    title: "Chennai Marina Beach House",
    description: "Beachfront house in Chennai near Marina Beach with ocean views. This coastal property features traditional South Indian architecture, spacious verandas, and is walking distance to the beach.",
    price: 110,
    location: "Chennai, India",
    propertyType: "House",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Beach Access", "Washer", "Dryer", "Sea View", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Karthik Ramesh",
      responseRate: 94,
      superhost: false,
    },
    address: {
      street: "789 Marina Beach Road",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      zipCode: "600004"
    },
    averageRating: 4.4,
    totalReviews: 167
  },

  // KOLKATA PROPERTIES
  {
    title: "Kolkata Heritage Bungalow",
    description: "Historic colonial bungalow in Kolkata's elite Alipore area with beautiful gardens and colonial architecture. Experience the charm of old Kolkata with modern amenities, high ceilings, and spacious rooms perfect for families.",
    price: 180,
    location: "Kolkata, India",
    propertyType: "Bungalow",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Garden", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Anjan Dutta", responseRate: 92, superhost: false },
    address: { street: "78 Alipore Road", city: "Kolkata", state: "West Bengal", country: "India", zipCode: "700027" },
    averageRating: 4.7,
    totalReviews: 134
  },

  // SYDNEY PROPERTIES
  {
    title: "Sydney Harbour View Apartment",
    description: "Stunning apartment with views of Sydney Harbour Bridge and Opera House. This modern residence features floor-to-ceiling windows, luxury amenities, and is walking distance to Circular Quay and Royal Botanic Gardens.",
    price: 250,
    location: "Sydney, Australia",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Gym", "Washer", "Dryer", "Harbour View", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512450832323-5577246c3b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb92c3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Jack Wilson",
      responseRate: 98,
      superhost: true,
    },
    address: {
      street: "88 Circular Quay",
      city: "Sydney",
      state: "New South Wales",
      country: "Australia",
      zipCode: "2000"
    },
    averageRating: 4.9,
    totalReviews: 234
  },

  // BERLIN PROPERTIES
  {
    title: "Berlin Mitte Modern Loft",
    description: "Industrial-chic loft in Berlin's trendy Mitte district. This spacious apartment features exposed brick walls, modern kitchen, high ceilings, and is surrounded by art galleries, cafes, and Berlin's best attractions.",
    price: 130,
    location: "Berlin, Germany",
    propertyType: "Loft",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "TV", "Washer", "Industrial Design", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: {
      name: "Hans Mueller",
      responseRate: 97,
      superhost: true,
    },
    address: {
      street: "123 Oranienburger Straße",
      city: "Berlin",
      state: "Mitte",
      country: "Germany",
      zipCode: "10117"
    },
    averageRating: 4.8,
    totalReviews: 189
  },

  // ADDITIONAL INDIAN CITIES - HYDERABAD
  {
    title: "Hyderabad Hi-Tech City Apartment",
    description: "Modern apartment in Hyderabad's technology hub with easy access to major IT companies and HITEC City. Features contemporary design, high-speed internet, and proximity to shopping malls and restaurants.",
    price: 120,
    location: "Hyderabad, India",
    propertyType: "Apartment",
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Raj Kumar", responseRate: 95, superhost: true },
    address: { street: "456 Cyber Towers", city: "Hyderabad", state: "Telangana", country: "India", zipCode: "500081" },
    averageRating: 4.6,
    totalReviews: 203
  },

  // PUNE PROPERTIES
  {
    title: "Pune Koregaon Park Villa",
    description: "Luxurious villa in Pune's upscale Koregaon Park area with private pool and garden. Close to popular restaurants, cafes, and business districts. Perfect for both leisure and business travelers.",
    price: 200,
    location: "Pune, India",
    propertyType: "Villa",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Garden", "Gym", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Sneha Patil", responseRate: 98, superhost: true },
    address: { street: "789 North Main Road", city: "Pune", state: "Maharashtra", country: "India", zipCode: "411001" },
    averageRating: 4.9,
    totalReviews: 156
  },

  // JAIPUR PROPERTIES
  {
    title: "Jaipur Heritage Haveli",
    description: "Traditional Rajasthani haveli in Jaipur's Pink City area with authentic architecture and modern amenities. Experience royal heritage with decorated rooms, courtyard, and proximity to major attractions.",
    price: 150,
    location: "Jaipur, India",
    propertyType: "Heritage Home",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Garden", "Washer", "Dryer", "Traditional Architecture", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1596436886636-1c3a542872d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1476231682828-37aaddaa0faf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549145510-5f5e6b2680e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Vikram Singh", responseRate: 94, superhost: false },
    address: { street: "234 MI Road", city: "Jaipur", state: "Rajasthan", country: "India", zipCode: "302001" },
    averageRating: 4.7,
    totalReviews: 189
  },

  // AHMEDABAD PROPERTIES
  {
    title: "Ahmedabad Sabarmati Riverfront Apartment",
    description: "Modern apartment overlooking Sabarmati River with stunning views and easy access to business districts. Features contemporary design, amenities, and proximity to cultural attractions.",
    price: 100,
    location: "Ahmedabad, India",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "River View", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Priya Shah", responseRate: 96, superhost: true },
    address: { street: "123 Riverfront Road", city: "Ahmedabad", state: "Gujarat", country: "India", zipCode: "380006" },
    averageRating: 4.5,
    totalReviews: 145
  },

  // CHANDIGARH PROPERTIES
  {
    title: "Chandigarh Sector 17 Villa",
    description: "Spacious villa in Chandigarh's planned city with beautiful architecture and green surroundings. Perfect for families with easy access to shopping, dining, and recreational facilities.",
    price: 180,
    location: "Chandigarh, India",
    propertyType: "Villa",
    guests: 7,
    bedrooms: 4,
    beds: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Garden", "Gym", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Aman Verma", responseRate: 93, superhost: false },
    address: { street: "456 Sector 17", city: "Chandigarh", state: "Chandigarh", country: "India", zipCode: "160017" },
    averageRating: 4.6,
    totalReviews: 178
  },

  // LUCKNOW PROPERTIES
  {
    title: "Lucknow Gomti Nagar Apartment",
    description: "Modern apartment in Lucknow's upscale Gomti Nagar area with contemporary amenities and easy access to business districts. Features spacious rooms, modern kitchen, and proximity to shopping centers.",
    price: 90,
    location: "Lucknow, India",
    propertyType: "Apartment",
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Neha Gupta", responseRate: 97, superhost: true },
    address: { street: "789 Vibhuti Khand", city: "Lucknow", state: "Uttar Pradesh", country: "India", zipCode: "226010" },
    averageRating: 4.8,
    totalReviews: 234
  },

  // INDORE PROPERTIES
  {
    title: "Indore Vijay Nagar House",
    description: "Comfortable house in Indore's developing Vijay Nagar area with modern amenities and easy access to commercial areas. Perfect for families and business travelers visiting this emerging city.",
    price: 80,
    location: "Indore, India",
    propertyType: "House",
    guests: 5,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Garden", "Washer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Rohit Sharma", responseRate: 91, superhost: false },
    address: { street: "123 Scheme 54", city: "Indore", state: "Madhya Pradesh", country: "India", zipCode: "452010" },
    averageRating: 4.4,
    totalReviews: 98
  },

  // KOCHI PROPERTIES
  {
    title: "Kochi Marine Drive Apartment",
    description: "Beautiful apartment overlooking Kochi's Marine Drive with stunning backwater views. Experience Kerala's coastal charm with modern amenities, proximity to heritage sites, and excellent seafood restaurants.",
    price: 110,
    location: "Kochi, India",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Washer", "Dryer", "Water View", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549145510-5f5e6b2680e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1476231682828-37aaddaa0faf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Anna Thomas", responseRate: 95, superhost: true },
    address: { street: "456 Marine Drive", city: "Kochi", state: "Kerala", country: "India", zipCode: "682031" },
    averageRating: 4.7,
    totalReviews: 167
  },

  // VISAKHAPATNAM PROPERTIES
  {
    title: "Visakhapatnam Beach Villa",
    description: "Beachfront villa in Visakhapatnam with direct beach access and stunning ocean views. Perfect for beach lovers with modern amenities, private pool, and proximity to RK Beach and attractions.",
    price: 160,
    location: "Visakhapatnam, India",
    propertyType: "Villa",
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Pool", "Beach Access", "Washer", "Dryer", "Sea View", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549145510-5f5e6b2680e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Suresh Reddy", responseRate: 94, superhost: false },
    address: { street: "789 Beach Road", city: "Visakhapatnam", state: "Andhra Pradesh", country: "India", zipCode: "530017" },
    averageRating: 4.6,
    totalReviews: 145
  },

  // NAGPUR PROPERTIES
  {
    title: "Nagpur Civil Lines Bungalow",
    description: "Traditional bungalow in Nagpur's prestigious Civil Lines area with colonial architecture and modern amenities. Perfect for business travelers with proximity to commercial areas and railway station.",
    price: 120,
    location: "Nagpur, India",
    propertyType: "Bungalow",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Garden", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Madhuri Deshmukh", responseRate: 96, superhost: true },
    address: { street: "123 Civil Lines", city: "Nagpur", state: "Maharashtra", country: "India", zipCode: "440001" },
    averageRating: 4.5,
    totalReviews: 189
  },

  // ADDITIONAL INDIAN CITIES - COIMBATORE
  {
    title: "Coimbatore Peelamedu Apartment",
    description: "Modern apartment in Coimbatore's Peelamedu area with easy access to airport and industrial zones. Features contemporary amenities, spacious rooms, and proximity to shopping centers.",
    price: 85,
    location: "Coimbatore, India",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Karthik Ramesh", responseRate: 93, superhost: false },
    address: { street: "123 Avinashi Road", city: "Coimbatore", state: "Tamil Nadu", country: "India", zipCode: "641014" },
    averageRating: 4.4,
    totalReviews: 112
  },

  // TRIVANDRUM PROPERTIES
  {
    title: "Trivandrum Kovalam Beach House",
    description: "Beautiful beach house near Kovalam in Trivandrum with stunning ocean views and beach access. Perfect for vacationers with modern amenities and proximity to tourist attractions.",
    price: 140,
    location: "Trivandrum, India",
    propertyType: "Beach House",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Beach Access", "Washer", "Dryer", "Sea View", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549145510-5f5e6b2680e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Priya Nair", responseRate: 96, superhost: true },
    address: { street: "456 Kovalam Beach Road", city: "Trivandrum", state: "Kerala", country: "India", zipCode: "695527" },
    averageRating: 4.8,
    totalReviews: 201
  },

  // GUWAHATI PROPERTIES
  {
    title: "Guwahati Dispur Apartment",
    description: "Modern apartment in Guwahati's Dispur area with easy access to government offices and Brahmaputra river. Features contemporary design, amenities, and proximity to cultural attractions.",
    price: 95,
    location: "Guwahati, India",
    propertyType: "Apartment",
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Rahul Sharma", responseRate: 91, superhost: false },
    address: { street: "789 GS Road", city: "Guwahati", state: "Assam", country: "India", zipCode: "781006" },
    averageRating: 4.3,
    totalReviews: 87
  },

  // LUDHIANA PROPERTIES
  {
    title: "Ludhiana Sarabha Nagar Villa",
    description: "Luxurious villa in Ludhiana's upscale Sarabha Nagar area with modern amenities and spacious layout. Perfect for families with proximity to business districts and shopping areas.",
    price: 130,
    location: "Ludhiana, India",
    propertyType: "Villa",
    guests: 7,
    bedrooms: 4,
    beds: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Garden", "Gym", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Amanpreet Singh", responseRate: 94, superhost: false },
    address: { street: "123 Sarabha Nagar", city: "Ludhiana", state: "Punjab", country: "India", zipCode: "141001" },
    averageRating: 4.6,
    totalReviews: 145
  },

  // INDORE ADDITIONAL PROPERTIES
  {
    title: "Indore Vijay Nagar Luxury Apartment",
    description: "Premium luxury apartment in Indore's Vijay Nagar with high-end amenities and modern design. Features spacious rooms, premium fittings, and proximity to commercial areas.",
    price: 110,
    location: "Indore, India",
    propertyType: "Luxury Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Vikram Malhotra", responseRate: 97, superhost: true },
    address: { street: "456 Vijay Nagar Main Road", city: "Indore", state: "Madhya Pradesh", country: "India", zipCode: "452010" },
    averageRating: 4.7,
    totalReviews: 178
  },

  // NASHIK PROPERTIES
  {
    title: "Nashik Gangapur Road Apartment",
    description: "Modern apartment in Nashik's Gangapur Road area with easy access to wineries and tourist attractions. Features contemporary amenities and proximity to business districts.",
    price: 75,
    location: "Nashik, India",
    propertyType: "Apartment",
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Suresh Patil", responseRate: 92, superhost: false },
    address: { street: "123 Gangapur Road", city: "Nashik", state: "Maharashtra", country: "India", zipCode: "422013" },
    averageRating: 4.4,
    totalReviews: 98
  },

  // AJMER PROPERTIES
  {
    title: "Ajmer Dargah Area Guest House",
    description: "Traditional guest house near Ajmer Sharif Dargah with authentic Rajasthani architecture and modern amenities. Perfect for pilgrims and tourists with proximity to religious sites.",
    price: 65,
    location: "Ajmer, India",
    propertyType: "Guest House",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Washer", "Traditional Architecture", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1596436886636-1c3a542872d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1476231682828-37aaddaa0faf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549145510-5f5e6b2680e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Mohammad Ali", responseRate: 89, superhost: false },
    address: { street: "789 Dargah Road", city: "Ajmer", state: "Rajasthan", country: "India", zipCode: "305001" },
    averageRating: 4.2,
    totalReviews: 134
  },

  // MYSORE PROPERTIES
  {
    title: "Mysore Palace View Apartment",
    description: "Beautiful apartment with views of Mysore Palace and easy access to tourist attractions. Features modern amenities, traditional decor elements, and proximity to cultural sites.",
    price: 90,
    location: "Mysore, India",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1596436886636-1c3a542872d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1476231682828-37aaddaa0faf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549145510-5f5e6b2680e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Rashmi Kumar", responseRate: 95, superhost: true },
    address: { street: "456 Palace Road", city: "Mysore", state: "Karnataka", country: "India", zipCode: "570001" },
    averageRating: 4.6,
    totalReviews: 167
  },

  // VADODARA PROPERTIES
  {
    title: "Vadodara Alkapuri Apartment",
    description: "Modern apartment in Vadodara's Alkapuri business district with contemporary amenities and easy access to commercial areas. Perfect for business travelers and families.",
    price: 80,
    location: "Vadodara, India",
    propertyType: "Apartment",
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Anand Patel", responseRate: 93, superhost: false },
    address: { street: "123 Alkapuri Main Road", city: "Vadodara", state: "Gujarat", country: "India", zipCode: "390007" },
    averageRating: 4.5,
    totalReviews: 123
  },

  // AURANGABAD PROPERTIES
  {
    title: "Aurangabad CIDCO Apartment",
    description: "Spacious apartment in Aurangabad's CIDCO area with modern amenities and easy access to tourist attractions like Ajanta and Ellora caves. Perfect for tourists and business travelers.",
    price: 70,
    location: "Aurangabad, India",
    propertyType: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Sanjay Deshmukh", responseRate: 90, superhost: false },
    address: { street: "789 CIDCO Area", city: "Aurangabad", state: "Maharashtra", country: "India", zipCode: "431003" },
    averageRating: 4.3,
    totalReviews: 89
  },

  // JODHPUR PROPERTIES
  {
    title: "Jodhpur Blue City Heritage House",
    description: "Traditional blue house in Jodhpur's old city area with authentic Rajasthani architecture and modern amenities. Experience the charm of the Blue City with proximity to Mehrangarh Fort.",
    price: 120,
    location: "Jodhpur, India",
    propertyType: "Heritage House",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Garden", "Washer", "Dryer", "Traditional Architecture", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1596436886636-1c3a542872d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1476231682828-37aaddaa0faf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549145510-5f5e6b2680e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Rajendra Singh", responseRate: 94, superhost: false },
    address: { street: "234 Nav Chowk", city: "Jodhpur", state: "Rajasthan", country: "India", zipCode: "342001" },
    averageRating: 4.7,
    totalReviews: 156
  },

  // GURGAON PROPERTIES
  {
    title: "Gurgaon Cyber City Luxury Apartment",
    description: "Premium luxury apartment in Gurgaon's Cyber City with high-end amenities and modern design. Perfect for business travelers with proximity to multinational companies.",
    price: 180,
    location: "Gurgaon, India",
    propertyType: "Luxury Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Pool", "Washer", "Dryer", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Arjun Kapoor", responseRate: 98, superhost: true },
    address: { street: "123 Cyber City", city: "Gurgaon", state: "Haryana", country: "India", zipCode: "122001" },
    averageRating: 4.8,
    totalReviews: 234
  },

  // NOIDA PROPERTIES
  {
    title: "Noida Sector 18 Apartment",
    description: "Modern apartment in Noida's Sector 18 with easy access to shopping malls and business districts. Features contemporary amenities and proximity to Delhi.",
    price: 100,
    location: "Noida, India",
    propertyType: "Apartment",
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Gym", "Washer", "Dryer", "Workspace", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Pooja Verma", responseRate: 95, superhost: true },
    address: { street: "456 Sector 18", city: "Noida", state: "Uttar Pradesh", country: "India", zipCode: "201301" },
    averageRating: 4.6,
    totalReviews: 189
  },

  // FARIDABAD PROPERTIES
  {
    title: "Faridabad Sector 15 House",
    description: "Spacious house in Faridabad's Sector 15 with modern amenities and easy access to Delhi. Perfect for families with proximity to industrial areas and shopping centers.",
    price: 85,
    location: "Faridabad, India",
    propertyType: "House",
    guests: 5,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Parking", "Garden", "Washer", "Dryer", "Smoke Alarm", "Carbon Monoxide Alarm", "First Aid Kit"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    hostDetails: { name: "Ramesh Kumar", responseRate: 91, superhost: false },
    address: { street: "123 Sector 15", city: "Faridabad", state: "Haryana", country: "India", zipCode: "121007" },
    averageRating: 4.4,
    totalReviews: 112
  }
];

const seedWorldwideListings = async () => {
  try {
    // Load environment variables
    require('dotenv').config();
    
    // For now, just log the data without database connection
    console.log("=== DWELLBOOK WORLDWIDE LISTINGS DATA ===");
    console.log(`Total properties to seed: ${worldwideListings.length}`);
    
    // Count Indian properties
    const indianProperties = worldwideListings.filter(listing => 
      listing.location.includes("India")
    );
    console.log(`Indian properties: ${indianProperties.length}`);
    
    // Display Indian cities covered
    const indianCities = [...new Set(indianProperties.map(listing => 
      listing.location.split(",")[0].trim()
    ))];
    console.log("Indian cities covered:", indianCities.join(", "));
    
    // Display property types
    const propertyTypes = [...new Set(worldwideListings.map(listing => listing.propertyType))];
    console.log("Property types:", propertyTypes.join(", "));
    
    // Display price range
    const prices = worldwideListings.map(listing => listing.price);
    console.log(`Price range: $${Math.min(...prices)} - $${Math.max(...prices)}`);
    
    console.log("\n=== SAMPLE LISTINGS ===");
    indianProperties.slice(0, 5).forEach((listing, index) => {
      console.log(`${index + 1}. ${listing.title} - ${listing.location} - $${listing.price}/night`);
    });
    
    console.log(`\nSuccessfully prepared ${worldwideListings.length} worldwide listings for seeding`);
    console.log("Note: Database connection skipped - data is ready for manual database seeding");
    process.exit(0);
  } catch (error) {
    console.error("Error preparing worldwide listings:", error);
    process.exit(1);
  }
};

seedWorldwideListings();
