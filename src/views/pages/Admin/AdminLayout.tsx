import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts";
import styles from "./Admin.module.css";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/profile", label: "Profile" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/messages", label: "Messages" },
];

export const AdminLayout: React.FC = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className={styles.adminShell}>
      <aside className={styles.adminSidebar}>
        <Link to="/" className={styles.adminLogo}>
          RC Admin
        </Link>
        <nav>
          {NAV.map(({ to, label }) => (
            <Link key={to} to={to} className={styles.adminNavLink}>
              {label}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className={styles.adminLogout}>
          Logout
        </button>
      </aside>
      <main className={styles.adminMain}>
        <Outlet />
      </main>
    </div>
  );
};
