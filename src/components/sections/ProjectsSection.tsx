/**
 * ProjectsSection - View Component (MVC Pattern)
 * Displays Projects section
 */

import React from 'react';
import { UserProfile } from '../../types/user';
import { ProjectController } from '../../controllers/project-controller';
import { IProject } from '../../models/project-model';
import { SectionIds, SectionNames } from '../../constants/strings';
import { IntersectionObserver } from '../core/IntersectionObserver';
import { EmptyState } from '../core/EmptyState';
import { GlowingText, AnimatedSection } from '../core';
import { motion } from 'framer-motion';
import { ProjectSearch } from '../core/ProjectSearch';

export interface IProjectsSectionProps {
  profile: UserProfile;
  controller: ProjectController;
}

interface IProjectsSectionState {
  filteredProjects: IProject[];
}

/**
 * ProjectsSection Component
 */
export class ProjectsSection extends React.Component<IProjectsSectionProps, IProjectsSectionState> {
  private controller: ProjectController;

  constructor(props: IProjectsSectionProps) {
    super(props);
    this.controller = props.controller || new ProjectController();
    this.state = {
      filteredProjects: [],
    };
  }

  render(): React.ReactNode {
    const { profile } = this.props;
    
    if (!this.controller.shouldDisplay(profile)) {
      return null;
    }

    const projects = this.controller.getProjectData(profile);
    if (!projects || projects.length === 0) {
      return (
        <section id={SectionIds.PROJECTS} className="section section--projects">
          <div className="section__container">
            <IntersectionObserver animation="fadeIn" once>
              <h2 className="section__title">{SectionNames.PROJECTS}</h2>
            </IntersectionObserver>
            <EmptyState
              icon="💻"
              title="No Projects Available"
              message="Projects will be displayed here when available."
            />
          </div>
        </section>
      );
    }

    const sortedProjects = this.controller.getAllProjects(projects);
    const displayProjects = this.state.filteredProjects.length > 0 
      ? this.state.filteredProjects 
      : sortedProjects;

    return (
      <section id={SectionIds.PROJECTS} className="section section--projects">
        <div className="section__container">
          <IntersectionObserver animation="fadeIn" once>
            <h2 className="section__title">
              <GlowingText intensity="medium">{SectionNames.PROJECTS}</GlowingText>
            </h2>
          </IntersectionObserver>
          
          {projects.length > 3 && (
            <AnimatedSection animation="slideDown" delay={0.1}>
              <ProjectSearch
                projects={sortedProjects}
                onFilterChange={(filtered) => this.setState({ filteredProjects: filtered })}
                placeholder="Search projects by name, description, or technology..."
              />
            </AnimatedSection>
          )}

          <div className="projects__content">
            {displayProjects.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No Projects Found"
                message="Try adjusting your search or filter criteria."
              />
            ) : (
              <div className="projects__grid">
                {displayProjects.map((project, index) => (
                  <AnimatedSection 
                    key={project.key} 
                    animation="scale" 
                    delay={index * 0.1}
                    className="project-card-wrapper"
                  >
                    {this.renderProject(project)}
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  private renderProject(project: IProject): React.ReactNode {
    return (
      <motion.div
        className="project-card project-card--enhanced"
        whileHover={{ 
          scale: 1.03,
          y: -8,
          transition: { duration: 0.3 }
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="project-card__header">
          <motion.span 
            className="project-card__icon"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {project.icon || '💻'}
          </motion.span>
          <div className="project-card__meta">
            <h3 className="project-card__name">
              <GlowingText intensity="low">{project.name}</GlowingText>
            </h3>
            <span className="project-card__date">{this.controller.formatDate(project.date)}</span>
          </div>
        </div>
        <p className="project-card__description">{project.description}</p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-card__technologies">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="tech-tag tech-tag--glow"
                whileHover={{ 
                  scale: 1.15,
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        )}
        {project.links && project.links.length > 0 && (
          <div className="project-card__links">
            {project.links.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link project-card__link--glow"
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label || link.type}
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    );
  }
}
