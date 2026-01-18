/**
 * WorkExperienceSection - View Component (MVC Pattern)
 * Displays Work Experience section
 */

import React from 'react';
import { UserProfile } from '../../types/user';
import { WorkExperienceController } from '../../controllers/work-experience-controller';
import { SectionIds, SectionNames } from '../../constants/strings';
import { IntersectionObserver } from '../core/IntersectionObserver';
import { EmptyState } from '../core/EmptyState';

export interface IWorkExperienceSectionProps {
  profile: UserProfile;
  controller: WorkExperienceController;
}

/**
 * WorkExperienceSection Component
 */
export class WorkExperienceSection extends React.Component<IWorkExperienceSectionProps> {
  private controller: WorkExperienceController;

  constructor(props: IWorkExperienceSectionProps) {
    super(props);
    this.controller = props.controller || new WorkExperienceController();
  }

  render(): React.ReactNode {
    const { profile } = this.props;
    
    if (!this.controller.shouldDisplay(profile)) {
      return null;
    }

    const items = this.controller.getSortedWorkExperienceItems(profile);
    if (items.length === 0) {
      return (
        <section id={SectionIds.EXPERIENCE} className="section section--work-experience">
          <div className="section__container">
            <IntersectionObserver animation="fadeIn" once>
              <h2 className="section__title">{SectionNames.WORK_EXPERIENCE}</h2>
            </IntersectionObserver>
            <EmptyState
              icon="💼"
              title="No Work Experience Available"
              message="Work experience information will be displayed here when available."
            />
          </div>
        </section>
      );
    }

    return (
      <section id={SectionIds.EXPERIENCE} className="section section--work-experience">
        <div className="section__container">
          <IntersectionObserver animation="fadeIn" once>
            <h2 className="section__title">{SectionNames.WORK_EXPERIENCE}</h2>
          </IntersectionObserver>
          <div className="work-experience__content">
            <div className="work-experience__timeline">
              {items.map((item, index) => (
                <IntersectionObserver key={item.key} animation="slideUp" delay={index * 100} once>
                  <div className="experience-item">
                    <div className="experience-item__icon">{item.icon || '💼'}</div>
                    <div className="experience-item__content">
                      <h3 className="experience-item__title">{item.title}</h3>
                      <p className="experience-item__company">{item.company}</p>
                      <p className="experience-item__period">{item.period}</p>
                      {item.description && (
                        <p className="experience-item__description">{item.description}</p>
                      )}
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="experience-item__technologies">
                          {item.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </IntersectionObserver>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
