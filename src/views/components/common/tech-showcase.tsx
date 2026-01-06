/**
 * TechShowcase Component - Interactive Technical Skills Showcase
 * Demonstrates Advanced Software Engineering Capabilities
 * 
 * Features:
 * - Interactive code visualization
 * - Real-time animations
 * - 3D transforms
 * - Advanced CSS effects
 * - Responsive design
 */

import React, { Component, ReactNode } from "react";
import "../../../assets/css/tech-showcase.css";

export interface TechShowcaseProps {
  technologies: string[];
  title?: string;
  variant?: "code" | "grid" | "timeline";
}

interface TechShowcaseState {
  activeIndex: number;
  isVisible: boolean;
}

class TechShowcase extends Component<TechShowcaseProps, TechShowcaseState> {
  private intervalId: number | null = null;

  constructor(props: TechShowcaseProps) {
    super(props);
    this.state = {
      activeIndex: 0,
      isVisible: false,
    };
  }

  componentDidMount(): void {
    this.setState({ isVisible: true });
    this.startRotation();
  }

  componentWillUnmount(): void {
    this.stopRotation();
  }

  private startRotation = (): void => {
    if (this.props.technologies.length <= 1) return;

    this.intervalId = window.setInterval(() => {
      this.setState((prevState) => ({
        activeIndex: (prevState.activeIndex + 1) % this.props.technologies.length,
      }));
    }, 3000);
  };

  private stopRotation = (): void => {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  private handleTechClick = (index: number): void => {
    this.setState({ activeIndex: index });
    this.stopRotation();
    setTimeout(() => this.startRotation(), 5000);
  };

  private renderCodeVariant(): ReactNode {
    const { technologies, title } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className="tech-showcase tech-showcase-code" aria-label="Technology showcase">
        {title && <h3 className="tech-showcase-title">{title}</h3>}
        <div className="tech-showcase-code-container">
          <div className="tech-showcase-code-header">
            <div className="tech-showcase-code-dots">
              <span className="tech-showcase-dot tech-showcase-dot-red"></span>
              <span className="tech-showcase-dot tech-showcase-dot-yellow"></span>
              <span className="tech-showcase-dot tech-showcase-dot-green"></span>
            </div>
            <span className="tech-showcase-code-label">typescript</span>
          </div>
          <div className="tech-showcase-code-content">
            <div className="tech-showcase-code-line">
              <span className="tech-showcase-keyword">const</span>{" "}
              <span className="tech-showcase-variable">stack</span>{" "}
              <span className="tech-showcase-operator">=</span>{" "}
              <span className="tech-showcase-bracket">[</span>
            </div>
            {technologies.map((tech, index) => (
              <div
                key={index}
                className={`tech-showcase-code-line tech-showcase-code-indented ${
                  index === activeIndex ? "tech-showcase-active" : ""
                }`}
                onClick={() => this.handleTechClick(index)}
                role="button"
                tabIndex={0}
                aria-label={`Technology: ${tech}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.handleTechClick(index);
                  }
                }}
              >
                <span className="tech-showcase-string">"{tech}"</span>
                {index < technologies.length - 1 && (
                  <span className="tech-showcase-punctuation">,</span>
                )}
                {index === activeIndex && (
                  <span className="tech-showcase-cursor" aria-hidden="true">|</span>
                )}
              </div>
            ))}
            <div className="tech-showcase-code-line">
              <span className="tech-showcase-bracket">]</span>
              <span className="tech-showcase-punctuation">;</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderGridVariant(): ReactNode {
    const { technologies, title } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className="tech-showcase tech-showcase-grid" aria-label="Technology grid showcase">
        {title && <h3 className="tech-showcase-title">{title}</h3>}
        <div className="tech-showcase-grid-container">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`tech-showcase-item ${
                index === activeIndex ? "tech-showcase-item-active" : ""
              }`}
              onClick={() => this.handleTechClick(index)}
              role="button"
              tabIndex={0}
              aria-label={`Technology: ${tech}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  this.handleTechClick(index);
                }
              }}
            >
              <div className="tech-showcase-item-glow"></div>
              <span className="tech-showcase-item-text">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render(): ReactNode {
    const { variant = "code", technologies } = this.props;
    const { isVisible } = this.state;

    if (!technologies || technologies.length === 0) {
      return null;
    }

    const containerClass = `tech-showcase-wrapper ${isVisible ? "tech-showcase-visible" : ""}`;

    return (
      <div className={containerClass}>
        {variant === "code" && this.renderCodeVariant()}
        {variant === "grid" && this.renderGridVariant()}
        {variant === "timeline" && this.renderGridVariant()}
      </div>
    );
  }
}

export default TechShowcase;

