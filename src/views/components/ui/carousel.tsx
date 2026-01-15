/**
 * Carousel Component - Reusable Horizontal Scroll Carousel
 * Professional, Accessible, Responsive, Performance Optimized
 *
 * Architecture:
 * - OOP: Class-based component with proper encapsulation
 * - SOLID:
 *   - SRP: Single responsibility - handles carousel functionality
 *   - OCP: Open for extension via props and composition
 *   - LSP: Proper component interface
 *   - ISP: Segregated interfaces via props
 *   - DIP: Depends on abstractions (props, callbacks)
 * - DRY: Reusable across all sections
 * - KISS: Simple, clear implementation
 *
 * Features:
 * - Horizontal scrolling with smooth behavior
 * - Navigation arrows (left/right)
 * - Scroll indicators (fade gradients)
 * - Scroll progress indicator
 * - Keyboard navigation (arrow keys)
 * - Touch/swipe support
 * - Responsive design
 * - Accessibility (ARIA labels, keyboard navigation)
 * - Performance optimized (throttled scroll, RAF)
 */

import React, { Component, ReactNode, createRef, RefObject } from "react";
import "../../../assets/css/carousel.css";

/**
 * Carousel Item Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface ICarouselItem {
  key: string;
  content: ReactNode;
  [key: string]: unknown;
}

/**
 * Carousel Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface ICarouselProps {
  items: ICarouselItem[];
  className?: string;
  itemClassName?: string;
  itemWidth?: number | string;
  gap?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  showProgress?: boolean;
  scrollSnap?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  onItemClick?: (item: ICarouselItem, index: number) => void;
  ariaLabel?: string;
  emptyMessage?: string;
  emptyIcon?: string;
}

/**
 * Carousel State Interface
 */
interface ICarouselState {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollProgress: number;
  isScrolling: boolean;
}

/**
 * Carousel Component
 * Reusable horizontal scroll carousel following OOP, SOLID, DRY, KISS principles
 */
export class Carousel extends Component<ICarouselProps, ICarouselState> {
  private readonly containerRef: RefObject<HTMLDivElement | null>;
  private readonly scrollThrottleDelay = 100;
  private scrollTimeoutId: number | null = null;
  private autoScrollIntervalId: number | null = null;
  private isMounted: boolean = false;
  private lastScrollLeft: number = 0;

  // Default props following KISS principle
  static defaultProps: Partial<ICarouselProps> = {
    className: "",
    itemClassName: "",
    itemWidth: 320,
    gap: 16,
    showArrows: true,
    showIndicators: true,
    showProgress: false,
    scrollSnap: true,
    autoScroll: false,
    autoScrollInterval: 5000,
    ariaLabel: "Carousel",
    emptyMessage: "No items to display",
    emptyIcon: "📦",
  };

  constructor(props: ICarouselProps) {
    super(props);
    this.containerRef = createRef<HTMLDivElement>();
    this.state = {
      canScrollLeft: false,
      canScrollRight: true,
      scrollProgress: 0,
      isScrolling: false,
    };
  }

  /**
   * Component Did Mount
   * Initialize scroll detection and auto-scroll if enabled
   */
  componentDidMount(): void {
    this.isMounted = true;
    this.updateScrollState();
    this.setupAutoScroll();
    this.setupKeyboardNavigation();
  }

  /**
   * Component Will Unmount
   * Cleanup resources
   */
  componentWillUnmount(): void {
    this.isMounted = false;
    this.cleanup();
  }

  /**
   * Component Did Update
   * Update scroll state when items change
   */
  componentDidUpdate(prevProps: ICarouselProps): void {
    if (prevProps.items !== this.props.items) {
      this.updateScrollState();
      this.setupAutoScroll();
    }
  }

