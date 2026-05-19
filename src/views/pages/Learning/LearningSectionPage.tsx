/**
 * Learning Section Page - List of topics in a section
 * Route: /learning/:sectionSlug
 * User selects a topic here, then goes to detail page
 */

import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { Typography } from "@/views/components/ui/Typography";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import type { LearningTopicItem } from "@/types/domain";
import { EmptyStateArt } from "@/components/PortfolioVisuals";
import { getSectionTheme, isPlaceholderImage } from "./sectionThemes";
import styles from "./LearningSectionPage.module.css";

function scrollToSectionTop() {
  const el = document.getElementById("learning-section");
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

interface TopicLinkProps {
  item: LearningTopicItem;
  sectionSlug: string;
  sectionTheme: ReturnType<typeof getSectionTheme>;
  index: number;
}

const TopicLink: React.FC<TopicLinkProps> = ({
  item,
  sectionSlug,
  sectionTheme,
  index,
}) => {
  const detailUrl = `/learning/${sectionSlug}/${encodeURIComponent(item.id)}`;
  const useImage = item.imageUrl && !isPlaceholderImage(item.imageUrl);
  return (
    <li
      className={styles.topicItem}
      style={
        {
          "--topic-accent": sectionTheme.gradient,
          animationDelay: `${index * 60}ms`,
        } as React.CSSProperties
      }
    >
      <Link
        to={detailUrl}
        className={styles.topicLink}
        aria-label={`Read topic: ${item.title}`}
      >
        <div
          className={styles.topicThumb}
          style={!useImage ? { background: sectionTheme.gradient } : undefined}
          aria-hidden
        >
          {useImage ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className={styles.topicThumbImg}
            />
          ) : (
            <span className={styles.topicThumbIcon} aria-hidden="true">
              {sectionTheme.icon}
            </span>
          )}
          <span className={styles.topicIndex} aria-hidden="true">
            {index + 1}
          </span>
        </div>
        <div className={styles.topicBody}>
          <span className={styles.topicTitle}>{item.title}</span>
          {item.description && (
            <Typography
              variant="small"
              color="secondary"
              className={styles.topicDesc}
            >
              {item.description}
            </Typography>
          )}
          <div className={styles.topicFooter}>
            <span aria-hidden="true" />
            <span className={styles.topicArrow} aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export const LearningSectionPage: React.FC = () => {
  const { sectionSlug } = useParams<{ sectionSlug: string }>();
  const { profile, isLoading, error, refetch } = useProfile();

  const { section, sections, sectionIndex } = useMemo(() => {
    if (!profile || !sectionSlug) {
      return { section: null, sections: [], sectionIndex: -1 };
    }
    const list = profile.getPublishedLearningSections();
    const idx = list.findIndex((s) => s.slug === sectionSlug);
    const sec = idx >= 0 ? (list[idx] ?? null) : null;
    return { section: sec, sections: list, sectionIndex: idx };
  }, [profile, sectionSlug]);

  const prevSection = sectionIndex > 0 ? sections[sectionIndex - 1] : null;
  const nextSection =
    sectionIndex >= 0 && sectionIndex < sections.length - 1
      ? sections[sectionIndex + 1]
      : null;

  const sectionTheme = useMemo(
    () => getSectionTheme(section?.slug ?? ""),
    [section?.slug],
  );

  useSEO({
    title:
      section && profile
        ? `${section.title} - Learning | ${profile.name}`
        : "Section | Learning",
    description: section?.description ?? "Learning section topics.",
    type: "profile",
  });

  if (isLoading) {
    return <Loading fullScreen message="Loading section..." />;
  }

  if (error || !profile) {
    return (
      <PageError
        title="Failed to load"
        message={error?.message ?? "Something went wrong. Please try again."}
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  if (!sectionSlug || !section) {
    return <Navigate to="/learning" replace />;
  }

  const items = section.items ?? [];

  return (
    <div
      className={`pf-page ${styles.page}`}
      id="learning-section"
      tabIndex={-1}
    >
      <header className="pf-hero" aria-labelledby="learning-section-hero-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <div className="pf-hero-inner">
          <div className="pf-hero-copy">
            <p className="pf-eyebrow">Curriculum</p>
            <h1 id="learning-section-hero-title" className="pf-hero-title">
              {section.title}
            </h1>
            <p className="pf-hero-lead">
              {section.description?.trim() ||
                "Choose a topic below to open the full write-up."}
            </p>
          </div>
          <ul
            className={`pf-hero-stats pf-hero-stats--three ${styles.heroStatsBar}`}
            aria-label="Section overview"
          >
            {sections.length > 1 && sectionIndex >= 0 ? (
              <li>
                <span className="pf-stat-value">
                  {sectionIndex + 1}/{sections.length}
                </span>
                <span className="pf-stat-label">Part</span>
              </li>
            ) : null}
            <li>
              <span className="pf-stat-value">{items.length}</span>
              <span className="pf-stat-label">Topics</span>
            </li>
            <li>
              <span className="pf-stat-value">Track</span>
              <span className="pf-stat-label">Deep dive</span>
            </li>
          </ul>
        </div>
      </header>
      <div className="pf-workspace">
        <div
          className={`pf-workspace-inner pf-workspace-inner--narrow ${styles.workspaceInner}`}
        >
          <div
            className="track-accent"
            style={{ background: sectionTheme.gradient }}
            aria-hidden="true"
          />
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li>
                <Link to="/learning" className={styles.breadcrumbLink}>
                  Learning
                </Link>
              </li>
              <li aria-hidden="true" className={styles.breadcrumbSep}>
                <span className={styles.breadcrumbChevron} aria-hidden="true">
                  →
                </span>
              </li>
              <li aria-current="page">
                <span className={styles.breadcrumbCurrent}>
                  {section.title}
                </span>
              </li>
            </ol>
          </nav>

          <div className={styles.content}>
            {items.length > 0 && (
              <Typography
                variant="small"
                weight="semibold"
                className={styles.topicsLabel}
              >
                Topics 1–{items.length} · select one to read
              </Typography>
            )}
            {items.length > 0 ? (
              <ul
                className={styles.topicList}
                aria-label={`Topics in ${section.title}`}
              >
                {items.map((item, idx) => (
                  <TopicLink
                    key={item.id}
                    item={item}
                    sectionSlug={sectionSlug}
                    sectionTheme={sectionTheme}
                    index={idx}
                  />
                ))}
              </ul>
            ) : (
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
                  No topics yet
                </Typography>
                <Typography variant="body" color="secondary">
                  This section doesn&apos;t have any topics yet. Check back
                  later or browse other sections.
                </Typography>
                <Link to="/learning" className={styles.emptyStateLink}>
                  Browse other sections
                </Link>
              </div>
            )}
          </div>

          <footer className={styles.footer}>
            {items.length > 8 && (
              <button
                type="button"
                onClick={scrollToSectionTop}
                className={styles.backToTop}
                aria-label="Scroll back to top of section"
              >
                <Typography variant="small" weight="medium" as="span">
                  Back to top
                </Typography>
              </button>
            )}
            <nav
              className={styles.footerNav}
              aria-label="Section and curriculum navigation"
            >
              {prevSection?.slug ? (
                <Link
                  to={`/learning/${prevSection.slug}`}
                  className={styles.footerNavLink}
                  aria-label={`Previous section: ${prevSection.title}`}
                >
                  ← {prevSection.title}
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              <Link
                to="/learning"
                className={styles.backLink}
                aria-label="Back to Learning overview"
              >
                Back to Learning
              </Link>
              {nextSection?.slug ? (
                <Link
                  to={`/learning/${nextSection.slug}`}
                  className={styles.footerNavLink}
                  aria-label={`Next section: ${nextSection.title}`}
                >
                  {nextSection.title} →
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
};
