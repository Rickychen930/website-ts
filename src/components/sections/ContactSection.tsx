/**
 * ContactSection - View Component (MVC Pattern)
 * Displays Contact section with contact information
 * 
 * Principles:
 * - MVC: View layer
 * - SRP: Single responsibility for rendering Contact section
 * - DRY: Reuses controller and model logic
 */

import React from 'react';
import { UserProfile } from '../../types/user';
import { ContactController } from '../../controllers/contact-controller';
import { SectionIds, SectionNames } from '../../constants/strings';
import { IntersectionObserver } from '../core/IntersectionObserver';
import { EmptyState } from '../core/EmptyState';

export interface IContactSectionProps {
  profile: UserProfile;
  controller: ContactController;
}

/**
 * ContactSection Component
 * Renders Contact section with contact information and social links
 */
export class ContactSection extends React.Component<IContactSectionProps> {
  private controller: ContactController;

  constructor(props: IContactSectionProps) {
    super(props);
    this.controller = props.controller || new ContactController();
  }

  render(): React.ReactNode {
    const { profile } = this.props;
    
    if (!this.controller.shouldDisplay(profile)) {
      return null;
    }

    const data = this.controller.getContactData(profile);
    if (!data || !data.contacts || data.contacts.length === 0) {
      return (
        <section id={SectionIds.CONTACT} className="section section--contact">
          <div className="section__container">
            <IntersectionObserver animation="fadeIn" once>
              <h2 className="section__title">{SectionNames.CONTACT}</h2>
            </IntersectionObserver>
            <EmptyState
              icon="📧"
              title="No Contact Information Available"
              message="Contact information will be displayed here when available."
            />
          </div>
        </section>
      );
    }

    return (
      <section id={SectionIds.CONTACT} className="section section--contact">
        <div className="section__container">
          <IntersectionObserver animation="fadeIn" once>
            <h2 className="section__title">{SectionNames.CONTACT}</h2>
          </IntersectionObserver>
          <div className="contact__content">
            <IntersectionObserver animation="slideUp" delay={100} once>
              <p className="contact__description">
                Get in touch with me! I'm always open to discussing new projects, 
                creative ideas, or opportunities to be part of your visions.
              </p>
            </IntersectionObserver>
            
            <IntersectionObserver animation="fadeIn" delay={200} once>
              <div className="contact__grid">
                {data.contacts.map((contact, index) => (
                  <a
                    key={contact.key || index}
                    href={contact.link || contact.value || '#'}
                    target={contact.link?.startsWith('http') ? '_blank' : undefined}
                    rel={contact.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact__item"
                    aria-label={`Contact via ${contact.label || contact.key}`}
                  >
                    <span className="contact__icon">{contact.icon || '📧'}</span>
                    <div className="contact__info">
                      <span className="contact__label">{contact.label || contact.key}</span>
                      <span className="contact__value">{contact.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </IntersectionObserver>
          </div>
        </div>
      </section>
    );
  }
}
