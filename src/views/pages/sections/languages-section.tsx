/**
 * Languages Section Component
 * View Layer (MVC Pattern)
 *
 * Features:
 * - Professional, Clean, Luxury, Responsive Design
 * - Shows Software Engineering Capabilities Prominently
 * - Component-Based Architecture (Reusable Components)
 * - MVC Pattern (Controller, Model, View separation)
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
 */

import React, { Component, ReactNode } from "react";
import { Card } from "../../components/common";
import { LanguageController } from "../../../controllers/language-controller";
import { ILanguage } from "../../../models/language-model";
import { LanguageGrid } from "../../components/languages";
import { EmptyState } from "../../components/ui";
import "../../../assets/css/languages-section.css";

/**
 * Backward compatibility exports
 * @deprecated Use ILanguage from language-model instead
 */
export type LanguageItem = ILanguage;
export type Language = ILanguage;

/**
 * Languages Section Props Interface
 */
type LanguagesProps = {
  data: ILanguage[];
};

/**
 * Languages Section State Interface
 */
type LanguagesState = {
  visibleItems: Set<string>;
  isInitialized: boolean;
  error: string | null;
  sortedLanguages: ILanguage[];
};

/**
 * Languages Section Component
 * Main component for displaying languages
 */
class LanguagesSection extends Component<LanguagesProps, LanguagesState> {
  private readonly controller: LanguageController;

  constructor(props: LanguagesProps) {
    super(props);
    this.state = {
      visibleItems: new Set(),
      isInitialized: false,
      error: null,
      sortedLanguages: [],
    };
    this.controller = new LanguageController();
  }

  /**
   * Component lifecycle - Mount
   * Initialize component state
   */
  componentDidMount(): void {
    this.initializeComponent();
  }

  /**
   * Component lifecycle - Update
   * Handle data changes
   */
  componentDidUpdate(prevProps: LanguagesProps): void {
    if (prevProps.data !== this.props.data) {
      this.initializeComponent();
    }
  }

  /**
   * Initialize component
   * Process and validate data
   */
  private initializeComponent(): void {
    try {
      const { data } = this.props;

      // Validate data
      const validation = this.controller.validateLanguageData(data);
      if (!validation.isValid) {
        this.setState({
          error: validation.error || "Invalid language data",
          isInitialized: true,
          sortedLanguages: [],
        });
        return;
      }

      // Sort languages by proficiency (highest first)
      const sorted = this.controller.getLanguagesSortedByProficiency(data);

      this.setState({
        sortedLanguages: sorted,
        isInitialized: true,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to initialize languages section";
      this.setState({
        error: errorMessage,
        isInitialized: true,
        sortedLanguages: [],
      });
      const { logError } = require("../../../utils/logger");
      logError(
        "LanguagesSection initialization error",
        error,
        "LanguagesSection",
      );
    }
  }

  /**
   * Handle visibility change
   * Track which items are visible for animations
   */
  private handleVisibilityChange = (key: string, visible: boolean): void => {
    this.setState((prevState) => {
      const updated = new Set(prevState.visibleItems);

      if (visible) {
        updated.add(key);
      } else {
        updated.delete(key);
      }

      // Only update if changed
      if (
        updated.size === prevState.visibleItems.size &&
        Array.from(updated).every((k) => prevState.visibleItems.has(k))
      ) {
        return prevState;
      }

      return {
        ...prevState,
        visibleItems: updated,
      };
    });
  };

  /**
   * Get proficiency class for styling
   */
  private getProficiencyClass = (proficiency: string): string => {
    return this.controller.getProficiencyColorClass(proficiency);
  };

  /**
   * Render error state
   * User-friendly error display
   */
  private renderErrorState(error: string): ReactNode {
    return (
      <div className="language-error-state" role="alert" aria-live="polite">
        <div className="language-error-icon" aria-hidden="true">
          ⚠️
        </div>
        <h3 className="language-error-title">Unable to Display Languages</h3>
        <p className="language-error-message">{error}</p>
      </div>
    );
  }

  /**
   * Render empty state
   * Elegant empty state with proper messaging - Uses reusable EmptyState component
   */
  private renderEmptyState(): ReactNode {
    return (
      <EmptyState
        icon="🌐"
        title="No Languages Available"
        message="Language information will appear here when available."
        variant="default"
      />
    );
  }

  /**
   * Render languages grid
   * Main content renderer
   */
  private renderLanguagesGrid(): ReactNode {
    const { sortedLanguages, visibleItems } = this.state;

    if (sortedLanguages.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <LanguageGrid
        languages={sortedLanguages}
        visibleItems={visibleItems}
        onVisibilityChange={this.handleVisibilityChange}
        getProficiencyClass={this.getProficiencyClass}
      />
    );
  }

  /**
   * Main render method
   * Entry point with comprehensive error handling
   */
  public render(): ReactNode {
    const { error, isInitialized } = this.state;
    const { data } = this.props;

    // Handle initialization errors
    if (error) {
      return (
        <Card id="languages" title="Languages">
          {this.renderErrorState(error)}
        </Card>
      );
    }

    // Handle empty data
    if (!data || data.length === 0) {
      return (
        <Card id="languages" title="Languages">
          {this.renderEmptyState()}
        </Card>
      );
    }

    // Wait for initialization
    if (!isInitialized) {
      return (
        <Card id="languages" title="Languages">
          <div
            className="language-loading-state"
            role="status"
            aria-live="polite"
          >
            <div className="language-loading-spinner" aria-hidden="true"></div>
            <p className="language-loading-text">Loading languages...</p>
          </div>
        </Card>
      );
    }

    // Render main content
    return (
      <Card id="languages" title="Languages">
        {this.renderLanguagesGrid()}
      </Card>
    );
  }
}

export default LanguagesSection;
