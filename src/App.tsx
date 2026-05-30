import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ProfileProvider, ThemeProvider, AdminAuthProvider } from "@/contexts";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor/CustomCursor";
import { CurtainTransition } from "@/components/motion/CurtainTransition/CurtainTransition";

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
const Resume = React.lazy(() =>
  import("@/views/pages/Resume").then((m) => ({ default: m.Resume })),
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
  import("@/views/pages/Admin").then((m) => ({
    default: m.AdminTestimonials,
  })),
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

const Spinner: React.FC = () => (
  <div
    style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-dim)",
      fontFamily: "var(--font-mono)",
      fontSize: "0.8rem",
    }}
  >
    Loading…
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <Suspense fallback={<Spinner />}>
        <Routes>
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
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <CustomCursor />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <Suspense fallback={<Spinner />}>
          <CurtainTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Navigate to="/" replace />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CurtainTransition>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export const App: React.FC = () => (
  <ThemeProvider>
    <ProfileProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AdminAuthProvider>
    </ProfileProvider>
  </ThemeProvider>
);
