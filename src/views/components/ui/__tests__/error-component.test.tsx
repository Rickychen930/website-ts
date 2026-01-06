/**
 * Unit tests for ErrorComponent
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorComponent } from '../error-component';

describe('ErrorComponent', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render error message', () => {
    render(<ErrorComponent error="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should render default error message when error is null', () => {
    render(<ErrorComponent error={null} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should call onRetry when retry button is clicked', () => {
    render(
      <ErrorComponent
        error="Test error"
        onRetry={mockOnRetry}
      />
    );

    const retryButton = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorComponent error="Test error" />);
    expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();
  });

  it('should display retry count when provided', () => {
    render(
      <ErrorComponent
        error="Test error"
        retryCount={2}
        maxRetries={3}
        onRetry={mockOnRetry}
      />
    );

    expect(screen.getByText(/retry 2 of 3/i)).toBeInTheDocument();
  });

  it('should not display retry count when not provided', () => {
    render(
      <ErrorComponent
        error="Test error"
        onRetry={mockOnRetry}
      />
    );

    expect(screen.queryByText(/retry/i)).not.toBeInTheDocument();
  });

  it('should render with custom title', () => {
    render(
      <ErrorComponent
        error="Test error"
        title="Custom Error Title"
      />
    );

    expect(screen.getByText('Custom Error Title')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(
      <ErrorComponent
        error="Test error"
        message="Custom error message"
      />
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });
});

