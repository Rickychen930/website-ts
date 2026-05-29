import React from "react";
import { Marquee, MarqueeItem } from "@/components/motion/Marquee/Marquee";
import { useProfile } from "@/contexts";
import styles from "./StackSection.module.css";

const toMarqueeItem = (name: string, proficiency: string): MarqueeItem => ({
  name,
  proficiency:
    proficiency === "expert"
      ? "Expert"
      : proficiency === "advanced"
        ? "Advanced"
        : proficiency === "intermediate"
          ? "Intermediate"
          : "Beginner",
});

export const StackSection: React.FC = () => {
  const { profile } = useProfile();
  const skills = profile?.technicalSkills ?? [];

  const row1: MarqueeItem[] = skills.length
    ? skills
        .slice(0, Math.ceil(skills.length / 2))
        .map((s) => toMarqueeItem(s.name, s.proficiency))
    : [
        { name: "TypeScript", proficiency: "Expert" },
        { name: "React", proficiency: "Expert" },
        { name: "Node.js", proficiency: "Advanced" },
        { name: "Python", proficiency: "Intermediate" },
        { name: "PostgreSQL", proficiency: "Intermediate" },
        { name: "Docker", proficiency: "Advanced" },
        { name: "AWS", proficiency: "Intermediate" },
        { name: "MongoDB", proficiency: "Intermediate" },
      ];

  const row2: MarqueeItem[] = skills.length
    ? skills
        .slice(Math.ceil(skills.length / 2))
        .map((s) => toMarqueeItem(s.name, s.proficiency))
    : [
        { name: "Next.js", proficiency: "Advanced" },
        { name: "Redis", proficiency: "Intermediate" },
        { name: "Git", proficiency: "Expert" },
        { name: "Figma", proficiency: "Intermediate" },
        { name: "Swift", proficiency: "Intermediate" },
        { name: "PHP", proficiency: "Intermediate" },
        { name: "WordPress", proficiency: "Intermediate" },
        { name: "Linux", proficiency: "Advanced" },
      ];

  return (
    <section
      className={styles.section}
      aria-label="Tech stack"
      data-section="stack"
    >
      <div className={styles.strip}>
        <Marquee items={row1} direction="left" speed={40} />
        <Marquee items={row2} direction="right" speed={35} />
      </div>
    </section>
  );
};
