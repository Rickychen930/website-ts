/**
 * MainPageFooterComponent - Professional Footer Component
 * View Layer (MVC Pattern)
 *
 * Architecture:
 * - MVC: Strict separation of View, Controller, and Model
 * - View: Only handles UI rendering and user interactions
 * - Controller: Handles all business logic (injected via DI)
 * - Model: Handles data structure and validation
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): View only renders UI
 * - Dependency Inversion Principle (DIP): Depends on Controller abstraction
 * - Open/Closed Principle (OCP): Extensible via composition
 * - DRY: Uses reusable components and centralized logic
 * - KISS: Simple, clear structure
 * - Component-Based: Composed of smaller, focused components
 * - OOP: Class-based component with proper encapsulation
 *
 * Features:
 * - Professional, luxury, beautiful design
 * - Fully responsive on all devices
 * - Shows software engineering capabilities
 * - Reusable component-based architecture
 */

import React, { PureComponent, ReactNode } from "react";
import { FooterController } from "../../../controllers/footer-controller";
import {
  IFooterData,
  IFooterLink,
  IFooterSocialLink,
} from "../../../models/footer-model";
import { UserProfile } from "../../../types/user";
import { FooterQuickLinks, FooterSocialLinks, FooterCopyright } from "./index";
import PrintButton from "../../../components/navigation/print-button";
import "../../../assets/css/footer-section.css";

/**
 * MainPageFooterComponent Props
 * Follows Interface Segregation Principle (ISP)
 */
interface MainPageFooterComponentProps {
  profile?: UserProfile | null;
  className?: string;
}

/**
 * MainPageFooterComponent State
 */
interface MainPageFooterComponentState {
  footerData: IFooterData | null;
  isLoading: boolean;
}

/**
 * MainPageFooterComponent - Professional Footer Component
 * Follows Single Responsibility Principle (SRP) - Only handles footer display
 * Follows OOP principles - PureComponent for performance
 * Follows DRY principle - Reusable footer logic
 * Follows Open/Closed Principle (OCP) - Extensible via props
 */
export class MainPageFooterComponent extends PureComponent<
  MainPageFooterComponentProps,
  MainPageFooterComponentState
> {
  private readonly controller: FooterController;

  constructor(props: MainPageFooterComponentProps) {
    super(props);
    this.controller = new FooterController();
    this.state = {
      footerData: null,
      isLoading: true,
    };
  }

  /**
   * Component lifecycle - Mount
   */
  componentDidMount(): void {
    this.loadFooterData();
  }

  /**
   * Component lifecycle - Update
   */
  componentDidUpdate(prevProps: MainPageFooterComponentProps): void {
    if (prevProps.profile !== this.props.profile) {
      this.loadFooterData();
    }
  }

  /**
   * Load footer data from profile
   * Delegates to controller (MVC pattern)
   */
  private loadFooterData(): void {
    const { profile } = this.props;

    if (!profile) {
      this.setState({ footerData: null, isLoading: false });
      return;
    }

    const footerData = this.controller.getFooterData(profile);
    this.setState({ footerData, isLoading: false });
  }

  /**
   * Handle quick link click
   */
  private handleQuickLinkClick = (link: IFooterLink): void => {
    this.controller.handleLinkClick(link);
  };

  /**
   * Handle social link click
   */
  private handleSocialLinkClick = (link: IFooterSocialLink): void => {
    this.controller.handleLinkClick(link);
  };

  /**
   * Render footer top section (Quick Links, Social Links)
   */
  private renderFooterTop(): ReactNode {
    const { footerData } = this.state;

    if (!footerData) {
      return null;
    }

    const quickLinks = this.controller.getQuickLinks(footerData);
    const socialLinks = this.controller.getSocialLinks(footerData);

    return (
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-grid">
            {quickLinks.length > 0 && (
              <FooterQuickLinks
                links={quickLinks}
                onLinkClick={this.handleQuickLinkClick}
              />
            )}
            {socialLinks.length > 0 && (
              <FooterSocialLinks
                links={socialLinks}
                onLinkClick={this.handleSocialLinkClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render footer bottom section (Copyright)
   */
  private renderFooterBottom(): ReactNode {
    const { footerData } = this.state;

    if (!footerData) {
      return null;
    }

    return (
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <FooterCopyright
              copyright={footerData.copyright}
              author={footerData.author}
            />
            <div className="footer-actions">
              <PrintButton showLabel={false} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render decorative elements (simplified)
   */
  private renderDecorations(): ReactNode {
    return (
      <div
        className="footer-decoration footer-decoration-top"
        aria-hidden="true"
      ></div>
    );
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { className, profile } = this.props;
    const { isLoading, footerData } = this.state;

    // Don't render if no profile or no footer data
    if (!profile || (!isLoading && !footerData)) {
      return null;
    }

    const containerClass = `footer ${className || ""}`.trim();

    return (
      <footer className={containerClass} role="contentinfo">
        {this.renderDecorations()}
        {this.renderFooterTop()}
        {this.renderFooterBottom()}
      </footer>
    );
  }
}

export default MainPageFooterComponent;
