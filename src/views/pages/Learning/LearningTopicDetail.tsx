/**
 * Learning Topic Detail Page
 * Full-page view for a single learning topic with complete content and reader-friendly layout.
 * Renders structured 8-part content with optional code and image; supports bold, inline code,
 * and lists inside body text. Includes table of contents for long topics.
 * Route: /learning/:sectionSlug/:topicId
 */

import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { CodeBlock } from "@/views/components/ui/CodeBlock";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import type { LearningTopicItem } from "@/types/domain";
import { getSectionTheme, isPlaceholderImage } from "./sectionThemes";
import styles from "./LearningTopicDetail.module.css";

/** Must match backend learningSeedStructure CONTENT_SECTION_LABELS for consistent 8-part content. */
const SECTION_LABELS: Record<number, string> = {
  1: "Learning flow",
  2: "Material",
  3: "Explanation",
  4: "Application",
  5: "How to implement",
  6: "Logic & how the code works",
  7: "Example problem & solution",
  8: "Additional information",
};

const CODE_SECTION_LABEL = "Code example";

/**
 * Parses 8-part structured content. Expected format in markdown-style:
 * **1. Learning flow:**\n\n(body)\n\n**2. Material:**\n\n(body) ... **8. Additional information:**\n\n(body)
 * Section headers must be **N. Title:** with N 1–8; body runs until the next section or end.
 * For the detail page to show complete, easy-to-follow content, each topic in seedData
 * should include all eight sections (learning flow → material → explanation → application
 * → how to implement → logic & how the code works → example problem & solution → additional information).
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
    const body = m[3].trim();
    if (num >= 1 && num <= 8)
      sections.push({ num, title: m[2].trim(), body: body || "" });
  }
  return sections.sort((a, b) => a.num - b.num);
}

function isStructuredContent(content: string): boolean {
  return /\*\*1\.\s*.+\*\*:/.test(content);
}

type InlineSegment = {
  type: "text" | "bold" | "code" | "link";
  value: string;
  href?: string;
};

/** Renders inline formatting: **bold**, `code`, and [text](url) as React nodes (no raw HTML for safety). */
function renderInline(text: string): React.ReactNode[] {
  const segments: InlineSegment[] = [];
  let lastIndex = 0;
  let key = 0;
  const allRegex =
    /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+|#[^)\s]*)\)/g;
  let match;
  while ((match = allRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        value: text.slice(lastIndex, match.index),
      });
    }
    if (match[1] !== undefined) {
      segments.push({ type: "bold", value: match[1] });
    } else if (match[2] !== undefined) {
      segments.push({ type: "code", value: match[2] });
    } else if (match[3] !== undefined && match[4] !== undefined) {
      segments.push({ type: "link", value: match[3], href: match[4] });
    }
    lastIndex = allRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }
  return segments.map((seg) => {
    if (seg.type === "bold") {
      return <strong key={key++}>{seg.value}</strong>;
    }
    if (seg.type === "code") {
      return (
        <code key={key++} className={styles.inlineCode}>
          {seg.value}
        </code>
      );
    }
    if (seg.type === "link" && seg.href) {
      const isExternal = /^https?:\/\//i.test(seg.href);
      return (
        <a
          key={key++}
          href={seg.href}
          className={styles.bodyLink}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {seg.value}
        </a>
      );
    }
    return seg.value;
  });
}

const calloutIcons = {
  tip: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),
  note: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  important: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
};

/** Returns true if the block is a callout: **Tip:**, **Note:**, or **Important:** at start. */
function isCalloutBlock(
  block: string,
): { kind: "tip" | "note" | "important"; body: string } | null {
  const trimmed = block.trim();
  const tipMatch = /^\*\*Tip:\*\*\s*\n?([\s\S]*)/i.exec(trimmed);
  if (tipMatch) return { kind: "tip", body: tipMatch[1].trim() };
  const noteMatch = /^\*\*Note:\*\*\s*\n?([\s\S]*)/i.exec(trimmed);
  if (noteMatch) return { kind: "note", body: noteMatch[1].trim() };
  const impMatch = /^\*\*Important:\*\*\s*\n?([\s\S]*)/i.exec(trimmed);
  if (impMatch) return { kind: "important", body: impMatch[1].trim() };
  return null;
}

/** Returns true if the block looks like a bullet list (lines starting with - or * or •). */
function isListBlock(block: string): boolean {
  const trimmed = block.trim();
  if (!trimmed) return false;
  const lines = trimmed.split("\n");
  return (
    lines.length >= 1 &&
    lines.every((line) => /^\s*[-*•]\s+/.test(line) || line.trim() === "")
  );
}

/**
 * For section 7 (Example problem & solution): if body has "Problem:" and "Solution:",
 * split into two labeled boxes so the content is not cramped and does not look "tertimpa".
 */
