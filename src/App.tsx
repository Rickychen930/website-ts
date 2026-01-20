/**
 * App Component - Root application component
 * Version 3: Added code splitting with React.lazy
 */

import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider, ThemeProvider } from "@/contexts";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Header } from "@/views/components/layout/Header";
import { Footer } from "@/views/components/layout/Footer";
import { Loading } from "@/views/components/ui/Loading";
import { BackToTop } from "@/components/BackToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ParticleBackground } from "@/components/ParticleBackground";
import { CursorEffect } from "@/components/CursorEffect";
import { PageTransition } from "@/components/PageTransition";
import { Analytics } from "@/components/Analytics";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { SkipLinks } from "@/components/SkipLinks";
import { AccessibilityAnnouncer } from "@/components/AccessibilityAnnouncer";
import { AccessibilityInfo } from "@/components/AccessibilityInfo";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import "./App.css";

// Lazy load pages for code splitting
const Home = React.lazy(() =>
  import("@/views/pages/Home").then((module) => ({ default: module.Home })),
);
const About = React.lazy(() =>
  import("@/views/pages/About").then((module) => ({ default: module.About })),
);
const Projects = React.lazy(() =>
  import("@/views/pages/Projects").then((module) => ({
    default: module.Projects,
  })),
);
const Experience = React.lazy(() =>
  import("@/views/pages/Experience").then((module) => ({
    default: module.Experience,
  })),
);
const Contact = React.lazy(() =>
  import("@/views/pages/Contact").then((module) => ({
    default: module.Contact,
  })),
);

export const App: React.FC = () => {
  useKeyboardShortcuts();

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ProfileProvider>
          <BrowserRouter>
            <Analytics />
            <PerformanceMonitor />
            <AccessibilityAnnouncer />
            <AccessibilityInfo />
            <div className="app">
              <ParticleBackground />
              <ScrollProgress />
              <CursorEffect />
              <SkipLinks />
              <Header />
              <main
                id="main-content"
                className="app-main"
                role="main"
                tabIndex={-1}
              >
                <Suspense
                  fallback={<Loading fullScreen message="Loading page..." />}
                >
                  <PageTransition>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </PageTransition>
                </Suspense>
              </main>
              <Footer />
              <BackToTop />
            </div>
          </BrowserRouter>
        </ProfileProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
