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

interface TopicLinkProps {
  item: LearningTopicItem;
  sectionSlug: string;
  index: number;
  total: number;
}

const TopicLink: React.FC<TopicLinkProps> = ({
  item,
  sectionSlug,
  index,
  total,
}) => {
  const detailUrl = `/learning/${sectionSlug}/${encodeURIComponent(item.id)}`;
  const theme = getSectionTheme(sectionSlug);
  const useImage = item.imageUrl && !isPlaceholderImage(item.imageUrl);
  return (
    <li className={styles.topicItem}>
      <Link to={detailUrl} className={styles.topicLink}>
        <div
          className={styles.topicThumb}
          style={
            useImage
              ? { backgroundImage: `url(${item.imageUrl})` }
              : { background: theme.gradient }
          }
          aria-hidden
        >
          {!useImage && (
            <span className={styles.topicThumbIcon} aria-hidden="true">
              {theme.icon}
            </span>
          )}
        </div>
        <span className={styles.topicIndex} aria-hidden="true">
          {index + 1}
        </span>
        <div className={styles.topicContent}>
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
        </div>
        <span className={styles.topicArrow} aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
};

export const LearningSectionPage: React.FC = () => {
  const { sectionSlug } = useParams<{ sectionSlug: string }>();
  const { profile, isLoading, error, refetch } = useProfile();

  const section = useMemo(() => {
    if (!profile || !sectionSlug) return null;
    const sections = profile.getPublishedLearningSections();
    return sections.find((s) => s.slug === sectionSlug) ?? null;
  }, [profile, sectionSlug]);

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
            /
          </li>
          <li aria-current="page">
            <span className={styles.breadcrumbCurrent}>{section.title}</span>
          </li>
        </ol>
      </nav>

      <header className={styles.header}>
        {section.slug && (
          <div
            className={styles.sectionBanner}
            style={{ background: getSectionTheme(section.slug).gradient }}
          >
            <span className={styles.sectionBannerIcon} aria-hidden="true">
              {getSectionTheme(section.slug).icon}
            </span>
          </div>
        )}
        <Typography variant="h1" weight="bold" as="h1" className={styles.title}>
          {section.title}
        </Typography>
        {section.description && (
          <Typography
            variant="body"
            color="secondary"
            as="p"
            className={styles.description}
          >
            {section.description}
          </Typography>
        )}
      </header>

      <div className={styles.content}>
        <Typography
          variant="small"
          weight="semibold"
          className={styles.topicsLabel}
        >
          Select topic ({items.length})
        </Typography>
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
                index={idx}
                total={items.length}
              />
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">
              <svg
                width="48"
                height="48"
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
            <Typography variant="body" color="secondary">
              No topics in this section yet. Check back later.
            </Typography>
            <Link to="/learning" className={styles.emptyStateLink}>
              Browse other sections
            </Link>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <Link
          to="/learning"
          className={styles.backLink}
          aria-label="Back to Learning overview"
        >
          ← Back to Learning
        </Link>
      </footer>
    </Section>
  );
};
