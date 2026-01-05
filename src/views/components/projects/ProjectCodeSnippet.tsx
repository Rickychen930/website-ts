/**
 * Project Code Snippet Component
 * Shows technical code snippets to demonstrate software engineering skills
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode } from "react";

/**
 * Project Code Snippet Props
 */
interface ProjectCodeSnippetProps {
  code?: string;
  language?: string;
  technologies?: string[];
  className?: string;
}

/**
 * Project Code Snippet Component
 * PureComponent for performance optimization
 */
export class ProjectCodeSnippet extends PureComponent<ProjectCodeSnippetProps> {
  static defaultProps: Partial<ProjectCodeSnippetProps> = {
    code: undefined,
    language: "typescript",
    technologies: [],
    className: "",
  };

  /**
   * Generate code snippet from technologies
   */
  private generateCodeFromTechnologies(): ReactNode {
    const { technologies = [] } = this.props;
    
    if (technologies.length === 0) {
      return (
        <div className="project-code-line">
          <span className="project-code-keyword">const</span>{" "}
          <span className="project-code-variable">project</span>{" "}
          <span className="project-code-operator">=</span>{" "}
          <span className="project-code-string">"Software Engineering"</span>
          <span className="project-code-punctuation">;</span>
        </div>
      );
    }

    return (
      <>
        <div className="project-code-line">
          <span className="project-code-keyword">const</span>{" "}
          <span className="project-code-variable">techStack</span>{" "}
          <span className="project-code-operator">=</span>{" "}
          <span className="project-code-bracket">[</span>
        </div>
        {technologies.slice(0, 4).map((tech, index) => (
          <div key={index} className="project-code-line project-code-line-indented">
            <span className="project-code-string">"{tech}"</span>
            {index < Math.min(technologies.length, 4) - 1 && (
              <span className="project-code-punctuation">,</span>
            )}
          </div>
        ))}
        {technologies.length > 4 && (
          <div className="project-code-line project-code-line-indented">
            <span className="project-code-comment">{`// +${technologies.length - 4} more`}</span>
          </div>
        )}
        <div className="project-code-line">
          <span className="project-code-bracket">]</span>
          <span className="project-code-punctuation">;</span>
        </div>
      </>
    );
  }

  /**
   * Get class names
   */
  private getClassNames(): string {
    const { className = "" } = this.props;
    const classes = ["project-code-snippet", className];
    return classes.filter(Boolean).join(" ");
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { code, language = "typescript" } = this.props;

    return (
      <div className={this.getClassNames()} role="region" aria-label="Code snippet">
        <div className="project-code-header">
          <div className="project-code-dots">
            <span className="project-code-dot project-code-dot-red"></span>
            <span className="project-code-dot project-code-dot-yellow"></span>
            <span className="project-code-dot project-code-dot-green"></span>
          </div>
          <span className="project-code-language">{language}</span>
        </div>
        <pre className="project-code-pre">
          <code className={`project-code-code language-${language}`}>
            {code ? (
              <div className="project-code-content">{code}</div>
            ) : (
              this.generateCodeFromTechnologies()
            )}
          </code>
        </pre>
      </div>
    );
  }
}

