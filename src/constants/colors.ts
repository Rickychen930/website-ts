/**
 * Color Constants
 * Centralized color definitions for the application
 * Extracted from CSS tokens for use in TypeScript/TSX files
 * 
 * Usage:
 * import { Colors } from '@/constants';
 * <div style={{ color: Colors.ACCENT_PRIMARY }}>...</div>
 */

/**
 * Base Colors
 */
export const BaseColors = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
} as const;

/**
 * Accent Colors - Luxury Premium Palette
 */
export const AccentColors = {
  PRIMARY: '#667eea',
  ALT: '#764ba2',
  HOVER: '#7c3aed',
  LIGHT: '#a78bfa',
  DARK: '#5b21b6',
  SECONDARY: '#f093fb',
  TERTIARY: '#4facfe',
} as const;

/**
 * Background Colors
 */
export const BackgroundColors = {
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
  NAVBAR: 'rgba(255, 255, 255, 0.9)',
  NAVBAR_SCROLLED: 'rgba(255, 255, 255, 0.98)',
  STAT: '#f5f7fa',
  OVERLAY: 'rgba(0, 0, 0, 0.45)',
  DARK: '#0a0e14',
  DARK_LIGHT: '#0f1419',
} as const;

/**
 * Text Colors
 */
export const TextColors = {
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
 * Border Colors
 */
export const BorderColors = {
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
 * Gradient Definitions
 */
export const Gradients = {
  PRIMARY: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  ACCENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  ACCENT_FULL: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  LUXURY: 'linear-gradient(135deg, #ffffff 0%, #fafbfd 40%, #f5f7fa 100%)',
  SUBLIME: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
  PRIMARY_REVERSE: 'linear-gradient(135deg, #f093fb 0%, #764ba2 50%, #667eea 100%)',
  PRIMARY_RADIAL: 'radial-gradient(ellipse at top, rgba(102, 126, 234, 0.15), transparent 70%)',
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
  GRADIENTS: Gradients,
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
}

/**
 * Type exports
 */
export type BaseColor = typeof BaseColors[keyof typeof BaseColors];
export type AccentColor = typeof AccentColors[keyof typeof AccentColors];
export type BackgroundColor = typeof BackgroundColors[keyof typeof BackgroundColors];
export type TextColor = typeof TextColors[keyof typeof TextColors];
export type BorderColor = typeof BorderColors[keyof typeof BorderColors];
export type Gradient = typeof Gradients[keyof typeof Gradients];

