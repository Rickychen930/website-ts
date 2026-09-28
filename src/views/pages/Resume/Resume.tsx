import React from "react";
import { Link } from "react-router-dom";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { useProfile } from "@/contexts";
import { useSEO } from "@/hooks/useSEO";
import styles from "./Resume.module.css";

const Skeleton: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.inner}>
      <div className={styles.skeletonName} />
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.skeletonSection} />
      ))}
    </div>
  </div>
);

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-AU", {
        month: "short",
        year: "numeric",
      })
    : "";

export const Resume: React.FC = () => {
  const { profile, isLoading } = useProfile();

  useSEO({
    title: "Résumé — Ricky Chen",
    description:
      "Curriculum vitae of Ricky Chen, fullstack & AI engineer in Sydney.",
  });

  if (isLoading) return <Skeleton />;

  const experiences = (profile?.experiences ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );
  const academics = profile?.academics ?? [];
  const skills = profile?.technicalSkills ?? [];
  const email = profile?.contacts?.find((c) => c.type === "email")?.value;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Index</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Résumé</span>
        </nav>

        <header className={styles.header}>
          <RevealText
            as="h1"
            immediate
            delay={0.6}
            className={styles.name}
            lines={[profile?.name ?? "Ricky Chen"]}
          />
          <div className={styles.headMeta}>
            <p className={styles.title}>
              {profile?.title ?? "Fullstack & AI Engineer"}
            </p>
            <p className={styles.location}>
              {profile?.location ?? "Sydney, Australia"}
              {email && (
                <>
                  {" · "}
                  <a href={`mailto:${email}`}>{email}</a>
                </>
              )}
            </p>
          </div>
        </header>

        {experiences.length > 0 && (
          <FadeUp>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.idx}>(01)</span> Experience
              </h2>
              <div>
                {experiences.map((exp) => (
                  <div key={exp.id} className={styles.entry}>
                    <span className={styles.entryDate}>
                      {formatDate(exp.startDate)} —{" "}
                      {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                    </span>
                    <div>
                      <strong className={styles.entryTitle}>
                        {exp.position}
                      </strong>
                      <span className={styles.entryCompany}>
                        {exp.company} · {exp.location}
                      </span>
                      <p className={styles.entryDesc}>{exp.description}</p>
                      {exp.technologies.length > 0 && (
                        <p className={styles.tech}>
                          {exp.technologies.join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeUp>
        )}

        {academics.length > 0 && (
          <FadeUp>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.idx}>(02)</span> Education
              </h2>
              <div>
                {academics.map((a) => (
                  <div key={a.id} className={styles.entry}>
                    <span className={styles.entryDate}>
                      {formatDate(a.startDate)} —{" "}
                      {a.endDate ? formatDate(a.endDate) : "Present"}
                    </span>
                    <div>
                      <strong className={styles.entryTitle}>
                        {a.degree} in {a.field}
                      </strong>
                      <span className={styles.entryCompany}>
                        {a.institution}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeUp>
        )}

        {skills.length > 0 && (
          <FadeUp>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.idx}>(03)</span> Skills
              </h2>
              <ul className={styles.skills}>
                {skills.map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            </section>
          </FadeUp>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.printBtn}
            onClick={() => window.print()}
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
};
