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
  WHITE: '#ffffff',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
} as const;

/**
 * Accent Colors - Primary Brand Colors
 */
export const AccentColors = {
  PRIMARY: '#667eea',
  ALT: '#764ba2',
  HOVER: '#7c3aed',
  LIGHT: '#a78bfa',
  DARK: '#5b21b6',
  SECONDARY: '#f093fb',
  TERTIARY: '#4facfe',
  GLOW: 'rgba(102, 126, 234, 0.35)',
  GLOW_STRONG: 'rgba(118, 75, 162, 0.4)',
} as const;

/**
 * Background Colors - Light Theme
 */
export const BackgroundColors = {
  PRIMARY: '#ffffff',
  SECONDARY: '#fafbfc',
  TERTIARY: '#f5f7fa',
  QUATERNARY: '#f0f4f8',
  
  LIGHT: '#fafbfc',
  LIGHTER: '#f5f7fa',
  LIGHTEST: '#f0f4f8',
  
  CARD: '#ffffff',
  CARD_ALT: '#fafbfd',
  CARD_HOVER: '#fefefe',
  
  FOOTER: '#f1f5f9',
  FOOTER_ALT: '#e8edf3',
  
  TIMELINE: '#f0f4f8',
  CONTENT_HOVER: '#f5f8fc',
  STAT: '#f5f7fa',
  
  NAVBAR: 'rgba(255, 255, 255, 0.9)',
  NAVBAR_SCROLLED: 'rgba(255, 255, 255, 0.98)',
  
  OVERLAY: 'rgba(0, 0, 0, 0.45)',
  DARK: '#0a0e14',
  DARK_LIGHT: '#0f1419',
} as const;

/**
 * Text Colors - Light Theme
 */
export const TextColors = {
  PRIMARY: '#1a2332',
  SECONDARY: '#1f2d3d',
  TERTIARY: '#2c3e50',
  QUATERNARY: '#5c6b7a',
  
  MAIN: '#1a2332',
  HEADING: '#1f2d3d',
  HEADING_ALT: '#2c3e50',
  SUBTLE: '#5c6b7a',
  MUTED: '#3b4a59',
  MUTED_ALT: '#7a8b9c',
  LIGHT: '#9ca3af',
  ACCENT: '#34495e',
  HOVER: '#0073b1',
  ON_ACCENT: '#ffffff',
  LINK: '#78a2f0',
  LINK_HOVER: '#6fb1fc',
} as const;

/**
 * Border Colors - Light Theme
 */
export const BorderColors = {
  PRIMARY: 'rgba(220, 227, 234, 0.6)',
  SECONDARY: '#dce3ea',
  TERTIARY: '#cbd5e1',
  QUATERNARY: '#94a3b8',
  
  LIGHT: 'rgba(220, 227, 234, 0.6)',
  DEFAULT: '#dce3ea',
  MEDIUM: '#cbd5e1',
  DARK: '#94a3b8',
  
  NAVBAR: 'rgba(220, 227, 234, 0.5)',
  NAVBAR_DROPDOWN: 'rgba(220, 227, 234, 0.6)',
  
  GLOW: 'rgba(120, 162, 240, 0.2)',
  IMAGE: '#dbe5f1',
  PERIOD: '#e2e8f0',
  ACCENT: 'rgba(120, 162, 240, 0.3)',
  ACCENT_HOVER: 'rgba(120, 162, 240, 0.5)',
} as const;

/**
 * Status Colors - Light Theme
 */
export const StatusColors = {
  SUCCESS: '#22c55e',
  SUCCESS_LIGHT: 'rgba(34, 197, 94, 0.1)',
  SUCCESS_DARK: '#16a34a',
  SUCCESS_TEXT: '#15803d',
  
  ERROR: '#ef4444',
  ERROR_LIGHT: 'rgba(239, 68, 68, 0.1)',
  ERROR_DARK: '#dc2626',
  ERROR_TEXT: '#b91c1c',
  
  WARNING: '#f59e0b',
  WARNING_LIGHT: 'rgba(245, 158, 11, 0.1)',
  WARNING_DARK: '#d97706',
  WARNING_TEXT: '#b45309',
  
  INFO: '#3b82f6',
  INFO_LIGHT: 'rgba(59, 130, 246, 0.1)',
  INFO_DARK: '#2563eb',
  INFO_TEXT: '#1d4ed8',
} as const;

/**
 * Gradient Definitions - Light Theme
 */
export const Gradients = {
  PRIMARY: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  ACCENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  ACCENT_FULL: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  LUXURY: 'linear-gradient(135deg, #ffffff 0%, #fafbfd 40%, #f5f7fa 100%)',
  SUBLIME: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
  PRIMARY_REVERSE: 'linear-gradient(135deg, #f093fb 0%, #764ba2 50%, #667eea 100%)',
  PRIMARY_RADIAL: 'radial-gradient(ellipse at top, rgba(102, 126, 234, 0.15), transparent 70%)',
  ACCENT_SUBTLE: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
} as const;

/**
 * Dark Theme Colors - For reference only
 * Use CSS variables for theme-aware colors: var(--color-*)
 */
export const DarkThemeColors = {
  BACKGROUND: {
    PRIMARY: '#1e2532',
    SECONDARY: '#151b26',
    TERTIARY: '#1a1f2e',
    CARD: '#1e2532',
    CARD_HOVER: '#252d3d',
  },
  TEXT: {
    PRIMARY: '#e2e8f0',
    SECONDARY: '#f1f5f9',
    HEADING: '#f1f5f9',
    SUBTLE: '#94a3b8',
  },
  STATUS: {
    SUCCESS: '#4ade80',
    ERROR: '#f87171',
    WARNING: '#fbbf24',
    INFO: '#60a5fa',
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
  GRADIENTS: Gradients,
  DARK_THEME: DarkThemeColors,
} as const;

/**
 * Color Enums for type safety
 */
export enum ColorEnum {
  // Base
  WHITE = '#ffffff',
  BLACK = '#000000',
  TRANSPARENT = 'transparent',
  
  // Accent
  ACCENT_PRIMARY = '#667eea',
  ACCENT_ALT = '#764ba2',
  ACCENT_HOVER = '#7c3aed',
  ACCENT_LIGHT = '#a78bfa',
  ACCENT_DARK = '#5b21b6',
  ACCENT_SECONDARY = '#f093fb',
  ACCENT_TERTIARY = '#4facfe',
  
  // Text
  TEXT_MAIN = '#1a2332',
  TEXT_HEADING = '#1f2d3d',
  TEXT_SUBTLE = '#5c6b7a',
  TEXT_LINK = '#78a2f0',
  
  // Status
  SUCCESS = '#22c55e',
  ERROR = '#ef4444',
  WARNING = '#f59e0b',
  INFO = '#3b82f6',
}

/**
 * Type exports
 */
export type BaseColor = typeof BaseColors[keyof typeof BaseColors];
export type AccentColor = typeof AccentColors[keyof typeof AccentColors];
export type BackgroundColor = typeof BackgroundColors[keyof typeof BackgroundColors];
export type TextColor = typeof TextColors[keyof typeof TextColors];
export type BorderColor = typeof BorderColors[keyof typeof BorderColors];
export type StatusColor = typeof StatusColors[keyof typeof StatusColors];
export type Gradient = typeof Gradients[keyof typeof Gradients];
