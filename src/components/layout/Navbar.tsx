/**
 * Navbar - Navigation Component
 * 
 * Principles:
 * - SRP: Single responsibility for navigation
 */

import React from 'react';
import { UserProfile } from '../../types/user';
import { SectionHrefs, NavLabels } from '../../constants/strings';

export interface INavbarProps {
  profile?: UserProfile | null;
}

/**
 * Navbar Component
 * Main navigation bar
 */
export class Navbar extends React.Component<INavbarProps> {
  render(): React.ReactNode {
    const { profile } = this.props;
    const name = profile?.name || 'Ricky';

    return (
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar__container">
          <div className="navbar__brand">
            <a href="#about" className="navbar__brand-link">
              {name}
            </a>
          </div>
          <ul className="navbar__menu">
            <li className="navbar__item">
              <a href={SectionHrefs.ABOUT} className="navbar__link">
                {NavLabels.ABOUT}
              </a>
            </li>
            <li className="navbar__item">
              <a href={SectionHrefs.ACADEMIC} className="navbar__link">
                {NavLabels.ACADEMIC}
              </a>
            </li>
            <li className="navbar__item">
              <a href={SectionHrefs.EXPERIENCE} className="navbar__link">
                {NavLabels.EXPERIENCE}
              </a>
            </li>
            <li className="navbar__item">
              <a href={SectionHrefs.PROJECTS} className="navbar__link">
                {NavLabels.PROJECTS}
              </a>
            </li>
            <li className="navbar__item">
              <a href={SectionHrefs.CONTACT} className="navbar__link">
                {NavLabels.CONTACT}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
