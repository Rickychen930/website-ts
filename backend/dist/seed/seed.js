"use strict";
/**
 * Seed Script - Populate database with profile data
 * Improved with better error handling and logging
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const Profile_1 = require("../models/Profile");
const seedData_1 = require("./seedData");
// Load environment variables from root directory
// Try multiple possible locations for .env file
const rootPath = path_1.default.resolve(__dirname, "../../../");
dotenv_1.default.config({ path: path_1.default.resolve(rootPath, ".env") });
dotenv_1.default.config({ path: path_1.default.resolve(rootPath, ".env.development") });
dotenv_1.default.config({ path: path_1.default.resolve(rootPath, ".env.production") });
const seedDatabase = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/website-db";
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined. Please check your environment variables.");
        }
        console.log("🌱 Starting database seeding...");
        console.log(`📡 Connecting to MongoDB: ${mongoUri.replace(/\/\/.*@/, "//***:***@")}`); // Hide credentials
        // Connection options for better reliability
        const connectionOptions = {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000, // Connection timeout
        };
        await mongoose_1.default.connect(mongoUri, connectionOptions);
        console.log("✅ Connected to MongoDB");
        // Clear existing data
        const deleteResult = await Profile_1.ProfileModel.deleteMany({});
        console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing profile(s)`);
        // Validate seed data
        if (!seedData_1.seedProfileData.name ||
            !seedData_1.seedProfileData.title ||
            !seedData_1.seedProfileData.location) {
            throw new Error("Invalid seed data: missing required fields (name, title, location)");
        }
        // Insert seed data
        const profile = new Profile_1.ProfileModel(seedData_1.seedProfileData);
        await profile.save();
        console.log("✅ Profile seeded successfully");
        console.log(`📊 Profile ID: ${profile._id}`);
        console.log(`👤 Name: ${profile.name}`);
        console.log(`💼 Title: ${profile.title}`);
        console.log(`📍 Location: ${profile.location}`);
        console.log(`📈 Stats: ${profile.projects?.length || 0} projects, ${profile.experiences?.length || 0} experiences, ${profile.testimonials?.length || 0} testimonials`);
        await mongoose_1.default.disconnect();
        console.log("👋 Disconnected from MongoDB");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
        if (error instanceof Error) {
            console.error("Error details:", error.message);
            console.error("Stack trace:", error.stack);
        }
        await mongoose_1.default.disconnect().catch(() => { });
        process.exit(1);
    }
};
// Run seed if called directly
if (require.main === module) {
    seedDatabase();
}
exports.default = seedDatabase;
