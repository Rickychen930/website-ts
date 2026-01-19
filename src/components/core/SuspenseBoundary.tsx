/**
 * SuspenseBoundary - Enhanced Suspense with Error Boundary
 * Best practice for handling async components
 * 
 * Features:
 * - Error boundary integration
 * - Custom loading fallback
 * - Error fallback
 * - Performance optimized
 */

import React, { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSkeleton } from './LoadingSkeleton';

export interface ISuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  loadingVariant?: 'text' | 'card' | 'avatar' | 'section' | 'list';
}

/**
 * SuspenseBoundary Component
 * Wraps Suspense with ErrorBoundary for complete async handling
 */
export const SuspenseBoundary: React.FC<ISuspenseBoundaryProps> = ({
  children,
  fallback,
  errorFallback,
  onError,
  loadingVariant = 'section',
}) => {
  const defaultFallback = fallback || <LoadingSkeleton variant={loadingVariant} />;

  return (
    <ErrorBoundary
      fallback={errorFallback}
      onError={onError}
    >
      <Suspense fallback={defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseBoundary;