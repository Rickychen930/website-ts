/**
 * Color Constants
 * Centralized color definitions for the application
 * All colors are synchronized with CSS variables in _variables.css
 *
 * Usage:
 * import { Colors } from '@/constants';
 * <div style={{ color: Colors.ACCENT_PRIMARY }}>...</div>
 *
 * Theme Support:
 * These colors reflect the light theme values.
 * For theme-aware colors, use CSS variables: var(--color-accent-primary)
 */

/**
 * Base Colors - Universal (same for both themes)
 */
export const BaseColors = {
  WHITE: "#ffffff",
  BLACK: "#000000",
  TRANSPARENT: "transparent",
} as const;

/**
 * Accent Colors - Primary Brand Colors
 * Tech-Casual-Elegant color scheme: Cyan-Teal with soft purple accents
 * Modern, approachable, and refined design system
 */
export const AccentColors = {
  PRIMARY: "#06b6d4", // Tech Cyan - main brand color (modern & tech-forward)
  ALT: "#0891b2", // Deep Cyan - secondary brand color
  HOVER: "#0e7490", // Darker Cyan - hover state (clear feedback)
  LIGHT: "#22d3ee", // Light Cyan - light variant (casual & friendly)
  DARK: "#155e75", // Deep Teal - dark variant (elegant depth)
  SECONDARY: "#a855f7", // Soft Purple - tertiary accent (elegant & refined)
  TERTIARY: "#c084fc", // Light Purple - complementary accent (casual touch)
  PURPLE: "#d8b4fe", // Very Light Purple - proficiency/special use
  PURPLE_DARK: "#9333ea", // Rich Purple - for consistency
  GLOW: "rgba(6, 182, 212, 0.3)", // Cyan glow with tech feel
  GLOW_STRONG: "rgba(8, 145, 178, 0.4)", // Stronger cyan glow
} as const;

/**
 * Background Colors - Light Theme
 * Warm, casual backgrounds with tech-inspired subtle tints
 * Optimized for readability and modern visual hierarchy
 */
export const BackgroundColors = {
  PRIMARY: "#ffffff",
  SECONDARY: "#fafbfc", // Warm neutral gray - casual and approachable
  TERTIARY: "#f4f6f8", // Soft gray - for elegant depth
  QUATERNARY: "#e8ecf0", // Medium warm gray - for subtle contrast

  LIGHT: "#fafbfc",
  LIGHTER: "#f4f6f8",
  LIGHTEST: "#e8ecf0",

  CARD: "#ffffff",
  CARD_ALT: "#fafbfc",
  CARD_HOVER: "#fefefe",

  FOOTER: "#f4f6f8",
  FOOTER_ALT: "#e8ecf0",

  TIMELINE: "#e8ecf0",
  CONTENT_HOVER: "#f4f6f8",
  STAT: "#f4f6f8",

  NAVBAR: "rgba(255, 255, 255, 0.95)",
  NAVBAR_SCROLLED: "rgba(255, 255, 255, 0.98)",

  OVERLAY: "rgba(0, 0, 0, 0.5)",
  DARK: "#0f172a", // Tech dark - elegant deep blue-gray
  DARK_LIGHT: "#1e293b", // Dark gray with tech feel
} as const;

/**
 * Text Colors - Light Theme
 * High contrast for accessibility with casual, elegant warmth
 * Clear hierarchy with distinct color levels
 */
export const TextColors = {
  PRIMARY: "#0f172a", // Tech dark - elegant deep blue-gray
  SECONDARY: "#1e293b", // Dark gray - secondary text
  TERTIARY: "#334155", // Medium gray - tertiary text
  QUATERNARY: "#64748b", // Light gray - quaternary text

  MAIN: "#0f172a",
  HEADING: "#0f172a", // Bold headings with elegant contrast
  HEADING_ALT: "#1e293b",
  SUBTLE: "#475569", // Subtle text - casual and readable
  MUTED: "#475569", // Muted text
  MUTED_ALT: "#64748b", // Light muted text - approachable
  LIGHT: "#475569", // Light text for secondary info (WCAG AA+ compliant)
  ACCENT: "#334155", // Accent text color
  HOVER: "#06b6d4", // Cyan hover - tech feel with clear feedback
  ON_ACCENT: "#ffffff", // White text on colored backgrounds
  LINK: "#0891b2", // Cyan link - tech and accessible
  LINK_HOVER: "#0e7490", // Darker cyan on hover

  // Text Colors for Dark Backgrounds - Light Theme
  ON_DARK: "#f1f5f9", // Light text for dark backgrounds - excellent contrast
  ON_DARK_HEADING: "#ffffff", // White headings on dark backgrounds
  ON_DARK_SUBTLE: "#cbd5e1", // Light gray for subtle text on dark
  ON_DARK_MUTED: "#94a3b8", // Muted text on dark backgrounds
} as const;

