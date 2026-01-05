/**
 * SoftSkillGrid Component
 * 
 * Grid container for soft skill cards
 * Follows Single Responsibility Principle (SRP)
 * 
 * Features:
 * - Responsive grid layout
 * - Smooth animations
 * - Accessibility support
 */
import React, { PureComponent, ReactNode } from "react";
import { SoftSkillItem } from "../../../models/soft-skills-model";
import { SoftSkillCard } from "./SoftSkillCard";
import "./SoftSkillGrid.css";

export interface ISoftSkillGridProps {
  readonly skills: readonly SoftSkillItem[];
  readonly visibleItems?: Set<string>;
  readonly onItemIntersect?: (key: string) => void;
}

/**
 * SoftSkillGrid Component
 * PureComponent for performance optimization
 */
export class SoftSkillGrid extends PureComponent<ISoftSkillGridProps> {
  public render(): ReactNode {
    const { skills, visibleItems = new Set(), onItemIntersect } = this.props;

    if (!skills || skills.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div
        className="soft-skills-grid-container"
        role="list"
        aria-label="Soft skills"
      >
        <div className="soft-skills-grid">
          {skills.map((skill, index) => (
            <SoftSkillCard
              key={skill.key}
              skill={skill}
              index={index}
              isVisible={visibleItems.has(skill.key)}
              onIntersect={onItemIntersect}
            />
          ))}
        </div>
      </div>
    );
  }

  /**
   * Render empty state
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="soft-skills-empty" role="status" aria-live="polite">
        <div className="soft-skills-empty-icon" aria-hidden="true">
          💼
        </div>
        <p className="soft-skills-empty-text">
          No soft skills available at the moment.
        </p>
      </div>
    );
  }
}

