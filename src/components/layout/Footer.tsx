/**
 * Footer - Footer Component
 * Enhanced footer with social links, stats, and navigation
 * 
 * Principles:
 * - SRP: Single responsibility for footer content
 */

import React from 'react';
import { UserProfile } from '../../types/user';
import { FooterController } from '../../controllers/footer-controller';
import { FooterModel } from '../../models/footer-model';

export interface IFooterProps {
  profile?: UserProfile | null;
}

/**
 * Footer Component
 * Enhanced footer with stats, social links, and quick navigation
 */
export class Footer extends React.Component<IFooterProps> {
  private controller: FooterController;

  constructor(props: IFooterProps) {
    super(props);
    this.controller = new FooterController();
  }

  private handleLinkClick = (href: string, isExternal: boolean): void => {
    if (isExternal || href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    // Smooth scroll for internal links
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  render(): React.ReactNode {
    const currentYear = new Date().getFullYear();
    const { profile } = this.props;
    const name = profile?.name || 'Ricky';

    // Extract footer data if profile exists
    const footerData = profile ? FooterModel.extractFromProfile(profile) : null;
    const socialLinks = footerData?.socialLinks || [];
    const quickLinks = footerData?.quickLinks || [
      { key: "about", label: "About", href: "#about", icon: "👤" },
      { key: "skills", label: "Skills", href: "#skills", icon: "💻" },
      { key: "experience", label: "Experience", href: "#experience", icon: "💼" },
      { key: "projects", label: "Projects", href: "#projects", icon: "🚀" },
      { key: "contact", label: "Contact", href: "#contact", icon: "📧" },
    ];
    const stats = footerData?.stats || [];

    return (
      <footer className="footer" role="contentinfo">
        <div className="footer__container">
          {/* Stats Section - Only show if stats exist */}
          {stats.length > 0 && (
            <div className="footer__stats">
              {stats.map((stat) => (
                <div key={stat.key} className="footer__stat">
                  <div className="footer__stat-icon">{stat.icon}</div>
                  <div className="footer__stat-content">
                    <div className="footer__stat-value">{stat.value}</div>
                    <div className="footer__stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Main Content Grid - Always show */}
          <div className="footer__main">
            {/* About Section */}
            <div className="footer__section footer__section--about">
              <h3 className="footer__section-title">{name}</h3>
              <p className="footer__section-description">
                Software Engineer Portfolio
              </p>
              {/* Social Links - Show if available */}
              {socialLinks.length > 0 && (
                <div className="footer__social">
                  {socialLinks.map((link) => (
                    <a
                      key={link.key}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer__social-link"
                      aria-label={`Visit ${link.label} profile`}
                      style={{ '--social-color': link.color } as React.CSSProperties}
                    >
                      <span className="footer__social-icon">{link.icon}</span>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links - Always show */}
            {quickLinks.length > 0 && (
              <div className="footer__section footer__section--links">
                <h3 className="footer__section-title">Quick Links</h3>
                <nav className="footer__nav" aria-label="Footer navigation">
                  <ul className="footer__nav-list">
                    {quickLinks.map((link) => (
                      <li key={link.key} className="footer__nav-item">
                        <a
                          href={link.href}
                          onClick={(e) => {
                            if (!link.href.startsWith('http')) {
                              e.preventDefault();
                              this.handleLinkClick(link.href, false);
                            }
                          }}
                          className="footer__nav-link"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>

          {/* Copyright */}
          <div className="footer__bottom">
            <p className="footer__copyright">
              © {currentYear} {name}. All rights reserved.
            </p>
            <p className="footer__tagline">
              Built with passion and attention to detail
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
