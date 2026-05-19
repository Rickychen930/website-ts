/**
 * Resume — live preview, PDF download, ATS report.
 */

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { Button, LinkButton } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { PageHeroVisual } from "@/views/components/layout/PageHeroVisual";
import { downloadResumePdf } from "@/utils/resumePdfDownload";
import { getResumeAtsReport } from "@/utils/resumeAtsReport";
import { sortExperiencesByRecency } from "@/utils/experienceSort";
import {
  formatContactLabel,
  formatContactValue,
  formatExperienceCompanyLine,
  sortContactsForResume,
  trimResumeText,
} from "@/utils/resumeFormat";
import {
  SITE_BRAND_NAME,
  SITE_DEFAULT_DESCRIPTION,
} from "@/config/site-defaults";
import type { Profile } from "@/types/domain";
import styles from "./Resume.module.css";

const fadeUp = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
      };

function countFilledResumeSections(profile: Profile): number {
  let count = 0;
  if (trimResumeText(profile.bio)) count += 1;
  if ((profile.experiences?.length ?? 0) > 0) count += 1;
  if ((profile.academics?.length ?? 0) > 0) count += 1;
  if ((profile.projects?.length ?? 0) > 0) count += 1;
  if ((profile.technicalSkills?.length ?? 0) > 0) count += 1;
  if ((profile.certifications?.length ?? 0) > 0) count += 1;
  return count;
}

