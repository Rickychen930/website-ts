/**
 * ProjectDetail — editorial case study page.
 */

import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { Button, LinkButton } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { ProjectSpotlight } from "@/views/components/domain/ProjectSpotlight";
import { EmptyStateArt } from "@/components/PortfolioVisuals";
import { formatDateRange, getDuration } from "@/utils/dateUtils";
import { resolveProjectImageSrc } from "@/utils/resolveProjectImageSrc";
import { sortProjectsByRecency } from "@/utils/projectSort";
import {
  SITE_BRAND_NAME,
  SITE_DEFAULT_DESCRIPTION,
} from "@/config/site-defaults";
import type { Project } from "@/types/domain";
import styles from "./ProjectDetail.module.css";

const fadeUp = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
      };

function formatCategory(category: string): string {
  if (!category.trim()) return "Project";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function adjacentProjects(
  projects: readonly Project[],
  currentId: string,
): { prev: Project | null; next: Project | null } {
  const sorted = sortProjectsByRecency(projects);
  const index = sorted.findIndex((p) => p.id === currentId);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { profile, isLoading, error, refetch } = useProfile();
  const reduced = useReducedMotion() ?? false;
  const [imageFailed, setImageFailed] = useState(false);

  const project = profile?.projects.find((p) => p.id === projectId);

  useEffect(() => {
    setImageFailed(false);
  }, [project?.id, project?.imageUrl]);

  const resolvedImageSrc = resolveProjectImageSrc(project?.imageUrl);

  const relatedProjects = useMemo(() => {
    if (!profile || !project) return [];
    const peers = profile.projects.filter(
      (p) => p.id !== project.id && p.category === project.category,
    );
    const pool =
      peers.length >= 2
        ? peers
        : profile.projects.filter((p) => p.id !== project.id);
    return sortProjectsByRecency(pool).slice(0, 2);
  }, [profile, project]);

  const neighbors = useMemo(() => {
    if (!profile || !project) return { prev: null, next: null };
    return adjacentProjects(profile.projects, project.id);
  }, [profile, project]);

  useSEO({
    title: project
      ? `${project.title} — ${profile?.name ?? SITE_BRAND_NAME}`
      : `Project — ${SITE_BRAND_NAME}`,
    description: project?.description?.slice(0, 160) ?? "Project case study.",
    type: "article",
  });

  if (isLoading) {
    return <Loading fullScreen message="Loading project…" />;
  }

  if (error || !profile) {
    return (
      <PageError
        title="Failed to load project"
        message={error?.message ?? "Please try again later."}
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  if (!project) {
    return (
      <motion.div
        className={`pf-page ${styles.page}`}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <header className="pf-hero" aria-labelledby="project-not-found-title">
          <div className="pf-hero-mesh" aria-hidden="true" />
          <div className="pf-hero-inner">
            <motion.div className="pf-hero-copy" {...fadeUp(reduced)}>
              <p className="pf-eyebrow">Projects</p>
              <h1 id="project-not-found-title" className="pf-hero-title">
                Project not found
              </h1>
              <p className="pf-hero-lead">
                This case study may have moved or been removed from the catalog.
              </p>
            </motion.div>
          </div>
        </header>
        <div className="pf-workspace">
          <div className="pf-workspace-inner pf-workspace-inner--narrow">
            <div className={styles.notFound} role="status">
              <EmptyStateArt
                variant="projects"
                className={styles.notFoundArt}
              />
              <div className={styles.notFoundActions}>
                <LinkButton to="/projects" variant="primary">
                  Browse all projects
                </LinkButton>
                <LinkButton to="/" variant="outline">
                  Home
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const showProjectImage = Boolean(resolvedImageSrc) && !imageFailed;
  const categoryLabel = formatCategory(project.category);
  const duration = getDuration(project.startDate, project.endDate);
  const overview =
    project.longDescription?.trim() || project.description?.trim() || "";
  const stackCount = project.technologies.length;
  const outcomeCount = project.achievements.length;
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  return (
    <motion.div
      className={`pf-page ${styles.page}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="pf-hero" aria-labelledby="project-detail-title">
        <motion.div className="pf-hero-mesh" aria-hidden="true" />
        <div
          className={`pf-hero-inner pf-hero-inner--visual ${styles.heroInner}`}
        >
          <motion.div className="pf-hero-main">
            <motion.div className={styles.heroCopy} {...fadeUp(reduced)}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link to="/projects">Projects</Link>
                <span aria-hidden="true">/</span>
                <span>{categoryLabel}</span>
              </nav>

              <p className="pf-eyebrow">Case study</p>
              <h1 id="project-detail-title" className="pf-hero-title">
                {project.title}
              </h1>

              <div className={styles.metaRow}>
                <span className={styles.categoryBadge}>{categoryLabel}</span>
                {project.isActive ? (
                  <span className={styles.activeBadge}>In progress</span>
                ) : (
                  <span className={styles.shippedBadge}>Shipped</span>
                )}
                <time dateTime={project.startDate} className={styles.date}>
                  {formatDateRange(project.startDate, project.endDate)}
                </time>
              </div>

              <p className={`pf-hero-lead ${styles.heroLead}`}>
                {project.description}
              </p>

              <div className={styles.heroActions}>
                {project.liveUrl ? (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() =>
                      window.open(
                        project.liveUrl,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    Live demo
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      window.open(
                        project.githubUrl,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    View code
                  </Button>
                ) : null}
                <LinkButton to="/projects" variant="ghost" size="lg">
                  All projects
                </LinkButton>
              </div>
            </motion.div>

            <motion.ul
              className={`pf-hero-stats pf-hero-stats--four ${styles.heroStats}`}
              aria-label="Project snapshot"
              {...fadeUp(reduced, 0.08)}
            >
              <li>
                <span className="pf-stat-value">{stackCount || "—"}</span>
                <span className="pf-stat-label">Technologies</span>
              </li>
              <li>
                <span className="pf-stat-value">{outcomeCount || "—"}</span>
                <span className="pf-stat-label">Outcomes</span>
              </li>
              <li>
                <span className="pf-stat-value">{duration}</span>
                <span className="pf-stat-label">Timeline</span>
              </li>
              <li>
                <span className="pf-stat-value">
                  {project.isActive ? "Active" : "Done"}
                </span>
                <span className="pf-stat-label">Status</span>
              </li>
            </motion.ul>
          </motion.div>

          <motion.figure
            className={styles.heroCover}
            {...fadeUp(reduced, 0.06)}
          >
            {showProjectImage ? (
              <img
                src={resolvedImageSrc}
                alt={`${project.title} — preview`}
                width={960}
                height={720}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <span className={styles.coverFallback} aria-hidden="true">
                {project.title.trim().charAt(0).toUpperCase() || "·"}
              </span>
            )}
          </motion.figure>
        </div>
      </header>

      <div className={`pf-workspace ${styles.workspace}`}>
        <div className={`pf-workspace-inner ${styles.caseInner}`}>
          <aside className={styles.facts} aria-label="Project details">
            <motion.div className={styles.factsCard} {...fadeUp(reduced, 0.04)}>
              <h2 className={styles.factsTitle}>At a glance</h2>
              <dl className={styles.factsList}>
                <div>
                  <dt>Category</dt>
                  <dd>{categoryLabel}</dd>
                </div>
                <div>
                  <dt>Timeline</dt>
                  <dd>
                    <time dateTime={project.startDate}>
                      {formatDateRange(project.startDate, project.endDate)}
                    </time>
                    <span className={styles.factsMuted}> · {duration}</span>
                  </dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{project.isActive ? "In progress" : "Shipped"}</dd>
                </div>
              </dl>

              {hasLinks ? (
                <div className={styles.factsLinks}>
                  <p className={styles.factsLinksLabel}>Links</p>
                  <ul>
                    {project.liveUrl ? (
                      <li>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live demo →
                        </a>
                      </li>
                    ) : null}
                    {project.githubUrl ? (
                      <li>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Repository →
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}

              {stackCount > 0 ? (
                <div className={styles.factsStack}>
                  <p className={styles.factsLinksLabel}>Stack</p>
                  <ul className={styles.stackPills}>
                    {project.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.div>
          </aside>

          <motion.div className={styles.story} {...fadeUp(reduced, 0.05)}>
            {overview ? (
              <section
                className={styles.section}
                aria-labelledby="overview-title"
              >
                <header className={styles.sectionHead}>
                  <p className="pf-block-eyebrow">Overview</p>
                  <h2 id="overview-title" className={styles.sectionTitle}>
                    What we built
                  </h2>
                </header>
                <div className={styles.prose}>
                  {overview.split(/\n\n+/).map((paragraph, i) => (
                    <p key={i}>{paragraph.trim()}</p>
                  ))}
                </div>
              </section>
            ) : null}

            {outcomeCount > 0 ? (
              <section
                className={styles.section}
                aria-labelledby="outcomes-title"
              >
                <header className={styles.sectionHead}>
                  <p className="pf-block-eyebrow">Outcomes</p>
                  <h2 id="outcomes-title" className={styles.sectionTitle}>
                    Impact & results
                  </h2>
                </header>
                <ol className={styles.outcomeGrid}>
                  {project.achievements.map((item, index) => (
                    <li key={index} className={styles.outcomeCard}>
                      <span className={styles.outcomeIndex} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {project.architecture?.trim() ? (
              <section
                className={styles.section}
                aria-labelledby="architecture-title"
              >
                <header className={styles.sectionHead}>
                  <p className="pf-block-eyebrow">Technical</p>
                  <h2 id="architecture-title" className={styles.sectionTitle}>
                    Architecture notes
                  </h2>
                </header>
                <pre className={styles.architecture}>
                  {project.architecture}
                </pre>
              </section>
            ) : null}
          </motion.div>
        </div>
      </div>

      {neighbors.prev || neighbors.next ? (
        <nav className={styles.pager} aria-label="Other projects">
          <div className={styles.pagerInner}>
            {neighbors.prev ? (
              <Link
                to={`/projects/${neighbors.prev.id}`}
                className={styles.pagerLink}
              >
                <span className={styles.pagerDir}>Previous</span>
                <span className={styles.pagerTitle}>
                  {neighbors.prev.title}
                </span>
              </Link>
            ) : (
              <span className={styles.pagerPlaceholder} />
            )}
            <Link to="/projects" className={styles.pagerCatalog}>
              All projects
            </Link>
            {neighbors.next ? (
              <Link
                to={`/projects/${neighbors.next.id}`}
                className={`${styles.pagerLink} ${styles.pagerLinkNext}`}
              >
                <span className={styles.pagerDir}>Next</span>
                <span className={styles.pagerTitle}>
                  {neighbors.next.title}
                </span>
              </Link>
            ) : (
              <span className={styles.pagerPlaceholder} />
            )}
          </div>
        </nav>
      ) : null}

      {relatedProjects.length > 0 ? (
        <div className={`pf-workspace ${styles.relatedWorkspace}`}>
          <div className="pf-workspace-inner">
            <header className="pf-block-head">
              <div>
                <p className="pf-block-eyebrow">More work</p>
                <h2 className="pf-block-title">Related projects</h2>
                <p className="pf-block-lead">
                  More {categoryLabel.toLowerCase()} builds from the same
                  catalog.
                </p>
              </div>
            </header>
            <ProjectSpotlight projects={relatedProjects} />
          </div>
        </div>
      ) : null}

      <section
        className={`pf-cta ${styles.cta}`}
        aria-labelledby="project-cta-title"
      >
        <div className="page-cta-band">
          <h2 id="project-cta-title" className={styles.ctaTitle}>
            Like what you see?
          </h2>
          <p className="page-cta-body">{SITE_DEFAULT_DESCRIPTION}</p>
          <div className="page-cta-actions">
            <LinkButton to="/contact" variant="primary" size="lg">
              Start a conversation
            </LinkButton>
            <LinkButton to="/projects" variant="outline" size="lg">
              More projects
            </LinkButton>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
