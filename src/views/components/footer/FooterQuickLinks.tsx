/**
 * Footer Quick Links Component
 * Reusable component for footer navigation links
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles quick links display
 * - Open/Closed Principle (OCP): Extensible via props
 * - DRY: Reusable component
 * - KISS: Simple, clear implementation
 */

import React, { PureComponent, ReactNode } from "react";
import { IFooterLink } from "../../../models/footer-model";
import "../../../assets/css/footer-section.css";

/**
 * Footer Quick Links Props
 */
interface FooterQuickLinksProps {
  links: IFooterLink[];
  onLinkClick?: (link: IFooterLink) => void;
  className?: string;
}

/**
 * Footer Quick Links Component
 * Displays navigation links in footer
 */
export class FooterQuickLinks extends PureComponent<FooterQuickLinksProps> {
  /**
   * Handle link click
   */
  private handleClick = (link: IFooterLink, event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    
    if (this.props.onLinkClick) {
      this.props.onLinkClick(link);
    }
  };

  /**
   * Render single link
   */
  private renderLink(link: IFooterLink): ReactNode {
    return (
      <li key={link.key} className="footer-quick-link-item">
        <a
          href={link.href}
          className="footer-quick-link"
          onClick={(e) => this.handleClick(link, e)}
          aria-label={`Navigate to ${link.label}`}
        >
          {link.icon && <span className="footer-quick-link-icon" aria-hidden="true">{link.icon}</span>}
          <span className="footer-quick-link-text">{link.label}</span>
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
      <div className={`footer-quick-links ${className || ""}`.trim()}>
        <h3 className="footer-section-title">Quick Links</h3>
        <ul className="footer-quick-links-list">
          {links.map((link) => this.renderLink(link))}
        </ul>
      </div>
    );
  }
}

export default FooterQuickLinks;

