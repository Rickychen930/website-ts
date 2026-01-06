import React, { Component, ReactNode } from "react";
import { Card, Image } from "../../components/common";
import { ProfileStat, ProfileAction } from "../../components/profile";
import {
  HeroHeader,
  ProfessionalHighlight,
  TechBadgesGrid,
} from "../../components/about-me";
import { AboutMeController } from "../../../controllers/about-me-controller";
import { UserProfile } from "../../../types/user";
import { ButtonVariant } from "../../../types/ui";
import { generateStableKey } from "../../../utils/view-helpers";
import "../../../assets/css/about-me-section.css";

/**
 * AboutMeSection Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
type AboutMeProps = {
  data: UserProfile;
};

/**
 * AboutMeSection State Interface
 */
type AboutMeState = {
  isVisible: boolean;
  aboutMeData: ReturnType<AboutMeController['getAboutMeData']> | null;
  technologies: ReturnType<AboutMeController['getFeaturedTechnologies']>;
  highlights: ReturnType<AboutMeController['getProfessionalHighlights']>;
};

/**
 * AboutMeSection Component
 * 
 * Features:
 * - Professional, Clean, Luxury, Responsive Design
 * - Shows Software Engineering Capabilities Prominently
 * - Component-Based Architecture (Reusable Components)
 * - MVC Pattern (Controller, Model, View separation)
 * - Performance Optimized: Memoized data processing
 * 
 * Principles Applied:
 * - MVC: Separated Controller, Model, and View
 * - OOP: Class-based component with encapsulation
 * - SOLID:
 *   - SRP: Each method has single responsibility
 *   - OCP: Extensible through composition
 *   - LSP: Proper inheritance/implementation
 *   - ISP: Interfaces are segregated
 *   - DIP: Depends on abstractions (controller, components)
 * - DRY: Reuses components and utilities
 * - KISS: Simple, clear structure
 */
class AboutMeSection extends Component<AboutMeProps, AboutMeState> {
  private readonly controller: AboutMeController;

  constructor(props: AboutMeProps) {
    super(props);
    this.state = {
      isVisible: false,
      aboutMeData: null,
      technologies: [],
      highlights: [],
    };
    this.controller = new AboutMeController();
  }

  /**
   * Component lifecycle - Mount
   * Initialize visibility state and process data once
   */
  componentDidMount(): void {
    this.processData();
    this.setState({ isVisible: true });
  }

  /**
   * Component lifecycle - Update
   * Re-process data only when props change
   */
  componentDidUpdate(prevProps: AboutMeProps): void {
    if (prevProps.data !== this.props.data) {
      this.processData();
    }
  }

  /**
   * Process and memoize data from controller
   * Performance optimization: Process data once instead of multiple times
   */
  private processData(): void {
    const { data } = this.props;
    const aboutMeData = this.controller.getAboutMeData(data);
    const technologies = this.controller.getFeaturedTechnologies(data, 12);
    const highlights = this.controller.getProfessionalHighlights(data);

    this.setState({
      aboutMeData,
      technologies,
      highlights,
    });
  }

  /**
   * Render hero header with name and title
   * Follows Single Responsibility Principle (SRP)
   * Performance: Uses memoized data from state
   */
  private renderHeroHeader(): ReactNode {
    const { aboutMeData } = this.state;

    if (!aboutMeData) {
      return null;
    }

    return (
      <HeroHeader
        name={aboutMeData.name}
        title={aboutMeData.title}
        location={aboutMeData.location}
      />
    );
  }

  /**
   * Render profile image with luxury styling
   * Follows Single Responsibility Principle (SRP)
   * Performance: Uses memoized data from state
   */
  private renderProfileImage(): ReactNode {
    const { aboutMeData } = this.state;

    if (!aboutMeData) {
      return null;
    }

    return (
      <div className="about-me-image-container">
        <div className="about-me-image-wrapper">
          <div className="about-me-image-glow" aria-hidden="true"></div>
          <div className="about-me-image-border" aria-hidden="true"></div>
          <div className="about-me-image-particles" aria-hidden="true">
            <span className="particle">⚡</span>
            <span className="particle">💻</span>
            <span className="particle">🚀</span>
            <span className="particle">⚛️</span>
          </div>
          <Image
            src="/assets/images/ricky-profile.jpeg"
            alt={`${aboutMeData.name} profile picture`}
            width={320}
            height={320}
            className="about-me-image"
            style={{ borderRadius: '50%' }}
            loading="eager"
          />
        </div>
      </div>
    );
  }

