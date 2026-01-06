/**
 * Table of Contents Component
 * Section navigation sidebar untuk easy navigation
 */

import React, { Component, ReactNode } from "react";
import { ISectionConfig } from "../../models/section-model";
import "../../assets/css/table-of-contents.css";

interface TableOfContentsProps {
  sections: ISectionConfig[];
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

interface TableOfContentsState {
  isVisible: boolean;
  activeSection: string;
  sections: ISectionConfig[];
}

export class TableOfContents extends Component<TableOfContentsProps, TableOfContentsState> {
  private observer: IntersectionObserver | null = null;
  private sectionRefs = new Map<string, HTMLElement>();

  constructor(props: TableOfContentsProps) {
    super(props);
    this.state = {
      isVisible: false,
      activeSection: props.activeSection || "",
      sections: props.sections,
    };
  }

  componentDidMount(): void {
    this.setupObserver();
    this.updateActiveSection();
  }

  componentDidUpdate(prevProps: TableOfContentsProps): void {
    if (prevProps.sections !== this.props.sections) {
      this.setState({ sections: this.props.sections });
      this.setupObserver();
    }
  }

  componentWillUnmount(): void {
    this.cleanup();
  }

  private setupObserver = (): void => {
    this.cleanup();

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    this.observer = new IntersectionObserver(this.handleIntersection, options);

    // Observe all sections
    this.state.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        this.sectionRefs.set(section.id, element);
        this.observer?.observe(element);
      }
    });
  };

  private handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        this.setState({ activeSection: sectionId });
      }
    });
  };

  private updateActiveSection = (): void => {
    // Update active section based on scroll position
    const scrollPosition = window.scrollY + 200;

    for (const section of this.state.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.setState({ activeSection: section.id });
          break;
        }
      }
    }
  };

  private handleSectionClick = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (this.props.onSectionClick) {
        this.props.onSectionClick(sectionId);
      }
    }
  };

  private toggleVisibility = (): void => {
    this.setState((prev) => ({ isVisible: !prev.isVisible }));
  };

  private cleanup = (): void => {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  };

  render(): ReactNode {
    const { isVisible, activeSection, sections } = this.state;

    if (sections.length === 0) {
      return null;
    }

    return (
      <div className={`table-of-contents ${isVisible ? "visible" : ""}`}>
        <button
          className="toc-toggle"
          onClick={this.toggleVisibility}
          aria-label="Toggle table of contents"
          aria-expanded={isVisible}
        >
          <span className="toc-toggle-icon" aria-hidden="true">
            {isVisible ? "×" : "☰"}
          </span>
        </button>

        <nav className="toc-nav" aria-label="Table of contents">
          <div className="toc-header">
            <h3 className="toc-title">Contents</h3>
          </div>
          <ul className="toc-list">
            {sections.map((section) => (
              <li key={section.id} className="toc-item">
                <button
                  className={`toc-link ${activeSection === section.id ? "active" : ""}`}
                  onClick={() => this.handleSectionClick(section.id)}
                  aria-current={activeSection === section.id ? "true" : undefined}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default TableOfContents;

