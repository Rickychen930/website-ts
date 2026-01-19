/**
 * Verify Data Structure Script
 * Tests that the seeded data matches expected structure
 */

const mongoose = require("mongoose");
const path = require("path");

// Load environment variables from multiple locations
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/website-db";

// Define a simple schema for verification
const ProfileSchema = new mongoose.Schema({}, { strict: false });
const Profile = mongoose.model("Profile", ProfileSchema);

async function verifyData() {
  try {
    console.log("🔍 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    const profile = await Profile.findOne();

    if (!profile) {
      console.error("❌ No profile found in database");
      console.log("💡 Run: npm run seed");
      process.exit(1);
    }

    console.log("📊 Verifying data structure...\n");

    // Check required fields
    const requiredFields = ["name", "title", "location", "bio"];
    const missingFields = requiredFields.filter((field) => !profile[field]);

    if (missingFields.length > 0) {
      console.error(`❌ Missing required fields: ${missingFields.join(", ")}`);
      process.exit(1);
    }

    console.log("✅ Required fields present");
    console.log(`   Name: ${profile.name}`);
    console.log(`   Title: ${profile.title}`);
    console.log(`   Location: ${profile.location}\n`);

    // Check arrays
    const arrays = [
      "academics",
      "certifications",
      "contacts",
      "experiences",
      "honors",
      "languages",
      "projects",
      "softSkills",
      "stats",
      "technicalSkills",
      "testimonials",
    ];

    console.log("📋 Array data counts:");
    arrays.forEach((field) => {
      const count = Array.isArray(profile[field]) ? profile[field].length : 0;
      const status = count > 0 ? "✅" : "⚠️";
      console.log(`   ${status} ${field}: ${count}`);
    });

    // Verify specific data structures
    console.log("\n🔍 Detailed verification:");

    // Check academics structure
    if (profile.academics && profile.academics.length > 0) {
      const academic = profile.academics[0];
      const academicFields = ["institution", "degree", "field", "startDate"];
      const hasAllFields = academicFields.every((f) => academic[f]);
      console.log(
        `   ${hasAllFields ? "✅" : "❌"} Academics structure: ${hasAllFields ? "Valid" : "Invalid"}`,
      );
    }

    // Check experiences structure
    if (profile.experiences && profile.experiences.length > 0) {
      const exp = profile.experiences[0];
      const expFields = [
        "company",
        "position",
        "location",
        "startDate",
        "description",
      ];
      const hasAllFields = expFields.every((f) => exp[f]);
      const hasArrays =
        Array.isArray(exp.achievements) && Array.isArray(exp.technologies);
      console.log(
        `   ${hasAllFields && hasArrays ? "✅" : "❌"} Experiences structure: ${hasAllFields && hasArrays ? "Valid" : "Invalid"}`,
      );
    }

    // Check projects structure
    if (profile.projects && profile.projects.length > 0) {
      const project = profile.projects[0];
      const projectFields = [
        "title",
        "description",
        "technologies",
        "category",
        "startDate",
      ];
      const hasAllFields = projectFields.every((f) => project[f]);
      const hasArrays =
        Array.isArray(project.technologies) &&
        Array.isArray(project.achievements);
      console.log(
        `   ${hasAllFields && hasArrays ? "✅" : "❌"} Projects structure: ${hasAllFields && hasArrays ? "Valid" : "Invalid"}`,
      );
    }

    // Check technical skills structure
    if (profile.technicalSkills && profile.technicalSkills.length > 0) {
      const skill = profile.technicalSkills[0];
      const skillFields = ["name", "category", "proficiency"];
      const hasAllFields = skillFields.every((f) => skill[f]);
      console.log(
        `   ${hasAllFields ? "✅" : "❌"} Technical Skills structure: ${hasAllFields ? "Valid" : "Invalid"}`,
      );
    }

    console.log("\n✅ Data verification complete!");
    console.log("\n📝 Summary:");
    console.log(`   Profile ID: ${profile._id}`);
    console.log(`   Created: ${profile.createdAt}`);
    console.log(`   Updated: ${profile.updatedAt}`);

    await mongoose.disconnect();
    console.log("\n👋 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Verification failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

verifyData();
