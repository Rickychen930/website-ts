import React, { Component, ReactNode } from "react";
import Card from "../../components/card-component";
import Image from "../../components/image-component";
import ProfileStat from "../../components/profile-stat-component";
import ProfileAction from "../../components/profile-action-component";
import "../../../assets/css/about-me-section.css";
import { ButtonVariant } from "../../../types/ui";

/**
 * About Me Data Interface
 * Follows Interface Segregation Principle (ISP)
 */
type AboutMeData = {
  name: string;
  title: string;
  location: string;
  bio: string;
  stats: { value: string; label: string }[];
};

type AboutMeProps = {
  data: AboutMeData;
};

/**
 * AboutMeSection Component
 * Follows Single Responsibility Principle (SRP) - Only handles About Me display
 * Follows Open/Closed Principle (OCP) - Extensible through props
 * Follows Dependency Inversion Principle (DIP) - Depends on abstractions (props)
 */
class AboutMeSection extends Component<AboutMeProps> {
  /**
   * Render name header with elegant typography
   */
  private renderHeader(): ReactNode {
    const { name } = this.props.data;
    
    if (!name || name.trim() === "") {
      return null;
    }

    return (
      <header className="about-me-header">
        <h1 className="about-me-name">
          I'm <span className="about-me-name-accent">{name}</span>
        </h1>
      </header>
    );
  }

  /**
   * Render professional information section
   */
  private renderInformation(): ReactNode {
    const { title, location, bio } = this.props.data;
    
    return (
      <div className="about-me-information">
        {title && (
          <h2 className="about-me-title" aria-label="Professional title">
            {title}
          </h2>
        )}
        {location && (
          <div className="about-me-location" aria-label="Location">
            <span className="about-me-location-icon" aria-hidden="true">📍</span>
            <span className="about-me-location-text">{location}</span>
          </div>
        )}
        {bio && (
          <p className="about-me-bio" aria-label="Biography">
            {bio}
          </p>
        )}
      </div>
    );
  }

  /**
   * Render call-to-action buttons
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
   */
  private renderStats(): ReactNode {
    const { stats } = this.props.data;
    
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
   * Render profile image with elegant styling
   */
  private renderImage(): ReactNode {
    const { name } = this.props.data;
    
    if (!name) {
      return null;
    }

    return (
      <div className="about-me-image-container">
        <div className="about-me-image-wrapper">
          <div className="about-me-image-glow" aria-hidden="true"></div>
          <Image
            src="/assets/images/ricky-profile.jpeg"
            alt={`${name} profile picture`}
            width={280}
            height={280}
            className="about-me-image"
            style={{ borderRadius: '50%' }}
          />
        </div>
      </div>
    );
  }

  /**
   * Render main content wrapper
   */
  private renderContent(): ReactNode {
    return (
      <div className="about-me-content">
        <div className="about-me-main">
          {this.renderImage()}
          <div className="about-me-text-content">
            {this.renderHeader()}
            {this.renderInformation()}
            {this.renderActions()}
          </div>
        </div>
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
    if (!data || !data.name) {
      return null;
    }

    return (
      <Card id="about-me-section">
        {this.renderContent()}
      </Card>
    );
  }
}

export default AboutMeSection;
