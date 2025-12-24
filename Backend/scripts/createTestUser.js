const mongoose = require('mongoose');
const User = require('../models/User');

const createTestUser = async () => {
  try {
    // Load environment variables
    require('dotenv').config();
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Clear existing users
    await User.deleteMany({});
    console.log("Cleared existing users");

    // Create test user
    const testUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "guest"
    });

    console.log("Created test user:", testUser.email);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

createTestUser();
