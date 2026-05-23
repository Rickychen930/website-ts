/**
 * Experience — career timeline.
 */

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { LinkButton } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { PageHeroFx } from "@/components/PageHeroFx";
import { NexusSection } from "@/components/NexusSection";
import { ExperienceRoleCard } from "@/views/components/domain/ExperienceRoleCard";
import { EmptyStateArt } from "@/components/PortfolioVisuals";
import { TiltCard } from "@/components/TiltCard/TiltCard";
import { SplitText } from "@/components/SplitText/SplitText";
import { Magnetic } from "@/components/Magnetic/Magnetic";
import {
  getCurrentExperiences,
  sortExperiencesByRecency,
} from "@/utils/experienceSort";
import { SITE_BRAND_NAME } from "@/config/site-defaults";
import styles from "./Experience.module.css";

type ExperienceFilter = "all" | "current" | "past";

const fadeUp = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
      };

function computeCareerYears(
  experiences: ReadonlyArray<{ startDate: string }>,
): number {
  const starts = experiences
    .map((e) => new Date(e.startDate).getTime())
    .filter((t) => !Number.isNaN(t));
  if (starts.length === 0) return 0;
  const earliest = Math.min(...starts);
  const years = (Date.now() - earliest) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.max(1, Math.round(years));
}

