import React, { Component, ReactNode, PureComponent } from "react";
import Card from "../../components/card-component";
import "../../../assets/css/technical-skills-section.css";

/**
 * Skill Category Interface
 * Follows Interface Segregation Principle (ISP)
 */
export type SkillCategory = {
  category: string;
  items: string[];
};

/**
 * Technical Skills Props Interface
 */
type TechnicalSkillsProps = {
  data: SkillCategory[];
};

/**
 * Technical Skills Section State Interface
 */
type TechnicalSkillsState = {
  isVisible: boolean;
  hasAnimated: boolean;
};

/**
 * Skill Item Component
 * PureComponent for performance optimization (memoization)
 * Follows Single Responsibility Principle (SRP)
 */
class SkillItem extends PureComponent<{ item: string; index: number }> {
  public render(): ReactNode {
    const { item, index } = this.props;
    
    return (
      <li 
        className="skill-item" 
        style={{ animationDelay: `${index * 50}ms` }}
        aria-label={`Skill: ${item}`}
      >
        <span className="skill-icon" aria-hidden="true">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M13.5 4.5L6 12L2.5 8.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="skill-name">{item}</span>
      </li>
    );
  }
}

/**
 * Skill Block Component
 * PureComponent for performance optimization
 * Follows Single Responsibility Principle (SRP)
 */
class SkillBlock extends PureComponent<{ skill: SkillCategory; index: number }> {
  public render(): ReactNode {
    const { skill, index } = this.props;
    
    return (
      <article 
        className="skill-block" 
        style={{ animationDelay: `${index * 100}ms` }}
        aria-labelledby={`skill-category-${index}`}
      >
        <header className="skill-header">
          <h3 
            className="skill-category" 
            id={`skill-category-${index}`}
          >
            {skill.category}
          </h3>
          <div className="skill-category-underline" aria-hidden="true"></div>
        </header>
        <ul className="skill-list">
          {skill.items.map((item, itemIndex) => (
            <SkillItem 
              key={`${skill.category}-${item}-${itemIndex}`}
              item={item} 
              index={itemIndex}
            />
          ))}
        </ul>
      </article>
    );
  }
}

/**
 * Technical Skills Section Component
 * 
 * Features:
 * - Luxury & Elegant Design with smooth animations
 * - Performance Optimized (PureComponent, memoization)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with hover effects and interactions
 * - Accessibility Support (ARIA labels, semantic HTML)
 * 
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - MVP (Minimum Viable Product)
 * - Keep It Simple
 */
class TechnicalSkillsSection extends Component<TechnicalSkillsProps, TechnicalSkillsState> {
  constructor(props: TechnicalSkillsProps) {
    super(props);
    this.state = {
      isVisible: false,
      hasAnimated: false,
    };
  }

  /**
   * Handle props changes
   * Re-validate data when props change
   */
  componentDidUpdate(prevProps: TechnicalSkillsProps): void {
    // Edge case: Handle data changes
    if (prevProps.data !== this.props.data) {
      // Reset animation state when data changes
      this.setState({
        hasAnimated: false,
      });
    }
  }

  /**
   * Validate data structure
   * Edge case handling - Enhanced validation
   */
  private isValidData(data: SkillCategory[]): boolean {
    if (!Array.isArray(data) || data.length === 0) {
      return false;
    }

    return data.every(
      (skill) =>
        skill &&
        typeof skill === "object" &&
        typeof skill.category === "string" &&
        skill.category.trim() !== "" &&
        Array.isArray(skill.items) &&
        skill.items.length > 0 &&
        skill.items.every((item) => typeof item === "string" && item.trim() !== "")
    );
  }

  /**
   * Render empty state
   * Edge case handling
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="skills-empty" role="status" aria-live="polite">
        <div className="skills-empty-icon" aria-hidden="true">📋</div>
        <p className="skills-empty-text">No technical skills available at the moment.</p>
      </div>
    );
  }

  /**
   * Render skill blocks
   * Follows DRY principle
   * Enhanced with filtering for invalid items
   */
  private renderSkillBlocks(): ReactNode {
    const { data } = this.props;

    if (!this.isValidData(data)) {
      return this.renderEmptyState();
    }

    // Filter and validate items before rendering
    const validSkills = data.filter((skill) => {
      return (
        skill &&
        typeof skill === "object" &&
        typeof skill.category === "string" &&
        skill.category.trim() !== "" &&
        Array.isArray(skill.items) &&
        skill.items.length > 0 &&
        skill.items.every((item) => typeof item === "string" && item.trim() !== "")
      );
    });

    // Edge case: No valid skills after filtering
    if (validSkills.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div className="skills-grid" role="region" aria-label="Technical Skills">
        {validSkills.map((skill, index) => (
          <SkillBlock 
            key={`skill-block-${skill.category}-${index}`}
            skill={skill} 
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

    // Edge case: Handle empty or invalid data
    if (!data || !Array.isArray(data) || data.length === 0) {
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
        {this.renderSkillBlocks()}
      </Card>
    );
  }
}

export default TechnicalSkillsSection;
