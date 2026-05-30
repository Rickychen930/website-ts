import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "@/lib/motion";
import { Link } from "react-router-dom";
import { Tag } from "@/components/ui/Tag/Tag";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { useProfile } from "@/contexts";
import type { Project } from "@/types/domain";
import styles from "./Projects.module.css";

type Filter = "all" | Project["category"];
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "ai", label: "AI" },
  { key: "fullstack", label: "Fullstack" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
];

const GRADIENTS: Record<string, string> = {
  ai: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)",
  web: "linear-gradient(135deg, #0369a1 0%, #0891b2 50%, #06b6d4 100%)",
  fullstack: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #06b6d4 100%)",
  backend: "linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)",
  mobile: "linear-gradient(135deg, #92400e 0%, #d97706 50%, #f59e0b 100%)",
  other: "linear-gradient(135deg, #3f3f46 0%, #52525b 100%)",
};

const GitHubIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="13"
    height="13"
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

export const Projects: React.FC = () => {
  const { profile } = useProfile();
  const [filter, setFilter] = useState<Filter>("all");

  const all = profile?.projects ?? [];
  const filtered =
    filter === "all" ? all : all.filter((p) => p.category === filter);
  const available = FILTERS.filter(
    (f) => f.key === "all" || all.some((p) => p.category === f.key),
  );

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <FadeUp>
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadLink}>
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span>Projects</span>
          </nav>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className={styles.heading}>
            All <em>Projects</em>
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className={styles.sub}>
            {all.length} projects across web, AI, fullstack, backend &amp;
            mobile
          </p>
        </FadeUp>
      </div>

      {/* Filters */}
      <div className={styles.filterBar}>
        <LayoutGroup id="projects-filter">
          {available.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={[
                styles.filterBtn,
                filter === key && styles.filterActive,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
              {filter === key && (
                <motion.span
                  layoutId="projects-filter-indicator"
                  className={styles.filterIndicator}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </LayoutGroup>
        <span className={styles.count}>
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
                delay: i * 0.04,
              }}
              className={styles.card}
              data-cursor="view"
            >
              {/* Gradient header with mockup overlay */}
              <div
                className={styles.cardImg}
                style={{
                  background: GRADIENTS[project.category] ?? GRADIENTS.other,
                }}
              >
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={styles.cardImgPhoto}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.mockup} aria-hidden="true">
                    {project.category === "mobile" ? (
                      <div className={styles.mockPhone}>
                        <div className={styles.mockPhoneBar} />
                        <div className={styles.mockPhoneContent} />
                        <div className={styles.mockPhoneBtn} />
                      </div>
                    ) : project.category === "ai" ? (
                      <div className={styles.mockAI}>
                        {[35, 65, 48, 82, 55, 72, 40].map((h, i) => (
                          <div
                            key={i}
                            className={styles.mockBar}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className={styles.mockBrowser}>
                        <div className={styles.mockBrowserDots}>
                          <span style={{ background: "#ef4444" }} />
                          <span style={{ background: "#f59e0b" }} />
                          <span style={{ background: "#22c55e" }} />
                        </div>
                        <div
                          className={styles.mockBrowserLine}
                          style={{ width: "75%" }}
                        />
                        <div
                          className={styles.mockBrowserLine}
                          style={{ width: "55%" }}
                        />
                        <div className={styles.mockBrowserGrid}>
                          <div />
                          <div />
                          <div />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className={styles.cardImgOverlay} />
                <span className={styles.catBadge}>{project.category}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h2 className={styles.title}>{project.title}</h2>
                  <div className={styles.links}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconBtn}
                        data-cursor="open"
                        aria-label="GitHub"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconBtn}
                        data-cursor="open"
                        aria-label="Live site"
                      >
                        <ExternalIcon />
                      </a>
                    )}
                  </div>
                </div>

                <p className={styles.desc}>{project.description}</p>

                <div className={styles.tags}>
                  {project.technologies.slice(0, 5).map((t) => (
                    <Tag key={t} variant="accent">
                      {t}
                    </Tag>
                  ))}
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className={styles.caseLink}
                >
                  View case study →
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.p
            className={styles.empty}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects in this category.
          </motion.p>
        )}
      </div>
    </div>
  );
};
