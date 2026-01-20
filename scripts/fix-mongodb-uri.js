/**
 * Fix MongoDB URI in .env.development
 * Updates MONGODB_URI to use MongoDB Atlas instead of localhost
 */

const fs = require("fs");
const path = require("path");

const envFile = path.resolve(__dirname, "../.env.development");
const correctUri =
  "mongodb+srv://***:***@ricky-website-portfolio.bkjauxk.mongodb.net/portfolio?retryWrites=true&w=majority&authSource=admin";

console.log("🔧 Fixing MongoDB URI in .env.development...\n");

if (!fs.existsSync(envFile)) {
  console.error("❌ File .env.development tidak ditemukan!");
  console.log("💡 Buat file .env.development dengan MONGODB_URI yang benar");
  process.exit(1);
}

try {
  let content = fs.readFileSync(envFile, "utf8");
  const lines = content.split("\n");
  let updated = false;

  const newLines = lines.map((line) => {
    if (line.startsWith("MONGODB_URI=")) {
      const currentUri = line.split("=")[1]?.trim();
      if (currentUri && !currentUri.includes("mongodb+srv://")) {
        console.log("⚠️  Current MONGODB_URI:", currentUri);
        console.log("✅ Updating to MongoDB Atlas URI...");
        updated = true;
        // Keep the actual URI from environment or use placeholder
        // User needs to replace *** with actual credentials
        return `MONGODB_URI=${correctUri}`;
      }
    }
    return line;
  });

  if (updated) {
    fs.writeFileSync(envFile, newLines.join("\n"), "utf8");
    console.log("\n✅ File .env.development telah diupdate!");
    console.log(
      "⚠️  IMPORTANT: Ganti *** dengan username dan password MongoDB Atlas Anda!",
    );
    console.log(
      "   Format: mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/...",
    );
  } else {
    console.log(
      "ℹ️  MONGODB_URI sudah menggunakan MongoDB Atlas atau tidak ditemukan",
    );
  }
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
