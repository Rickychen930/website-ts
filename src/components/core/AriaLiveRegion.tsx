/**
 * AriaLiveRegion - ARIA Live Region Component
 * Provides screen reader announcements for dynamic content
 * 
 * Principles:
 * - SRP: Single responsibility for live region announcements
 * - Accessibility: ARIA live regions for dynamic content
 */

import React from 'react';

export type AriaLivePoliteness = 'polite' | 'assertive' | 'off';

export interface IAriaLiveRegionProps {
  message: string;
  politeness?: AriaLivePoliteness;
  id?: string;
  className?: string;
}

/**
 * AriaLiveRegion Component
 * ARIA live region for screen reader announcements
 */
export class AriaLiveRegion extends React.Component<IAriaLiveRegionProps> {
  render(): React.ReactNode {
    const {
      message,
      politeness = 'polite',
      id = 'aria-live-region',
      className = '',
    } = this.props;

    if (!message) {
      return null;
    }

    return (
      <div
        id={id}
        className={`sr-only ${className}`}
        role="status"
        aria-live={politeness}
        aria-atomic="true"
      >
        {message}
      </div>
    );
  }
}

export default AriaLiveRegion;
