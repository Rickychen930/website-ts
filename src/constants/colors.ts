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
 * Modern tech-oriented color scheme: Cyan-Blue-Purple gradient
 */
export const AccentColors = {
  PRIMARY: "#00d9ff", // Electric Cyan - main brand color (modern tech)
  ALT: "#0091ea", // Bright Blue - secondary brand color
  HOVER: "#00b8d4", // Cyan - hover state
  LIGHT: "#40e0d0", // Light Cyan - light variant
  DARK: "#0066cc", // Deep Blue - dark variant
  SECONDARY: "#7c3aed", // Purple - tertiary accent
  TERTIARY: "#8b5cf6", // Violet - complementary accent
  PURPLE: "#a78bfa", // Light Purple - proficiency/special use
  PURPLE_DARK: "#7c3aed", // Dark Purple - for consistency
  GLOW: "rgba(0, 217, 255, 0.35)",
  GLOW_STRONG: "rgba(0, 145, 234, 0.4)",
} as const;

/**
 * Background Colors - Light Theme
 * Modern tech backgrounds with subtle blue tint
 */
export const BackgroundColors = {
  PRIMARY: "#ffffff",
  SECONDARY: "#f8fafc", // Slight blue tint
  TERTIARY: "#f1f5f9", // Cool gray-blue
  QUATERNARY: "#e8f0f7", // Light blue-gray

  LIGHT: "#f8fafc",
  LIGHTER: "#f1f5f9",
  LIGHTEST: "#e8f0f7",

  CARD: "#ffffff",
  CARD_ALT: "#f8fafc",
  CARD_HOVER: "#fefefe",

  FOOTER: "#f1f5f9",
  FOOTER_ALT: "#e8f0f7",

  TIMELINE: "#e8f0f7",
  CONTENT_HOVER: "#f1f5f9",
  STAT: "#f1f5f9",

  NAVBAR: "rgba(255, 255, 255, 0.9)",
  NAVBAR_SCROLLED: "rgba(255, 255, 255, 0.98)",

  OVERLAY: "rgba(0, 0, 0, 0.45)",
  DARK: "#0a1625", // Dark blue-black
  DARK_LIGHT: "#0f1b2e", // Dark blue-gray
} as const;

/**
 * Text Colors - Light Theme
 * Harmonized with accent color scheme
 */
export const TextColors = {
  PRIMARY: "#1a2332",
  SECONDARY: "#1f2d3d",
  TERTIARY: "#2c3e50",
  QUATERNARY: "#5c6b7a",

  MAIN: "#1a2332",
  HEADING: "#1f2d3d",
  HEADING_ALT: "#2c3e50",
  SUBTLE: "#5c6b7a",
  MUTED: "#3b4a59",
  MUTED_ALT: "#7a8b9c",
  LIGHT: "#9ca3af",
  ACCENT: "#34495e",
  HOVER: "#00d9ff", // Modern tech: uses accent primary (cyan)
  ON_ACCENT: "#ffffff",
  LINK: "#0091ea", // Modern tech: bright blue for links
  LINK_HOVER: "#00d9ff", // Modern tech: cyan hover
} as const;

/**
 * Border Colors - Light Theme
 * Harmonized with accent color scheme
 */
export const BorderColors = {
  PRIMARY: "rgba(220, 227, 234, 0.6)",
  SECONDARY: "#dce3ea",
  TERTIARY: "#cbd5e1",
  QUATERNARY: "#94a3b8",

  LIGHT: "rgba(220, 227, 234, 0.6)",
  DEFAULT: "#dce3ea",
  MEDIUM: "#cbd5e1",
  DARK: "#94a3b8",

  NAVBAR: "rgba(220, 227, 234, 0.5)",
  NAVBAR_DROPDOWN: "rgba(220, 227, 234, 0.6)",

  GLOW: "rgba(0, 217, 255, 0.2)", // Modern tech: cyan glow
  IMAGE: "#dbe5f1",
  PERIOD: "#e2e8f0",
  ACCENT: "rgba(0, 217, 255, 0.3)", // Modern tech: cyan accent
  ACCENT_HOVER: "rgba(0, 217, 255, 0.5)", // Modern tech: cyan hover
} as const;

