#!/usr/bin/env node
/**
 * Build backend TypeScript to backend/dist
 * Uses: tsc -p backend/tsconfig.backend.json
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const rootDir = path.resolve(__dirname, "..");
const tsconfigPath = path.join(rootDir, "backend", "tsconfig.backend.json");
const outDir = path.join(rootDir, "backend", "dist");
const mainJs = path.join(outDir, "main.js");

if (!fs.existsSync(tsconfigPath)) {
  console.error("❌ backend/tsconfig.backend.json not found");
  process.exit(1);
}

console.log("🔶 Building backend TypeScript...");
execSync(`npx tsc -p backend/tsconfig.backend.json`, {
  cwd: rootDir,
  stdio: "inherit",
});

if (!fs.existsSync(mainJs)) {
  console.error("❌ backend/dist/main.js not found after build");
  process.exit(1);
}

console.log("✅ Backend build complete:", mainJs);
