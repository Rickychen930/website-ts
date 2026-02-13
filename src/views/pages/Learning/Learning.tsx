/**
 * Learning Page - Curriculum and learning resources
 * Component-based, uses design system (Section, Typography, Card, CodeBlock)
 * Optimized for learners: collapsible topics, clear hierarchy, sticky nav
 */

import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Card } from "@/views/components/ui/Card";
import { CodeBlock } from "@/views/components/ui/CodeBlock";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import type {
  LearningSection as LearningSectionType,
  LearningTopicItem,
} from "@/types/domain";
import styles from "./Learning.module.css";

/** Section labels for the 8-part learning structure + code + image */
const TOPIC_SECTION_LABELS: Record<number, string> = {
  1: "Learning flow",
  2: "Material",
  3: "Explanation",
  4: "Application",
  5: "How to implement",
  6: "Logic & how the code works",
  7: "Example problem & solution",
  8: "Additional information",
  9: "Supporting image",
};
const CODE_BLOCK_LABEL = "Code example";

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

/**
 * Parse content that uses **N. Section title:** markers into ordered sections.
 * Returns array of { num, title, body } for sections 1-8 (6 and 9 are rendered separately as code and image).
 */
function parseStructuredContent(
  content: string,
): Array<{ num: number; title: string; body: string }> {
  const sections: Array<{ num: number; title: string; body: string }> = [];
  const regex =
    /\*\*(\d+)\.\s*([^*]+)\*\*:\s*\n([\s\S]*?)(?=\n\*\*\d+\.\s*|$)/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const num = parseInt(m[1], 10);
    if (num >= 1 && num <= 8)
      sections.push({ num, title: m[2].trim(), body: m[3].trim() });
  }
  return sections.sort((a, b) => a.num - b.num);
}

function isStructuredContent(content: string): boolean {
  return /\*\*1\.\s*.+\*\*:/.test(content);
}

interface TopicStructuredContentProps {
  item: LearningTopicItem;
}

/** Renders topic in full order: 1–6 (from content), Code example, 7–8 (from content), 9 (image). */
const TopicStructuredContent: React.FC<TopicStructuredContentProps> = ({
  item,
}) => {
  const content = item.content ?? "";
  const sections = parseStructuredContent(content);
  const byNum = new Map(sections.map((s) => [s.num, s]));

  const renderBody = (body: string) =>
    body.split(/\n\n+/).map((para, i) => (
      <Typography key={i} variant="body" color="secondary" as="p">
        {para.trim()}
      </Typography>
    ));

  const stepLabel = (stepNum: number, label: string) => (
    <span className={styles.topicStepLabel}>
      <span className={styles.topicStepNum} aria-hidden="true">
        Step {stepNum}
      </span>
      <span>{label}</span>
    </span>
  );
  let stepNum = 0;
  const ordered: Array<{ key: string; node: React.ReactNode }> = [];
  [1, 2, 3, 4, 5, 6].forEach((n) => {
    const s = byNum.get(n);
    if (s) {
      stepNum += 1;
      ordered.push({
        key: `s${n}`,
        node: (
          <div className={styles.topicSection}>
            <Typography
              variant="small"
              weight="semibold"
              className={styles.topicSectionTitle}
            >
              {stepLabel(stepNum, TOPIC_SECTION_LABELS[n])}
            </Typography>
            {renderBody(s.body)}
          </div>
        ),
      });
    }
  });
  if (item.codeExample) {
    stepNum += 1;
    ordered.push({
      key: "code",
      node: (
        <div className={styles.topicSection}>
          <Typography
            variant="small"
            weight="semibold"
            className={styles.topicSectionTitle}
          >
            {stepLabel(stepNum, CODE_BLOCK_LABEL)}
          </Typography>
          <CodeBlock
            code={item.codeExample}
            language={item.codeLanguage ?? "text"}
            className={styles.topicCodeBlock}
          />
        </div>
      ),
    });
  }
  [7, 8].forEach((n) => {
    const s = byNum.get(n);
    if (s) {
      stepNum += 1;
      ordered.push({
        key: `s${n}`,
        node: (
          <div className={styles.topicSection}>
            <Typography
              variant="small"
              weight="semibold"
              className={styles.topicSectionTitle}
            >
              {stepLabel(stepNum, TOPIC_SECTION_LABELS[n])}
            </Typography>
            {renderBody(s.body)}
          </div>
        ),
      });
    }
  });
  if (item.imageUrl) {
    stepNum += 1;
    ordered.push({
      key: "image",
      node: (
        <div className={styles.topicSection}>
          <Typography
            variant="small"
            weight="semibold"
            className={styles.topicSectionTitle}
          >
            {stepLabel(stepNum, TOPIC_SECTION_LABELS[9])}
          </Typography>
          <figure className={styles.topicFigure}>
            <img
              src={item.imageUrl}
              alt={
                item.title
                  ? `Illustration for ${item.title}`
                  : "Topic illustration"
              }
              className={styles.topicImage}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      ),
    });
  }

  return (
    <>
      {ordered.map(({ key, node }) => (
        <React.Fragment key={key}>{node}</React.Fragment>
      ))}
    </>
  );
};

