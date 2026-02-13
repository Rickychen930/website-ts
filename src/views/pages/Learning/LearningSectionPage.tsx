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
import { getSectionTheme } from "./sectionThemes";
import styles from "./LearningSectionPage.module.css";

interface TopicLinkProps {
  item: LearningTopicItem;
  sectionSlug: string;
  index: number;
  total: number;
}

/** Fallback image when topic has no imageUrl - uses placehold.co with title */
function getTopicImageUrl(
  item: LearningTopicItem,
  sectionSlug: string,
): string {
  if (item.imageUrl) return item.imageUrl;
  const text = encodeURIComponent(item.title.slice(0, 40).replace(/&/g, "and"));
  const colors: Record<string, string> = {
    "how-to-learn": "4338ca",
    "competitive-programming": "1e3a8a",
    react: "0369a1",
    nodejs: "059669",
    "database-sql": "7c3aed",
    "cs-theory": "b45309",
    "data-analytics": "0d9488",
    "ai-ml": "a21caf",
    "system-design-devops": "475569",
    "security-testing": "be123c",
    "programming-languages": "6d28d9",
    "english-learning": "1d4ed8",
    "quantum-computing": "4338ca",
    "interview-preparation": "059669",
    "operating-systems-concurrency": "b45309",
    "computer-networks": "0d9488",
  };
  const color = colors[sectionSlug] ?? "6366f1";
  return `https://placehold.co/400x200/${color}/white?text=${text}`;
}

const TopicLink: React.FC<TopicLinkProps> = ({
  item,
  sectionSlug,
  index,
  total,
}) => {
  const detailUrl = `/learning/${sectionSlug}/${encodeURIComponent(item.id)}`;
  const imageUrl = getTopicImageUrl(item, sectionSlug);
  return (
    <li className={styles.topicItem}>
      <Link to={detailUrl} className={styles.topicLink}>
        <div
          className={styles.topicThumb}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
          aria-hidden
        />
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

  const items = [...(section.items ?? [])].sort((a, b) => a.order - b.order);

  return (
    <Section id="learning-section" className={styles.wrapper} variant="alt">
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
              No topics in this section yet.
            </Typography>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <Link to="/learning" className={styles.backLink}>
          ← Back to Learning
        </Link>
      </footer>
    </Section>
  );
};
