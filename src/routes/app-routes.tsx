import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingComponent from "../views/components/loading-component";
import ErrorBoundary from "../views/components/error-boundary";

/**
 * Code Splitting - Lazy load routes for better performance
 * Reduces initial bundle size and improves load time
 */
const MainPage = lazy(() => import("../views/pages/main-page"));

/**
 * Loading fallback for lazy-loaded routes
 */
const RouteLoadingFallback = () => (
  <LoadingComponent message="Loading page..." useSkeleton={true} skeletonVariant="card" />
);

/**
 * AppRoutes - Application routing with code splitting
 * Performance optimized with React.lazy()
 */
const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route 
            path="/" 
            element={<MainPage />} 
            aria-label="Main portfolio page"
          />
          {/* Future routes can be added here */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
            aria-label="Redirect to home"
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
