// src/sections/honour-section.tsx
import React, { Component, ReactNode, createRef, RefObject } from "react";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/honors-section.css";

/**
 * Honor Item Type Definition
 * Follows Single Responsibility Principle (SRP)
 */
export type HonorItem = {
  key: string;
  icon: string;
  title: string;
  event: string;
  date: string;
  description: string;
};

/**
 * Honor Section Props Interface
 */
type HonorsProps = {
  data: HonorItem[];
};

/**
 * Honor Section State Interface
 */
type HonorsState = {
  visibleItems: Set<string>;
  scrollDirection: "up" | "down" | "left" | "right";
  isInitialized: boolean;
  error: string | null;
};

/**
 * Intersection Observer Configuration
 * Centralized for maintainability (DRY)
 */
const OBSERVER_CONFIG: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -80px 0px",
};

/**
 * Scroll Throttle Configuration
 * Performance optimization
 */
const SCROLL_THROTTLE_MS = 150;


/**
 * Honor Section Component
 * 
 * Features:
 * - Luxury & Elegant Design
 * - Performance Optimized (throttled scroll, optimized observers, memoization)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with smooth animations
 * - Accessibility Support
 * 
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - MVP (Minimum Viable Product)
 * - Keep It Simple
 */
class HonorsSection extends Component<HonorsProps, HonorsState> {
  private itemRefs = new Map<string, RefObject<HTMLDivElement | null>>();
  private observer: IntersectionObserver | null = null;
  private lastScrollY: number = 0;
  private scrollTimeoutId: number | null = null;
  private isMounted: boolean = false;
  private rafId: number | null = null;

  constructor(props: HonorsProps) {
    super(props);
    this.state = {
      visibleItems: new Set(),
      scrollDirection: "down",
      isInitialized: false,
      error: null,
    };

    // Initialize refs for all items
    this.initializeRefs();
  }

  /**
   * Initialize refs for all honor items
   * Follows DRY principle
   */
  private initializeRefs(): void {
    const { data } = this.props;
    
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    // Clear existing refs if data changed
    this.itemRefs.clear();

    data.forEach(({ key }) => {
      if (key && !this.itemRefs.has(key)) {
        this.itemRefs.set(key, createRef<HTMLDivElement | null>());
      }
    });
  }

