/**
 * Home Page - Main landing page
 * Version 2: Uses ProfileContext instead of local state
 */

import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import {
  useSEO,
  useStructuredData,
  generateStructuredData,
} from "@/hooks/useSEO";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import { ProjectCard } from "@/views/components/domain/ProjectCard";
import { TestimonialCard } from "@/views/components/domain/TestimonialCard";
import { StatItem } from "@/views/components/domain/StatItem";
import { CodeTyping } from "@/components/CodeTyping";
import { SocialLinks } from "@/components/SocialLinks";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DownloadResume } from "@/components/DownloadResume";
import styles from "./Home.module.css";

export const Home: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();

  // SEO Configuration
  useSEO({
    title: profile
      ? `${profile.name} - ${profile.title} | Portfolio`
      : "Ricky Chen - Software Engineer & AI Researcher | Portfolio",
    description:
      profile?.bio ||
      "Portfolio of Ricky Chen, Software Engineer & AI Researcher. Specializing in full-stack development, machine learning, and modern web technologies.",
    keywords:
      "Software Engineer, Full-Stack Developer, AI Researcher, Web Developer, TypeScript, React, Python, Machine Learning, Portfolio",
    type: "website",
  });

  // Structured Data
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

  const featuredProjects = profile.getFeaturedProjects(3);
  const currentExperience = profile.getCurrentExperience();
  const experiencePreview = profile.experiences.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Section className={styles.hero} aria-label="Hero section">
        <div className={styles.heroContent}>
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
          <p className={styles.heroMiniInfo} aria-hidden="true">
            {profile.projects.length} projects in portfolio
            {profile.stats.length > 0 &&
              ` · ${profile.stats.length} key metrics`}
            {" · Open to opportunities"}
          </p>
          <Typography variant="body" className={styles.heroBio} as="p">
            {profile.bio}
          </Typography>

          {profile.name && (
            <ScrollReveal direction="fade" delay={200}>
              <div className={styles.codeSnippet}>
                <CodeTyping
                  code={`const developer = new SoftwareEngineer('${profile.name}');`}
                  speed={60}
                />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal direction="up" delay={300}>
            <div className={styles.socialLinksWrapper}>
              <SocialLinks />
            </div>
          </ScrollReveal>

          <div
            className={styles.heroActions}
            role="group"
            aria-label="Call to action buttons"
          >
            <Link
              to="/projects"
              className={styles.heroCtaPrimary}
              aria-label="View all projects"
            >
              <Button variant="primary" size="lg">
                View Projects
              </Button>
            </Link>
            <Link to="/contact" aria-label="Get in touch">
              <Button variant="outline" size="lg">
                Get In Touch
              </Button>
            </Link>
            <ScrollReveal direction="scale" delay={400}>
              <DownloadResume />
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <Section
          label="Selected work"
          title="Featured Projects"
          subtitle="A selection of my recent work"
          info={`${profile.projects.length} projects in portfolio — click for details & live demos`}
          id="featured-projects"
          variant="alt"
          aria-labelledby="featured-projects-title"
        >
          <ScrollReveal direction="up" delay={0}>
            <div
              className={styles.projectsGrid}
              role="list"
              aria-label="Featured projects"
            >
              {featuredProjects.map((project) => (
                <div key={project.id} role="listitem">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            <div className={styles.viewAll}>
              <Link to="/projects" aria-label="View all projects">
                <Button variant="outline">View All Projects</Button>
              </Link>
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* Stats Section */}
      {profile.stats.length > 0 && (
        <Section
          label="In numbers"
          title="By The Numbers"
          subtitle="Key metrics and achievements"
          info="A quick snapshot of impact and experience"
          id="stats"
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

      {/* Testimonials Section */}
      {profile.testimonials.length > 0 && (
        <Section
          label="Kind words"
          title="Testimonials"
          subtitle="What others say about my work"
          info="From colleagues, clients, and collaborators"
          className={styles.testimonialsSection}
          id="testimonials"
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

      {/* Current Role */}
      {currentExperience && (
        <Section className={styles.currentRole} variant="alt">
          <ScrollReveal direction="up" delay={0}>
            <div className={styles.currentRoleContent}>
              <Typography variant="h3" weight="semibold">
                Currently working as
              </Typography>
              <Typography variant="h4" weight="semibold" color="primary">
                {currentExperience.position}
              </Typography>
              <Typography variant="body" color="secondary">
                at {currentExperience.company}
              </Typography>
              <Link
                to="/experience"
                className={styles.currentRoleCta}
                aria-label="View full experience and career timeline"
              >
                View full experience →
              </Link>
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* Experience preview – for HR */}
      {experiencePreview.length > 0 && (
        <Section
          label="Career"
          title="Experience"
          subtitle="Recent roles and impact"
          id="experience-preview"
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
                See more experience →
              </Link>
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* Explore: About, Experience, Contact */}
      <Section
        label="Discover more"
        title="Explore"
        subtitle="Skills, career timeline, and how to get in touch"
        id="explore"
        aria-labelledby="explore-title"
      >
        <ScrollReveal direction="up" delay={0}>
          <nav
            className={styles.exploreGrid}
            aria-label="Explore portfolio sections"
          >
            <Link
              to="/about"
              className={styles.exploreCard}
              aria-label="Go to About page – skills, education, certifications"
            >
              <span className={styles.exploreIcon} aria-hidden="true">
                👤
              </span>
              <Typography
                variant="h5"
                weight="semibold"
                className={styles.exploreTitle}
              >
                About
              </Typography>
              <Typography variant="small" color="secondary" as="p">
                Skills, education, certifications & philosophy
              </Typography>
              <span className={styles.exploreLink}>Learn more →</span>
            </Link>
            <Link
              to="/experience"
              className={styles.exploreCard}
              aria-label="Go to Experience page – work history and timeline"
            >
              <span className={styles.exploreIcon} aria-hidden="true">
                💼
              </span>
              <Typography
                variant="h5"
                weight="semibold"
                className={styles.exploreTitle}
              >
                Experience
              </Typography>
              <Typography variant="small" color="secondary" as="p">
                Career timeline and roles
              </Typography>
              <span className={styles.exploreLink}>View timeline →</span>
            </Link>
            <Link
              to="/contact"
              className={styles.exploreCard}
              aria-label="Go to Contact page – get in touch"
            >
              <span className={styles.exploreIcon} aria-hidden="true">
                ✉️
              </span>
              <Typography
                variant="h5"
                weight="semibold"
                className={styles.exploreTitle}
              >
                Contact
              </Typography>
              <Typography variant="small" color="secondary" as="p">
                Say hello, ask a question, or start a conversation
              </Typography>
              <span className={styles.exploreLink}>Get in touch →</span>
            </Link>
          </nav>
        </ScrollReveal>
      </Section>
    </>
  );
};
