/**
 * Bundle Size Analysis Script
 * Analyzes bundle size and provides recommendations
 */

const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "../build");
const STATIC_DIR = path.join(BUILD_DIR, "static");

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Get file size
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

/**
 * Analyze bundle sizes
 */
function analyzeBundle() {
  console.log("📦 Bundle Size Analysis\n");
  console.log("=".repeat(50));

  if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Analyze JS files
  const jsDir = path.join(STATIC_DIR, "js");
  if (fs.existsSync(jsDir)) {
    console.log("\n📄 JavaScript Files:");
    console.log("-".repeat(50));

    const jsFiles = fs
      .readdirSync(jsDir)
      .filter((file) => file.endsWith(".js"));
    let totalJSSize = 0;

    jsFiles.forEach((file) => {
      const filePath = path.join(jsDir, file);
      const size = getFileSize(filePath);
      totalJSSize += size;
      console.log(`  ${file.padEnd(40)} ${formatBytes(size).padStart(10)}`);
    });

    console.log(`\n  Total JS: ${formatBytes(totalJSSize)}`);

    // Recommendations
    if (totalJSSize > 500 * 1024) {
      // > 500KB
      console.log("\n  ⚠️  Warning: Bundle size is large (>500KB)");
      console.log("  💡 Recommendations:");
      console.log("     - Enable code splitting");
      console.log("     - Use dynamic imports for heavy components");
      console.log("     - Remove unused dependencies");
      console.log("     - Consider tree shaking");
    }
  }

  // Analyze CSS files
  const cssDir = path.join(STATIC_DIR, "css");
  if (fs.existsSync(cssDir)) {
    console.log("\n🎨 CSS Files:");
    console.log("-".repeat(50));

    const cssFiles = fs
      .readdirSync(cssDir)
      .filter((file) => file.endsWith(".css"));
    let totalCSSSize = 0;

    cssFiles.forEach((file) => {
      const filePath = path.join(cssDir, file);
      const size = getFileSize(filePath);
      totalCSSSize += size;
      console.log(`  ${file.padEnd(40)} ${formatBytes(size).padStart(10)}`);
    });

    console.log(`\n  Total CSS: ${formatBytes(totalCSSSize)}`);

    // Recommendations
    if (totalCSSSize > 200 * 1024) {
      // > 200KB
      console.log("\n  ⚠️  Warning: CSS bundle is large (>200KB)");
      console.log("  💡 Recommendations:");
      console.log("     - Remove unused CSS");
      console.log("     - Use CSS-in-JS for component-specific styles");
      console.log("     - Consider CSS purging");
    }
  }

  // Analyze images
  const imagesDir = path.join(BUILD_DIR, "assets", "images");
  if (fs.existsSync(imagesDir)) {
    console.log("\n🖼️  Images:");
    console.log("-".repeat(50));

    const imageFiles = fs.readdirSync(imagesDir);
    let totalImageSize = 0;
    const largeImages = [];

    imageFiles.forEach((file) => {
      const filePath = path.join(imagesDir, file);
      const size = getFileSize(filePath);
      totalImageSize += size;

      if (size > 500 * 1024) {
        // > 500KB
        largeImages.push({ file, size });
      }
    });

    console.log(`  Total Images: ${formatBytes(totalImageSize)}`);

    if (largeImages.length > 0) {
      console.log("\n  ⚠️  Large Images (>500KB):");
      largeImages.forEach(({ file, size }) => {
        console.log(
          `     ${file.padEnd(35)} ${formatBytes(size).padStart(10)}`,
        );
      });
      console.log("\n  💡 Recommendations:");
      console.log("     - Optimize images (compress, WebP format)");
      console.log("     - Use responsive images (srcset)");
      console.log("     - Lazy load images below the fold");
      console.log("     - Consider using CDN for images");
    }
  }

  // Total size
  console.log("\n" + "=".repeat(50));
  console.log("📊 Summary:");
  console.log("-".repeat(50));

  const totalSize = getFileSize(BUILD_DIR);
  console.log(`  Total Build Size: ${formatBytes(totalSize)}`);

  // Performance recommendations
  console.log("\n💡 General Recommendations:");
  console.log("  - Enable gzip/brotli compression on server");
  console.log("  - Use CDN for static assets");
  console.log("  - Implement service worker for caching");
  console.log("  - Monitor bundle size in CI/CD");

  console.log("\n✅ Analysis complete!\n");
}

// Run analysis
analyzeBundle();
