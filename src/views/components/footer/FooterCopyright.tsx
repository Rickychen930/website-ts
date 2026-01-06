/**
 * Footer Copyright Component
 * Reusable component for copyright information
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles copyright display
 * - Open/Closed Principle (OCP): Extensible via props
 * - DRY: Reusable component
 * - KISS: Simple, clear implementation
 */

import React, { PureComponent, ReactNode } from "react";
import "../../../assets/css/footer-section.css";

/**
 * Footer Copyright Props
 */
interface FooterCopyrightProps {
  copyright: string;
  author: string;
  className?: string;
}

/**
 * Footer Copyright Component
 * Displays copyright and author information
 */
export class FooterCopyright extends PureComponent<FooterCopyrightProps> {
  /**
   * Render component
   */
  public render(): ReactNode {
    const { copyright, author, className } = this.props;

    return (
      <div className={`footer-copyright ${className || ""}`.trim()}>
        <p className="footer-copyright-text">{copyright}</p>
        <p className="footer-copyright-author">
          Built with <span className="footer-heart" aria-label="love">❤️</span> by{" "}
          <span className="footer-author-name">{author}</span>
        </p>
      </div>
    );
  }
}

export default FooterCopyright;

