/**
 * Experience Page - Work experience timeline
 * Version 2: Uses ProfileContext
 */

import React from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { ExperienceItem } from "@/views/components/domain/ExperienceItem";
import styles from "./Experience.module.css";

export const Experience: React.FC = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return <Loading fullScreen message="Loading experience..." />;
  }

  if (error || !profile) {
    const isProfileNotFound = error?.message?.includes("Profile not found");

    return (
      <div className={styles.error} role="alert" aria-live="assertive">
        <Typography variant="h3">Failed to load experience</Typography>
        <Typography variant="body" color="secondary">
          {error?.message ||
            "Something went wrong while loading your experience. Please refresh the page or try again shortly."}
        </Typography>
        {isProfileNotFound && (
          <Typography variant="small" color="tertiary" className={styles.tip}>
            💡 Tip: Make sure the database is seeded. Run{" "}
            <code className={styles.codeInline}>npm run seed</code> in the
            backend directory.
          </Typography>
        )}
        <Button
          onClick={() => window.location.reload()}
          variant="primary"
          className={styles.retryButton}
          aria-label="Retry loading experience"
        >
          Retry
        </Button>
      </div>
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
    <Section title="Experience" subtitle="My professional journey">
      {sortedExperiences.length === 0 ? (
        <div className={styles.empty} role="status" aria-live="polite">
          <div className={styles.emptyIcon}>💼</div>
          <Typography variant="h4" weight="semibold" color="secondary">
            No experience available
          </Typography>
          <Typography variant="body" color="tertiary">
            Experience information will be available soon.
          </Typography>
        </div>
      ) : (
        <div
          className={styles.timeline}
          role="list"
          aria-label="Work experience timeline"
        >
          {sortedExperiences.map((experience) => (
            <div key={experience.id} role="listitem">
              <ExperienceItem
                experience={experience}
                technicalSkills={profile.technicalSkills}
              />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};