/**
 * Border Colors - Light Theme
 * Elegant borders with tech-inspired subtle glows
 * Refined but noticeable for modern UI elements
 */
export const BorderColors = {
  PRIMARY: "rgba(232, 236, 240, 0.8)", // Warm light gray with good visibility
  SECONDARY: "#e8ecf0", // Standard warm gray border
  TERTIARY: "#cbd5e1", // Medium gray border
  QUATERNARY: "#94a3b8", // Dark gray border

  LIGHT: "rgba(232, 236, 240, 0.8)",
  DEFAULT: "#e8ecf0",
  MEDIUM: "#cbd5e1",
  DARK: "#94a3b8",

  NAVBAR: "rgba(232, 236, 240, 0.6)",
  NAVBAR_DROPDOWN: "rgba(232, 236, 240, 0.8)",

  GLOW: "rgba(6, 182, 212, 0.3)", // Cyan glow - tech feel
  IMAGE: "#e8ecf0",
  PERIOD: "#cbd5e1",
  ACCENT: "rgba(6, 182, 212, 0.4)", // Cyan accent border - modern tech
  ACCENT_HOVER: "rgba(8, 145, 178, 0.6)", // Stronger cyan on hover
} as const;

/**
 * Status Colors - Light Theme
 * Clear, distinct status colors with excellent contrast
 * UI/UX friendly with immediate visual recognition
 */
export const StatusColors = {
  SUCCESS: "#10b981", // Clear green - success state
  SUCCESS_LIGHT: "rgba(16, 185, 129, 0.1)",
  SUCCESS_DARK: "#059669",
  SUCCESS_TEXT: "#047857",

  ERROR: "#ef4444", // Clear red - error state
  ERROR_LIGHT: "rgba(239, 68, 68, 0.1)",
  ERROR_DARK: "#dc2626",
  ERROR_TEXT: "#b91c1c",

  WARNING: "#f59e0b", // Clear amber - warning state
  WARNING_LIGHT: "rgba(245, 158, 11, 0.1)",
  WARNING_DARK: "#d97706",
  WARNING_TEXT: "#b45309",

  INFO: "#06b6d4", // Tech cyan - info state
  INFO_LIGHT: "rgba(6, 182, 212, 0.1)",
  INFO_DARK: "#0891b2",
  INFO_TEXT: "#155e75",
} as const;

/**
 * Code Colors - Syntax Highlighting
 */
export const CodeColors = {
  KEYWORD: "#569cd6",
  VARIABLE: "#9cdcfe",
  OPERATOR: "#d4d4d4",
  BRACKET: "#ffd700",
  STRING: "#ce9178",
  PUNCTUATION: "#d4d4d4",
  COMMENT: "#6a9955",
  BACKGROUND: "#1e1e1e",
} as const;

/**
 * Social Media Brand Colors
 */
export const SocialColors = {
  LINKEDIN: "#0077b5",
  GITHUB: "#333333",
  TWITTER: "#1da1f2",
  INSTAGRAM: "#e4405f",
  FACEBOOK: "#1877f2",
  EMAIL: "#ea4335",
  DEFAULT: "#06b6d4", // Fallback to accent primary (tech cyan)
} as const;

/**
 * Special Purpose Colors
 * Note: Purple colors moved to AccentColors for consistency
 */
export const SpecialColors = {
  // Border colors
  BORDER_PRINT: "#cccccc", // Gray border for print media

  // Contact section
  CONTACT_BORDER: "#4a5568",
} as const;

