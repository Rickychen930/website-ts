/**
 * AcademicSection - View Layer (MVC Pattern)
 * Professional, Clean, Luxury, Responsive Academic Section
 * 
 * Architecture:
 * - MVC: Separated Controller, Model, and View
 * - OOP: Class-based component with encapsulation
 * - Component-Based: Uses reusable sub-components
 * 
 * Principles Applied:
 * - SOLID:
 *   - SRP: Each method has single responsibility
 *   - OCP: Extensible through composition
 *   - LSP: Proper inheritance/implementation
 *   - ISP: Interfaces are segregated
 *   - DIP: Depends on abstractions (controller, components)
 * - DRY: Reuses components and utilities
 * - KISS: Simple, clear structure
 */

import React, { Component, ReactNode, createRef, RefObject } from "react";
import "../../../assets/css/academic-section.css";
import { Card } from "../../components/common";
import { AcademicController } from "../../../controllers/academic-controller";
import { AcademicModel, IAcademicItem } from "../../../models/academic-model";
import { AcademicCard } from "../../components/academic/AcademicCard";
import { AcademicTimeline } from "../../components/academic/AcademicTimeline";

/**
 * Academic Section Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
type AcademicProps = {
  data: IAcademicItem[];
};

/**
 * Academic Section State Interface
 */
type AcademicState = {
  visibleItems: Set<string>;
  scrollDirection: "up" | "down";
  isInitialized: boolean;
  currentVisibleIndex: number;
};

/**
 * Intersection Observer Configuration
 * Centralized for maintainability (DRY)
 */
const OBSERVER_CONFIG: IntersectionObserverInit = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

/**
 * Scroll Throttle Configuration
 * Performance optimization
 */
const SCROLL_THROTTLE_MS = 100;

/**
 * AcademicSection Component
 * 
 * Features:
 * - Professional, Clean, Luxury Design
 * - Fully Responsive (Mobile, Tablet, Desktop, Landscape)
 * - Performance Optimized (throttled scroll, optimized observers)
 * - Component-Based Architecture (Reusable Components)
 * - MVC Pattern (Controller, Model, View separation)
 * - Shows Software Engineering Capabilities
 * 
 * Principles Applied:
 * - MVC: Separated Controller, Model, and View
 * - OOP: Class-based component with encapsulation
 * - SOLID: All principles applied
 * - DRY: Reuses components and utilities
 * - KISS: Simple, clear structure
 */
class AcademicSection extends Component<AcademicProps, AcademicState> {
  private readonly controller: AcademicController;
  private itemRefs = new Map<string, RefObject<HTMLDivElement>>();
  private observer: IntersectionObserver | null = null;
  private lastScrollY: number = 0;
  private scrollTimeoutId: number | null = null;
  private isMounted: boolean = false;
  private containerRef: RefObject<HTMLDivElement> = createRef();

  constructor(props: AcademicProps) {
    super(props);
    this.state = {
      visibleItems: new Set(),
      scrollDirection: "down",
      isInitialized: false,
      currentVisibleIndex: -1,
    };

    // Initialize controller (MVC Pattern)
    this.controller = new AcademicController();

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
        currentVisibleIndex: -1,
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
        currentVisibleIndex: allKeys.length - 1,
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
          currentVisibleIndex: allKeys.length - 1,
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
        currentVisibleIndex: allKeys.length - 1,
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
        const { data } = this.props;
        let currentVisibleIndex = prevState.currentVisibleIndex;
        
        if (entry.isIntersecting) {
          updated.add(key);
          
          // Update current visible index
          const itemIndex = data.findIndex(item => item.key === key);
          if (itemIndex > currentVisibleIndex) {
            currentVisibleIndex = itemIndex;
          }
        } else {
          // Only remove if scrolling away significantly
          if (entry.intersectionRatio < 0.1) {
            updated.delete(key);
          }
        }

        return { 
          visibleItems: updated,
          currentVisibleIndex,
        };
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
  private validateItem(item: IAcademicItem): boolean {
    return !!(
      item &&
      item.key &&
      item.title &&
      item.institution &&
      item.period
    );
  }

  /**
   * Render Single Academic Item
   * Uses reusable AcademicCard component
   */
  private renderItem(item: IAcademicItem, index: number): ReactNode {
    // Edge case: Skip invalid items
    if (!this.validateItem(item)) {
      return null;
    }

    const { visibleItems } = this.state;
    const refObj = this.itemRefs.get(item.key);
    const isVisible = visibleItems.has(item.key);
    const academicLevel = this.controller.getAcademicLevel(item.title);

    // Edge case: Handle missing ref
    if (!refObj) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing ref for academic item: ${item.key}`);
      }
    }

    return (
      <div
        key={item.key}
        data-key={item.key}
        ref={refObj}
        className="academic-item-wrapper"
      >
        <AcademicCard
          item={item}
          index={index}
          isVisible={isVisible}
          academicLevel={academicLevel}
        />
      </div>
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

    // Filter valid items first
    const validItems = data.filter((item) => this.validateItem(item));

    if (validItems.length === 0) {
      return this.renderEmptyState();
    }

    // Get sorted items from model (MVC Pattern - using Model directly for data transformation)
    const sortedItems = AcademicModel.sortByPeriod(validItems);

    // Render items
    const renderedItems = sortedItems
      .map((item, index) => this.renderItem(item, index))
      .filter((item): item is ReactNode => item !== null);

    // Edge case: No valid items after filtering
    if (renderedItems.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div className="academic-section-container" ref={this.containerRef}>
        <div className="academic-section-content">
          <AcademicTimeline
            itemCount={renderedItems.length}
            currentIndex={this.state.currentVisibleIndex}
            isVisible={this.state.isInitialized}
          />
          <div className="academic-items-grid" role="list" aria-label="Academic background timeline">
            {renderedItems}
          </div>
        </div>
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
        <Card id="academic-section" title="Academic Background" variant="default">
          {this.renderEmptyState()}
        </Card>
      );
    }

    return (
      <Card id="academic-section" title="Academic Background" variant="default">
        {this.renderItems()}
      </Card>
    );
  }
}

export default AcademicSection;
export type { AcademicProps };
