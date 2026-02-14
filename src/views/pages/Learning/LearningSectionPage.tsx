/**
 * Learning Section Page - List of topics in a section
 * Route: /learning/:sectionSlug
 * User selects a topic here, then goes to detail page
 */

import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import type { LearningTopicItem } from "@/types/domain";
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
              alt=""
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
    <Section
      id="learning-section"
      tabIndex={-1}
      className={styles.wrapper}
      variant="alt"
    >
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
            <span className={styles.breadcrumbCurrent}>{section.title}</span>
          </li>
        </ol>
      </nav>

      <header
        className={styles.hero}
        style={
          {
            "--section-hero-gradient": sectionTheme.gradient,
          } as React.CSSProperties
        }
      >
        <div className={styles.heroGradient} aria-hidden="true" />
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.heroIconWrap} aria-hidden="true">
            {sectionTheme.icon}
          </div>
          <Typography
            variant="h1"
            weight="bold"
            as="h1"
            className={styles.heroTitle}
          >
            {section.title}
          </Typography>
          <div className={styles.heroMeta}>
            {items.length > 0 && (
              <span className={styles.heroTopicCount}>
                {items.length} topic{items.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {section.description && (
            <Typography
              variant="body"
              as="p"
              className={styles.heroDescription}
            >
              {section.description}
            </Typography>
          )}
        </div>
      </header>

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
              </svg>
            </span>
            <Typography
              variant="h3"
              weight="semibold"
              as="h2"
              className={styles.emptyStateTitle}
            >
              No topics yet
            </Typography>
            <Typography variant="body" color="secondary">
              This section doesn&apos;t have any topics yet. Check back later or
              browse other sections.
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
    </Section>
  );
};
