/**
 * Database Configuration
 */

import mongoose from "mongoose";

// Retry tracking
let retryCount = 0;
const MAX_RETRIES = 10; // Maximum number of retry attempts
const RETRY_DELAY = 5000; // 5 seconds between retries

/**
 * Clean MongoDB URI by removing duplicate query parameters
 * Fixes issue where "w" parameter appears multiple times in connection string
 */
const cleanMongoUri = (uri: string): string => {
  try {
    // Check if URI has query parameters
    const queryIndex = uri.indexOf("?");
    if (queryIndex === -1) {
      return uri; // No query parameters, return as is
    }

    const baseUri = uri.substring(0, queryIndex);
    const queryString = uri.substring(queryIndex + 1);

    // Parse query parameters and remove duplicates (keep first occurrence)
    const params = new URLSearchParams();
    const seenParams = new Set<string>();

    // Split by & and process each parameter
    queryString.split("&").forEach((param) => {
      if (!param) return; // Skip empty strings

      const equalIndex = param.indexOf("=");
      if (equalIndex === -1) {
        // Parameter without value
        if (!seenParams.has(param)) {
          params.append(param, "");
          seenParams.add(param);
        }
      } else {
        const key = param.substring(0, equalIndex);
        const value = param.substring(equalIndex + 1);

        // Only add if we haven't seen this parameter before
        if (!seenParams.has(key)) {
          params.append(key, value);
          seenParams.add(key);
        }
      }
    });

    // Reconstruct URI
    const cleanQuery = params.toString();
    return cleanQuery ? `${baseUri}?${cleanQuery}` : baseUri;
  } catch (error) {
    // If parsing fails, return original URI
    console.warn("⚠️ Failed to parse MongoDB URI, using original:", error);
    return uri;
  }
};

export const connectDatabase = async (
  retryAttempt: number = 0,
): Promise<void> => {
  // Load environment variables explicitly
  const dotenv = require("dotenv");
  const path = require("path");

  // Try to load from multiple locations
  dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
  dotenv.config({ path: path.resolve(__dirname, "../../../config/.env") });

  let mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/website-db";
  const isDevelopment = process.env.NODE_ENV === "development";

  if (!process.env.MONGODB_URI) {
    console.warn(
      "⚠️ MONGODB_URI not found in environment variables. Using default localhost.",
    );
  }

  // Clean URI to remove duplicate parameters (especially "w" parameter)
  mongoUri = cleanMongoUri(mongoUri);

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
