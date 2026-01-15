import React, { Component, ReactNode } from "react";
import { UserProfile } from "../../../types/user";
import { ButtonVariant } from "../../../types/ui";
import { ProfileAction } from "../../components/profile";
import { ActionLabels } from "../../../constants";
import "../../../assets/css/hero-section.css";

/**
 * HeroSection Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface HeroSectionProps {
  profile: UserProfile;
}

/**
 * HeroSection Component
 *
 * Features:
 * - Full viewport height (100vh)
 * - Centered content with strong visual hierarchy
 * - Clean background with gradient
 * - Primary and secondary CTAs
 * - Professional, modern design
 *
 * Principles Applied:
 * - SOLID (SRP, OCP)
 * - DRY (Reusable component)
 * - OOP (Class-based)
 * - KISS (Simple, focused)
 */
class HeroSection extends Component<HeroSectionProps> {
  /**
   * Render name with accent styling
   */
  private renderName(): ReactNode {
    const { profile } = this.props;
    const name = profile?.name;

    if (!name || name.trim() === "") {
      return null;
    }

    return (
      <h1 className="hero-name">
        <span className="hero-greeting">Hi, I'm </span>
        <span className="hero-name-accent">{name}</span>
      </h1>
    );
  }

  /**
   * Render professional title
   */
  private renderTitle(): ReactNode {
    const { profile } = this.props;
    const title = profile?.title;

    if (!title || title.trim() === "") {
      return null;
    }

    return (
      <h2 className="hero-title" aria-label="Professional title">
        {title}
      </h2>
    );
  }

  /**
   * Render value proposition (short 1-2 lines)
   * Extracts concise value proposition from bio
   */
  private renderValueProposition(): ReactNode {
    const { profile } = this.props;
    const bio = profile?.bio;

    if (!bio || bio.trim() === "") {
      return null;
    }

    // Extract first 1-2 sentences for value proposition
    // Split by sentence endings, filter empty strings, take first 2
    const sentences = bio
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s.length < 200); // Filter out very long sentences

    if (sentences.length === 0) {
      return null;
    }

    // Take first 1-2 sentences, ensuring total length is reasonable
    let valueProp = sentences[0];
    if (sentences.length > 1 && valueProp.length < 100) {
      valueProp = `${valueProp}. ${sentences[1]}`;
    }

    // Ensure it's not too long (max 180 characters for readability)
    if (valueProp.length > 180) {
      valueProp = valueProp.substring(0, 177) + "...";
    }

    return (
      <p className="hero-value-prop" aria-label="Value proposition">
        {valueProp}
      </p>
    );
  }

  /**
   * Render call-to-action buttons
   */
  private renderCTAs(): ReactNode {
    return (
      <div
        className="hero-ctas"
        role="group"
        aria-label="Hero call-to-action buttons"
      >
        <ProfileAction
          label={ActionLabels.CONTACT_ME}
          href="#contact"
          variant={ButtonVariant.PRIMARY}
        />
        <ProfileAction
          label={ActionLabels.DOWNLOAD_CV}
          href="/assets/document/RICKY_CV_8_AUG.pdf"
          download
          variant={ButtonVariant.SECONDARY}
          className="hero-cta-secondary"
        />
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { profile } = this.props;

    if (!profile || !profile.name) {
      return null;
    }

    return (
      <section className="hero-section" id="hero" aria-label="Hero section">
        <div className="hero-background" aria-hidden="true"></div>
        <div className="hero-content">
          <div className="hero-text">
            {this.renderName()}
            {this.renderTitle()}
            {this.renderValueProposition()}
            {this.renderCTAs()}
          </div>
        </div>
        <div className="hero-scroll-indicator" aria-hidden="true">
          <span className="hero-scroll-arrow">↓</span>
        </div>
      </section>
    );
  }
}

export default HeroSection;