  /**
   * Setup Auto Scroll
   * Follows Single Responsibility Principle (SRP)
   */
  private setupAutoScroll(): void {
    this.clearAutoScroll();

    if (!this.props.autoScroll) return;

    const interval = this.props.autoScrollInterval || 5000;

    this.autoScrollIntervalId = window.setInterval(() => {
      if (!this.isMounted || !this.containerRef.current) return;

      const container = this.containerRef.current;
      const scrollAmount = container.clientWidth * 0.8;

      if (this.state.canScrollRight) {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else {
        // Reset to start
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }, interval);
  }

  /**
   * Clear Auto Scroll
   * Cleanup method following SRP
   */
  private clearAutoScroll(): void {
    if (this.autoScrollIntervalId !== null) {
      clearInterval(this.autoScrollIntervalId);
      this.autoScrollIntervalId = null;
    }
  }

  /**
   * Setup Keyboard Navigation
   * Accessibility feature following SRP
   */
  private setupKeyboardNavigation(): void {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!this.containerRef.current) return;

      const container = this.containerRef.current;
      const isFocused = container.contains(document.activeElement);

      if (!isFocused && !container.matches(":focus-within")) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          this.scrollLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          this.scrollRight();
          break;
        case "Home":
          e.preventDefault();
          this.scrollToStart();
          break;
        case "End":
          e.preventDefault();
          this.scrollToEnd();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Store handler for cleanup
    (
      this as unknown as { _keyboardHandler: (e: KeyboardEvent) => void }
    )._keyboardHandler = handleKeyDown;
  }

  /**
   * Update Scroll State
   * Check scroll position and update state
   * Follows SRP
   */
  private updateScrollState(): void {
    if (!this.containerRef.current || !this.isMounted) return;

    const container = this.containerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    const canScrollLeft = scrollLeft > 0;
    const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
    const scrollProgress =
      scrollWidth > clientWidth
        ? (scrollLeft / (scrollWidth - clientWidth)) * 100
        : 0;

    // Only update if changed (performance optimization)
    if (
      canScrollLeft !== this.state.canScrollLeft ||
      canScrollRight !== this.state.canScrollRight ||
      Math.abs(scrollProgress - this.state.scrollProgress) > 1
    ) {
      this.setState({
        canScrollLeft,
        canScrollRight,
        scrollProgress,
      });
    }

    this.lastScrollLeft = scrollLeft;
  }

  /**
   * Handle Scroll Event
   * Throttled scroll handler for performance
   */
  private handleScroll = (): void => {
    if (this.scrollTimeoutId !== null) return;

    this.setState({ isScrolling: true });

    this.scrollTimeoutId = window.setTimeout(() => {
      this.updateScrollState();
      this.setState({ isScrolling: false });
      this.scrollTimeoutId = null;
    }, this.scrollThrottleDelay);
  };

  /**
   * Scroll Left
   * Navigate to previous items
   */
  private scrollLeft = (): void => {
    if (!this.containerRef.current) return;

    const container = this.containerRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  /**
   * Scroll Right
   * Navigate to next items
   */
  private scrollRight = (): void => {
    if (!this.containerRef.current) return;

    const container = this.containerRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  /**
   * Scroll To Start
   * Navigate to beginning
   */
  private scrollToStart = (): void => {
    if (!this.containerRef.current) return;

    this.containerRef.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  /**
   * Scroll To End
   * Navigate to end
   */
  private scrollToEnd = (): void => {
    if (!this.containerRef.current) return;

    const container = this.containerRef.current;
    container.scrollTo({
      left: container.scrollWidth,
      behavior: "smooth",
    });
  };

  /**
   * Handle Item Click
   * Callback handler following DIP
   */
  private handleItemClick = (item: ICarouselItem, index: number): void => {
    if (this.props.onItemClick) {
      this.props.onItemClick(item, index);
    }
  };

  /**
   * Get Container Class Names
   * Utility method following DRY
   */
  private getContainerClassNames(): string {
    const {
      className = "",
      scrollSnap = true,
      showIndicators = true,
    } = this.props;
    const { canScrollLeft, canScrollRight } = this.state;

    const classes = [
      "carousel-container",
      scrollSnap ? "carousel-snap" : "",
      showIndicators && !canScrollLeft ? "carousel-scrolled-to-start" : "",
      showIndicators && !canScrollRight ? "carousel-scrolled-to-end" : "",
      className,
    ];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Get Item Style
   * Calculate item width and gap
   * Fixed width to prevent expansion when content is long
   */
  private getItemStyle(): React.CSSProperties {
    const { itemWidth = 320, gap = 16 } = this.props;
    const width = typeof itemWidth === "number" ? `${itemWidth}px` : itemWidth;

    return {
      width: width,
      minWidth: width,
      maxWidth: width,
      marginRight: `${gap}px`,
      flexShrink: 0,
      flexGrow: 0,
    };
  }

  /**
   * Render Navigation Arrows
   * Follows SRP
   */
  private renderArrows(): ReactNode {
    const { showArrows = true } = this.props;
    const { canScrollLeft, canScrollRight } = this.state;

    if (!showArrows) return null;

    return (
      <>
        <button
          type="button"
          className={`carousel-arrow carousel-arrow-left ${
            !canScrollLeft ? "carousel-arrow-hidden" : ""
          }`}
          onClick={this.scrollLeft}
          aria-label="Scroll left"
          disabled={!canScrollLeft}
          tabIndex={canScrollLeft ? 0 : -1}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className={`carousel-arrow carousel-arrow-right ${
            !canScrollRight ? "carousel-arrow-hidden" : ""
          }`}
          onClick={this.scrollRight}
          aria-label="Scroll right"
          disabled={!canScrollRight}
          tabIndex={canScrollRight ? 0 : -1}
        >
          <span aria-hidden="true">›</span>
        </button>
      </>
    );
  }

  /**
   * Render Progress Indicator
   * Follows SRP
   */
  private renderProgress(): ReactNode {
    const { showProgress = false } = this.props;
    const { scrollProgress } = this.state;

    if (!showProgress) return null;

    return (
      <div
        className="carousel-progress"
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="carousel-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    );
  }

  /**
   * Render Empty State
   * Edge case handling
   */
  private renderEmptyState(): ReactNode {
    const { emptyMessage = "No items to display", emptyIcon = "📦" } =
      this.props;

    return (
      <div className="carousel-empty" role="status" aria-live="polite">
        <div className="carousel-empty-icon" aria-hidden="true">
          {emptyIcon}
        </div>
        <p className="carousel-empty-message">{emptyMessage}</p>
      </div>
    );
  }

  /**
   * Render Items
   * Main content renderer
   */
  private renderItems(): ReactNode {
    const { items, itemClassName = "", onItemClick } = this.props;

    if (items.length === 0) {
      return this.renderEmptyState();
    }

    return items.map((item, index) => (
      <div
        key={item.key}
        className={`carousel-item ${itemClassName}`}
        style={this.getItemStyle()}
        onClick={() => this.handleItemClick(item, index)}
        role={onItemClick ? "button" : undefined}
        tabIndex={onItemClick ? 0 : undefined}
        onKeyDown={
          onItemClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  this.handleItemClick(item, index);
                }
              }
            : undefined
        }
        aria-label={onItemClick ? `View ${item.key}` : undefined}
      >
        {item.content}
      </div>
    ));
  }

  /**
   * Cleanup Resources
   * Memory leak prevention
   */
  private cleanup(): void {
    this.clearAutoScroll();

    if (this.scrollTimeoutId !== null) {
      clearTimeout(this.scrollTimeoutId);
      this.scrollTimeoutId = null;
    }

    const keyboardHandler = (
      this as unknown as {
        _keyboardHandler?: (e: KeyboardEvent) => void;
      }
    )._keyboardHandler;

    if (keyboardHandler && typeof window !== "undefined") {
      window.removeEventListener("keydown", keyboardHandler);
    }
  }

  /**
   * Main Render Method
   * Entry point following SRP
   */
  public render(): ReactNode {
    const { items, ariaLabel = "Carousel" } = this.props;

    if (!items || items.length === 0) {
      return <div className="carousel-wrapper">{this.renderEmptyState()}</div>;
    }

    return (
      <div className="carousel-wrapper">
        <div
          ref={this.containerRef}
          className={this.getContainerClassNames()}
          onScroll={this.handleScroll}
          role="region"
          aria-label={ariaLabel}
          tabIndex={0}
        >
          {this.renderItems()}
        </div>
        {this.renderArrows()}
        {this.renderProgress()}
      </div>
    );
  }
}

export default Carousel;
