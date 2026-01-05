import React, { Component, ReactNode, createRef, RefObject } from "react";
import "../../../assets/css/section-block.css";

/**
 * Section Block Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
type SectionBlockProps = {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "minimal";
  animationDelay?: number;
};

/**
 * Section Block State Interface
 */
type SectionBlockState = {
  isVisible: boolean;
  hasAnimated: boolean;
  error: string | null;
};

/**
 * Intersection Observer Configuration
 * Optimized for performance and smooth animations
 */
const OBSERVER_CONFIG: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

/**
 * Section Block Component
 * 
 * Features:
 * - Luxury & Elegant Design with smooth animations
 * - Performance Optimized (IntersectionObserver with proper cleanup)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with fade-in and slide-up animations
 * - Accessibility Support (ARIA labels, semantic HTML)
 * 
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - MVP (Minimum Viable Product)
 * - Keep It Simple
 */
class SectionBlock extends Component<SectionBlockProps, SectionBlockState> {
  private sectionRef: RefObject<HTMLElement | null> = createRef<HTMLElement | null>();
  private observer: IntersectionObserver | null = null;
  private isMounted: boolean = false;
  private animationTimeoutId: number | null = null;

  constructor(props: SectionBlockProps) {
    super(props);
    this.state = {
      isVisible: false,
      hasAnimated: false,
      error: null,
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
      this.setState({ isVisible: true, hasAnimated: true });
      return;
    }

    try {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        OBSERVER_CONFIG
      );

      if (this.sectionRef.current && this.isMounted) {
        this.observer.observe(this.sectionRef.current);
      }
    } catch (error) {
      console.error("❌ Error initializing IntersectionObserver:", error);
      this.setState({
        error: "Failed to initialize scroll animation",
        isVisible: true, // Show content even if animation fails
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

    const [entry] = entries;

    if (entry.isIntersecting && !this.state.hasAnimated) {
      // Add slight delay for staggered animation effect
      const delay = this.props.animationDelay || 0;
      
      this.animationTimeoutId = window.setTimeout(() => {
        if (this.isMounted) {
          this.setState(
            {
              isVisible: true,
              hasAnimated: true,
            },
            () => {
              // Disconnect observer after animation to improve performance
              this.disconnectObserver();
            }
          );
        }
      }, delay);
    }
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
   * Cleanup timeouts
   */
  private cleanupTimeouts(): void {
    if (this.animationTimeoutId !== null) {
      window.clearTimeout(this.animationTimeoutId);
      this.animationTimeoutId = null;
    }
  }

  componentDidMount(): void {
    this.isMounted = true;
    // Use setTimeout to ensure ref is ready after render
    setTimeout(() => {
      this.initializeObserver();
    }, 0);
  }

  componentWillUnmount(): void {
    this.isMounted = false;
    this.disconnectObserver();
    this.cleanupTimeouts();
  }

  /**
   * Generate CSS class names
   * Follows DRY principle
   */
  private getClassNames(): string {
    const { className = "", variant = "default" } = this.props;
    const { isVisible, hasAnimated } = this.state;
    
    const classes = [
      "section-block",
      `section-variant-${variant}`,
      isVisible ? "section-visible" : "section-hidden",
      hasAnimated ? "section-animated" : "",
      className,
    ];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Get inline styles for animation delay
   */
  private getStyles(): React.CSSProperties {
    const { animationDelay } = this.props;
    
    if (animationDelay) {
      return {
        animationDelay: `${animationDelay}ms`,
      };
    }

    return {};
  }

  /**
   * Render section title if provided
   */
  private renderTitle(): ReactNode {
    const { title } = this.props;

    if (!title || title.trim() === "") {
      return null;
    }

    return (
      <header className="section-header">
        <h2 className="section-title" id={this.props.id ? `${this.props.id}-title` : undefined}>
          {title}
        </h2>
        <div className="section-title-underline" aria-hidden="true"></div>
      </header>
    );
  }

  /**
   * Render section content
   */
  private renderContent(): ReactNode {
    return (
      <div className="section-content" role="region" aria-labelledby={this.props.id ? `${this.props.id}-title` : undefined}>
        {this.props.children}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { id } = this.props;
    const { error } = this.state;

    // Edge case: Show content even if there's an error
    if (error) {
      console.warn("⚠️ Section Block Error:", error);
    }

    return (
      <section
        id={id}
        ref={this.sectionRef}
        className={this.getClassNames()}
        style={this.getStyles()}
        aria-label={this.props.title || "Content section"}
      >
        {this.renderTitle()}
        {this.renderContent()}
      </section>
    );
  }
}

export default SectionBlock;
