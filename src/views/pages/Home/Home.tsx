/**
 * Home — landing narrative: context, build, measure — structured like a product story, not a template stack.
 */

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useProfile } from "@/contexts/ProfileContext";
import {
  useSEO,
  useStructuredData,
  generateStructuredData,
} from "@/hooks/useSEO";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { LinkButton } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { ProjectCard } from "@/views/components/domain/ProjectCard";
import { TestimonialCard } from "@/views/components/domain/TestimonialCard";
import { StatItem } from "@/views/components/domain/StatItem";
import { SocialLinks } from "@/components/SocialLinks";
import {
  SITE_BRAND_NAME,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_KEYWORDS,
} from "@/config/site-defaults";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroMeshArt } from "@/components/PortfolioVisuals";
import styles from "./Home.module.css";

export const Home: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const prefersReducedMotion = useReducedMotion();

  useSEO({
    title: profile
      ? `${profile.name} - ${profile.title} | ${SITE_BRAND_NAME}`
      : `${SITE_BRAND_NAME} | Professional portfolio`,
    description: profile?.bio || SITE_DEFAULT_DESCRIPTION,
    keywords: SITE_DEFAULT_KEYWORDS,
    type: "website",
  });

  const structuredData = profile
    ? generateStructuredData({ type: "Person", profile })
    : null;
  useStructuredData(structuredData);

  const marqueeLabels = useMemo(() => {
    const fromProfile = (profile?.technicalSkills ?? [])
      .map((s) => s.name?.trim())
      .filter((n): n is string => Boolean(n));
    const fallback = [
      "TypeScript",
      "React",
      "Node.js",
      "System design",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "UI engineering",
      "Performance",
      "Accessibility",
    ];
    return [...new Set([...fromProfile, ...fallback])].slice(0, 22);
  }, [profile?.technicalSkills]);

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

  const recentProjects = profile.getFeaturedProjects(3);
  const experiencePreview = profile.experiences.slice(0, 3);
  const showOpenBadge = profile.openToOpportunities !== false;
  const heroBioLead =
    profile.bio
      .split(/\n\n+/)
      .map((p) => p.trim())
      .find(Boolean) ?? profile.bio;

  const heroMotion = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 28 },
    animate: prefersReducedMotion ? false : { opacity: 1, y: 0 },
    transition: prefersReducedMotion
      ? undefined
      : { duration: 0.58, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <>
      <Section
        className={styles.hero}
        aria-label="Introduction"
        suppressAmbientOrbs
        containerBleed
      >
        <div className={styles.heroBackdropOrbs} aria-hidden="true" />
        <div
          className={`${styles.heroInner} ${profile.avatarUrl ? styles.heroInnerWithPortrait : ""}`}
        >
          <motion.div className={styles.heroMain} {...heroMotion}>
            {profile.title && (
              <span className={styles.heroBadge} aria-hidden="true">
                {profile.title}
              </span>
            )}
            <Typography
              variant="h1"
              weight="bold"
              className={styles.heroTitle}
              as="h1"
            >
              {profile.name}
            </Typography>
            <div className={styles.heroMetaRow}>
              {profile.location?.trim() ? (
                <div className={styles.heroLocation} aria-label="Location">
                  <span className={styles.locationIcon} aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      focusable="false"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <Typography variant="body" color="secondary" as="span">
                    {profile.location}
                  </Typography>
                </div>
              ) : null}
              {showOpenBadge && (
                <span
                  className={styles.heroOpenToWork}
                  aria-label="Open to job opportunities"
                >
                  Open to opportunities
                </span>
              )}
            </div>
            <Typography variant="body" className={styles.heroBio} as="p">
              {heroBioLead}
            </Typography>

            {profile.heroTagline && profile.heroTagline.trim() !== "" && (
              <ScrollReveal direction="fade" delay={120}>
                <p
                  className={styles.heroTagline}
                  aria-label="Professional focus"
                >
                  {profile.heroTagline}
                </p>
              </ScrollReveal>
            )}

            <div
              className={styles.heroActions}
              role="group"
              aria-label="Call to action buttons"
            >
              <LinkButton
                to="/projects"
                variant="primary"
                size="lg"
                aria-label="View all projects"
              >
                View projects
              </LinkButton>
              <LinkButton
                to="/contact"
                variant="outline"
                size="lg"
                aria-label="Get in touch"
              >
                Get in touch
              </LinkButton>
            </div>

            {marqueeLabels.length > 0 && (
              <div className={styles.heroMarquee} aria-hidden="true">
                <div className={styles.heroMarqueeTrack}>
                  {[...marqueeLabels, ...marqueeLabels].map((label, i) => (
                    <span
                      key={`marquee-${i}-${label}`}
                      className={styles.heroMarqueeItem}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ScrollReveal direction="up" delay={200}>
              <div className={styles.socialLinksWrapper}>
                <SocialLinks />
              </div>
            </ScrollReveal>
          </motion.div>

          <aside
            className={`${styles.heroAside} ${profile.avatarUrl ? styles.heroAsidePortrait : ""}`}
            {...(profile.avatarUrl
              ? { "aria-label": `Portrait — ${profile.name}` }
              : { "aria-hidden": true })}
          >
            {profile.avatarUrl ? (
              <figure className={styles.heroPortrait}>
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.name} — professional portrait`}
                  className={styles.heroPortraitImage}
                  width={480}
                  height={600}
                  decoding="async"
                  fetchPriority="high"
                />
              </figure>
            ) : (
              <>
                <div className={styles.heroArt}>
                  <HeroMeshArt className={styles.heroMeshSvg} />
                  <div className={styles.signalSculpture}>
                    <span className={styles.signalLine} />
                    <span className={styles.signalNode} />
                    <span className={styles.signalGlow} />
                  </div>
                </div>
                <p className={styles.signalCaption}>
                  Signal through the stack — intent, implementation, evidence.
                </p>
              </>
            )}
          </aside>
        </div>
      </Section>

      {recentProjects.length > 0 && (
        <Section
          label="Work"
          title="Selected projects"
          subtitle="Recent shipped work across mobile, web, and platform."
          id="projects-preview"
          variant="alt"
          headerAlign="start"
          aria-labelledby="projects-preview-title"
        >
          <ScrollReveal direction="up" delay={0}>
            <div className={styles.sectionRail}>
              <div className={styles.trackAccent} aria-hidden="true" />
              <div
                className={styles.projectsGrid}
                role="list"
                aria-label="Recent projects"
              >
                {recentProjects.map((project) => (
                  <div key={project.id} role="listitem">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
              <div className={styles.viewAll}>
                <LinkButton
                  to="/projects"
                  variant="outline"
                  aria-label="View all projects"
                >
                  All projects
                </LinkButton>
              </div>
            </div>
          </ScrollReveal>
        </Section>
      )}

      {experiencePreview.length > 0 && (
        <Section
          label="Path"
          title="Experience"
          subtitle="Recent roles at a glance — the full timeline lives on the experience page."
          id="experience-preview"
          variant="alt"
          aria-labelledby="experience-preview-title"
        >
          <ScrollReveal direction="up" delay={0}>
            <ul
              className={styles.experienceList}
              aria-label="Recent experience"
            >
              {experiencePreview.map((exp) => (
                <li key={exp.id} className={styles.experienceItem}>
                  <div className={styles.experienceItemHeader}>
                    <Typography
                      variant="h5"
                      weight="semibold"
                      className={styles.experiencePosition}
                    >
                      {exp.position}
                    </Typography>
                    <Typography variant="body" color="secondary" as="span">
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </Typography>
                    <Typography variant="small" color="tertiary" as="span">
                      {exp.startDate}
                      {exp.endDate
                        ? ` – ${exp.endDate}`
                        : exp.isCurrent
                          ? " – Present"
                          : ""}
                    </Typography>
                  </div>
                  {(exp.description || exp.achievements?.[0]) && (
                    <p className={styles.experienceSnippet}>
                      {exp.achievements?.[0] ||
                        (exp.description.length > 160
                          ? `${exp.description.slice(0, 160)}…`
                          : exp.description)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.experienceSeeMore}>
              <Link
                to="/experience"
                className={styles.experienceSeeMoreLink}
                aria-label="See full experience and career timeline"
              >
                Full timeline →
              </Link>
            </div>
          </ScrollReveal>
        </Section>
      )}

      {profile.stats.length > 0 && (
        <Section
          label="Impact"
          title="Numbers that matter"
          subtitle="Outcomes across projects, products, and platforms."
          id="stats"
          headerAlign="start"
          aria-labelledby="stats-title"
        >
          <ScrollReveal direction="up" delay={80}>
            <div
              className={styles.statsGrid}
              role="list"
              aria-label="Statistics"
            >
              {profile.stats.map((stat, index) => (
                <div key={stat.id} role="listitem">
                  <StatItem stat={stat} index={index} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Section>
      )}

      {profile.testimonials.length > 0 && (
        <Section
          label="Voices"
          title="What collaborators say"
          subtitle="Short endorsements with names and context — readable quotes, not wall-of-italic."
          className={styles.testimonialsSection}
          id="testimonials"
          variant="alt"
          headerAlign="start"
          aria-labelledby="testimonials-title"
        >
          <ScrollReveal direction="up" delay={80}>
            <div
              className={styles.testimonialsGrid}
              role="list"
              aria-label="Testimonials"
            >
              {profile.testimonials.map((testimonial) => (
                <div key={testimonial.id} role="listitem">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Section>
      )}

      <Section
        label="Next"
        title="What's next?"
        subtitle="Start a conversation or explore the full body of work."
        id="explore"
        headerAlign="center"
        aria-labelledby="explore-title"
      >
        <ScrollReveal direction="up" delay={0}>
          <nav className={styles.exploreGrid} aria-label="Primary actions">
            <Link
              to="/contact"
              className={`${styles.exploreCard} ${styles.exploreCardHighlight}`}
              aria-label="Get in touch"
            >
              <span className={styles.exploreIcon} aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </span>
              <Typography
                variant="h5"
                weight="semibold"
                className={styles.exploreTitle}
              >
                Get in touch
              </Typography>
              <Typography variant="small" color="secondary" as="p">
                Open to new projects and roles. I reply within 1–2 business
                days.
              </Typography>
              <span className={styles.exploreLink}>Start a conversation →</span>
            </Link>
            <Link
              to="/projects"
              className={styles.exploreCard}
              aria-label="Browse all projects"
            >
              <span className={styles.exploreIcon} aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </span>
              <Typography
                variant="h5"
                weight="semibold"
                className={styles.exploreTitle}
              >
                Projects
              </Typography>
              <Typography variant="small" color="secondary" as="p">
                Mobile apps, web platforms, and systems work — all with source
                and context.
              </Typography>
              <span className={styles.exploreLink}>Browse projects →</span>
            </Link>
          </nav>
          <div className={styles.ctaSecondaryLinks}>
            <Link to="/about">About</Link>
            <span aria-hidden="true">·</span>
            <Link to="/experience">Experience</Link>
            <span aria-hidden="true">·</span>
            <Link to="/learning">Learning</Link>
            <span aria-hidden="true">·</span>
            <Link to="/resume">Resume</Link>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
};
