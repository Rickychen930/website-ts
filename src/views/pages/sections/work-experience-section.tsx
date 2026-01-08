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
import {
  WorkExperienceModel,
  IWorkExperienceItem,
} from "../../../models/work-experience-model";
import { WorkExperienceTimeline } from "../../components/work-experience";
import { EmptyState } from "../../components/ui";
import { Card } from "../../components/common";
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
  threshold: 0.01,
  rootMargin: "100px",
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
class WorkExperienceSection extends Component<
  WorkExperienceProps,
  WorkExperienceState
> {
  private readonly controller: WorkExperienceController;
  private observer: IntersectionObserver | null = null;
  private isMounted: boolean = false;
  private containerRef: RefObject<HTMLDivElement | null> =
    createRef<HTMLDivElement>();
  private itemRefs = new Map<string, RefObject<HTMLDivElement | null>>();

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

      // Debug logging
      if (process.env.NODE_ENV === "development") {
        console.log("[WorkExperienceSection.processData] Processing data:", {
          hasData: !!data,
          isArray: Array.isArray(data),
          dataLength: Array.isArray(data) ? data.length : 0,
          data: data,
        });
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[WorkExperienceSection.processData] No data or empty array",
          );
        }
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

      data.forEach((item, index) => {
        // Normalize item
        const normalized = WorkExperienceModel.normalizeItem(item);

        if (process.env.NODE_ENV === "development") {
          console.log(
            `[WorkExperienceSection.processData] Processing item ${index}:`,
            {
              original: item,
              normalized: normalized,
              isValid: WorkExperienceModel.isValidItem(normalized),
            },
          );
        }

        if (WorkExperienceModel.isValidItem(normalized)) {
          experiences.push(normalized);

          // Calculate duration
          const duration = this.controller.getFormattedDuration(
            normalized.period,
          );
          if (duration) {
            durations.set(normalized.key, duration);
          }
        } else {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[WorkExperienceSection.processData] Item ${index} failed validation:`,
              normalized,
            );
          }
        }
      });

      // Sort by period (newest first)
      const sorted = WorkExperienceModel.sortByPeriod(experiences);

      if (process.env.NODE_ENV === "development") {
        console.log(
          "[WorkExperienceSection.processData] Processed experiences:",
          {
            total: sorted.length,
            experiences: sorted,
          },
        );
      }

      // Initialize refs
      this.itemRefs.clear();
      sorted.forEach((item) => {
        this.itemRefs.set(item.key, createRef<HTMLDivElement>());
      });

      this.setState(
        {
          experiences: sorted,
          durations,
          error: null,
        },
        () => {
          if (process.env.NODE_ENV === "development") {
            console.log("[WorkExperienceSection.processData] State updated:", {
              experiencesCount: this.state.experiences.length,
              durationsCount: this.state.durations.size,
            });
          }
        },
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to process work experience data";
      this.setState({
        error: errorMessage,
        experiences: [],
        durations: new Map(),
      });

      if (process.env.NODE_ENV === "development") {
        const { logError } = require("../../../utils/logger");
        logError(
          "Error processing work experience data",
          error,
          "WorkExperienceSection",
        );
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

    // Show all items immediately for better UX
    const allKeys = this.state.experiences.map((item) => item.key);
    this.setState({
      visibleItems: new Set(allKeys),
      isInitialized: true,
    });

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    try {
      // Cleanup existing observer if any
      if (this.observer) {
        this.disconnectObserver();
      }

      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        OBSERVER_CONFIG,
      );

      // Use querySelector to find actual DOM elements (like ProjectsSection does)
      // This is more reliable than using refs that might not be connected
      const observeElements = (): number => {
        if (!this.isMounted || !this.observer) return 0;

        const cards = this.containerRef.current?.querySelectorAll(
          ".work-experience-card[data-key]",
        );
        let observedCount = 0;

        if (cards && cards.length > 0) {
          cards.forEach((card) => {
            try {
              this.observer?.observe(card);
              observedCount++;
            } catch (err) {
              if (process.env.NODE_ENV === "development") {
                const { logWarn } = require("../../../utils/logger");
                logWarn(
                  "Failed to observe work experience card",
                  err,
                  "WorkExperienceSection",
                );
              }
            }
          });
        }

        return observedCount;
      };

      // Try to observe elements with retries (for potential future animations)
      // Use setTimeout to ensure DOM is fully rendered after setState
      setTimeout(() => {
        if (!this.isMounted) return;
        observeElements();
      }, 50);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logError } = require("../../../utils/logger");
        logError(
          "Error initializing IntersectionObserver",
          error,
          "WorkExperienceSection",
        );
      }

      // Fallback: show all items immediately
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
   * Handles edge case when no data is available - Uses reusable EmptyState component
   */
  private renderEmptyState(): ReactNode {
    return (
      <EmptyState
        icon="💼"
        title="No Work Experience"
        message="Work experience information will appear here once available."
        variant="default"
      />
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
        <div className="work-experience-error-icon" aria-hidden="true">
          ⚠️
        </div>
        <p className="work-experience-error-text">
          {error || "Failed to load work experience data"}
        </p>
      </div>
    );
  }

  /**
   * Main render method
   * Enhanced with filtering for null items and consistent Card wrapper
   */
  public render(): ReactNode {
    const { experiences, visibleItems, durations, error, isInitialized } =
      this.state;

    // Debug logging
    if (process.env.NODE_ENV === "development") {
      console.log("[WorkExperienceSection.render] Render state:", {
        experiencesCount: experiences?.length || 0,
        visibleItemsCount: visibleItems?.size || 0,
        durationsCount: durations?.size || 0,
        error,
        isInitialized,
        hasData: !!this.props.data,
        dataLength: Array.isArray(this.props.data) ? this.props.data.length : 0,
      });
    }

    // Edge case: Handle error state
    if (error) {
      return (
        <Card id="experience" title="Work Experience">
          {this.renderErrorState()}
        </Card>
      );
    }

    // Edge case: Handle empty or undefined data
    if (!experiences || experiences.length === 0) {
      return (
        <Card id="experience" title="Work Experience">
          {this.renderEmptyState()}
        </Card>
      );
    }

    // Wait for observer initialization
    if (!isInitialized) {
      return (
        <Card id="experience" title="Work Experience">
          <div className="work-experience-loading">Loading...</div>
        </Card>
      );
    }

    return (
      <Card id="experience" title="Work Experience">
        <div ref={this.containerRef}>
          <WorkExperienceTimeline
            items={experiences}
            visibleItems={visibleItems}
            durations={durations}
          />
        </div>
      </Card>
    );
  }
}

export default WorkExperienceSection;
