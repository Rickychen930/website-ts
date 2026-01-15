/**
 * Lazy Section Component
 * Progressive loading untuk sections dengan intersection observer
 * Performance optimized dengan lazy loading dan virtual scrolling
 */

import React, { Component, ReactNode, createRef } from "react";
import { ISectionConfig } from "../../models/section-model";
import { UserProfile } from "../../types/user";
import "../../assets/css/lazy-section.css";

interface LazySectionProps {
  config: ISectionConfig;
  profile: UserProfile;
  onVisible?: (id: string) => void;
  priority?: "high" | "normal" | "low";
}

interface LazySectionState {
  isVisible: boolean;
  isLoaded: boolean;
  shouldRender: boolean;
}

export class LazySection extends Component<LazySectionProps, LazySectionState> {
  private sectionRef = createRef<HTMLElement>();
  private observer: IntersectionObserver | null = null;
  private loadTimeout: ReturnType<typeof setTimeout> | null = null;
  private isMounted: boolean = false;

  constructor(props: LazySectionProps) {
    super(props);
    this.state = {
      isVisible: false,
      isLoaded: false,
      shouldRender: props.priority === "high", // High priority sections render immediately
    };
  }

  componentDidMount(): void {
    this.isMounted = true;

    // High priority sections (About, Contact) render immediately
    if (this.props.priority === "high") {
      this.setState({ isVisible: true, isLoaded: true, shouldRender: true });
      return;
    }

    // Setup intersection observer untuk lazy loading
    this.setupObserver();
  }

  componentWillUnmount(): void {
    this.isMounted = false;
    this.cleanup();
  }

