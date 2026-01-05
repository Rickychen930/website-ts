/**
 * NavbarPortalManager
 * 
 * Service Layer - Handles portal root creation and management
 * Follows Single Responsibility Principle (SRP)
 * 
 * Principles:
 * - OOP: Class-based service with clear responsibilities
 * - SOLID: Single responsibility - only handles portal management
 * - DRY: Centralized portal logic
 * - KISS: Simple, focused service
 */
export class NavbarPortalManager {
  private static readonly PORTAL_ID = "navbar-menu-portal";
  private portalRoot: HTMLElement | null = null;

  /**
   * Get or create portal root element
   */
  getPortalRoot(): HTMLElement | null {
    if (typeof document === "undefined") return null;

    if (!this.portalRoot) {
      let root = document.getElementById(NavbarPortalManager.PORTAL_ID);
      if (!root) {
        root = document.createElement("div");
        root.id = NavbarPortalManager.PORTAL_ID;
        document.body.appendChild(root);
      }
      this.portalRoot = root;
    }

    return this.portalRoot;
  }

  /**
   * Cleanup portal root (optional, usually not needed)
   */
  cleanup(): void {
    if (this.portalRoot && this.portalRoot.parentNode) {
      this.portalRoot.parentNode.removeChild(this.portalRoot);
      this.portalRoot = null;
    }
  }
}

