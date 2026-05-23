/**
 * Home — portfolio landing (full redesign).
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useProfile } from "@/contexts/ProfileContext";
import {
  useSEO,
  useStructuredData,
  generateStructuredData,
} from "@/hooks/useSEO";
import { LinkButton } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { ProjectSpotlight } from "@/views/components/domain/ProjectSpotlight";
import { HomeExperienceSection } from "./HomeExperienceSection";
import { TestimonialCard } from "@/views/components/domain/TestimonialCard";
import {
  getCurrentExperiences,
  sortExperiencesByRecency,
} from "@/utils/experienceSort";
import { ContactChannelsPanel } from "@/views/components/domain/ContactChannelsPanel";
import { sortChannelsForDisplay } from "@/utils/contactChannels";
import {
  SITE_BRAND_NAME,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_KEYWORDS,
} from "@/config/site-defaults";
import { TiltCard } from "@/components/TiltCard/TiltCard";
import { SplitText } from "@/components/SplitText/SplitText";
import { Magnetic } from "@/components/Magnetic/Magnetic";
import { SkillMarquee } from "@/components/SkillMarquee/SkillMarquee";
import { NexusSection } from "@/components/NexusSection";
import { PageHeroFx } from "@/components/PageHeroFx";
import type { Stat } from "@/types/domain";
import styles from "./Home.module.css";

const fadeUp = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
      };

const EXPLORE_LINKS = [
  {
    to: "/projects",
    title: "Projects",
    description: "Case studies, stacks, and shipped outcomes.",
  },
  {
    to: "/experience",
    title: "Experience",
    description: "Decode Capital, Web Architech, and prior roles.",
  },
  {
    to: "/contact",
    title: "Contact",
    description: "Email, LinkedIn, and a short message form.",
  },
  {
    to: "/resume",
    title: "Resume",
    description: "PDF download and ATS-friendly preview.",
  },
] as const;

function computeCareerYears(
  experiences: ReadonlyArray<{ startDate: string }>,
): number {
  const starts = experiences
    .map((e) => new Date(e.startDate).getTime())
    .filter((t) => !Number.isNaN(t));
  if (starts.length === 0) return 0;
  const earliest = Math.min(...starts);
  const years = (Date.now() - earliest) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.max(1, Math.round(years));
}

function buildHighlightStats(
  stats: readonly Stat[],
  projectsCount: number,
  skillsCount: number,
  companiesCount: number,
  careerYears: number,
): Stat[] {
  if (stats.length >= 2) {
    return stats.slice(0, 4).map((s) => ({ ...s }));
  }
  return [
    {
      id: "hl-projects",
      label: "Projects",
      value: projectsCount,
    },
    {
      id: "hl-skills",
      label: "Skills",
      value: skillsCount,
    },
    {
      id: "hl-companies",
      label: "Companies",
      value: companiesCount,
    },
    {
      id: "hl-years",
      label: "Years building",
      value: careerYears > 0 ? `${careerYears}+` : "—",
    },
  ];
}

export const Home: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const reduced = useReducedMotion() ?? false;

  useSEO({
    title: profile ? `${profile.name} — ${profile.title}` : SITE_BRAND_NAME,
    description: profile?.bio || SITE_DEFAULT_DESCRIPTION,
    keywords: SITE_DEFAULT_KEYWORDS,
    type: "website",
  });

  const structuredData = profile
    ? generateStructuredData({ type: "Person", profile })
    : null;
  useStructuredData(structuredData);

  if (isLoading) {
    return <Loading fullScreen message="Loading profile..." />;
  }

  if (error || !profile) {
    return (
      <PageError
        title="Failed to load profile"
        message={error?.message || "Please try again later."}
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  const heroBio =
    profile.bio
      .split(/\n\n+/)
      .map((p) => p.trim())
      .find(Boolean) ?? profile.bio;

  const featuredProjects = profile.getFeaturedProjects(3);
  const currentRoles = getCurrentExperiences(profile.experiences);
  const earlierRole = sortExperiencesByRecency(profile.experiences).find(
    (e) => !e.isCurrent,
  );
  const homeTestimonials = profile.testimonials.slice(0, 3);
  const openToWork = profile.openToOpportunities !== false;
  const contactChannels = sortChannelsForDisplay(profile.contacts);

  const companiesCount = new Set(
    profile.experiences.map((e) => e.company.trim()).filter(Boolean),
  ).size;
  const careerYears = computeCareerYears(profile.experiences);
  const highlightStats = buildHighlightStats(
    profile.stats,
    profile.projects.length,
    profile.technicalSkills.length,
    companiesCount,
    careerYears,
  );

  const homeExperienceRoles = [
    ...currentRoles,
    ...(earlierRole && !currentRoles.some((r) => r.id === earlierRole.id)
      ? [earlierRole]
      : []),
  ];

  const heroStatCols =
    highlightStats.length >= 4 ? "pf-hero-stats--four" : "pf-hero-stats--three";

  const skillNames = profile.technicalSkills.map((s) => s.name);

  return (
    <motion.div
      className={`pf-page ${styles.home}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="pf-hero" aria-label="Introduction">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <PageHeroFx />
        <div className={styles.heroBeacon} aria-hidden="true" />
        <div className={`pf-hero-inner ${styles.heroInner}`}>
          <motion.div
            className={`pf-hero-copy ${styles.heroCopy}`}
            {...fadeUp(reduced)}
          >
            {profile.title ? (
              <p className="pf-eyebrow">{profile.title}</p>
            ) : null}
            <h1 className="pf-hero-title">
              <SplitText text={profile.name} stagger={0.032} />
            </h1>

            <div className={styles.heroMeta}>
              {profile.location?.trim() ? (
                <span>{profile.location}</span>
              ) : null}
              {openToWork ? (
                <span className={styles.openBadge}>Open to opportunities</span>
              ) : null}
            </div>

            <p className={`pf-hero-lead ${styles.heroBio}`}>{heroBio}</p>

            <div className={styles.heroActions}>
              <Magnetic strength={0.22}>
                <LinkButton to="/projects" variant="primary" size="lg">
                  View projects
                </LinkButton>
              </Magnetic>
              <Magnetic strength={0.18}>
                <LinkButton to="/contact" variant="outline" size="lg">
                  Contact
                </LinkButton>
              </Magnetic>
            </div>
          </motion.div>

          <figure className={styles.heroSignal} aria-hidden="true">
            <span
              className={`${styles.heroSignalOrb} ${styles.heroSignalOrbCyan}`}
            />
            <span
              className={`${styles.heroSignalOrb} ${styles.heroSignalOrbMagenta}`}
            />
            <span className={styles.heroSignalGrid} />
            <span className={styles.heroSignalCore} />
          </figure>
        </div>

        <ul
          className={`pf-hero-stats ${heroStatCols} ${styles.heroStatsBar}`}
          aria-label="At a glance"
        >
          {highlightStats.map((stat) => (
            <li key={stat.id}>
              <TiltCard className={styles.statCard} maxTilt={8}>
                <span className="pf-stat-value">
                  {stat.value}
                  {stat.unit ?? ""}
                </span>
                <span className="pf-stat-label">{stat.label}</span>
                {stat.description ? (
                  <span className={styles.statHint}>{stat.description}</span>
                ) : null}
              </TiltCard>
            </li>
          ))}
        </ul>

        <motion.div
          className={styles.scrollHint}
          aria-hidden="true"
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className={styles.scrollLine} />
          <span className={styles.scrollText}>Scroll</span>
        </motion.div>
      </header>

      {skillNames.length > 0 ? (
        <SkillMarquee skills={skillNames} className={styles.skillMarquee} />
      ) : null}

      <div className={`pf-workspace ${styles.workspace}`}>
        <div className={`pf-workspace-inner ${styles.workspaceInner}`}>
          {featuredProjects.length > 0 ? (
            <NexusSection
              id="work"
              eyebrow="Portfolio"
              title={
                <>
                  Selected <span className="nx-gradient-text">work</span>
                </>
              }
              lead="AI tools, client platforms, and shipped products with measurable outcomes."
              action={
                <LinkButton to="/projects" variant="outline">
                  All {profile.projects.length} projects
                </LinkButton>
              }
            >
              <ProjectSpotlight projects={featuredProjects} />
            </NexusSection>
          ) : null}

          {homeExperienceRoles.length > 0 ? (
            <HomeExperienceSection
              roles={homeExperienceRoles}
              companiesCount={companiesCount}
              careerYears={careerYears}
              currentCount={currentRoles.length}
            />
          ) : null}

          {homeTestimonials.length > 0 ? (
            <NexusSection
              id="testimonials"
              eyebrow="Endorsements"
              title={
                <>
                  What people <span className="nx-gradient-text">say</span>
                </>
              }
              lead="Feedback from collaborators and clients."
            >
              <ul className={styles.testimonials}>
                {homeTestimonials.map((t) => (
                  <li key={t.id}>
                    <TestimonialCard testimonial={t} />
                  </li>
                ))}
              </ul>
            </NexusSection>
          ) : null}

          <NexusSection
            id="explore"
            eyebrow="Explore"
            title={
              <>
                Jump into the{" "}
                <span className="nx-gradient-text">portfolio</span>
              </>
            }
            lead="Projects, experience, contact, and resume — pick a destination."
          >
            <ul className={styles.exploreGrid}>
              {EXPLORE_LINKS.map(({ to, title, description }) => (
                <li key={to}>
                  <TiltCard className={styles.exploreCardWrap}>
                    <Link
                      to={to}
                      className={styles.exploreCard}
                      data-link-kind="card"
                    >
                      <span className={styles.exploreCardBody}>
                        <span className={styles.exploreCardTitle}>{title}</span>
                        <span className={styles.exploreCardDesc}>
                          {description}
                        </span>
                      </span>
                      <span className={styles.exploreCardFooter} aria-hidden>
                        <span className={styles.exploreCardCta}>View</span>
                        <span className={styles.exploreCardArrow}>→</span>
                      </span>
                    </Link>
                  </TiltCard>
                </li>
              ))}
            </ul>
          </NexusSection>

          {contactChannels.length > 0 ? (
            <NexusSection
              id="contact"
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s <span className="nx-gradient-text">talk</span>
                </>
              }
              lead="Hiring, internships, or collaborations — I usually reply within one to two business days."
              action={
                <LinkButton to="/contact" variant="primary">
                  Open contact page
                </LinkButton>
              }
            >
              <ContactChannelsPanel
                channels={contactChannels}
                variant="compact"
                hideHeader
                className={styles.contactEmbed}
              />
            </NexusSection>
          ) : null}
        </div>
      </div>

      <section className="pf-cta" aria-labelledby="home-cta-title">
        <div className="page-cta-band">
          <h2 id="home-cta-title" className={styles.ctaHeading}>
            Let&apos;s work together
          </h2>
          <p className="page-cta-body">
            Open to full-time roles and strong collaborations. Tell me what
            you&apos;re building — I typically reply within one to two business
            days.
          </p>
          <div className="page-cta-actions">
            <Magnetic strength={0.2}>
              <LinkButton to="/contact" variant="primary" size="lg">
                Get in touch
              </LinkButton>
            </Magnetic>
            <Magnetic strength={0.16}>
              <LinkButton to="/resume" variant="outline" size="lg">
                View resume
              </LinkButton>
            </Magnetic>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