  private setupObserver = (): void => {
    // Edge case: Check if running in browser environment
    if (typeof window === "undefined" || typeof document === "undefined") {
      this.setState({ shouldRender: true, isVisible: true, isLoaded: true });
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      // Fallback: load immediately if IntersectionObserver not supported
      this.setState({ shouldRender: true, isVisible: true, isLoaded: true });
      return;
    }

    try {
      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: this.getRootMargin(),
        threshold: 0.1,
      };

      this.observer = new IntersectionObserver(
        this.handleIntersection,
        options,
      );

      // Observe section element
      if (this.sectionRef.current) {
        this.observer.observe(this.sectionRef.current);
      } else {
        // If ref not ready, observe after a short delay
        // Edge case: Use requestAnimationFrame for better performance
        const setupObserver = () => {
          if (this.isMounted && this.sectionRef.current && this.observer) {
            this.observer.observe(this.sectionRef.current);
          } else if (this.isMounted) {
            // Retry with timeout as fallback
            const timeoutId = setTimeout(() => {
              if (this.isMounted && this.sectionRef.current && this.observer) {
                this.observer.observe(this.sectionRef.current);
              }
            }, 100);

            if (!this.loadTimeout) {
              this.loadTimeout = timeoutId;
            }
          }
        };

        if (typeof requestAnimationFrame !== "undefined") {
          requestAnimationFrame(setupObserver);
        } else {
          setTimeout(setupObserver, 16); // ~60fps fallback
        }
      }
    } catch (error) {
      // Edge case: Handle observer creation errors
      if (process.env.NODE_ENV === "development") {
        const { logError } = require("../../utils/logger");
        logError("Error setting up IntersectionObserver", error, "LazySection");
      }
      // Fallback: load immediately on error
      this.setState({ shouldRender: true, isVisible: true, isLoaded: true });
    }
  };

  private getRootMargin = (): string => {
    const { priority = "normal" } = this.props;

    // Load sections earlier based on priority
    switch (priority) {
      case "high":
        return "200px"; // Load 200px before visible
      case "normal":
        return "100px"; // Load 100px before visible
      case "low":
        return "50px"; // Load 50px before visible
      default:
        return "100px";
    }
  };

  private handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    if (!this.isMounted) return;

    const entry = entries[0];

    if (entry.isIntersecting) {
      // Section is visible or near viewport
      this.setState({ isVisible: true });

      // Delay loading untuk smooth experience
      const delay = this.props.priority === "high" ? 0 : 100;

      // Clear existing timeout if any
      if (this.loadTimeout) {
        clearTimeout(this.loadTimeout);
      }

      this.loadTimeout = setTimeout(() => {
        if (this.isMounted) {
          this.setState({ shouldRender: true, isLoaded: true });

          if (this.props.onVisible) {
            this.props.onVisible(this.props.config.id);
          }
        }
      }, delay);
    } else {
      // Section is out of viewport
      // Keep rendered but mark as not visible
      this.setState({ isVisible: false });
    }
  };

  private cleanup = (): void => {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
      this.loadTimeout = null;
    }
  };

  private getSectionData = (): unknown => {
    const { config, profile } = this.props;
    const { dataKey } = config;

    // Edge case: Handle missing profile or config
    if (!profile || !config || !dataKey) {
      return null;
    }

    const data = profile[dataKey];

    // Edge case: Handle null, undefined, or empty arrays
    if (data === null || data === undefined) {
      return null;
    }

    if (Array.isArray(data) && data.length === 0) {
      return null;
    }

    // Edge case: Handle empty objects
    if (
      typeof data === "object" &&
      Object.keys(data).length === 0 &&
      dataKey !== "name"
    ) {
      return null;
    }

    return dataKey === "name" ? profile : data;
  };

  private renderPlaceholder = (): ReactNode => {
    const { config } = this.props;

    return (
      <section
        ref={this.sectionRef as React.RefObject<HTMLElement>}
        id={config.id}
        className="lazy-section-placeholder"
        aria-label={config.title || "Content section"}
        data-section-id={config.id}
      >
        <div className="lazy-section-skeleton">
          <div className="lazy-section-skeleton-header"></div>
          <div className="lazy-section-skeleton-content">
            <div className="lazy-section-skeleton-line"></div>
            <div className="lazy-section-skeleton-line"></div>
            <div className="lazy-section-skeleton-line short"></div>
          </div>
        </div>
      </section>
    );
  };

  /**
   * Determine if section is primary or secondary
   * Primary: About, Skills, Experience, Projects
   * Secondary: Academic, Certifications, Honors, Soft Skills, Languages, Contact
   */
  private getSectionVariant = (): "primary" | "secondary" => {
    const { config } = this.props;
    const primarySections = ["about", "skills", "experience", "projects"];
    return primarySections.includes(config.id) ? "primary" : "secondary";
  };

  private renderContent = (): ReactNode => {
    const { config } = this.props;
    const { component: SectionComponent } = config;
    const sectionData = this.getSectionData();
    const variant = this.getSectionVariant();
    const isRevealed = this.state.isVisible;

    // Edge case: Handle missing component
    if (!SectionComponent) {
      if (process.env.NODE_ENV === "development") {
        const { logWarn } = require("../../utils/logger");
        logWarn(
          `Section component missing for ${config.id}`,
          undefined,
          "LazySection",
        );
      }
      return null;
    }

    // Build class names with new design system
    const sectionClasses = [
      "section-block",
      "lazy-section",
      `section-block--${variant}`,
      isRevealed ? "revealed" : "",
    ]
      .filter(Boolean)
      .join(" ");

    // Edge case: Handle missing data - show empty state instead of null
    if (!sectionData) {
      return (
        <section
          ref={this.sectionRef as React.RefObject<HTMLElement>}
          id={config.id}
          className={sectionClasses}
          aria-label={config.title || "Content section"}
          data-section-id={config.id}
        >
          <div className="section-content" role="region">
            <div
              className="section-empty-state"
              role="status"
              aria-live="polite"
            >
              <p>No data available for this section.</p>
            </div>
          </div>
        </section>
      );
    }

    try {
      return (
        <section
          ref={this.sectionRef as React.RefObject<HTMLElement>}
          id={config.id}
          className={sectionClasses}
          aria-label={config.title || "Content section"}
          data-section-id={config.id}
        >
          <div className="section-content" role="region">
            <SectionComponent data={sectionData} />
          </div>
        </section>
      );
    } catch (error) {
      // Edge case: Better error handling with user-friendly message
      if (process.env.NODE_ENV === "development") {
        const { logError } = require("../../utils/logger");
        logError(`Error rendering section ${config.id}`, error, "LazySection");
      }

      // Return error state instead of null for better UX
      return (
        <section
          ref={this.sectionRef as React.RefObject<HTMLElement>}
          id={config.id}
          className={`section-block lazy-section section-block--${variant} error`}
          aria-label={config.title || "Content section"}
          data-section-id={config.id}
        >
          <div className="section-content" role="region">
            <div className="section-error-state" role="alert">
              <p>Unable to load this section. Please refresh the page.</p>
            </div>
          </div>
        </section>
      );
    }
  };

  render(): ReactNode {
    const { shouldRender } = this.state;

    // Render placeholder jika belum loaded
    if (!shouldRender) {
      return this.renderPlaceholder();
    }

    // Render content
    return this.renderContent();
  }
}

export default LazySection;
