/**
 * Work Experience Section Component
 * View Layer (MVC Pattern)
 * 
 * Features:
 * - Professional, Luxury, Clean Design
 * - Performance Optimized (IntersectionObserver, memoization)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with smooth animations
 * - Accessibility Support
 * - Showcases Software Engineering Skills
 * 
 * Principles Applied:
 * - MVC: Separated Controller, Model, and View
 * - OOP: Class-based component with encapsulation
 * - SOLID:
 *   - SRP: Each method has single responsibility
 *   - OCP: Extensible through composition
 *   - LSP: Proper inheritance/implementation
 *   - ISP: Interfaces are segregated
 *   - DIP: Depends on abstractions (controller, components)
 * - DRY: Reuses components and utilities
 * - KISS: Simple, clear structure
 * - Component-Based: Uses reusable sub-components
 */

import React, { Component, ReactNode, createRef, RefObject } from "react";
import { WorkExperienceController } from "../../../controllers/work-experience-controller";
import { WorkExperienceModel, IWorkExperienceItem } from "../../../models/work-experience-model";
import { WorkExperienceTimeline } from "../../components/work-experience";
import "../../../assets/css/work-experience-section.css";

/**
 * Legacy Experience Item Type (for backward compatibility)
 */
type LegacyExperienceItem = {
  key: string;
  icon: string;
  title: string;
  company: string;
  period: string;
  description: string;
};

/**
 * Work Experience Section Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
type WorkExperienceProps = {
  data: LegacyExperienceItem[] | IWorkExperienceItem[];
};

/**
 * Work Experience Section State Interface
 */
type WorkExperienceState = {
  visibleItems: Set<string>;
  isInitialized: boolean;
  error: string | null;
  experiences: IWorkExperienceItem[];
  durations: Map<string, string>;
};

/**
 * Intersection Observer Configuration
 * Centralized for maintainability (DRY)
 */
const OBSERVER_CONFIG: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: "50px",
};

/**
 * Work Experience Section Component
 * 
 * Architecture:
 * - Uses IntersectionObserver for performance-optimized scroll animations
 * - Implements staggered animations for elegant visual flow
 * - Handles edge cases (empty data, missing fields, etc.)
 * - Fully responsive with mobile-first approach
 * - MVC Pattern: Separates concerns between Controller, Model, and View
 */
class WorkExperienceSection extends Component<WorkExperienceProps, WorkExperienceState> {
  private readonly controller: WorkExperienceController;
  private observer: IntersectionObserver | null = null;
  private isMounted: boolean = false;
  private containerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  private itemRefs = new Map<string, RefObject<HTMLDivElement>>();

  constructor(props: WorkExperienceProps) {
    super(props);
    this.controller = new WorkExperienceController();
    this.state = {
      visibleItems: new Set(),
      isInitialized: false,
      error: null,
      experiences: [],
      durations: new Map(),
    };
  }

  /**
   * Component Did Mount
   * Initialize intersection observer and process data
   */
  componentDidMount(): void {
    this.isMounted = true;
    this.processData();
    this.initializeObserver();
  }

  /**
   * Component Did Update
   * Handle data changes
   */
  componentDidUpdate(prevProps: WorkExperienceProps): void {
    if (prevProps.data !== this.props.data) {
      // Cleanup old observer
      if (this.observer) {
        this.disconnectObserver();
      }

      // Process new data
      this.processData();

      // Reset state
      this.setState({
        visibleItems: new Set(),
        isInitialized: false,
      });

      // Reinitialize observer if mounted
      if (this.isMounted) {
        setTimeout(() => {
          this.initializeObserver();
        }, 50);
      }
    }
  }

  /**
   * Component Will Unmount
   * Cleanup observers
   */
  componentWillUnmount(): void {
    this.isMounted = false;
    this.disconnectObserver();
  }

