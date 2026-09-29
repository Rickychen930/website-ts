import React from "react";
import { Link } from "react-router-dom";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { Button } from "@/components/ui/Button/Button";
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
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Résumé</span>
        </nav>

        <div className={styles.topActions}>
          <Button
            as="a"
            href="/Ricky-Chen-Resume-2026.pdf"
            download="Ricky-Chen-Resume.pdf"
          >
            Download PDF
          </Button>
          <Button variant="ghost" onClick={() => window.print()}>
            Print
          </Button>
        </div>

        <header className={styles.header}>
          <RevealText
            as="h1"
            immediate
            delay={0.35}
            className={styles.name}
            lines={[profile?.name ?? "Ricky Chen"]}
          />
          <div className={styles.headMeta}>
            <p className={styles.title}>
              {profile?.title ??
                "Software Engineer · AI & Full-Stack Developer"}
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
              <h2 className={styles.sectionTitle}>Experience</h2>
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
                      {exp.achievements.length > 0 && (
                        <ul className={styles.achievements}>
                          {exp.achievements.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      )}
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
              <h2 className={styles.sectionTitle}>Education</h2>
              <div>
                {academics.map((a) => (
                  <div key={a.id} className={styles.entry}>
                    <span className={styles.entryDate}>
                      {formatDate(a.startDate)} —{" "}
                      {!a.endDate || new Date(a.endDate) > new Date()
                        ? "Present"
                        : formatDate(a.endDate)}
                    </span>
                    <div>
                      <strong className={styles.entryTitle}>
                        {a.degree} in {a.field}
                      </strong>
                      <span className={styles.entryCompany}>
                        {a.institution}
                      </span>
                      {a.description && (
                        <p className={styles.entryDesc}>{a.description}</p>
                      )}
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
              <h2 className={styles.sectionTitle}>Skills</h2>
              <ul className={styles.skills}>
                {skills.map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            </section>
          </FadeUp>
        )}
      </div>
    </div>
  );
};
