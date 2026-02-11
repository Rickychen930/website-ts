/**
 * Public Resume - Live data from profile API (ATS-friendly, print to PDF)
 * Replaces static resume.html so resume always shows current profile data.
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { downloadResumePdf } from "@/utils/resumePdfDownload";
import { getResumeAtsReport } from "@/utils/resumeAtsReport";
import {
  formatContactLabel,
  formatContactValue,
  formatExperienceCompanyLine,
  sortContactsForResume,
  trimResumeText,
} from "@/utils/resumeFormat";
import resumeStyles from "@/views/pages/Admin/AdminResume.module.css";
import styles from "./Resume.module.css";

export const Resume: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const [showAtsReport, setShowAtsReport] = useState(false);

  useEffect(() => {
    const base = profile ? `${profile.name} - Resume` : "Resume";
    document.title = `${base} | Portfolio`;
    return () => {
      document.title = "Portfolio";
    };
  }, [profile]);

  const handleDownloadPdf = () => {
    if (!profile) return;
    downloadResumePdf({
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

  const name = trimResumeText(profile.name) || "Your Name";
  const title = trimResumeText(profile.title);
  const location = trimResumeText(profile.location);
  const bio = trimResumeText(profile.bio);
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
  const contactParts = sortContactsForResume(
    contacts.filter((c) => trimResumeText(c.value)),
  ).map(
    (c) =>
      `${formatContactLabel(c.type, c.label)}: ${formatContactValue(c.type, c.value)}`,
  );

  const resumeData = {
    name: profile.name || "Your Name",
    title: profile.title || "",
    location: profile.location || "",
    bio: profile.bio || "",
    contacts,
    experiences,
    academics,
    projects,
    technicalSkills,
    softSkills,
    certifications,
    honors,
    stats,
    languages,
  };
  const atsReport = getResumeAtsReport(resumeData);

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
          Click the button below to download your resume as PDF (one click,
          under 2 MB).
        </p>

        <div className={resumeStyles.resumeActions}>
          <Button variant="primary" onClick={handleDownloadPdf}>
            Download PDF
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowAtsReport((v) => !v)}
            aria-expanded={showAtsReport}
            aria-controls="ats-report"
          >
            {showAtsReport ? "Sembunyikan" : "Tes Keterbacaan ATS"}
          </Button>
        </div>

        {showAtsReport && (
          <div
            id="ats-report"
            className={styles.atsReportSection}
            role="region"
            aria-labelledby="ats-report-heading"
          >
            <h2 id="ats-report-heading" className={styles.atsReportTitle}>
              Laporan Keterbacaan ATS
            </h2>
            <p className={styles.atsSummary}>{atsReport.summary}</p>
            <div className={styles.atsScoreRow}>
              <span className={styles.atsScoreLabel}>Skor:</span>
              <span className={styles.atsScoreValue}>
                {atsReport.score}/100
              </span>
              <span
                className={
                  atsReport.atsReadable
                    ? styles.atsBadgeOk
                    : styles.atsBadgeWarn
                }
              >
                {atsReport.atsReadable ? "Dapat dibaca ATS" : "Perlu perbaikan"}
              </span>
            </div>
            <ul className={styles.atsChecks}>
              {atsReport.checks.map((c) => (
                <li
                  key={c.id}
                  className={c.passed ? styles.atsCheckOk : styles.atsCheckFail}
                >
                  <span aria-hidden={true}>{c.passed ? "✓" : "✗"}</span>{" "}
                  {c.label}
                  {c.detail && (
                    <span className={styles.atsCheckDetail}> — {c.detail}</span>
                  )}
                </li>
              ))}
            </ul>
            {atsReport.recommendations.length > 0 && (
              <div className={styles.atsRecs}>
                <strong>Rekomendasi:</strong>
                <ul>
                  {atsReport.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
            <details className={styles.atsPreviewDetails}>
              <summary>Preview teks (seperti yang dibaca sistem)</summary>
              <pre className={styles.atsPreviewPre}>
                {atsReport.plainTextPreview}
              </pre>
            </details>
          </div>
        )}

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
                    {exp.position} |{" "}
                    {formatExperienceCompanyLine(exp.company, exp.location)}
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
                    {(() => {
                      const dates = [a.startDate, a.endDate]
                        .filter(Boolean)
                        .join(" – ");
                      return dates ? ` | ${dates}` : "";
                    })()}
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
                  .map((l) => `${l.name} (${l.proficiency})`)
                  .join(" | ")}
              </p>
            </>
          )}

          <p className={resumeStyles.printHint}>
            Use &quot;Download PDF&quot; above for ATS-friendly PDF, or browser
            Print (Ctrl+P / Cmd+P) to print.
          </p>
        </div>
      </section>
    </div>
  );
};
