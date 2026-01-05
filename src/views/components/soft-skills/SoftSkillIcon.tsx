/**
 * SoftSkillIcon Component
 * 
 * Reusable icon component for soft skills
 * Follows Single Responsibility Principle (SRP)
 * 
 * Features:
 * - Animated icon with glow effect
 * - Responsive sizing
 * - Accessibility support
 */
import React, { PureComponent, ReactNode } from "react";
import "./SoftSkillIcon.css";

export interface ISoftSkillIconProps {
  readonly icon: string;
  readonly name: string;
  readonly size?: "small" | "medium" | "large";
  readonly animated?: boolean;
}

/**
 * SoftSkillIcon Component
 * PureComponent for performance optimization
 */
export class SoftSkillIcon extends PureComponent<ISoftSkillIconProps> {
  public render(): ReactNode {
    const { icon, name, size = "medium", animated = true } = this.props;

    if (!icon || icon.trim() === "") {
      return null;
    }

    return (
      <div
        className={`soft-skill-icon-wrapper soft-skill-icon-${size} ${
          animated ? "soft-skill-icon-animated" : ""
        }`}
        aria-hidden="true"
      >
        <div className="soft-skill-icon-glow" aria-hidden="true"></div>
        <div className="soft-skill-icon-container">
          <span className="soft-skill-icon-emoji" aria-label={`${name} icon`}>
            {icon}
          </span>
        </div>
      </div>
    );
  }
}

