/**
 * Experience Page - Work experience timeline
 * Version 2: Uses ProfileContext
 */

import React from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { ExperienceItem } from "@/views/components/domain/ExperienceItem";
import styles from "./Experience.module.css";

export const Experience: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();

  useSEO({
    title: profile
      ? `${profile.name} - Experience | Portfolio`
      : "Experience | Ricky Chen Portfolio",
    description: profile
      ? `Work experience of ${profile.name}: ${profile.experiences.length} positions.`
      : "Work experience timeline: software engineering and development roles.",
    keywords: "work experience, career, software engineer, timeline",
    type: "profile",
  });

  if (isLoading) {
    return <Loading fullScreen message="Loading experience..." />;
  }

  if (error || !profile) {
    const isProfileNotFound = error?.message?.includes("Profile not found");
    const tip = isProfileNotFound ? (
      <>
        💡 Tip: Make sure the database is seeded. Run <code>npm run seed</code>{" "}
        in the backend directory.
      </>
    ) : undefined;

    return (
      <PageError
        title="Failed to load experience"
        message={
          error?.message ||
          "Something went wrong while loading your experience. Please try again shortly."
        }
        tip={tip}
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  // Sort experiences: current first, then by start date (newest first)
  const sortedExperiences = [...profile.experiences].sort((a, b) => {
    // Current experiences first
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;

    // Then sort by start date (newest first)
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA;
  });

  return (
    <Section
      title="Experience"
      subtitle="My professional journey"
      variant="alt"
    >
      {sortedExperiences.length === 0 ? (
        <div
          className={styles.empty}
          role="status"
          aria-live="polite"
          aria-labelledby="experience-empty-title"
        >
          <div className={styles.emptyIcon} aria-hidden>
            💼
          </div>
          <Typography
            id="experience-empty-title"
            variant="h4"
            weight="semibold"
            color="secondary"
          >
            No experience entries yet
          </Typography>
          <Typography variant="body" color="tertiary">
            Work history will appear here once added. You can explore Projects
            or Contact in the meantime.
          </Typography>
        </div>
      ) : (
        <ScrollReveal direction="up" delay={0}>
          <div
            className={styles.timeline}
            role="list"
            aria-label="Work experience timeline"
          >
            {sortedExperiences.map((experience) => (
              <div
                key={experience.id}
                className={styles.timelineItem}
                role="listitem"
              >
                <ExperienceItem
                  experience={experience}
                  technicalSkills={profile.technicalSkills}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </Section>
  );
};
