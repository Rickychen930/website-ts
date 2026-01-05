/**
 * Project Links Component
 * Reusable component for displaying project links (GitHub, Demo, etc.)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode } from "react";
import { IProjectLink } from "../../../models/project-model";

/**
 * Project Links Props
 */
interface ProjectLinksProps {
  links?: IProjectLink[];
  className?: string;
  onLinkClick?: (url: string, type: string) => void;
}

/**
 * Project Links Component
 * PureComponent for performance optimization
 */
export class ProjectLinks extends PureComponent<ProjectLinksProps> {
  static defaultProps: Partial<ProjectLinksProps> = {
    links: [],
    className: "",
    onLinkClick: undefined,
  };

  /**
   * Get link icon based on type
   */
  private getLinkIcon(type: string): string {
    const icons: Record<string, string> = {
      github: "🔗",
      demo: "🌐",
      documentation: "📚",
      playstore: "📱",
      appstore: "📱",
      other: "🔗",
    };
    return icons[type] || "🔗";
  }

  /**
   * Get link label
   */
  private getLinkLabel(link: IProjectLink): string {
    if (link.label) return link.label;

    const labels: Record<string, string> = {
      github: "View Code",
      demo: "Live Demo",
      documentation: "Documentation",
      playstore: "Play Store",
      appstore: "App Store",
      other: "View",
    };
    return labels[link.type] || "View";
  }

  /**
   * Handle link click
   */
  private handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, link: IProjectLink): void => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.onLinkClick) {
      this.props.onLinkClick(link.url, link.type);
    } else {
      // Default behavior: open in new tab
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  /**
   * Get class names
   */
  private getClassNames(): string {
    const { className = "" } = this.props;
    const classes = ["project-links", className];
    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render single link
   */
  private renderLink(link: IProjectLink, index: number): ReactNode {
    return (
      <a
        key={`${link.type}-${index}`}
        href={link.url}
        className={`project-link project-link-${link.type}`}
        onClick={(e) => this.handleLinkClick(e, link)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${this.getLinkLabel(link)} - ${link.type}`}
      >
        <span className="project-link-icon" aria-hidden="true">
          {this.getLinkIcon(link.type)}
        </span>
        <span className="project-link-label">{this.getLinkLabel(link)}</span>
      </a>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { links = [] } = this.props;

    if (!links || links.length === 0) {
      return null;
    }

    return (
      <div className={this.getClassNames()} role="group" aria-label="Project links">
        {links.map((link, index) => this.renderLink(link, index))}
      </div>
    );
  }
}

