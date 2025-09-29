import React, { Component, ReactNode } from "react";
import Card from "../../components/card-component";
import Image from "../../components/image-component";
import ProfileStat from "../../components/profile-stat-component";
import ProfileAction from "../../components/profile-action-component";
import "../../../assets/css/about-me-section.css";
import { ButtonVariant } from "../../../types/ui";

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

class AboutMeSection extends Component<AboutMeProps> {
  // 🔹 Render helper methods
  private renderHeader(): ReactNode {
    const { name } = this.props.data;
    return (
      <h1 className="about-me-name">
        I’m <span>{name}</span>
      </h1>
    );
  }

  private renderInformation(): ReactNode {
    const { title, location, bio } = this.props.data;
    return (
      <div className="about-me-information-section">
        <h2 className="about-me-title">{title}</h2>
        <p className="about-me-location">📍 {location}</p>
        <p className="about-me-bio">{bio}</p>
      </div>
    );
  }

  private renderActions(): ReactNode {
    return (
      <div className="about-me-actions">
        <ProfileAction
          label="Download CV"
          href="/assets/document/RICKY_CV_8_AUG.pdf"
          download
        />
        <ProfileAction
          label="Hire Me"
          href="#contact-section"
          variant={ButtonVariant.SECONDARY}
        />
      </div>
    );
  }

  private renderStats(): ReactNode {
    const { stats } = this.props.data;
    return (
      <div className="about-me-stats">
        {stats.map((stat, index) => (
          <ProfileStat key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    );
  }

  private renderImage(): ReactNode {
    const { name } = this.props.data;
    return (
      <div className="about-me-image">
        <Image
          src="/assets/images/ricky-profile.jpeg"
          alt={name}
          width={260}
          height={260}
          rounded
        />
      </div>
    );
  }

  // 🔹 Main render
  public render(): ReactNode {
    return (
      <Card id="about-me-section">
        <div className="about-me-hero">
          {/* {this.renderImage()} */}
          <div className="about-me-text">
            {this.renderHeader()}
            {this.renderInformation()}
            {this.renderActions()}
            {this.renderStats()}
          </div>
        </div>
      </Card>
    );
  }
}

export default AboutMeSection;
