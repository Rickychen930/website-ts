/**
 * Admin Layout - Grouped sidebar navigation + outlet
 */

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

const navGroups: { label: string; items: { to: string; label: string }[] }[] = [
  {
    label: "Overview",
    items: [{ to: "/admin/dashboard", label: "Dashboard" }],
  },
  {
    label: "Job hunt",
    items: [
      { to: "/admin/companies", label: "Companies" },
      { to: "/admin/saved-jobs", label: "Saved jobs" },
      { to: "/admin/cover-letter", label: "Cover letter" },
    ],
  },
  {
    label: "Personal",
    items: [
      { to: "/admin/tasks", label: "Tasks" },
      { to: "/admin/goals", label: "Goals" },
      { to: "/admin/notes", label: "Notes" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { to: "/admin/profile", label: "Profile" },
      { to: "/admin/projects", label: "Projects" },
      { to: "/admin/experience", label: "Experience" },
      { to: "/admin/skills", label: "Skills" },
      { to: "/admin/testimonials", label: "Testimonials" },
      { to: "/admin/stats", label: "Stats" },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/academics", label: "Academics" },
      { to: "/admin/certifications", label: "Certifications" },
      { to: "/admin/honors", label: "Honors" },
      { to: "/admin/contacts", label: "Contact info" },
    ],
  },
  { label: "Support", items: [{ to: "/admin/messages", label: "Messages" }] },
];

export const AdminLayout: React.FC = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Admin</h2>
        <nav className={styles.sidebarNav} aria-label="Admin navigation">
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
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
