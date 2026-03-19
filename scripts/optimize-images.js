/**
 * Optimize public images for performance (OG image).
 * Run: npm run optimize:images  (or node scripts/optimize-images.js)
 * Requires: npm install --save-dev sharp
 *
 * - logo512.png: resized to max 512px and compressed (target ~200-300 KB for OG).
 * - favicon.ico: for smaller size use favicon.svg (preferred in index.html) or
 *   regenerate .ico from a 32x32 source with a tool like realfavicongenerator.net.
 */

const fs = require("fs");
const path = require("path");

const publicDir = path.resolve(__dirname, "../public");

async function optimizeWithSharp() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.warn("⚠️  sharp not installed. Run: npm install --save-dev sharp");
    console.warn("   Then run this script again to optimize logo512.png.");
    return;
  }

  const logoPath = path.join(publicDir, "logo512.png");
  if (fs.existsSync(logoPath)) {
    const meta = await sharp(logoPath).metadata();
    const sizeBefore = fs.statSync(logoPath).size;
    await sharp(logoPath)
      .resize(Math.min(meta.width || 512, 512), Math.min(meta.height || 512), {
        fit: "inside",
      })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(path.join(publicDir, "logo512.optimized.png"));
    fs.renameSync(path.join(publicDir, "logo512.optimized.png"), logoPath);
    const sizeAfter = fs.statSync(logoPath).size;
    console.log(
      `✅ logo512.png: ${(sizeBefore / 1024).toFixed(1)} KB → ${(sizeAfter / 1024).toFixed(1)} KB`,
    );
  }

  console.log("✅ Image optimization done.");
}

optimizeWithSharp().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
