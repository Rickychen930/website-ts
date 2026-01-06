/**
 * Certification Section Component
 * View Layer (MVC Pattern)
 * 
 * Architecture:
 * - MVC: Strict separation of View, Controller, and Model
 * - View: Only handles UI rendering and user interactions
 * - Controller: Handles all business logic (injected via DI)
 * - Model: Handles data structure and validation
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): View only renders UI
 * - Dependency Inversion Principle (DIP): Depends on Controller abstraction
 * - Open/Closed Principle (OCP): Extensible via composition
 * - DRY: Uses reusable components and centralized logic
 * - KISS: Simple, clear structure
 * - Component-Based: Composed of smaller, focused components
 * 
 * Features:
 * - Clean separation of concerns
 * - Proper error handling
 * - Performance optimized (lazy rendering, intersection observer)
 * - Fully accessible (ARIA labels, keyboard navigation)
 * - Responsive design
 */

import React, { Component, ReactNode } from "react";
import { Card } from "../../components/common";
import { CertificationController } from "../../../controllers/certification-controller";
import { ICertification } from "../../../models/certification-model";
import { CertificationGrid } from "../../components/certification";
import { EmptyState } from "../../components/ui";
import "../../../assets/css/certification-section.css";

/**
 * Certification Section Props
 * Supports both old format (from UserProfile) and new format (ICertification)
 */
type CertificationSectionProps = {
  data: ICertification[] | Array<{
    key: string;
    icon: string;
    title: string;
    provider: string;
    date: string;
    link?: string;
    credentialId?: string;
  }>;
};

/**
 * Certification Section State
 * Encapsulates all view-related state
 */
type CertificationSectionState = {
  visibleItems: Set<string>;
  error: string | null;
  processedData: ICertification[];
  isLoading: boolean;
};

/**
 * Certification Section Component
 * Main view component following MVC pattern
 */
class CertificationSection extends Component<
  CertificationSectionProps,
  CertificationSectionState
> {
  private readonly controller: CertificationController;
  private readonly MAX_ITEMS_TO_RENDER = 50;

  constructor(props: CertificationSectionProps) {
    super(props);

    // Initialize controller (Dependency Injection)
    // This allows for easy testing and mocking
    this.controller = new CertificationController();

    // Initialize state - data will be processed in componentDidMount
    // Better practice: Avoid processing in constructor
    this.state = {
      visibleItems: new Set(),
      error: null,
      processedData: [],
      isLoading: false,
    };
  }

  /**
   * Component lifecycle - Mount
   * Process data on mount (better than constructor)
   */
  componentDidMount(): void {
    this.processData();
  }

  /**
   * Process data through controller
   * Centralized data processing for better maintainability
   */
  private processData(): void {
    this.setState({ isLoading: true });

    // Normalize and process data through controller
    // View layer delegates all business logic to controller
    const normalizedData = this.normalizeData(this.props.data);
    const processedData = this.controller.processData(normalizedData);

    // Validate through controller
    const validation = this.controller.validateData(normalizedData);

    this.setState({
      processedData,
      error: validation.isValid ? null : validation.error,
      isLoading: false,
    });
  }

  /**
   * Normalize data to ICertification format
   * Handles both old and new data formats
   */
  private normalizeData(
    data: CertificationSectionProps["data"]
  ): ICertification[] {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      key: item.key,
      icon: item.icon,
      title: item.title,
      provider: item.provider,
      date: item.date,
      link: item.link,
      credentialId: item.credentialId,
      // Optional fields with defaults
      description: "description" in item ? item.description : undefined,
      category: "category" in item ? item.category : undefined,
      level: "level" in item ? item.level : undefined,
      skills: "skills" in item ? item.skills : undefined,
    }));
  }

  /**
   * Handle props update
   * Re-processes data when props change
   */
  componentDidUpdate(prevProps: CertificationSectionProps): void {
    if (prevProps.data !== this.props.data) {
      this.processData();
    }
  }

  /**
   * Handle visibility change
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
   * Handle link click
   */
  private handleLinkClick = (link: string): void => {
    this.controller.handleLinkClick(link);
  };

  /**
   * Validate data
   */
  private validateData(): { isValid: boolean; error: string | null } {
    const { data } = this.props;
    const normalizedData = this.normalizeData(data);
    const validation = this.controller.validateData(normalizedData);

    return {
      isValid: validation.isValid,
      error: validation.error,
    };
  }

  /**
   * Render empty state
   * Uses reusable EmptyState component for consistency
   */
  private renderEmptyState(): ReactNode {
    return (
      <EmptyState
        icon="📜"
        title="No Certifications Yet"
        message="Certifications will appear here once available."
        variant="default"
      />
    );
  }

  /**
   * Render error state
   */
  private renderErrorState(error: string): ReactNode {
    return (
      <div
        className="certification-error"
        role="alert"
        aria-label="Certification error"
      >
        <div className="certification-error-icon" aria-hidden="true">
          ⚠️
        </div>
        <h3 className="certification-error-title">Error Loading Certifications</h3>
        <p className="certification-error-message">{error}</p>
      </div>
    );
  }

  /**
   * Render certification grid
   * Delegates rendering to reusable CertificationGrid component
   */
  private renderCertificationGrid(): ReactNode {
    const { processedData, visibleItems, isLoading } = this.state;

    if (isLoading) {
      return this.renderLoadingState();
    }

    if (processedData.length === 0) {
      return this.renderEmptyState();
    }

    // Limit items for performance
    // Controller could handle this, but view controls rendering limits
    const itemsToRender = processedData.slice(0, this.MAX_ITEMS_TO_RENDER);

    return (
      <div className="certification-section-wrapper">
        <CertificationGrid
          certifications={itemsToRender}
          visibleItems={visibleItems}
          onVisibilityChange={this.handleVisibilityChange}
          onLinkClick={this.handleLinkClick}
        />
      </div>
    );
  }

  /**
   * Render loading state
   */
  private renderLoadingState(): ReactNode {
    return (
      <div
        className="certification-loading"
        role="status"
        aria-live="polite"
        aria-label="Loading certifications"
      >
        <div className="certification-loading-spinner" aria-hidden="true"></div>
        <p className="certification-loading-message">Loading certifications...</p>
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
        {this.renderCertificationGrid()}
      </Card>
    );
  }
}

export default CertificationSection;
export type { CertificationSectionProps };
