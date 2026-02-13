/**
 * Learning Page - Curriculum and learning resources
 * Cards link to section pages where user selects a topic, then goes to detail
 */

import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Card } from "@/views/components/ui/Card";
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
        title="Learning"
        subtitle="Structured topics and resources"
      >
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">
            <svg
              width="64"
              height="64"
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
          <Typography variant="body" color="secondary">
            No learning sections published yet. Check back later.
          </Typography>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="learning"
      label="Curriculum"
      title="Learning"
      subtitle="Structured topics: algorithms, frameworks, and best practices."
      info="Select a section to view topics, then open a topic for full details."
      variant="alt"
    >
      {sections.length > 1 && (
        <nav className={styles.quickNav} aria-label="Jump to section">
          <Typography
            variant="small"
            weight="semibold"
            className={styles.quickNavLabel}
          >
            Jump to:
          </Typography>
          <ul className={styles.quickNavList}>
            {sections.map((sec) =>
              sec.slug ? (
                <li key={sec.id}>
                  <Link
                    to={`/learning/${sec.slug}`}
                    className={styles.quickNavLink}
                  >
                    {sec.title}
                  </Link>
                </li>
              ) : (
                <li key={sec.id}>
                  <span className={styles.quickNavPlain}>{sec.title}</span>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}
      <div className={styles.grid}>
        {sections.map((sec, sectionIndex) => (
          <LearningSectionCard
            key={sec.id}
            section={sec}
            sectionIndex={sectionIndex + 1}
            totalSections={sections.length}
          />
        ))}
      </div>
      {sections.length > 6 && (
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
    </Section>
  );
};

const TRUNCATE_LENGTH = 120;

function truncateDescription(
  text: string,
  maxLen: number = TRUNCATE_LENGTH,
): string {
  if (!text || text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "…";
}

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
  const sectionUrl = section.slug ? `/learning/${section.slug}` : "#";
  const theme = section.slug ? getSectionTheme(section.slug) : null;

  return (
    <ScrollReveal direction="up">
      <Link
        to={sectionUrl}
        className={styles.cardLink}
        aria-label={`Open ${section.title}, ${items.length} topics`}
      >
        <Card
          id={section.slug ? `section-${section.slug}` : undefined}
          variant="elevated"
          padding="none"
          className={styles.card}
        >
          {/* Gradient banner with icon */}
          {theme && (
            <div
              className={styles.cardBanner}
              style={{ background: theme.gradient }}
            >
              <span className={styles.cardBannerIcon} aria-hidden="true">
                {theme.icon}
              </span>
            </div>
          )}
          <header className={styles.cardHeader}>
            <div className={styles.cardTitleRow}>
              <span className={styles.sectionIndex} aria-hidden="true">
                {sectionIndex}/{totalSections}
              </span>
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
              <Typography
                variant="body"
                color="secondary"
                className={styles.cardDescription}
              >
                {shortDescription}
              </Typography>
            )}
            <span className={styles.seeMoreBtn}>
              View topics
              <span className={styles.seeMoreArrow} aria-hidden="true">
                →
              </span>
            </span>
          </header>
        </Card>
      </Link>
    </ScrollReveal>
  );
};
