/**
 * Seed Script - Populate database with profile data
 * Improved with better error handling and logging
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { ProfileModel } from "../models/Profile";
import { seedProfileData } from "./seedData";

// Load environment variables from root directory
// Try multiple possible locations for .env file
const rootPath = path.resolve(__dirname, "../../../");
dotenv.config({ path: path.resolve(rootPath, ".env") });
dotenv.config({ path: path.resolve(rootPath, ".env.development") });
dotenv.config({ path: path.resolve(rootPath, ".env.production") });

const seedDatabase = async (): Promise<void> => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/website-db";

    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI is not defined. Please check your environment variables.",
      );
    }

    console.log("🌱 Starting database seeding...");
    console.log(
      `📡 Connecting to MongoDB: ${mongoUri.replace(/\/\/.*@/, "//***:***@")}`,
    ); // Hide credentials

    // Connection options for better reliability
    const connectionOptions = {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      connectTimeoutMS: 10000, // Connection timeout
    };

    await mongoose.connect(mongoUri, connectionOptions);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    const deleteResult = await ProfileModel.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing profile(s)`);

    // Validate seed data
    if (
      !seedProfileData.name ||
      !seedProfileData.title ||
      !seedProfileData.location
    ) {
      throw new Error(
        "Invalid seed data: missing required fields (name, title, location)",
      );
    }

    // Insert seed data
    const profile = new ProfileModel(seedProfileData);
    await profile.save();

    console.log("✅ Profile seeded successfully");
    console.log(`📊 Profile ID: ${profile._id}`);
    console.log(`👤 Name: ${profile.name}`);
    console.log(`💼 Title: ${profile.title}`);
    console.log(`📍 Location: ${profile.location}`);
    console.log(
      `📈 Stats: ${profile.projects?.length || 0} projects, ${profile.experiences?.length || 0} experiences, ${profile.testimonials?.length || 0} testimonials`,
    );

    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Stack trace:", error.stack);
    }
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

// Run seed if called directly
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
