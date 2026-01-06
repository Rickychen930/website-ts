/**
 * WorkExperienceCard Component
 * Reusable card component for displaying work experience entries
 * 
 * Principles Applied:
 * - Single Responsibility: Displays single work experience item
 * - Open/Closed: Extensible through props
 * - DRY: Reusable across work experience section
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import { IWorkExperienceItem } from "../../../models/work-experience-model";
import { WorkExperienceIcon } from "./WorkExperienceIcon";
import { WorkExperienceBadge } from "./WorkExperienceBadge";
import { WorkExperienceCodeSnippet } from "./WorkExperienceCodeSnippet";
import { WorkExperienceStats } from "./WorkExperienceStats";
import "./WorkExperienceCard.css";

/**
 * WorkExperienceCard Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface IWorkExperienceCardProps {
  item: IWorkExperienceItem;
  index: number;
  isVisible: boolean;
  duration?: string;
  className?: string;
}

/**
 * WorkExperienceCard Component
 * Displays a single work experience entry in a luxury card design
 */
export class WorkExperienceCard extends PureComponent<IWorkExperienceCardProps> {
  /**
   * Render header section with title and company
   */
  private renderHeader(): ReactNode {
    const { item } = this.props;
    return (
      <header className="work-experience-card-header">
        <div className="work-experience-card-title-wrapper">
          <h3 className="work-experience-card-title">{item.title}</h3>
          {this.props.duration && (
            <span className="work-experience-card-duration">{this.props.duration}</span>
          )}
        </div>
        <div className="work-experience-card-company-wrapper">
          <span className="work-experience-card-company">{item.company}</span>
          {item.location && (
            <>
              <span className="work-experience-card-separator" aria-hidden="true">•</span>
              <span className="work-experience-card-location">{item.location}</span>
            </>
          )}
        </div>
      </header>
    );
  }

  /**
   * Render period badge
   */
  private renderPeriod(): ReactNode {
    const { item } = this.props;
    return (
      <div className="work-experience-card-period">
        <time dateTime={item.period} className="work-experience-card-period-text">
          {item.period}
        </time>
      </div>
    );
  }

  /**
   * Render description
   */
  private renderDescription(): ReactNode {
    const { item } = this.props;
    if (!item.description || item.description.trim() === "") {
      return null;
    }

    return (
      <div className="work-experience-card-description">
        <p className="work-experience-card-description-text">{item.description}</p>
      </div>
    );
  }

  /**
   * Render technologies section
   */
  private renderTechnologies(): ReactNode {
    const { item } = this.props;
    if (!item.technologies || item.technologies.length === 0) {
      return null;
    }

    return (
      <div className="work-experience-card-technologies">
        <div className="work-experience-card-technologies-label">Technologies:</div>
        <div className="work-experience-card-technologies-list">
          {item.technologies.map((tech, index) => (
            <WorkExperienceBadge
              key={`${item.key}-tech-${index}`}
              label={tech}
              variant="technology"
            />
          ))}
        </div>
      </div>
    );
  }

  /**
   * Render achievements section
   */
  private renderAchievements(): ReactNode {
    const { item } = this.props;
    if (!item.achievements || item.achievements.length === 0) {
      return null;
    }

    return (
      <div className="work-experience-card-achievements">
        <div className="work-experience-card-achievements-label">Key Achievements:</div>
        <ul className="work-experience-card-achievements-list">
          {item.achievements.map((achievement, index) => (
            <li key={`${item.key}-ach-${index}`} className="work-experience-card-achievement-item">
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /**
   * Render code snippet showing technologies
   */
  private renderCodeSnippet(): ReactNode {
    const { item } = this.props;
    if (!item.technologies || item.technologies.length === 0) {
      return null;
    }

    return (
      <WorkExperienceCodeSnippet
        technologies={item.technologies}
        language="typescript"
      />
    );
  }

  /**
   * Render statistics
   */
  private renderStats(): ReactNode {
    const { item, duration } = this.props;
    
    return (
      <WorkExperienceStats
        technologiesCount={item.technologies?.length}
        duration={duration}
        achievementsCount={item.achievements?.length}
      />
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { item, index, isVisible, className = "" } = this.props;

    const cardClasses = [
      "work-experience-card",
      isVisible ? "work-experience-card-visible" : "work-experience-card-hidden",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const style = {
      animationDelay: `${index * 150}ms`,
      transitionDelay: `${index * 150}ms`,
    } as React.CSSProperties;

    return (
      <article
        className={cardClasses}
        style={style}
        data-key={item.key}
        data-index={index}
        aria-label={`Work experience: ${item.title} at ${item.company}`}
      >
        <WorkExperienceIcon
          icon={item.icon}
          company={item.company}
          isVisible={isVisible}
        />
        <div className="work-experience-card-content">
          <div className="work-experience-card-body">
            {this.renderHeader()}
            {this.renderPeriod()}
            {this.renderDescription()}
            {this.renderTechnologies()}
            {this.renderCodeSnippet()}
            {this.renderStats()}
            {this.renderAchievements()}
          </div>
        </div>
        <div className="work-experience-card-glow"></div>
      </article>
    );
  }
}

