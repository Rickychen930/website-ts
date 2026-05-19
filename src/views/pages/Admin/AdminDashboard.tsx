/**
 * Admin Dashboard — portfolio content overview
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminService, type AdminStats } from "@/services/AdminService";
import styles from "./Admin.module.css";

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    adminService
      .getStats()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className={styles.loadingState}>Loading…</p>;
  }
  if (error) {
    return (
      <p className={styles.error} role="alert">
        {error}
      </p>
    );
  }
  if (!stats) {
    return (
      <p className={styles.loadingState}>
        No dashboard data. Try refreshing the page.
      </p>
    );
  }

  const { counts, profileUpdatedAt } = stats;

  const quickStats = [
    { label: "Projects", value: counts.projects, to: "/admin/projects" },
    {
      label: "Experience",
      value: counts.experiences,
      to: "/admin/experience",
    },
    { label: "Skills", value: counts.skills, to: "/admin/skills" },
    {
      label: "Messages",
      value: counts.contactMessages,
      to: "/admin/messages",
    },
  ];

  const shortcuts = [
    { label: "Profile", value: "—", to: "/admin/profile" },
    { label: "Resume", value: "—", to: "/admin/resume" },
    { label: "Projects", value: counts.projects, to: "/admin/projects" },
    { label: "Experience", value: counts.experiences, to: "/admin/experience" },
    { label: "Skills", value: counts.skills, to: "/admin/skills" },
    {
      label: "Testimonials",
      value: counts.testimonials,
      to: "/admin/testimonials",
    },
    { label: "Stats", value: counts.stats, to: "/admin/stats" },
    {
      label: "Academics",
      value: counts.academics ?? 0,
      to: "/admin/academics",
    },
    {
      label: "Certifications",
      value: counts.certifications ?? 0,
      to: "/admin/certifications",
    },
    { label: "Honors", value: counts.honors ?? 0, to: "/admin/honors" },
    {
      label: "Contact info",
      value: counts.profileContacts ?? 0,
      to: "/admin/contacts",
    },
    { label: "Messages", value: counts.contactMessages, to: "/admin/messages" },
  ];

  const greeting =
    new Date().getHours() < 12
      ? "Good morning"
      : new Date().getHours() < 18
        ? "Good afternoon"
        : "Good evening";

  return (
    <>
      <header className={styles.dashboardWelcome}>
        <p className={styles.dashboardGreeting}>{greeting}</p>
        <h1 className={styles.pageTitle}>Portfolio CMS</h1>
        {profileUpdatedAt && (
          <p className={styles.dashboardMeta}>
            Profile last updated: {new Date(profileUpdatedAt).toLocaleString()}
          </p>
        )}
      </header>

      <section className={styles.quickStats} aria-label="Key metrics">
        {quickStats.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className={styles.quickStatCard}
            aria-label={`${card.label}: ${card.value}`}
          >
            <div className={styles.quickStatValue}>{card.value}</div>
            <div className={styles.quickStatLabel}>{card.label}</div>
          </Link>
        ))}
      </section>

      <section className={styles.dashboardSection} aria-label="Shortcuts">
        <h2 className={styles.dashboardSectionTitle}>Manage content</h2>
        <div className={styles.shortcutsGrid}>
          {shortcuts.map((card) => (
            <Link key={card.to} to={card.to} className={styles.statCard}>
              <span className={styles.statCardValue}>{card.value}</span>
              <span className={styles.statCardLabel}>{card.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
