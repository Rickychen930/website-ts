/**
 * Language Grid Component
 * Reusable grid layout component for languages
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 */

import React, { PureComponent, ReactNode } from "react";
import { ILanguage } from "../../../models/language-model";
import { LanguageCard } from "./LanguageCard";

/**
 * Language Grid Props
 */
interface LanguageGridProps {
  languages: ILanguage[];
  visibleItems: Set<string>;
  onVisibilityChange: (key: string, visible: boolean) => void;
  getProficiencyClass?: (proficiency: string) => string;
  className?: string;
  columns?: number;
}

/**
 * Language Grid Component
 * PureComponent for performance optimization
 */
export class LanguageGrid extends PureComponent<LanguageGridProps> {
  /**
   * Get grid class names
   */
  private getClassNames(): string {
    const { className = "", columns } = this.props;
    const classes = ["language-grid"];

    if (columns) {
      classes.push(`language-grid-cols-${columns}`);
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
   * Render language cards
   */
  private renderLanguages(): ReactNode {
    const {
      languages,
      visibleItems,
      onVisibilityChange,
      getProficiencyClass,
    } = this.props;

    if (languages.length === 0) {
      return null;
    }

    return languages.map((lang, index) => {
      const proficiencyClass = getProficiencyClass
        ? getProficiencyClass(lang.proficiency)
        : undefined;

      return (
        <LanguageCard
          key={lang.key}
          language={lang}
          index={index}
          isVisible={visibleItems.has(lang.key)}
          onVisibilityChange={onVisibilityChange}
          proficiencyClass={proficiencyClass}
        />
      );
    });
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { languages } = this.props;

    if (languages.length === 0) {
      return null;
    }

    return (
      <div
        className={this.getClassNames()}
        style={this.getGridStyle()}
        role="list"
        aria-label="Languages"
      >
        {this.renderLanguages()}
      </div>
    );
  }
}

