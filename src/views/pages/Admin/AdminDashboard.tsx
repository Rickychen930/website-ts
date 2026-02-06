/**
 * Admin Dashboard - Overview stats
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
    return <p className={styles.emptyState}>Loading…</p>;
  }
  if (error) {
    return (
      <p className={styles.emptyState} role="alert">
        Error: {error}
      </p>
    );
  }
  if (!stats) {
    return null;
  }

  const { counts, profileUpdatedAt } = stats;
  const cards = [
    { label: "Projects", value: counts.projects, to: "/admin/projects" },
    { label: "Experience", value: counts.experiences, to: "/admin/experience" },
    { label: "Skills", value: counts.skills, to: "/admin/skills" },
    {
      label: "Testimonials",
      value: counts.testimonials,
      to: "/admin/testimonials",
    },
    { label: "Stats", value: counts.stats, to: "/admin/stats" },
    { label: "Messages", value: counts.contactMessages, to: "/admin/messages" },
  ];

  return (
    <>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      {profileUpdatedAt && (
        <p
          className={styles.emptyState}
          style={{ textAlign: "left", marginBottom: "1rem" }}
        >
          Profile last updated: {new Date(profileUpdatedAt).toLocaleString()}
        </p>
      )}
      <div className={styles.statsGrid}>
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className={styles.statCard}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.statCardValue}>{card.value}</div>
            <div className={styles.statCardLabel}>{card.label}</div>
          </Link>
        ))}
      </div>
    </>
  );
};
