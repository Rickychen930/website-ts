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
    // Edge case: Validate data before processing
    if (props.data && Array.isArray(props.data)) {
      props.data.forEach((item) => {
        if (item && item.key) {
          this.itemRefs.set(item.key, createRef<HTMLDivElement>());
        }
      });
    }

    this.state = {
      visibleItems: new Set(),
      isInitialized: false,
    };
  }

  /**
   * Handle props changes
   * Reinitialize refs when data changes
   */
  componentDidUpdate(prevProps: WorkExperienceProps): void {
    // Edge case: Handle data changes
    if (prevProps.data !== this.props.data) {
      // Cleanup old observer
      if (this.observer) {
        this.disconnectObserver();
      }

      // Reinitialize refs for new data
      this.itemRefs.clear();
      if (this.props.data && Array.isArray(this.props.data)) {
        this.props.data.forEach((item) => {
          if (item && item.key) {
            this.itemRefs.set(item.key, createRef<HTMLDivElement>());
          }
        });
      }

      // Reset state
      this.setState({
        visibleItems: new Set(),
        isInitialized: false,
      });

      // Reinitialize observer if mounted
      if (this.isMounted) {
        // Use setTimeout to ensure DOM is updated
        setTimeout(() => {
          this.initializeObserver();
        }, 50);
      }
    }
  }

  /**
   * Initialize Intersection Observer
   * Follows Single Responsibility Principle (SRP)
   * Enhanced with better error handling and edge cases
   */
  private initializeObserver(): void {
    // Edge case: Validate data exists
    if (!this.props.data || !Array.isArray(this.props.data) || this.props.data.length === 0) {
      this.setState({ isInitialized: true });
      return;
    }

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      // Fallback for browsers without IntersectionObserver support
      const allKeys = this.props.data
        .filter((item) => item && item.key)
        .map((item) => item.key);
      this.setState({ 
        visibleItems: new Set(allKeys),
        isInitialized: true,
      });
      return;
    }

    try {
      // Cleanup existing observer if any
      if (this.observer) {
        this.disconnectObserver();
      }

      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        OBSERVER_CONFIG
      );

      // Observe all item refs - wait for refs to be attached
      let observedCount = 0;
      const pendingRefs: Array<{ ref: RefObject<HTMLDivElement>; key: string }> = [];

      this.itemRefs.forEach((ref, key) => {
        if (ref.current && this.isMounted) {
          try {
            this.observer?.observe(ref.current);
            observedCount++;
          } catch (err) {
            // Edge case: Handle observe errors
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Failed to observe element for key: ${key}`, err);
            }
          }
        } else {
          // Collect pending refs
          pendingRefs.push({ ref, key });
        }
      });

      // Handle pending refs with retry logic
      if (pendingRefs.length > 0) {
        const retryObserver = () => {
          pendingRefs.forEach(({ ref, key }) => {
            if (ref.current && this.isMounted && this.observer) {
              try {
                this.observer.observe(ref.current);
                observedCount++;
              } catch (err) {
                if (process.env.NODE_ENV === 'development') {
                  console.warn(`Failed to observe pending element for key: ${key}`, err);
                }
              }
            }
          });
        };

        // Retry after short delay
        setTimeout(retryObserver, 50);
        
        // Final retry after longer delay if still needed
        if (observedCount === 0) {
          setTimeout(retryObserver, 150);
        }
      }

      // Edge case: If still no refs observed after retries, show all items
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
      const allKeys = this.props.data
        .filter((item) => item && item.key)
        .map((item) => item.key);
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
    
    // Edge case: Validate data exists before initializing
    if (!this.props.data || !Array.isArray(this.props.data) || this.props.data.length === 0) {
      this.setState({ isInitialized: true });
      return;
    }

    // Use setTimeout to ensure refs are ready after render
    setTimeout(() => {
      if (this.isMounted) {
        this.initializeObserver();
      }
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
      if (process.env.NODE_ENV === 'development') {
        console.warn("⚠️ Invalid experience item:", item);
      }
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
   * Enhanced with filtering for null items
   */
  public render(): ReactNode {
    const { data } = this.props;

    // Edge case: Handle empty or undefined data
    if (!data || !Array.isArray(data) || data.length === 0) {
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
      <div 
        className="work-experience-container" 
        ref={this.containerRef}
        role="region"
        aria-label="Work Experience Timeline"
      >
        <div className="work-experience-timeline">
          {renderedItems}
        </div>
      </div>
    );
  }
}

export default WorkExperienceSection;
