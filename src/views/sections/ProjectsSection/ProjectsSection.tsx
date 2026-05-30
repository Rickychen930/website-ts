import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useTransform,
} from "@/lib/motion";
import { Tag } from "@/components/ui/Tag/Tag";
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

const GRADIENTS: Record<string, string> = {
  ai: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)",
  web: "linear-gradient(135deg, #0369a1 0%, #0891b2 50%, #06b6d4 100%)",
  fullstack: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #06b6d4 100%)",
  backend: "linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)",
  mobile: "linear-gradient(135deg, #92400e 0%, #d97706 50%, #f59e0b 100%)",
  other: "linear-gradient(135deg, #3f3f46 0%, #52525b 100%)",
};

/* Generate a CSS "UI mockup" pattern per category */
const MockupContent: React.FC<{
  category: string;
  title: string;
  imageUrl?: string;
}> = ({ category, title, imageUrl }) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.7,
        }}
        loading="lazy"
      />
    );
  }

  const isMobile = category === "mobile";
  const isAI = category === "ai";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        justifyContent: isMobile ? "center" : "flex-start",
        alignItems: isMobile ? "center" : "flex-start",
      }}
    >
      {isMobile ? (
        /* Phone mockup */
        <div
          style={{
            width: 80,
            height: 140,
            border: "2px solid rgba(255,255,255,0.4)",
            borderRadius: 12,
            background: "rgba(0,0,0,0.3)",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              width: "60%",
              height: 6,
              background: "rgba(255,255,255,0.5)",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: "90%",
              height: 6,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              marginTop: 4,
            }}
          />
          <div
            style={{
              width: "100%",
              height: 20,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 6,
            }}
          />
        </div>
      ) : isAI ? (
        /* AI / data viz mockup */
        <>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
            {[40, 70, 55, 90, 65, 80, 50].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 12,
                  height: h * 0.6,
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: "3px 3px 0 0",
                }}
              />
            ))}
          </div>
          <div
            style={{
              width: "70%",
              height: 2,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 2,
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {["GPT", "API", "ML"].map((l) => (
              <span
                key={l}
                style={{
                  padding: "2px 6px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 4,
                  fontSize: "0.55rem",
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "monospace",
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </>
      ) : (
        /* Generic web/fullstack/backend mockup */
        <>
          <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <div
            style={{
              width: "80%",
              height: 5,
              background: "rgba(255,255,255,0.4)",
              borderRadius: 3,
            }}
          />
          <div
            style={{
              width: "60%",
              height: 5,
              background: "rgba(255,255,255,0.25)",
              borderRadius: 3,
            }}
          />
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            <div
              style={{
                flex: 1,
                height: 30,
                background: "rgba(0,0,0,0.25)",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <div
              style={{
                flex: 2,
                height: 30,
                background: "rgba(0,0,0,0.2)",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              height: 16,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 4,
              marginTop: 4,
            }}
          />
          <div
            style={{
              width: "90%",
              height: 16,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
            }}
          />
        </>
      )}
    </div>
  );
};

const GitHubIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
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

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  });
  const gradient = GRADIENTS[project.category] ?? GRADIENTS.other;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
        delay: index * 0.05,
      }}
      className={styles.projectCard}
      data-cursor="view"
    >
      <motion.div
        ref={cardRef}
        className={styles.cardInner}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => {
          rawX.set(0);
          rawY.set(0);
          setHovered(false);
        }}
        onMouseEnter={() => setHovered(true)}
      >
        <div className={styles.imgArea} style={{ background: gradient }}>
          <MockupContent
            category={project.category}
            title={project.title}
            imageUrl={project.imageUrl}
          />
          <div className={styles.imgOverlay} />
          <span className={styles.catLabel}>{project.category}</span>
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDesc}>
            {(project.description ?? "").slice(0, 110)}
            {(project.description?.length ?? 0) > 110 ? "…" : ""}
          </p>
          <div className={styles.techTags}>
            {project.technologies.slice(0, 4).map((t) => (
              <Tag key={t} variant="accent">
                {t}
              </Tag>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              className={styles.hoverReveal}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 38 }}
            >
              <a href={`/projects/${project.id}`} className={styles.caseLink}>
                Case study →
              </a>
              <div className={styles.linkIcons}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className={styles.iconBtn}
                  >
                    <GitHubIcon />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className={styles.iconBtn}
                  >
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
};

export const ProjectsSection: React.FC = () => {
  const { profile } = useProfile();
  const [filter, setFilter] = useState<Filter>("all");

  const allProjects = profile?.projects ?? [];
  const filtered =
    filter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === filter);
  const available = FILTERS.filter(
    (f) => f.key === "all" || allProjects.some((p) => p.category === f.key),
  );

  return (
    <Section id="projects" sectionNumber="04" data-section="projects">
      <div className={styles.sectionHead}>
        <div className={styles.headLeft}>
          <motion.span
            className={styles.sectionLabel}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.25, 0, 0, 1], duration: 0.6 }}
          >
            04 / Projects
          </motion.span>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.25, 0, 0, 1], duration: 0.7, delay: 0.1 }}
          >
            Things I&apos;ve
            <br />
            <em>built.</em>
          </motion.h2>
        </div>
        <motion.div
          className={styles.filters}
          role="tablist"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <LayoutGroup id="proj-filter">
            {available.map(({ key, label }) => (
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
                    layoutId="proj-filter-indicator"
                    className={styles.filterIndicator}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </LayoutGroup>
        </motion.div>
      </div>

      {/* Horizontal scroll strip */}
      <div className={styles.scrollOuter}>
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              className={styles.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No projects in this category.
            </motion.p>
          ) : (
            filtered
              .slice(0, 8)
              .map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
          )}
        </AnimatePresence>
      </div>

      {filtered.length > 3 && (
        <p className={styles.dragHint}>← drag to explore →</p>
      )}

      {allProjects.length > 8 && (
        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a href="/projects" className={styles.viewAllLink}>
            View all {allProjects.length} projects →
          </a>
        </motion.div>
      )}
    </Section>
  );
};
