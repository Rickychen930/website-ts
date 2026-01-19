"use strict";
/**
 * Seed Script - Populate database with profile data
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Profile_1 = require("../models/Profile");
const seedData_1 = require("./seedData");
dotenv_1.default.config();
const seedDatabase = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/website-db';
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        // Clear existing data
        await Profile_1.ProfileModel.deleteMany({});
        console.log('Cleared existing profiles');
        // Insert seed data
        const profile = new Profile_1.ProfileModel(seedData_1.seedProfileData);
        await profile.save();
        console.log('Profile seeded successfully');
        await mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedDatabase();