export const Resume: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const reduced = useReducedMotion() ?? false;
  const [showAtsReport, setShowAtsReport] = useState(false);

  useSEO({
    title: profile ? `${profile.name} — Resume` : `${SITE_BRAND_NAME} — Resume`,
    description:
      profile?.bio?.slice(0, 160) ||
      "Download PDF resume and ATS-friendly preview synced with portfolio data.",
    keywords: "resume, CV, ATS, PDF, portfolio",
    type: "website",
  });

  const resumeView = useMemo(() => {
    if (!profile) return null;
    const sortedExperiences = sortExperiencesByRecency(profile.experiences);
    const currentCount = sortedExperiences.filter((e) => e.isCurrent).length;
    const contacts = profile.contacts ?? [];
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
      experiences: profile.experiences ?? [],
      academics: profile.academics ?? [],
      projects: profile.projects ?? [],
      technicalSkills: profile.technicalSkills ?? [],
      softSkills: profile.softSkills ?? [],
      certifications: profile.certifications ?? [],
      honors: profile.honors ?? [],
      stats: profile.stats ?? [],
      languages: profile.languages ?? [],
    };

    return {
      name: trimResumeText(profile.name) || "Your Name",
      title: trimResumeText(profile.title),
      location: trimResumeText(profile.location),
      bio: trimResumeText(profile.bio),
      contactParts,
      experiences: profile.experiences ?? [],
      academics: profile.academics ?? [],
      projects: profile.projects ?? [],
      technicalSkills: profile.technicalSkills ?? [],
      softSkills: profile.softSkills ?? [],
      certifications: profile.certifications ?? [],
      honors: profile.honors ?? [],
      stats: profile.stats ?? [],
      languages: profile.languages ?? [],
      sortedExperiences,
      currentCount,
      filledSections: countFilledResumeSections(profile),
      atsReport: getResumeAtsReport(resumeData),
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
    return <Loading fullScreen message="Loading resume…" />;
  }

  if (error && !profile) {
    return (
      <PageError
        title="Couldn't load resume"
        message={error.message}
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  if (!profile || !resumeView) {
    return (
      <PageError
        title="Resume unavailable"
        message="No profile data is available yet."
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  const {
    name,
    title,
    location,
    bio,
    contactParts,
    experiences,
    academics,
    projects,
    technicalSkills,
    softSkills,
    certifications,
    honors,
    stats,
    languages,
    sortedExperiences,
    currentCount,
    filledSections,
    atsReport,
  } = resumeView;

  return (
    <motion.div
      className={`pf-page ${styles.resume}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="pf-hero" aria-labelledby="resume-hero-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <div
          className={`pf-hero-inner pf-hero-inner--visual ${styles.heroInner}`}
        >
          <div className="pf-hero-main">
            <motion.div
              className={`pf-hero-copy ${styles.heroContent}`}
              {...fadeUp(reduced)}
            >
              <p className="pf-eyebrow">Document</p>
              <h1 id="resume-hero-title" className="pf-hero-title">
                Resume
              </h1>
              <p className={`pf-hero-lead ${styles.heroLead}`}>
                Synced with your portfolio — Decode Capital, Web Architech, and
                prior roles. Download PDF or run ATS checks before you apply.
                {atsReport.atsReadable
                  ? " Profile data is ATS-parseable."
                  : " Run the ATS report before applying."}
              </p>
              <div className={styles.toolbar}>
                <Button variant="primary" size="lg" onClick={handleDownloadPdf}>
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAtsReport((v) => !v)}
                  aria-expanded={showAtsReport}
                  aria-controls="ats-report"
                >
                  {showAtsReport ? "Hide ATS report" : "ATS readability test"}
                </Button>
              </div>
            </motion.div>

            <ul
              className={`pf-hero-stats pf-hero-stats--four ${styles.heroStatsBar}`}
              aria-label="Resume overview"
            >
              <li>
                <span className="pf-stat-value">{filledSections}</span>
                <span className="pf-stat-label">Sections filled</span>
              </li>
              <li>
                <span className="pf-stat-value">
                  {sortedExperiences.length}
                </span>
                <span className="pf-stat-label">Roles listed</span>
              </li>
              <li>
                <span className="pf-stat-value">{currentCount}</span>
                <span className="pf-stat-label">Current roles</span>
              </li>
              <li>
                <span className="pf-stat-value">{atsReport.score}</span>
                <span className="pf-stat-label">ATS score</span>
              </li>
            </ul>
          </div>

          <PageHeroVisual pageKey="resume" priority />
        </div>
      </header>

      <div className="pf-workspace">
        <div
          className={`pf-workspace-inner pf-workspace-inner--narrow ${styles.workspaceInner}`}
        >
          {showAtsReport ? (
            <section
              id="ats-report"
              className={styles.atsReport}
              aria-labelledby="ats-report-heading"
            >
              <h2 id="ats-report-heading" className={styles.atsTitle}>
                ATS readability report
              </h2>
              <p className={styles.atsSummary}>{atsReport.summary}</p>
              <div className={styles.atsScoreRow}>
                <span className={styles.atsScoreLabel}>Score:</span>
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
                  {atsReport.atsReadable
                    ? "ATS-parseable"
                    : "Needs improvement"}
                </span>
              </div>
              <ul className={styles.atsChecks}>
                {atsReport.checks.map((c) => (
                  <li
                    key={c.id}
                    className={
                      c.passed ? styles.atsCheckOk : styles.atsCheckFail
                    }
                  >
                    <span aria-hidden>{c.passed ? "✓" : "✗"}</span> {c.label}
                    {c.detail ? (
                      <span className={styles.atsCheckDetail}>
                        {" "}
                        — {c.detail}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
              {atsReport.recommendations.length > 0 ? (
                <div className={styles.atsRecs}>
                  <strong>Recommendations:</strong>
                  <ul>
                    {atsReport.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <details className={styles.atsPreviewDetails}>
                <summary>Preview text (as read by ATS)</summary>
                <pre className={styles.atsPreviewPre}>
                  {atsReport.plainTextPreview}
                </pre>
              </details>
            </section>
          ) : null}

          <article className={styles.document} aria-label="Resume preview">
            <h2 className={styles.documentName}>{name}</h2>
            {(title || location) && (
              <p className={styles.documentTagline}>
                {title ? <strong>{title}</strong> : null}
                {title && location ? <br /> : null}
                {location}
              </p>
            )}
            {contactParts.length > 0 ? (
              <p className={styles.documentContact}>
                {contactParts.map((part, i) => (
                  <span key={i}>
                    {i > 0 ? " | " : null}
                    {part}
                  </span>
                ))}
              </p>
            ) : null}

            {bio ? (
              <>
                <h3 className={styles.documentH2}>Professional Summary</h3>
                <p className={styles.summary}>{bio}</p>
              </>
            ) : null}

            {experiences.length > 0 ? (
              <>
                <h3 className={styles.documentH2}>Experience</h3>
                {experiences.map((exp, i) => (
                  <div
                    key={exp.id ?? `${exp.company}-${i}`}
                    className={styles.sectionBlock}
                  >
                    <h4 className={styles.documentH3}>
                      {exp.position} |{" "}
                      {formatExperienceCompanyLine(exp.company, exp.location)}
                    </h4>
                    <p className={styles.jobMeta}>
                      {exp.startDate}
                      {exp.endDate
                        ? ` – ${exp.endDate}`
                        : exp.isCurrent
                          ? " – Present"
                          : ""}
                    </p>
                    {exp.description ? (
                      <p className={styles.summary}>{exp.description}</p>
                    ) : null}
                    {exp.achievements?.length ? (
                      <ul>
                        {exp.achievements.map((a, j) => (
                          <li key={j}>{a}</li>
                        ))}
                      </ul>
                    ) : null}
                    {exp.technologies?.length ? (
                      <p className={styles.tech}>
                        Technologies: {exp.technologies.join(", ")}
                      </p>
                    ) : null}
                  </div>
                ))}
              </>
            ) : null}

            {academics.length > 0 ? (
              <>
                <h3 className={styles.documentH2}>Education</h3>
                {academics.map((a, i) => (
                  <div key={a.id ?? i} className={styles.sectionBlock}>
                    <h4 className={styles.documentH3}>
                      {a.degree}
                      {a.field ? ` in ${a.field}` : ""}
                    </h4>
                    <p className={styles.jobMeta}>
                      {a.institution}
                      {[a.startDate, a.endDate].filter(Boolean).join(" – ")
                        ? ` | ${[a.startDate, a.endDate].filter(Boolean).join(" – ")}`
                        : ""}
                    </p>
                    {a.description ? (
                      <p className={styles.summary}>{a.description}</p>
                    ) : null}
                  </div>
                ))}
              </>
            ) : null}

            {technicalSkills.length > 0 || softSkills.length > 0 ? (
              <>
                <h3 className={styles.documentH2}>Skills</h3>
                {technicalSkills.length > 0 ? (
                  <p>
                    <strong>Technical:</strong>{" "}
                    {technicalSkills.map((s) => s.name).join(", ")}
                  </p>
                ) : null}
                {softSkills.length > 0 ? (
                  <p>
                    <strong>Soft:</strong>{" "}
                    {softSkills.map((s) => s.name).join(", ")}
                  </p>
                ) : null}
              </>
            ) : null}

            {projects.length > 0 ? (
              <>
                <h3 className={styles.documentH2}>Projects</h3>
                {projects.slice(0, 8).map((proj, i) => (
                  <div key={proj.id ?? i} className={styles.sectionBlock}>
                    <h4 className={styles.documentH3}>{proj.title}</h4>
                    {proj.description ? (
                      <p className={styles.summary}>{proj.description}</p>
                    ) : null}
                    {proj.technologies?.length ? (
                      <p className={styles.tech}>
                        {proj.technologies.join(", ")}
                      </p>
                    ) : null}
                  </div>
                ))}
              </>
            ) : null}

            {certifications.length > 0 ? (
              <>
                <h3 className={styles.documentH2}>Certifications</h3>
                {certifications.map((c, i) => (
                  <p key={c.id ?? i}>
                    {c.name}
                    {c.issuer ? ` | ${c.issuer}` : ""}
                    {c.issueDate ? ` | ${c.issueDate}` : ""}
                  </p>
                ))}
              </>
            ) : null}

            {honors.length > 0 ? (
              <>
                <h3 className={styles.documentH2}>Honors &amp; Awards</h3>
                {honors.map((h, i) => (
                  <p key={h.id ?? i}>
                    {h.title}
                    {h.issuer ? ` | ${h.issuer}` : ""}
                    {h.date ? ` | ${h.date}` : ""}
                  </p>
                ))}
              </>
            ) : null}

            {stats.length > 0 ? (
              <>
                <h3 className={styles.documentH2}>Highlights</h3>
                <p>
                  {stats
                    .map((s) => `${s.label}: ${s.value}${s.unit ?? ""}`)
                    .join(" · ")}
                </p>
              </>
            ) : null}

            {languages.length > 0 ? (
              <>
                <h3 className={styles.documentH2}>Languages</h3>
                <p>
                  {languages
                    .map((l) => `${l.name} (${l.proficiency})`)
                    .join(" | ")}
                </p>
              </>
            ) : null}

            <p className={styles.printHint}>
              Use Download PDF for an ATS-friendly file, or browser print
              (Ctrl+P / Cmd+P).
            </p>
          </article>
        </div>
      </div>

      <section
        className={`pf-cta ${styles.finalCta}`}
        aria-labelledby="resume-cta-title"
      >
        <div className="page-cta-band">
          <h2 id="resume-cta-title" className={styles.ctaTitle}>
            Ready to connect?
          </h2>
          <p className="page-cta-body">{SITE_DEFAULT_DESCRIPTION}</p>
          <div className="page-cta-actions">
            <LinkButton to="/contact" variant="primary" size="lg">
              Get in touch
            </LinkButton>
            <LinkButton to="/projects" variant="outline" size="lg">
              View projects
            </LinkButton>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