/**
 * Status Colors - Light Theme
 * Modern tech status colors with better contrast
 */
export const StatusColors = {
  SUCCESS: "#10b981", // Modern green
  SUCCESS_LIGHT: "rgba(16, 185, 129, 0.1)",
  SUCCESS_DARK: "#059669",
  SUCCESS_TEXT: "#047857",

  ERROR: "#ef4444", // Keep red for errors
  ERROR_LIGHT: "rgba(239, 68, 68, 0.1)",
  ERROR_DARK: "#dc2626",
  ERROR_TEXT: "#b91c1c",

  WARNING: "#f59e0b", // Amber for warnings
  WARNING_LIGHT: "rgba(245, 158, 11, 0.1)",
  WARNING_DARK: "#d97706",
  WARNING_TEXT: "#b45309",

  INFO: "#0091ea", // Modern tech blue
  INFO_LIGHT: "rgba(0, 145, 234, 0.1)",
  INFO_DARK: "#0066cc",
  INFO_TEXT: "#0052a3",
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
  DEFAULT: "#00d9ff", // Fallback to accent primary (modern tech cyan)
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
 * Modern tech gradients: Cyan-Blue-Purple
 */
export const Gradients = {
  PRIMARY: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  ACCENT: "linear-gradient(135deg, #00d9ff 0%, #0091ea 100%)",
  ACCENT_FULL: "linear-gradient(135deg, #00d9ff 0%, #0091ea 50%, #7c3aed 100%)",
  LUXURY: "linear-gradient(135deg, #ffffff 0%, #f8fafc 40%, #f1f5f9 100%)",
  SUBLIME:
    "linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(0, 145, 234, 0.05) 100%)",
  PRIMARY_REVERSE:
    "linear-gradient(135deg, #7c3aed 0%, #0091ea 50%, #00d9ff 100%)",
  PRIMARY_RADIAL:
    "radial-gradient(ellipse at top, rgba(0, 217, 255, 0.15), transparent 70%)",
  ACCENT_SUBTLE:
    "linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(0, 145, 234, 0.1) 100%)",
} as const;

/**
 * Dark Theme Colors - For reference only
 * Use CSS variables for theme-aware colors: var(--color-*)
 */
export const DarkThemeColors = {
  BACKGROUND: {
    PRIMARY: "#0f1b2e", // Dark blue-gray
    SECONDARY: "#0a1625", // Darker blue-black
    TERTIARY: "#151f2e", // Medium dark blue
    CARD: "#1a2538", // Card background with blue tint
    CARD_HOVER: "#1f2a3f", // Hover state
  },
  TEXT: {
    PRIMARY: "#e2e8f0",
    SECONDARY: "#f1f5f9",
    HEADING: "#f1f5f9",
    SUBTLE: "#94a3b8",
  },
  STATUS: {
    SUCCESS: "#10b981", // Modern green
    ERROR: "#f87171",
    WARNING: "#fbbf24",
    INFO: "#00d9ff", // Cyan for info in dark mode
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
  ACCENT_PRIMARY = "#00d9ff",
  ACCENT_ALT = "#0091ea",
  ACCENT_HOVER = "#00b8d4",
  ACCENT_LIGHT = "#40e0d0",
  ACCENT_DARK = "#0066cc",
  ACCENT_SECONDARY = "#7c3aed",
  ACCENT_TERTIARY = "#8b5cf6",
  ACCENT_PURPLE = "#a78bfa",

  // Text
  TEXT_MAIN = "#1a2332",
  TEXT_HEADING = "#1f2d3d",
  TEXT_SUBTLE = "#5c6b7a",
  TEXT_LINK = "#0091ea", // Modern tech: bright blue

  // Status
  SUCCESS = "#10b981",
  ERROR = "#ef4444",
  WARNING = "#f59e0b",
  INFO = "#0091ea",
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
