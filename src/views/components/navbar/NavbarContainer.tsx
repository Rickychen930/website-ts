/**
 * NavbarContainer Component
 *
 * Main Container Component - Orchestrates all navbar sub-components
 *
 * Component-Based Architecture following:
 * - OOP: Class-based component with proper encapsulation
 * - SOLID:
 *   - SRP: Delegates to specialized components and services
 *   - OCP: Extensible via composition
 *   - DIP: Depends on abstractions (components, services)
 * - DRY: Uses reusable components and services
 * - KISS: Clear, simple structure
 * - Component-Based: Composed of smaller, focused components
 */
import React, { Component, ReactNode, createRef } from "react";
import NavbarController from "../../../controllers/navbar-controller";
import {
  NavbarConfig,
  NavbarItemType,
  NavbarDropdownItem,
} from "../../../types/navbar";
import NavbarBrand from "./NavbarBrand";
import NavbarToggle from "./NavbarToggle";
import NavbarLinks from "./NavbarLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarDropdown from "./NavbarDropdown";
import { NavbarEventManager } from "./utils/NavbarEventManager";
import { NavbarPositionCalculator } from "./utils/NavbarPositionCalculator";
import { NavbarPortalManager } from "./utils/NavbarPortalManager";
import { NavbarBodyScrollLock } from "./utils/NavbarBodyScrollLock";
import { ThemeToggle } from "../ui";
import ShareButton from "../../../components/share/share-button";
import "../../../assets/css/navbar-search.css";

export interface NavbarContainerProps {
  items: string[] | NavbarItemType[];
  brandIcon?: string;
  brandText?: string;
  brandLogo?: string; // Logo image path
  useDropdowns?: boolean; // Enable dropdown mode
}

interface NavbarContainerState {
  controller: NavbarController;
  state: ReturnType<NavbarController["getState"]>;
}

class NavbarContainer extends Component<
  NavbarContainerProps,
  NavbarContainerState
