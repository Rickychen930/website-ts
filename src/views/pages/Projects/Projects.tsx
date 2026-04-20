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
import { Button, LinkButton } from "@/views/components/ui/Button";
import { PageError } from "@/views/components/ui/PageError";
import { ProjectCard } from "@/views/components/domain/ProjectCard";
import { sitePageTitle } from "@/config/site-defaults";
import { EmptyStateArt } from "@/components/PortfolioVisuals";
import styles from "./Projects.module.css";

export const Projects: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useSEO({
    title: profile
      ? `${profile.name} - Projects | Portfolio`
      : sitePageTitle("Projects"),
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
      label="Work"
      title="Projects"
      subtitle="Case studies and shipped work — from studio sites and commerce to mobile and platform plugins. Use filters to scan by stack, like a public portfolio grid."
      info={`${profile.projects.length} project${profile.projects.length !== 1 ? "s" : ""} · filter by category`}
      headerAlign="start"
      id="projects"
      surface="hero"
    >
      <div className={styles.inner}>
        <div className={styles.trackAccent} aria-hidden="true" />
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

          <div
            className={styles.projectsGrid}
            role="list"
            aria-label="Projects"
          >
            {filteredProjects.map((project) => (
              <div key={project.id} role="listitem">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {filteredProjects.length > 0 && (
          <aside
            className={styles.ctaBand}
            aria-labelledby="projects-cta-heading"
          >
            <Typography
              id="projects-cta-heading"
              variant="h4"
              weight="semibold"
              className={styles.ctaTitle}
            >
              Want to work together?
            </Typography>
            <Typography
              variant="body"
              color="secondary"
              className={styles.ctaBody}
            >
              Open to full-time engineering roles and interesting projects.
              Whether you're recruiting, building a product, or exploring a
              collaboration — I'd love to hear what you're working on.
            </Typography>
            <div className={styles.ctaActions}>
              <LinkButton
                to="/contact"
                variant="primary"
                aria-label="Start a conversation on the contact page"
              >
                Get in touch
              </LinkButton>
              <LinkButton
                to="/about"
                variant="outline"
                aria-label="Read more on the about page"
              >
                About &amp; background
              </LinkButton>
            </div>
            <Typography
              variant="small"
              color="tertiary"
              className={styles.ctaAttribution}
            >
              Additional public case blurbs and industry-filtered samples:{" "}
              <a
                href="https://www.web-architech.com.au/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaExternalLink}
              >
                web-architech.com.au/portfolio
              </a>
            </Typography>
          </aside>
        )}

        {filteredProjects.length === 0 && (
          <div
            className={styles.empty}
            role="status"
            aria-live="polite"
            aria-labelledby="projects-empty-title"
          >
            <div className={styles.emptyArt} aria-hidden="true">
              <EmptyStateArt
                variant="projects"
                className={styles.emptyArtSvg}
              />
            </div>
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
            <div className={styles.emptyActions}>
              {selectedCategory !== "all" ? (
                <Button
                  onClick={() => setSelectedCategory("all")}
                  variant="outline"
                  aria-label="Clear filter and view all projects"
                >
                  View All Projects
                </Button>
              ) : (
                <>
                  <LinkButton
                    to="/contact"
                    variant="primary"
                    aria-label="Get in touch"
                  >
                    Get in Touch
                  </LinkButton>
                  <LinkButton
                    to="/"
                    variant="outline"
                    aria-label="Back to home"
                  >
                    Back to Home
                  </LinkButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};
