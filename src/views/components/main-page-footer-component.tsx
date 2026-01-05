import React, { PureComponent, ReactNode } from "react";
import "../../assets/css/main-page.css";

/**
 * MainPageFooterComponent Props
 * Follows Interface Segregation Principle (ISP)
 */
interface MainPageFooterComponentProps {
  copyrightText?: string;
  className?: string;
}

/**
 * MainPageFooterComponent - Reusable Footer Component
 * Follows Single Responsibility Principle (SRP) - Only handles footer display
 * Follows OOP principles - PureComponent for performance
 * Follows DRY principle - Reusable footer logic
 * Follows Open/Closed Principle (OCP) - Extensible via props
 */
export class MainPageFooterComponent extends PureComponent<MainPageFooterComponentProps> {
  static defaultProps: Partial<MainPageFooterComponentProps> = {
    copyrightText: "Ricky Inc. All rights reserved.",
    className: "",
  };

  /**
   * Get current year
   */
  private getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Render footer text
   */
  private renderFooterText(): ReactNode {
    const { copyrightText } = this.props;
    const year = this.getCurrentYear();

    return (
      <p className="footer-text">
        © {year} {copyrightText}
      </p>
    );
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { className } = this.props;
    const containerClass = `footer ${className || ""}`.trim();

    return (
      <footer className={containerClass} role="contentinfo">
        <div className="footer-content">
          {this.renderFooterText()}
        </div>
      </footer>
    );
  }
}

export default MainPageFooterComponent;

