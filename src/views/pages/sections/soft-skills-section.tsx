/**
 * Soft Skills Section Component
 * 
 * Features:
 * - Luxury & Elegant Design with smooth animations
 * - Performance Optimized (IntersectionObserver with proper cleanup)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with grid layout and hover effects
 * - Accessibility Support (ARIA labels, semantic HTML)
 * 
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - MVP (Minimum Viable Product)
 * - Keep It Simple
 */
import React, { Component, ReactNode, createRef, RefObject } from "react";
import Card from "../../components/card-component";
import "../../../assets/css/soft-skills-section.css";

/**
 * Soft Skill Item Type Definition
 * Follows Interface Segregation Principle (ISP)
 */
export type SoftSkillItem = {
  key: string;
  icon: string;
  name: string;
  description: string;
};

/**
 * Soft Skills Section Props Interface
 */
type SoftSkillsProps = {
  data: SoftSkillItem[];
};

/**
 * Soft Skills Section State Interface
 */
type SoftSkillsState = {
  visibleItems: Set<string>;
  isInitialized: boolean;
  error: string | null;
};

/**
 * Intersection Observer Configuration
 * Optimized for performance and smooth animations
 */
const OBSERVER_CONFIG: IntersectionObserverInit = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

/**
 * Soft Skills Section Component
 */
class SoftSkillsSection extends Component<SoftSkillsProps, SoftSkillsState> {
  private itemRefs = new Map<string, RefObject<HTMLDivElement | null>>();
  private observer: IntersectionObserver | null = null;
  private isMounted: boolean = false;

  constructor(props: SoftSkillsProps) {
    super(props);
    this.state = {
      visibleItems: new Set(),
      isInitialized: false,
      error: null,
    };

    // Initialize refs for all items
    this.initializeRefs();
  }

  /**
   * Initialize refs for all soft skill items
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
   * Initialize Intersection Observer
   * Follows Single Responsibility Principle (SRP)
   */
  private initializeObserver(): void {
    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      // Fallback for browsers without IntersectionObserver support
      const allKeys = this.props.data.map(item => item.key);
      this.setState({ 
        visibleItems: new Set(allKeys),
        isInitialized: true 
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
        if (ref.current && this.isMounted) {
          this.observer?.observe(ref.current);
        }
      });

      this.setState({ isInitialized: true });
    } catch (error) {
      console.error("❌ Error initializing IntersectionObserver:", error);
      this.setState({
        error: "Failed to initialize scroll animation",
        isInitialized: true,
      });
    }
  }

  /**
   * Handle intersection observer callback
   * Performance optimized with proper state checks
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    if (!this.isMounted || entries.length === 0) {
      return;
    }

    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      const itemKey = target.dataset.key;

      if (!itemKey) {
        return;
      }

      if (entry.isIntersecting) {
        this.setState((prevState) => {
          const newVisibleItems = new Set(prevState.visibleItems);
          newVisibleItems.add(itemKey);
          return { visibleItems: newVisibleItems };
        });

        // Disconnect observer for this item to improve performance
        this.observer?.unobserve(target);
      }
    });
  }

  /**
   * Disconnect Intersection Observer
   * Prevents memory leaks
   */
  private disconnectObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  componentDidMount(): void {
    this.isMounted = true;
    // Use setTimeout to ensure refs are ready after render
    setTimeout(() => {
      this.initializeObserver();
    }, 0);
  }

  componentWillUnmount(): void {
    this.isMounted = false;
    this.disconnectObserver();
  }

  /**
   * Render soft skill icon
   * Null-safe rendering with elegant styling
   */
  private renderIcon(item: SoftSkillItem): ReactNode {
    if (!item.icon || item.icon.trim() === "") {
      return null;
    }

    return (
      <div className="soft-skill-icon-wrapper" aria-hidden="true">
        <div className="soft-skill-icon-glow"></div>
        <div className="soft-skill-icon">
          <span className="soft-skill-icon-emoji">{item.icon}</span>
        </div>
      </div>
    );
  }

  /**
   * Render soft skill content
   */
  private renderContent(item: SoftSkillItem): ReactNode {
    return (
      <div className="soft-skill-content">
        <h4 className="soft-skill-title" id={`soft-skill-${item.key}-title`}>
          {item.name}
        </h4>
        {item.description && (
          <p 
            className="soft-skill-description"
            aria-labelledby={`soft-skill-${item.key}-title`}
          >
            {item.description}
          </p>
        )}
      </div>
    );
  }

  /**
   * Render single soft skill item
   * Component composition with proper accessibility
   */
  private renderItem(item: SoftSkillItem, index: number): ReactNode {
    // Edge case: Handle invalid items
    if (!item || !item.key || !item.name) {
      return null;
    }

    const isVisible = this.state.visibleItems.has(item.key);
    const refObj = this.itemRefs.get(item.key);
    const animationDelay = index * 100; // Staggered animation

    return (
      <article
        key={item.key}
        data-key={item.key}
        ref={refObj}
        className={`soft-skill-item ${isVisible ? "soft-skill-visible" : "soft-skill-hidden"}`}
        style={{ animationDelay: `${animationDelay}ms` }}
        aria-labelledby={`soft-skill-${item.key}-title`}
      >
        {this.renderIcon(item)}
        {this.renderContent(item)}
      </article>
    );
  }

  /**
   * Render all soft skills in grid layout
   */
  private renderSkillsGrid(): ReactNode {
    const { data } = this.props;

    // Edge case: Handle empty data
    if (!data || data.length === 0) {
      return (
        <div className="soft-skills-empty" role="status" aria-live="polite">
          <p className="soft-skills-empty-text">No soft skills available</p>
        </div>
      );
    }

    return (
      <div className="soft-skills-grid" role="list" aria-label="Soft skills">
        {data.map((item, index) => this.renderItem(item, index))}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { data } = this.props;
    const { error } = this.state;

    // Edge case: Show content even if there's an error
    if (error) {
      console.warn("⚠️ Soft Skills Section Error:", error);
    }

    // Edge case: Handle missing or invalid data
    if (!data || !Array.isArray(data)) {
      return null;
    }

    return (
      <Card 
        id="soft-skills-section" 
        title="Soft Skills"
        variant="default"
        ariaLabel="Soft skills section"
      >
        {this.renderSkillsGrid()}
      </Card>
    );
  }
}

export default SoftSkillsSection;
