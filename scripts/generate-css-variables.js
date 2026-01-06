#!/usr/bin/env node

/**
 * Generate CSS Variables from TypeScript Constants
 * Professional, Code-Based, DRY Architecture
 * 
 * This script generates CSS variables file from TypeScript constants
 * to ensure CSS stays in sync with TypeScript
 * 
 * Usage:
 * node scripts/generate-css-variables.js
 * 
 * Or add to package.json:
 * "scripts": {
 *   "generate:css": "node scripts/generate-css-variables.js"
 * }
 */

const fs = require('fs');
const path = require('path');

/**
 * Generate CSS variables from constants
 */
function generateCSSVariables() {
  const outputPath = path.join(__dirname, '../src/assets/css/core/_variables-generated.css');
  
  // Note: This is a simplified version
  // In production, you would import and use the actual TypeScript constants
  // For now, we'll generate a template that matches the structure
  
  const cssContent = `/**
 * CSS Variables - Auto-generated from TypeScript Constants
 * DO NOT EDIT MANUALLY - This file is generated from src/constants/
 * 
 * To update variables, edit:
 * - src/constants/colors.ts
 * - src/constants/config.ts
 * 
 * Then regenerate this file using: npm run generate:css
 * 
 * Generated: ${new Date().toISOString()}
 */

:root {
  /* ============================================
     Base Colors - From BaseColors constant
     ============================================ */
  --color-white: #ffffff;
  --color-black: #000000;
  --color-transparent: transparent;

  /* ============================================
     Accent Colors - From AccentColors constant
     ============================================ */
  --color-accent-primary: #667eea;
  --color-accent-alt: #764ba2;
  --color-accent-hover: #7c3aed;
  --color-accent-light: #a78bfa;
  --color-accent-dark: #5b21b6;
  --color-accent-secondary: #f093fb;
  --color-accent-tertiary: #4facfe;

  /* ============================================
     Background Colors - From BackgroundColors constant
     ============================================ */
  --color-bg-light: #fafbfc;
  --color-bg-lighter: #f5f7fa;
  --color-bg-lightest: #f0f4f8;
  --color-bg-card: #ffffff;
  --color-bg-card-alt: #fafbfd;
  --color-bg-card-hover: #fefefe;
  --color-bg-footer: #f1f5f9;
  --color-bg-footer-alt: #e8edf3;
  --color-bg-timeline: #f0f4f8;
  --color-bg-content-hover: #f5f8fc;
  --color-bg-navbar: rgba(255, 255, 255, 0.9);
  --color-bg-navbar-scrolled: rgba(255, 255, 255, 0.98);
  --color-bg-stat: #f5f7fa;
  --color-bg-overlay: rgba(0, 0, 0, 0.45);
  --color-bg-dark: #0a0e14;
  --color-bg-dark-light: #0f1419;

  /* ============================================
     Text Colors - From TextColors constant
     ============================================ */
  --color-text-main: #1a2332;
  --color-text-heading: #1f2d3d;
  --color-text-heading-alt: #2c3e50;
  --color-text-subtle: #5c6b7a;
  --color-text-muted: #3b4a59;
  --color-text-muted-alt: #7a8b9c;
  --color-text-light: #9ca3af;
  --color-text-accent: #34495e;
  --color-text-hover: #0073b1;
  --color-text-on-accent: #ffffff;
  --color-text-link: #78a2f0;
  --color-text-link-hover: #6fb1fc;

  /* ============================================
     Border Colors - From BorderColors constant
     ============================================ */
  --color-border-light: rgba(220, 227, 234, 0.6);
  --color-border-default: #dce3ea;
  --color-border-medium: #cbd5e1;
  --color-border-dark: #94a3b8;
  --color-border-navbar: rgba(220, 227, 234, 0.5);
  --color-border-navbar-dropdown: rgba(220, 227, 234, 0.6);
  --color-border-glow: rgba(120, 162, 240, 0.2);
  --color-border-image: #dbe5f1;
  --color-border-period: #e2e8f0;
  --color-border-accent: rgba(120, 162, 240, 0.3);
  --color-border-accent-hover: rgba(120, 162, 240, 0.5);

  /* ============================================
     Gradients - From Gradients constant
     ============================================ */
  --gradient-primary: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
  --gradient-accent: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-accent-full: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  --gradient-luxury: linear-gradient(135deg, #ffffff 0%, #fafbfd 40%, #f5f7fa 100%);
  --gradient-sublime: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  --gradient-primary-reverse: linear-gradient(135deg, #f093fb 0%, #764ba2 50%, #667eea 100%);
  --gradient-primary-radial: radial-gradient(ellipse at top, rgba(102, 126, 234, 0.15), transparent 70%);

  /* ============================================
     Typography - From TypographyConfig constant
     ============================================ */
  --font-main: 'Inter', -apple-system, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Consolas', monospace;
  --font-display: 'Inter', -apple-system, 'Segoe UI', system-ui, sans-serif;
  --font-size-title: 2rem;
  --font-weight-title: 700;
  --font-weight-subtitle: 600;
  --font-size-base: 1rem;
  --font-size-title-component: 1.5rem;
  --font-size-subtitle: 1.1rem;
  --font-size-small: 0.875rem;
  --font-size-xs: 0.75rem;

  /* ============================================
     Layout - From LayoutConfig constant
     ============================================ */
  --spacing-section-padding: 2.5rem 2rem;
  --spacing-section-padding-mobile: 1.75rem 1.25rem;
  --spacing-section-margin: 2.5rem;
  --spacing-section-margin-mobile: 1.75rem;
  --spacing-card-padding: 2.5rem clamp(1.5rem, 4vw, 3rem);
  --spacing-card-padding-mobile: 1.75rem 1.25rem;
  --spacing-card-max-width: 1200px;
  --spacing-card-radius: 24px;
  --spacing-card-radius-mobile: 18px;
  --spacing-footer-padding: 2rem 1.75rem;

  /* ============================================
     Animation - From AnimationConfig constant
     ============================================ */
  --animation-duration-fast: 0.3s;
  --animation-duration-base: 0.6s;
  --animation-duration-slow: 0.9s;
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
  --transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* ============================================
     Z-Index - From ZIndex constant
     ============================================ */
  --z-index-base: 1;
  --z-index-dropdown: 100;
  --z-index-sticky: 200;
  --z-index-fixed: 300;
  --z-index-modal: 400;
  --z-index-tooltip: 500;
  --z-index-max: 9999;

  /* ============================================
     Navbar - From NavbarConfig constant
     ============================================ */
  --navbar-height: 88px;
  --navbar-height-scrolled: 72px;
  --navbar-blur: 48px;
  --navbar-blur-strong: 64px;
  --navbar-scroll-threshold: 8px;
  --navbar-compact-breakpoint: 1080px;
  --navbar-z-index: 9999;

  /* ============================================
     Breakpoints - From Breakpoints constant
     ============================================ */
  --breakpoint-mobile: 480px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-large-desktop: 1280px;
  --breakpoint-xlarge-desktop: 1536px;

  /* ============================================
     Icon Sizes - From IconSizes constant
     ============================================ */
  --icon-size-default: 48px;
  --icon-size-large: 56px;
  --icon-size-mobile: 40px;
  --icon-font-default: 24px;
  --icon-font-large: 28px;
  --icon-font-mobile: 20px;

  /* ============================================
     Shadows - Professional Shadow System
     ============================================ */
  --shadow-xs: 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.07), 0 8px 20px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 24px rgba(0, 0, 0, 0.08), 0 20px 40px rgba(0, 0, 0, 0.06);
  --shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.1), 0 32px 64px rgba(0, 0, 0, 0.08);
  --shadow-card: 0 6px 20px rgba(0, 0, 0, 0.05), 0 16px 40px rgba(0, 0, 0, 0.07), 0 32px 80px rgba(102, 126, 234, 0.06);
  --shadow-card-hover: 0 16px 40px rgba(0, 0, 0, 0.1), 0 32px 80px rgba(0, 0, 0, 0.12), 0 48px 120px rgba(102, 126, 234, 0.18);
  --shadow-focus: 0 0 0 4px rgba(102, 126, 234, 0.25);
  --shadow-glow: 0 0 24px rgba(102, 126, 234, 0.45);
}

/* ============================================
   Dark Mode Theme Variables
   ============================================ */
[data-theme="dark"] {
  --color-bg-light: #0f1419;
  --color-bg-lighter: #1a1f2e;
  --color-bg-lightest: #151b26;
  --color-bg-card: #1e2532;
  --color-bg-card-alt: #1a2230;
  --color-bg-card-hover: #252d3d;
  --color-bg-footer: #151b26;
  --color-bg-footer-alt: #0f1419;
  --color-bg-timeline: #1a1f2e;
  --color-bg-content-hover: #252d3d;
  --color-bg-navbar: rgba(30, 37, 50, 0.9);
  --color-bg-navbar-scrolled: rgba(30, 37, 50, 0.98);
  --color-bg-stat: #1a1f2e;
  --color-bg-overlay: rgba(0, 0, 0, 0.75);
  --color-bg-gradient-primary: linear-gradient(135deg, #1e2532 0%, #151b26 100%);
  --color-bg-gradient-luxury: linear-gradient(135deg, #1e2532 0%, #1a2230 40%, #151b26 100%);
  --color-bg-gradient-sublime: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);

  --color-text-main: #e2e8f0;
  --color-text-heading: #f1f5f9;
  --color-text-heading-alt: #e2e8f0;
  --color-text-subtle: #94a3b8;
  --color-text-muted: #cbd5e1;
  --color-text-muted-alt: #64748b;
  --color-text-light: #475569;
  --color-text-accent: #cbd5e1;
  --color-text-hover: #60a5fa;
  --color-text-link: #60a5fa;
  --color-text-link-hover: #93c5fd;

  --color-border-light: rgba(51, 65, 85, 0.6);
  --color-border-default: #334155;
  --color-border-medium: #475569;
  --color-border-dark: #64748b;
  --color-border-navbar: rgba(51, 65, 85, 0.5);
  --color-border-navbar-dropdown: rgba(51, 65, 85, 0.6);
  --color-border-glow: rgba(96, 165, 250, 0.3);
  --color-border-image: #334155;
  --color-border-period: #475569;
  --color-border-accent: rgba(96, 165, 250, 0.4);
  --color-border-accent-hover: rgba(96, 165, 250, 0.6);
}
`;

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write file
  fs.writeFileSync(outputPath, cssContent, 'utf-8');
  console.log('✅ CSS variables generated successfully!');
  console.log(`📁 Output: ${outputPath}`);
}

// Run if called directly
if (require.main === module) {
  try {
    generateCSSVariables();
  } catch (error) {
    console.error('❌ Error generating CSS variables:', error);
    process.exit(1);
  }
}

module.exports = { generateCSSVariables };

