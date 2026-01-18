/**
 * SkipToContent - Skip to Content Link
 * Accessibility feature for keyboard navigation
 * WCAG 2.4.1 - Bypass Blocks
 * 
 * Principles:
 * - Accessibility: Skip navigation for keyboard users
 * - SRP: Single responsibility for skip link
 */

import React from 'react';
import './SkipToContent.css';

export interface ISkipToContentProps {
  targetId?: string;
  label?: string;
}

/**
 * SkipToContent Component
 * Provides skip link for keyboard navigation
 */
export class SkipToContent extends React.Component<ISkipToContentProps> {
  private handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const targetId = this.props.targetId || 'main-content';
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Focus the element for keyboard users
      targetElement.focus();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Remove focus after a moment (visual focus only)
      setTimeout(() => {
        if (document.activeElement === targetElement) {
          (targetElement as HTMLElement).blur();
        }
      }, 1000);
    }
  };

  render(): React.ReactNode {
    const { targetId = 'main-content', label = 'Skip to main content' } = this.props;

    return (
      <a
        href={`#${targetId}`}
        className="skip-to-content"
        onClick={this.handleClick}
        aria-label={label}
      >
        {label}
      </a>
    );
  }
}

export default SkipToContent;
