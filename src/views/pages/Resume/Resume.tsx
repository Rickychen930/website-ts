import React from "react";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { Tag } from "@/components/ui/Tag/Tag";
import { useProfile } from "@/contexts";
import styles from "./Resume.module.css";

const formatDate = (date?: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-AU", {
    month: "short",
    year: "numeric",
  });
};

export const Resume: React.FC = () => {
  const { profile } = useProfile();

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <FadeUp>
          <header className={styles.header}>
            <h1 className={styles.name}>{profile?.name ?? "Ricky Chen"}</h1>
            <p className={styles.title}>
              {profile?.title ?? "Fullstack Engineer"}
            </p>
            <p className={styles.location}>
              {profile?.location ?? "Sydney, Australia"}
            </p>
          </header>
        </FadeUp>

        {/* Experience */}
        {(profile?.experiences ?? []).length > 0 && (
          <FadeUp delay={0.1}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Experience</h2>
              {profile!.experiences
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.startDate).getTime() -
                    new Date(a.startDate).getTime(),
                )
                .map((exp) => (
                  <div key={exp.id} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <div>
                        <strong className={styles.entryTitle}>
                          {exp.position}
                        </strong>
                        <span className={styles.entryCompany}>
                          {exp.company} · {exp.location}
                        </span>
                      </div>
                      <span className={styles.entryDate}>
                        {formatDate(exp.startDate)} –{" "}
                        {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className={styles.entryDesc}>{exp.description}</p>
                    {exp.technologies.length > 0 && (
                      <div className={styles.tags}>
                        {exp.technologies.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </section>
          </FadeUp>
        )}

        {/* Education */}
        {(profile?.academics ?? []).length > 0 && (
          <FadeUp delay={0.15}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              {profile!.academics.map((a) => (
                <div key={a.id} className={styles.entry}>
                  <div className={styles.entryHeader}>
                    <div>
                      <strong className={styles.entryTitle}>
                        {a.degree} in {a.field}
                      </strong>
                      <span className={styles.entryCompany}>
                        {a.institution}
                      </span>
                    </div>
                    <span className={styles.entryDate}>
                      {formatDate(a.startDate)} –{" "}
                      {a.endDate ? formatDate(a.endDate) : "Present"}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          </FadeUp>
        )}

        {/* Skills */}
        {(profile?.technicalSkills ?? []).length > 0 && (
          <FadeUp delay={0.2}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              <div className={styles.skillGrid}>
                {profile!.technicalSkills.map((s) => (
                  <Tag key={s.id} variant="accent">
                    {s.name}
                  </Tag>
                ))}
              </div>
            </section>
          </FadeUp>
        )}

        <FadeUp delay={0.25}>
          <div className={styles.printHint}>
            <button className={styles.printBtn} onClick={() => window.print()}>
              Print / Save as PDF
            </button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};
