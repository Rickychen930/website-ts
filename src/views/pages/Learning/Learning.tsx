/**
 * Learning Page - Curriculum and learning resources
 * Hero intro + section cards (aligned with Section/Detail design). Cards link to section pages.
 */

import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import type { LearningSection as LearningSectionType } from "@/types/domain";
import { getSectionTheme } from "./sectionThemes";
import styles from "./Learning.module.css";

function scrollToLearningTop() {
  const el = document.getElementById("learning");
  if (el) {
    const preferReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: preferReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }
}

const TRUNCATE_LENGTH = 120;

function truncateDescription(
  text: string,
  maxLen: number = TRUNCATE_LENGTH,
): string {
  if (!text || text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "…";
}

export const Learning: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();

  useSEO({
    title: profile
      ? `${profile.name} - Learning | Portfolio`
      : "Learning | Ricky Chen Portfolio",
    description:
      "Structured curriculum for software engineer interviews: competitive programming, React, Node.js, database, CS theory, OS & concurrency, computer networks, system design, security, AI/ML, interview preparation (coding, OOD, behavioral), and more.",
    keywords:
      "learning, curriculum, algorithms, React, Node.js, SQL, system design, interview preparation, competitive programming, OS, networks, machine learning, programming",
    type: "profile",
  });

  const sections = profile ? profile.getPublishedLearningSections() : [];

  if (isLoading) {
    return <Loading fullScreen message="Loading curriculum..." />;
  }

  if (error || !profile) {
    return (
      <PageError
        title="Failed to load"
        message={
          error?.message || "Something went wrong. Please try again shortly."
        }
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  if (sections.length === 0) {
    return (
      <Section
        id="learning"
        tabIndex={-1}
        title="Learning"
        subtitle="Structured topics and resources"
        variant="alt"
      >
        <div className={styles.wrapper}>
          <div className={styles.emptyState} role="status">
            <span className={styles.emptyIcon} aria-hidden="true">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M8 7h8" />
                <path d="M8 11h8" />
                <path d="M8 15h4" />
              </svg>
            </span>
            <Typography
              variant="h3"
              weight="semibold"
              as="h2"
              className={styles.emptyStateTitle}
            >
              No sections yet
            </Typography>
            <Typography variant="body" color="secondary">
              No learning sections published yet. Run the seed script or check
              back later.
            </Typography>
            <Link to="/" className={styles.emptyStateLink}>
              Back to Home
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="learning" tabIndex={-1} variant="alt">
      <div className={styles.wrapper}>
        <header className={styles.hero}>
          <div className={styles.heroGradient} aria-hidden="true" />
          <div className={styles.heroPattern} aria-hidden="true" />
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>Curriculum</span>
            <Typography
              variant="h1"
              weight="bold"
              as="h1"
              className={styles.heroTitle}
            >
              Learning
            </Typography>
            <Typography variant="body" as="p" className={styles.heroSubtitle}>
              Structured topics: algorithms, frameworks, and best practices.
              Select a section to view topics.
            </Typography>
            <div className={styles.heroMeta}>
              <span className={styles.heroSectionCount}>
                {sections.length} section{sections.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </header>

        <ul className={styles.grid} aria-label="Learning sections">
          {sections.map((sec, sectionIndex) => (
            <li
              key={sec.id}
              className={styles.gridItem}
              style={
                {
                  animationDelay: `${(sectionIndex - 1) * 60}ms`,
                } as React.CSSProperties
              }
            >
              <LearningSectionCard
                section={sec}
                sectionIndex={sectionIndex + 1}
                totalSections={sections.length}
              />
            </li>
          ))}
        </ul>

        {sections.length >= 4 && (
          <div className={styles.footerActions}>
            <button
              type="button"
              onClick={scrollToLearningTop}
              className={styles.backToTop}
              aria-label="Scroll back to top of Learning"
            >
              <Typography variant="small" weight="medium" as="span">
                Back to top
              </Typography>
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

interface LearningSectionCardProps {
  section: LearningSectionType;
  sectionIndex: number;
  totalSections: number;
}

const LearningSectionCard: React.FC<LearningSectionCardProps> = ({
  section,
  sectionIndex,
  totalSections,
}) => {
  const items = section.items ?? [];
  const shortDescription = section.description
    ? truncateDescription(section.description)
    : null;
  const sectionUrl = section.slug ? `/learning/${section.slug}` : "/learning";
  const theme = section.slug ? getSectionTheme(section.slug) : null;

  return (
    <ScrollReveal direction="up" delay={(sectionIndex - 1) * 80}>
      <Link
        to={sectionUrl}
        className={styles.cardLink}
        aria-label={`Open ${section.title}, ${items.length} topics`}
      >
        <article className={styles.card}>
          {theme && (
            <div
              className={styles.cardBanner}
              style={{ background: theme.gradient }}
            >
              <span className={styles.cardBannerIcon} aria-hidden="true">
                {theme.icon}
              </span>
              <span className={styles.sectionIndex} aria-hidden="true">
                {sectionIndex}/{totalSections}
              </span>
            </div>
          )}
          <div className={styles.cardBody}>
            <div className={styles.cardTitleRow}>
              <Typography
                variant="h3"
                weight="semibold"
                as="h3"
                className={styles.cardTitle}
              >
                {section.title}
              </Typography>
              {section.slug === "how-to-learn" && (
                <span className={styles.startHereBadge}>Start here</span>
              )}
              {items.length > 0 && (
                <span className={styles.sectionBadge}>
                  {items.length} topics
                </span>
              )}
            </div>
            {shortDescription && (
              <p className={styles.cardDescription}>{shortDescription}</p>
            )}
            <div className={styles.cardFooter}>
              <span className={styles.seeMoreBtn}>
                View topics
                <span className={styles.seeMoreArrow} aria-hidden="true">
                  →
                </span>
              </span>
            </div>
          </div>
        </article>
      </Link>
    </ScrollReveal>
  );
};
