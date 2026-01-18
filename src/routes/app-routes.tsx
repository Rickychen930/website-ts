/**
 * AppRoutes - Application Routing
 * Main routing configuration
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const MainPage = lazy(() => import('../pages/MainPage').then(module => ({ default: module.default })));

/**
 * Loading fallback
 */
const LoadingFallback = () => (
  <div className="loading-container">
    <p>Loading...</p>
  </div>
);

/**
 * AppRoutes Component
 */
const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
