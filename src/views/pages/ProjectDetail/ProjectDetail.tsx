/**
 * ProjectDetail Page - Full project details (no dropdown)
 */

import React from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { formatDateRange } from "@/utils/dateUtils";
import type { Project } from "@/types/domain";
import styles from "./ProjectDetail.module.css";

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { profile, isLoading, error, refetch } = useProfile();

  const project: Project | undefined = profile?.projects.find(
    (p) => p.id === projectId,
  );

  useSEO({
    title: project
      ? `${project.title} | ${profile?.name ?? "Portfolio"} - Projects`
      : "Project | Portfolio",
    description: project?.description ?? "Project details.",
    type: "website",
  });

  if (isLoading) {
    return <Loading fullScreen message="Loading project..." />;
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
      <Section title="Project not found" id="project-detail" variant="alt">
        <div className={styles.wrap}>
          <div className={styles.notFound} role="status">
            <Typography
              variant="h4"
              weight="semibold"
              color="secondary"
              className={styles.notFoundTitle}
            >
              This project could not be found or may have been removed. Use the
              navigation to go back to Projects.
            </Typography>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section
      title={project.title}
      subtitle={formatDateRange(project.startDate, project.endDate)}
      id="project-detail"
      variant="alt"
    >
      <ScrollReveal direction="up" delay={0}>
        <div className={styles.wrap}>
          <article
            className={styles.card}
            aria-labelledby="project-detail-title"
          >
            {project.imageUrl && (
              <div className={styles.imageWrap}>
                <img
                  src={project.imageUrl}
                  alt=""
                  width={800}
                  height={800}
                  loading="eager"
                />
              </div>
            )}
            <header className={styles.header}>
              <div className={styles.meta}>
                <span
                  className={styles.categoryBadge}
                  aria-label={`Category: ${project.category}`}
                >
                  {project.category}
                </span>
                {project.isActive && (
                  <span
                    className={styles.activeBadge}
                    aria-label="Active project"
                  >
                    Active
                  </span>
                )}
                <Typography
                  variant="small"
                  color="tertiary"
                  as="time"
                  dateTime={project.startDate}
                  className={styles.date}
                >
                  {formatDateRange(project.startDate, project.endDate)}
                </Typography>
              </div>
              <Typography
                variant="h2"
                weight="bold"
                as="h1"
                id="project-detail-title"
              >
                {project.title}
              </Typography>
            </header>

            <Typography
              variant="body"
              color="secondary"
              className={styles.description}
            >
              {project.description}
            </Typography>

            {project.longDescription && (
              <div className={styles.section}>
                <Typography
                  variant="h5"
                  weight="semibold"
                  as="h2"
                  className={styles.sectionTitle}
                >
                  Overview
                </Typography>
                <Typography
                  variant="body"
                  color="secondary"
                  className={styles.description}
                >
                  {project.longDescription}
                </Typography>
              </div>
            )}

            {project.technologies.length > 0 && (
              <div className={styles.section}>
                <Typography
                  variant="h5"
                  weight="semibold"
                  as="h2"
                  className={styles.sectionTitle}
                >
                  Technologies
                </Typography>
                <div className={styles.technologies}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.achievements.length > 0 && (
              <div className={styles.section}>
                <Typography
                  variant="h5"
                  weight="semibold"
                  as="h2"
                  className={styles.sectionTitle}
                >
                  Achievements
                </Typography>
                <ul className={styles.achievements}>
                  {project.achievements.map((achievement, index) => (
                    <li key={index}>
                      <Typography variant="body" color="secondary">
                        {achievement}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.architecture && (
              <div className={styles.section}>
                <Typography
                  variant="h5"
                  weight="semibold"
                  as="h2"
                  className={styles.sectionTitle}
                >
                  Architecture
                </Typography>
                <pre className={styles.architecture}>
                  {project.architecture}
                </pre>
              </div>
            )}

            <div
              className={styles.actions}
              role="group"
              aria-label="Project links"
            >
              {project.liveUrl && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() =>
                    window.open(
                      project.liveUrl,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  aria-label={`View live demo of ${project.title}`}
                >
                  Live Demo
                </Button>
              )}
            </div>
          </article>
        </div>
      </ScrollReveal>
    </Section>
  );
};
