/**
 * SkillsSection - View Component (MVC Pattern)
 * Displays Skills section combining Technical & Soft Skills
 * 
 * Principles:
 * - MVC: View layer
 * - SRP: Single responsibility for rendering Skills section
 * - DRY: Reuses controller and model logic
 */

import React from 'react';
import { UserProfile } from '../../types/user';
import { TechnicalSkillsController } from '../../controllers/technical-skills-controller';
import { SoftSkillsController } from '../../controllers/soft-skills-controller';
import { ITechnicalSkillsData } from '../../models/technical-skills-model';
import { SoftSkillItem } from '../../models/soft-skills-model';
import { SectionIds, SectionNames } from '../../constants/strings';
import { IntersectionObserver } from '../core/IntersectionObserver';
import { EmptyState } from '../core/EmptyState';

export interface ISkillsSectionProps {
  profile: UserProfile;
  technicalSkillsController: TechnicalSkillsController;
  softSkillsController: SoftSkillsController;
}

/**
 * SkillsSection Component
 * Renders both Technical Skills and Soft Skills
 */
export class SkillsSection extends React.Component<ISkillsSectionProps> {
  private technicalSkillsController: TechnicalSkillsController;
  private softSkillsController: SoftSkillsController;

  constructor(props: ISkillsSectionProps) {
    super(props);
    this.technicalSkillsController = props.technicalSkillsController || new TechnicalSkillsController();
    this.softSkillsController = props.softSkillsController || new SoftSkillsController();
  }

  render(): React.ReactNode {
    const { profile } = this.props;
    
    const technicalSkills = this.technicalSkillsController.getTechnicalSkillsData(profile);
    const softSkills = this.softSkillsController.getSoftSkillsData(profile);

    const hasAnySkills = (technicalSkills !== null) || (softSkills !== null);

    if (!hasAnySkills) {
      return (
        <section id={SectionIds.SKILLS} className="section section--skills">
          <div className="section__container">
            <IntersectionObserver animation="fadeIn" once>
              <h2 className="section__title">{SectionNames.SKILLS}</h2>
            </IntersectionObserver>
            <EmptyState
              icon="💼"
              title="No Skills Available"
              message="Skills will be displayed here when available."
            />
          </div>
        </section>
      );
    }

    return (
      <section id={SectionIds.SKILLS} className="section section--skills">
        <div className="section__container">
          <IntersectionObserver animation="fadeIn" once>
            <h2 className="section__title">{SectionNames.SKILLS}</h2>
          </IntersectionObserver>
          <div className="skills__content">
            {technicalSkills && this.renderTechnicalSkills(technicalSkills, profile)}
            {softSkills && this.renderSoftSkills(softSkills)}
          </div>
        </div>
      </section>
    );
  }

  private renderTechnicalSkills(data: ITechnicalSkillsData, profile: UserProfile): React.ReactNode {
    const enrichedCategories = this.technicalSkillsController.getEnrichedCategories(profile);
    
    if (!enrichedCategories || enrichedCategories.length === 0) {
      return null;
    }

    return (
      <IntersectionObserver animation="fadeIn" delay={100} once>
        <div className="skills__technical">
          <h3 className="skills__subtitle">{SectionNames.TECHNICAL_SKILLS}</h3>
          <div className="technical-skills__categories">
            {enrichedCategories.map((category, categoryIndex) => (
              <IntersectionObserver 
                key={category.category} 
                animation="scale" 
                delay={categoryIndex * 100} 
                once
              >
                <div className="skill-category">
                  <h4 className="skill-category__title">
                    <span className="skill-category__icon">{category.categoryIcon}</span>
                    {category.category}
                  </h4>
                  <div className="skill-category__items">
                    {category.items.map((item, itemIndex) => (
                      <span key={itemIndex} className="skill-item">
                        <span className="skill-item__icon">{item.icon}</span>
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </IntersectionObserver>
            ))}
          </div>
        </div>
      </IntersectionObserver>
    );
  }

  private renderSoftSkills(softSkills: SoftSkillItem[]): React.ReactNode {
    if (!softSkills || softSkills.length === 0) {
      return null;
    }

    return (
      <IntersectionObserver animation="fadeIn" delay={200} once>
        <div className="skills__soft">
          <h3 className="skills__subtitle">{SectionNames.SOFT_SKILLS}</h3>
          <div className="soft-skills__grid">
            {softSkills.map((skill, index) => (
              <IntersectionObserver 
                key={skill.key} 
                animation="slideUp" 
                delay={index * 100} 
                once
              >
                <div className="soft-skill-card">
                  <div className="soft-skill-card__header">
                    <span className="soft-skill-card__icon">{skill.icon}</span>
                    <h4 className="soft-skill-card__title">{skill.name}</h4>
                  </div>
                  {skill.description && (
                    <p className="soft-skill-card__description">{skill.description}</p>
                  )}
                </div>
              </IntersectionObserver>
            ))}
          </div>
        </div>
      </IntersectionObserver>
    );
  }
}
