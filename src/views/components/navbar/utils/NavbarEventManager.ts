/**
 * NavbarEventManager
 * 
 * Service Layer - Handles all event management for navbar
 * Follows Single Responsibility Principle (SRP)
 * 
 * Principles:
 * - OOP: Class-based service with clear responsibilities
 * - SOLID: Single responsibility - only handles events
 * - DRY: Centralized event handling logic
 * - KISS: Simple, focused service
 */
export type ScrollHandler = (scrollY: number) => void;
export type ResizeHandler = (width: number) => void;
export type KeyHandler = (e: KeyboardEvent) => void;

export class NavbarEventManager {
  private scrollHandler?: ScrollHandler;
  private resizeHandler?: ResizeHandler;
  private keyHandler?: KeyHandler;
  private resizeObserver?: ResizeObserver;
  private isInitialized = false;

  /**
   * Initialize scroll event listener
   */
  initializeScroll(handler: ScrollHandler): void {
    if (typeof window === "undefined") return;

    this.scrollHandler = handler;
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll(); // Initial call
  }

  /**
   * Initialize resize observer or fallback to resize event
   */
  initializeResize(target: HTMLElement, handler: ResizeHandler): void {
    if (typeof window === "undefined") return;

    this.resizeHandler = handler;

    if ("ResizeObserver" in window && target) {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(target);
    } else {
      window.addEventListener("resize", this.handleResize);
    }

    this.handleResize(); // Initial call
  }

  /**
   * Initialize keyboard event listener
   */
  initializeKeyboard(handler: KeyHandler): void {
    if (typeof window === "undefined") return;

    this.keyHandler = handler;
    window.addEventListener("keydown", this.handleKeyDown);
  }

  /**
   * Internal scroll handler
   */
  private handleScroll = (): void => {
    if (typeof window === "undefined" || !this.scrollHandler) return;
    this.scrollHandler(window.scrollY);
  };

  /**
   * Internal resize handler
   */
  private handleResize = (): void => {
    if (typeof window === "undefined" || !this.resizeHandler) return;
    this.resizeHandler(window.innerWidth);
  };

  /**
   * Internal keyboard handler
   */
  private handleKeyDown = (e: KeyboardEvent): void => {
    if (!this.keyHandler) return;
    this.keyHandler(e);
  };

  /**
   * Cleanup all event listeners
   */
  cleanup(): void {
    if (typeof window === "undefined") return;

    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.handleScroll);
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    } else if (this.resizeHandler) {
      window.removeEventListener("resize", this.handleResize);
    }

    if (this.keyHandler) {
      window.removeEventListener("keydown", this.handleKeyDown);
    }

    this.isInitialized = false;
  }

  /**
   * Check if manager is initialized
   */
  get initialized(): boolean {
    return this.isInitialized;
  }
}

