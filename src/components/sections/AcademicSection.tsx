/**
 * AcademicSection - View Component (MVC Pattern)
 * Displays Academic section
 * 
 * Principles:
 * - MVC: View layer
 * - SRP: Single responsibility for rendering Academic section
 */

import React from 'react';
import { UserProfile } from '../../types/user';
import { AcademicController } from '../../controllers/academic-controller';
import { SectionIds, SectionNames } from '../../constants/strings';
import { IntersectionObserver } from '../core/IntersectionObserver';
import { EmptyState } from '../core/EmptyState';

export interface IAcademicSectionProps {
  profile: UserProfile;
  controller: AcademicController;
}

/**
 * AcademicSection Component
 */
export class AcademicSection extends React.Component<IAcademicSectionProps> {
  private controller: AcademicController;

  constructor(props: IAcademicSectionProps) {
    super(props);
    this.controller = props.controller || new AcademicController();
  }

  render(): React.ReactNode {
    const { profile } = this.props;
    
    if (!this.controller.shouldDisplay(profile)) {
      return null;
    }

    const items = this.controller.getSortedAcademicItems(profile);
    if (items.length === 0) {
      return (
        <section id={SectionIds.ACADEMIC} className="section section--academic">
          <div className="section__container">
            <IntersectionObserver animation="fadeIn" once>
              <h2 className="section__title">{SectionNames.ACADEMIC}</h2>
            </IntersectionObserver>
            <EmptyState
              icon="🎓"
              title="No Academic Information Available"
              message="Academic information will be displayed here when available."
            />
          </div>
        </section>
      );
    }

    return (
      <section id={SectionIds.ACADEMIC} className="section section--academic">
        <div className="section__container">
          <IntersectionObserver animation="fadeIn" once>
            <h2 className="section__title">{SectionNames.ACADEMIC}</h2>
          </IntersectionObserver>
          <div className="academic__content">
            <div className="academic__timeline">
              {items.map((item, index) => (
                <IntersectionObserver key={item.key} animation="slideUp" delay={index * 100} once>
                  <div className="academic-item">
                    <div className="academic-item__icon">{item.icon || '🎓'}</div>
                    <div className="academic-item__content">
                      <h3 className="academic-item__title">{item.title}</h3>
                      <p className="academic-item__institution">{item.institution}</p>
                      <p className="academic-item__period">{item.period}</p>
                      {item.description && (
                        <p className="academic-item__description">{item.description}</p>
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