function renderExampleSectionBody(
  body: string,
  renderBody: (b: string) => React.ReactNode[],
  styles: Record<string, string>,
): React.ReactNode {
  const trimmed = body.trim();
  const hasProblem = /Problem:\s*/i.test(trimmed);
  const hasSolution = /Solution:\s*/i.test(trimmed);

  if (hasProblem && hasSolution) {
    const newlineSolution = trimmed.search(/\n\s*Solution:\s*/i);
    const inlineSolution = trimmed.search(/\sSolution:\s*/i);
    const solutionStart =
      newlineSolution >= 0
        ? newlineSolution
        : inlineSolution >= 0
          ? inlineSolution
          : -1;

    if (solutionStart >= 0) {
      const problemRaw = trimmed.slice(0, solutionStart);
      const solutionRaw = trimmed.slice(solutionStart);
      const problemText = problemRaw.replace(/^Problem:\s*/i, "").trim();
      const solutionText = solutionRaw.replace(/^Solution:\s*/i, "").trim();
      if (problemText || solutionText) {
        return (
          <>
            <div className={styles.exampleProblemBox}>
              <div className={styles.exampleLabel}>Soal</div>
              <div className={styles.exampleContent}>
                {renderBody(problemText)}
              </div>
            </div>
            <div className={styles.exampleSolutionBox}>
              <div className={styles.exampleLabel}>Pembahasan</div>
              <div className={styles.exampleContent}>
                {renderBody(solutionText)}
              </div>
            </div>
          </>
        );
      }
    }
  }
  return <>{renderBody(body)}</>;
}

/** Returns true if the block looks like a numbered list: (1) (2) or 1. 2. style (seed format). */
function isNumberedListBlock(block: string): boolean {
  const trimmed = block.trim();
  if (!trimmed) return false;
  const lines = trimmed.split("\n").filter((l) => l.trim());
  return (
    lines.length >= 1 &&
    lines.every(
      (line) => /^\s*\(\d+\)\s+/.test(line) || /^\s*\d+\.\s+/.test(line),
    )
  );
}

/** Extract list items from a numbered block: (1) text or 1. text → text */
function getNumberedListLines(block: string): string[] {
  return block
    .trim()
    .split("\n")
    .filter((l) => l.trim())
    .map((line) =>
      line
        .replace(/^\s*\(\d+\)\s+/, "")
        .replace(/^\s*\d+\.\s+/, "")
        .trim(),
    );
}

/** Parse bullet block into top-level and nested items (indent ≥2 spaces = child of previous). */
function parseNestedListLines(
  block: string,
): Array<{ text: string; children: string[] }> {
  const lines = block
    .trim()
    .split("\n")
    .filter((l) => /^\s*[-*•]\s+/.test(l));
  const result: Array<{ text: string; children: string[] }> = [];
  for (const line of lines) {
    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    const text = line.replace(/^\s*[-*•]\s+/, "").trim();
    if (indent >= 2) {
      if (result.length > 0) result[result.length - 1].children.push(text);
    } else {
      result.push({ text, children: [] });
    }
  }
  return result;
}

interface TopicDetailContentProps {
  item: LearningTopicItem;
}

