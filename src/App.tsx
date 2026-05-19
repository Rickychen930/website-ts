/**
 * App — portfolio site (public pages + CMS admin)
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
import { PageTransition } from "@/components/PageTransition";
import { Analytics } from "@/components/Analytics";
import { SkipLinks } from "@/components/SkipLinks";
import { AccessibilityAnnouncer } from "@/components/AccessibilityAnnouncer";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import "./App.css";

const Home = React.lazy(() =>
  import("@/views/pages/Home").then((m) => ({ default: m.Home })),
);
const Projects = React.lazy(() =>
  import("@/views/pages/Projects").then((m) => ({ default: m.Projects })),
);
const ProjectDetail = React.lazy(() =>
  import("@/views/pages/ProjectDetail").then((m) => ({
    default: m.ProjectDetail,
  })),
);
const Experience = React.lazy(() =>
  import("@/views/pages/Experience").then((m) => ({ default: m.Experience })),
);
const Contact = React.lazy(() =>
  import("@/views/pages/Contact").then((m) => ({ default: m.Contact })),
);
const Resume = React.lazy(() =>
  import("@/views/pages/Resume").then((m) => ({ default: m.Resume })),
);
const Privacy = React.lazy(() =>
  import("@/views/pages/Privacy").then((m) => ({ default: m.Privacy })),
);
const Terms = React.lazy(() =>
  import("@/views/pages/Terms").then((m) => ({ default: m.Terms })),
);
const NotFound = React.lazy(() =>
  import("@/views/pages/NotFound").then((m) => ({ default: m.NotFound })),
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

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin");
  const isAdminLoginPage = location.pathname === "/admin/login";
  useKeyboardShortcuts();

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Navigate to="/" replace />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/resume" element={<Resume />} />
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
      <Route path="/learning/*" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

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
      <AccessibilityAnnouncer />
      <div className="app">
        <ScrollProgress />
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

export const App: React.FC = () => (
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