  /**
   * Component Did Mount
   * Setup observers and event listeners
   */
  componentDidMount(): void {
    this.isMounted = true;
    
    try {
      this.setupIntersectionObserver();
      this.setupScrollListener();
      this.setState({ isInitialized: true, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize honors section";
      this.setState({ error: errorMessage });
      console.error("HonorsSection initialization error:", error);
    }
  }

  /**
   * Component Will Unmount
   * Cleanup observers and event listeners
   */
  componentWillUnmount(): void {
    this.isMounted = false;
    this.cleanup();
  }

  /**
   * Component Did Update
   * Handle data changes efficiently
   */
  componentDidUpdate(prevProps: HonorsProps): void {
    if (prevProps.data !== this.props.data) {
      this.cleanup();
      this.initializeRefs();
      
      if (this.isMounted) {
        this.setupIntersectionObserver();
      }
    }
  }

  /**
   * Setup Intersection Observer
   * Performance optimized observer with error handling
   */
  private setupIntersectionObserver(): void {
    // Cleanup existing observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Validate data
    const { data } = this.props;
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    // Check browser support
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: show all items immediately
      const allKeys = new Set(data.map(item => item.key).filter(Boolean));
      this.setState({ visibleItems: allKeys });
      return;
    }

    try {
      // Create new observer
      this.observer = new IntersectionObserver(
        this.handleIntersection,
        OBSERVER_CONFIG
      );

      // Observe all items with error handling
      this.itemRefs.forEach((ref, key) => {
        const element = ref?.current;
        if (element) {
          try {
            this.observer?.observe(element);
          } catch (error) {
            console.warn(`Failed to observe item ${key}:`, error);
          }
        }
      });
    } catch (error) {
      console.error("Failed to setup IntersectionObserver:", error);
      // Fallback: show all items
      const allKeys = new Set(data.map(item => item.key).filter(Boolean));
      this.setState({ visibleItems: allKeys });
    }
  }

  /**
   * Handle Intersection Observer Callback
   * Optimized state updates with RAF
   */
  private handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    if (!this.isMounted) return;

    // Use RAF for smooth updates
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      entries.forEach((entry) => {
        const key = (entry.target as HTMLElement).getAttribute("data-key");
        if (!key) return;

        this.setState((prevState) => {
          const updated = new Set(prevState.visibleItems);
          
          if (entry.isIntersecting) {
            updated.add(key);
          } else {
            // Only remove if scrolling away significantly
            if (entry.intersectionRatio < 0.05) {
              updated.delete(key);
            }
          }

          // Only update if changed
          if (updated.size === prevState.visibleItems.size && 
              [...updated].every(k => prevState.visibleItems.has(k))) {
            return prevState;
          }

          return { 
            ...prevState,
            visibleItems: updated 
          };
        });
      });
      
      this.rafId = null;
    });
  };

  /**
   * Setup Scroll Listener
   * Throttled for performance with passive listener
   */
  private setupScrollListener(): void {
    if (typeof window === "undefined") return;
    
    this.lastScrollY = window.scrollY;
    
    // Use passive listener for better performance
    window.addEventListener("scroll", this.handleScrollThrottled, { 
      passive: true,
      capture: false 
    });
  }

  /**
   * Throttled Scroll Handler
   * Performance optimization with requestAnimationFrame
   */
  private handleScrollThrottled = (): void => {
    if (this.scrollTimeoutId !== null) {
      return;
    }

    this.scrollTimeoutId = window.setTimeout(() => {
      this.handleScrollDirection();
      this.scrollTimeoutId = null;
    }, SCROLL_THROTTLE_MS);
  };

  /**
   * Handle Scroll Direction
   * Determine scroll direction for animations
   */
  private handleScrollDirection = (): void => {
    if (!this.isMounted || typeof window === "undefined") return;

    const currentY = window.scrollY;
    const delta = currentY - this.lastScrollY;
    
    // Determine direction based on scroll delta
    let direction: "up" | "down" | "left" | "right" = "down";
    
    if (Math.abs(delta) > 5) { // Threshold to avoid micro-movements
      direction = delta > 0 ? "down" : "up";
    }
    
    if (direction !== this.state.scrollDirection) {
      this.setState({ scrollDirection: direction });
    }
    
    this.lastScrollY = currentY;
  };

  /**
   * Cleanup Resources
   * Memory leak prevention
   */
  private cleanup(): void {
    // Cleanup observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Cleanup scroll listener
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", this.handleScrollThrottled);
    }

    // Cleanup timeouts
    if (this.scrollTimeoutId !== null) {
      window.clearTimeout(this.scrollTimeoutId);
      this.scrollTimeoutId = null;
    }

    // Cleanup RAF
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Validate Data
   * Comprehensive edge case handling
   */
  private validateData(): { isValid: boolean; error?: string } {
    const { data } = this.props;
    
    if (!data) {
      return { isValid: false, error: "No honor data provided" };
    }

    if (!Array.isArray(data)) {
      return { isValid: false, error: "Invalid honor data format" };
    }

    if (data.length === 0) {
      return { isValid: false, error: "No honors available" };
    }

    // Validate each item has required fields
    const invalidItems = data.filter(
      item => !item.key || !item.title || !item.event || !item.date
    );

    if (invalidItems.length > 0) {
      return { 
        isValid: false, 
        error: `${invalidItems.length} honor item(s) missing required fields` 
      };
    }

    return { isValid: true };
  }

  /**
   * Render Error State
   * User-friendly error display
   */
  private renderErrorState(error: string): ReactNode {
    return (
      <div className="honors-error-state" role="alert" aria-live="polite">
        <div className="honors-error-icon" aria-hidden="true">⚠️</div>
        <h3 className="honors-error-title">Unable to Display Honors</h3>
        <p className="honors-error-message">{error}</p>
      </div>
    );
  }

  /**
   * Render Empty State
   * Elegant empty state with proper messaging
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="honors-empty-state" role="status" aria-live="polite">
        <div className="honors-empty-icon" aria-hidden="true">🏆</div>
        <h3 className="honors-empty-title">No Honors Available</h3>
        <p className="honors-empty-text">
          Honor and achievement information will appear here when available.
        </p>
      </div>
    );
  }

  /**
   * Render Honor Content
   * Reusable content renderer with proper semantic HTML
   */
  private renderContent(item: HonorItem): ReactNode {
    // Safety check: ensure item has required properties
    if (!item) {
      return null;
    }

    return (
      <div className="honors-content">
        <div className="honors-header">
          <h4 className="honors-title">{item.title || "Untitled Honor"}</h4>
          <div className="honors-meta">
            {item.event && (
              <>
                <span className="honors-event">{item.event}</span>
                {item.date && (
                  <>
                    <span className="honors-separator" aria-hidden="true">•</span>
                    <time className="honors-date" dateTime={this.formatDateForDateTime(item.date)}>
                      {item.date}
                    </time>
                  </>
                )}
              </>
            )}
            {!item.event && item.date && (
              <time className="honors-date" dateTime={this.formatDateForDateTime(item.date)}>
                {item.date}
              </time>
            )}
          </div>
        </div>
        {item.description && (
          <p className="honors-description">{item.description}</p>
        )}
      </div>
    );
  }

  /**
   * Format date for datetime attribute
   * Helper method for accessibility
   */
  private formatDateForDateTime(dateStr: string): string {
    // Try to parse common date formats
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch {
      // Fallback to original string
    }
    return dateStr;
  }

  /**
   * Render Single Honor Item
   * Component composition with proper accessibility
   */
  private renderItem(item: HonorItem, index: number): ReactNode {
    const { visibleItems, scrollDirection } = this.state;
    const refObj = this.itemRefs.get(item.key) as RefObject<HTMLDivElement> | undefined;

    // Safety check: ensure item has required properties
    if (!item || !item.key) {
      return null;
    }

    return (
      <FlowItem
        key={item.key}
        itemKey={item.key}
        index={index}
        scrollDirection={scrollDirection}
        isVisible={visibleItems.has(item.key)}
        refObj={refObj}
        icon={
          <span 
            className="honors-icon-emoji" 
            aria-hidden="true"
            role="img"
            aria-label={`Honor icon for ${item.title || 'honor'}`}
          >
            {item.icon || "🏆"}
          </span>
        }
      >
        {this.renderContent(item)}
      </FlowItem>
    );
  }

  /**
   * Render All Items
   * Main render logic with proper list semantics
   */
  private renderItems(): ReactNode {
    const { data } = this.props;
    const validation = this.validateData();

    // Handle validation errors
    if (!validation.isValid) {
      return validation.error 
        ? this.renderErrorState(validation.error)
        : this.renderEmptyState();
    }

    // Safety check: ensure data exists and is array
    if (!data || !Array.isArray(data) || data.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div 
        className="honors-flow" 
        role="list" 
        aria-label="Honors and achievements timeline"
      >
        {data.map((item, index) => {
          // Safety check for each item
          if (!item || !item.key) {
            console.warn(`Honor item at index ${index} is invalid, skipping`);
            return null;
          }
          return this.renderItem(item, index);
        })}
      </div>
    );
  }

  /**
   * Main Render Method
   * Entry point with comprehensive error handling
   */
  public render(): ReactNode {
    const { error } = this.state;
    const validation = this.validateData();

    // Handle initialization errors
    if (error) {
      return (
        <Card id="honors-section" title="Honors & Achievements">
          {this.renderErrorState(error)}
        </Card>
      );
    }

    // Handle validation errors
    if (!validation.isValid) {
      return (
        <Card id="honors-section" title="Honors & Achievements">
          {validation.error 
            ? this.renderErrorState(validation.error)
            : this.renderEmptyState()}
        </Card>
      );
    }

    // Handle empty data
    const { data } = this.props;
    if (!data || data.length === 0) {
      return (
        <Card id="honors-section" title="Honors & Achievements">
          {this.renderEmptyState()}
        </Card>
      );
    }

    return (
      <Card id="honors-section" title="Honors & Achievements">
        {this.renderItems()}
      </Card>
    );
  }
}

export default HonorsSection;
