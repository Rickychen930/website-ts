/**
 * App Component - Root application component
 * Version 3: Added code splitting with React.lazy
 */

import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ProfileProvider, ThemeProvider, AdminAuthProvider } from "@/contexts";
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
const ProjectDetail = React.lazy(() =>
  import("@/views/pages/ProjectDetail").then((m) => ({
    default: m.ProjectDetail,
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
const Privacy = React.lazy(() =>
  import("@/views/pages/Privacy").then((module) => ({
    default: module.Privacy,
  })),
);
const Terms = React.lazy(() =>
  import("@/views/pages/Terms").then((module) => ({
    default: module.Terms,
  })),
);

const AdminLogin = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminLogin })),
);
const AdminGuard = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminGuard })),
);
const AdminLayout = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminLayout })),
);
const AdminDashboard = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminDashboard })),
);
const AdminProfile = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminProfile })),
);
const AdminResume = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminResume })),
);
const AdminCompanies = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminCompanies })),
);
const AdminCoverLetter = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminCoverLetter })),
);
const AdminSavedJobs = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminSavedJobs })),
);
const AdminTasks = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminTasks })),
);
const AdminGoals = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminGoals })),
);
const AdminNotes = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminNotes })),
);
const AdminProjects = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminProjects })),
);
const AdminExperience = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminExperience })),
);
const AdminSkills = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminSkills })),
);
const AdminTestimonials = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminTestimonials })),
);
const AdminStats = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminStats })),
);
const AdminAcademics = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminAcademics })),
);
const AdminCertifications = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({
    default: m.AdminCertifications,
  })),
);
const AdminHonors = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminHonors })),
);
const AdminContacts = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminContacts })),
);
const AdminMessages = React.lazy(() =>
  import("@/views/pages/Admin").then((m) => ({ default: m.AdminMessages })),
);

// Inner component that uses keyboard shortcuts (must be inside Router)
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin");
  const isAdminLoginPage = location.pathname === "/admin/login";
  useKeyboardShortcuts();

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminGuard>
            <AdminLayout />
          </AdminGuard>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="resume" element={<AdminResume />} />
        <Route path="companies" element={<AdminCompanies />} />
        <Route path="cover-letter" element={<AdminCoverLetter />} />
        <Route path="saved-jobs" element={<AdminSavedJobs />} />
        <Route path="tasks" element={<AdminTasks />} />
        <Route path="goals" element={<AdminGoals />} />
        <Route path="notes" element={<AdminNotes />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="experience" element={<AdminExperience />} />
        <Route path="skills" element={<AdminSkills />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="stats" element={<AdminStats />} />
        <Route path="academics" element={<AdminAcademics />} />
        <Route path="certifications" element={<AdminCertifications />} />
        <Route path="honors" element={<AdminHonors />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  );

  /* Admin dashboard: minimal layout (no header/footer), with skip link for a11y. */
  if (isAdminArea && !isAdminLoginPage) {
    return (
      <>
        <SkipLinks />
        <div className="app app-admin">
          <Suspense fallback={<Loading fullScreen message="Loading..." />}>
            {routes}
          </Suspense>
        </div>
      </>
    );
  }

  return (
    <>
      <Analytics />
      <PerformanceMonitor />
      <AccessibilityAnnouncer />
      <AccessibilityInfo />
      <div className="app">
        <div className="texturePaperWrinkle" aria-hidden="true" />
        <div className="textureNoise" aria-hidden="true" />
        <ParticleBackground />
        <ScrollProgress />
        <CursorEffect />
        <SkipLinks />
        <Header />
        <main id="main-content" className="app-main" role="main" tabIndex={-1}>
          <Suspense fallback={<Loading fullScreen message="Loading page..." />}>
            <PageTransition>{routes}</PageTransition>
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ProfileProvider>
          <AdminAuthProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </AdminAuthProvider>
        </ProfileProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
