/**
 * Projects Page - Showcase all projects
 * Version 2: Uses ProfileContext
 */

import React, { useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { Section } from "@/views/components/layout/Section";
import { Loading } from "@/views/components/ui/Loading";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { ProjectCard } from "@/views/components/domain/ProjectCard";
import styles from "./Projects.module.css";

export const Projects: React.FC = () => {
  const { profile, isLoading, error } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  if (isLoading) {
    return <Loading fullScreen message="Loading projects..." />;
  }

  if (error || !profile) {
    return (
      <div className={styles.error} role="alert" aria-live="assertive">
        <Typography variant="h3">Failed to load projects</Typography>
        <Typography variant="body" color="secondary">
          {error?.message ||
            "Something went wrong while loading projects. Please refresh the page or try again in a moment."}
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="primary"
          className={styles.retryButton}
          aria-label="Retry loading projects"
        >
          Retry
        </Button>
      </div>
    );
  }

  const categories = [
    "all",
    ...Array.from(new Set(profile.projects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? profile.projects
      : profile.getProjectsByCategory(selectedCategory as any);

  return (
    <Section
      title="Projects"
      subtitle="A collection of my work and side projects"
    >
      <div
        className={styles.filters}
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`${styles.filterButton} ${selectedCategory === category ? styles.filterButtonActive : ""}`}
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            aria-label={`Filter by ${category}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.projectsGrid} role="list" aria-label="Projects">
        {filteredProjects.map((project) => (
          <div key={project.id} role="listitem">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className={styles.empty} role="status" aria-live="polite">
          <Typography variant="h4" weight="semibold" color="secondary">
            No projects found
          </Typography>
          <Typography variant="body" color="tertiary">
            {selectedCategory === "all"
              ? "No projects available at the moment."
              : `No projects found in the "${selectedCategory}" category.`}
          </Typography>
          {selectedCategory !== "all" && (
            <Button
              onClick={() => setSelectedCategory("all")}
              variant="outline"
              className={styles.viewAllButton}
            >
              View All Projects
            </Button>
          )}
        </div>
      )}
    </Section>
  );
};
