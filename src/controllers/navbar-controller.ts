/**
 * NavbarController - Business logic for navbar component
 * Follows Single Responsibility Principle (SRP) and Open/Closed Principle (OCP)
 */
import { NavbarItem, NavbarState, NavbarConfig } from "../types/navbar";

class NavbarController {
  private readonly DEFAULT_SCROLL_THRESHOLD = 8;
  private readonly DEFAULT_COMPACT_BREAKPOINT = 1080;
  private readonly DEFAULT_BRAND_ICON = "🌐";
  private readonly DEFAULT_BRAND_TEXT = "";

  private state: NavbarState;
  private config: NavbarConfig;
  private scrollThreshold: number;
  private compactBreakpoint: number;

  constructor(config: NavbarConfig) {
    this.config = config;
    this.scrollThreshold = config.scrollThreshold ?? this.DEFAULT_SCROLL_THRESHOLD;
    this.compactBreakpoint = config.compactBreakpoint ?? this.DEFAULT_COMPACT_BREAKPOINT;
    
    this.state = {
      isOpen: false,
      isScrolled: false,
      isCompact: false,
      activeItemId: null,
      openDropdownId: null,
    };
  }

  /**
   * Get current navbar state
   * @returns Current state
   */
  getState(): NavbarState {
    return { ...this.state };
  }

  /**
   * Get navbar configuration
   * @returns Current configuration
   */
  getConfig(): NavbarConfig {
    return { ...this.config };
  }

  /**
   * Update scroll state based on scroll position
   * @param scrollY - Current scroll position
   * @returns Updated state if changed
   */
  updateScrollState(scrollY: number): NavbarState | null {
    const isScrolled = scrollY > this.scrollThreshold;
    
    if (isScrolled !== this.state.isScrolled) {
      this.state.isScrolled = isScrolled;
      return this.getState();
    }
    
    return null;
  }

  /**
   * Update compact state based on window width
   * @param windowWidth - Current window width
   * @returns Updated state if changed
   */
  updateCompactState(windowWidth: number): NavbarState | null {
    const isCompact = windowWidth <= this.compactBreakpoint;
    
    if (isCompact !== this.state.isCompact) {
      this.state.isCompact = isCompact;
      return this.getState();
    }
    
    return null;
  }

  /**
   * Toggle mobile menu
   * @returns Updated state
   */
  toggleMenu(): NavbarState {
    this.state.isOpen = !this.state.isOpen;
    return this.getState();
  }

  /**
   * Close mobile menu
   * @returns Updated state
   */
  closeMenu(): NavbarState {
    if (this.state.isOpen) {
      this.state.isOpen = false;
      return this.getState();
    }
    return this.getState();
  }

  /**
   * Set active navigation item
   * @param itemId - ID of the active item
   * @returns Updated state
   */
  setActiveItem(itemId: string): NavbarState {
    this.state.activeItemId = itemId;
    return this.getState();
  }

  /**
   * Toggle dropdown menu
   * @param dropdownId - ID of the dropdown to toggle
   * @returns Updated state
   */
  toggleDropdown(dropdownId: string): NavbarState {
    if (this.state.openDropdownId === dropdownId) {
      this.state.openDropdownId = null;
    } else {
      this.state.openDropdownId = dropdownId;
    }
    return this.getState();
  }

  /**
   * Close dropdown menu
   * @returns Updated state
   */
  closeDropdown(): NavbarState {
    this.state.openDropdownId = null;
    return this.getState();
  }

  /**
   * Generate href from label (converts label to URL-friendly format)
   * @param label - Navigation item label
   * @returns URL-friendly href
   */
  static generateHref(label: string): string {
    return `#${label.toLowerCase().replace(/\s+/g, "-")}`;
  }

  /**
   * Create navbar items from string array
   * @param items - Array of navigation item labels
   * @returns Array of NavbarItem objects
   */
  static createNavbarItems(items: string[]): NavbarItem[] {
    return items.map((label, index) => ({
      id: `nav-item-${index}`,
      label,
      href: NavbarController.generateHref(label),
    }));
  }
}

export default NavbarController;

