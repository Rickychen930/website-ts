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
  const isDevelopment = process.env.NODE_ENV === "development";

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
      // In development, try to reconnect automatically
      if (isDevelopment) {
        console.log("🔄 Attempting to reconnect to MongoDB...");
        setTimeout(() => {
          connectDatabase().catch(() => {
            // Silent fail, will retry again
          });
        }, 5000);
      }
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected");
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);

    if (isDevelopment) {
      console.warn(
        "⚠️  Server will start without MongoDB. Some features may not work.",
      );
      console.warn(
        "💡 To start MongoDB: brew services start mongodb-community",
      );
      console.warn(
        "💡 Or install MongoDB: brew tap mongodb/brew && brew install mongodb-community",
      );
      // Don't exit in development - allow server to start
      // Set up retry mechanism
      setTimeout(() => {
        console.log("🔄 Retrying MongoDB connection in 5 seconds...");
        connectDatabase().catch(() => {
          // Will retry again
        });
      }, 5000);
    } else {
      console.error(
        "Please ensure MongoDB is running and MONGODB_URI is correct",
      );
      process.exit(1);
    }
  }
};
