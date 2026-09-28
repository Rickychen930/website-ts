import React from "react";
import { motion } from "@/lib/motion";
import { Section } from "@/components/layout/Section/Section";
import { RevealMedia } from "@/components/motion/RevealMedia/RevealMedia";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { FLOW_MEDIA } from "@/config/flowMedia";
import { useProfile } from "@/contexts";
import type { TechnicalSkill } from "@/types/domain";
import styles from "./StackSection.module.css";

type Category = TechnicalSkill["category"];

const GROUPS: { key: Category; label: string; code: string }[] = [
  { key: "language", label: "Languages", code: "M.1" },
  { key: "framework", label: "Frameworks", code: "M.2" },
  { key: "database", label: "Data", code: "M.3" },
  { key: "cloud", label: "Cloud", code: "M.4" },
  { key: "tool", label: "Tooling", code: "M.5" },
  { key: "other", label: "Other", code: "M.6" },
];

const LEVEL: Record<TechnicalSkill["proficiency"], number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  beginner: 1,
};

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
  const skills: readonly Item[] = profile?.technicalSkills?.length
    ? profile.technicalSkills
    : FALLBACK;

  const groups = GROUPS.map((g) => ({
    ...g,
    items: skills.filter((s) => s.category === g.key),
  })).filter((g) => g.items.length > 0);

  return (
    <Section
      id="stack"
      index="05"
      label="Materials"
      meta="Schedule of finishes"
    >
      <div className={styles.layout}>
        <div className={styles.mediaCol}>
          <RevealMedia
            item={FLOW_MEDIA.daintree}
            frameClassName={styles.frame}
            parallax={16}
            caption
            plate="P.05"
          />
        </div>

        <div className={styles.body}>
          <RevealText
            as="h2"
            className={styles.heading}
            lines={["Honest", <em key="m">materials,</em>, "carefully joined."]}
          />
          <p className={styles.lede}>
            Like timber, sandstone and steel, every tool has a grain. These are
            the ones I build with — and how well I know them.
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
                  <span className={styles.code}>{g.code}</span>
                  <span>{g.label}</span>
                </div>
                <ul className={styles.items}>
                  {g.items.map((s) => (
                    <li key={s.name} className={styles.item}>
                      <span>{s.name}</span>
                      <span
                        className={styles.level}
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
        </div>
      </div>
    </Section>
  );
};