export const Learning: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const location = useLocation();
  const hasScrolledToHash = useRef(false);

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

  // Scroll to section when URL has hash (e.g. /learning#section-react)
  useEffect(() => {
    if (sections.length === 0 || hasScrolledToHash.current) return;
    const hash = location.hash?.replace(/^#/, "");
    if (!hash || !hash.startsWith("section-")) return;
    const el = document.getElementById(hash);
    if (el) {
      hasScrolledToHash.current = true;
      const preferReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const id = requestAnimationFrame(() => {
        el.scrollIntoView({
          behavior: preferReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [location.hash, sections.length]);

  if (isLoading) {
    return <Loading fullScreen message="Loading..." />;
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
        <Typography variant="body" color="secondary">
          No learning sections published yet. Check back later.
        </Typography>
      </Section>
    );
  }

  return (
    <Section
      id="learning"
      label="Curriculum"
      title="Learning"
      subtitle="Structured topics: algorithms, frameworks, and best practices."
      info="Sections and topics from your curriculum. Expand a topic or open it for the full article."
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
                  <a
                    href={`#section-${sec.slug}`}
                    className={styles.quickNavLink}
                  >
                    {sec.title}
                  </a>
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
    </Section>
  );
};

/** Single topic row: collapsible body, numbered, link to detail page, accessible (controlled) */
interface LearningTopicRowProps {
  item: LearningTopicItem;
  sectionSlug: string | undefined;
  index: number;
  total: number;
  expanded: boolean;
  onToggle: () => void;
}

const LearningTopicRow: React.FC<LearningTopicRowProps> = ({
  item,
  sectionSlug,
  index,
  total,
  expanded,
  onToggle,
}) => {
  const hasContent = !!item.content || !!item.imageUrl || !!item.codeExample;
  const id = `topic-${item.id}`;
  const detailUrl = sectionSlug
    ? `/learning/${sectionSlug}/${encodeURIComponent(item.id)}`
    : null;

  return (
    <li className={styles.topicItem}>
      <div className={styles.topicItemHeader}>
        <span className={styles.topicIndex} aria-hidden="true">
          {index + 1}/{total}
        </span>
        <button
          type="button"
          className={styles.topicToggle}
          onClick={onToggle}
          aria-expanded={hasContent ? expanded : undefined}
          aria-controls={hasContent ? id : undefined}
          id={`${id}-btn`}
        >
          <Typography variant="body" weight="medium" as="span">
            {item.title}
          </Typography>
          {hasContent && (
            <span className={styles.topicChevron} aria-hidden="true">
              {expanded ? "−" : "+"}
            </span>
          )}
        </button>
      </div>
      {item.description && (
        <Typography
          variant="small"
          color="secondary"
          className={styles.topicDesc}
        >
          {item.description}
        </Typography>
      )}
      {detailUrl && (
        <div className={styles.topicDetailLinkWrap}>
          <Link to={detailUrl} className={styles.topicDetailLink}>
            Read full topic →
          </Link>
        </div>
      )}
      {hasContent && (
        <div
          id={id}
          className={styles.topicContentWrap}
          data-expanded={expanded}
          role="region"
          aria-labelledby={`${id}-btn`}
        >
          <div className={styles.topicContent}>
            {item.content &&
              (isStructuredContent(item.content) ? (
                <TopicStructuredContent item={item} />
              ) : (
                item.content.split(/\n\n+/).map((para, i) => (
                  <Typography key={i} variant="body" color="secondary" as="p">
                    {para.trim()}
                  </Typography>
                ))
              ))}
            {!isStructuredContent(item.content ?? "") && item.imageUrl && (
              <figure className={styles.topicFigure}>
                <img
                  src={item.imageUrl}
                  alt={
                    item.title
                      ? `Illustration for ${item.title}`
                      : "Topic illustration"
                  }
                  className={styles.topicImage}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            )}
            {!isStructuredContent(item.content ?? "") && item.codeExample && (
              <CodeBlock
                code={item.codeExample}
                language={item.codeLanguage ?? "text"}
                className={styles.topicCodeBlock}
              />
            )}
          </div>
        </div>
      )}
    </li>
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
  const items = [...(section.items ?? [])].sort((a, b) => a.order - b.order);
  const firstId = items[0]?.id ?? null;
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
    firstId ? new Set([firstId]) : new Set(),
  );

  const expandAll = () => setExpandedIds(new Set(items.map((i) => i.id)));
  const collapseAll = () => setExpandedIds(new Set());
  const toggleTopic = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const withContent = items.filter(
    (i) => !!i.content || !!i.imageUrl || !!i.codeExample,
  );
  const allExpanded =
    withContent.length > 0 && expandedIds.size >= withContent.length;

  return (
    <ScrollReveal direction="up">
      <Card
        id={section.slug ? `section-${section.slug}` : undefined}
        variant="elevated"
        padding="lg"
        className={styles.card}
      >
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
            {items.length > 0 && (
              <span className={styles.sectionBadge}>
                {items.length} topic{items.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {section.description && (
            <Typography
              variant="body"
              color="secondary"
              className={styles.description}
            >
              {section.description}
            </Typography>
          )}
        </header>
        {withContent.length > 0 && (
          <div className={styles.sectionToolbar}>
            <button
              type="button"
              onClick={expandAll}
              className={styles.toolbarBtn}
              aria-pressed={allExpanded}
            >
              Expand all
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className={styles.toolbarBtn}
              aria-pressed={expandedIds.size === 0}
            >
              Collapse all
            </button>
          </div>
        )}
        {items.length > 0 ? (
          <ul
            className={styles.topicList}
            aria-label={`Topics in ${section.title}`}
          >
            {items.map((item, idx) => (
              <LearningTopicRow
                key={item.id}
                item={item}
                sectionSlug={section.slug}
                index={idx}
                total={items.length}
                expanded={expandedIds.has(item.id)}
                onToggle={() => toggleTopic(item.id)}
              />
            ))}
          </ul>
        ) : (
          <Typography
            variant="body"
            color="secondary"
            className={styles.emptySection}
          >
            No topics in this section yet.
          </Typography>
        )}
      </Card>
    </ScrollReveal>
  );
};
