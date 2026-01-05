/**
 * Navbar Components - Barrel Export
 * 
 * Component-Based Architecture - Centralized exports
 * 
 * Principles:
 * - DRY: Single import point for all navbar components
 * - KISS: Simple export structure
 */
export { default as NavbarContainer } from "./NavbarContainer";
export { default as NavbarBrand } from "./NavbarBrand";
export { default as NavbarToggle } from "./NavbarToggle";
export { default as NavbarBackdrop } from "./NavbarBackdrop";
export { default as NavbarLink } from "./NavbarLink";
export { default as NavbarLinks } from "./NavbarLinks";
export { default as NavbarMobileMenu } from "./NavbarMobileMenu";

// Re-export types
export type { NavbarBrandProps } from "./NavbarBrand";
export type { NavbarToggleProps } from "./NavbarToggle";
export type { NavbarBackdropProps } from "./NavbarBackdrop";
export type { NavbarLinkProps } from "./NavbarLink";
export type { NavbarLinksProps } from "./NavbarLinks";
export type { NavbarMobileMenuProps } from "./NavbarMobileMenu";

// Export utilities
export { NavbarEventManager } from "./utils/NavbarEventManager";
export { NavbarPositionCalculator } from "./utils/NavbarPositionCalculator";
export { NavbarPortalManager } from "./utils/NavbarPortalManager";
export { NavbarBodyScrollLock } from "./utils/NavbarBodyScrollLock";

