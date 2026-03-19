/**
 * Bundle size analysis using source-map-explorer.
 * Run after build: npm run build && npm run analyze:bundle
 * Requires: npm install --save-dev source-map-explorer
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const buildDir = path.resolve(__dirname, "../build");
const buildJs = path.join(buildDir, "static/js");

if (!fs.existsSync(buildJs)) {
  console.error("❌ No build found. Run: npm run build");
  process.exit(1);
}

const jsFiles = fs
  .readdirSync(buildJs)
  .filter((f) => f.endsWith(".js") && !f.endsWith(".map"))
  .map((f) => path.join(buildJs, f));

if (jsFiles.length === 0) {
  console.error("❌ No JS bundles in build/static/js");
  process.exit(1);
}

console.log("📦 Analyzing", jsFiles.length, "bundle(s)...\n");

try {
  execSync(
    `npx source-map-explorer ${jsFiles.map((f) => `"${f}"`).join(" ")}`,
    {
      stdio: "inherit",
    },
  );
} catch (e) {
  console.error("Install with: npm install --save-dev source-map-explorer");
  process.exit(1);
}
