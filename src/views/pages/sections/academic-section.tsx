import React, { Component, ReactNode, createRef, RefObject } from "react";
import "../../../assets/css/academic-section.css";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";

/**
 * Academic Item Type Definition
 * Follows Single Responsibility Principle (SRP)
 */
export type AcademicItem = {
  key: string;
  icon: string;
  title: string;
  institution: string;
  period: string;
  description: string;
};

/**
 * Academic Section Props Interface
 */
type AcademicProps = {
  data: AcademicItem[];
};

/**
 * Academic Section State Interface
 */
type AcademicState = {
  visibleItems: Set<string>;
  scrollDirection: "up" | "down";
  isInitialized: boolean;
};

/**
 * Intersection Observer Configuration
 * Centralized for maintainability (DRY)
 */
const OBSERVER_CONFIG: IntersectionObserverInit = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

/**
 * Scroll Throttle Configuration
 * Performance optimization
 */
const SCROLL_THROTTLE_MS = 100;

/**
 * Academic Section Component
 * 
 * Features:
 * - Luxury & Elegant Design
 * - Performance Optimized (throttled scroll, optimized observers)
 * - Fully Responsive
 * - Edge Case Handling
 * - Clean UI/UX
 * 
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - MVP (Minimum Viable Product)
 */
class AcademicSection extends Component<AcademicProps, AcademicState> {
  private itemRefs = new Map<string, RefObject<HTMLDivElement>>();
  private observer: IntersectionObserver | null = null;
  private lastScrollY: number = 0;
  private scrollTimeoutId: number | null = null;
  private isMounted: boolean = false;

  constructor(props: AcademicProps) {
    super(props);
    this.state = {
      visibleItems: new Set(),
      scrollDirection: "down",
      isInitialized: false,
    };

    // Initialize refs for all items
    this.initializeRefs();
  }

  /**
   * Initialize refs for all academic items
   * Follows DRY principle
   */
  private initializeRefs(): void {
    const { data } = this.props;
    
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    data.forEach(({ key }) => {
      if (!this.itemRefs.has(key)) {
        this.itemRefs.set(key, createRef<HTMLDivElement>());
      }
    });
  }

  /**
   * Component Did Mount
   * Setup observers and event listeners
   */
  componentDidMount(): void {
    this.isMounted = true;
    
    // Edge case: Validate data exists before initializing
    if (!this.props.data || !Array.isArray(this.props.data) || this.props.data.length === 0) {
      this.setState({ isInitialized: true });
      return;
    }

    // Use setTimeout to ensure refs are ready after render
    setTimeout(() => {
      if (this.isMounted) {
        this.setupIntersectionObserver();
        this.setupScrollListener();
      }
    }, 0);
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
   * Handle data changes with enhanced cleanup
   */
  componentDidUpdate(prevProps: AcademicProps): void {
    // Edge case: Handle data changes
    if (prevProps.data !== this.props.data) {
      // Cleanup existing observers and listeners
      this.cleanup();
      
      // Reinitialize refs for new data
      this.initializeRefs();
      
      // Reset state
      this.setState({
        visibleItems: new Set(),
        isInitialized: false,
      });

      // Reinitialize observer if mounted
      if (this.isMounted) {
        // Use setTimeout to ensure DOM is updated
        setTimeout(() => {
          if (this.isMounted) {
            this.setupIntersectionObserver();
            this.setupScrollListener();
          }
        }, 50);
      }
    }
  }

  /**
   * Setup Intersection Observer
   * Performance optimized observer with enhanced error handling
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
      this.setState({ isInitialized: true });
      return;
    }

    // Edge case: Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: show all items
      const allKeys = Array.from(this.itemRefs.keys());
      this.setState({
        visibleItems: new Set(allKeys),
        isInitialized: true,
      });
      return;
    }

    try {
      // Create new observer
      this.observer = new IntersectionObserver(
        this.handleIntersection,
        OBSERVER_CONFIG
      );

      // Observe all items with error handling
      let observedCount = 0;
      this.itemRefs.forEach((ref, key) => {
        if (ref.current && this.isMounted) {
          try {
            this.observer?.observe(ref.current);
            observedCount++;
          } catch (err) {
            // Edge case: Handle individual observe errors
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Failed to observe academic item for key: ${key}`, err);
            }
          }
        }
      });

      // Edge case: If no items observed, show all as fallback
      if (observedCount === 0 && this.itemRefs.size > 0) {
        const allKeys = Array.from(this.itemRefs.keys());
        this.setState({
          visibleItems: new Set(allKeys),
          isInitialized: true,
        });
      } else {
        this.setState({ isInitialized: true });
      }
    } catch (error) {
      // Enhanced error handling
      if (process.env.NODE_ENV === 'development') {
        console.error("❌ Error initializing IntersectionObserver:", error);
      }
      
      // Fallback: show all items
      const allKeys = Array.from(this.itemRefs.keys());
      this.setState({
        visibleItems: new Set(allKeys),
        isInitialized: true,
      });
    }
  }

  /**
   * Handle Intersection Observer Callback
   * Optimized state updates
   */
  private handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    if (!this.isMounted) return;

    entries.forEach((entry) => {
      const key = (entry.target as HTMLElement).getAttribute("data-key");
      if (!key) return;

      this.setState((prevState) => {
        const updated = new Set(prevState.visibleItems);
        
        if (entry.isIntersecting) {
          updated.add(key);
        } else {
          // Only remove if scrolling away significantly
          if (entry.intersectionRatio < 0.1) {
            updated.delete(key);
          }
        }

        return { visibleItems: updated };
      });
    });
  };

