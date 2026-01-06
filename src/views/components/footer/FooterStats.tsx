/**
 * Footer Stats Component
 * Displays software engineering achievements and statistics
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles stats display
 * - Open/Closed Principle (OCP): Extensible via props
 * - DRY: Reusable component
 * - KISS: Simple, clear implementation
 */

import React, { PureComponent, ReactNode } from "react";
import "../../../assets/css/footer-section.css";

/**
 * Footer Stats Props
 */
interface FooterStatsProps {
  stats?: Array<{
    key: string;
    value: string;
    label: string;
    icon?: string;
  }>;
  className?: string;
}

/**
 * Footer Stats Component
 * Displays achievement statistics
 */
export class FooterStats extends PureComponent<FooterStatsProps> {
  /**
   * Render single stat item
   */
  private renderStatItem(
    stat: NonNullable<FooterStatsProps["stats"]>[0],
    index: number,
  ): ReactNode {
    return (
      <div
        key={stat.key}
        className="footer-stat-item"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="footer-stat-icon">{stat.icon || "📊"}</div>
        <div className="footer-stat-content">
          <div className="footer-stat-value">{stat.value}</div>
          <div className="footer-stat-label">{stat.label}</div>
        </div>
      </div>
    );
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { stats, className } = this.props;

    if (!stats || stats.length === 0) {
      return null;
    }

    return (
      <div className={`footer-stats ${className || ""}`.trim()}>
        <h3 className="footer-section-title">Achievements</h3>
        <div className="footer-stats-grid">
          {stats.map((stat, index) => this.renderStatItem(stat, index))}
        </div>
      </div>
    );
  }
}

export default FooterStats;
