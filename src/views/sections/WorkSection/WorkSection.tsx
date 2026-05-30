import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Tag } from "@/components/ui/Tag/Tag";
import { Section } from "@/components/layout/Section/Section";
import { useProfile } from "@/contexts";
import styles from "./WorkSection.module.css";

const fmtDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-AU", {
        month: "short",
        year: "numeric",
      })
    : "";

const calcDur = (start: string, end?: string) => {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const mo =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (mo < 12) return `${mo}mo`;
  const y = Math.floor(mo / 12);
  const m = mo % 12;
  return m ? `${y}y ${m}mo` : `${y}y`;
};

export const WorkSection: React.FC = () => {
  const { profile } = useProfile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });
  const rawLine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineH = useSpring(rawLine, { stiffness: 60, damping: 18 });

  const experiences = (profile?.experiences ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    )
    .slice(0, 5);

  return (
    <Section id="work" sectionNumber="03" data-section="work">
      <div className={styles.sectionHead}>
        <motion.span
          className={styles.sectionLabel}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ease: [0.25, 0, 0, 1], duration: 0.6 }}
        >
          03 / Experience
        </motion.span>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: [0.25, 0, 0, 1], duration: 0.7, delay: 0.1 }}
        >
          Where I&apos;ve
          <br />
          <em>worked.</em>
        </motion.h2>
      </div>

      <div className={styles.entries} ref={sectionRef}>
        {/* Vertical line */}
        <div className={styles.lineTrack} aria-hidden="true">
          <motion.div
            className={styles.lineFill}
            style={{ scaleY: lineH, transformOrigin: "top" }}
          />
        </div>

        {experiences.map((exp, i) => (
          <motion.article
            key={exp.id}
            className={[styles.entry, activeIdx === i && styles.entryActive]
              .filter(Boolean)
              .join(" ")}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              ease: [0.25, 0, 0, 1],
              duration: 0.6,
              delay: i * 0.07,
            }}
            onMouseEnter={() => setActiveIdx(i)}
          >
            {/* Dot on line */}
            <div className={styles.dotCol} aria-hidden="true">
              <span
                className={[styles.dot, exp.isCurrent && styles.dotCurrent]
                  .filter(Boolean)
                  .join(" ")}
              >
                {exp.isCurrent && <span className={styles.pulseRing} />}
              </span>
            </div>

            {/* Card */}
            <div className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardLeft}>
                  {exp.isCurrent && (
                    <span className={styles.currentBadge}>
                      <span className={styles.currentDot} /> Current
                    </span>
                  )}
                  <span className={styles.company}>{exp.company}</span>
                  <span className={styles.location}>{exp.location}</span>
                </div>
                <span className={styles.dates}>
                  {fmtDate(exp.startDate)} →{" "}
                  {exp.isCurrent ? "Now" : fmtDate(exp.endDate)}
                  <span className={styles.dur}>
                    {calcDur(exp.startDate, exp.endDate)}
                  </span>
                </span>
              </div>

              <h3 className={styles.role}>{exp.position}</h3>
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
                  {exp.technologies.slice(0, 7).map((t) => (
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
    </Section>
  );
};
