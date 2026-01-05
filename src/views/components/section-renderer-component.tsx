import React, { PureComponent, ReactNode } from "react";
import { ISectionConfig } from "../../models/section-model";
import { UserProfile } from "../../types/user";
import "../../assets/css/main-page.css";

/**
 * SectionRendererComponent Props
 * Follows Interface Segregation Principle (ISP)
 */
interface SectionRendererComponentProps {
  config: ISectionConfig;
  profile: UserProfile;
  onSectionRef?: (id: string, element: HTMLElement | null) => void;
}

/**
 * SectionRendererComponent - Reusable Section Renderer Component
 * Follows Single Responsibility Principle (SRP) - Only handles section rendering
 * Follows OOP principles - PureComponent for performance
 * Follows DRY principle - Reusable section rendering logic
 * Follows Open/Closed Principle (OCP) - Extensible via props
 */
export class SectionRendererComponent extends PureComponent<SectionRendererComponentProps> {

  /**
   * Get section data from profile
   */
  private getSectionData(): unknown {
    const { config, profile } = this.props;
    const { dataKey } = config;

    const data = profile[dataKey];
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null;
    }

    return dataKey === "name" ? profile : data;
  }

  /**
   * Render section header
   */
  private renderHeader(): ReactNode {
    const { config } = this.props;
    const { id, title } = config;

    if (!title) return null;

    return (
      <header className="section-header">
        <h2 className="section-title" id={`${id}-title`}>
          {title}
        </h2>
        <div className="section-title-underline" aria-hidden="true"></div>
      </header>
    );
  }

  /**
   * Render section content
   */
  private renderContent(): ReactNode {
    const { config } = this.props;
    const { component: SectionComponent, id } = config;
    const sectionData = this.getSectionData();

    if (!SectionComponent || !sectionData) return null;

    try {
      return (
        <div className="section-content" role="region" aria-labelledby={`${id}-title`}>
          <SectionComponent data={sectionData} />
        </div>
      );
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error rendering section ${id}:`, error);
      }
      return null;
    }
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { config } = this.props;
    const { id, title } = config;
    const sectionData = this.getSectionData();

    if (!sectionData) return null;

    return (
      <section
        id={id}
        className="section-block"
        aria-label={title || "Content section"}
      >
        {this.renderHeader()}
        {this.renderContent()}
      </section>
    );
  }
}

export default SectionRendererComponent;

