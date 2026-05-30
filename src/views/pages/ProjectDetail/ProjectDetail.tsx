import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "@/lib/motion";
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

const HeroMockup: React.FC<{
  category: string;
  imageUrl?: string;
  title: string;
}> = ({ category, imageUrl, title }) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={title}
        className={styles.heroImg}
        loading="lazy"
      />
    );
  }
  if (category === "mobile") {
    return (
      <div className={styles.mockPhone}>
        <div className={styles.mockPhoneBar} />
        <div className={styles.mockPhoneBar} style={{ width: "70%" }} />
        <div className={styles.mockPhoneContent} />
        <div className={styles.mockPhoneBtn} />
      </div>
    );
  }
  if (category === "ai") {
    return (
      <div className={styles.mockAI}>
        {[35, 65, 48, 82, 55, 72, 40, 60].map((h, i) => (
          <div key={i} className={styles.mockBar} style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }
  return (
    <div className={styles.mockBrowser}>
      <div className={styles.mockBrowserDots}>
        <span style={{ background: "#ef4444" }} />
        <span style={{ background: "#f59e0b" }} />
        <span style={{ background: "#22c55e" }} />
      </div>
      <div className={styles.mockBrowserLine} style={{ width: "75%" }} />
      <div className={styles.mockBrowserLine} style={{ width: "50%" }} />
      <div className={styles.mockBrowserGrid}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

const Skeleton: React.FC = () => (
  <div className={styles.skeletonWrap}>
    <div className={styles.skeletonHero} />
    <div className={styles.skeletonBody}>
      <div className={styles.skeletonMain}>
        {[80, 60, 100, 70, 90, 55].map((w, i) => (
          <div
            key={i}
            className={styles.skeletonLine}
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
      <div className={styles.skeletonSide} />
    </div>
  </div>
);

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return <Skeleton />;
  }

  const projects = profile?.projects ?? [];
  const project = projects.find((p) => p.id === projectId);
  const currentIdx = projects.findIndex((p) => p.id === projectId);
  const next =
    projects.length > 1 ? projects[(currentIdx + 1) % projects.length] : null;

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project not found</h1>
        <a href="/#projects">← Back to projects</a>
      </div>
    );
  }

  const gradient =
    CATEGORY_GRADIENT[project.category] ?? CATEGORY_GRADIENT.other;

  return (
    <article className={styles.page}>
      {/* Hero */}
      <div className={styles.hero} style={{ background: gradient }}>
        <div className={styles.heroVisual} aria-hidden="true">
          <HeroMockup
            category={project.category}
            imageUrl={project.imageUrl}
            title={project.title}
          />
        </div>
        <div className={styles.heroInner}>
          {/* Use animate (not whileInView) — hero is always in viewport on load */}
          <motion.nav
            className={styles.breadcrumb}
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.25, 0, 0, 1], duration: 0.5, delay: 0.15 }}
          >
            <a href="/#projects" className={styles.breadLink}>
              Projects
            </a>
            <span aria-hidden="true"> / </span>
            <span>{project.title}</span>
          </motion.nav>
          <motion.div
            className={styles.heroMeta}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.25, 0, 0, 1], duration: 0.5, delay: 0.25 }}
          >
            <Tag variant="default">{project.category}</Tag>
            <span className={styles.year}>
              {new Date(project.startDate).getFullYear()}
              {project.endDate
                ? ` – ${new Date(project.endDate).getFullYear()}`
                : " – Present"}
            </span>
          </motion.div>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.25, 0, 0, 1], duration: 0.6, delay: 0.35 }}
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.main}>
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.25, 0, 0, 1], duration: 0.5, delay: 0.45 }}
          >
            {project.longDescription ?? project.description}
          </motion.p>

          {project.achievements.length > 0 && (
            <motion.section
              className={styles.section}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: [0.25, 0, 0, 1], duration: 0.5, delay: 0.55 }}
            >
              <h2 className={styles.sectionTitle}>Outcomes</h2>
              <ul className={styles.list}>
                {project.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </motion.section>
          )}

          {project.architecture && (
            <motion.section
              className={styles.section}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: [0.25, 0, 0, 1], duration: 0.5, delay: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Architecture</h2>
              <p className={styles.description}>{project.architecture}</p>
            </motion.section>
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
      {next && next.id !== project.id && next !== project && (
        <div className={styles.nextWrap}>
          <span className={styles.nextLabel}>Next project</span>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <a
              href={`/projects/${next.id}`}
              className={styles.nextCard}
              data-cursor="view"
            >
              <span className={styles.nextTitle}>{next.title}</span>
              <Tag variant="default">{next.category}</Tag>
            </a>
          </motion.div>
        </div>
      )}
    </article>
  );
};
