// src/views/pages/sections/languages-section.tsx
import React, { Component, ReactNode, createRef, RefObject } from "react";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/languages-section.css";

/**
 * Language Item Type Definition
 * Follows Single Responsibility Principle (SRP)
 */
export type LanguageItem = {
  key: string;
  icon: string;
  name: string;
  proficiency: string;
};

/**
 * Alias for backward compatibility
 */
export type Language = LanguageItem;

/**
 * Language Section Props Interface
 */
type LanguagesProps = {
  data: LanguageItem[];
};

/**
 * Language Section State Interface
 */
type LanguagesState = {
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
 * Language Section Component
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
class LanguagesSection extends Component<LanguagesProps, LanguagesState> {
  private itemRefs = new Map<string, RefObject<HTMLDivElement | null>>();
  private observer: IntersectionObserver | null = null;
  private lastScrollY: number = 0;
  private scrollTimeoutId: number | null = null;
  private isMounted: boolean = false;
  private rafId: number | null = null;

  constructor(props: LanguagesProps) {
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
   * Initialize refs for all language items
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
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize languages section";
      this.setState({ error: errorMessage });
      console.error("LanguagesSection initialization error:", error);
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
  componentDidUpdate(prevProps: LanguagesProps): void {
    if (prevProps.data !== this.props.data) {
      this.cleanup();
      this.initializeRefs();
      
      if (this.isMounted) {
        this.setupIntersectionObserver();
        this.setupScrollListener();
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
      return { isValid: false, error: "No language data provided" };
    }

    if (!Array.isArray(data)) {
      return { isValid: false, error: "Invalid language data format" };
    }

    if (data.length === 0) {
      return { isValid: false, error: "No languages available" };
    }

    // Validate each item has required fields
    const invalidItems = data.filter(
      item => !item.key || !item.name || !item.proficiency
    );

    if (invalidItems.length > 0) {
      return { 
        isValid: false, 
        error: `${invalidItems.length} language item(s) missing required fields` 
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
      <div className="languages-error-state" role="alert" aria-live="polite">
        <div className="languages-error-icon" aria-hidden="true">⚠️</div>
        <h3 className="languages-error-title">Unable to Display Languages</h3>
        <p className="languages-error-message">{error}</p>
      </div>
    );
  }

  /**
   * Render Empty State
   * Elegant empty state with proper messaging
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="languages-empty-state" role="status" aria-live="polite">
        <div className="languages-empty-icon" aria-hidden="true">🌐</div>
        <h3 className="languages-empty-title">No Languages Available</h3>
        <p className="languages-empty-text">
          Language information will appear here when available.
        </p>
      </div>
    );
  }

  /**
   * Render Language Content
   * Reusable content renderer with proper semantic HTML
   */
  private renderContent(item: LanguageItem): ReactNode {
    // Safety check: ensure item has required properties
    if (!item) {
      return null;
    }

    return (
      <div className="languages-content">
        <div className="languages-header">
          <h4 className="languages-title">{item.name || "Untitled Language"}</h4>
        </div>
        {item.proficiency && (
          <div className="languages-proficiency-container">
            <span className="languages-proficiency-badge">{item.proficiency}</span>
          </div>
        )}
      </div>
    );
  }

  /**
   * Render Single Language Item
   * Component composition with proper accessibility
   */
  private renderItem(item: LanguageItem, index: number): ReactNode {
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
            className="languages-icon-emoji" 
            aria-hidden="true"
            role="img"
            aria-label={`Language icon for ${item.name || 'language'}`}
          >
            {item.icon || "🌐"}
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
        className="languages-flow" 
        role="list" 
        aria-label="Languages and proficiency levels"
      >
        {data.map((item, index) => {
          // Safety check for each item
          if (!item || !item.key) {
            console.warn(`Language item at index ${index} is invalid, skipping`);
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
        <Card id="languages-section" title="Languages">
          {this.renderErrorState(error)}
        </Card>
      );
    }

    // Handle validation errors
    if (!validation.isValid) {
      return (
        <Card id="languages-section" title="Languages">
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
        <Card id="languages-section" title="Languages">
          {this.renderEmptyState()}
        </Card>
      );
    }

    return (
      <Card id="languages-section" title="Languages">
        {this.renderItems()}
      </Card>
    );
  }
}

export default LanguagesSection;
