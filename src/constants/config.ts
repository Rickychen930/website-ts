/**
 * Configuration Constants
 * Application-wide configuration values
 *
 * Usage:
 * import { Config } from '@/constants';
 * const timeout = Config.API.TIMEOUT;
 */

/**
 * API Configuration
 */
export const ApiConfig = {
  TIMEOUT: 15000,
  RETRIES: 3,
  RETRY_DELAY: 1000,
  CACHE_TIME: 60000, // 1 minute
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
} as const;

/**
 * Retry Configuration
 */
export const RetryConfig = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
  EXPONENTIAL_BACKOFF: true,
} as const;

/**
 * Scroll Configuration
 */
export const ScrollConfig = {
  OFFSET: 80,
  OBSERVER_THRESHOLD: 0.15,
  OBSERVER_ROOT_MARGIN: "0px 0px -100px 0px",
  INITIALIZATION_DELAY: 100,
  SMOOTH_SCROLL_DURATION: 500,
  SCROLL_THRESHOLD: 400, // Pixels to scroll before showing back-to-top button
  SCROLL_STEP_INTERVAL: 15, // ms - Scroll step interval for fallback animation
  FOCUS_DELAY: 500, // ms - Delay before focusing element after scroll
} as const;

/**
 * Navbar Configuration
 */
export const NavbarConfig = {
  HEIGHT: 88,
  HEIGHT_SCROLLED: 72,
  BLUR: 48,
  BLUR_STRONG: 64,
  SCROLL_THRESHOLD: 8,
  COMPACT_BREAKPOINT: 1080,
  Z_INDEX: 9999,
  DEFAULT_BRAND_ICON: "🌐",
  DEFAULT_BRAND_TEXT: "",
} as const;

/**
 * Animation Configuration
 */
export const AnimationConfig = {
  DURATION_FAST: 0.3,
  DURATION_BASE: 0.6,
  DURATION_SLOW: 0.9,
  TRANSITION_FAST: "0.15s ease",
  TRANSITION_BASE: "0.3s ease",
  TRANSITION_SLOW: "0.5s ease",
  TRANSITION_SMOOTH: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  TRANSITION_BOUNCE: "0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

/**
 * Layout Configuration
 */
export const LayoutConfig = {
  SECTION_PADDING: "2.5rem 2rem",
  SECTION_PADDING_MOBILE: "1.75rem 1.25rem",
  SECTION_MARGIN: "2.5rem",
  SECTION_MARGIN_MOBILE: "1.75rem",
  CARD_PADDING: "2.5rem clamp(1.5rem, 4vw, 3rem)",
  CARD_PADDING_MOBILE: "1.75rem 1.25rem",
  CARD_MAX_WIDTH: 1200,
  CARD_RADIUS: 24,
  CARD_RADIUS_MOBILE: 18,
  FOOTER_PADDING: "2rem 1.75rem",
} as const;

/**
 * Typography Configuration
 */
export const TypographyConfig = {
  FONT_MAIN:
    "'Inter', -apple-system, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
  FONT_MONO:
    "'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Consolas', monospace",
  FONT_DISPLAY: "'Inter', -apple-system, 'Segoe UI', system-ui, sans-serif",
  TITLE_SIZE: "2rem",
  TITLE_WEIGHT: 700,
  SUBTITLE_WEIGHT: 600,
  BASE_SIZE: "1rem",
  TITLE_FONT_SIZE: "1.5rem",
  SUBTITLE_FONT_SIZE: "1.1rem",
  SMALL_FONT_SIZE: "0.875rem",
  XS_FONT_SIZE: "0.75rem",
} as const;

/**
 * Z-Index Layers
 */
export const ZIndex = {
  BASE: 1,
  DROPDOWN: 100,
  STICKY: 200,
  FIXED: 300,
  MODAL: 400,
  TOOLTIP: 500,
  MAX: 9999,
} as const;

/**
 * Breakpoints (in pixels)
 */
export const Breakpoints = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1280,
  XLARGE_DESKTOP: 1536,
} as const;

/**
 * Icon Sizes
 */
export const IconSizes = {
  DEFAULT: 48, // 3rem
  LARGE: 56, // 3.5rem
  MOBILE: 40, // 2.5rem
  FONT_DEFAULT: 24, // 1.5rem
  FONT_LARGE: 28, // 1.75rem
  FONT_MOBILE: 20, // 1.25rem
} as const;

/**
 * Combined Config Object
 */
export const Config = {
  API: ApiConfig,
  RETRY: RetryConfig,
  SCROLL: ScrollConfig,
  NAVBAR: NavbarConfig,
  ANIMATION: AnimationConfig,
  LAYOUT: LayoutConfig,
  TYPOGRAPHY: TypographyConfig,
  Z_INDEX: ZIndex,
  BREAKPOINTS: Breakpoints,
  ICON_SIZES: IconSizes,
} as const;

/**
 * Config Enums for type safety
 */
export enum ZIndexEnum {
  BASE = 1,
  DROPDOWN = 100,
  STICKY = 200,
  FIXED = 300,
  MODAL = 400,
  TOOLTIP = 500,
  MAX = 9999,
}

export enum BreakpointEnum {
  MOBILE = 480,
  TABLET = 768,
  DESKTOP = 1024,
  LARGE_DESKTOP = 1280,
  XLARGE_DESKTOP = 1536,
}

/**
 * Type exports
 */
export type ApiConfigType = typeof ApiConfig;
export type ScrollConfigType = typeof ScrollConfig;
export type NavbarConfigType = typeof NavbarConfig;
export type Breakpoint = (typeof Breakpoints)[keyof typeof Breakpoints];
