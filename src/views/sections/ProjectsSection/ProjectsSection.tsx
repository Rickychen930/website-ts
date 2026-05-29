import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "@/lib/motion";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { Tag } from "@/components/ui/Tag/Tag";
import { Card } from "@/components/ui/Card/Card";
import { Section } from "@/components/layout/Section/Section";
import { useProfile } from "@/contexts";
import type { Project } from "@/types/domain";
import styles from "./ProjectsSection.module.css";

type Filter = "all" | Project["category"];
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "ai", label: "AI" },
  { key: "fullstack", label: "Fullstack" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
];

const CATEGORY_GRADIENT: Record<string, string> = {
  ai: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  web: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  fullstack: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
  backend: "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
  mobile: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  other: "linear-gradient(135deg, #71717a 0%, #3f3f46 100%)",
};

const GitHubIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured }) => {
  const [hovered, setHovered] = useState(false);
  const gradient =
    CATEGORY_GRADIENT[project.category] ?? CATEGORY_GRADIENT.other;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={[styles.projectCard, featured && styles.featured]
        .filter(Boolean)
        .join(" ")}
      data-cursor="view"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card tilt glow className={styles.cardInner}>
        {/* Gradient image area */}
        <div className={styles.imgArea} style={{ background: gradient }}>
          <span className={styles.categoryLabel}>{project.category}</span>
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.desc}>
            {(project.description ?? "").slice(0, featured ? 180 : 120)}
            {(project.description ?? "").length > (featured ? 180 : 120)
              ? "…"
              : ""}
          </p>

          <div className={styles.tags}>
            {project.technologies.slice(0, 4).map((t) => (
              <Tag key={t} variant="accent">
                {t}
              </Tag>
            ))}
          </div>
        </div>

        {/* Hover reveal */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className={styles.hoverReveal}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            >
              <a href={`/projects/${project.id}`} className={styles.revealLink}>
                View case study →
              </a>
              <div className={styles.revealActions}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    data-cursor="open"
                    className={styles.iconLink}
                  >
                    <GitHubIcon />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live site"
                    data-cursor="open"
                    className={styles.iconLink}
                  >
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.article>
  );
};

export const ProjectsSection: React.FC = () => {
  const { profile } = useProfile();
  const [filter, setFilter] = useState<Filter>("all");

  const all = profile?.projects ?? [];
  const filtered =
    filter === "all" ? all : all.filter((p) => p.category === filter);

  const availableFilters = FILTERS.filter(
    (f) => f.key === "all" || all.some((p) => p.category === f.key),
  );

  return (
    <Section id="projects" sectionNumber="04" data-section="projects">
      <div className={styles.header}>
        <FadeUp>
          <span className={styles.sectionLabel}>Projects</span>
          <h2 className={styles.heading}>Things I've built</h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div
            className={styles.filters}
            role="tablist"
            aria-label="Filter projects"
          >
            <LayoutGroup id="filter">
              {availableFilters.map(({ key, label }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={filter === key}
                  className={[
                    styles.filterBtn,
                    filter === key && styles.filterActive,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setFilter(key)}
                >
                  {label}
                  {filter === key && (
                    <motion.span
                      layoutId="filter-indicator"
                      className={styles.filterIndicator}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </LayoutGroup>
          </div>
        </FadeUp>
      </div>

      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filtered.slice(0, 6).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={i === 0}
            />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.p
            className={styles.empty}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>

      {all.length > 6 && (
        <FadeUp delay={0.2}>
          <div className={styles.viewAll}>
            <a href="/projects" className={styles.viewAllLink}>
              View all {all.length} projects →
            </a>
          </div>
        </FadeUp>
      )}
    </Section>
  );
};
