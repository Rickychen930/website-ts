/**
 * CSS Generator Utility
 * Generates CSS variables from TypeScript constants
 * Professional, Code-Based, DRY Architecture
 *
 * Architecture Principles:
 * - Single Source of Truth: CSS variables from TypeScript
 * - DRY: No duplication between TS and CSS
 * - KISS: Simple generation logic
 * - OOP: Organized utility functions
 *
 * Usage:
 * This utility can be used to generate CSS variables from constants
 * Run this during build time to ensure CSS stays in sync with TypeScript
 */

// Colors and Config are imported dynamically via require() in functions

/**
 * Convert camelCase to kebab-case
 * Example: accentPrimary -> accent-primary
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Convert object to CSS variables string
 * Example: { accentPrimary: '#667eea' } -> --color-accent-primary: #667eea;
 */
export function objectToCSSVariables(
  obj: Record<string, string | number>,
  prefix: string = "",
): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      const kebabKey = camelToKebab(key);
      const cssVar = prefix ? `--${prefix}-${kebabKey}` : `--${kebabKey}`;
      return `  ${cssVar}: ${value};`;
    })
    .join("\n");
}

/**
 * Generate CSS variables from Colors constant
 */
export function generateColorVariables(): string {
  const { Colors } = require("@/constants");

  const baseColors = {
    white: Colors.WHITE,
    black: Colors.BLACK,
    transparent: Colors.TRANSPARENT,
  };

  const accentColors = {
    primary: Colors.ACCENT_PRIMARY,
    alt: Colors.ACCENT_ALT,
    hover: Colors.ACCENT_HOVER,
    light: Colors.ACCENT_LIGHT,
    dark: Colors.ACCENT_DARK,
    secondary: Colors.ACCENT_SECONDARY,
    tertiary: Colors.ACCENT_TERTIARY,
  };

  const backgroundColors = {
    light: Colors.BG_LIGHT,
    lighter: Colors.BG_LIGHTER,
    lightest: Colors.BG_LIGHTEST,
    card: Colors.BG_CARD,
    cardAlt: Colors.BG_CARD_ALT,
    cardHover: Colors.BG_CARD_HOVER,
    footer: Colors.BG_FOOTER,
    footerAlt: Colors.BG_FOOTER_ALT,
    timeline: Colors.BG_TIMELINE,
    contentHover: Colors.BG_CONTENT_HOVER,
    navbar: Colors.BG_NAVBAR,
    navbarScrolled: Colors.BG_NAVBAR_SCROLLED,
    stat: Colors.BG_STAT,
    overlay: Colors.BG_OVERLAY,
    dark: Colors.BG_DARK,
    darkLight: Colors.BG_DARK_LIGHT,
  };

  const textColors = {
    main: Colors.TEXT_MAIN,
    heading: Colors.TEXT_HEADING,
    headingAlt: Colors.TEXT_HEADING_ALT,
    subtle: Colors.TEXT_SUBTLE,
    muted: Colors.TEXT_MUTED,
    mutedAlt: Colors.TEXT_MUTED_ALT,
    light: Colors.TEXT_LIGHT,
    accent: Colors.TEXT_ACCENT,
    hover: Colors.TEXT_HOVER,
    onAccent: Colors.TEXT_ON_ACCENT,
    link: Colors.TEXT_LINK,
    linkHover: Colors.TEXT_LINK_HOVER,
  };

  const borderColors = {
    light: Colors.BORDER_LIGHT,
    default: Colors.BORDER_DEFAULT,
    medium: Colors.BORDER_MEDIUM,
    dark: Colors.BORDER_DARK,
    navbar: Colors.BORDER_NAVBAR,
    navbarDropdown: Colors.BORDER_NAVBAR_DROPDOWN,
    glow: Colors.BORDER_GLOW,
    image: Colors.BORDER_IMAGE,
    period: Colors.BORDER_PERIOD,
    accent: Colors.BORDER_ACCENT,
    accentHover: Colors.BORDER_ACCENT_HOVER,
  };

  return `
  /* Base Colors */
${objectToCSSVariables(baseColors, "color")}

  /* Accent Colors */
${objectToCSSVariables(accentColors, "color-accent")}

  /* Background Colors */
${objectToCSSVariables(backgroundColors, "color-bg")}

  /* Text Colors */
${objectToCSSVariables(textColors, "color-text")}

  /* Border Colors */
${objectToCSSVariables(borderColors, "color-border")}
`;
}

