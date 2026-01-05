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

export interface NavbarState {
  isOpen: boolean;
  isScrolled: boolean;
  isCompact: boolean;
  activeItemId: string | null;
}

export interface NavbarConfig {
  items: NavbarItem[];
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

