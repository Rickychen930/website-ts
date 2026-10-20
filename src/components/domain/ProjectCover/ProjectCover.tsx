import React from "react";
import { flowSrc, MASCOT } from "@/config/flowMedia";
import { PROJECT_CATEGORY_LABEL } from "@/config/site-defaults";
import type { Project } from "@/types/domain";
import styles from "./ProjectCover.module.css";

type Tone = "violet" | "blue" | "lime" | "pink" | "slate";

const TONES: readonly Tone[] = ["violet", "blue", "lime", "pink", "slate"];

/** Stable tone per project (AI work always violet) so neighbours differ */
const toneFor = (title: string, category: Project["category"]): Tone => {
  if (category === "ai") return "violet";
  let h = 0;
  for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
};

const CATEGORY_ICON: Record<Project["category"], string> = {
  ai: "M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  fullstack: "M3 5h18v11H3zM8 21h8M12 16v5M7 9l2 2-2 2M11 13h4",
  web: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
  backend:
    "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  mobile: "M7 2h10v20H7zM11 18h2",
  other: "M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4",
};

/** Up to two initials from the title's leading words (skips symbols) */
const initials = (title: string) =>
  title
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

interface ProjectCoverProps {
  project: Pick<Project, "title" | "category" | "technologies">;
  className?: string;
}

/**
 * Generated cover art for a project — tone by discipline, big monogram,
 * stack line and a faint engineering grid. Replaces stock/landscape imagery
 * so every card reads as *this* project, not a place.
 */
export const ProjectCover: React.FC<ProjectCoverProps> = ({
  project,
  className,
}) => {
  const tone = toneFor(project.title, project.category);
  const mascot = /^kobi\b/i.test(project.title);
  return (
    <div
      className={[styles.cover, styles[tone], className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <span className={styles.grid} />
      <span className={styles.glow} />
      <span className={styles.icon}>
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d={CATEGORY_ICON[project.category]}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {PROJECT_CATEGORY_LABEL[project.category]}
      </span>
      {mascot ? (
        <img
          src={flowSrc(MASCOT.full)}
          alt=""
          className={styles.mascot}
          loading="lazy"
        />
      ) : (
        <span className={styles.mono}>{initials(project.title)}</span>
      )}
      <span className={styles.stack}>
        {project.technologies.slice(0, 3).join(" · ")}
      </span>
    </div>
  );
};
