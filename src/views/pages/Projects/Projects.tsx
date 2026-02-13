/**
 * Projects Page - Showcase all projects
 * Version 2: Uses ProfileContext
 */

import React, { useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Loading } from "@/views/components/ui/Loading";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { PageError } from "@/views/components/ui/PageError";
import { ProjectCard } from "@/views/components/domain/ProjectCard";
import styles from "./Projects.module.css";

export const Projects: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useSEO({
    title: profile
      ? `${profile.name} - Projects | Portfolio`
      : "Projects | Ricky Chen Portfolio",
    description: profile
      ? `Projects by ${profile.name}: ${profile.projects.length} projects in web, mobile, AI, and more.`
      : "Portfolio projects: web, mobile, AI, and full-stack development.",
    keywords: "projects, portfolio, web development, mobile, software",
    type: "website",
  });

  if (isLoading) {
    return <Loading fullScreen message="Loading projects..." />;
  }

  if (error || !profile) {
    return (
      <PageError
        title="Failed to load projects"
        message={
          error?.message ||
          "Something went wrong while loading projects. Please try again in a moment."
        }
        onRetry={refetch}
        retryLabel="Retry"
      />
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
      variant="alt"
    >
      <ScrollReveal direction="up" delay={0}>
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
      </ScrollReveal>

      {filteredProjects.length === 0 && (
        <div
          className={styles.empty}
          role="status"
          aria-live="polite"
          aria-labelledby="projects-empty-title"
        >
          <span className={styles.emptyIcon} aria-hidden="true">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </span>
          <Typography
            id="projects-empty-title"
            variant="h4"
            weight="semibold"
            color="secondary"
          >
            {selectedCategory === "all"
              ? "No projects yet"
              : "No projects in this category"}
          </Typography>
          <Typography variant="body" color="tertiary">
            {selectedCategory === "all"
              ? "Projects will appear here once added. Check back later or explore About and Experience."
              : `No projects in "${selectedCategory}". Try another category or view all.`}
          </Typography>
          {selectedCategory !== "all" && (
            <Button
              onClick={() => setSelectedCategory("all")}
              variant="outline"
              className={styles.viewAllButton}
              aria-label="Clear filter and view all projects"
            >
              View All Projects
            </Button>
          )}
        </div>
      )}
    </Section>
  );
};
