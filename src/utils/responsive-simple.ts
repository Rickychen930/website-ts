/**
 * Simple Responsive Helper
 * Lightweight approach for components that just need a simple check
 *
 * Best for: Components that don't need reactive updates
 * Use ResponsiveStateManager for components that need reactive updates
 */

import { BreakpointEnum } from "../constants/config";

/**
 * Simple check if viewport is mobile or tablet
 * SSR-safe, no state management needed
 *
 * Use this for:
 * - Initial render decisions
 * - Static checks
 * - SSR compatibility
 *
 * Don't use this for:
 * - Components that need to update on resize
 * - Dynamic responsive behavior
 */
export function checkIsMobileOrTablet(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < BreakpointEnum.DESKTOP;
}

/**
 * Get viewport width
 * SSR-safe
 */
export function getViewportWidth(): number {
  if (typeof window === "undefined") return 0;
  return window.innerWidth;
}