  /**
   * Process data from props
   * Transforms legacy format to new format and validates
   * Follows Single Responsibility Principle (SRP)
   */
  private processData(): void {
    try {
      const { data } = this.props;

      if (!data || !Array.isArray(data) || data.length === 0) {
        this.setState({
          experiences: [],
          durations: new Map(),
          error: null,
        });
        return;
      }

      // Transform and validate items
      const experiences: IWorkExperienceItem[] = [];
      const durations = new Map<string, string>();

      data.forEach((item) => {
        // Normalize item
        const normalized = WorkExperienceModel.normalizeItem(item);
        
        if (WorkExperienceModel.isValidItem(normalized)) {
          experiences.push(normalized);
          
          // Calculate duration
          const duration = this.controller.getFormattedDuration(normalized.period);
          if (duration) {
            durations.set(normalized.key, duration);
          }
        }
      });

      // Sort by period (newest first)
      const sorted = WorkExperienceModel.sortByPeriod(experiences);

      // Initialize refs
      this.itemRefs.clear();
      sorted.forEach((item) => {
        this.itemRefs.set(item.key, createRef<HTMLDivElement>());
      });

      this.setState({
        experiences: sorted,
        durations,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to process work experience data";
      this.setState({
        error: errorMessage,
        experiences: [],
        durations: new Map(),
      });

      if (process.env.NODE_ENV === 'development') {
        console.error("Error processing work experience data:", error);
      }
    }
  }

  /**
   * Initialize Intersection Observer
   * Follows Single Responsibility Principle (SRP)
   */
  private initializeObserver(): void {
    // Edge case: Validate data exists
    if (this.state.experiences.length === 0) {
      this.setState({ isInitialized: true });
      return;
    }

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      // Fallback for browsers without IntersectionObserver support
      const allKeys = this.state.experiences.map((item) => item.key);
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

      // Observe all item refs
      let observedCount = 0;
      const pendingRefs: Array<{ ref: RefObject<HTMLDivElement>; key: string }> = [];

      this.itemRefs.forEach((ref, key) => {
        if (ref.current && this.isMounted) {
          try {
            this.observer?.observe(ref.current);
            observedCount++;
          } catch (err) {
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Failed to observe element for key: ${key}`, err);
            }
          }
        } else {
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

        setTimeout(retryObserver, 50);
        
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
      if (process.env.NODE_ENV === 'development') {
        console.error("❌ Error initializing IntersectionObserver:", error);
      }
      
      // Fallback: show all items
      const allKeys = this.state.experiences.map((item) => item.key);
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

  /**
   * Render empty state
   * Handles edge case when no data is available
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="work-experience-empty" role="status" aria-live="polite">
        <div className="work-experience-empty-icon" aria-hidden="true">💼</div>
        <p className="work-experience-empty-text">
          No work experience data available at the moment.
        </p>
      </div>
    );
  }

  /**
   * Render error state
   * Handles edge case when data processing fails
   */
  private renderErrorState(): ReactNode {
    const { error } = this.state;
    return (
      <div className="work-experience-error" role="alert">
        <div className="work-experience-error-icon" aria-hidden="true">⚠️</div>
        <p className="work-experience-error-text">
          {error || "Failed to load work experience data"}
        </p>
      </div>
    );
  }

  /**
   * Main render method
   * Enhanced with filtering for null items
   */
  public render(): ReactNode {
    const { experiences, visibleItems, durations, error, isInitialized } = this.state;

    // Edge case: Handle error state
    if (error) {
      return this.renderErrorState();
    }

    // Edge case: Handle empty or undefined data
    if (!experiences || experiences.length === 0) {
      return this.renderEmptyState();
    }

    // Wait for observer initialization
    if (!isInitialized) {
      return (
        <div className="work-experience-container" ref={this.containerRef}>
          <div className="work-experience-loading">Loading...</div>
        </div>
      );
    }

    return (
      <div 
        className="work-experience-container" 
        ref={this.containerRef}
        role="region"
        aria-label="Work Experience Timeline"
      >
        <WorkExperienceTimeline
          items={experiences}
          visibleItems={visibleItems}
          durations={durations}
        />
      </div>
    );
  }
}

export default WorkExperienceSection;
