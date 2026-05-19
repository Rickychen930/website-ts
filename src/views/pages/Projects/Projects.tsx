/**
 * Projects — portfolio catalog.
 */

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { LinkButton } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { PageHeroVisual } from "@/views/components/layout/PageHeroVisual";
import { ProjectSpotlight } from "@/views/components/domain/ProjectSpotlight";
import { ProjectCatalogRow } from "@/views/components/domain/ProjectCatalogRow";
import { EmptyStateArt } from "@/components/PortfolioVisuals";
import {
  pickFeaturedProjects,
  sortProjectsByRecency,
} from "@/utils/projectSort";
import { SITE_BRAND_NAME } from "@/config/site-defaults";
import type { Project } from "@/types/domain";
import styles from "./Projects.module.css";

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

export const Projects: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const reduced = useReducedMotion() ?? false;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useSEO({
    title: profile
      ? `${profile.name} — Projects`
      : `${SITE_BRAND_NAME} — Projects`,
    description:
      profile?.bio ||
      "Portfolio projects: web, mobile, AI, and full-stack development.",
    keywords: "projects, portfolio, web development, mobile, software",
    type: "website",
  });

  const projectData = useMemo(() => {
    if (!profile) {
      return {
        sorted: [] as Project[],
        categories: ["all"] as string[],
        counts: { all: 0 } as Record<string, number>,
        activeCount: 0,
        featured: [] as Project[],
      };
    }
    const sorted = sortProjectsByRecency(profile.projects);
    const categorySet = new Set(
      profile.projects.map((p) => p.category).filter(Boolean),
    );
    const categories = ["all", ...Array.from(categorySet).sort()];
    const counts: Record<string, number> = { all: profile.projects.length };
    for (const cat of categorySet) {
      counts[cat] = profile.getProjectsByCategory(
        cat as Project["category"],
      ).length;
    }
    const activeCount = profile.projects.filter((p) => p.isActive).length;
    const featured = pickFeaturedProjects(profile.projects, 3);
    return { sorted, categories, counts, activeCount, featured };
  }, [profile]);

  if (isLoading) {
    return <Loading fullScreen message="Loading projects..." />;
  }

  if (error || !profile) {
    return (
      <PageError
        title="Failed to load projects"
        message={error?.message || "Please try again later."}
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  const { categories, counts, activeCount, featured } = projectData;
  const filteredProjects =
    selectedCategory === "all"
      ? projectData.sorted
      : sortProjectsByRecency(
          profile.getProjectsByCategory(
            selectedCategory as Project["category"],
          ),
        );

  const showSpotlight =
    selectedCategory === "all" &&
    featured.length > 0 &&
    filteredProjects.length > 0;

  const catalogProjects = showSpotlight
    ? filteredProjects.filter((p) => !featured.some((f) => f.id === p.id))
    : filteredProjects;

  const categoryLabel = formatCategory(selectedCategory);

  return (
    <motion.div
      className={`pf-page ${styles.page}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="pf-hero" aria-labelledby="projects-hero-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <div
          className={`pf-hero-inner pf-hero-inner--visual ${styles.heroInner}`}
        >
          <motion.div className="pf-hero-main">
            <motion.div
              className={`pf-hero-copy ${styles.heroCopy}`}
              {...fadeUp(reduced)}
            >
              <p className="pf-eyebrow">Portfolio</p>
              <h1 id="projects-hero-title" className="pf-hero-title">
                Projects
              </h1>
              <p className={`pf-hero-lead ${styles.heroLead}`}>
                AI tools, client platforms, and product case studies — from
                Decode Capital and Web Architech to Samsung-scale plugins.
              </p>
            </motion.div>

            <motion.ul
              className={`pf-hero-stats pf-hero-stats--three ${styles.heroStatsBar}`}
              aria-label="Project overview"
              {...fadeUp(reduced, 0.08)}
            >
              <li>
                <span className="pf-stat-value">{profile.projects.length}</span>
                <span className="pf-stat-label">Shipped</span>
              </li>
              <li>
                <span className="pf-stat-value">{categories.length - 1}</span>
                <span className="pf-stat-label">Disciplines</span>
              </li>
              <li>
                <span className="pf-stat-value">{activeCount}</span>
                <span className="pf-stat-label">Active</span>
              </li>
            </motion.ul>
          </motion.div>

          <PageHeroVisual pageKey="projects" priority />
        </div>
      </header>

      <motion.div className={`pf-workspace ${styles.workspace}`}>
        <motion.div className={`pf-workspace-inner ${styles.workspaceInner}`}>
          <aside className={styles.sidebar} aria-label="Filter by category">
            <p className={styles.sidebarTitle}>Category</p>
            <ul className={styles.filterList}>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    className={`${styles.filterItem} ${
                      selectedCategory === cat ? styles.filterItemActive : ""
                    }`}
                    aria-pressed={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>
                      {cat === "all" ? "All projects" : formatCategory(cat)}
                    </span>
                    <span className={styles.filterCount}>
                      {counts[cat] ?? 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <motion.div className={styles.main}>
            <header className={styles.mainHeader}>
              <div>
                <p className={styles.mainEyebrow}>
                  {selectedCategory === "all" ? "Full catalog" : categoryLabel}
                </p>
                <h2 className={styles.mainTitle}>
                  {selectedCategory === "all"
                    ? "All shipped work"
                    : `${categoryLabel} projects`}
                </h2>
              </div>
              <p className={styles.mainCount}>
                {filteredProjects.length} project
                {filteredProjects.length !== 1 ? "s" : ""}
              </p>
            </header>

            {filteredProjects.length === 0 ? (
              <div className={styles.empty} role="status">
                <div className={styles.emptyArt} aria-hidden="true">
                  <EmptyStateArt variant="projects" />
                </div>
                <p className={styles.emptyText}>
                  No projects in this category yet. Try another filter or check
                  back later.
                </p>
                <div className={styles.emptyActions}>
                  <button
                    type="button"
                    className={styles.filterItem}
                    onClick={() => setSelectedCategory("all")}
                  >
                    Show all projects
                  </button>
                </div>
              </div>
            ) : (
              <>
                {showSpotlight ? (
                  <section
                    className={styles.spotlightSection}
                    aria-label="Featured projects"
                  >
                    <h3 className={styles.sectionLabel}>Featured</h3>
                    <ProjectSpotlight projects={featured} />
                  </section>
                ) : null}

                {catalogProjects.length > 0 ? (
                  <section
                    className={styles.catalogSection}
                    aria-label="Project catalog"
                  >
                    {showSpotlight ? (
                      <h3 className={styles.sectionLabel}>More projects</h3>
                    ) : null}
                    <ul className={styles.catalogList}>
                      {catalogProjects.map((project, index) => (
                        <li key={project.id}>
                          <ProjectCatalogRow project={project} index={index} />
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      <section
        className={`pf-cta ${styles.cta}`}
        aria-labelledby="projects-cta-title"
      >
        <div className="page-cta-band">
          <h2 id="projects-cta-title" className={styles.ctaTitle}>
            Want to work together?
          </h2>
          <p className="page-cta-body">
            Open to full-time engineering roles and strong collaborations. Tell
            me what you&apos;re building.
          </p>
          <div className="page-cta-actions">
            <LinkButton to="/contact" variant="primary" size="lg">
              Get in touch
            </LinkButton>
            <LinkButton to="/resume" variant="outline" size="lg">
              View resume
            </LinkButton>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
