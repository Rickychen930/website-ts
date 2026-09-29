import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "@/lib/motion";
import { Section } from "@/components/layout/Section/Section";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import { sitePlateFor } from "@/config/flowMedia";
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
  const mo = Math.max(
    1,
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()),
  );
  if (mo < 12) return `${mo} month${mo === 1 ? "" : "s"}`;
  const y = Math.floor(mo / 12);
  const m = mo % 12;
  const yrs = `${y} year${y === 1 ? "" : "s"}`;
  return m ? `${yrs} ${m} month${m === 1 ? "" : "s"}` : yrs;
};

export const WorkSection: React.FC = () => {
  const { profile } = useProfile();
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 40%"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const experiences = (profile?.experiences ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );

  // Landmark shown in the side column follows the hovered (or open) row
  const featured = hovered ?? open ?? 0;

  return (
    <Section id="work" label="Experience" tone="deep" stack>
      <div className={styles.layout}>
        <div className={styles.aside}>
          <RevealText
            as="h2"
            className={styles.heading}
            lines={["Where I've", <em key="w">worked.</em>]}
          />
          <div className={styles.plate} aria-hidden="true">
            <AnimatePresence initial={false}>
              <motion.div
                key={featured}
                className={styles.plateInner}
                initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <FlowMedia
                  item={sitePlateFor(featured + 2)}
                  showPendingLabel={false}
                />
              </motion.div>
            </AnimatePresence>
            <motion.span
              className={styles.progressFill}
              style={{ scaleX: line }}
            />
          </div>
        </div>

        <div
          ref={listRef}
          className={styles.list}
          onMouseLeave={() => setHovered(null)}
        >
          <div className={styles.headRow} aria-hidden="true">
            <span>Period</span>
            <span>Company</span>
            <span>Role</span>
            <span>Location</span>
          </div>

          {experiences.map((exp, i) => {
            const isOpen = open === i;
            const panelId = `exp-panel-${exp.id}`;
            return (
              <motion.article
                key={exp.id}
                className={[styles.row, isOpen && styles.rowOpen]
                  .filter(Boolean)
                  .join(" ")}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: Math.min(i, 5) * 0.06,
                }}
                onMouseEnter={() => setHovered(i)}
              >
                <button
                  type="button"
                  className={styles.rowBtn}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={styles.period}>
                    {fmtDate(exp.startDate)} —{" "}
                    {exp.isCurrent ? "Now" : fmtDate(exp.endDate)}
                  </span>
                  <span className={styles.company}>
                    {exp.company}
                    {exp.isCurrent && (
                      <span className={styles.current}>Current</span>
                    )}
                  </span>
                  <span className={styles.role}>{exp.position}</span>
                  <span className={styles.location}>
                    {exp.location}
                    <span className={styles.toggle} aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      className={styles.panel}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className={styles.panelInner}>
                        <span className={styles.duration}>
                          {calcDur(exp.startDate, exp.endDate)}
                        </span>
                        <div>
                          <p className={styles.desc}>{exp.description}</p>
                          {exp.achievements.length > 0 && (
                            <ul className={styles.achievements}>
                              {exp.achievements.slice(0, 4).map((a, j) => (
                                <li key={j}>{a}</li>
                              ))}
                            </ul>
                          )}
                          {exp.technologies.length > 0 && (
                            <p className={styles.tech}>
                              {exp.technologies.slice(0, 8).join(" · ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