/**
 * Gradient Definitions - Light Theme
 * Tech-Casual-Elegant gradients: Cyan-Teal with soft purple
 * Modern, harmonious, and visually refined
 */
export const Gradients = {
  PRIMARY: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
  ACCENT: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
  ACCENT_FULL: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #a855f7 100%)",
  LUXURY: "linear-gradient(135deg, #ffffff 0%, #fafbfc 40%, #f4f6f8 100%)",
  SUBLIME:
    "linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(8, 145, 178, 0.04) 100%)",
  PRIMARY_REVERSE:
    "linear-gradient(135deg, #a855f7 0%, #0891b2 50%, #06b6d4 100%)",
  PRIMARY_RADIAL:
    "radial-gradient(ellipse at top, rgba(6, 182, 212, 0.1), transparent 70%)",
  ACCENT_SUBTLE:
    "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(8, 145, 178, 0.06) 100%)",
} as const;

/**
 * Dark Theme Colors - For reference only
 * Use CSS variables for theme-aware colors: var(--color-*)
 * Tech-Casual-Elegant dark theme
 */
export const DarkThemeColors = {
  BACKGROUND: {
    PRIMARY: "#0f172a", // Tech dark - elegant deep blue-gray
    SECONDARY: "#1e293b", // Darker gray with tech feel
    TERTIARY: "#334155", // Medium dark gray
    CARD: "#1e293b", // Card background
    CARD_HOVER: "#334155", // Hover state
  },
  TEXT: {
    PRIMARY: "#f1f5f9",
    SECONDARY: "#e2e8f0",
    HEADING: "#ffffff",
    SUBTLE: "#cbd5e1",
  },
  STATUS: {
    SUCCESS: "#10b981", // Modern green
    ERROR: "#f87171",
    WARNING: "#fbbf24",
    INFO: "#06b6d4", // Tech cyan for info in dark mode
  },
} as const;

/**
 * Combined Colors Object for easy access
 */
export const Colors = {
  ...BaseColors,
  ...AccentColors,
  ...BackgroundColors,
  ...TextColors,
  ...BorderColors,
  ...StatusColors,
  CODE: CodeColors,
  SOCIAL: SocialColors,
  SPECIAL: SpecialColors,
  GRADIENTS: Gradients,
  DARK_THEME: DarkThemeColors,
} as const;

/**
 * Color Enums for type safety
 */
export enum ColorEnum {
  // Base
  WHITE = "#ffffff",
  BLACK = "#000000",
  TRANSPARENT = "transparent",

  // Accent
  ACCENT_PRIMARY = "#06b6d4",
  ACCENT_ALT = "#0891b2",
  ACCENT_HOVER = "#0891b2",
  ACCENT_LIGHT = "#22d3ee",
  ACCENT_DARK = "#155e75",
  ACCENT_SECONDARY = "#a855f7",
  ACCENT_TERTIARY = "#c084fc",
  ACCENT_PURPLE = "#d8b4fe",

  // Text
  TEXT_MAIN = "#0f172a",
  TEXT_HEADING = "#0f172a",
  TEXT_SUBTLE = "#64748b",
  TEXT_LINK = "#0891b2", // Tech cyan

  // Status
  SUCCESS = "#10b981",
  ERROR = "#ef4444",
  WARNING = "#f59e0b",
  INFO = "#06b6d4",
}

/**
 * Type exports
 */
export type BaseColor = (typeof BaseColors)[keyof typeof BaseColors];
export type AccentColor = (typeof AccentColors)[keyof typeof AccentColors];
export type BackgroundColor =
  (typeof BackgroundColors)[keyof typeof BackgroundColors];
export type TextColor = (typeof TextColors)[keyof typeof TextColors];
export type BorderColor = (typeof BorderColors)[keyof typeof BorderColors];
export type StatusColor = (typeof StatusColors)[keyof typeof StatusColors];
export type CodeColor = (typeof CodeColors)[keyof typeof CodeColors];
export type SocialColor = (typeof SocialColors)[keyof typeof SocialColors];
export type SpecialColor = (typeof SpecialColors)[keyof typeof SpecialColors];
export type Gradient = (typeof Gradients)[keyof typeof Gradients];
