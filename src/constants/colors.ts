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
 * Professional UI/UX friendly color scheme: Blue-Purple gradient
 * Clear, accessible, and modern design system
 */
export const AccentColors = {
  PRIMARY: "#3b82f6", // Professional Blue - main brand color (clear & accessible)
  ALT: "#2563eb", // Deep Blue - secondary brand color
  HOVER: "#2563eb", // Blue - hover state (darker for feedback)
  LIGHT: "#60a5fa", // Light Blue - light variant
  DARK: "#1d4ed8", // Deep Blue - dark variant
  SECONDARY: "#8b5cf6", // Purple - tertiary accent (soft & harmonious)
  TERTIARY: "#a78bfa", // Light Purple - complementary accent
  PURPLE: "#c084fc", // Soft Purple - proficiency/special use
  PURPLE_DARK: "#7c3aed", // Dark Purple - for consistency
  GLOW: "rgba(59, 130, 246, 0.25)", // Blue glow with better visibility
  GLOW_STRONG: "rgba(37, 99, 235, 0.35)", // Stronger blue glow
} as const;

/**
 * Background Colors - Light Theme
 * Clean, neutral backgrounds with subtle gray tints
 * Optimized for readability and visual hierarchy
 */
export const BackgroundColors = {
  PRIMARY: "#ffffff",
  SECONDARY: "#f9fafb", // Neutral gray - clean and subtle
  TERTIARY: "#f3f4f6", // Light gray - for depth
  QUATERNARY: "#e5e7eb", // Medium gray - for contrast

  LIGHT: "#f9fafb",
  LIGHTER: "#f3f4f6",
  LIGHTEST: "#e5e7eb",

  CARD: "#ffffff",
  CARD_ALT: "#f9fafb",
  CARD_HOVER: "#fefefe",

  FOOTER: "#f3f4f6",
  FOOTER_ALT: "#e5e7eb",

  TIMELINE: "#e5e7eb",
  CONTENT_HOVER: "#f3f4f6",
  STAT: "#f3f4f6",

  NAVBAR: "rgba(255, 255, 255, 0.95)",
  NAVBAR_SCROLLED: "rgba(255, 255, 255, 0.98)",

  OVERLAY: "rgba(0, 0, 0, 0.5)",
  DARK: "#111827", // Dark gray-black
  DARK_LIGHT: "#1f2937", // Dark gray
} as const;

/**
 * Text Colors - Light Theme
 * High contrast for accessibility and readability
 * Clear hierarchy with distinct color levels
 */
export const TextColors = {
  PRIMARY: "#111827", // Dark gray - maximum contrast
  SECONDARY: "#1f2937", // Dark gray - secondary text
  TERTIARY: "#374151", // Medium gray - tertiary text
  QUATERNARY: "#6b7280", // Light gray - quaternary text

  MAIN: "#111827",
  HEADING: "#111827", // Bold headings with max contrast
  HEADING_ALT: "#1f2937",
  SUBTLE: "#6b7280", // Subtle text - good contrast
  MUTED: "#4b5563", // Muted text
  MUTED_ALT: "#9ca3af", // Light muted text
  LIGHT: "#9ca3af", // Light text for secondary info
  ACCENT: "#374151", // Accent text color
  HOVER: "#3b82f6", // Blue hover - clear feedback
  ON_ACCENT: "#ffffff", // White text on colored backgrounds
  LINK: "#2563eb", // Blue link - clear and accessible
  LINK_HOVER: "#1d4ed8", // Darker blue on hover
} as const;

/**
 * Border Colors - Light Theme
 * Clear, visible borders with good contrast
 * Subtle but noticeable for UI elements
 */
export const BorderColors = {
  PRIMARY: "rgba(229, 231, 235, 0.8)", // Light gray with good visibility
  SECONDARY: "#e5e7eb", // Standard gray border
  TERTIARY: "#d1d5db", // Medium gray border
  QUATERNARY: "#9ca3af", // Dark gray border

  LIGHT: "rgba(229, 231, 235, 0.8)",
  DEFAULT: "#e5e7eb",
  MEDIUM: "#d1d5db",
  DARK: "#9ca3af",

  NAVBAR: "rgba(229, 231, 235, 0.6)",
  NAVBAR_DROPDOWN: "rgba(229, 231, 235, 0.8)",

  GLOW: "rgba(59, 130, 246, 0.25)", // Blue glow - clear and visible
  IMAGE: "#e5e7eb",
  PERIOD: "#d1d5db",
  ACCENT: "rgba(59, 130, 246, 0.4)", // Blue accent border
  ACCENT_HOVER: "rgba(37, 99, 235, 0.6)", // Stronger blue on hover
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

  INFO: "#3b82f6", // Professional blue - info state
  INFO_LIGHT: "rgba(59, 130, 246, 0.1)",
  INFO_DARK: "#2563eb",
  INFO_TEXT: "#1d4ed8",
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
  DEFAULT: "#3b82f6", // Fallback to accent primary (professional blue)
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
 * Professional gradients: Blue-Purple
 * Clear, harmonious, and visually appealing
 */
export const Gradients = {
  PRIMARY: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
  ACCENT: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  ACCENT_FULL: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #8b5cf6 100%)",
  LUXURY: "linear-gradient(135deg, #ffffff 0%, #f9fafb 40%, #f3f4f6 100%)",
  SUBLIME:
    "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)",
  PRIMARY_REVERSE:
    "linear-gradient(135deg, #8b5cf6 0%, #2563eb 50%, #3b82f6 100%)",
  PRIMARY_RADIAL:
    "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.12), transparent 70%)",
  ACCENT_SUBTLE:
    "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)",
} as const;

/**
 * Dark Theme Colors - For reference only
 * Use CSS variables for theme-aware colors: var(--color-*)
 */
export const DarkThemeColors = {
  BACKGROUND: {
    PRIMARY: "#111827", // Dark gray
    SECONDARY: "#1f2937", // Darker gray
    TERTIARY: "#374151", // Medium dark gray
    CARD: "#1f2937", // Card background
    CARD_HOVER: "#4b5563", // Hover state
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
    INFO: "#3b82f6", // Professional blue for info in dark mode
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
  ACCENT_PRIMARY = "#3b82f6",
  ACCENT_ALT = "#2563eb",
  ACCENT_HOVER = "#2563eb",
  ACCENT_LIGHT = "#60a5fa",
  ACCENT_DARK = "#1d4ed8",
  ACCENT_SECONDARY = "#8b5cf6",
  ACCENT_TERTIARY = "#a78bfa",
  ACCENT_PURPLE = "#c084fc",

  // Text
  TEXT_MAIN = "#111827",
  TEXT_HEADING = "#111827",
  TEXT_SUBTLE = "#6b7280",
  TEXT_LINK = "#2563eb", // Professional blue

  // Status
  SUCCESS = "#10b981",
  ERROR = "#ef4444",
  WARNING = "#f59e0b",
  INFO = "#3b82f6",
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
