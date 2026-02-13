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
  return (
    <li className={styles.topicItem}>
      <Link to={detailUrl} className={styles.topicLink}>
        <span className={styles.topicIndex} aria-hidden="true">
          {index + 1}/{total}
        </span>
        <span className={styles.topicTitle}>{item.title}</span>
        <span className={styles.topicArrow} aria-hidden="true">
          →
        </span>
      </Link>
      {item.description && (
        <Typography
          variant="small"
          color="secondary"
          className={styles.topicDesc}
        >
          {item.description}
        </Typography>
      )}
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
                sectionSlug={section.slug}
                index={idx}
                total={items.length}
              />
            ))}
          </ul>
        ) : (
          <Typography variant="body" color="secondary">
            No topics in this section yet.
          </Typography>
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
