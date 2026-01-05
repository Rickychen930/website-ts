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
    this.setupIntersectionObserver();
    this.setupScrollListener();
    this.setState({ isInitialized: true });
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
   * Handle data changes
   */
  componentDidUpdate(prevProps: AcademicProps): void {
    if (prevProps.data !== this.props.data) {
      this.cleanup();
      this.initializeRefs();
      this.setupIntersectionObserver();
    }
  }

  /**
   * Setup Intersection Observer
   * Performance optimized observer
   */
  private setupIntersectionObserver(): void {
    // Cleanup existing observer
    if (this.observer) {
      this.observer.disconnect();
    }

    // Validate data
    const { data } = this.props;
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    // Create new observer
    this.observer = new IntersectionObserver(
      this.handleIntersection,
      OBSERVER_CONFIG
    );

    // Observe all items
    this.itemRefs.forEach((ref) => {
      if (ref.current) {
        this.observer?.observe(ref.current);
      }
    });
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
   * Render Academic Content
   * Reusable content renderer
   */
  private renderContent(item: AcademicItem): ReactNode {
    return (
      <div className="academic-content">
        <div className="academic-header">
          <h4 className="academic-title">{item.title}</h4>
          <div className="academic-meta">
            <span className="academic-institution">{item.institution}</span>
            <span className="academic-separator">•</span>
            <span className="academic-period">{item.period}</span>
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
   * Component composition
   */
  private renderItem(item: AcademicItem, index: number): ReactNode {
    const { visibleItems, scrollDirection } = this.state;
    const refObj = this.itemRefs.get(item.key);

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
   * Main render logic
   */
  private renderItems(): ReactNode {
    const { data } = this.props;

    if (!this.validateData()) {
      return this.renderEmptyState();
    }

    return (
      <div className="academic-flow" role="list" aria-label="Academic background timeline">
        {data.map((item, index) => this.renderItem(item, index))}
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
