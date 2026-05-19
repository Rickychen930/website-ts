#!/usr/bin/env node
/**
 * Design system audit — public pages vs project.md / design-system.md rules.
 * Run: npm run css:check  (alias) or node scripts/check-pages-design.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PAGES_DIR = path.join(ROOT, "src/views/pages");
const SRC_DIR = path.join(ROOT, "src");

const PUBLIC_PAGE_DIRS = [
  "Home",
  "Projects",
  "Experience",
  "Contact",
  "ProjectDetail",
  "Resume",
  "Privacy",
  "Terms",
  "NotFound",
];

const HEX_IN_MODULE = /#[0-9a-fA-F]{3,8}\b/g;
const ALLOWED_HEX_FILES = new Set([
  path.join(ROOT, "src/styles/design-tokens.css"),
  path.join(ROOT, "src/styles/base.css"),
]);

let errors = [];
let warnings = [];

function walk(dir, ext, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, ext, files);
    else if (name.endsWith(ext)) files.push(full);
  }
  return files;
}

function checkHexInModules() {
  const modules = walk(SRC_DIR, ".module.css");
  for (const file of modules) {
    const content = fs.readFileSync(file, "utf8");
    const matches = content.match(HEX_IN_MODULE);
    if (matches?.length) {
      errors.push(
        `Hardcoded hex in ${path.relative(ROOT, file)}: ${[...new Set(matches)].join(", ")}`,
      );
    }
  }
}

function checkPublicPages() {
  for (const dir of PUBLIC_PAGE_DIRS) {
    const pagePath = path.join(PAGES_DIR, dir);
    if (!fs.existsSync(pagePath)) {
      warnings.push(`Missing page directory: ${dir}`);
      continue;
    }
    const tsxFiles = walk(pagePath, ".tsx").filter(
      (f) => !f.includes("sectionThemes"),
    );
    if (tsxFiles.length === 0) {
      warnings.push(`No .tsx in ${dir}`);
      continue;
    }
    let hasSection = false;
    let hasPageInner = false;
    for (const file of tsxFiles) {
      const content = fs.readFileSync(file, "utf8");
      if (content.includes("<Section") || content.includes("Section ")) {
        hasSection = true;
      }
      if (content.includes("page-inner") || content.includes("PageShell")) {
        hasPageInner = true;
      }
      if (
        content.includes("styles.inner") ||
        content.includes("styles.trackAccent")
      ) {
        errors.push(
          `${path.relative(ROOT, file)}: use page-inner / PageShell, not styles.inner or styles.trackAccent`,
        );
      }
    }
    if (dir !== "Home" && !hasSection && dir !== "Resume") {
      warnings.push(`${dir}: no Section component found`);
    }
    if (!hasPageInner && dir !== "Home") {
      warnings.push(`${dir}: no page-inner or PageShell wrapper`);
    }
  }
}

function checkPagePatternsImported() {
  const appCss = fs.readFileSync(path.join(ROOT, "src/App.css"), "utf8");
  if (!appCss.includes("page-patterns.css")) {
    errors.push("App.css must import page-patterns.css");
  }
}

console.log("Design page audit (website-ts)\n");
checkHexInModules();
checkPublicPages();
checkPagePatternsImported();

if (warnings.length) {
  console.log("Warnings:");
  warnings.forEach((w) => console.log(`  ⚠ ${w}`));
  console.log("");
}

if (errors.length) {
  console.error("Failed:\n");
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}

console.log("✓ All public page design checks passed.");
process.exit(0);
