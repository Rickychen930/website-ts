/**
 * AboutMeSection - View Component (MVC Pattern)
 * Displays About Me section
 * 
 * Principles:
 * - MVC: View layer
 * - SRP: Single responsibility for rendering About Me section
 * - DRY: Reuses controller and model logic
 */

import React from 'react';
import { UserProfile } from '../../types/user';
import { AboutMeController } from '../../controllers/about-me-controller';
import { IAboutMeData } from '../../models/about-me-model';
import { SectionIds, SectionNames, SectionHrefs, ActionLabels } from '../../constants/strings';
import { IntersectionObserver } from '../core/IntersectionObserver';
import { TypingEffect, ParticleBackground, GlowingText, AnimatedSection } from '../core';
import { trackCTAClick, trackResumeDownload } from '../../utils/analytics';
import { scrollToElement } from '../../utils/common-utils';

export interface IAboutMeSectionProps {
  profile: UserProfile;
  controller: AboutMeController;
}

/**
 * AboutMeSection Component
 * Renders About Me section with hero header and stats
 */
export class AboutMeSection extends React.Component<IAboutMeSectionProps> {
  private controller: AboutMeController;

  constructor(props: IAboutMeSectionProps) {
    super(props);
    this.controller = props.controller || new AboutMeController();
  }

  render(): React.ReactNode {
    const { profile } = this.props;
    
    if (!this.controller.shouldDisplay(profile)) {
      return null;
    }

    const data = this.controller.getAboutMeData(profile);
    if (!data) {
      return null;
    }

    return (
      <section id={SectionIds.ABOUT} className="section section--about-me">
        <ParticleBackground particleCount={30} size={2} className="about-me__particles" />
        <div className="section__container">
          <IntersectionObserver animation="fadeIn" once>
            <h2 className="section__title">
              <GlowingText intensity="medium">{SectionNames.ABOUT}</GlowingText>
            </h2>
          </IntersectionObserver>
          <div className="about-me__content">
            <AnimatedSection animation="slideUp" delay={0.1} className="about-me__hero-wrapper">
              <div className="about-me__hero">
                <h1 className="about-me__name">
                  <GlowingText intensity="high">{data.name}</GlowingText>
                </h1>
                <p className="about-me__title">
                  <TypingEffect 
                    text={[data.title, data.title]} 
                    speed={80} 
                    delay={1500}
                    loop={true}
                  />
                </p>
                <p className="about-me__location">📍 {data.location}</p>
                <p className="about-me__bio">{data.bio}</p>
                <div className="about-me__cta-buttons">
                  <a
                    href={SectionHrefs.CONTACT}
                    className="btn btn--primary btn--large btn--glow"
                    onClick={(e) => {
                      e.preventDefault();
                      trackCTAClick("contact", "hero");
                      scrollToElement(SectionIds.CONTACT);
                    }}
                  >
                    {ActionLabels.CONTACT_ME}
                  </a>
                  <a
                    href={SectionHrefs.CONTACT}
                    className="btn btn--secondary btn--large btn--glow"
                    onClick={(e) => {
                      e.preventDefault();
                      trackCTAClick("hire-me", "hero");
                      scrollToElement(SectionIds.CONTACT);
                    }}
                  >
                    {ActionLabels.HIRE_ME}
                  </a>
                  <a
                    href="/assets/document/RICKY_CV_8_AUG.pdf"
                    className="btn btn--outline btn--large btn--glow"
                    download
                    onClick={() => {
                      trackResumeDownload();
                      trackCTAClick("resume", "hero");
                    }}
                  >
                    📄 {ActionLabels.DOWNLOAD_CV}
                  </a>
                </div>
              </div>
            </AnimatedSection>
            
            {data.stats && data.stats.length > 0 && (
              <AnimatedSection animation="scale" delay={0.2}>
                <div className="about-me__stats">
                  {data.stats.map((stat, index) => (
                    <AnimatedSection key={index} animation="scale" delay={index * 0.1} className="stat-item-wrapper">
                      <div className="stat-item">
                        <div className="stat-item__value">
                          <GlowingText intensity="low">{stat.value}</GlowingText>
                        </div>
                        <div className="stat-item__label">{stat.label}</div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection animation="fadeIn" delay={0.3}>
              {this.renderTechnologies(data, profile)}
            </AnimatedSection>
          </div>
        </div>
      </section>
    );
  }

  private renderTechnologies(data: IAboutMeData, profile: UserProfile): React.ReactNode {
    const technologies = this.controller.getFeaturedTechnologies(profile, 8);
    if (technologies.length === 0) {
      return null;
    }

    return (
      <div className="about-me__technologies">
        <h3 className="technologies__title">Technologies</h3>
        <div className="technologies__grid">
          {technologies.map((tech, index) => (
            <AnimatedSection key={index} animation="scale" delay={index * 0.05}>
              <span className="tech-badge tech-badge--glow">
                {tech}
              </span>
            </AnimatedSection>
          ))}
        </div>
      </div>
    );
  }
}