const TopicDetailContent: React.FC<TopicDetailContentProps> = ({ item }) => {
  const content = item.content ?? "";
  const sections = useMemo(() => parseStructuredContent(content), [content]);
  const byNum = useMemo(
    () => new Map(sections.map((s) => [s.num, s])),
    [sections],
  );

  const renderBody = (body: string) => {
    const blocks = body.split(/\n\n+/).filter((b) => b.trim());
    return blocks.map((block, i) => {
      const trimmed = block.trim();
      const callout = isCalloutBlock(block);
      if (callout) {
        const paras = callout.body.split(/\n\n+/).filter((p) => p.trim());
        return (
          <div
            key={i}
            className={`${styles.callout} ${styles[`callout${callout.kind.charAt(0).toUpperCase() + callout.kind.slice(1)}`]}`}
            role="note"
          >
            <span className={styles.calloutLabel}>
              {calloutIcons[callout.kind]}
              {callout.kind === "tip"
                ? "Tip"
                : callout.kind === "note"
                  ? "Note"
                  : "Important"}
            </span>
            <div className={styles.calloutBody}>
              {paras.map((p, j) => (
                <Typography
                  key={j}
                  variant="body"
                  color="secondary"
                  as="p"
                  className={styles.bodyPara}
                >
                  {renderInline(p.trim())}
                </Typography>
              ))}
            </div>
          </div>
        );
      }
      if (isListBlock(block)) {
        const listItems = parseNestedListLines(block);
        return (
          <ul key={i} className={styles.bodyList}>
            {listItems.map((entry, j) => (
              <li key={j}>
                <Typography variant="body" color="secondary" as="span">
                  {renderInline(entry.text)}
                </Typography>
                {entry.children.length > 0 && (
                  <ul className={styles.bodyListNested}>
                    {entry.children.map((child, k) => (
                      <li key={k}>
                        <Typography variant="body" color="secondary" as="span">
                          {renderInline(child)}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        );
      }
      if (isNumberedListBlock(block)) {
        const lines = getNumberedListLines(block);
        return (
          <ol key={i} className={styles.bodyListOrdered}>
            {lines.map((line, j) => (
              <li key={j}>
                <Typography variant="body" color="secondary" as="span">
                  {renderInline(line)}
                </Typography>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <Typography
          key={i}
          variant="body"
          color="secondary"
          as="p"
          className={styles.bodyPara}
        >
          {renderInline(trimmed)}
        </Typography>
      );
    });
  };

  const blockOrder: Array<{
    key: string;
    label: string;
    node: React.ReactNode;
  }> = [];

  [1, 2, 3, 4, 5, 6].forEach((n) => {
    const s = byNum.get(n);
    if (s) {
      const bodyContent = s.body.trim()
        ? renderBody(s.body)
        : [
            <p key="empty" className={styles.emptySectionHint}>
              — No content for this section —
            </p>,
          ];
      blockOrder.push({
        key: `s${n}`,
        label: SECTION_LABELS[n] ?? s.title,
        node: <>{bodyContent}</>,
      });
    }
  });

  if (item.codeExample) {
    blockOrder.push({
      key: "code",
      label: CODE_SECTION_LABEL,
      node: (
        <CodeBlock
          code={item.codeExample}
          language={item.codeLanguage ?? "text"}
          className={styles.codeBlock}
        />
      ),
    });
  }

  [7, 8].forEach((n) => {
    const s = byNum.get(n);
    if (s) {
      const node = s.body.trim() ? (
        n === 7 ? (
          renderExampleSectionBody(s.body, renderBody, styles)
        ) : (
          <>{renderBody(s.body)}</>
        )
      ) : (
        <p key="empty" className={styles.emptySectionHint}>
          — No content for this section —
        </p>
      );
      blockOrder.push({
        key: `s${n}`,
        label: SECTION_LABELS[n] ?? s.title,
        node,
      });
    }
  });

  if (blockOrder.length === 0 && content.trim()) {
    return (
      <div className={styles.plainContent}>
        {content.split(/\n\n+/).map((para, i) => (
          <Typography key={i} variant="body" color="secondary" as="p">
            {para.trim()}
          </Typography>
        ))}
        {item.codeExample && (
          <CodeBlock
            code={item.codeExample}
            language={item.codeLanguage ?? "text"}
            className={styles.codeBlock}
          />
        )}
      </div>
    );
  }

  return (
    <>
      {blockOrder.length > 2 && (
        <nav aria-label="Table of contents">
          <details className={styles.toc}>
            <summary className={styles.tocSummary}>On this page</summary>
            <ol className={styles.tocList}>
              {blockOrder.map(({ key, label }) => (
                <li key={key}>
                  <a href={`#detail-heading-${key}`} className={styles.tocLink}>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        </nav>
      )}
      <article className={styles.article}>
        {blockOrder.map(({ key, label, node }, index) => (
          <section
            key={key}
            data-section-key={key}
            className={
              key === "s7"
                ? `${styles.detailSection} ${styles.exampleSection}`
                : styles.detailSection
            }
            aria-labelledby={`detail-heading-${key}`}
          >
            <h2 id={`detail-heading-${key}`} className={styles.sectionHeading}>
              <span className={styles.sectionNum}>{index + 1}.</span> {label}
            </h2>
            <div className={styles.sectionBody}>{node}</div>
          </section>
        ))}
      </article>
    </>
  );
};

export const LearningTopicDetail: React.FC = () => {
  const { sectionSlug, topicId } = useParams<{
    sectionSlug: string;
    topicId: string;
  }>();
  const { profile, isLoading, error, refetch } = useProfile();

  const sectionAndTopic = useMemo(() => {
    if (!profile || !sectionSlug || !topicId) return null;
    const decodedTopicId = decodeURIComponent(topicId);
    const sections = profile.getPublishedLearningSections();
    const section = sections.find((s) => s.slug === sectionSlug);
    if (!section?.items) return null;
    const topic = section.items.find((i) => i.id === decodedTopicId);
    return topic ? { section, topic } : null;
  }, [profile, sectionSlug, topicId]);

  useSEO({
    title:
      sectionAndTopic && profile
        ? `${sectionAndTopic.topic.title} | ${sectionAndTopic.section.title} - Learning | ${profile.name}`
        : "Topic | Learning",
    description: sectionAndTopic?.topic.description ?? "Learning topic detail.",
    type: "profile",
  });

  const sectionTheme = useMemo(
    () => getSectionTheme(sectionAndTopic?.section?.slug ?? ""),
    [sectionAndTopic?.section?.slug],
  );

  const readingMinutes = useMemo(() => {
    const t = sectionAndTopic?.topic;
    if (!t) return 0;
    const text = [t.description, t.content].filter(Boolean).join(" ");
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return words > 0 ? Math.max(1, Math.ceil(words / 200)) : 0;
  }, [sectionAndTopic?.topic]);

  if (isLoading) {
    return <Loading fullScreen message="Loading topic..." />;
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

  if (!sectionSlug || !topicId || !sectionAndTopic) {
    return <Navigate to="/learning" replace />;
  }

  const { section, topic } = sectionAndTopic;
  const items = section.items ?? [];
  const currentIndex = items.findIndex((i) => i.id === topic.id);
  const prevTopic = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextTopic =
    currentIndex >= 0 && currentIndex < items.length - 1
      ? items[currentIndex + 1]
      : null;

  return (
    <Section
      id="learning-topic-detail"
      tabIndex={-1}
      className={styles.wrapper}
      variant="alt"
      style={
        { "--learning-accent": sectionTheme.gradient } as React.CSSProperties
      }
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
          <li>
            <Link
              to={`/learning/${section.slug}`}
              className={styles.breadcrumbLink}
            >
              {section.title}
            </Link>
          </li>
          <li aria-hidden="true" className={styles.breadcrumbSep}>
            <span className={styles.breadcrumbChevron} aria-hidden="true">
              →
            </span>
          </li>
          <li aria-current="page">
            <span className={styles.breadcrumbCurrent}>{topic.title}</span>
          </li>
        </ol>
      </nav>

      <header className={styles.header}>
        {section.slug && (
          <div
            className={styles.sectionBanner}
            style={{ background: sectionTheme.gradient }}
          >
            <span className={styles.sectionBannerIcon} aria-hidden="true">
              {sectionTheme.icon}
            </span>
          </div>
        )}
        <Typography variant="h1" weight="bold" as="h1" className={styles.title}>
          {topic.title}
        </Typography>
        {readingMinutes > 0 && (
          <Typography
            variant="small"
            color="tertiary"
            as="p"
            className={styles.readingTime}
          >
            {readingMinutes} min read
          </Typography>
        )}
        {topic.description && (
          <Typography
            variant="body"
            color="secondary"
            as="p"
            className={styles.description}
          >
            {topic.description}
          </Typography>
        )}
      </header>

      <figure className={styles.heroFigure}>
        {topic.imageUrl && !isPlaceholderImage(topic.imageUrl) ? (
          <img
            src={topic.imageUrl}
            alt={
              topic.title
                ? `Illustration for ${topic.title}`
                : "Topic illustration"
            }
            className={styles.heroImage}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        ) : (
          <div
            className={styles.heroPlaceholder}
            style={{ background: sectionTheme.gradient }}
            aria-hidden
          >
            <span className={styles.heroPlaceholderIcon}>
              {sectionTheme.icon}
            </span>
          </div>
        )}
      </figure>

      <div className={styles.content}>
        {topic.content || topic.codeExample || topic.imageUrl ? (
          isStructuredContent(topic.content ?? "") ? (
            <TopicDetailContent item={topic} />
          ) : (
            <div className={styles.plainContent}>
              {topic.content?.split(/\n\n+/).map((para, i) => (
                <Typography key={i} variant="body" color="secondary" as="p">
                  {renderInline(para.trim())}
                </Typography>
              ))}
              {topic.codeExample && (
                <CodeBlock
                  code={topic.codeExample}
                  language={topic.codeLanguage ?? "text"}
                  className={styles.codeBlock}
                />
              )}
            </div>
          )
        ) : (
          <Typography variant="body" color="secondary">
            No content for this topic yet.
          </Typography>
        )}
      </div>

      <footer className={styles.footer}>
        <nav className={styles.footerNav} aria-label="Topic navigation">
          {prevTopic ? (
            <Link
              to={`/learning/${section.slug}/${encodeURIComponent(prevTopic.id)}`}
              className={styles.footerNavLink}
              aria-label={`Previous topic: ${prevTopic.title}`}
            >
              ← {prevTopic.title}
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          <Link
            to={`/learning/${section.slug}`}
            className={styles.backLink}
            aria-label={`Back to section: ${section.title}`}
          >
            Back to {section.title}
          </Link>
          {nextTopic ? (
            <Link
              to={`/learning/${section.slug}/${encodeURIComponent(nextTopic.id)}`}
              className={styles.footerNavLink}
              aria-label={`Next topic: ${nextTopic.title}`}
            >
              {nextTopic.title} →
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      </footer>
    </Section>
  );
};
