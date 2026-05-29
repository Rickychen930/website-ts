import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { Tag } from "@/components/ui/Tag/Tag";
import { Card } from "@/components/ui/Card/Card";
import { useProfile } from "@/contexts";
import styles from "./ProjectDetail.module.css";

const CATEGORY_GRADIENT: Record<string, string> = {
  ai: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  web: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  fullstack: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
  backend: "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
  mobile: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  other: "linear-gradient(135deg, #71717a 0%, #3f3f46 100%)",
};

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { profile } = useProfile();

  const projects = profile?.projects ?? [];
  const project = projects.find((p) => p.id === projectId);
  const currentIdx = projects.findIndex((p) => p.id === projectId);
  const next = projects[(currentIdx + 1) % projects.length];

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project not found</h1>
        <Link to="/#projects">← Back to projects</Link>
      </div>
    );
  }

  const gradient =
    CATEGORY_GRADIENT[project.category] ?? CATEGORY_GRADIENT.other;

  return (
    <article className={styles.page}>
      {/* Hero */}
      <div className={styles.hero} style={{ background: gradient }}>
        <div className={styles.heroInner}>
          <FadeUp>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link to="/#projects" className={styles.breadLink}>
                Projects
              </Link>
              <span aria-hidden="true"> / </span>
              <span>{project.title}</span>
            </nav>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className={styles.heroMeta}>
              <Tag variant="default">{project.category}</Tag>
              <span className={styles.year}>
                {new Date(project.startDate).getFullYear()}
                {project.endDate
                  ? ` – ${new Date(project.endDate).getFullYear()}`
                  : " – Present"}
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className={styles.title}>{project.title}</h1>
          </FadeUp>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.main}>
          <FadeUp>
            <p className={styles.description}>
              {project.longDescription ?? project.description}
            </p>
          </FadeUp>

          {project.achievements.length > 0 && (
            <FadeUp delay={0.1}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Outcomes</h2>
                <ul className={styles.list}>
                  {project.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </section>
            </FadeUp>
          )}

          {project.architecture && (
            <FadeUp delay={0.15}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Architecture</h2>
                <p className={styles.description}>{project.architecture}</p>
              </section>
            </FadeUp>
          )}
        </div>

        <aside className={styles.sidebar}>
          <Card glow className={styles.metaCard}>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Tech Stack</span>
              <div className={styles.tags}>
                {project.technologies.map((t) => (
                  <Tag key={t} variant="accent">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>

            {project.githubUrl && (
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Repository</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.metaLink}
                  data-cursor="open"
                >
                  GitHub →
                </a>
              </div>
            )}

            {project.liveUrl && (
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Live</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.metaLink}
                  data-cursor="open"
                >
                  Visit site →
                </a>
              </div>
            )}
          </Card>
        </aside>
      </div>

      {/* Next project */}
      {next && next.id !== project.id && (
        <div className={styles.nextWrap}>
          <span className={styles.nextLabel}>Next project</span>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Link
              to={`/projects/${next.id}`}
              className={styles.nextCard}
              data-cursor="view"
            >
              <span className={styles.nextTitle}>{next.title}</span>
              <Tag variant="default">{next.category}</Tag>
            </Link>
          </motion.div>
        </div>
      )}
    </article>
  );
};
