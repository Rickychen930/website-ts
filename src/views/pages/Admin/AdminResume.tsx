/**
 * Admin Resume - Live preview from profile data (ATS-friendly, print to PDF)
 * Updates when you save changes in Profile and other admin sections.
 */

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";
import resumeStyles from "./AdminResume.module.css";

type Profile = Record<string, unknown> & {
  name?: string;
  title?: string;
  location?: string;
  bio?: string;
  contacts?: Array<{
    type: string;
    value: string;
    label: string;
    isPrimary?: boolean;
  }>;
  experiences?: Array<{
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
    description?: string;
    achievements?: string[];
    technologies?: string[];
  }>;
  academics?: Array<{
    institution: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }>;
  projects?: Array<{
    title: string;
    description?: string;
    technologies?: string[];
    achievements?: string[];
  }>;
  technicalSkills?: Array<{ name: string; category?: string }>;
  softSkills?: Array<{ name: string }>;
  certifications?: Array<{ name: string; issuer: string; issueDate?: string }>;
  honors?: Array<{ title: string; issuer?: string; date?: string }>;
  stats?: Array<{ label: string; value: string | number; unit?: string }>;
  languages?: Array<{ name: string; proficiency: string }>;
};

export const AdminResume: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const loadProfile = () => {
    setLoading(true);
    setError(null);
    adminService
      .getProfile()
      .then((p) => setProfile(p as Profile))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load profile"),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading && !profile) {
    return <p className={styles.loadingState}>Loading resume…</p>;
  }

  if (error && !profile) {
    return (
      <>
        <p className={styles.error} role="alert">
          {error}
        </p>
        <Button variant="secondary" onClick={loadProfile}>
          Retry
        </Button>
      </>
    );
  }

  if (!profile) return null;

  const name = String(profile.name ?? "Your Name");
  const title = String(profile.title ?? "");
  const location = String(profile.location ?? "");
  const bio = String(profile.bio ?? "");
  const contacts = (profile.contacts as Profile["contacts"]) ?? [];
  const experiences = (profile.experiences as Profile["experiences"]) ?? [];
  const academics = (profile.academics as Profile["academics"]) ?? [];
  const projects = (profile.projects as Profile["projects"]) ?? [];
  const technicalSkills =
    (profile.technicalSkills as Profile["technicalSkills"]) ?? [];
  const softSkills = (profile.softSkills as Profile["softSkills"]) ?? [];
  const certifications =
    (profile.certifications as Profile["certifications"]) ?? [];
  const honors = (profile.honors as Profile["honors"]) ?? [];
  const stats = (profile.stats as Profile["stats"]) ?? [];
  const languages = (profile.languages as Profile["languages"]) ?? [];
  const contactParts = contacts
    .filter((c) => c.value)
    .map((c) => `${c.label || c.type}: ${c.value}`);

  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Resume</h1>
        <p className={styles.pageIntro}>
          Live preview from your Profile data. Edit{" "}
          <Link to="/admin/profile" className={styles.jobTrackingLink}>
            Profile
          </Link>
          , Experience, Projects, and other sections, then return here to see
          the updated resume. Use Print to save as PDF.
        </p>
      </header>

      {!profile.name && !profile.title && (
        <p className={styles.emptyState}>
          Add your name and title in{" "}
          <Link to="/admin/profile" className={styles.jobTrackingLink}>
            Profile
          </Link>{" "}
          to see the resume.
        </p>
      )}

      <div className={resumeStyles.resumeActions}>
        <Button variant="primary" onClick={handlePrint}>
          Print / Save as PDF
        </Button>
        <Button variant="ghost" onClick={loadProfile}>
          Refresh from profile
        </Button>
      </div>

      <div ref={printRef} className={resumeStyles.resumePrintArea}>
        <div className={resumeStyles.resumeName}>{name}</div>
        {(title || location) && (
          <p className={resumeStyles.resumeTagline}>
            {title && <strong>{title}</strong>}
            {title && location && <br />}
            {location}
          </p>
        )}
        {contactParts.length > 0 && (
          <p className={resumeStyles.contact}>
            {contactParts.map((part, i) => (
              <span key={i}>
                {i > 0 && " | "}
                {part}
              </span>
            ))}
          </p>
        )}

        {bio && (
          <>
            <h2 className={resumeStyles.resumeH2}>Professional Summary</h2>
            <p className={resumeStyles.summary}>{bio}</p>
          </>
        )}

        {experiences.length > 0 && (
          <>
            <h2 className={resumeStyles.resumeH2}>Experience</h2>
            {experiences.map((exp, i) => (
              <div key={exp.company + i} className={resumeStyles.sectionBlock}>
                <h3 className={resumeStyles.resumeH3}>
                  {exp.position} | {exp.company}
                  {exp.location ? ` – ${exp.location}` : ""}
                </h3>
                <p className={resumeStyles.jobMeta}>
                  {exp.startDate}
                  {exp.endDate
                    ? ` – ${exp.endDate}`
                    : exp.isCurrent
                      ? " – Present"
                      : ""}
                </p>
                {exp.description && (
                  <p className={resumeStyles.summary}>{exp.description}</p>
                )}
                {exp.achievements?.length ? (
                  <ul>
                    {exp.achievements.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                ) : null}
                {exp.technologies?.length ? (
                  <p className={resumeStyles.tech}>
                    Technologies: {exp.technologies.join(", ")}
                  </p>
                ) : null}
              </div>
            ))}
          </>
        )}

        {academics.length > 0 && (
          <>
            <h2 className={resumeStyles.resumeH2}>Education</h2>
            {academics.map((a, i) => (
              <div key={i} className={resumeStyles.sectionBlock}>
                <h3 className={resumeStyles.resumeH3}>
                  {a.degree}
                  {a.field ? ` in ${a.field}` : ""}
                </h3>
                <p className={resumeStyles.jobMeta}>
                  {a.institution}
                  {a.startDate || a.endDate
                    ? ` | ${a.startDate ?? ""}${a.endDate ? ` – ${a.endDate}` : ""}`
                    : ""}
                </p>
                {a.description && (
                  <p className={resumeStyles.summary}>{a.description}</p>
                )}
              </div>
            ))}
          </>
        )}

        {(technicalSkills.length > 0 || softSkills.length > 0) && (
          <>
            <h2 className={resumeStyles.resumeH2}>Skills</h2>
            {technicalSkills.length > 0 && (
              <p>
                <strong>Technical:</strong>{" "}
                {technicalSkills.map((s) => s.name).join(", ")}
              </p>
            )}
            {softSkills.length > 0 && (
              <p>
                <strong>Soft:</strong>{" "}
                {softSkills.map((s) => s.name).join(", ")}
              </p>
            )}
          </>
        )}

        {projects.length > 0 && (
          <>
            <h2 className={resumeStyles.resumeH2}>Projects</h2>
            {projects.slice(0, 8).map((proj, i) => (
              <div key={i} className={resumeStyles.sectionBlock}>
                <h3 className={resumeStyles.resumeH3}>{proj.title}</h3>
                {proj.description && (
                  <p className={resumeStyles.summary}>{proj.description}</p>
                )}
                {proj.achievements?.length ? (
                  <ul>
                    {proj.achievements.slice(0, 3).map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                ) : null}
                {proj.technologies?.length ? (
                  <p className={resumeStyles.tech}>
                    {proj.technologies.join(", ")}
                  </p>
                ) : null}
              </div>
            ))}
          </>
        )}

        {certifications.length > 0 && (
          <>
            <h2 className={resumeStyles.resumeH2}>Certifications</h2>
            {certifications.map((c, i) => (
              <p key={i}>
                {c.name}
                {c.issuer ? ` | ${c.issuer}` : ""}
                {c.issueDate ? ` | ${c.issueDate}` : ""}
              </p>
            ))}
          </>
        )}

        {honors.length > 0 && (
          <>
            <h2 className={resumeStyles.resumeH2}>Honors &amp; Awards</h2>
            {honors.map((h, i) => (
              <p key={i}>
                {h.title}
                {h.issuer ? ` | ${h.issuer}` : ""}
                {h.date ? ` | ${h.date}` : ""}
              </p>
            ))}
          </>
        )}

        {stats.length > 0 && (
          <>
            <h2 className={resumeStyles.resumeH2}>Highlights</h2>
            <p>
              {stats
                .map((s) => `${s.label}: ${s.value}${s.unit ?? ""}`)
                .join(" · ")}
            </p>
          </>
        )}

        {languages.length > 0 && (
          <>
            <h2 className={resumeStyles.resumeH2}>Languages</h2>
            <p>
              {languages.map((l) => `${l.name} – ${l.proficiency}`).join(" | ")}
            </p>
          </>
        )}

        <p className={resumeStyles.printHint}>
          Use browser Print (Ctrl+P / Cmd+P) → Save as PDF for ATS-friendly
          output.
        </p>
      </div>
    </>
  );
};
