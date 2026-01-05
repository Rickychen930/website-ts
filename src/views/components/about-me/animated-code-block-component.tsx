import React, { Component, ReactNode } from "react";
import "../../../assets/css/about-me-components.css";

/**
 * AnimatedCodeBlock Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface AnimatedCodeBlockProps {
  technologies: string[];
  language?: string;
}

/**
 * AnimatedCodeBlock Component
 * 
 * Features:
 * - Animated code block showing tech stack
 * - Shows software engineering capabilities
 * - Luxury design with typing animation effect
 * - Fully responsive
 * 
 * Principles Applied:
 * - SOLID (SRP, OCP)
 * - DRY (Reusable component)
 * - OOP (Class-based)
 * - KISS (Simple, focused)
 */
class AnimatedCodeBlock extends Component<AnimatedCodeBlockProps> {
  static defaultProps: Partial<AnimatedCodeBlockProps> = {
    language: "typescript",
  };

  /**
   * Render code lines
   */
  private renderCodeLines(): ReactNode {
    const { technologies } = this.props;

    if (!technologies || technologies.length === 0) {
      return null;
    }

    return (
      <div className="code-block-content">
        <div className="code-block-line">
          <span className="code-block-keyword">const</span>{" "}
          <span className="code-block-variable">techStack</span>{" "}
          <span className="code-block-operator">=</span>{" "}
          <span className="code-block-bracket">[</span>
        </div>
        {technologies.map((tech, index) => (
          <div key={index} className="code-block-line code-block-line-indented">
            <span className="code-block-string">"{tech}"</span>
            {index < technologies.length - 1 && (
              <span className="code-block-punctuation">,</span>
            )}
          </div>
        ))}
        <div className="code-block-line">
          <span className="code-block-bracket">]</span>
          <span className="code-block-punctuation">;</span>
        </div>
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { technologies, language = "typescript" } = this.props;

    if (!technologies || technologies.length === 0) {
      return null;
    }

    return (
      <div className="animated-code-block" role="region" aria-label="Technology Stack">
        <div className="code-block-header">
          <div className="code-block-dots">
            <span className="code-block-dot code-block-dot-red"></span>
            <span className="code-block-dot code-block-dot-yellow"></span>
            <span className="code-block-dot code-block-dot-green"></span>
          </div>
          <span className="code-block-language">{language}</span>
        </div>
        <pre className="code-block-pre">
          <code className={`code-block-code language-${language}`}>
            {this.renderCodeLines()}
          </code>
        </pre>
      </div>
    );
  }
}

export default AnimatedCodeBlock;

