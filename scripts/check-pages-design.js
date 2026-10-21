#!/usr/bin/env node
/**
 * Design-token audit — Circuit Night rules from CLAUDE.md / design-system.md.
 * Run: npm run css:check
 *
 * Colours live in src/styles/design-tokens.css only. Component CSS modules and
 * TSX use `var(--…)`; no hex / rgb() / hsl() literals.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");

const COLOR_LITERAL = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|hsl)a?\(/g;
const ALLOWED = new Set(
  ["src/styles/design-tokens.css", "src/styles/base.css"].map((f) =>
    path.join(ROOT, f),
  ),
);

function walk(dir, exts, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, exts, files);
    else if (exts.some((e) => name.endsWith(e))) files.push(full);
  }
  return files;
}

const errors = [];
for (const file of walk(SRC_DIR, [".module.css", ".tsx"])) {
  if (ALLOWED.has(file)) continue;
  const hits = fs.readFileSync(file, "utf8").match(COLOR_LITERAL);
  if (hits?.length) {
    errors.push(
      `Hardcoded colour in ${path.relative(ROOT, file)}: ${[...new Set(hits)].join(", ")}`,
    );
  }
}

console.log("Design token audit (website-ts)\n");
if (errors.length) {
  console.error("Failed:\n");
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}
console.log("✓ No hardcoded colours outside design-tokens.css.");
