/**
 * Database Configuration
 */

import mongoose from "mongoose";

// Retry tracking
let retryCount = 0;
const MAX_RETRIES = 10; // Maximum number of retry attempts
const RETRY_DELAY = 5000; // 5 seconds between retries

export const connectDatabase = async (
  retryAttempt: number = 0,
): Promise<void> => {
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
    retryCount = 0; // Reset retry count on successful connection

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
      // In development, try to reconnect automatically (with retry limit)
      if (isDevelopment && retryCount < MAX_RETRIES) {
        retryCount++;
        console.log(
          `🔄 Attempting to reconnect to MongoDB... (Attempt ${retryCount}/${MAX_RETRIES})`,
        );
        setTimeout(() => {
          connectDatabase(retryCount).catch(() => {
            // Silent fail, will retry again if under limit
          });
        }, RETRY_DELAY);
      } else if (isDevelopment && retryCount >= MAX_RETRIES) {
        console.error(
          `❌ Maximum retry attempts (${MAX_RETRIES}) reached. Please check MongoDB connection manually.`,
        );
      }
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected");
      retryCount = 0; // Reset retry count on successful reconnection
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);

    if (isDevelopment) {
      if (retryAttempt < MAX_RETRIES) {
        retryCount = retryAttempt + 1;
        console.warn(
          `⚠️  Server will start without MongoDB. Some features may not work.`,
        );
        console.warn(
          `💡 Retrying connection... (Attempt ${retryCount}/${MAX_RETRIES})`,
        );
        // Set up retry mechanism with limit
        setTimeout(() => {
          connectDatabase(retryCount).catch(() => {
            // Will retry again if under limit
          });
        }, RETRY_DELAY);
      } else {
        console.error(
          `❌ Maximum retry attempts (${MAX_RETRIES}) reached. Server will continue without MongoDB.`,
        );
        console.warn(
          "💡 To start MongoDB: brew services start mongodb-community",
        );
        console.warn(
          "💡 Or install MongoDB: brew tap mongodb/brew && brew install mongodb-community",
        );
        retryCount = 0; // Reset for future connection attempts
      }
    } else {
      console.error(
        "Please ensure MongoDB is running and MONGODB_URI is correct",
      );
      process.exit(1);
    }
  }
};
