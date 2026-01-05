/**
 * NavbarBodyScrollLock
 * 
 * Service Layer - Handles body scroll locking when menu is open
 * Follows Single Responsibility Principle (SRP)
 * 
 * Principles:
 * - OOP: Class-based service with clear responsibilities
 * - SOLID: Single responsibility - only handles scroll locking
 * - DRY: Centralized scroll lock logic
 * - KISS: Simple, focused service
 */
export class NavbarBodyScrollLock {
  private isLocked = false;

  /**
   * Lock body scroll
   */
  lock(): void {
    if (typeof document === "undefined" || this.isLocked) return;
    document.body.style.overflow = "hidden";
    this.isLocked = true;
  }

  /**
   * Unlock body scroll
   */
  unlock(): void {
    if (typeof document === "undefined" || !this.isLocked) return;
    document.body.style.overflow = "";
    this.isLocked = false;
  }

  /**
   * Check if scroll is currently locked
   */
  get locked(): boolean {
    return this.isLocked;
  }

  /**
   * Cleanup - ensure scroll is unlocked
   */
  cleanup(): void {
    this.unlock();
  }
}

