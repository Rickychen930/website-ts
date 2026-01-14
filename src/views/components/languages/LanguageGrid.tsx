/**
 * Language Grid Component
 * Reusable grid layout component for languages with Carousel support
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 * - OOP: Uses reusable Carousel component
 */

import React, { PureComponent, ReactNode } from "react";
import { ILanguage } from "../../../models/language-model";
import { LanguageCard } from "./LanguageCard";
import { Carousel, ICarouselItem } from "../ui/carousel";
import {
  ResponsiveStateManager,
  isMobileOrTablet,
} from "../../../utils/responsive-utils";

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
  layout?: "grid" | "carousel";
}

/**
 * Language Grid Component
 * PureComponent for performance optimization
 * Uses Carousel component for horizontal scrolling on mobile/tablet
 */
export class LanguageGrid extends PureComponent<LanguageGridProps> {
  private responsiveManager = new ResponsiveStateManager();
  private isMobileState: boolean = false;

  static defaultProps: Partial<LanguageGridProps> = {
    layout: "carousel",
  };

  /**
   * Component Did Mount
   * Initialize responsive state
   */
  componentDidMount(): void {
    this.isMobileState = isMobileOrTablet();
    this.responsiveManager.initialize((isMobile) => {
      this.isMobileState = isMobile;
      this.forceUpdate();
    });
  }

  /**
   * Component Will Unmount
   * Cleanup responsive listener
   */
  componentWillUnmount(): void {
    this.responsiveManager.cleanup();
  }

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
   * Convert languages to carousel items
   * Follows DRY principle
   */
  private convertToCarouselItems(): ICarouselItem[] {
    const { languages, visibleItems, onVisibilityChange, getProficiencyClass } =
      this.props;

    return languages.map((lang, index) => {
      const proficiencyClass = getProficiencyClass
        ? getProficiencyClass(lang.proficiency)
        : undefined;

      return {
        key: lang.key,
        content: (
          <LanguageCard
            language={lang}
            index={index}
            isVisible={visibleItems.has(lang.key)}
            onVisibilityChange={onVisibilityChange}
            proficiencyClass={proficiencyClass}
          />
        ),
      };
    });
  }

  /**
   * Render language cards (for grid layout)
   */
  private renderLanguages(): ReactNode {
    const { languages, visibleItems, onVisibilityChange, getProficiencyClass } =
      this.props;

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
   * Render carousel layout
   */
  private renderCarousel(): ReactNode {
    const items = this.convertToCarouselItems();

    if (items.length === 0) {
      return null;
    }

    return (
      <Carousel
        items={items}
        className={this.getClassNames()}
        itemWidth={300}
        gap={24}
        showArrows={true}
        showIndicators={true}
        scrollSnap={true}
        ariaLabel="Languages carousel"
        emptyMessage="No languages available"
        emptyIcon="🌐"
      />
    );
  }

  /**
   * Render grid layout (desktop)
   */
  private renderGrid(): ReactNode {
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

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { languages, layout = "carousel" } = this.props;

    if (languages.length === 0) {
      return null;
    }

    // Use carousel for mobile/tablet, grid for desktop
    if (layout === "carousel" || this.isMobileState) {
      return this.renderCarousel();
    }

    return this.renderGrid();
  }
}
