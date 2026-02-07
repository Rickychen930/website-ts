/**
 * Admin Dashboard - Overview stats + job tracking reminders
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  adminService,
  type AdminStats,
  type AppliedCompanyItem,
} from "@/services/AdminService";
import styles from "./Admin.module.css";

const now = () => new Date().getTime();
const dayMs = 24 * 60 * 60 * 1000;

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [companies, setCompanies] = useState<AppliedCompanyItem[]>([]);
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

  useEffect(() => {
    adminService
      .getCompanies({ limit: 200 })
      .then((res) => setCompanies(res.items))
      .catch(() => {});
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

  const followUpsDue = companies.filter((c) => {
    if (!c.followUpAt) return false;
    const t = new Date(c.followUpAt).getTime();
    return t <= now() + 7 * dayMs;
  });
  const upcomingInterviews = companies.filter((c) => {
    if (!c.nextInterviewAt) return false;
    const t = new Date(c.nextInterviewAt).getTime();
    return t >= now() && t <= now() + 14 * dayMs;
  });

  const cards = [
    { label: "Profile", value: "—", to: "/admin/profile" },
    {
      label: "Companies",
      value: counts.appliedCompanies ?? 0,
      to: "/admin/companies",
    },
    {
      label: "Saved jobs",
      value: counts.savedJobs ?? 0,
      to: "/admin/saved-jobs",
    },
    { label: "Cover letter", value: "—", to: "/admin/cover-letter" },
    { label: "Tasks", value: counts.tasks ?? 0, to: "/admin/tasks" },
    { label: "Goals", value: counts.goals ?? 0, to: "/admin/goals" },
    { label: "Notes", value: counts.notes ?? 0, to: "/admin/notes" },
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
    {
      label: "Languages",
      value: counts.languages ?? 0,
      to: "/admin/profile",
    },
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

      {(followUpsDue.length > 0 || upcomingInterviews.length > 0) && (
        <div className={styles.formSection} style={{ marginBottom: "1.5rem" }}>
          <h2 className={styles.formSectionTitle}>Job tracking</h2>
          <div className={styles.detailGrid}>
            {followUpsDue.length > 0 && (
              <div>
                <Link
                  to="/admin/companies"
                  className={styles.toggleDetail}
                  style={{ fontWeight: 600 }}
                >
                  Follow-ups due ({followUpsDue.length})
                </Link>
                <ul style={{ margin: "0.25rem 0 0 1rem", padding: 0 }}>
                  {followUpsDue.slice(0, 5).map((c) => (
                    <li key={c.id} style={{ marginBottom: "0.15rem" }}>
                      {c.companyName} –{" "}
                      {c.followUpAt
                        ? new Date(c.followUpAt).toLocaleDateString()
                        : ""}
                    </li>
                  ))}
                  {followUpsDue.length > 5 && (
                    <li style={{ color: "var(--text-tertiary)" }}>
                      +{followUpsDue.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            )}
            {upcomingInterviews.length > 0 && (
              <div>
                <Link
                  to="/admin/companies"
                  className={styles.toggleDetail}
                  style={{ fontWeight: 600 }}
                >
                  Upcoming interviews ({upcomingInterviews.length})
                </Link>
                <ul style={{ margin: "0.25rem 0 0 1rem", padding: 0 }}>
                  {upcomingInterviews.slice(0, 5).map((c) => (
                    <li key={c.id} style={{ marginBottom: "0.15rem" }}>
                      {c.companyName} –{" "}
                      {c.nextInterviewAt
                        ? new Date(c.nextInterviewAt).toLocaleString(
                            undefined,
                            { dateStyle: "short", timeStyle: "short" },
                          )
                        : ""}
                    </li>
                  ))}
                  {upcomingInterviews.length > 5 && (
                    <li style={{ color: "var(--text-tertiary)" }}>
                      +{upcomingInterviews.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
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
