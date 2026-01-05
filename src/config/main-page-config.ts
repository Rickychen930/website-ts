/**
 * Main Page Configuration
 * Centralized constants following DRY principle
 */

/**
 * Retry Configuration
 */
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
} as const;

/**
 * Scroll Configuration
 */
export const SCROLL_CONFIG = {
  OFFSET: 80,
  OBSERVER_THRESHOLD: 0.15,
  OBSERVER_ROOT_MARGIN: "0px 0px -100px 0px",
  INITIALIZATION_DELAY: 100,
} as const;

