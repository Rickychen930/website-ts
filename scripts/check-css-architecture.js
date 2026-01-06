#!/usr/bin/env node

/**
 * CSS Architecture Checker
 * Validates CSS files against architecture guidelines
 * 
 * Usage:
 * node scripts/check-css-architecture.js [file-path]
 * 
 * Or add to package.json:
 * "scripts": {
 *   "check:css": "node scripts/check-css-architecture.js"
 * }
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

/**
 * Check for hardcoded colors
 */
function checkHardcodedColors(cssContent, filePath) {
  const issues = [];
  const lines = cssContent.split('\n');
  const colorPattern = /(color|background|border-color):\s*#[0-9a-fA-F]{3,6}/gi;

  lines.forEach((line, index) => {
    if (colorPattern.test(line)) {
      const match = line.match(/(\w+):\s*(#[0-9a-fA-F]{3,6})/i);
      if (match) {
        issues.push({
          file: filePath,
          line: index + 1,
          type: 'hardcoded-color',
          property: match[1],
          value: match[2],
          suggestion: 'Use CSS variable: var(--color-*)',
        });
      }
    }
  });

  return issues;
}

/**
 * Check for hardcoded spacing
 */
function checkHardcodedSpacing(cssContent, filePath) {
  const issues = [];
  const lines = cssContent.split('\n');
  const spacingPattern = /(padding|margin|gap|top|bottom|left|right):\s*\d+px/gi;

  lines.forEach((line, index) => {
    if (spacingPattern.test(line)) {
      const match = line.match(/(\w+):\s*(\d+px)/i);
      if (match) {
        issues.push({
          file: filePath,
          line: index + 1,
          type: 'hardcoded-spacing',
          property: match[1],
          value: match[2],
          suggestion: 'Use CSS variable: var(--spacing-*)',
        });
      }
    }
  });

  return issues;
}

/**
 * Check for non-BEM class names
 */
function checkBEMNaming(cssContent, filePath) {
  const issues = [];
  const lines = cssContent.split('\n');
  const classPattern = /\.([a-zA-Z0-9_-]+)\s*\{/g;

  lines.forEach((line, index) => {
    const matches = [...line.matchAll(classPattern)];
    matches.forEach(match => {
      const className = match[1];
      // Check if it's not a utility class and doesn't follow BEM
      const isUtility = /^(flex|grid|text|bg|border|shadow|p|m|w|h|z|transition)/.test(className);
      const isBEM = className.includes('__') || className.includes('--');
      const isCSSVariable = className.startsWith('--');
      
      if (!isUtility && !isBEM && !isCSSVariable && !className.includes(':')) {
        // Allow some exceptions
        const exceptions = ['card', 'btn', 'input', 'form', 'loading', 'empty-state'];
        if (!exceptions.includes(className.split('-')[0])) {
          issues.push({
            file: filePath,
            line: index + 1,
            type: 'non-bem-naming',
            className: className,
            suggestion: 'Use BEM naming: block__element--modifier',
          });
        }
      }
    });
  });

  return issues;
}

/**
 * Check CSS file
 */
function checkCSSFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];

  // Skip generated files
  if (filePath.includes('_variables-generated.css') || 
      filePath.includes('_variables.css') ||
      filePath.includes('tokens.css')) {
    return issues;
  }

  issues.push(...checkHardcodedColors(content, filePath));
  issues.push(...checkHardcodedSpacing(content, filePath));
  issues.push(...checkBEMNaming(content, filePath));

  return issues;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const targetFile = args[0];

  let files = [];
  
  if (targetFile) {
    // Check specific file
    files = [path.resolve(targetFile)];
  } else {
    // Check all CSS files
    const cssFiles = await glob('src/**/*.css', {
      ignore: ['node_modules/**', 'build/**', 'dist/**'],
    });
    files = cssFiles.map(f => path.resolve(f));
  }

  console.log('🔍 Checking CSS architecture...\n');
  console.log(`📁 Checking ${files.length} file(s)\n`);

  const allIssues = [];
  
  files.forEach(file => {
    const issues = checkCSSFile(file);
    allIssues.push(...issues);
  });

  // Group issues by type
  const issuesByType = {
    'hardcoded-color': [],
    'hardcoded-spacing': [],
    'non-bem-naming': [],
  };

  allIssues.forEach(issue => {
    if (issuesByType[issue.type]) {
      issuesByType[issue.type].push(issue);
    }
  });

  // Print results
  if (allIssues.length === 0) {
    console.log('✅ No issues found! CSS architecture looks good.\n');
    process.exit(0);
  }

  console.log(`⚠️  Found ${allIssues.length} issue(s):\n`);

  // Hardcoded colors
  if (issuesByType['hardcoded-color'].length > 0) {
    console.log('🎨 Hardcoded Colors:');
    issuesByType['hardcoded-color'].forEach(issue => {
      console.log(`  ${issue.file}:${issue.line}`);
      console.log(`    ${issue.property}: ${issue.value}`);
      console.log(`    → ${issue.suggestion}\n`);
    });
  }

  // Hardcoded spacing
  if (issuesByType['hardcoded-spacing'].length > 0) {
    console.log('📏 Hardcoded Spacing:');
    issuesByType['hardcoded-spacing'].forEach(issue => {
      console.log(`  ${issue.file}:${issue.line}`);
      console.log(`    ${issue.property}: ${issue.value}`);
      console.log(`    → ${issue.suggestion}\n`);
    });
  }

  // Non-BEM naming
  if (issuesByType['non-bem-naming'].length > 0) {
    console.log('🏷️  Non-BEM Naming:');
    issuesByType['non-bem-naming'].forEach(issue => {
      console.log(`  ${issue.file}:${issue.line}`);
      console.log(`    .${issue.className}`);
      console.log(`    → ${issue.suggestion}\n`);
    });
  }

  console.log(`\n💡 Tip: Use CSS variables and BEM naming for consistency.\n`);
  process.exit(1);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

module.exports = { checkCSSFile };

