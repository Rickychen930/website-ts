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

  const quickStats = [
    {
      label: "Companies",
      value: counts.appliedCompanies ?? 0,
      to: "/admin/companies",
    },
    { label: "Tasks", value: counts.tasks ?? 0, to: "/admin/tasks" },
    { label: "Messages", value: counts.contactMessages, to: "/admin/messages" },
    {
      label: "Saved jobs",
      value: counts.savedJobs ?? 0,
      to: "/admin/saved-jobs",
    },
  ];

  const sectionJobHunt = [
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
  ];
  const sectionPersonal = [
    { label: "Tasks", value: counts.tasks ?? 0, to: "/admin/tasks" },
    { label: "Goals", value: counts.goals ?? 0, to: "/admin/goals" },
    { label: "Notes", value: counts.notes ?? 0, to: "/admin/notes" },
  ];
  const sectionPortfolio = [
    { label: "Profile", value: "—", to: "/admin/profile" },
    { label: "Projects", value: counts.projects, to: "/admin/projects" },
    { label: "Experience", value: counts.experiences, to: "/admin/experience" },
    { label: "Skills", value: counts.skills, to: "/admin/skills" },
    {
      label: "Testimonials",
      value: counts.testimonials,
      to: "/admin/testimonials",
    },
    { label: "Stats", value: counts.stats, to: "/admin/stats" },
  ];
  const sectionContent = [
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

  return (
    <>
      <header className={styles.dashboardWelcome}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        {profileUpdatedAt && (
          <p className={styles.dashboardMeta}>
            Profile last updated: {new Date(profileUpdatedAt).toLocaleString()}
          </p>
        )}
      </header>

      <section className={styles.quickStats} aria-label="Quick stats">
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

      {(followUpsDue.length > 0 || upcomingInterviews.length > 0) && (
        <div className={styles.jobTrackingCard}>
          <h2 className={styles.formSectionTitle}>Job tracking</h2>
          <div className={styles.jobTrackingGrid}>
            {followUpsDue.length > 0 && (
              <div>
                <Link to="/admin/companies" className={styles.jobTrackingLink}>
                  Follow-ups due ({followUpsDue.length})
                </Link>
                <ul className={styles.jobTrackingList}>
                  {followUpsDue.slice(0, 5).map((c) => (
                    <li key={c.id} className={styles.jobTrackingItem}>
                      {c.companyName}
                      <span className={styles.jobTrackingItemDate}>
                        {" "}
                        –{" "}
                        {c.followUpAt
                          ? new Date(c.followUpAt).toLocaleDateString()
                          : ""}
                      </span>
                    </li>
                  ))}
                  {followUpsDue.length > 5 && (
                    <li className={styles.jobTrackingMore}>
                      +{followUpsDue.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            )}
            {upcomingInterviews.length > 0 && (
              <div>
                <Link to="/admin/companies" className={styles.jobTrackingLink}>
                  Upcoming interviews ({upcomingInterviews.length})
                </Link>
                <ul className={styles.jobTrackingList}>
                  {upcomingInterviews.slice(0, 5).map((c) => (
                    <li key={c.id} className={styles.jobTrackingItem}>
                      {c.companyName}
                      <span className={styles.jobTrackingItemDate}>
                        {" "}
                        –{" "}
                        {c.nextInterviewAt
                          ? new Date(c.nextInterviewAt).toLocaleString(
                              undefined,
                              {
                                dateStyle: "short",
                                timeStyle: "short",
                              },
                            )
                          : ""}
                      </span>
                    </li>
                  ))}
                  {upcomingInterviews.length > 5 && (
                    <li className={styles.jobTrackingMore}>
                      +{upcomingInterviews.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <section className={styles.dashboardSection} aria-label="Job hunt">
        <h2 className={styles.dashboardSectionTitle}>Job hunt</h2>
        <div className={styles.statsGrid}>
          {sectionJobHunt.map((card) => (
            <Link key={card.to} to={card.to} className={styles.statCard}>
              <div className={styles.statCardValue}>{card.value}</div>
              <div className={styles.statCardLabel}>{card.label}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.dashboardSection} aria-label="Personal">
        <h2 className={styles.dashboardSectionTitle}>Personal</h2>
        <div className={styles.statsGrid}>
          {sectionPersonal.map((card) => (
            <Link key={card.to} to={card.to} className={styles.statCard}>
              <div className={styles.statCardValue}>{card.value}</div>
              <div className={styles.statCardLabel}>{card.label}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.dashboardSection} aria-label="Portfolio">
        <h2 className={styles.dashboardSectionTitle}>Portfolio</h2>
        <div className={styles.statsGrid}>
          {sectionPortfolio.map((card) => (
            <Link key={card.to} to={card.to} className={styles.statCard}>
              <div className={styles.statCardValue}>{card.value}</div>
              <div className={styles.statCardLabel}>{card.label}</div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className={styles.dashboardSection}
        aria-label="Content & messages"
      >
        <h2 className={styles.dashboardSectionTitle}>Content & messages</h2>
        <div className={styles.statsGrid}>
          {sectionContent.map((card) => (
            <Link key={card.to} to={card.to} className={styles.statCard}>
              <div className={styles.statCardValue}>{card.value}</div>
              <div className={styles.statCardLabel}>{card.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
