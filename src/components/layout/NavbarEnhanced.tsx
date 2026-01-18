/**
 * NavbarEnhanced - Enhanced Navigation Component
 * Professional navbar with mobile menu, smooth scroll, and active section highlighting
 * 
 * Principles:
 * - SRP: Single responsibility for navigation
 * - Accessibility: ARIA labels, keyboard navigation
 * - Performance: Efficient scroll handling
 */

import React, { Component } from 'react';
import { UserProfile } from '../../types/user';
import { SectionHrefs, SectionIds, NavLabels } from '../../constants/strings';
import { ScrollConfig } from '../../constants/config';
import { ThemeToggle } from '../core/ThemeToggle';
import './NavbarEnhanced.css';

export interface INavbarEnhancedProps {
  profile?: UserProfile | null;
}

interface INavbarEnhancedState {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string;
}

/**
 * NavbarEnhanced Component
 * Enhanced navigation with mobile menu and active section tracking
 */
export class NavbarEnhanced extends Component<INavbarEnhancedProps, INavbarEnhancedState> {
  private scrollTimeout: NodeJS.Timeout | null = null;
  private sectionObservers: Map<string, IntersectionObserver> = new Map();
  private mobileMenuRef: React.RefObject<HTMLDivElement | null> = React.createRef();
  private mobileMenuButtonRef: React.RefObject<HTMLButtonElement | null> = React.createRef();
  private previousActiveElement: HTMLElement | null = null;

  constructor(props: INavbarEnhancedProps) {
    super(props);
    this.state = {
      isScrolled: false,
      isMobileMenuOpen: false,
      activeSection: '',
    };
  }

  componentDidMount(): void {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    document.addEventListener('keydown', this.handleKeyDown);
    this.setupSectionObservers();
  }

  componentDidUpdate(prevProps: INavbarEnhancedProps, prevState: INavbarEnhancedState): void {
    // Focus management for mobile menu
    if (this.state.isMobileMenuOpen && !prevState.isMobileMenuOpen) {
      // Menu just opened - save current focus and focus first menu item
      this.previousActiveElement = document.activeElement as HTMLElement;
      this.focusFirstMenuItem();
    } else if (!this.state.isMobileMenuOpen && prevState.isMobileMenuOpen) {
      // Menu just closed - restore focus to button
      if (this.mobileMenuButtonRef.current) {
        this.mobileMenuButtonRef.current.focus();
      }
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('keydown', this.handleKeyDown);
    this.cleanupSectionObservers();
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  private handleScroll = (): void => {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      this.setState({ isScrolled: scrollY > ScrollConfig.SCROLL_THRESHOLD });
    }, 10);
  };

  private setupSectionObservers = (): void => {
    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      return;
    }

    // Use SectionIds constants to ensure sync
    const sections = [
      SectionIds.ABOUT,
      SectionIds.ACADEMIC,
      SectionIds.EXPERIENCE,
      SectionIds.PROJECTS,
      SectionIds.CONTACT,
    ];
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              this.setState({ activeSection: sectionId });
            }
          });
        },
        {
          threshold: [0.3, 0.5],
          rootMargin: `-${ScrollConfig.OFFSET}px 0px -50% 0px`,
        }
      );

      observer.observe(element);
      this.sectionObservers.set(sectionId, observer);
    });
  };

  private cleanupSectionObservers = (): void => {
    this.sectionObservers.forEach((observer) => observer.disconnect());
    this.sectionObservers.clear();
  };

  private handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = ScrollConfig.OFFSET;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Close mobile menu if open
      this.setState({ isMobileMenuOpen: false });

      // Update active section
      this.setState({ activeSection: targetId });
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && this.state.isMobileMenuOpen) {
      this.closeMobileMenu();
    }

    // Tab key focus trap in mobile menu
    if (this.state.isMobileMenuOpen && e.key === 'Tab') {
      this.handleFocusTrap(e);
    }
  };

  private handleFocusTrap = (e: KeyboardEvent): void => {
    if (!this.mobileMenuRef.current) return;

    const menuItems = Array.from(
      this.mobileMenuRef.current.querySelectorAll<HTMLElement>('a[href]')
    );
    const firstItem = menuItems[0];
    const lastItem = menuItems[menuItems.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    if (e.shiftKey) {
      // Shift+Tab: If focus is on first item, move to last
      if (activeElement === firstItem && lastItem) {
        e.preventDefault();
        lastItem.focus();
      }
    } else {
      // Tab: If focus is on last item, move to first
      if (activeElement === lastItem && firstItem) {
        e.preventDefault();
        firstItem.focus();
      }
    }
  };

  private focusFirstMenuItem = (): void => {
    if (!this.mobileMenuRef.current) return;
    const firstItem = this.mobileMenuRef.current.querySelector<HTMLElement>('a[href]');
    if (firstItem) {
      setTimeout(() => firstItem.focus(), 100);
    }
  };

  private toggleMobileMenu = (): void => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  private closeMobileMenu = (): void => {
    this.setState({ isMobileMenuOpen: false });
  };

  private isActiveSection = (href: string): boolean => {
    const sectionId = href.replace('#', '');
    return this.state.activeSection === sectionId;
  };

  render(): React.ReactNode {
    const { profile } = this.props;
    const { isScrolled, isMobileMenuOpen } = this.state;
    const name = profile?.name || 'Ricky';

    const navItems = [
      { href: SectionHrefs.ABOUT, label: NavLabels.ABOUT },
      { href: SectionHrefs.ACADEMIC, label: NavLabels.ACADEMIC },
      { href: SectionHrefs.EXPERIENCE, label: NavLabels.EXPERIENCE },
      { href: SectionHrefs.PROJECTS, label: NavLabels.PROJECTS },
      { href: SectionHrefs.CONTACT, label: NavLabels.CONTACT },
    ];

    return (
      <nav
        className={`navbar navbar--enhanced ${isScrolled ? 'navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__container">
          <div className="navbar__brand">
            <a
              href="#about"
              className="navbar__brand-link"
              onClick={(e) => this.handleSmoothScroll(e, '#about')}
              aria-label="Go to top"
            >
              <img 
                src="/logo.png" 
                alt={name}
                className="navbar__brand-logo"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <ul className="navbar__menu navbar__menu--desktop">
            {navItems.map((item) => {
              const isActive = this.isActiveSection(item.href);
              return (
                <li key={item.href} className="navbar__item">
                  <a
                    href={item.href}
                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={(e) => this.handleSmoothScroll(e, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="navbar__item navbar__item--theme">
              <ThemeToggle size="small" />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            ref={this.mobileMenuButtonRef}
            className={`navbar__menu-toggle ${isMobileMenuOpen ? 'navbar__menu-toggle--open' : ''}`}
            onClick={this.toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span className="navbar__menu-toggle-icon" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={this.mobileMenuRef}
          id="mobile-menu"
          className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className="navbar__menu navbar__menu--mobile">
            {navItems.map((item) => {
              const isActive = this.isActiveSection(item.href);
              return (
                <li key={item.href} className="navbar__item">
                  <a
                    href={item.href}
                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={(e) => this.handleSmoothScroll(e, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="navbar__item navbar__item--theme">
              <ThemeToggle size="small" />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
