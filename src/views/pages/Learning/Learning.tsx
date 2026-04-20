/**
 * Learning Page - Curriculum and learning resources
 * Hero intro + section cards (aligned with Section/Detail design). Cards link to section pages.
 */

import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EmptyStateArt } from "@/components/PortfolioVisuals";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { LinkButton } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import type { LearningSection as LearningSectionType } from "@/types/domain";
import { getSectionTheme } from "./sectionThemes";
import { sitePageTitle } from "@/config/site-defaults";
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
      : sitePageTitle("Learning"),
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
        label="Curriculum"
        title="Learning"
        subtitle="Structured topics and resources will appear here once published."
        headerAlign="start"
        surface="hero"
      >
        <div className={styles.wrapper}>
          <div className={styles.trackAccent} aria-hidden="true" />
          <div className={styles.emptyState} role="status">
            <div className={styles.emptyArt} aria-hidden="true">
              <EmptyStateArt
                variant="learning"
                className={styles.emptyArtSvg}
              />
            </div>
            <Typography
              variant="h3"
              weight="semibold"
              as="h2"
              className={styles.emptyStateTitle}
            >
              No sections yet
            </Typography>
            <Typography variant="body" color="secondary">
              No learning sections published yet. Check back later.
            </Typography>
            <div className={styles.emptyStateActions}>
              <Link to="/" className={styles.emptyStateLink}>
                Back to Home
              </Link>
              <LinkButton
                to="/contact"
                variant="primary"
                size="md"
                aria-label="Get in touch"
              >
                Get in Touch
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="learning"
      tabIndex={-1}
      label="Curriculum"
      title="Learning"
      subtitle="Interview prep, systems thinking, and deep dives — pick a track to open topics."
      info={`${sections.length} section${sections.length !== 1 ? "s" : ""} published`}
      headerAlign="start"
      surface="hero"
    >
      <div className={styles.wrapper}>
        <div className={styles.trackAccent} aria-hidden="true" />
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
