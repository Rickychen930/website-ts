import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Section } from "@/components/layout/Section/Section";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { WorkCard } from "@/components/domain/WorkCard/WorkCard";
import { sitePlateForProject } from "@/config/flowMedia";
import { useProfile } from "@/contexts";
import type { Project } from "@/types/domain";
import styles from "./ProjectsSection.module.css";

type Filter = "all" | Project["category"];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Fullstack" },
  { key: "ai", label: "AI" },
  { key: "web", label: "Web" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
];

/* Staggered editorial rhythm — repeats every four works */
const LAYOUT = [
  { cls: "slotA", shape: "landscape" },
  { cls: "slotB", shape: "portrait" },
  { cls: "slotC", shape: "portrait" },
  { cls: "slotD", shape: "landscape" },
] as const;

const MAX_ON_HOME = 6;

export const ProjectsSection: React.FC = () => {
  const { profile } = useProfile();
  const [filter, setFilter] = useState<Filter>("all");

  const all = profile?.projects ?? [];
  const ids = all.map((p) => p.id);
  const filtered =
    filter === "all" ? all : all.filter((p) => p.category === filter);
  const shown = filtered.slice(0, MAX_ON_HOME);
  const available = FILTERS.filter(
    (f) => f.key === "all" || all.some((p) => p.category === f.key),
  );

  return (
    <Section id="projects" label="Projects" tone="sand" stack>
      <div className={styles.head}>
        <RevealText
          as="h2"
          className={styles.heading}
          lines={["Selected", <em key="w">projects.</em>]}
        />
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
              className={[styles.filterBtn, filter === key && styles.active]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className={styles.empty}>No projects in this category yet.</p>
      ) : (
        <div className={styles.grid} key={filter}>
          {shown.map((project, i) => {
            const slot = LAYOUT[i % LAYOUT.length];
            return (
              <WorkCard
                key={project.id}
                project={project}
                plate={sitePlateForProject(ids, project.id)}
                shape={slot.shape}
                className={styles[slot.cls]}
              />
            );
          })}
        </div>
      )}

      {all.length > 0 && (
        <div className={styles.more}>
          <Link to="/projects" className={styles.moreLink}>
            <span>View all {all.length} projects</span>
            <span className={styles.moreArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      )}
    </Section>
  );
};
