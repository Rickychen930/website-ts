/**
 * Public Resume - Live data from profile API (ATS-friendly, print to PDF)
 * Replaces static resume.html so resume always shows current profile data.
 */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { printResumeToPdf } from "@/utils/resumePrint";
import resumeStyles from "@/views/pages/Admin/AdminResume.module.css";
import styles from "./Resume.module.css";

export const Resume: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();

  useEffect(() => {
    const base = profile ? `${profile.name} - Resume` : "Resume";
    document.title = `${base} | Portfolio`;
    return () => {
      document.title = "Portfolio";
    };
  }, [profile]);

  const handlePrint = () => {
    if (!profile) return;
    printResumeToPdf({
      name: profile.name || "Your Name",
      title: profile.title || "",
      location: profile.location || "",
      bio: profile.bio || "",
      contacts: profile.contacts ?? [],
      experiences: profile.experiences ?? [],
      academics: profile.academics ?? [],
      projects: profile.projects ?? [],
      technicalSkills: profile.technicalSkills ?? [],
      softSkills: profile.softSkills ?? [],
      certifications: profile.certifications ?? [],
      honors: profile.honors ?? [],
      stats: profile.stats ?? [],
      languages: profile.languages ?? [],
    });
  };

  if (isLoading && !profile) {
    return (
      <div className={styles.resumePage}>
        <Loading fullScreen message="Loading resume…" />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className={styles.resumePage}>
        <section
          className={styles.section}
          aria-labelledby="resume-error-heading"
        >
          <Link to="/" className={styles.backLink}>
            ← Back to home
          </Link>
          <h1 id="resume-error-heading" className={styles.title}>
            Resume
          </h1>
          <p className={styles.error} role="alert">
            {error.message}
          </p>
          <Button variant="secondary" onClick={() => refetch()}>
            Retry
          </Button>
        </section>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.resumePage}>
        <section className={styles.section} aria-labelledby="resume-no-data">
          <Link to="/" className={styles.backLink}>
            ← Back to home
          </Link>
          <h1 id="resume-no-data" className={styles.title}>
            Resume
          </h1>
          <p className={styles.intro}>
            No profile data available. The profile may still be loading or could
            not be loaded.
          </p>
          <Button variant="secondary" onClick={() => refetch()}>
            Retry
          </Button>
        </section>
      </div>
    );
  }

  const name = profile.name || "Your Name";
  const title = profile.title || "";
  const location = profile.location || "";
  const bio = profile.bio || "";
  const contacts = profile.contacts ?? [];
  const experiences = profile.experiences ?? [];
  const academics = profile.academics ?? [];
  const projects = profile.projects ?? [];
  const technicalSkills = profile.technicalSkills ?? [];
  const softSkills = profile.softSkills ?? [];
  const certifications = profile.certifications ?? [];
  const honors = profile.honors ?? [];
  const stats = profile.stats ?? [];
  const languages = profile.languages ?? [];
  const contactParts = contacts
    .filter((c) => c.value)
    .map((c) => `${c.label || c.type}: ${c.value}`);

  return (
    <div className={styles.resumePage}>
      <section className={styles.section} aria-labelledby="resume-heading">
        <Link to="/" className={styles.backLink}>
          ← Back to home
        </Link>
        <h1 id="resume-heading" className={styles.title}>
          Resume
        </h1>
        <p className={styles.intro}>
          Click the button below. A new tab will open with your resume—then
          choose <strong>Save as PDF</strong> or{" "}
          <strong>Microsoft Print to PDF</strong> in the print dialog to
          download. File size is kept under 2 MB.
        </p>

        <div className={resumeStyles.resumeActions}>
          <Button variant="primary" onClick={handlePrint}>
            Print / Save as PDF
          </Button>
        </div>

        <div className={resumeStyles.resumePrintArea}>
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
                <div
                  key={exp.id ?? exp.company + i}
                  className={resumeStyles.sectionBlock}
                >
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
                <div key={a.id ?? i} className={resumeStyles.sectionBlock}>
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
                <div key={proj.id ?? i} className={resumeStyles.sectionBlock}>
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
                <p key={c.id ?? i}>
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
                <p key={h.id ?? i}>
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
                {languages
                  .map((l) => `${l.name} – ${l.proficiency}`)
                  .join(" | ")}
              </p>
            </>
          )}

          <p className={resumeStyles.printHint}>
            Use browser Print (Ctrl+P / Cmd+P) → Save as PDF for ATS-friendly
            output.
          </p>
        </div>
      </section>
    </div>
  );
};
