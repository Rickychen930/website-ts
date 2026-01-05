// src/sections/certifications-section.tsx
import React, { Component, ReactNode, PureComponent, createRef, RefObject } from "react";
import Card from "../../components/card-component";
import "../../../assets/css/certification-section.css";

/**
 * Certification Item Type
 * Follows Single Responsibility Principle
 */
export type CertificationItem = {
  key: string;
  icon: string;
  title: string;
  provider: string;
  date: string;
  link?: string;
  credentialId?: string;
};

/**
 * Certification Section Props
 */
type CertificationSectionProps = {
  data: CertificationItem[];
};

/**
 * Certification Section State
 */
type CertificationSectionState = {
  visibleItems: Set<string>;
  error: string | null;
};

/**
 * Certification Card Component
 * Reusable, optimized component following DRY and OOP principles
 */
class CertificationCard extends PureComponent<{
  item: CertificationItem;
  index: number;
  isVisible: boolean;
  onVisibilityChange: (key: string, visible: boolean) => void;
  refObj: RefObject<HTMLDivElement>;
}> {
  private readonly ANIMATION_DELAY_BASE = 100;
  private readonly INTERSECTION_THRESHOLD = 0.1;

  componentDidMount(): void {
    this.setupIntersectionObserver();
  }

  componentWillUnmount(): void {
    this.cleanupIntersectionObserver();
  }

  private observer: IntersectionObserver | null = null;

  /**
   * Setup Intersection Observer for performance optimization
   * Only animate when item is visible
   */
  private setupIntersectionObserver = (): void => {
    if (!this.props.refObj.current || typeof IntersectionObserver === "undefined") {
      // Fallback: mark as visible if IntersectionObserver not supported
      this.props.onVisibilityChange(this.props.item.key, true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.props.onVisibilityChange(this.props.item.key, entry.isIntersecting);
        });
      },
      {
        threshold: this.INTERSECTION_THRESHOLD,
        rootMargin: "50px",
      }
    );

    if (this.props.refObj.current) {
      this.observer.observe(this.props.refObj.current);
    }
  };

  /**
   * Cleanup Intersection Observer
   */
  private cleanupIntersectionObserver = (): void => {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  };

  /**
   * Handle card click - open link if available
   */
  private handleCardClick = (): void => {
    const { item } = this.props;
    if (item.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.handleCardClick();
    }
  };

  /**
   * Get animation delay based on index
   */
  private getAnimationDelay(): string {
    return `${this.props.index * this.ANIMATION_DELAY_BASE}ms`;
  }

  /**
   * Render icon with proper accessibility
   */
  private renderIcon(): ReactNode {
    const { item } = this.props;
    return (
      <div className="certification-icon" aria-hidden="true">
        <span className="icon-emoji">{item.icon}</span>
        <div className="icon-glow"></div>
      </div>
    );
  }

  /**
   * Render certification content
   */
  private renderContent(): ReactNode {
    const { item } = this.props;
    return (
      <div className="certification-content">
        <h3 className="certification-title">{item.title}</h3>
        <div className="certification-meta">
          <span className="certification-provider">{item.provider}</span>
          {item.credentialId && (
            <span className="certification-credential-id" title="Credential ID">
              ID: {item.credentialId}
            </span>
          )}
        </div>
        <div className="certification-date">
          <span className="date-icon" aria-hidden="true">📅</span>
          <time dateTime={this.formatDateForDateTime(item.date)}>{item.date}</time>
        </div>
        {item.link && (
          <div className="certification-link-hint" aria-hidden="true">
            Click to verify →
          </div>
        )}
      </div>
    );
  }

  /**
   * Format date for datetime attribute
   */
  private formatDateForDateTime(date: string): string {
    // Try to parse common date formats
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toISOString().split("T")[0];
    }
    return date;
  }

  /**
   * Get card class names
   */
  private getCardClassNames(): string {
    const { item, isVisible } = this.props;
    const classes = ["certification-card"];
    
    if (isVisible) {
      classes.push("visible");
    }
    
    if (item.link) {
      classes.push("clickable");
    }
    
    return classes.filter(Boolean).join(" ");
  }

  /**
   * Main render method
   */
  render(): ReactNode {
    const { item, refObj } = this.props;
    
    return (
      <div
        ref={refObj}
        className={this.getCardClassNames()}
        style={{ animationDelay: this.getAnimationDelay() }}
        onClick={this.handleCardClick}
        onKeyDown={this.handleKeyDown}
        role={item.link ? "link" : "article"}
        tabIndex={item.link ? 0 : -1}
        aria-label={`Certification: ${item.title} from ${item.provider}`}
        data-certification-key={item.key}
      >
        <div className="certification-card-inner">
          {this.renderIcon()}
          {this.renderContent()}
        </div>
        <div className="certification-card-shine"></div>
      </div>
    );
  }
}

