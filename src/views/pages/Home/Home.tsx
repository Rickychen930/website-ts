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
import { ExperienceRoleCard } from "@/views/components/domain/ExperienceRoleCard";
import { TestimonialCard } from "@/views/components/domain/TestimonialCard";
import {
  getCurrentExperiences,
  sortExperiencesByRecency,
} from "@/utils/experienceSort";
import { ContactChannelIcon } from "@/components/ContactChannelIcon";
import {
  contactHref,
  formatChannelDisplay,
  sortChannelsForDisplay,
} from "@/utils/contactChannels";
import {
  SITE_BRAND_NAME,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_KEYWORDS,
} from "@/config/site-defaults";
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

  const heroStatCols =
    highlightStats.length >= 4 ? "pf-hero-stats--four" : "pf-hero-stats--three";

  return (
    <motion.div
      className={`pf-page ${styles.home}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="pf-hero" aria-label="Introduction">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <div className={styles.heroGridBg} aria-hidden="true" />
        <div className={`pf-hero-inner ${styles.heroInner}`}>
          <motion.div
            className={`pf-hero-copy ${styles.heroCopy}`}
            {...fadeUp(reduced)}
          >
            {profile.title ? (
              <p className="pf-eyebrow">{profile.title}</p>
            ) : null}
            <h1 className="pf-hero-title">{profile.name}</h1>

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
              <LinkButton to="/projects" variant="primary" size="lg">
                View projects
              </LinkButton>
              <LinkButton to="/contact" variant="outline" size="lg">
                Contact
              </LinkButton>
            </div>
          </motion.div>

          {profile.avatarUrl ? (
            <motion.figure
              className={styles.portrait}
              {...fadeUp(reduced, 0.1)}
            >
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} — portrait`}
                width={520}
                height={650}
                decoding="async"
                fetchPriority="high"
              />
            </motion.figure>
          ) : null}
        </div>

        <ul
          className={`pf-hero-stats ${heroStatCols} ${styles.heroStatsBar}`}
          aria-label="At a glance"
        >
          {highlightStats.map((stat) => (
            <li key={stat.id}>
              <span className="pf-stat-value">
                {stat.value}
                {stat.unit ?? ""}
              </span>
              <span className="pf-stat-label">{stat.label}</span>
              {stat.description ? (
                <span className={styles.statHint}>{stat.description}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </header>

      <div className={`pf-workspace ${styles.workspace}`}>
        <div className="pf-workspace-inner">
          {featuredProjects.length > 0 ? (
            <section id="work" className="pf-block">
              <header className="pf-block-head">
                <div>
                  <p className="pf-block-eyebrow">Portfolio</p>
                  <h2 className="pf-block-title">Selected work</h2>
                  <p className="pf-block-lead">
                    AI tools, client platforms, and shipped products with
                    measurable outcomes.
                  </p>
                </div>
                <LinkButton to="/projects" variant="outline">
                  All {profile.projects.length} projects
                </LinkButton>
              </header>
              <ProjectSpotlight projects={featuredProjects} />
            </section>
          ) : null}

          {currentRoles.length > 0 || earlierRole ? (
            <section id="experience" className="pf-block">
              <header className="pf-block-head">
                <div>
                  <p className="pf-block-eyebrow">Experience</p>
                  <h2 className="pf-block-title">Where I&apos;ve built</h2>
                  <p className="pf-block-lead">
                    IT intern at Decode Capital, founder at Web Architech, and
                    earlier engineering at scale.
                  </p>
                </div>
                <LinkButton to="/experience" variant="outline">
                  Full timeline
                </LinkButton>
              </header>
              <ul className={styles.roleList}>
                {currentRoles.map((role) => (
                  <li key={role.id}>
                    <ExperienceRoleCard experience={role} emphasis />
                  </li>
                ))}
                {earlierRole ? (
                  <li>
                    <ExperienceRoleCard experience={earlierRole} />
                  </li>
                ) : null}
              </ul>
            </section>
          ) : null}

          {homeTestimonials.length > 0 ? (
            <section id="testimonials" className="pf-block">
              <header className="pf-block-head">
                <div>
                  <p className="pf-block-eyebrow">Endorsements</p>
                  <h2 className="pf-block-title">What people say</h2>
                  <p className="pf-block-lead">
                    Feedback from collaborators and clients.
                  </p>
                </div>
              </header>
              <ul className={styles.testimonials}>
                {homeTestimonials.map((t) => (
                  <li key={t.id}>
                    <TestimonialCard testimonial={t} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section id="explore" className="pf-block">
            <header className="pf-block-head">
              <div>
                <p className="pf-block-eyebrow">Explore</p>
                <h2 className="pf-block-title">Jump into the portfolio</h2>
                <p className="pf-block-lead">
                  Projects, experience, contact, and resume — pick a
                  destination.
                </p>
              </div>
            </header>
            <ul className={styles.exploreGrid}>
              {EXPLORE_LINKS.map(({ to, title, description }) => (
                <li key={to}>
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
                </li>
              ))}
            </ul>
          </section>

          {contactChannels.length > 0 ? (
            <section id="contact" className="pf-block">
              <header className="pf-block-head">
                <div>
                  <p className="pf-block-eyebrow">Contact</p>
                  <h2 className="pf-block-title">Let&apos;s talk</h2>
                  <p className="pf-block-lead">
                    Hiring, internships, or collaborations — I usually reply
                    within one to two business days.
                  </p>
                </div>
                <LinkButton to="/contact" variant="primary">
                  Open contact page
                </LinkButton>
              </header>
              <ul className={styles.contactRow}>
                {contactChannels.map((channel) => {
                  const { href, external } = contactHref(channel);
                  return (
                    <li key={channel.id}>
                      <a
                        href={href}
                        data-link-kind="card"
                        className={
                          channel.isPrimary
                            ? styles.contactCardPrimary
                            : styles.contactCard
                        }
                        {...(external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                      >
                        <span className={styles.contactIcon} aria-hidden>
                          <ContactChannelIcon type={channel.type} />
                        </span>
                        <span className={styles.contactLabel}>
                          {channel.label}
                        </span>
                        <span className={styles.contactValue}>
                          {formatChannelDisplay(channel.type, channel.value)}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
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
            <LinkButton to="/contact" variant="primary" size="lg">
              Get in touch
            </LinkButton>
            <LinkButton to="/resume" variant="outline" size="lg">
              View resume
            </LinkButton>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
