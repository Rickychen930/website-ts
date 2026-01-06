/**
 * Navbar Types - Type definitions for navbar component
 * Follows TypeScript best practices and type safety
 */

export interface NavbarItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

export interface NavbarDropdownItem extends NavbarItem {
  children?: NavbarItem[];
}

export type NavbarItemType = NavbarItem | NavbarDropdownItem;

export interface NavbarState {
  isOpen: boolean;
  isScrolled: boolean;
  isCompact: boolean;
  activeItemId: string | null;
  openDropdownId: string | null;
}

export interface NavbarConfig {
  items: NavbarItemType[];
  brandIcon?: string;
  brandText?: string;
  brandLogo?: string; // Logo image path
  scrollThreshold?: number;
  compactBreakpoint?: number;
}

export interface NavbarViewProps {
  config: NavbarConfig;
  state: NavbarState;
  onToggleMenu: () => void;
  onItemClick: (itemId: string) => void;
  onBrandClick: () => void;
}

