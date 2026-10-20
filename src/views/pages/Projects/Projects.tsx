import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "@/lib/motion";
import { WorkCard } from "@/components/domain/WorkCard/WorkCard";
import { RevealMedia } from "@/components/motion/RevealMedia/RevealMedia";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import { FLOW_MEDIA, sitePlateForProject } from "@/config/flowMedia";
import { useProfile } from "@/contexts";
import { useSEO } from "@/hooks/useSEO";
import type { Project } from "@/types/domain";
import { PROJECT_CATEGORY_LABEL } from "@/config/site-defaults";
import styles from "./Projects.module.css";

type Filter = "all" | Project["category"];
type View = "grid" | "index";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Fullstack" },
  { key: "ai", label: "AI" },
  { key: "web", label: "Web" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "other", label: "Other" },
];

const SHAPES = ["portrait", "landscape", "portrait"] as const;

const Skeleton: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.inner}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    </div>
  </div>
);

export const Projects: React.FC = () => {
  const { profile, isLoading } = useProfile();
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");

  useSEO({
    title: "Projects — Ricky Chen",
    description:
      "Every project by Ricky Chen: fullstack products, AI systems, backends and mobile apps.",
  });

  if (isLoading) return <Skeleton />;

  const all = profile?.projects ?? [];
  const ids = all.map((p) => p.id);
  const filtered =
    filter === "all" ? all : all.filter((p) => p.category === filter);
  const available = FILTERS.filter(
    (f) => f.key === "all" || all.some((p) => p.category === f.key),
  );

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Projects</span>
        </nav>

        <header className={styles.hero}>
          <RevealText
            as="h1"
            immediate
            delay={0.35}
            className={styles.heading}
            lines={["All", <em key="w">projects.</em>]}
          />
          <p className={styles.lede}>
            {all.length} projects across AI, full-stack, backend and mobile —
            filter by discipline or switch to a compact list.
          </p>
        </header>

        <RevealMedia
          item={FLOW_MEDIA.kataTjuta}
          frameClassName={styles.heroFrame}
          parallax={20}
          priority
          delay={0.7}
        />

        <div className={styles.toolbar}>
          <div
            className={styles.filters}
            role="group"
            aria-label="Filter projects"
          >
            {available.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                className={[styles.chip, filter === key && styles.chipOn]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className={styles.views} role="group" aria-label="Layout">
            {(["grid", "index"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                className={[styles.chip, view === v && styles.chipOn]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setView(v)}
              >
                {v === "grid" ? "Grid" : "List"}
              </button>
            ))}
            <span className={styles.count}>{filtered.length} projects</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className={styles.empty}>No projects in this category yet.</p>
        ) : view === "grid" ? (
          <div className={styles.grid} key={`g-${filter}`}>
            {filtered.map((project, i) => (
              <WorkCard
                key={project.id}
                project={project}
                plate={sitePlateForProject(ids, project.id, project.title)}
                shape={SHAPES[i % SHAPES.length]}
                className={styles[`col${i % 3}`]}
              />
            ))}
          </div>
        ) : (
          <ol className={styles.index} key={`i-${filter}`}>
            {filtered.map((project, i) => {
              const plate = sitePlateForProject(ids, project.id, project.title);
              return (
                <motion.li
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(i, 10) * 0.04,
                  }}
                >
                  <Link to={`/projects/${project.id}`} className={styles.row}>
                    <span className={styles.rowNum}>
                      {new Date(project.startDate).getFullYear()}
                    </span>
                    <span className={styles.thumb} aria-hidden="true">
                      <FlowMedia item={plate} showPendingLabel={false} />
                    </span>
                    <span className={styles.rowTitle}>{project.title}</span>
                    <span className={styles.rowMeta}>
                      {PROJECT_CATEGORY_LABEL[project.category]}
                    </span>
                    <span className={styles.rowMeta}>
                      {project.technologies.slice(0, 2).join(" · ")}
                    </span>
                    <span className={styles.rowArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
};
