/**
 * Home Page - Main landing page
 * Version 2: Uses ProfileContext instead of local state
 */

import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { ProjectCard } from "@/views/components/domain/ProjectCard";
import { TestimonialCard } from "@/views/components/domain/TestimonialCard";
import { StatItem } from "@/views/components/domain/StatItem";
import { CodeTyping } from "@/components/CodeTyping";
import { SocialLinks } from "@/components/SocialLinks";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DownloadResume } from "@/components/DownloadResume";
import styles from "./Home.module.css";

export const Home: React.FC = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return <Loading fullScreen message="Loading profile..." />;
  }

  if (error || !profile) {
    return (
      <div className={styles.error} role="alert" aria-live="assertive">
        <Typography variant="h3">Failed to load profile</Typography>
        <Typography variant="body" color="secondary">
          {error?.message || "Please try again later"}
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="primary"
          className={styles.retryButton}
          aria-label="Retry loading profile"
        >
          Retry
        </Button>
      </div>
    );
  }

  const featuredProjects = profile.getFeaturedProjects(3);
  const currentExperience = profile.getCurrentExperience();

  return (
    <>
      {/* Hero Section */}
      <Section className={styles.hero} aria-label="Hero section">
        <div className={styles.heroContent}>
          <Typography
            variant="h1"
            weight="bold"
            className={styles.heroTitle}
            as="h1"
          >
            {profile.name}
          </Typography>
          <Typography
            variant="h3"
            weight="medium"
            color="secondary"
            className={styles.heroSubtitle}
            as="p"
          >
            {profile.title}
          </Typography>
          <div className={styles.heroLocation} aria-label="Location">
            <span>📍</span>
            <Typography variant="body" color="secondary" as="span">
              {profile.location}
            </Typography>
          </div>
          <Typography variant="body" className={styles.heroBio} as="p">
            {profile.bio}
          </Typography>

          <ScrollReveal direction="fade" delay={200}>
            <div className={styles.codeSnippet}>
              <CodeTyping
                code="const developer = new SoftwareEngineer('Ricky Chen');"
                speed={60}
              />
            </div>
          </ScrollReveal>

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
            <Link to="/projects" aria-label="View all projects">
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
          title="Featured Projects"
          subtitle="A selection of my recent work"
          id="featured-projects"
          aria-labelledby="featured-projects-title"
        >
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
        </Section>
      )}

      {/* Stats Section */}
      {profile.stats.length > 0 && (
        <Section
          title="By The Numbers"
          subtitle="Key metrics and achievements"
          id="stats"
          aria-labelledby="stats-title"
        >
          <div className={styles.statsGrid} role="list" aria-label="Statistics">
            {profile.stats.map((stat, index) => (
              <div key={stat.id} role="listitem">
                <StatItem stat={stat} index={index} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Testimonials Section */}
      {profile.testimonials.length > 0 && (
        <Section
          title="Testimonials"
          subtitle="What others say about my work"
          className={styles.testimonialsSection}
          id="testimonials"
          aria-labelledby="testimonials-title"
        >
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
        </Section>
      )}

      {/* Current Role */}
      {currentExperience && (
        <Section className={styles.currentRole}>
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
          </div>
        </Section>
      )}
    </>
  );
};
