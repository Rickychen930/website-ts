/**
 * EmptyState - Empty State Component
 * Displays empty state when sections have no data
 * 
 * Principles:
 * - SRP: Single responsibility for empty state display
 * - Accessibility: ARIA labels and semantic HTML
 */

import React from 'react';
import './EmptyState.css';

export interface IEmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * EmptyState Component
 * Displays informative empty state message
 */
export class EmptyState extends React.Component<IEmptyStateProps> {
  render(): React.ReactNode {
    const {
      icon = '📭',
      title,
      message,
      actionLabel,
      onAction,
      className = '',
    } = this.props;

    return (
      <div className={`empty-state ${className}`} role="status" aria-live="polite">
        <div className="empty-state__icon" aria-hidden="true">
          {icon}
        </div>
        <h3 className="empty-state__title">{title}</h3>
        {message && (
          <p className="empty-state__message">{message}</p>
        )}
        {actionLabel && onAction && (
          <button
            className="empty-state__action"
            onClick={onAction}
            type="button"
            aria-label={actionLabel}
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }
}

export default EmptyState;
