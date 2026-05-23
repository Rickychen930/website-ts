/**
 * HomeExperienceSection — Nexus timeline + metrics for the home page.
 */

import React from "react";
import { Link } from "react-router-dom";
import type { Experience } from "@/types/domain";
import { formatDateRange, getDuration } from "@/utils/dateUtils";
import { LinkButton } from "@/views/components/ui/Button";
import { TiltCard } from "@/components/TiltCard/TiltCard";
import { Magnetic } from "@/components/Magnetic/Magnetic";
import { NexusSection } from "@/components/NexusSection";
import styles from "./HomeExperienceSection.module.css";

export interface HomeExperienceSectionProps {
  roles: readonly Experience[];
  companiesCount: number;
  careerYears: number;
  currentCount: number;
}

function RoleTimelineItem({
  role,
  isLast,
}: {
  role: Experience;
  isLast: boolean;
}) {
  const isCurrent = role.isCurrent;
  const achievements = role.achievements.slice(0, isCurrent ? 3 : 1);
  const tech = role.technologies.slice(0, isCurrent ? 6 : 0);

  return (
    <li
      className={`${styles.timelineItem} ${isCurrent ? styles.timelineItemCurrent : ""} ${isLast ? styles.timelineItemLast : ""}`}
    >
      <div className={styles.timelineRail} aria-hidden="true">
        <span className={styles.timelineNode} />
        {!isLast ? <span className={styles.timelineLine} /> : null}
      </div>

      <TiltCard
        className={`${styles.roleCard} ${isCurrent ? styles.roleCardCurrent : styles.roleCardPast}`}
        maxTilt={isCurrent ? 10 : 6}
        glare={isCurrent}
      >
        <article aria-labelledby={`home-role-${role.id}`}>
          <header className={styles.roleHeader}>
            <div className={styles.roleHeaderMain}>
              {isCurrent ? (
                <span className={styles.liveBadge}>
                  <span className={styles.liveDot} aria-hidden="true" />
                  Now
                </span>
              ) : null}
              <p className={styles.roleCompany}>{role.company}</p>
              <h3 id={`home-role-${role.id}`} className={styles.roleTitle}>
                {role.position}
              </h3>
              {role.location?.trim() ? (
                <p className={styles.roleLocation}>{role.location}</p>
              ) : null}
            </div>
            <div className={styles.roleMeta}>
              <time dateTime={role.startDate} className={styles.roleDates}>
                {formatDateRange(role.startDate, role.endDate)}
              </time>
              <span className={styles.roleDuration}>
                {getDuration(role.startDate, role.endDate)}
              </span>
            </div>
          </header>

          {isCurrent && role.description ? (
            <p className={styles.roleSummary}>{role.description}</p>
          ) : null}

          {achievements.length > 0 ? (
            <ul className={styles.roleHighlights}>
              {achievements.map((item, index) => (
                <li key={`${role.id}-hl-${index}`}>{item}</li>
              ))}
            </ul>
          ) : null}

          {tech.length > 0 ? (
            <ul className={styles.roleTech} aria-label="Technologies">
              {tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ) : null}

          <Link
            to="/experience"
            className={styles.roleLink}
            aria-label={`Full timeline — ${role.position} at ${role.company}`}
          >
            View on timeline
            <span aria-hidden="true">→</span>
          </Link>
        </article>
      </TiltCard>
    </li>
  );
}

export const HomeExperienceSection: React.FC<HomeExperienceSectionProps> = ({
  roles,
  companiesCount,
  careerYears,
  currentCount,
}) => {
  if (roles.length === 0) return null;

  return (
    <NexusSection
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Career <span className="nx-gradient-text">trajectory</span>
        </>
      }
      lead="Decode Capital, Web Architech, and earlier engineering at Samsung R&D — mapped as a live signal, not a résumé dump."
      action={
        <Magnetic strength={0.16}>
          <LinkButton to="/experience" variant="outline">
            Full timeline
          </LinkButton>
        </Magnetic>
      }
    >
      <div className={styles.layout}>
        <ol className={styles.timeline} aria-label="Recent roles">
          {roles.map((role, index) => (
            <RoleTimelineItem
              key={role.id}
              role={role}
              isLast={index === roles.length - 1}
            />
          ))}
        </ol>

        <aside
          className={`nx-glass ${styles.metricsPanel}`}
          aria-label="Career metrics"
        >
          <p className={styles.metricsLabel}>Signal summary</p>
          <ul className={styles.metricsList}>
            <li>
              <TiltCard className={styles.metricCard} maxTilt={7}>
                <span className={styles.metricValue}>{currentCount}</span>
                <span className={styles.metricLabel}>Active roles</span>
              </TiltCard>
            </li>
            <li>
              <TiltCard className={styles.metricCard} maxTilt={7}>
                <span className={styles.metricValue}>{companiesCount}</span>
                <span className={styles.metricLabel}>Companies</span>
              </TiltCard>
            </li>
            <li>
              <TiltCard className={styles.metricCard} maxTilt={7}>
                <span className={styles.metricValue}>
                  {careerYears > 0 ? `${careerYears}+` : "—"}
                </span>
                <span className={styles.metricLabel}>Years building</span>
              </TiltCard>
            </li>
          </ul>
          <p className={styles.metricsFoot}>
            Internships, founder work, and R&amp;D — each node links to the full
            chronology.
          </p>
          <Magnetic strength={0.2}>
            <LinkButton to="/experience" variant="primary" fullWidth>
              Explore experience
            </LinkButton>
          </Magnetic>
        </aside>
      </div>
    </NexusSection>
  );
};
