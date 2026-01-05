// src/sections/projects-section.tsx
import React, { Component, ReactNode, createRef, RefObject } from "react";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/projects-section.css";

/**
 * Project Item Type Definition
 * Follows Single Responsibility Principle (SRP)
 */
export type ProjectItem = {
  key: string;
  icon: string;
  name: string;
  date: string;
  description: string;
};

/**
 * Projects Section Props Interface
 */
type ProjectsProps = {
  data: ProjectItem[];
};

/**
 * Projects Section State Interface
 */
type ProjectsState = {
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
 * Projects Section Component
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
class ProjectsSection extends Component<ProjectsProps, ProjectsState> {
  private itemRefs = new Map<string, RefObject<HTMLDivElement | null>>();
  private observer: IntersectionObserver | null = null;
  private lastScrollY: number = 0;
  private scrollTimeoutId: number | null = null;
  private isMounted: boolean = false;
  private rafId: number | null = null;

  constructor(props: ProjectsProps) {
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
   * Initialize refs for all project items
   * Follows DRY principle
   */
  private initializeRefs(): void {
    const { data } = this.props;
    
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    data.forEach((item) => {
      if (item && item.key) {
        this.itemRefs.set(item.key, createRef<HTMLDivElement | null>());
      }
    });
  }

  /**
   * Component Did Mount
   * Initialize intersection observer and scroll listener
   */
  componentDidMount(): void {
    this.isMounted = true;
    this.initializeObserver();
    this.setupScrollListener();
    
    // Initial visibility check
    this.checkInitialVisibility();
  }

  /**
   * Component Will Unmount
   * Cleanup observers and listeners
   */
  componentWillUnmount(): void {
    this.isMounted = false;
    this.cleanup();
  }

  /**
   * Component Did Update
   * Handle data changes
   */
  componentDidUpdate(prevProps: ProjectsProps): void {
    if (prevProps.data !== this.props.data) {
      this.initializeRefs();
      this.cleanup();
      this.setState({
        visibleItems: new Set(),
        isInitialized: false,
        error: null,
      });
      
      if (this.isMounted) {
        this.initializeObserver();
        this.checkInitialVisibility();
      }
    }
  }

  /**
   * Initialize Intersection Observer
   * Performance optimized visibility detection
   */
  private initializeObserver(): void {
    // Cleanup existing observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: mark all items as visible
      const allKeys = Array.from(this.itemRefs.keys());
      this.setState({
        visibleItems: new Set(allKeys),
        isInitialized: true,
      });
      return;
    }

    try {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        OBSERVER_CONFIG
      );

      // Observe all items
      this.itemRefs.forEach((ref) => {
        if (ref.current) {
          this.observer?.observe(ref.current);
        }
      });

      this.setState({ isInitialized: true });
    } catch (error) {
      console.error("❌ Error initializing IntersectionObserver:", error);
      this.setState({
        error: "Failed to initialize visibility observer",
        isInitialized: true,
      });
    }
  }

  /**
   * Handle Intersection Observer Callback
   * Update visible items state
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    if (!this.isMounted) return;

    this.setState((prevState) => {
      const newVisibleItems = new Set(prevState.visibleItems);

      entries.forEach((entry) => {
        const itemKey = entry.target.getAttribute("data-key");
        if (!itemKey) return;

        if (entry.isIntersecting) {
          newVisibleItems.add(itemKey);
        } else {
          // Only remove if scrolled past significantly
          if (entry.boundingClientRect.top > window.innerHeight) {
            newVisibleItems.delete(itemKey);
          }
        }
      });

      return { visibleItems: newVisibleItems };
    });
  }

  /**
   * Setup Scroll Listener
   * Throttled for performance with proper cleanup
   */
  private setupScrollListener(): void {
    if (typeof window === "undefined") return;

    const handleScroll = (): void => {
      if (this.scrollTimeoutId !== null) return;

      this.scrollTimeoutId = window.setTimeout(() => {
        if (this.isMounted) {
          this.updateScrollDirection();
        }
        this.scrollTimeoutId = null;
      }, SCROLL_THROTTLE_MS);
    };

    const handleResize = (): void => {
      if (this.scrollTimeoutId !== null) return;

      this.scrollTimeoutId = window.setTimeout(() => {
        if (this.isMounted) {
          this.checkInitialVisibility();
          this.updateScrollDirection();
        }
        this.scrollTimeoutId = null;
      }, SCROLL_THROTTLE_MS);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Store handlers for cleanup (if needed in future)
    (this as any)._scrollHandler = handleScroll;
    (this as any)._resizeHandler = handleResize;
  }

  /**
   * Update Scroll Direction
   * Track scroll direction for animations
   */
  private updateScrollDirection(): void {
    if (typeof window === "undefined") return;

    const currentScrollY = window.scrollY;
    const direction = currentScrollY > this.lastScrollY ? "down" : "up";
    
    if (direction !== this.state.scrollDirection) {
      this.setState({ scrollDirection: direction });
    }
    
    this.lastScrollY = currentScrollY;
  }

  /**
   * Check Initial Visibility
   * Handle items already in viewport on mount
   */
  private checkInitialVisibility(): void {
    if (typeof window === "undefined" || !this.observer) return;

    this.itemRefs.forEach((ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;

        if (isVisible) {
          const itemKey = ref.current.getAttribute("data-key");
          if (itemKey) {
            this.setState((prevState) => {
              const newVisibleItems = new Set(prevState.visibleItems);
              newVisibleItems.add(itemKey);
              return { visibleItems: newVisibleItems };
            });
          }
        }
      }
    });
  }

  /**
   * Cleanup Resources
   * Prevent memory leaks
   */
  private cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.scrollTimeoutId !== null) {
      clearTimeout(this.scrollTimeoutId);
      this.scrollTimeoutId = null;
    }

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    // Cleanup event listeners if stored
    if (typeof window !== "undefined") {
      const scrollHandler = (this as any)._scrollHandler;
      const resizeHandler = (this as any)._resizeHandler;
      
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
    }
  }

  /**
   * Format date for datetime attribute
   * Helper method for accessibility
   */
  private formatDateForDateTime(date: string): string {
    try {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split("T")[0];
      }
    } catch {
      // Invalid date, return original
    }
    return date;
  }

  /**
   * Render Empty State
   * User-friendly empty state
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="projects-empty-state" role="status" aria-live="polite">
        <div className="projects-empty-icon" aria-hidden="true">🚀</div>
        <h3 className="projects-empty-title">No Projects Yet</h3>
        <p className="projects-empty-text">
          Projects will appear here once they are added to your profile.
        </p>
      </div>
    );
  }

  /**
   * Render Error State
   * Error handling UI
   */
  private renderErrorState(): ReactNode {
    const { error } = this.state;
    return (
      <div className="projects-error-state" role="alert">
        <div className="projects-error-icon" aria-hidden="true">⚠️</div>
        <h3 className="projects-error-title">Error Loading Projects</h3>
        <p className="projects-error-message">{error || "An unexpected error occurred"}</p>
      </div>
    );
  }

  /**
   * Render Project Content
   * Reusable content renderer with proper semantic HTML
   */
  private renderContent(item: ProjectItem): ReactNode {
    // Safety check: ensure item has required properties
    if (!item) {
      return null;
    }

    return (
      <div className="projects-content">
        <div className="projects-header">
          <h4 className="projects-title">{item.name || "Untitled Project"}</h4>
          <div className="projects-meta">
            {item.date && (
              <time 
                className="projects-date" 
                dateTime={this.formatDateForDateTime(item.date)}
              >
                {item.date}
              </time>
            )}
          </div>
        </div>
        {item.description && (
          <p className="projects-description">{item.description}</p>
        )}
      </div>
    );
  }

  /**
   * Render Project Item
   * Individual project card with animations
   */
  private renderItem(item: ProjectItem, index: number): ReactNode {
    if (!item || !item.key) {
      return null;
    }

    const refObj = this.itemRefs.get(item.key) as RefObject<HTMLDivElement> | undefined;
    const isVisible = this.state.visibleItems.has(item.key);

    return (
      <FlowItem
        key={item.key}
        itemKey={item.key}
        index={index}
        scrollDirection={this.state.scrollDirection}
        isVisible={isVisible}
        refObj={refObj}
        icon={<span className="projects-icon-emoji" aria-hidden="true">{item.icon}</span>}
      >
        {this.renderContent(item)}
      </FlowItem>
    );
  }

  /**
   * Get accessible label for project item
   * Helper for accessibility
   */
  private getAccessibleLabel(item: ProjectItem): string {
    const parts: string[] = [];
    if (item.name) parts.push(item.name);
    if (item.date) parts.push(`Date: ${item.date}`);
    return parts.join(", ");
  }

  /**
   * Main Render Method
   * Render projects section with error handling
   */
  public render(): ReactNode {
    const { data } = this.props;
    const { error } = this.state;

    // Edge case: Empty data
    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <Card id="projects-section" title="Projects">
          {this.renderEmptyState()}
        </Card>
      );
    }

    // Edge case: Error state
    if (error) {
      return (
        <Card id="projects-section" title="Projects">
          {this.renderErrorState()}
        </Card>
      );
    }

    return (
      <Card id="projects-section" title="Projects">
        <div className="projects-flow" role="list">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </Card>
    );
  }
}

export default ProjectsSection;
