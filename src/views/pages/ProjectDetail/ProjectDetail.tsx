import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "@/lib/motion";
import { RevealMedia } from "@/components/motion/RevealMedia/RevealMedia";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import { sitePlateForProject } from "@/config/flowMedia";
import { useProfile } from "@/contexts";
import { useSEO } from "@/hooks/useSEO";
import { resolveProjectImageSrc } from "@/utils/resolveProjectImageSrc";
import { PROJECT_CATEGORY_LABEL } from "@/config/site-defaults";
import styles from "./ProjectDetail.module.css";

const STOCK_PHOTO = /(pexels|unsplash|pixabay)\.com/i;

const EASE = [0.22, 1, 0.36, 1] as const;

const Skeleton: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.inner}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonPlate} />
    </div>
  </div>
);

const Block: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <motion.section
    className={styles.block}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, ease: EASE }}
  >
    <h2 className={styles.blockLabel}>{label}</h2>
    <div className={styles.blockBody}>{children}</div>
  </motion.section>
);

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { profile, isLoading } = useProfile();

  const projects = profile?.projects ?? [];
  const project = projects.find((p) => p.id === projectId);

  useSEO({
    title: project
      ? `${project.title} — Ricky Chen`
      : "Case study — Ricky Chen",
    description: project?.description ?? "Case study by Ricky Chen.",
    type: "article",
  });

  if (isLoading) return <Skeleton />;

  if (!project) {
    return (
      <div className={styles.page}>
        <div className={`${styles.inner} ${styles.notFound}`}>
          <h1 className={styles.title}>Work not found.</h1>
          <Link to="/projects" className={styles.back}>
            ← Back to the index
          </Link>
        </div>
      </div>
    );
  }

  const ids = projects.map((p) => p.id);
  const idx = ids.indexOf(project.id);
  const plate = sitePlateForProject(ids, project.id, project.title);
  const next =
    projects.length > 1 ? projects[(idx + 1) % projects.length] : null;
  const nextPlate = next ? sitePlateForProject(ids, next.id, next.title) : null;
  // Stock photos aren't real interfaces — only show genuine screenshots
  const screenshot = STOCK_PHOTO.test(project.imageUrl ?? "")
    ? undefined
    : resolveProjectImageSrc(project.imageUrl);
  const start = new Date(project.startDate).getFullYear();
  const end = project.endDate ? new Date(project.endDate).getFullYear() : null;

  const facts = [
    { k: "Discipline", v: PROJECT_CATEGORY_LABEL[project.category] },
    {
      k: "Period",
      v:
        end && end !== start
          ? `${start} — ${end}`
          : project.isActive
            ? `${start} — now`
            : `${start}`,
    },
    { k: "Status", v: project.isActive ? "Ongoing" : "Completed" },
    { k: "Stack", v: project.technologies.slice(0, 2).join(", ") },
  ];

  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/projects">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <header className={styles.hero}>
          <RevealText
            as="h1"
            immediate
            delay={0.35}
            className={styles.title}
            lines={[project.title]}
          />
          <motion.p
            className={styles.summary}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          >
            {project.description}
          </motion.p>
        </header>

        <motion.dl
          className={styles.facts}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {facts.map((f) => (
            <div key={f.k} className={styles.fact}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className={styles.plateWrap}>
        <RevealMedia
          item={plate}
          frameClassName={styles.plate}
          parallax={22}
          priority
          delay={0.8}
        />
        <p className={styles.plateCaption}>
          {plate.title} — {plate.subtitle}
        </p>
      </div>

      <div className={`${styles.inner} ${styles.body}`}>
        <div className={styles.main}>
          <Block label="Brief">
            <p className={styles.lead}>
              {project.longDescription ?? project.description}
            </p>
          </Block>

          {project.achievements.length > 0 && (
            <Block label="Outcomes">
              <ol className={styles.outcomes}>
                {project.achievements.map((a, i) => (
                  <li key={i}>
                    <span className={styles.outNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {project.architecture && (
            <Block label="Architecture">
              <p className={styles.text}>{project.architecture}</p>
            </Block>
          )}

          {screenshot && (
            <Block label="Interface">
              <figure className={styles.shot}>
                <img
                  src={screenshot}
                  alt={`${project.title} interface`}
                  loading="lazy"
                  onError={(e) => {
                    (
                      e.currentTarget.closest("section") as HTMLElement | null
                    )?.style.setProperty("display", "none");
                  }}
                />
              </figure>
            </Block>
          )}
        </div>

        <aside className={styles.sheet} aria-label="Project data sheet">
          <span className="label">Project details</span>
          <div className={styles.sheetRow}>
            <span className={styles.sheetKey}>Tech stack</span>
            <ul className={styles.stack}>
              {project.technologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sheetLink}
            >
              <span>Repository</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sheetLink}
            >
              <span>Visit live site</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </aside>
      </div>

      {next && nextPlate && next.id !== project.id && (
        <Link to={`/projects/${next.id}`} className={styles.next}>
          <div className={styles.nextMedia} aria-hidden="true">
            <FlowMedia item={nextPlate} showPendingLabel={false} />
          </div>
          <div className={styles.nextScrim} aria-hidden="true" />
          <div className={styles.nextInner}>
            <span className={styles.nextLabel}>Next project →</span>
            <span className={styles.nextTitle}>{next.title}</span>
            <span className={styles.nextLabel}>
              {next.technologies.slice(0, 3).join(" · ")}
            </span>
          </div>
        </Link>
      )}
    </article>
  );
};
