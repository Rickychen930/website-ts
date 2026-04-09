/**
 * About — editorial profile: identity, stack, credentials, collaboration.
 */

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import type { SoftSkill } from "@/types/domain";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { SkillBadge } from "@/views/components/domain/SkillBadge";
import { SoftSkillBadge } from "@/views/components/domain/SoftSkillBadge";
import { CertificationCard } from "@/views/components/domain/CertificationCard";
import { AcademicItem } from "@/views/components/domain/AcademicItem";
import { HonorCard } from "@/views/components/domain/HonorCard";
import { DownloadResume } from "@/components/DownloadResume";
import btn from "@/views/components/ui/Button/Button.module.css";
import { EmptyStateArt, HeroMeshArt } from "@/components/PortfolioVisuals";
import {
  SITE_DEFAULT_DESCRIPTION,
  sitePageTitle,
} from "@/config/site-defaults";
import styles from "./About.module.css";

const categoryLabels: Record<SoftSkill["category"], string> = {
  leadership: "Leadership",
  communication: "Communication",
  "problem-solving": "Problem Solving",
  collaboration: "Collaboration",
  adaptability: "Adaptability",
  other: "Other",
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const About: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const prefersReducedMotion = useReducedMotion();

  useSEO({
    title: profile
      ? `${profile.name} - About | Portfolio`
      : sitePageTitle("About"),
    description: profile?.bio || SITE_DEFAULT_DESCRIPTION,
    keywords:
      "about, skills, education, certifications, portfolio, professional",
    type: "profile",
    image: profile?.avatarUrl,
  });

  const skillCategories: Array<{ category: string; label: string }> = useMemo(
    () => [
      { category: "language", label: "Languages" },
      { category: "framework", label: "Frameworks" },
      { category: "database", label: "Databases" },
      { category: "tool", label: "Tools" },
      { category: "cloud", label: "Cloud" },
    ],
    [],
  );

  if (isLoading) {
    return <Loading fullScreen message="Loading profile..." />;
  }

  if (error || !profile) {
    return (
      <PageError
        title="Failed to load profile"
        message={
          error?.message ||
          "Something went wrong while loading your profile. Please try again shortly."
        }
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  const bioParagraphs = profile.bio
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const hasAnyTechnicalSkill = skillCategories.some(
    ({ category }) => profile.getSkillsByCategory(category as any).length > 0,
  );

  const previewStats = profile.stats.slice(0, 4);
  const showOpen = profile.openToOpportunities !== false;
  const linkedinContact = profile.contacts.find((c) => c.type === "linkedin");
  const githubContact = profile.contacts.find((c) => c.type === "github");
  const outlineMd = `${btn.button} ${btn["button--outline"]} ${btn["button--md"]}`;

  const heroContainerVariants = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.07, delayChildren: 0.06 },
        },
      };

  const heroItemVariants = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  const heroTaglineText = profile.heroTagline?.trim();
  const showHeroTagline = Boolean(heroTaglineText);

  const hasCredentialsBlock =
    profile.academics.length > 0 ||
    profile.certifications.length > 0 ||
    profile.honors.length > 0;

  return (
    <div className={styles.about}>
      <Section
        id="about-intro"
        label="Profile"
        title="About"
        subtitle="Who I am, what I build with, and how I collaborate."
        info={
          showOpen
            ? "Open to relevant opportunities · details below"
            : "Focused on current commitments"
        }
        headerAlign="start"
        titleDecoration="none"
        surface="hero"
      >
        <motion.div
          className={`${styles.heroLayout}${previewStats.length === 0 ? ` ${styles.heroLayoutNoRail}` : ""}`}
          variants={heroContainerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? false : "visible"}
        >
          <motion.div className={styles.heroVisual} variants={heroItemVariants}>
            <div className={styles.heroVisualFrame} aria-hidden="true">
              <HeroMeshArt className={styles.heroMesh} />
              {profile.avatarUrl ? (
                <figure className={styles.portraitWrap}>
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.name} — portrait`}
                    className={styles.portraitImg}
                    width={480}
                    height={600}
                    decoding="async"
                  />
                </figure>
              ) : (
                <div
                  className={styles.portraitFallback}
                  aria-label={profile.name}
                  role="img"
                >
                  {initialsFromName(profile.name)}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div className={styles.heroIntro} variants={heroItemVariants}>
            <Typography
              variant="h1"
              weight="bold"
              className={styles.heroName}
              as="h1"
            >
              {profile.name}
            </Typography>
            {profile.title ? (
              <p className={styles.heroRole}>{profile.title}</p>
            ) : null}

            <div className={styles.heroMeta}>
              {profile.location?.trim() ? (
                <span className={styles.metaChip}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                  </svg>
                  {profile.location}
                </span>
              ) : null}
              <span
                className={showOpen ? styles.statusOpen : styles.statusFocused}
              >
                {showOpen ? "Open to opportunities" : "Not actively seeking"}
              </span>
            </div>
            {showHeroTagline ? (
              <p className={styles.heroTagline}>{heroTaglineText}</p>
            ) : null}
          </motion.div>

          <motion.div
            className={styles.heroQuickBar}
            variants={heroItemVariants}
            role="group"
            aria-label="Profile actions"
          >
            <DownloadResume
              plain
              variant="outline"
              size="md"
              label="Download"
              showDecorations={false}
            />
            {linkedinContact ? (
              <a
                href={linkedinContact.value}
                target="_blank"
                rel="noopener noreferrer"
                className={`${outlineMd} ${styles.heroQuickItem}`}
              >
                LinkedIn
              </a>
            ) : null}
            {githubContact ? (
              <a
                href={githubContact.value}
                target="_blank"
                rel="noopener noreferrer"
                className={`${outlineMd} ${styles.heroQuickItem}`}
              >
                GitHub
              </a>
            ) : null}
            <Link
              to="/projects"
              className={`${outlineMd} ${styles.heroQuickItem}`}
            >
              View project
            </Link>
            <Link
              to="/contact"
              className={`${outlineMd} ${styles.heroQuickItem}`}
            >
              Get in touch
            </Link>
          </motion.div>

          <motion.div
            className={styles.heroBio}
            lang="en"
            variants={heroItemVariants}
          >
            {bioParagraphs.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body"
                color={index === 0 ? "primary" : "secondary"}
                className={`${styles.bioParagraph}${index === 0 ? ` ${styles.bioParagraphLead}` : ""}`}
                as="p"
              >
                {paragraph}
              </Typography>
            ))}
          </motion.div>

          {previewStats.length > 0 ? (
            <motion.aside
              className={styles.heroLeftRail}
              aria-label="Highlights"
              variants={heroItemVariants}
            >
              <ul
                className={styles.statStripRail}
                aria-label="Highlighted metrics"
              >
                {previewStats.map((stat) => (
                  <li key={stat.id} className={styles.statStripRailItem}>
                    <span className={styles.statStripValue}>
                      {stat.value}
                      {stat.unit ? (
                        <span className={styles.statStripUnit}>
                          {stat.unit}
                        </span>
                      ) : null}
                    </span>
                    <span className={styles.statStripLabel}>{stat.label}</span>
                  </li>
                ))}
              </ul>
            </motion.aside>
          ) : null}
        </motion.div>
      </Section>

      <Section
        id="about-stack"
        label="Capabilities"
        title="Stack & languages"
        subtitle="What I reach for in production — grouped the way hiring managers scan a CV."
        variant="alt"
        headerAlign="start"
      >
        <div className={styles.stackShell}>
          {profile.languages.length > 0 && (
            <ScrollReveal direction="up" delay={0}>
              <div className={styles.langBlock}>
                <Typography
                  variant="small"
                  weight="semibold"
                  className={styles.langLabel}
                  as="p"
                >
                  Human languages
                </Typography>
                <ul className={styles.langChips} aria-label="Spoken languages">
                  {profile.languages.map((lang) => (
                    <li key={lang.id}>
                      <span className={styles.langChip}>
                        <span className={styles.langChipName}>{lang.name}</span>
                        <span className={styles.langChipLevel}>
                          {lang.proficiency}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}

          {!hasAnyTechnicalSkill ? (
            <div
              className={styles.stackEmpty}
              role="status"
              aria-labelledby="about-skills-empty"
            >
              <EmptyStateArt
                variant="learning"
                className={styles.stackEmptyArt}
              />
              <Typography
                id="about-skills-empty"
                variant="h4"
                weight="semibold"
                color="secondary"
              >
                Technical skills not listed yet
              </Typography>
              <Typography variant="body" color="tertiary">
                Add skills in your profile — they will appear here by category.
              </Typography>
            </div>
          ) : (
            <div className={styles.skillDeck}>
              {skillCategories.map(({ category, label }) => {
                const skills = profile.getSkillsByCategory(category as any);
                if (skills.length === 0) return null;
                return (
                  <ScrollReveal key={category} direction="up" delay={40}>
                    <section
                      className={styles.skillPanel}
                      aria-labelledby={`ab-sk-${category}`}
                    >
                      <Typography
                        variant="h4"
                        weight="semibold"
                        className={styles.skillPanelTitle}
                        as="h3"
                        id={`ab-sk-${category}`}
                      >
                        {label}
                      </Typography>
                      <div
                        className={styles.skillPanelGrid}
                        role="list"
                        aria-label={`${label}`}
                      >
                        {skills.map((skill) => (
                          <div key={skill.id} role="listitem">
                            <SkillBadge skill={skill} showProficiency />
                          </div>
                        ))}
                      </div>
                    </section>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </Section>

      {hasCredentialsBlock && (
        <Section
          id="about-credentials"
          label="Credentials"
          title="Education & proof"
          subtitle="Formal training, certifications, and recognition — in one place."
          headerAlign="start"
          titleDecoration="none"
        >
          <div className={styles.credLayout}>
            {profile.academics.length > 0 && (
              <div className={styles.credColumn}>
                <Typography
                  variant="h4"
                  weight="semibold"
                  className={styles.credColumnTitle}
                  as="h3"
                >
                  Education
                </Typography>
                <ul className={styles.credList} aria-label="Education">
                  {profile.academics.map((a) => (
                    <li key={a.id}>
                      <AcademicItem academic={a} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {profile.certifications.length > 0 && (
              <div className={styles.credColumn}>
                <Typography
                  variant="h4"
                  weight="semibold"
                  className={styles.credColumnTitle}
                  as="h3"
                >
                  Certifications
                </Typography>
                <div
                  className={styles.certGrid}
                  role="list"
                  aria-label="Certifications"
                >
                  {profile.certifications.map((c) => (
                    <div key={c.id} role="listitem">
                      <CertificationCard certification={c} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {profile.honors.length > 0 && (
            <div className={styles.honorsBlock}>
              <Typography
                variant="h4"
                weight="semibold"
                className={styles.honorsTitle}
                as="h3"
              >
                Honors & awards
              </Typography>
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
            </div>
          )}
        </Section>
      )}

      {profile.softSkills.length > 0 && (
        <Section
          id="about-collab"
          label="Collaboration"
          title="How I work with others"
          subtitle="Soft skills grouped — the glue next to the stack."
          variant="alt"
          headerAlign="start"
          titleDecoration="none"
        >
          <div className={styles.softShell}>
            {Object.entries(
              profile.softSkills.reduce(
                (acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                },
                {} as Record<SoftSkill["category"], SoftSkill[]>,
              ),
            ).map(([category, skills]) => (
              <section
                key={category}
                className={styles.softGroup}
                aria-labelledby={`ab-soft-${category}`}
              >
                <Typography
                  variant="h4"
                  weight="semibold"
                  className={styles.softGroupTitle}
                  as="h3"
                  id={`ab-soft-${category}`}
                >
                  {categoryLabels[category as SoftSkill["category"]] ||
                    category}
                </Typography>
                <div
                  className={styles.softCloud}
                  role="list"
                  aria-label={`${category} soft skills`}
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
    </div>
  );
};
