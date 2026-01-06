/**
 * Footer Tech Stack Component
 * Reusable component for displaying technology stack
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles tech stack display
 * - Open/Closed Principle (OCP): Extensible via props
 * - DRY: Reusable component
 * - KISS: Simple, clear implementation
 */

import React, { PureComponent, ReactNode } from "react";
import { IFooterTechBadge } from "../../../models/footer-model";
import "../../../assets/css/footer-section.css";

/**
 * Footer Tech Stack Props
 */
interface FooterTechStackProps {
  techStack: IFooterTechBadge[];
  className?: string;
}

/**
 * Footer Tech Stack Component
 * Displays technology badges
 */
export class FooterTechStack extends PureComponent<FooterTechStackProps> {
  /**
   * Render single tech badge
   */
  private renderTechBadge(tech: IFooterTechBadge): ReactNode {
    return (
      <li key={tech.key} className="footer-tech-badge-item">
        <span className="footer-tech-badge">
          {tech.icon && <span className="footer-tech-badge-icon" aria-hidden="true">{tech.icon}</span>}
          <span className="footer-tech-badge-name">{tech.name}</span>
        </span>
      </li>
    );
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { techStack, className } = this.props;

    if (!techStack || techStack.length === 0) {
      return null;
    }

    return (
      <div className={`footer-tech-stack ${className || ""}`.trim()}>
        <h3 className="footer-section-title">Tech Stack</h3>
        <ul className="footer-tech-stack-list">
          {techStack.map((tech) => this.renderTechBadge(tech))}
        </ul>
      </div>
    );
  }
}

export default FooterTechStack;