/**
 * Certification Section Component
 * Main component following MVC pattern and SOLID principles
 */
class CertificationSection extends Component<CertificationSectionProps, CertificationSectionState> {
  private itemRefs = new Map<string, RefObject<HTMLDivElement>>();
  private readonly MAX_ITEMS_TO_RENDER = 50; // Performance limit

  constructor(props: CertificationSectionProps) {
    super(props);
    
    // Initialize refs for all items
    this.initializeRefs();
    
    this.state = {
      visibleItems: new Set(),
      error: null,
    };
  }

  /**
   * Handle props update - reinitialize refs if data changes
   * Ensures synchronization when data updates
   */
  componentDidUpdate(prevProps: CertificationSectionProps): void {
    if (prevProps.data !== this.props.data) {
      // Clear existing refs
      this.itemRefs.clear();
      // Reinitialize refs with new data
      this.initializeRefs();
      // Reset visibility state
      this.setState({ visibleItems: new Set() });
    }
  }

  /**
   * Initialize refs for all certification items
   * Performance: Only create refs for items that will be rendered
   */
  private initializeRefs(): void {
    const { data } = this.props;
    if (!data || !Array.isArray(data)) {
      return;
    }
    
    const itemsToProcess = data.slice(0, this.MAX_ITEMS_TO_RENDER);
    
    itemsToProcess.forEach((item) => {
      if (item && item.key && !this.itemRefs.has(item.key)) {
        this.itemRefs.set(item.key, createRef<HTMLDivElement>());
      }
    });
  }

  /**
   * Handle visibility change for performance optimization
   */
  private handleVisibilityChange = (key: string, visible: boolean): void => {
    this.setState((prevState) => {
      const newVisibleItems = new Set(prevState.visibleItems);
      if (visible) {
        newVisibleItems.add(key);
      } else {
        newVisibleItems.delete(key);
      }
      return { visibleItems: newVisibleItems };
    });
  };

  /**
   * Validate certification data
   * Edge case handling
   */
  private validateData(): { isValid: boolean; error: string | null } {
    const { data } = this.props;

    if (!data || !Array.isArray(data)) {
      return { isValid: false, error: "Invalid certification data format" };
    }

    if (data.length === 0) {
      return { isValid: false, error: null }; // Empty is valid, just don't render
    }

    // Check for duplicate keys
    const keys = new Set<string>();
    for (const item of data) {
      if (!item.key) {
        return { isValid: false, error: "Certification item missing key" };
      }
      if (keys.has(item.key)) {
        return { isValid: false, error: `Duplicate certification key: ${item.key}` };
      }
      keys.add(item.key);

      if (!item.title || !item.provider || !item.date) {
        return { isValid: false, error: `Incomplete certification data for key: ${item.key}` };
      }
    }

    return { isValid: true, error: null };
  }

  /**
   * Render empty state
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="certification-empty" role="status" aria-live="polite">
        <div className="empty-icon" aria-hidden="true">📜</div>
        <p className="empty-message">No certifications available</p>
      </div>
    );
  }

  /**
   * Render error state
   */
  private renderErrorState(error: string): ReactNode {
    return (
      <div className="certification-error" role="alert">
        <div className="error-icon" aria-hidden="true">⚠️</div>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  /**
   * Render certification cards
   */
  private renderCertificationCards(): ReactNode {
    const { data } = this.props;
    const { visibleItems } = this.state;
    
    // Limit items for performance
    const itemsToRender = data.slice(0, this.MAX_ITEMS_TO_RENDER);
    
    if (itemsToRender.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div className="certification-grid" role="list" aria-label="Certifications">
        {itemsToRender.map((item, index) => {
          const refObj = this.itemRefs.get(item.key);
          if (!refObj) return null;

          return (
            <CertificationCard
              key={item.key}
              item={item}
              index={index}
              isVisible={visibleItems.has(item.key)}
              onVisibilityChange={this.handleVisibilityChange}
              refObj={refObj}
            />
          );
        })}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { data } = this.props;
    const validation = this.validateData();

    // Handle validation errors
    if (!validation.isValid && validation.error) {
      return (
        <Card id="certification-section" title="Certifications">
          {this.renderErrorState(validation.error)}
        </Card>
      );
    }

    // Handle empty data
    if (!data || data.length === 0) {
      return (
        <Card id="certification-section" title="Certifications">
          {this.renderEmptyState()}
        </Card>
      );
    }

    return (
      <Card id="certification-section" title="Certifications">
        <div className="certification-section-wrapper">
          {this.renderCertificationCards()}
        </div>
      </Card>
    );
  }
}

export default CertificationSection;
