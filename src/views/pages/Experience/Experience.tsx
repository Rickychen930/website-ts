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
    return (
      <div className={styles.error} role="alert" aria-live="assertive">
        <Typography variant="h3">Failed to load experience</Typography>
        <Typography variant="body" color="secondary">
          {error?.message || "Please try again later"}
        </Typography>
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

  return (
    <Section title="Experience" subtitle="My professional journey">
      {profile.experiences.length === 0 ? (
        <div className={styles.empty} role="status" aria-live="polite">
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
          {profile.experiences.map((experience) => (
            <div key={experience.id} role="listitem">
              <ExperienceItem experience={experience} />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};
