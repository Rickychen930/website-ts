/**
 * Soft Skills Section Component
 * 
 * Main section component following MVC, OOP, SOLID, DRY, KISS principles
 * 
 * Architecture:
 * - Model: SoftSkillsModel (data validation)
 * - View: SoftSkillCard, SoftSkillGrid, SoftSkillIcon (reusable components)
 * - Controller: SoftSkillsController (business logic)
 * 
 * Features:
 * - Professional, luxury, clean design
 * - Fully responsive (mobile, tablet, desktop, landscape)
 * - Performance optimized (PureComponent, IntersectionObserver)
 * - Accessibility support (ARIA labels, semantic HTML)
 * - Smooth animations with staggered effects
 * - Comprehensive edge case handling
 * 
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - KISS (Keep It Simple, Stupid)
 * - Component-based architecture
 */
import React, { Component, ReactNode } from "react";
import { Card } from "../../components/common";
import { SoftSkillGrid } from "../../components/soft-skills";
import { SoftSkillsController } from "../../../controllers/soft-skills-controller";
import { SoftSkillsModel, SoftSkillItem } from "../../../models/soft-skills-model";
import "../../../assets/css/soft-skills-section.css";

/**
 * Soft Skills Section Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
type SoftSkillsProps = {
  data: unknown;
};

/**
 * Soft Skills Section State Interface
 */
type SoftSkillsState = {
  validatedSkills: SoftSkillItem[];
  visibleItems: Set<string>;
  isInitialized: boolean;
  error: string | null;
};

/**
 * Soft Skills Section Component
 * Main orchestrator following MVC pattern
 */
class SoftSkillsSection extends Component<SoftSkillsProps, SoftSkillsState> {
  private readonly controller: SoftSkillsController;

  constructor(props: SoftSkillsProps) {
    super(props);
    this.controller = new SoftSkillsController();
    
    this.state = {
      validatedSkills: [],
      visibleItems: new Set(),
      isInitialized: false,
      error: null,
    };
  }

  /**
   * Initialize component
   * Validates and processes data on mount
   */
  componentDidMount(): void {
    this.initializeData();
  }

  /**
   * Handle props changes
   * Re-validate data when props change
   */
  componentDidUpdate(prevProps: SoftSkillsProps): void {
    if (prevProps.data !== this.props.data) {
      this.initializeData();
    }
  }

  /**
   * Initialize and validate data
   * Follows Single Responsibility Principle (SRP)
   */
  private initializeData(): void {
    try {
      const validatedSkills = this.controller.getValidatedSkills(
        this.props.data
      );

      // Validate using model
      const validationResult = SoftSkillsModel.validateData(validatedSkills);

      if (!validationResult.isValid && validatedSkills.length === 0) {
        this.setState({
          error: validationResult.errors.join(", ") || "Invalid data format",
          validatedSkills: [],
          isInitialized: true,
        });
        return;
      }

      this.setState({
        validatedSkills: validationResult.validItems,
        error: null,
        isInitialized: true,
      });
    } catch (error) {
      console.error("❌ Error initializing soft skills:", error);
      this.setState({
        error: error instanceof Error ? error.message : "Unknown error",
        validatedSkills: [],
        isInitialized: true,
      });
    }
  }

  /**
   * Handle item intersection
   * Called when a card becomes visible
   */
  private handleItemIntersect = (key: string): void => {
    this.setState((prevState) => {
      const newVisibleItems = new Set(prevState.visibleItems);
      newVisibleItems.add(key);
      return { visibleItems: newVisibleItems };
    });
  };

  /**
   * Render error state
   * Edge case handling
   */
  private renderErrorState(): ReactNode {
    const { error } = this.state;

    if (!error) {
      return null;
    }

    return (
      <div className="soft-skills-error" role="alert">
        <p className="soft-skills-error-text">
          Unable to load soft skills. Please try again later.
        </p>
      </div>
    );
  }

  /**
   * Main render method
   * Follows Single Responsibility Principle (SRP)
   */
  public render(): ReactNode {
    const { validatedSkills, visibleItems, error, isInitialized } = this.state;

    // Edge case: Show loading state during initialization
    if (!isInitialized) {
      return (
        <Card
          id="soft-skills-section"
          title="Soft Skills"
          variant="default"
          ariaLabel="Soft skills section"
        >
          <div className="soft-skills-loading" role="status" aria-live="polite">
            <p>Loading soft skills...</p>
          </div>
        </Card>
      );
    }

    // Edge case: Show error state
    if (error && validatedSkills.length === 0) {
      return (
        <Card
          id="soft-skills-section"
          title="Soft Skills"
          variant="default"
          ariaLabel="Soft skills section"
        >
          {this.renderErrorState()}
        </Card>
      );
    }

    // Edge case: Handle empty data
    if (!validatedSkills || validatedSkills.length === 0) {
      return (
        <Card
          id="soft-skills-section"
          title="Soft Skills"
          variant="default"
          ariaLabel="Soft skills section"
        >
          <div className="soft-skills-empty" role="status" aria-live="polite">
            <div className="soft-skills-empty-icon" aria-hidden="true">
              💼
            </div>
            <p className="soft-skills-empty-text">
              No soft skills available at the moment.
            </p>
          </div>
        </Card>
      );
    }

    return (
      <Card
        id="soft-skills-section"
        title="Soft Skills"
        variant="default"
        ariaLabel="Soft skills section"
      >
        <SoftSkillGrid
          skills={validatedSkills}
          visibleItems={visibleItems}
          onItemIntersect={this.handleItemIntersect}
        />
      </Card>
    );
  }
}

export default SoftSkillsSection;
export type { SoftSkillItem };