  /**
   * Setup Scroll Listener
   * Throttled for performance
   */
  private setupScrollListener(): void {
    if (typeof window === "undefined") return;
    
    this.lastScrollY = window.scrollY;
    window.addEventListener("scroll", this.handleScrollThrottled, { passive: true });
  }

  /**
   * Throttled Scroll Handler
   * Performance optimization
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
    const direction = currentY > this.lastScrollY ? "down" : "up";
    
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
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", this.handleScrollThrottled);
    }

    if (this.scrollTimeoutId !== null) {
      window.clearTimeout(this.scrollTimeoutId);
      this.scrollTimeoutId = null;
    }
  }

  /**
   * Validate Data
   * Edge case handling
   */
  private validateData(): boolean {
    const { data } = this.props;
    return Array.isArray(data) && data.length > 0;
  }

  /**
   * Render Empty State
   * Edge case handling
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="academic-empty-state">
        <div className="academic-empty-icon">🎓</div>
        <p className="academic-empty-text">No academic information available</p>
      </div>
    );
  }

  /**
   * Validate academic item
   * Edge case handling
   */
  private validateItem(item: AcademicItem): boolean {
    return !!(
      item &&
      item.key &&
      item.title &&
      item.institution &&
      item.period
    );
  }

  /**
   * Render Academic Content
   * Reusable content renderer with validation
   */
  private renderContent(item: AcademicItem): ReactNode {
    // Edge case: Validate item before rendering
    if (!this.validateItem(item)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn("⚠️ Invalid academic item:", item);
      }
      return null;
    }

    return (
      <div className="academic-content">
        <div className="academic-header">
          <h4 className="academic-title">{item.title}</h4>
          <div className="academic-meta">
            <span className="academic-institution">{item.institution}</span>
            <span className="academic-separator" aria-hidden="true">•</span>
            <time className="academic-period" dateTime={item.period}>
              {item.period}
            </time>
          </div>
        </div>
        {item.description && (
          <p className="academic-description">{item.description}</p>
        )}
      </div>
    );
  }

  /**
   * Render Single Academic Item
   * Component composition with validation
   */
  private renderItem(item: AcademicItem, index: number): ReactNode {
    // Edge case: Skip invalid items
    if (!this.validateItem(item)) {
      return null;
    }

    const { visibleItems, scrollDirection } = this.state;
    const refObj = this.itemRefs.get(item.key);

    // Edge case: Handle missing ref
    if (!refObj) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing ref for academic item: ${item.key}`);
      }
    }

    return (
      <FlowItem
        key={item.key}
        itemKey={item.key}
        index={index}
        scrollDirection={scrollDirection}
        isVisible={visibleItems.has(item.key)}
        refObj={refObj}
        icon={<span className="academic-icon-emoji" aria-hidden="true">{item.icon || "🎓"}</span>}
      >
        {this.renderContent(item)}
      </FlowItem>
    );
  }

  /**
   * Render All Items
   * Main render logic with filtering for null items
   */
  private renderItems(): ReactNode {
    const { data } = this.props;

    if (!this.validateData()) {
      return this.renderEmptyState();
    }

    // Filter and render items, removing null returns from invalid items
    const renderedItems = data
      .map((item, index) => this.renderItem(item, index))
      .filter((item): item is ReactNode => item !== null);

    // Edge case: No valid items after filtering
    if (renderedItems.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div className="academic-flow" role="list" aria-label="Academic background timeline">
        {renderedItems}
      </div>
    );
  }

  /**
   * Main Render Method
   */
  public render(): ReactNode {
    // Edge case: No data
    if (!this.validateData()) {
      return (
        <Card id="academic-section" title="Academic Background">
          {this.renderEmptyState()}
        </Card>
      );
    }

    return (
      <Card id="academic-section" title="Academic Background">
        {this.renderItems()}
      </Card>
    );
  }
}

export default AcademicSection;