  /**
   * Render bio/description section
   * Follows Single Responsibility Principle (SRP)
   * Performance: Uses memoized data from state
   */
  private renderBio(): ReactNode {
    const { aboutMeData } = this.state;

    if (!aboutMeData || !aboutMeData.bio) {
      return null;
    }

    return (
      <div className="about-me-bio-section">
        <p className="about-me-bio" aria-label="Biography">
          {aboutMeData.bio}
        </p>
      </div>
    );
  }

  /**
   * Render featured tech badges grid
   * Shows software engineering capabilities prominently
   * Follows Single Responsibility Principle (SRP)
   * Performance: Uses memoized data from state
   * UI Optimization: Reduced to 8 items (preview only, full list in Technical Skills section)
   */
  private renderFeaturedTechStack(): ReactNode {
    const { technologies } = this.state;

    if (!technologies || technologies.length === 0) {
      return null;
    }

    // Show only top 8 technologies as preview
    // Full list available in Technical Skills section
    return (
      <div className="about-me-featured-tech">
        <TechBadgesGrid
          technologies={technologies}
          title="Featured Technologies"
          variant="default"
          maxItems={8}
        />
      </div>
    );
  }

  /**
   * Render professional highlights
   * Shows key achievements and capabilities
   * Follows Single Responsibility Principle (SRP)
   * Performance: Uses memoized data from state
   */
  private renderProfessionalHighlights(): ReactNode {
    const { highlights } = this.state;

    if (!highlights || highlights.length === 0) {
      return null;
    }

    return (
      <div className="about-me-highlights">
        <h3 className="about-me-highlights-title">Key Achievements</h3>
        <div className="about-me-highlights-grid">
          {highlights.map((highlight, index) => (
            <ProfessionalHighlight
              key={generateStableKey("highlight", highlight.title || index, index)}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
              variant={index === 0 ? "primary" : "default"}
            />
          ))}
        </div>
      </div>
    );
  }

  /**
   * Render animated code block showing tech stack
   * REMOVED: Redundant with TechBadgesGrid above and Technical Skills section
   * Full technical skills are displayed in dedicated Technical Skills section
   * This reduces duplication and improves UI efficiency
   */
  // Removed renderTechStackCode() - redundant display

  /**
   * Render call-to-action buttons
   * Follows Single Responsibility Principle (SRP)
   */
  private renderActions(): ReactNode {
    return (
      <div className="about-me-actions" role="group" aria-label="Profile actions">
        <ProfileAction
          label="Download CV"
          href="/assets/document/RICKY_CV_8_AUG.pdf"
          download
          variant={ButtonVariant.PRIMARY}
        />
        <ProfileAction
          label="Hire Me"
          href="#contact"
          variant={ButtonVariant.SECONDARY}
        />
      </div>
    );
  }

  /**
   * Render statistics cards
   * Follows Single Responsibility Principle (SRP)
   * Performance: Uses memoized data from state
   */
  private renderStats(): ReactNode {
    const { aboutMeData } = this.state;
    const { stats } = aboutMeData || { stats: [] };

    if (!stats || stats.length === 0) {
      return null;
    }

    return (
      <div className="about-me-stats" role="group" aria-label="Profile statistics">
        {stats.map((stat, index) => (
          <ProfileStat
            key={generateStableKey("stat", stat.label || index, index)}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    );
  }

  /**
   * Render main content layout
   * Follows Single Responsibility Principle (SRP)
   */
  private renderMainContent(): ReactNode {
    return (
      <div className="about-me-main-content">
        <div className="about-me-hero-background" aria-hidden="true"></div>
        <div className="about-me-hero-section">
          <div className="about-me-hero-left">
            {this.renderHeroHeader()}
            {this.renderBio()}
            {this.renderFeaturedTechStack()}
            {this.renderActions()}
          </div>
          <div className="about-me-hero-right">
            {this.renderProfileImage()}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render additional content (highlights only)
   * Follows Single Responsibility Principle (SRP)
   * UI Optimization: Removed redundant tech stack code block
   */
  private renderAdditionalContent(): ReactNode {
    return (
      <div className="about-me-additional-content">
        {this.renderProfessionalHighlights()}
      </div>
    );
  }

  /**
   * Render main content wrapper
   * Follows Single Responsibility Principle (SRP)
   */
  private renderContent(): ReactNode {
    return (
      <div className={`about-me-content ${this.state.isVisible ? "about-me-visible" : ""}`}>
        {this.renderMainContent()}
        {this.renderAdditionalContent()}
        {this.renderStats()}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { data } = this.props;

    // Edge case: Handle missing or invalid data
    if (!this.controller.shouldDisplay(data)) {
      return null;
    }

    return (
      <Card id="about-me-section" ariaLabel="About Me Section">
        {this.renderContent()}
      </Card>
    );
  }
}

export default AboutMeSection;