/**
 * Generate CSS variables from Config constant
 */
export function generateConfigVariables(): string {
  const { Config } = require("@/constants");

  const spacing = {
    sectionPadding: Config.LAYOUT.SECTION_PADDING,
    sectionPaddingMobile: Config.LAYOUT.SECTION_PADDING_MOBILE,
    sectionMargin: Config.LAYOUT.SECTION_MARGIN,
    sectionMarginMobile: Config.LAYOUT.SECTION_MARGIN_MOBILE,
    cardPadding: Config.LAYOUT.CARD_PADDING,
    cardPaddingMobile: Config.LAYOUT.CARD_PADDING_MOBILE,
    cardMaxWidth: `${Config.LAYOUT.CARD_MAX_WIDTH}px`,
    cardRadius: `${Config.LAYOUT.CARD_RADIUS}px`,
    cardRadiusMobile: `${Config.LAYOUT.CARD_RADIUS_MOBILE}px`,
    footerPadding: Config.LAYOUT.FOOTER_PADDING,
  };

  const typography = {
    main: Config.TYPOGRAPHY.FONT_MAIN,
    mono: Config.TYPOGRAPHY.FONT_MONO,
    display: Config.TYPOGRAPHY.FONT_DISPLAY,
    sizeTitle: Config.TYPOGRAPHY.TITLE_SIZE,
    weightTitle: Config.TYPOGRAPHY.TITLE_WEIGHT,
    weightSubtitle: Config.TYPOGRAPHY.SUBTITLE_WEIGHT,
    sizeBase: Config.TYPOGRAPHY.BASE_SIZE,
    sizeTitleComponent: Config.TYPOGRAPHY.TITLE_FONT_SIZE,
    sizeSubtitle: Config.TYPOGRAPHY.SUBTITLE_FONT_SIZE,
    sizeSmall: Config.TYPOGRAPHY.SMALL_FONT_SIZE,
    sizeXs: Config.TYPOGRAPHY.XS_FONT_SIZE,
  };

  const animation = {
    durationFast: `${Config.ANIMATION.DURATION_FAST}s`,
    durationBase: `${Config.ANIMATION.DURATION_BASE}s`,
    durationSlow: `${Config.ANIMATION.DURATION_SLOW}s`,
    transitionFast: Config.ANIMATION.TRANSITION_FAST,
    transitionBase: Config.ANIMATION.TRANSITION_BASE,
    transitionSlow: Config.ANIMATION.TRANSITION_SLOW,
    transitionSmooth: Config.ANIMATION.TRANSITION_SMOOTH,
    transitionBounce: Config.ANIMATION.TRANSITION_BOUNCE,
  };

  const zIndex = {
    base: Config.Z_INDEX.BASE,
    dropdown: Config.Z_INDEX.DROPDOWN,
    sticky: Config.Z_INDEX.STICKY,
    fixed: Config.Z_INDEX.FIXED,
    modal: Config.Z_INDEX.MODAL,
    tooltip: Config.Z_INDEX.TOOLTIP,
    max: Config.Z_INDEX.MAX,
  };

  return `
  /* Spacing */
${objectToCSSVariables(spacing, "spacing")}

  /* Typography */
${objectToCSSVariables(typography, "font")}

  /* Animation */
${objectToCSSVariables(animation, "animation")}

  /* Z-Index */
${objectToCSSVariables(zIndex, "z-index")}
`;
}

/**
 * Generate complete CSS variables file content
 */
export function generateCSSVariablesFile(): string {
  return `/**
 * CSS Variables - Auto-generated from TypeScript Constants
 * DO NOT EDIT MANUALLY - This file is generated from src/constants/
 * 
 * To update variables, edit:
 * - src/constants/colors.ts
 * - src/constants/config.ts
 * 
 * Then regenerate this file using: npm run generate:css
 */

:root {
${generateColorVariables()}
${generateConfigVariables()}
}`;
}

/**
 * Export utility functions for use in build scripts
 */
export const CSSGenerator = {
  camelToKebab,
  objectToCSSVariables,
  generateColorVariables,
  generateConfigVariables,
  generateCSSVariablesFile,
};
