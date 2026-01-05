import React, { Component, ReactNode } from "react";
import Card from "../../components/card-component";
import Image from "../../components/image-component";
import ProfileStat from "../../components/profile-stat-component";
import ProfileAction from "../../components/profile-action-component";
import {
  HeroHeader,
  ProfessionalHighlight,
  AnimatedCodeBlock,
  TechBadgesGrid,
} from "../../components/about-me";
import { AboutMeController } from "../../../controllers/about-me-controller";
import { UserProfile } from "../../../types/user";
import { ButtonVariant } from "../../../types/ui";
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
};

/**
 * AboutMeSection Component
 * 
 * Features:
 * - Professional, Clean, Luxury, Responsive Design
 * - Shows Software Engineering Capabilities Prominently
 * - Component-Based Architecture (Reusable Components)
 * - MVC Pattern (Controller, Model, View separation)
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
    };
    this.controller = new AboutMeController();
  }

  /**
   * Component lifecycle - Mount
   * Initialize visibility state
   */
  componentDidMount(): void {
    this.setState({ isVisible: true });
  }

  /**
   * Render hero header with name and title
   * Follows Single Responsibility Principle (SRP)
   */
  private renderHeroHeader(): ReactNode {
    const aboutMeData = this.controller.getAboutMeData(this.props.data);

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
   */
  private renderProfileImage(): ReactNode {
    const aboutMeData = this.controller.getAboutMeData(this.props.data);

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
          />
        </div>
      </div>
    );
  }

  /**
   * Render bio/description section
   * Follows Single Responsibility Principle (SRP)
   */
  private renderBio(): ReactNode {
    const aboutMeData = this.controller.getAboutMeData(this.props.data);

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
   */
  private renderFeaturedTechStack(): ReactNode {
    const technologies = this.controller.getFeaturedTechnologies(this.props.data, 12);

    if (!technologies || technologies.length === 0) {
      return null;
    }

    return (
      <div className="about-me-featured-tech">
        <TechBadgesGrid
          technologies={technologies}
          title="Tech Stack"
          variant="default"
          maxItems={12}
        />
      </div>
    );
  }

  /**
   * Render professional highlights
   * Shows key achievements and capabilities
   * Follows Single Responsibility Principle (SRP)
   */
  private renderProfessionalHighlights(): ReactNode {
    const highlights = this.controller.getProfessionalHighlights(this.props.data);

    if (!highlights || highlights.length === 0) {
      return null;
    }

    return (
      <div className="about-me-highlights">
        <h3 className="about-me-highlights-title">Key Achievements</h3>
        <div className="about-me-highlights-grid">
          {highlights.map((highlight, index) => (
            <ProfessionalHighlight
              key={`highlight-${index}`}
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
   * Demonstrates software engineering capabilities
   * Follows Single Responsibility Principle (SRP)
   */
  private renderTechStackCode(): ReactNode {
    const technologies = this.controller.getFeaturedTechnologies(this.props.data, 8);

    if (!technologies || technologies.length === 0) {
      return null;
    }

    return (
      <div className="about-me-tech-stack-code">
        <h3 className="about-me-tech-stack-title">Code & Technologies</h3>
        <AnimatedCodeBlock technologies={technologies} language="typescript" />
      </div>
    );
  }

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
   */
  private renderStats(): ReactNode {
    const aboutMeData = this.controller.getAboutMeData(this.props.data);
    const { stats } = aboutMeData || { stats: [] };

    if (!stats || stats.length === 0) {
      return null;
    }

    return (
      <div className="about-me-stats" role="group" aria-label="Profile statistics">
        {stats.map((stat, index) => (
          <ProfileStat
            key={`stat-${index}`}
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
   * Render additional content (highlights, tech stack)
   * Follows Single Responsibility Principle (SRP)
   */
  private renderAdditionalContent(): ReactNode {
    return (
      <div className="about-me-additional-content">
        {this.renderProfessionalHighlights()}
        {this.renderTechStackCode()}
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
