import React, { useState } from "react";
import { motion } from "@/lib/motion";
import { Section } from "@/components/layout/Section/Section";
import { RevealMedia } from "@/components/motion/RevealMedia/RevealMedia";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { Button } from "@/components/ui/Button/Button";
import { FLOW_MEDIA } from "@/config/flowMedia";
import { useProfile } from "@/contexts";
import type { TechnicalSkill } from "@/types/domain";
import styles from "./StackSection.module.css";

type Category = TechnicalSkill["category"];

const GROUPS: { key: Category; label: string }[] = [
  { key: "language", label: "Languages" },
  { key: "framework", label: "Frameworks & libraries" },
  { key: "other", label: "AI & specialities" },
  { key: "database", label: "Databases" },
  { key: "cloud", label: "Cloud" },
  { key: "tool", label: "Tools & DevOps" },
];

const LEVEL: Record<TechnicalSkill["proficiency"], number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  beginner: 1,
};

/** Top skills per group before "Show all" — keeps the scan short */
const PREVIEW = 5;

type Item = Pick<TechnicalSkill, "name" | "category" | "proficiency">;

const FALLBACK: Item[] = [
  { name: "TypeScript", category: "language", proficiency: "expert" },
  { name: "Python", category: "language", proficiency: "advanced" },
  { name: "Java", category: "language", proficiency: "advanced" },
  { name: "React", category: "framework", proficiency: "expert" },
  { name: "Node.js / Express", category: "framework", proficiency: "expert" },
  { name: "Next.js", category: "framework", proficiency: "advanced" },
  { name: "PostgreSQL", category: "database", proficiency: "advanced" },
  { name: "MongoDB", category: "database", proficiency: "advanced" },
  { name: "Redis", category: "database", proficiency: "intermediate" },
  { name: "AWS", category: "cloud", proficiency: "advanced" },
  { name: "Docker", category: "tool", proficiency: "advanced" },
  { name: "Git", category: "tool", proficiency: "expert" },
];

export const StackSection: React.FC = () => {
  const { profile } = useProfile();
  const [showAll, setShowAll] = useState(false);
  const skills: readonly Item[] = profile?.technicalSkills?.length
    ? profile.technicalSkills
    : FALLBACK;

  const groups = GROUPS.map((g) => ({
    ...g,
    items: skills.filter((s) => s.category === g.key),
  })).filter((g) => g.items.length > 0);
  const hidden = groups.reduce(
    (n, g) => n + Math.max(0, g.items.length - PREVIEW),
    0,
  );

  return (
    <Section id="stack" label="Skills">
      <div className={styles.layout}>
        <div className={styles.mediaCol}>
          <RevealMedia
            item={FLOW_MEDIA.daintree}
            frameClassName={styles.frame}
            parallax={16}
            caption
          />
        </div>

        <div className={styles.body}>
          <RevealText
            as="h2"
            className={styles.heading}
            lines={["Tools I", <em key="m">build with.</em>]}
          />
          <p className={styles.lede}>What I use, and how deeply.</p>
          <p className={styles.legend} aria-hidden="true">
            {(["expert", "advanced", "intermediate"] as const).map((lvl) => (
              <span key={lvl} className={styles.legendItem}>
                <span className={styles.level}>
                  {[1, 2, 3, 4].map((n) => (
                    <span
                      key={n}
                      className={n <= LEVEL[lvl] ? styles.pipOn : styles.pip}
                    />
                  ))}
                </span>
                {lvl}
              </span>
            ))}
          </p>

          <div className={styles.schedule}>
            {groups.map((g, gi) => (
              <motion.div
                key={g.key}
                className={styles.group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: gi * 0.06,
                }}
              >
                <div className={styles.groupHead}>
                  <span>{g.label}</span>
                </div>
                <ul className={styles.items}>
                  {(showAll ? g.items : g.items.slice(0, PREVIEW)).map((s) => (
                    <li key={s.name} className={styles.item}>
                      <span>{s.name}</span>
                      <span
                        className={styles.level}
                        role="img"
                        aria-label={`Proficiency: ${s.proficiency}`}
                        title={s.proficiency}
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <span
                            key={n}
                            className={
                              n <= LEVEL[s.proficiency]
                                ? styles.pipOn
                                : styles.pip
                            }
                          />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          {hidden > 0 && (
            <Button
              variant="ghost"
              className={styles.more}
              aria-expanded={showAll}
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Show fewer" : `Show all ${skills.length} skills`}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
};
