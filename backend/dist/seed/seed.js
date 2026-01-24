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
// Load environment variables from root directory - only use .env file
const rootPath = path_1.default.resolve(__dirname, "../../../");
dotenv_1.default.config({ path: path_1.default.resolve(rootPath, ".env") });
/**
 * Clean MongoDB URI by removing duplicate query parameters
 * Fixes issues with duplicate parameters and invalid values
 */
const cleanMongoUri = (uri) => {
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
        const seenParams = new Set();
        // Split by & and process each parameter
        queryString.split("&").forEach((param) => {
            if (!param)
                return; // Skip empty strings
            const equalIndex = param.indexOf("=");
            if (equalIndex === -1) {
                // Parameter without value
                if (!seenParams.has(param)) {
                    params.append(param, "");
                    seenParams.add(param);
                }
            }
            else {
                const key = param.substring(0, equalIndex);
                let value = param.substring(equalIndex + 1);
                // Normalize boolean values for retryWrites
                if (key === "retryWrites") {
                    // Convert to lowercase and ensure it's "true" or "false"
                    const lowerValue = value.toLowerCase();
                    if (lowerValue === "true" || lowerValue === "1") {
                        value = "true";
                    }
                    else if (lowerValue === "false" || lowerValue === "0") {
                        value = "false";
                    }
                    // If invalid, default to "true"
                    if (value !== "true" && value !== "false") {
                        value = "true";
                    }
                }
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
    }
    catch (error) {
        // If parsing fails, return original URI
        console.warn("⚠️ Failed to parse MongoDB URI, using original:", error);
        return uri;
    }
};
const seedDatabase = async () => {
    try {
        let mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/website-db";
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined. Please check your environment variables.");
        }
        // Clean URI to remove duplicate parameters (especially "w" parameter)
        mongoUri = cleanMongoUri(mongoUri);
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
