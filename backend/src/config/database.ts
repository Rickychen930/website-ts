/**
 * Database Configuration
 */

import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  // Load environment variables explicitly
  const dotenv = require("dotenv");
  const path = require("path");

  // Try to load from multiple locations
  dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
  dotenv.config({ path: path.resolve(__dirname, "../../../config/.env") });

  const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/website-db";

  if (!process.env.MONGODB_URI) {
    console.warn(
      "⚠️ MONGODB_URI not found in environment variables. Using default localhost.",
    );
  }

  try {
    // Set connection options for better reliability
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    await mongoose.connect(mongoUri, options);
    console.log("✅ MongoDB connected successfully");

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected");
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    console.error(
      "Please ensure MongoDB is running and MONGODB_URI is correct",
    );
    process.exit(1);
  }
};
