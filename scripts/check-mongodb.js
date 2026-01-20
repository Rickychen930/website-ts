/**
 * MongoDB Connection Checker
 * Checks if MongoDB is connected and if data exists
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
const rootPath = path.resolve(__dirname, "../");
dotenv.config({ path: path.resolve(rootPath, ".env") });
dotenv.config({ path: path.resolve(rootPath, ".env.development") });
dotenv.config({ path: path.resolve(rootPath, ".env.production") });

const checkMongoDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/website-db";

    console.log("🔍 Checking MongoDB connection...");
    console.log(`📡 MongoDB URI: ${mongoUri.replace(/\/\/.*@/, "//***:***@")}`);

    if (!process.env.MONGODB_URI) {
      console.warn("⚠️  MONGODB_URI not found in environment variables");
      console.warn("💡 Using default: mongodb://localhost:27017/website-db");
    }

    // Connection options
    const connectionOptions = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    };

    // Try to connect
    await mongoose.connect(mongoUri, connectionOptions);
    console.log("✅ MongoDB connected successfully!");

    // Check if Profile collection exists and has data
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const profileCollectionExists = collections.some(
      (col) => col.name === "profiles",
    );

    if (profileCollectionExists) {
      const ProfileModel = mongoose.model(
        "Profile",
        new mongoose.Schema({}, { strict: false }),
      );
      const profileCount = await ProfileModel.countDocuments();

      if (profileCount > 0) {
        const profile = await ProfileModel.findOne();
        console.log("\n📊 Database Status:");
        console.log(`   ✅ Profile data exists (${profileCount} profile(s))`);
        console.log(`   👤 Name: ${profile.name || "N/A"}`);
        console.log(`   💼 Title: ${profile.title || "N/A"}`);
        console.log(`   📍 Location: ${profile.location || "N/A"}`);

        // Check technical skills
        const technicalSkills = profile.technicalSkills || [];
        const softSkills = profile.softSkills || [];

        console.log(`\n📈 Skills Summary:`);
        console.log(`   🔧 Technical Skills: ${technicalSkills.length} skills`);
        console.log(`   💡 Soft Skills: ${softSkills.length} skills`);

        if (technicalSkills.length > 0) {
          console.log(`\n   Technical Skills:`);
          technicalSkills.forEach((skill, index) => {
            console.log(
              `   ${index + 1}. ${skill.name} (${skill.proficiency}) - ${skill.yearsOfExperience || 0} years`,
            );
          });
        }

        if (softSkills.length > 0) {
          console.log(`\n   Soft Skills:`);
          softSkills.forEach((skill, index) => {
            console.log(`   ${index + 1}. ${skill.name} (${skill.category})`);
          });
        }
      } else {
        console.log("\n⚠️  Profile collection exists but is empty");
        console.log("💡 Run 'npm run seed' to populate the database");
      }
    } else {
      console.log("\n⚠️  Profile collection does not exist");
      console.log("💡 Run 'npm run seed' to create and populate the database");
    }

    // Show database info
    console.log(`\n📦 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🔌 Port: ${mongoose.connection.port || "N/A"}`);

    await mongoose.disconnect();
    console.log("\n✅ Check completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ MongoDB connection failed!");
    console.error("Error:", error.message);

    if (error.message.includes("authentication failed")) {
      console.error("\n💡 Authentication failed. Please check:");
      console.error("   1. MongoDB username and password in MONGODB_URI");
      console.error("   2. Database user has proper permissions");
    } else if (
      error.message.includes("ENOTFOUND") ||
      error.message.includes("getaddrinfo")
    ) {
      console.error("\n💡 Cannot resolve hostname. Please check:");
      console.error("   1. MongoDB Atlas cluster URL is correct");
      console.error("   2. Internet connection is active");
      console.error("   3. IP address is whitelisted in MongoDB Atlas");
    } else if (error.message.includes("timeout")) {
      console.error("\n💡 Connection timeout. Please check:");
      console.error("   1. MongoDB server is running");
      console.error("   2. Network connectivity");
      console.error("   3. Firewall settings");
    }

    console.error("\n💡 To fix:");
    console.error("   1. Check MONGODB_URI in .env file");
    console.error("   2. Ensure MongoDB Atlas cluster is running");
    console.error("   3. Verify IP whitelist in MongoDB Atlas");
    console.error("   4. Check network connection");

    process.exit(1);
  }
};

checkMongoDB();
