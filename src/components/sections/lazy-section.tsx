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
  private loadTimeout: NodeJS.Timeout | null = null;

  constructor(props: LazySectionProps) {
    super(props);
    this.state = {
      isVisible: false,
      isLoaded: false,
      shouldRender: props.priority === "high", // High priority sections render immediately
    };
  }

  componentDidMount(): void {
    // High priority sections (About, Contact) render immediately
    if (this.props.priority === "high") {
      this.setState({ isVisible: true, isLoaded: true, shouldRender: true });
      return;
    }

    // Setup intersection observer untuk lazy loading
    this.setupObserver();
  }

  componentWillUnmount(): void {
    this.cleanup();
  }

  private setupObserver = (): void => {
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: load immediately if IntersectionObserver not supported
      this.setState({ shouldRender: true, isVisible: true, isLoaded: true });
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: this.getRootMargin(),
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver(this.handleIntersection, options);

    // Observe section element
    if (this.sectionRef.current) {
      this.observer.observe(this.sectionRef.current);
    } else {
      // If ref not ready, observe after a short delay
      setTimeout(() => {
        if (this.sectionRef.current && this.observer) {
          this.observer.observe(this.sectionRef.current);
        }
      }, 100);
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
    const entry = entries[0];
    
    if (entry.isIntersecting) {
      // Section is visible or near viewport
      this.setState({ isVisible: true });

      // Delay loading untuk smooth experience
      const delay = this.props.priority === "high" ? 0 : 100;
      
      this.loadTimeout = setTimeout(() => {
        this.setState({ shouldRender: true, isLoaded: true });
        
        if (this.props.onVisible) {
          this.props.onVisible(this.props.config.id);
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
    const data = profile[dataKey];
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
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

  private renderContent = (): ReactNode => {
    const { config } = this.props;
    const { component: SectionComponent } = config;
    const sectionData = this.getSectionData();

    if (!SectionComponent || !sectionData) {
      return null;
    }

    try {
      return (
        <section
          ref={this.sectionRef as React.RefObject<HTMLElement>}
          id={config.id}
          className={`section-block lazy-section ${this.state.isVisible ? "visible" : ""}`}
          aria-label={config.title || "Content section"}
          data-section-id={config.id}
        >
          <header className="section-header">
            <h2 className="section-title" id={`${config.id}-title`}>
              {config.title}
            </h2>
            <div className="section-title-underline" aria-hidden="true"></div>
          </header>
          <div className="section-content" role="region" aria-labelledby={`${config.id}-title`}>
            <SectionComponent data={sectionData} />
          </div>
        </section>
      );
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logError } = require('../../utils/logger');
        logError(`Error rendering section ${config.id}`, error, "LazySection");
      }
      return null;
    }
  };

  render(): ReactNode {
    const { shouldRender, isLoaded } = this.state;

    // Render placeholder jika belum loaded
    if (!shouldRender) {
      return this.renderPlaceholder();
    }

    // Render content
    return this.renderContent();
  }
}

export default LazySection;

