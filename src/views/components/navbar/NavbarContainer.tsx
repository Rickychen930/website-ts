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
import { NavbarConfig } from "../../../types/navbar";
import NavbarBrand from "./NavbarBrand";
import NavbarToggle from "./NavbarToggle";
import NavbarLinks from "./NavbarLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";
import { NavbarEventManager } from "./utils/NavbarEventManager";
import { NavbarPositionCalculator } from "./utils/NavbarPositionCalculator";
import { NavbarPortalManager } from "./utils/NavbarPortalManager";
import { NavbarBodyScrollLock } from "./utils/NavbarBodyScrollLock";
import { ThemeToggle } from "../../ui";

export interface NavbarContainerProps {
  items: string[];
  brandIcon?: string;
  brandText?: string;
  brandLogo?: string; // Logo image path
}

interface NavbarContainerState {
  controller: NavbarController;
  state: ReturnType<NavbarController["getState"]>;
}

class NavbarContainer extends Component<NavbarContainerProps, NavbarContainerState> {
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
    const config: NavbarConfig = {
      items: NavbarController.createNavbarItems(props.items),
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
        console.warn("Error in scroll handler:", error);
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
        console.warn("Error in resize handler:", error);
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

    // Set active item
    const updatedState = this.state.controller.setActiveItem(itemId);
    this.setState({ state: updatedState });

    // Smooth scroll to section
    try {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Error scrolling to section:", error);
      }
    }
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
      this.toggleRef.current
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
      this.eventManager.initializeResize(this.innerRef.current, this.handleResize);
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
  componentDidUpdate(prevProps: NavbarContainerProps, prevState: NavbarContainerState): void {
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
   * Render navigation links (desktop or mobile via portal)
   */
  private renderNavLinks(): ReactNode {
    const config = this.state.controller.getConfig();
    const { items } = config;
    const { isOpen, activeItemId, isCompact } = this.state.state;

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
            menuPosition={this.getMobileMenuPosition()}
          />
        );
      }
    }

    // Desktop menu - render normally
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
          <ThemeToggle />
        </div>
      </nav>
    );
  }
}

export default NavbarContainer;

