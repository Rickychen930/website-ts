import React, { Component, ReactNode } from "react";
import "../../../assets/css/about-me-components.css";

/**
 * HeroHeader Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface HeroHeaderProps {
  name: string;
  title: string;
  location?: string;
}

/**
 * HeroHeader Component
 * 
 * Features:
 * - Reusable hero header for name and title
 * - Luxury typography with gradient effects
 * - Fully responsive
 * 
 * Principles Applied:
 * - SOLID (SRP, OCP)
 * - DRY (Reusable component)
 * - OOP (Class-based)
 * - KISS (Simple, focused)
 */
class HeroHeader extends Component<HeroHeaderProps> {
  /**
   * Render name with accent styling
   */
  private renderName(): ReactNode {
    const { name } = this.props;

    if (!name || name.trim() === "") {
      return null;
    }

    return (
      <h1 className="hero-header-name">
        <span className="hero-header-greeting">I'm </span>
        <span className="hero-header-name-accent">{name}</span>
      </h1>
    );
  }

  /**
   * Render title
   */
  private renderTitle(): ReactNode {
    const { title } = this.props;

    if (!title || title.trim() === "") {
      return null;
    }

    return (
      <h2 className="hero-header-title" aria-label="Professional title">
        {title}
      </h2>
    );
  }

  /**
   * Render location
   */
  private renderLocation(): ReactNode {
    const { location } = this.props;

    if (!location || location.trim() === "") {
      return null;
    }

    return (
      <div className="hero-header-location" aria-label="Location">
        <span className="hero-header-location-icon" aria-hidden="true">📍</span>
        <span className="hero-header-location-text">{location}</span>
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { name } = this.props;

    if (!name || name.trim() === "") {
      return null;
    }

    return (
      <header className="hero-header">
        {this.renderName()}
        {this.renderTitle()}
        {this.renderLocation()}
      </header>
    );
  }
}

export default HeroHeader;

