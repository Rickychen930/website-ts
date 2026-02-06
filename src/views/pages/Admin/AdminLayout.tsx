/**
 * Admin Layout - Sidebar navigation + outlet
 */

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

const navItems = [
  { to: "/admin/dashboard", label: "Overview" },
  { to: "/admin/profile", label: "Profile" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/stats", label: "Stats" },
  { to: "/admin/academics", label: "Academics" },
  { to: "/admin/certifications", label: "Certifications" },
  { to: "/admin/honors", label: "Honors" },
  { to: "/admin/contacts", label: "Contact info" },
  { to: "/admin/messages", label: "Messages" },
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
        <nav aria-label="Admin navigation">
          {navItems.map((item) => (
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
        </nav>
        <div className={styles.sidebarLogout}>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