export const Experience: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const reduced = useReducedMotion() ?? false;
  const [filter, setFilter] = useState<ExperienceFilter>("all");

  useSEO({
    title: profile
      ? `${profile.name} — Experience`
      : `${SITE_BRAND_NAME} — Experience`,
    description:
      profile?.bio ||
      "Work experience timeline: software engineering and development roles.",
    keywords: "work experience, career, software engineer, timeline",
    type: "profile",
  });

  const sorted = useMemo(
    () => (profile ? sortExperiencesByRecency(profile.experiences) : []),
    [profile],
  );

  const currentRoles = useMemo(
    () => (profile ? getCurrentExperiences(profile.experiences) : []),
    [profile],
  );

  const filtered = useMemo(() => {
    if (filter === "current") return sorted.filter((e) => e.isCurrent);
    if (filter === "past") return sorted.filter((e) => !e.isCurrent);
    return sorted;
  }, [sorted, filter]);

  if (isLoading) {
    return <Loading fullScreen message="Loading experience..." />;
  }

  if (error || !profile) {
    return (
      <PageError
        title="Failed to load experience"
        message={error?.message || "Please try again later."}
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  const hasExperiences = sorted.length > 0;
  const currentCount = currentRoles.length;
  const companyCount = new Set(
    sorted.map((e) => e.company.trim()).filter(Boolean),
  ).size;
  const careerYears = computeCareerYears(sorted);
  const pastRoles = filtered.filter((e) => !e.isCurrent);

  const filterTabs: {
    key: ExperienceFilter;
    label: string;
    count: number;
  }[] = [
    { key: "all", label: "All roles", count: sorted.length },
    { key: "current", label: "Current", count: currentCount },
    { key: "past", label: "Past", count: sorted.length - currentCount },
  ];

  return (
    <motion.div
      className={`pf-page ${styles.page}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="pf-hero" aria-labelledby="experience-hero-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <PageHeroFx />
        <div className={`pf-hero-inner ${styles.heroInner}`}>
          <div className="pf-hero-main">
            <motion.div
              className={`pf-hero-copy ${styles.heroCopy}`}
              {...fadeUp(reduced)}
            >
              <p className="pf-eyebrow">Career</p>
              <h1 id="experience-hero-title" className="pf-hero-title">
                <SplitText text="Where I've built" stagger={0.028} />
              </h1>
              <p className={`pf-hero-lead ${styles.heroLead}`}>
                IT intern at Decode Capital (AI chatbot & summariser on PHP /
                WordPress), founder at Web Architech, and earlier engineering at
                Samsung R&D and Apple Developer Academy.
              </p>
            </motion.div>

            {hasExperiences ? (
              <motion.ul
                className={`pf-hero-stats ${currentCount > 0 ? "pf-hero-stats--four" : "pf-hero-stats--three"} ${styles.heroStatsBar}`}
                aria-label="Career overview"
                {...fadeUp(reduced, 0.08)}
              >
                <li>
                  <TiltCard className={styles.statCard} maxTilt={8}>
                    <span className="pf-stat-value">{sorted.length}</span>
                    <span className="pf-stat-label">Roles</span>
                  </TiltCard>
                </li>
                <li>
                  <TiltCard className={styles.statCard} maxTilt={8}>
                    <span className="pf-stat-value">{companyCount}</span>
                    <span className="pf-stat-label">Companies</span>
                  </TiltCard>
                </li>
                <li>
                  <TiltCard className={styles.statCard} maxTilt={8}>
                    <span className="pf-stat-value">{careerYears}+</span>
                    <span className="pf-stat-label">Years</span>
                  </TiltCard>
                </li>
                {currentCount > 0 ? (
                  <li>
                    <TiltCard className={styles.statCard} maxTilt={8}>
                      <span className="pf-stat-value">{currentCount}</span>
                      <span className="pf-stat-label">Active now</span>
                    </TiltCard>
                  </li>
                ) : null}
              </motion.ul>
            ) : null}
          </div>
        </div>
      </header>

      <div className={`pf-workspace ${styles.workspace}`}>
        <div className={`pf-workspace-inner ${styles.workspaceInner}`}>
          {!hasExperiences ? (
            <div className={styles.empty} role="status">
              <div className={styles.emptyArt} aria-hidden="true">
                <EmptyStateArt
                  variant="experience"
                  className={styles.emptyArtSvg}
                />
              </div>
              <p className={styles.emptyText}>No experience entries yet.</p>
              <div className={styles.emptyActions}>
                <LinkButton to="/projects" variant="outline">
                  View projects
                </LinkButton>
                <LinkButton to="/contact" variant="primary">
                  Get in touch
                </LinkButton>
              </div>
            </div>
          ) : (
            <NexusSection
              id="experience-timeline"
              eyebrow="Timeline"
              title={
                <>
                  Career <span className="nx-gradient-text">journey</span>
                </>
              }
              lead={`${sorted.length} roles across ${companyCount} companies — filter by current or past.`}
            >
              <div
                className={`nx-tabs ${styles.tabs}`}
                role="tablist"
                aria-label="Filter experience"
              >
                {filterTabs.map(({ key, label, count }) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={filter === key}
                    className={`nx-tab ${filter === key ? "nx-tab-active" : ""} ${styles.tab}`}
                    onClick={() => setFilter(key)}
                  >
                    {label}
                    <span className={styles.tabCount}>{count}</span>
                  </button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className={styles.filterEmpty} role="status">
                  <p>No roles match this filter.</p>
                  <button
                    type="button"
                    className={styles.tab}
                    onClick={() => setFilter("all")}
                  >
                    Show all roles
                  </button>
                </div>
              ) : (
                <div className={styles.panel}>
                  {filter !== "past" && currentRoles.length > 0 ? (
                    <section aria-label="Current roles">
                      <h2 className={styles.sectionLabel}>Current</h2>
                      <ul className={styles.currentList}>
                        {currentRoles.map((role) => (
                          <li key={role.id}>
                            <ExperienceRoleCard experience={role} emphasis />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {filter !== "current" && pastRoles.length > 0 ? (
                    <section aria-label="Earlier roles">
                      <h2 className={styles.sectionLabel}>
                        {filter === "past" ? "Past roles" : "Earlier"}
                      </h2>
                      <ol className={styles.timeline}>
                        {pastRoles.map((experience) => {
                          const year = new Date(
                            experience.startDate,
                          ).getFullYear();
                          return (
                            <li
                              key={experience.id}
                              className={styles.timelineEntry}
                            >
                              <div
                                className={styles.timelineRail}
                                aria-hidden="true"
                              >
                                <span className={styles.timelineYear}>
                                  {year}
                                </span>
                                <span className={styles.timelineLine} />
                                <span className={styles.timelineDot} />
                              </div>
                              <ExperienceRoleCard experience={experience} />
                            </li>
                          );
                        })}
                      </ol>
                    </section>
                  ) : null}
                </div>
              )}
            </NexusSection>
          )}
        </div>
      </div>

      <section
        className={`pf-cta ${styles.cta}`}
        aria-labelledby="experience-cta-title"
      >
        <div className="page-cta-band">
          <h2 id="experience-cta-title" className={styles.ctaTitle}>
            Let&apos;s build together
          </h2>
          <p className="page-cta-body">
            Interested in my background? I&apos;m open to roles and
            collaborations.
          </p>
          <div className="page-cta-actions">
            <Magnetic strength={0.2}>
              <LinkButton to="/contact" variant="primary" size="lg">
                Contact me
              </LinkButton>
            </Magnetic>
            <Magnetic strength={0.16}>
              <LinkButton to="/resume" variant="outline" size="lg">
                View resume
              </LinkButton>
            </Magnetic>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
