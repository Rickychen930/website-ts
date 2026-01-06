/**
 * Footer Code Snippet Component
 * Displays animated code snippet showing technical capabilities
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles code display
 * - Open/Closed Principle (OCP): Extensible via props
 * - DRY: Reusable component
 * - KISS: Simple, clear implementation
 */

import React, { PureComponent, ReactNode } from "react";
import "../../../assets/css/footer-section.css";

/**
 * Footer Code Snippet Props
 */
interface FooterCodeSnippetProps {
  code?: string;
  language?: string;
  className?: string;
}

/**
 * Footer Code Snippet Component
 * Displays code snippet with syntax highlighting
 */
export class FooterCodeSnippet extends PureComponent<FooterCodeSnippetProps> {
  static defaultProps: Partial<FooterCodeSnippetProps> = {
    language: "typescript",
    code: `const engineer = {
  skills: ['React', 'TypeScript', 'Node.js'],
  experience: '5+ years',
  passion: 'Building amazing products'
};`,
  };

  /**
   * Render code snippet
   */
  private renderCode(): ReactNode {
    const { code } = this.props;
    return (
      <pre className="footer-code-pre">
        <code className="footer-code-code">{code}</code>
      </pre>
    );
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { language, className } = this.props;

    return (
      <div className={`footer-code-snippet ${className || ""}`.trim()}>
        <div className="footer-code-header">
          <div className="footer-code-dots">
            <span className="footer-code-dot footer-code-dot-red"></span>
            <span className="footer-code-dot footer-code-dot-yellow"></span>
            <span className="footer-code-dot footer-code-dot-green"></span>
          </div>
          <span className="footer-code-language">{language}</span>
        </div>
        {this.renderCode()}
      </div>
    );
  }
}

export default FooterCodeSnippet;

