/**
 * Unit tests for LoadingComponent
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingComponent } from '../loading-component';

describe('LoadingComponent', () => {
  it('should render default loading message', () => {
    render(<LoadingComponent />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render custom message', () => {
    render(<LoadingComponent message="Please wait..." />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('should render skeleton when useSkeleton is true', () => {
    const { container } = render(
      <LoadingComponent message="Loading..." useSkeleton={true} />
    );

    // Skeleton should have specific classes
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('should render spinner when useSkeleton is false', () => {
    const { container } = render(
      <LoadingComponent message="Loading..." useSkeleton={false} />
    );

    // Should have spinner element
    const spinner = container.querySelector('.spinner, [role="status"]');
    expect(spinner).toBeInTheDocument();
  });

  it('should render card variant skeleton', () => {
    const { container } = render(
      <LoadingComponent
        message="Loading..."
        useSkeleton={true}
        skeletonVariant="card"
      />
    );

    const skeleton = container.querySelector('.skeleton-card, .skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('should render text variant skeleton', () => {
    const { container } = render(
      <LoadingComponent
        message="Loading..."
        useSkeleton={true}
        skeletonVariant="text"
      />
    );

    const skeleton = container.querySelector('.skeleton-text, .skeleton');
    expect(skeleton).toBeInTheDocument();
  });
});

