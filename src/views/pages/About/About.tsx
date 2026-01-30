/**
 * About Page - Skills, experience summary, philosophy
 * Version 2: Uses ProfileContext
 */

import React from "react";
import { useProfile } from "@/contexts/ProfileContext";
import type { SoftSkill } from "@/types/domain";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { SkillBadge } from "@/views/components/domain/SkillBadge";
import { SoftSkillBadge } from "@/views/components/domain/SoftSkillBadge";
import { CertificationCard } from "@/views/components/domain/CertificationCard";
import { AcademicItem } from "@/views/components/domain/AcademicItem";
import { HonorCard } from "@/views/components/domain/HonorCard";
import styles from "./About.module.css";

const categoryLabels: Record<SoftSkill["category"], string> = {
  leadership: "Leadership",
  communication: "Communication",
  "problem-solving": "Problem Solving",
  collaboration: "Collaboration",
  adaptability: "Adaptability",
  other: "Other",
};

export const About: React.FC = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return <Loading fullScreen message="Loading profile..." />;
  }

  if (error || !profile) {
    return (
      <div className={styles.error} role="alert" aria-live="assertive">
        <Typography variant="h3">Failed to load profile</Typography>
        <Typography variant="body" color="secondary">
          {error?.message ||
            "Something went wrong while loading your profile. Please refresh the page or try again shortly."}
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="primary"
          className={styles.retryButton}
          aria-label="Retry loading profile"
        >
          Retry
        </Button>
      </div>
    );
  }

  const skillCategories: Array<{ category: string; label: string }> = [
    { category: "language", label: "Languages" },
    { category: "framework", label: "Frameworks" },
    { category: "database", label: "Databases" },
    { category: "tool", label: "Tools" },
    { category: "cloud", label: "Cloud" },
  ];

  return (
    <>
      <Section title="About Me" subtitle="A brief introduction">
        <div className={styles.content}>
          <Typography variant="body" className={styles.bio}>
            {profile.bio}
          </Typography>
        </div>
      </Section>

      <Section
        title="Technical Skills"
        subtitle="Technologies and tools I work with"
      >
        {skillCategories.every(
          ({ category }) =>
            profile.getSkillsByCategory(category as any).length === 0,
        ) ? (
          <div className={styles.empty} role="status" aria-live="polite">
            <Typography variant="h4" weight="semibold" color="secondary">
              No skills available
            </Typography>
            <Typography variant="body" color="tertiary">
              Skills information will be available soon.
            </Typography>
          </div>
        ) : (
          <div className={styles.skillsContainer}>
            {skillCategories.map(({ category, label }) => {
              const skills = profile.getSkillsByCategory(category as any);
              if (skills.length === 0) return null;

              return (
                <section
                  key={category}
                  className={styles.skillCategory}
                  aria-labelledby={`skills-${category}`}
                >
                  <Typography
                    variant="h4"
                    weight="semibold"
                    className={styles.categoryTitle}
                    as="h3"
                    id={`skills-${category}`}
                  >
                    {label}
                  </Typography>
                  <div
                    className={styles.skillsGrid}
                    role="list"
                    aria-label={`${label} skills`}
                  >
                    {skills.map((skill) => (
                      <div key={skill.id} role="listitem">
                        <SkillBadge skill={skill} showProficiency />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </Section>

      {profile.languages.length > 0 && (
        <Section title="Languages" className={styles.languagesSection}>
          <div className={styles.languages} role="list" aria-label="Languages">
            {profile.languages.map((language) => (
              <div
                key={language.id}
                className={styles.languageItem}
                role="listitem"
              >
                <Typography variant="body" weight="semibold" as="span">
                  {language.name}
                </Typography>
                <Typography
                  variant="small"
                  color="tertiary"
                  as="span"
                  aria-label={`${language.proficiency} proficiency`}
                >
                  {language.proficiency}
                </Typography>
              </div>
            ))}
          </div>
        </Section>
      )}

      {profile.academics.length > 0 && (
        <Section
          title="Education"
          subtitle="Academic background and qualifications"
        >
          <div
            className={styles.academicsList}
            role="list"
            aria-label="Education history"
          >
            {profile.academics.map((academic) => (
              <div key={academic.id} role="listitem">
                <AcademicItem academic={academic} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {profile.certifications.length > 0 && (
        <Section
          title="Certifications"
          subtitle="Professional certifications and credentials"
        >
          <div
            className={styles.certificationsGrid}
            role="list"
            aria-label="Certifications"
          >
            {profile.certifications.map((certification) => (
              <div key={certification.id} role="listitem">
                <CertificationCard certification={certification} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {profile.honors.length > 0 && (
        <Section
          title="Honors & Awards"
          subtitle="Recognition and achievements"
          className={styles.honorsSection}
        >
          <div
            className={styles.honorsGrid}
            role="list"
            aria-label="Honors and awards"
          >
            {profile.honors.map((honor) => (
              <div key={honor.id} role="listitem">
                <HonorCard honor={honor} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {profile.softSkills.length > 0 && (
        <Section
          title="Soft Skills"
          subtitle="Personal attributes and abilities"
          className={styles.softSkillsSection}
        >
          <div
            className={styles.softSkillsContainer}
            role="list"
            aria-label="Soft skills"
          >
            {Object.entries(
              profile.softSkills.reduce(
                (acc, skill) => {
                  if (!acc[skill.category]) {
                    acc[skill.category] = [];
                  }
                  acc[skill.category].push(skill);
                  return acc;
                },
                {} as Record<SoftSkill["category"], SoftSkill[]>,
              ),
            ).map(([category, skills]) => (
              <section
                key={category}
                className={styles.softSkillCategory}
                aria-labelledby={`soft-skills-${category}`}
              >
                <Typography
                  variant="h4"
                  weight="semibold"
                  className={styles.categoryTitle}
                  as="h3"
                  id={`soft-skills-${category}`}
                >
                  {categoryLabels[category as SoftSkill["category"]] ||
                    category}
                </Typography>
                <div
                  className={styles.softSkillsGrid}
                  role="list"
                  aria-label={`${category} skills`}
                >
                  {skills.map((skill) => (
                    <div key={skill.id} role="listitem">
                      <SoftSkillBadge softSkill={skill} showCategory={false} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Section>
      )}
    </>
  );
};
