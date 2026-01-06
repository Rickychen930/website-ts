/**
 * Footer Social Links Component
 * Reusable component for social media links
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles social links display
 * - Open/Closed Principle (OCP): Extensible via props
 * - DRY: Reusable component
 * - KISS: Simple, clear implementation
 */

import React, { PureComponent, ReactNode } from "react";
import { IFooterSocialLink } from "../../../models/footer-model";
import "../../../assets/css/footer-section.css";

/**
 * Footer Social Links Props
 */
interface FooterSocialLinksProps {
  links: IFooterSocialLink[];
  onLinkClick?: (link: IFooterSocialLink) => void;
  className?: string;
}

/**
 * Footer Social Links Component
 * Displays social media links with icons
 */
export class FooterSocialLinks extends PureComponent<FooterSocialLinksProps> {
  /**
   * Handle link click
   */
  private handleClick = (link: IFooterSocialLink, event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    
    if (this.props.onLinkClick) {
      this.props.onLinkClick(link);
    }
  };

  /**
   * Get link style based on platform color
   */
  private getLinkStyle(link: IFooterSocialLink): React.CSSProperties {
    if (link.color) {
      return {
        "--social-link-color": link.color,
      } as React.CSSProperties;
    }
    return {};
  }

  /**
   * Render single social link
   */
  private renderSocialLink(link: IFooterSocialLink): ReactNode {
    return (
      <li key={link.key} className="footer-social-link-item">
        <a
          href={link.href}
          className="footer-social-link"
          style={this.getLinkStyle(link)}
          onClick={(e) => this.handleClick(link, e)}
          aria-label={`Visit ${link.label} profile`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="footer-social-link-icon" aria-hidden="true">{link.icon}</span>
          <span className="footer-social-link-label">{link.label}</span>
        </a>
      </li>
    );
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { links, className } = this.props;

    if (!links || links.length === 0) {
      return null;
    }

    return (
      <div className={`footer-social-links ${className || ""}`.trim()}>
        <h3 className="footer-section-title">Connect With Me</h3>
        <ul className="footer-social-links-list">
          {links.map((link) => this.renderSocialLink(link))}
        </ul>
      </div>
    );
  }
}

export default FooterSocialLinks;

