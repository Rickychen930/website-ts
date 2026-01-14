/**
 * Responsive Utilities
 * Utility functions for responsive design detection
 *
 * Features:
 * - Breakpoint detection
 * - Window resize handling
 * - SSR-safe
 * - Performance optimized
 *
 * Principles Applied:
 * - DRY: Centralized responsive logic
 * - KISS: Simple, clear implementation
 * - Performance: Throttled resize events
 */

import { BreakpointEnum } from "../constants/config";

/**
 * Check if current viewport is mobile
 * Uses BreakpointEnum.TABLET (768px) as breakpoint
 */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < BreakpointEnum.TABLET;
}

/**
 * Check if current viewport is tablet
 * Uses BreakpointEnum.TABLET (768px) to BreakpointEnum.DESKTOP (1024px)
 */
export function isTablet(): boolean {
  if (typeof window === "undefined") return false;
  const width = window.innerWidth;
  return width >= BreakpointEnum.TABLET && width < BreakpointEnum.DESKTOP;
}

/**
 * Check if current viewport is desktop
 * Uses BreakpointEnum.DESKTOP (1024px) as breakpoint
 */
export function isDesktop(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= BreakpointEnum.DESKTOP;
}

/**
 * Check if current viewport is mobile or tablet (for carousel usage)
 * Uses BreakpointEnum.DESKTOP (1024px) as breakpoint
 * This is the standard breakpoint for switching to carousel layout
 */
export function isMobileOrTablet(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < BreakpointEnum.DESKTOP;
}

/**
 * Get current viewport width
 * SSR-safe
 */
export function getViewportWidth(): number {
  if (typeof window === "undefined") return 0;
  return window.innerWidth;
}

/**
 * Throttle function for performance optimization
 */
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): T {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  }) as T;
}

/**
 * Responsive State Manager
 * Manages responsive state with resize listener
 *
 * Usage in class components:
 * ```typescript
 * private responsiveManager = new ResponsiveStateManager();
 *
 * componentDidMount() {
 *   this.responsiveManager.initialize((isMobile) => {
 *     this.setState({ isMobile });
 *   });
 * }
 *
 * componentWillUnmount() {
 *   this.responsiveManager.cleanup();
 * }
 * ```
 */
export class ResponsiveStateManager {
  private resizeHandler: (() => void) | null = null;
  private callback: ((isMobile: boolean) => void) | null = null;
  private isInitialized = false;

  /**
   * Initialize responsive state manager
   * Sets up resize listener with throttling
   */
  initialize(callback: (isMobile: boolean) => void): void {
    if (this.isInitialized || typeof window === "undefined") return;

    this.callback = callback;

    // Initial call
    callback(isMobileOrTablet());

    // Throttled resize handler
    this.resizeHandler = throttle(() => {
      if (this.callback) {
        this.callback(isMobileOrTablet());
      }
    }, 150);

    window.addEventListener("resize", this.resizeHandler, { passive: true });
    this.isInitialized = true;
  }

  /**
   * Cleanup resize listener
   */
  cleanup(): void {
    if (!this.isInitialized || typeof window === "undefined") return;

    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
      this.resizeHandler = null;
    }

    this.callback = null;
    this.isInitialized = false;
  }

  /**
   * Get current responsive state
   */
  getCurrentState(): boolean {
    return isMobileOrTablet();
  }
}
