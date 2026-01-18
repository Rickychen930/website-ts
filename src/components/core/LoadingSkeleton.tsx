/**
 * LoadingSkeleton - Professional Skeleton Loader Component
 * Provides elegant loading states following modern UI/UX patterns
 * 
 * Principles:
 * - SRP: Single responsibility for loading state display
 * - DRY: Reusable skeleton components
 * - KISS: Simple, elegant implementation
 */

import React from 'react';
import './LoadingSkeleton.css';

export interface ILoadingSkeletonProps {
  variant?: 'text' | 'card' | 'avatar' | 'section' | 'list';
  count?: number;
  className?: string;
  width?: string;
  height?: string;
}

/**
 * LoadingSkeleton Component
 * Displays animated skeleton placeholders
 */
export class LoadingSkeleton extends React.Component<ILoadingSkeletonProps> {
  render(): React.ReactNode {
    const { variant = 'text', count = 1, className, width, height } = this.props;

    const skeletons = Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className={`skeleton skeleton--${variant} ${className || ''}`}
        style={{ width, height }}
        aria-label="Loading content"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    ));

    return <>{skeletons}</>;
  }
}

/**
 * SectionSkeleton - Skeleton for full sections
 */
export class SectionSkeleton extends React.Component {
  render(): React.ReactNode {
    return (
      <section className="section section--skeleton">
        <div className="section__container">
          <LoadingSkeleton variant="text" count={1} className="skeleton--title" />
          <div className="skeleton-content">
            <LoadingSkeleton variant="card" count={3} />
          </div>
        </div>
      </section>
    );
  }
}

/**
 * ProfileSkeleton - Skeleton for profile loading
 */
export class ProfileSkeleton extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="profile-skeleton">
        <div className="profile-skeleton__header">
          <LoadingSkeleton variant="avatar" width="120px" height="120px" />
          <div className="profile-skeleton__info">
            <LoadingSkeleton variant="text" width="200px" height="32px" />
            <LoadingSkeleton variant="text" width="150px" height="24px" />
            <LoadingSkeleton variant="text" width="100px" height="20px" />
          </div>
        </div>
        <div className="profile-skeleton__content">
          <LoadingSkeleton variant="text" count={3} />
        </div>
        <div className="profile-skeleton__stats">
          <LoadingSkeleton variant="card" count={4} />
        </div>
      </div>
    );
  }
}
