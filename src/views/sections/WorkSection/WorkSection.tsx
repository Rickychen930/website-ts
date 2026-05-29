import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { Tag } from "@/components/ui/Tag/Tag";
import { Section } from "@/components/layout/Section/Section";
import { useProfile } from "@/contexts";
import styles from "./WorkSection.module.css";

const formatDate = (date?: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-AU", { month: "short", year: "numeric" });
};

const duration = (start: string, end?: string) => {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (months < 12) return `${months}mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${y}y ${m}mo` : `${y}y`;
};

export const WorkSection: React.FC = () => {
  const { profile } = useProfile();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });
  const rawLine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineH = useSpring(rawLine, { stiffness: 80, damping: 20 });

  const experiences = (profile?.experiences ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    )
    .slice(0, 5);

  return (
    <Section id="work" sectionNumber="03" data-section="work">
      <FadeUp>
        <span className={styles.sectionLabel}>Experience</span>
        <h2 className={styles.heading}>Where I've worked</h2>
      </FadeUp>

      <div className={styles.timeline} ref={sectionRef}>
        {/* Self-drawing line */}
        <div className={styles.lineTrack} aria-hidden="true">
          <motion.div
            className={styles.lineFill}
            style={{ scaleY: lineH, transformOrigin: "top" }}
          />
        </div>

        <div className={styles.entries}>
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              className={styles.entry}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                ease: [0.25, 0, 0, 1],
                duration: 0.6,
                delay: i * 0.08,
              }}
            >
              <div className={styles.dotWrapper} aria-hidden="true">
                <span
                  className={[styles.dot, exp.isCurrent && styles.dotActive]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {exp.isCurrent && <span className={styles.pulseRing} />}
                </span>
              </div>

              <div
                className={[styles.card, exp.isCurrent && styles.cardCurrent]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.role}>{exp.position}</h3>
                    <span className={styles.company}>
                      {exp.company} · {exp.location}
                    </span>
                  </div>
                  <div className={styles.meta}>
                    {exp.isCurrent && (
                      <span className={styles.currentBadge}>
                        <span className={styles.currentDot} />
                        Current
                      </span>
                    )}
                    <span className={styles.dates}>
                      {formatDate(exp.startDate)} –{" "}
                      {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                      <span className={styles.dur}>
                        {duration(exp.startDate, exp.endDate)}
                      </span>
                    </span>
                  </div>
                </div>

                <p className={styles.desc}>{exp.description}</p>

                {exp.achievements.length > 0 && (
                  <ul className={styles.achievements}>
                    {exp.achievements.slice(0, 3).map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                )}

                {exp.technologies.length > 0 && (
                  <div className={styles.tags}>
                    {exp.technologies.slice(0, 6).map((t) => (
                      <Tag key={t} variant="accent">
                        {t}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
};
