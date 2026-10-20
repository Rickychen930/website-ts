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

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z0-9 &]/g, " ")
    .split(/\s+/)
    .filter((w) => w && w !== "&")
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const EASE = [0.22, 1, 0.36, 1] as const;

export const WorkSection: React.FC = () => {
  const { profile } = useProfile();
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  // Independent toggles: opening one role never collapses another above it,
  // so the clicked card stays put and expands downward
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

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

  // Landmark in the side column follows the hovered (or open) role
  const featured = hovered ?? 0;

  return (
    // Not a stacked chapter: rows expand in place, so the section must not pin
    <Section id="work" label="Experience" tone="deep">
      <div className={styles.layout}>
        <div className={styles.aside}>
          <RevealText
            as="h2"
            className={styles.heading}
            lines={["Where I've", <em key="w">worked.</em>]}
          />
          <p className={styles.lede}>
            {experiences.length} roles in AI, full-stack and production
            engineering.
          </p>
          <div className={styles.plate} aria-hidden="true">
            <AnimatePresence initial={false}>
              <motion.div
                key={featured}
                className={styles.plateInner}
                initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <FlowMedia
                  item={sitePlateFor(featured + 2)}
                  showPendingLabel={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ol
          ref={listRef}
          className={styles.timeline}
          onMouseLeave={() => setHovered(null)}
        >
          <span className={styles.rail} aria-hidden="true">
            <motion.span className={styles.railFill} style={{ scaleY: line }} />
          </span>

          {experiences.map((exp, i) => {
            const isOpen = open.has(i);
            const panelId = `exp-panel-${exp.id}`;
            return (
              <motion.li
                key={exp.id}
                className={[styles.item, isOpen && styles.itemOpen]
                  .filter(Boolean)
                  .join(" ")}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                  delay: Math.min(i, 5) * 0.06,
                }}
                onMouseEnter={() => setHovered(i)}
              >
                <span
                  className={[styles.dot, exp.isCurrent && styles.dotCurrent]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                />
                <div className={styles.card} data-spotlight="">
                  <button
                    type="button"
                    className={styles.cardHead}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                  >
                    <span className={styles.mono} aria-hidden="true">
                      {initials(exp.company)}
                    </span>
                    <span className={styles.headMain}>
                      <span className={styles.roleLine}>
                        <span className={styles.role}>{exp.position}</span>
                        {exp.isCurrent && (
                          <span className={styles.current}>Current</span>
                        )}
                      </span>
                      <span className={styles.company}>{exp.company}</span>
                      <span className={styles.meta}>
                        {fmtDate(exp.startDate)} —{" "}
                        {exp.isCurrent ? "Present" : fmtDate(exp.endDate)}
                        <span aria-hidden="true"> · </span>
                        {calcDur(exp.startDate, exp.endDate)}
                        <span aria-hidden="true"> · </span>
                        {exp.location}
                      </span>
                      {exp.technologies.length > 0 && (
                        <span className={styles.chips}>
                          {exp.technologies.slice(0, 4).map((t) => (
                            <span key={t} className={styles.chip}>
                              {t}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                    <span className={styles.chevron} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path
                          d="M6 9l6 6 6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        <div className={styles.panelInner}>
                          <p className={styles.desc}>{exp.description}</p>
                          {exp.achievements.length > 0 && (
                            <ul className={styles.achievements}>
                              {exp.achievements.map((a, j) => (
                                <motion.li
                                  key={j}
                                  initial={
                                    reduce ? false : { opacity: 0, x: -8 }
                                  }
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.4,
                                    ease: EASE,
                                    delay: 0.12 + j * 0.06,
                                  }}
                                >
                                  {a}
                                </motion.li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
};