> {
  // Refs
  private innerRef = createRef<HTMLDivElement>();
  private brandRef = createRef<HTMLDivElement>();
  private linksRef = createRef<HTMLUListElement>();
  private toggleRef = createRef<HTMLButtonElement>();

  // Services (Dependency Injection pattern)
  private eventManager: NavbarEventManager;
  private portalManager: NavbarPortalManager;
  private scrollLock: NavbarBodyScrollLock;

  constructor(props: NavbarContainerProps) {
    super(props);

    // Initialize controller
    const useDropdowns = props.useDropdowns ?? false;
    const items =
      useDropdowns &&
      Array.isArray(props.items) &&
      props.items.length > 0 &&
      typeof props.items[0] !== "string"
        ? (props.items as NavbarItemType[])
        : NavbarController.createNavbarItems(props.items as string[]);

    const config: NavbarConfig = {
      items,
      brandIcon: props.brandIcon,
      brandText: props.brandText,
      brandLogo: props.brandLogo,
    };

    const controller = new NavbarController(config);

    this.state = {
      controller,
      state: controller.getState(),
    };

    // Initialize services
    this.eventManager = new NavbarEventManager();
    this.portalManager = new NavbarPortalManager();
    this.scrollLock = new NavbarBodyScrollLock();
  }

  /**
   * Handle scroll event - delegates to controller
   */
  private handleScroll = (scrollY: number): void => {
    try {
      const updatedState = this.state.controller.updateScrollState(scrollY);
      if (updatedState) {
        this.setState({ state: updatedState });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logWarn } = require("../../../utils/logger");
        logWarn("Error in scroll handler", error, "NavbarContainer");
      }
    }
  };

  /**
   * Handle resize event - delegates to controller
   */
  private handleResize = (width: number): void => {
    try {
      const updatedState = this.state.controller.updateCompactState(width);
      if (updatedState) {
        this.setState({ state: updatedState });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logWarn } = require("../../../utils/logger");
        logWarn("Error in resize handler", error, "NavbarContainer");
      }
    }
  };

  /**
   * Handle keyboard event (ESC to close menu)
   */
  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Escape" && this.state.state.isOpen) {
      this.handleCloseMenu();
    }
  };

  /**
   * Toggle mobile menu - delegates to controller
   */
  private handleToggleMenu = (): void => {
    const updatedState = this.state.controller.toggleMenu();
    this.setState({ state: updatedState });
  };

  /**
   * Close mobile menu - delegates to controller
   */
  private handleCloseMenu = (): void => {
    if (this.state.state.isOpen) {
      const closedState = this.state.controller.closeMenu();
      this.setState({ state: closedState });
    }
  };

  /**
   * Handle navigation item click
   */
  private handleItemClick = (itemId: string, href: string): void => {
    // Close mobile menu if open
    if (this.state.state.isOpen) {
      this.handleCloseMenu();
    }

    // Close any open dropdowns
    const updatedState = this.state.controller.closeDropdown();
    this.setState({ state: updatedState });

    // Set active item
    const finalState = this.state.controller.setActiveItem(itemId);
    this.setState({ state: finalState });

    // Smooth scroll to section with consistent offset
    try {
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const offset = 80; // Consistent with SmoothScrollManager
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logWarn } = require("../../../utils/logger");
        logWarn("Error scrolling to section", error, "NavbarContainer");
      }
    }
  };

  /**
   * Handle dropdown toggle
   */
  private handleDropdownToggle = (dropdownId: string): void => {
    const updatedState = this.state.controller.toggleDropdown(dropdownId);
    this.setState({ state: updatedState });
  };

  /**
   * Handle dropdown close
   */
  private handleDropdownClose = (): void => {
    const updatedState = this.state.controller.closeDropdown();
    this.setState({ state: updatedState });
  };

  /**
   * Handle brand click - scroll to top
   */
  private handleBrandClick = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.handleCloseMenu();
  };

  /**
   * Get mobile menu position
   */
  private getMobileMenuPosition() {
    return NavbarPositionCalculator.calculate(
      this.innerRef.current?.closest(".navbar") as HTMLElement | null,
      this.toggleRef.current,
    );
  }

  /**
   * Component lifecycle - Mount
   */
  componentDidMount(): void {
    if (typeof window === "undefined") return;

    // Initialize event listeners
    if (this.innerRef.current) {
      this.eventManager.initializeScroll(this.handleScroll);
      this.eventManager.initializeResize(
        this.innerRef.current,
        this.handleResize,
      );
    }
    this.eventManager.initializeKeyboard(this.handleKeyDown);

    // Setup scroll lock if menu is open
    if (this.state.state.isOpen) {
      this.scrollLock.lock();
    }
  }

  /**
   * Component lifecycle - Update
   */
  componentDidUpdate(
    prevProps: NavbarContainerProps,
    prevState: NavbarContainerState,
  ): void {
    // Handle scroll lock based on menu state
    if (this.state.state.isOpen && !prevState.state.isOpen) {
      this.scrollLock.lock();
    } else if (!this.state.state.isOpen && prevState.state.isOpen) {
      this.scrollLock.unlock();
    }
  }

  /**
   * Component lifecycle - Unmount
   */
  componentWillUnmount(): void {
    this.eventManager.cleanup();
    this.scrollLock.cleanup();
  }

  /**
   * Render brand component
   */
  private renderBrand(): ReactNode {
    const config = this.state.controller.getConfig();
    const { brandIcon, brandText, brandLogo } = config;

    return (
      <NavbarBrand
        icon={brandIcon}
        text={brandText}
        logo={brandLogo}
        onClick={this.handleBrandClick}
        brandRef={this.brandRef}
      />
    );
  }

  /**
   * Render toggle button component
   */
  private renderToggle(): ReactNode {
    return (
      <NavbarToggle
        isOpen={this.state.state.isOpen}
        onClick={this.handleToggleMenu}
        toggleRef={this.toggleRef}
      />
    );
  }

  /**
   * Check if items have dropdowns
   */
  private hasDropdowns(): boolean {
    const config = this.state.controller.getConfig();
    return config.items.some(
      (item) => "children" in item && item.children && item.children.length > 0,
    );
  }

  /**
   * Render navigation links (desktop or mobile via portal)
   */
  private renderNavLinks(): ReactNode {
    const config = this.state.controller.getConfig();
    const { items } = config;
    const { isOpen, activeItemId, isCompact, openDropdownId } =
      this.state.state;
    const useDropdowns = this.hasDropdowns();

    // Mobile menu - render via portal
    if (isCompact) {
      const portalRoot = this.portalManager.getPortalRoot();
      if (portalRoot) {
        return (
          <NavbarMobileMenu
            items={items}
            activeItemId={activeItemId}
            isOpen={isOpen}
            onClick={this.handleItemClick}
            linksRef={this.linksRef}
            portalRoot={portalRoot}
            onBackdropClick={this.handleCloseMenu}
            menuPosition={this.getMobileMenuPosition() || undefined}
          />
        );
      }
    }

    // Desktop menu - render with dropdowns if available
    if (useDropdowns) {
      return (
        <ul ref={this.linksRef} className="navbar-links" role="menubar">
          {items.map((item) => {
            const isDropdown =
              "children" in item && item.children && item.children.length > 0;

            if (isDropdown) {
              const dropdownItem = item as NavbarDropdownItem;
              const isDropdownOpen = openDropdownId === item.id;
              const isActive =
                activeItemId === item.id ||
                (dropdownItem.children?.some(
                  (child) => child.id === activeItemId,
                ) ??
                  false);

              return (
                <NavbarDropdown
                  key={item.id}
                  item={dropdownItem}
                  isOpen={isDropdownOpen}
                  isActive={isActive}
                  activeItemId={activeItemId}
                  onClick={this.handleItemClick}
                  onToggle={this.handleDropdownToggle}
                  onClose={this.handleDropdownClose}
                />
              );
            } else {
              // Regular link
              return (
                <li key={item.id} role="none">
                  <a
                    href={item.href}
                    className={`navbar-link ${activeItemId === item.id ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleItemClick(item.id, item.href);
                    }}
                    role="menuitem"
                    aria-current={activeItemId === item.id ? "page" : undefined}
                  >
                    {item.icon && (
                      <span className="navbar-link-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <span className="navbar-link-text">{item.label}</span>
                  </a>
                </li>
              );
            }
          })}
        </ul>
      );
    }

    // Desktop menu - render normally (backward compatibility)
    return (
      <NavbarLinks
        items={items}
        activeItemId={activeItemId}
        isOpen={isOpen}
        isCompact={false}
        onClick={this.handleItemClick}
        linksRef={this.linksRef}
      />
    );
  }

  /**
   * Handle search button click
   */
  private handleSearchClick = (): void => {
    // Dispatch custom event to open GlobalSearch
    const event = new CustomEvent("openGlobalSearch");
    document.dispatchEvent(event);
  };

  /**
   * Render search button
   */
  private renderSearchButton(): ReactNode {
    return (
      <button
        className="navbar-search-button"
        onClick={this.handleSearchClick}
        aria-label="Open search (Ctrl+K)"
        title="Search (Ctrl+K or Cmd+K)"
      >
        <span className="navbar-search-icon" aria-hidden="true">
          🔍
        </span>
        <span className="navbar-search-shortcut">Ctrl+K</span>
      </button>
    );
  }

  /**
   * Render main navbar structure
   */
  render(): ReactNode {
    const { isScrolled, isCompact } = this.state.state;

    const navClass = [
      "navbar",
      isScrolled ? "scrolled" : "",
      isCompact ? "compact" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <nav className={navClass} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner" ref={this.innerRef}>
          {this.renderBrand()}
          {this.renderToggle()}
          {this.renderNavLinks()}
          {this.renderSearchButton()}
          <ShareButton variant="icon" />
          <ThemeToggle />
        </div>
      </nav>
    );
  }
}

export default NavbarContainer;
