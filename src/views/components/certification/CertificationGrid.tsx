/**
 * Certification Grid Component
 * Reusable grid layout component for certifications
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 */

import React, { PureComponent, ReactNode } from "react";
import { ICertification } from "../../../models/certification-model";
import { CertificationCard } from "./CertificationCard";

/**
 * Certification Grid Props
 */
interface CertificationGridProps {
  certifications: ICertification[];
  visibleItems: Set<string>;
  onVisibilityChange: (key: string, visible: boolean) => void;
  onLinkClick?: (link: string) => void;
  className?: string;
  columns?: number;
}

/**
 * Certification Grid Component
 * PureComponent for performance optimization
 */
export class CertificationGrid extends PureComponent<CertificationGridProps> {
  /**
   * Get grid class names
   */
  private getClassNames(): string {
    const { className = "", columns } = this.props;
    const classes = ["certification-grid"];

    if (columns) {
      classes.push(`certification-grid-cols-${columns}`);
    }

    if (className) {
      classes.push(className);
    }

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Get grid style
   */
  private getGridStyle(): React.CSSProperties | undefined {
    const { columns } = this.props;
    if (!columns) {
      return undefined;
    }

    return {
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    };
  }

  /**
   * Render certification cards
   */
  private renderCertifications(): ReactNode {
    const {
      certifications,
      visibleItems,
      onVisibilityChange,
      onLinkClick,
    } = this.props;

    if (certifications.length === 0) {
      return null;
    }

    return certifications.map((cert, index) => (
      <CertificationCard
        key={cert.key}
        certification={cert}
        index={index}
        isVisible={visibleItems.has(cert.key)}
        onVisibilityChange={onVisibilityChange}
        onLinkClick={onLinkClick}
      />
    ));
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { certifications } = this.props;

    if (certifications.length === 0) {
      return null;
    }

    return (
      <div
        className={this.getClassNames()}
        style={this.getGridStyle()}
        role="list"
        aria-label="Certifications"
      >
        {this.renderCertifications()}
      </div>
    );
  }
}

