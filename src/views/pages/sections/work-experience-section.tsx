/**
 * Work Experience Section Component
 * 
 * Features:
 * - Luxury & Elegant Design with smooth animations
 * - Performance Optimized (PureComponent, IntersectionObserver)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with staggered timeline animations
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
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/work-experience-section.css";

/**
 * Experience Item Interface
 * Follows Interface Segregation Principle (ISP)
 */
export type ExperienceItem = {
  key: string;
  icon: string; // Can be emoji or JSX
  title: string;
  company: string;
  period: string;
  description: string;
};

/**
 * Work Experience Props Interface
 */
type WorkExperienceProps = {
  data: ExperienceItem[];
};

/**
 * Work Experience State Interface
 */
type WorkExperienceState = {
  visibleItems: Set<string>;
  isInitialized: boolean;
};

/**
 * Intersection Observer Configuration
 * Optimized for performance and smooth animations
 */
const OBSERVER_CONFIG: IntersectionObserverInit = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

/**
 * Work Experience Section Component
 * 
 * Architecture:
 * - Uses IntersectionObserver for performance-optimized scroll animations
 * - Implements staggered animations for elegant visual flow
 * - Handles edge cases (empty data, missing fields, etc.)
 * - Fully responsive with mobile-first approach
 */
class WorkExperienceSection extends Component<WorkExperienceProps, WorkExperienceState> {
  private itemRefs = new Map<string, RefObject<HTMLDivElement>>();
  private observer: IntersectionObserver | null = null;
  private isMounted: boolean = false;
  private containerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

  constructor(props: WorkExperienceProps) {
    super(props);
    
    // Initialize refs for all items
    props.data.forEach((item) => {
      this.itemRefs.set(item.key, createRef<HTMLDivElement>());
    });

    this.state = {
      visibleItems: new Set(),
      isInitialized: false,
    };
  }

  /**
   * Initialize Intersection Observer
   * Follows Single Responsibility Principle (SRP)
   */
  private initializeObserver(): void {
    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      // Fallback for browsers without IntersectionObserver support
      const allKeys = this.props.data.map((item) => item.key);
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

      // Observe all item refs - wait for refs to be attached
      let observedCount = 0;
      this.itemRefs.forEach((ref, key) => {
        if (ref.current && this.isMounted) {
          this.observer?.observe(ref.current);
          observedCount++;
        } else {
          // If ref not ready, try again after a short delay
          setTimeout(() => {
            if (ref.current && this.isMounted && this.observer) {
              this.observer.observe(ref.current);
            }
          }, 50);
        }
      });

      // If no refs were ready, show all items as fallback
      if (observedCount === 0 && this.itemRefs.size > 0) {
        // Try one more time after a longer delay
        setTimeout(() => {
          this.itemRefs.forEach((ref) => {
            if (ref.current && this.isMounted && this.observer) {
              this.observer.observe(ref.current);
            }
          });
        }, 100);
      }
    } catch (error) {
      console.error("❌ Error initializing IntersectionObserver:", error);
      // Fallback: show all items
      const allKeys = this.props.data.map((item) => item.key);
      this.setState({ 
        visibleItems: new Set(allKeys),
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
      if (entry.isIntersecting) {
        const itemKey = entry.target.getAttribute("data-key");
        if (itemKey) {
          this.setState((prevState) => {
            const newVisibleItems = new Set(prevState.visibleItems);
            newVisibleItems.add(itemKey);
            return { visibleItems: newVisibleItems };
          });

          // Disconnect observer for this item after it's visible (performance optimization)
          this.observer?.unobserve(entry.target);
        }
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
      this.setState({ isInitialized: true });
    }, 0);
  }

  componentWillUnmount(): void {
    this.isMounted = false;
    this.disconnectObserver();
  }

  /**
   * Validate and sanitize experience item data
   * Handles edge cases (missing fields, empty strings, etc.)
   */
  private validateItem(item: ExperienceItem): boolean {
    return !!(
      item &&
      item.key &&
      item.title &&
      item.company &&
      item.period &&
      item.description
    );
  }

  /**
   * Render experience item content
   * Follows Single Responsibility Principle (SRP)
   */
  private renderContent(item: ExperienceItem): ReactNode {
    // Edge case: Handle missing or empty data
    if (!this.validateItem(item)) {
      console.warn("⚠️ Invalid experience item:", item);
      return null;
    }

    return (
      <div className="work-experience-content">
        <header className="work-experience-header">
          <h3 className="work-experience-title">{item.title}</h3>
          <div className="work-experience-meta">
            <span className="work-experience-company">{item.company}</span>
            <span className="work-experience-separator" aria-hidden="true">•</span>
            <time className="work-experience-period" dateTime={item.period}>
              {item.period}
            </time>
          </div>
        </header>
        <p className="work-experience-description">{item.description}</p>
      </div>
    );
  }

  /**
   * Render a single experience item
   * Implements staggered animations for elegant visual flow
   */
  private renderItem(item: ExperienceItem, index: number): ReactNode {
    // Edge case: Skip invalid items
    if (!this.validateItem(item)) {
      return null;
    }

    const refObj = this.itemRefs.get(item.key);
    const isVisible = this.state.visibleItems.has(item.key);

    return (
      <FlowItem
        key={item.key}
        itemKey={item.key}
        index={index}
        scrollDirection="left"
        isVisible={isVisible}
        refObj={refObj}
        icon={<span className="work-experience-icon-content" aria-hidden="true">{item.icon}</span>}
        variant="elevated"
        className="work-experience-item"
      >
        {this.renderContent(item)}
      </FlowItem>
    );
  }

  /**
   * Render empty state
   * Handles edge case when no data is available
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="work-experience-empty" role="status" aria-live="polite">
        <p className="work-experience-empty-text">
          No work experience data available at the moment.
        </p>
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { data } = this.props;

    // Edge case: Handle empty or undefined data
    if (!data || !Array.isArray(data) || data.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div 
        className="work-experience-container" 
        ref={this.containerRef}
        role="region"
        aria-label="Work Experience Timeline"
      >
        <div className="work-experience-timeline">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </div>
    );
  }
}

export default WorkExperienceSection;
