/**
 * NavbarPositionCalculator
 * 
 * Service Layer - Handles position calculations for mobile menu
 * Follows Single Responsibility Principle (SRP)
 * 
 * Principles:
 * - OOP: Class-based service with clear responsibilities
 * - SOLID: Single responsibility - only handles position calculations
 * - DRY: Centralized position logic
 * - KISS: Simple, focused service
 */
export interface MenuPosition {
  top: number;
  right: number;
}

export class NavbarPositionCalculator {
  /**
   * Calculate mobile menu position based on navbar and toggle button
   */
  static calculate(
    navbarElement: HTMLElement | null,
    toggleElement: HTMLElement | null
  ): MenuPosition | null {
    if (typeof window === "undefined" || !navbarElement || !toggleElement) {
      return null;
    }

    const navbarRect = navbarElement.getBoundingClientRect();
    const toggleRect = toggleElement.getBoundingClientRect();
    const scrollY = window.scrollY || 0;

    return {
      top: navbarRect.bottom + scrollY + 16, // 1rem spacing, accounting for scroll
      right: Math.max(16, window.innerWidth - toggleRect.right), // Minimum 1rem from edge
    };
  }
}

