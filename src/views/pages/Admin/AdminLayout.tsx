/**
 * Admin Layout - Dark sidebar + top bar + main content
 */

import React, { useMemo } from "react";
import {
  NavLink,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

const navIcon = (name: string) => {
  const w = 20;
  const h = 20;
  const stroke = "currentColor";
  const strokeWidth = 1.8;
  const fill = "none";
  const icons: Record<string, React.ReactNode> = {
    dashboard: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
    building: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
      </svg>
    ),
    bookmark: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    ),
    "file-text": (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
    "check-square": (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    target: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    "sticky-note": (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M16 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M15 2v4a2 2 0 0 0 2 2h4" />
        <path d="M8 10h6" />
        <path d="M8 14h4" />
      </svg>
    ),
    user: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    resume: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
    folder: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
      </svg>
    ),
    briefcase: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    award: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    "bar-chart": (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    "graduation-cap": (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    certificate: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    trophy: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    mail: (
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  };
  return icons[name] ?? null;
};

const navGroups: {
  label: string;
  items: { to: string; label: string; icon: string }[];
}[] = [
  {
    label: "Overview",
    items: [{ to: "/admin/dashboard", label: "Dashboard", icon: "dashboard" }],
  },
  {
    label: "Job hunt",
    items: [
      { to: "/admin/companies", label: "Companies", icon: "building" },
      { to: "/admin/saved-jobs", label: "Saved jobs", icon: "bookmark" },
      { to: "/admin/cover-letter", label: "Cover letter", icon: "file-text" },
    ],
  },
  {
    label: "Personal",
    items: [
      { to: "/admin/tasks", label: "Tasks", icon: "check-square" },
      { to: "/admin/goals", label: "Goals", icon: "target" },
      { to: "/admin/notes", label: "Notes", icon: "sticky-note" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { to: "/admin/profile", label: "Profile", icon: "user" },
      { to: "/admin/resume", label: "Resume", icon: "resume" },
      { to: "/admin/projects", label: "Projects", icon: "folder" },
      { to: "/admin/experience", label: "Experience", icon: "briefcase" },
      { to: "/admin/skills", label: "Skills", icon: "award" },
      { to: "/admin/testimonials", label: "Testimonials", icon: "file-text" },
      { to: "/admin/stats", label: "Stats", icon: "bar-chart" },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/academics", label: "Academics", icon: "graduation-cap" },
      {
        to: "/admin/certifications",
        label: "Certifications",
        icon: "certificate",
      },
      { to: "/admin/honors", label: "Honors", icon: "trophy" },
      { to: "/admin/contacts", label: "Contact info", icon: "mail" },
    ],
  },
  {
    label: "Support",
    items: [{ to: "/admin/messages", label: "Messages", icon: "mail" }],
  },
];

const routeTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/profile": "Profile",
  "/admin/resume": "Resume",
  "/admin/companies": "Companies applied",
  "/admin/saved-jobs": "Saved jobs",
  "/admin/cover-letter": "Cover letter",
  "/admin/tasks": "Tasks",
  "/admin/goals": "Goals",
  "/admin/notes": "Notes",
  "/admin/projects": "Projects",
  "/admin/experience": "Experience",
  "/admin/skills": "Skills",
  "/admin/testimonials": "Testimonials",
  "/admin/stats": "Stats",
  "/admin/academics": "Academics",
  "/admin/certifications": "Certifications",
  "/admin/honors": "Honors & Awards",
  "/admin/contacts": "Contact info",
  "/admin/messages": "Messages",
};

function getPageTitle(pathname: string): string {
  return routeTitles[pathname] ?? "Admin";
}

export const AdminLayout: React.FC = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = useMemo(
    () => getPageTitle(location.pathname),
    [location.pathname],
  );

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <h2 className={styles.sidebarTitle}>Admin</h2>
          <p className={styles.sidebarSubtitle}>Portfolio control panel</p>
        </div>
        <nav
          id="main-navigation"
          className={styles.sidebarNav}
          aria-label="Admin navigation"
        >
          {navGroups.map((group) => (
            <div key={group.label} className={styles.navGroup}>
              <div className={styles.navGroupLabel}>{group.label}</div>
              <div className={styles.navGroupLinks}>
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`
                    }
                    end={item.to === "/admin/dashboard"}
                  >
                    <span className={styles.sidebarLinkIcon}>
                      {navIcon(item.icon)}
                    </span>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarLogout}>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </aside>
      <div className={styles.mainWrap}>
        <header className={styles.topBar}>
          <nav className={styles.topBarBreadcrumb} aria-label="Breadcrumb">
            <Link to="/admin/dashboard" className={styles.breadcrumbLink}>
              Admin
            </Link>
            <span className={styles.breadcrumbSep} aria-hidden>
              /
            </span>
            <span className={styles.breadcrumbCurrent}>{pageTitle}</span>
          </nav>
          <div className={styles.topBarActions}>
            <ThemeToggle />
          </div>
        </header>
        <main
          id="main-content"
          className={styles.main}
          role="main"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
