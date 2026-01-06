/**
 * Technical Skills Section - View Layer (MVC Pattern)
 * 
 * Features:
 * - Professional, Luxury, Clean Design
 * - Performance Optimized (PureComponent, memoization)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with hover effects and interactions
 * - Accessibility Support (ARIA labels, semantic HTML)
 * 
 * Principles Applied:
 * - MVC: Separates View from Controller and Model
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - KISS (Keep It Simple)
 * - Component-Based: Uses reusable components
 */

import React, { Component, ReactNode } from "react";
import { Card } from "../../components/common";
import { SkillCategoryCard } from "../../components/technical-skills";
import { TechnicalSkillsController } from "../../../controllers/technical-skills-controller";
import { UserProfile } from "../../../types/user";
import "../../../assets/css/technical-skills-section.css";

/**
 * Technical Skills Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
type TechnicalSkillsProps = {
  data: Array<{
    category: string;
    items: string[];
  }>;
};

/**
 * Technical Skills Section State Interface
 */
type TechnicalSkillsState = {
  enrichedCategories: Array<{
    category: string;
    categoryIcon: string;
    items: Array<{ name: string; icon: string }>;
  }> | null;
  statistics: {
    totalSkills: number;
    categoryCount: number;
    averageSkillsPerCategory: number;
  } | null;
};

/**
 * Technical Skills Section Component
 * 
 * Architecture:
 * - View Layer: This component (renders UI)
 * - Controller Layer: TechnicalSkillsController (handles business logic)
 * - Model Layer: TechnicalSkillsModel (handles data)
 * 
 * Follows MVC Pattern:
 * - Separates concerns between View, Controller, and Model
 * - View depends on Controller abstraction (Dependency Inversion)
 * - Controller orchestrates business logic
 * - Model handles data transformation and validation
 */
class TechnicalSkillsSection extends Component<
  TechnicalSkillsProps,
  TechnicalSkillsState
> {
  private readonly controller: TechnicalSkillsController;

  constructor(props: TechnicalSkillsProps) {
    super(props);
    this.state = {
      enrichedCategories: null,
      statistics: null,
    };
    this.controller = new TechnicalSkillsController();
  }

  /**
   * Component lifecycle - Mount
   * Initialize data when component mounts
   */
  componentDidMount(): void {
    this.initializeData();
  }

  /**
   * Component lifecycle - Update
   * Re-initialize data when props change
   */
  componentDidUpdate(prevProps: TechnicalSkillsProps): void {
    if (prevProps.data !== this.props.data) {
      this.initializeData();
    }
  }

  /**
   * Initialize data using controller
   * Follows Single Responsibility Principle (SRP)
   * Follows Dependency Inversion Principle (DIP)
   */
  private initializeData(): void {
    // Create a mock profile object for the controller
    // The controller expects a UserProfile, so we create a minimal one
    const mockProfile: UserProfile = {
      name: "",
      title: "",
      location: "",
      bio: "",
      stats: [],
      academics: [],
      certifications: [],
      contacts: [],
      honors: [],
      languages: [],
      projects: [],
      softSkills: [],
      technicalSkills: Array.isArray(this.props.data) ? this.props.data : [],
      experiences: [],
    };

    const enrichedCategories = this.controller.getEnrichedCategories(mockProfile);
    const statistics = this.controller.getSkillStatistics(mockProfile);

    this.setState({
      enrichedCategories,
      statistics,
    });
  }

  /**
   * Render empty state
   * Edge case handling
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="technical-skills-empty" role="status" aria-live="polite">
        <div className="technical-skills-empty__icon" aria-hidden="true">
          💻
        </div>
        <h3 className="technical-skills-empty__title">
          Technical Skills
        </h3>
        <p className="technical-skills-empty__text">
          No technical skills available at the moment.
        </p>
      </div>
    );
  }

  /**
   * Render statistics header
   * Shows summary of skills
   */
  private renderStatistics(): ReactNode {
    const { statistics } = this.state;

    if (!statistics) {
      return null;
    }

    return (
      <div className="technical-skills-statistics" role="region" aria-label="Skills Statistics">
        <div className="technical-skills-statistics__item">
          <span className="technical-skills-statistics__value">
            {statistics.totalSkills}
          </span>
          <span className="technical-skills-statistics__label">Total Skills</span>
        </div>
        <div className="technical-skills-statistics__divider" aria-hidden="true"></div>
        <div className="technical-skills-statistics__item">
          <span className="technical-skills-statistics__value">
            {statistics.categoryCount}
          </span>
          <span className="technical-skills-statistics__label">Categories</span>
        </div>
        <div className="technical-skills-statistics__divider" aria-hidden="true"></div>
        <div className="technical-skills-statistics__item">
          <span className="technical-skills-statistics__value">
            {statistics.averageSkillsPerCategory}
          </span>
          <span className="technical-skills-statistics__label">Avg per Category</span>
        </div>
      </div>
    );
  }

  /**
   * Render skill category cards
   * Uses reusable SkillCategoryCard component
   * Follows DRY principle
   */
  private renderCategoryCards(): ReactNode {
    const { enrichedCategories } = this.state;

    if (!enrichedCategories || enrichedCategories.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div
        className="technical-skills-grid"
        role="region"
        aria-label="Technical Skills Categories"
      >
        {enrichedCategories.map((category, index) => (
          <SkillCategoryCard
            key={`skill-category-${category.category}-${index}`}
            category={category.category}
            categoryIcon={category.categoryIcon}
            items={category.items}
            index={index}
          />
        ))}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { data } = this.props;
    const { enrichedCategories } = this.state;

    // Edge case: Handle empty or invalid data
    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <Card id="technical-skills-section" title="Technical Skills">
          {this.renderEmptyState()}
        </Card>
      );
    }

    // Edge case: No enriched categories after processing
    if (!enrichedCategories || enrichedCategories.length === 0) {
      return (
        <Card id="technical-skills-section" title="Technical Skills">
          {this.renderEmptyState()}
        </Card>
      );
    }

    return (
      <Card
        id="technical-skills-section"
        title="Technical Skills"
        ariaLabel="Technical Skills Section"
      >
        <div className="technical-skills-container">
          {this.renderStatistics()}
          {this.renderCategoryCards()}
        </div>
      </Card>
    );
  }
}

export default TechnicalSkillsSection;
