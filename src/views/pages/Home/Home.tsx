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
import { DownloadResume } from "@/components/DownloadResume";
import { HeroMeshArt } from "@/components/PortfolioVisuals";
import styles from "./Home.module.css";

const STORY_BEATS = [
  {
    title: "Context",
    body: "Understand the problem space before touching code or pixels — so solutions stay grounded in real constraints.",
  },
  {
    title: "Build",
    body: "Ship tangible artifacts: prototypes, systems, and interfaces — including the page you are reading now.",
  },
  {
    title: "Measure",
    body: "Let usage and feedback guide refinement — not feature sprawl for its own sake.",
  },
] as const;

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
              <DownloadResume />
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

      <section
        className={styles.storyBand}
        aria-labelledby="home-story-heading"
      >
        <div className={styles.storyBandInner}>
          <h2 id="home-story-heading" className={styles.storyBandTitle}>
            How this site is organized
          </h2>
          <p className={styles.storyBandLead}>
            Each section exists on purpose — not as filler. The flow from
            introduction through work, experience, impact, and next steps is one
            continuous thread, not a generic card grid.
          </p>
          <ul className={styles.storySteps}>
            {STORY_BEATS.map((beat) => (
              <li key={beat.title} className={styles.storyStep}>
                <span className={styles.storyStepMark} aria-hidden="true" />
                <span className={styles.storyStepTitle}>{beat.title}</span>
                <p className={styles.storyStepBody}>{beat.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {recentProjects.length > 0 && (
        <Section
          label="Work"
          title="Selected projects"
          subtitle="Concrete slices of work — chosen to inform, not to pad a portfolio."
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
            <div className={styles.sectionRail}>
              <div className={styles.trackAccent} aria-hidden="true" />
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
            </div>
          </ScrollReveal>
        </Section>
      )}

      {profile.stats.length > 0 && (
        <Section
          label="Impact"
          title="Numbers that matter"
          subtitle="Metrics included because they tell a story — not vanity counters."
          id="stats"
          headerAlign="start"
          aria-labelledby="stats-title"
        >
          <ScrollReveal direction="up" delay={80}>
            <div className={styles.sectionRail}>
              <div className={styles.trackAccent} aria-hidden="true" />
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
            <div className={styles.sectionRail}>
              <div className={styles.trackAccent} aria-hidden="true" />
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
            </div>
          </ScrollReveal>
        </Section>
      )}

      <Section
        label="Next"
        title="Keep going"
        subtitle="Explicit paths forward — the same clarity you would expect from a well-designed product surface."
        id="explore"
        headerAlign="start"
        aria-labelledby="explore-title"
      >
        <ScrollReveal direction="up" delay={0}>
          <div className={styles.sectionRail}>
            <div className={styles.trackAccent} aria-hidden="true" />
            <nav
              className={styles.exploreGrid}
              aria-label="Explore portfolio sections"
            >
              <Link
                to="/resume"
                className={`${styles.exploreCard} ${styles.exploreCardHighlight}`}
                aria-label="View resume and download CV"
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </span>
                <Typography
                  variant="h5"
                  weight="semibold"
                  className={styles.exploreTitle}
                >
                  Resume
                </Typography>
                <Typography variant="small" color="secondary" as="p">
                  CV & download
                </Typography>
                <span className={styles.exploreLink}>Open resume →</span>
              </Link>
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
                  Contact
                </Typography>
                <Typography variant="small" color="secondary" as="p">
                  Start a conversation
                </Typography>
                <span className={styles.exploreLink}>Say hello →</span>
              </Link>
              <Link
                to="/about"
                className={styles.exploreCard}
                aria-label="About – skills, education"
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <Typography
                  variant="h5"
                  weight="semibold"
                  className={styles.exploreTitle}
                >
                  About
                </Typography>
                <Typography variant="small" color="secondary" as="p">
                  Skills & education
                </Typography>
                <span className={styles.exploreLink}>Learn more →</span>
              </Link>
              <Link
                to="/experience"
                className={styles.exploreCard}
                aria-label="Work experience timeline"
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
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </span>
                <Typography
                  variant="h5"
                  weight="semibold"
                  className={styles.exploreTitle}
                >
                  Experience
                </Typography>
                <Typography variant="small" color="secondary" as="p">
                  Career timeline
                </Typography>
                <span className={styles.exploreLink}>View timeline →</span>
              </Link>
              <Link
                to="/learning"
                className={styles.exploreCard}
                aria-label="Learning curriculum"
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
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    <path d="M8 7h8" />
                    <path d="M8 11h8" />
                  </svg>
                </span>
                <Typography
                  variant="h5"
                  weight="semibold"
                  className={styles.exploreTitle}
                >
                  Learning
                </Typography>
                <Typography variant="small" color="secondary" as="p">
                  Curriculum & topics
                </Typography>
                <span className={styles.exploreLink}>Browse →</span>
              </Link>
            </nav>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
};
