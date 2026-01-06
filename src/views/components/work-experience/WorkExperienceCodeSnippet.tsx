/**
 * WorkExperienceCodeSnippet Component
 * Displays code snippet showing technical stack
 * Shows software engineering capabilities
 * 
 * Principles Applied:
 * - Single Responsibility: Displays code snippet
 * - Open/Closed: Extensible through props
 * - DRY: Reusable component
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import "./WorkExperienceCodeSnippet.css";

/**
 * WorkExperienceCodeSnippet Props Interface
 */
export interface IWorkExperienceCodeSnippetProps {
  technologies: string[];
  language?: string;
  className?: string;
}

/**
 * WorkExperienceCodeSnippet Component
 * Displays an animated code snippet showing technologies used
 */
export class WorkExperienceCodeSnippet extends PureComponent<IWorkExperienceCodeSnippetProps> {
  /**
   * Render code lines
   */
  private renderCodeLines(): ReactNode {
    const { technologies } = this.props;

    if (!technologies || technologies.length === 0) {
      return null;
    }

    // Limit to top 6 technologies for better display
    const displayTechs = technologies.slice(0, 6);

    return (
      <div className="work-experience-code-content">
        <div className="work-experience-code-line">
          <span className="work-experience-code-keyword">const</span>{" "}
          <span className="work-experience-code-variable">stack</span>{" "}
          <span className="work-experience-code-operator">=</span>{" "}
          <span className="work-experience-code-bracket">[</span>
        </div>
        {displayTechs.map((tech, index) => (
          <div key={index} className="work-experience-code-line work-experience-code-line-indented">
            <span className="work-experience-code-string">"{tech}"</span>
            {index < displayTechs.length - 1 && (
              <span className="work-experience-code-punctuation">,</span>
            )}
          </div>
        ))}
        <div className="work-experience-code-line">
          <span className="work-experience-code-bracket">]</span>
          <span className="work-experience-code-punctuation">;</span>
        </div>
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { technologies, language = "typescript", className = "" } = this.props;

    if (!technologies || technologies.length === 0) {
      return null;
    }

    const codeClasses = [
      "work-experience-code-snippet",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={codeClasses} role="region" aria-label="Technology Stack">
        <div className="work-experience-code-header">
          <div className="work-experience-code-dots">
            <span className="work-experience-code-dot work-experience-code-dot-red"></span>
            <span className="work-experience-code-dot work-experience-code-dot-yellow"></span>
            <span className="work-experience-code-dot work-experience-code-dot-green"></span>
          </div>
          <span className="work-experience-code-language">{language}</span>
        </div>
        <pre className="work-experience-code-pre">
          <code className={`work-experience-code-code language-${language}`}>
            {this.renderCodeLines()}
          </code>
        </pre>
      </div>
    );
  }
}

