/**
 * ProjectCard Component - Domain Component
 * Displays project information in a card format
 */

import React from "react";
import type { Project } from "@/types/domain";
import { Card } from "@/views/components/ui/Card";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { formatDateRange } from "@/utils/dateUtils";
import styles from "./ProjectCard.module.css";

export interface ProjectCardProps {
  project: Project;
  onViewDetails?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails,
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(project.id);
    }
  };

  return (
    <Card
      variant="elevated"
      className={styles.projectCard}
      role="article"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className={styles.header}>
        <div className={styles.category}>
          <span
            className={styles.categoryBadge}
            aria-label={`Category: ${project.category}`}
          >
            {project.category}
          </span>
          {project.isActive && (
            <span className={styles.activeBadge} aria-label="Active project">
              Active
            </span>
          )}
        </div>
        <Typography
          variant="h4"
          weight="semibold"
          as="h3"
          id={`project-${project.id}-title`}
        >
          {project.title}
        </Typography>
        <Typography
          variant="small"
          color="tertiary"
          as="time"
          dateTime={project.startDate}
        >
          {formatDateRange(project.startDate, project.endDate)}
        </Typography>
      </div>

      <div className={styles.content}>
        <Typography variant="body" color="secondary">
          {project.description}
        </Typography>

        {project.technologies.length > 0 && (
          <div className={styles.technologies}>
            {project.technologies.slice(0, 5).map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className={styles.techTag}>
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>
        )}

        {project.achievements.length > 0 && (
          <ul className={styles.achievements}>
            {project.achievements.slice(0, 2).map((achievement, index) => (
              <li key={index}>
                <Typography variant="small" color="secondary">
                  {achievement}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.footer} role="group" aria-label="Project actions">
        {project.githubUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open(project.githubUrl, "_blank", "noopener,noreferrer")
            }
            aria-label={`View ${project.title} on GitHub`}
          >
            GitHub
          </Button>
        )}
        {project.liveUrl && (
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              window.open(project.liveUrl, "_blank", "noopener,noreferrer")
            }
            aria-label={`View live demo of ${project.title}`}
          >
            Live Demo
          </Button>
        )}
        {onViewDetails && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewDetails}
            aria-label={`View details for ${project.title}`}
          >
            View Details
          </Button>
        )}
      </div>
    </Card>
  );
};
