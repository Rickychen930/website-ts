import React, { Suspense, lazy, ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingComponent } from "../views/components/ui";
import { ErrorBoundary } from "../views/components/ui";

/**
 * Code Splitting - Lazy load routes for better performance
 * Reduces initial bundle size and improves load time
 */
const MainPage = lazy(() => import("../views/pages/main-page"));
const NotFoundPage = lazy(() =>
  import("../views/pages/404-page").then(
    (module): { default: ComponentType<{}> } => ({
      default: module.default as ComponentType<{}>,
    }),
  ),
);

/**
 * Loading fallback for lazy-loaded routes
 */
const RouteLoadingFallback = () => (
  <LoadingComponent
    message="Loading page..."
    useSkeleton={true}
    skeletonVariant="card"
  />
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
          {/* 404 Page - Must be last route */}
          <Route
            path="*"
            element={<NotFoundPage />}
            aria-label="404 Not Found page"
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
