/**
 * MainPage - Main Portfolio Page
 * Orchestrates all sections using controllers
 * 
 * Principles:
 * - MVC: View layer
 * - SRP: Single responsibility for page orchestration
 * - DRY: Reuses controllers and sections
 * - OOP: Uses class-based components
 */

import React, { Component } from 'react';
import { UserService } from '../services/user-service';
import { UserProfile } from '../types/user';
import { ControllerFactory } from '../controllers';
import {
  AboutMeSection,
  AcademicSection,
  ProjectsSection,
  WorkExperienceSection,
  ContactSection,
  SkillsSection,
} from '../components/sections';
import { MainLayout } from '../components/layout/MainLayout';
import { ScrollToTop, ProfileSkeleton, ErrorDisplay, ScrollProgress } from '../components/core';

interface IMainPageState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * MainPage Component
 * Main portfolio page that loads user profile and displays all sections
 */
export class MainPage extends Component<{}, IMainPageState> {
  private userService: UserService;
  private controllers: ReturnType<typeof ControllerFactory.createAllSectionControllers>;

  constructor(props: {}) {
    super(props);
    this.userService = new UserService();
    this.controllers = ControllerFactory.createAllSectionControllers();
    this.state = {
      profile: null,
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount(): Promise<void> {
    await this.loadProfile();
  }

  private loadProfile = async (): Promise<void> => {
    try {
      this.setState({ error: null, isLoading: true });
      const profile = await this.userService.getUserProfile();
      this.setState({ profile, isLoading: false });
    } catch (error) {
      this.setState({
        error: error as Error,
        isLoading: false,
      });
    }
  };

  render(): React.ReactNode {
    const { profile, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <MainLayout>
          <div className="loading-container">
            <ProfileSkeleton />
          </div>
        </MainLayout>
      );
    }

    if (error) {
      return (
        <MainLayout>
          <main id="main-content" className="main-content" tabIndex={-1}>
            <ErrorDisplay
              title="Error Loading Portfolio"
              message={error.message}
              error={error}
              onRetry={this.loadProfile}
            />
          </main>
        </MainLayout>
      );
    }

    if (!profile) {
      return (
        <MainLayout>
          <div className="error-container">
            <p>No profile data available</p>
          </div>
        </MainLayout>
      );
    }

    return (
      <MainLayout profile={profile}>
        <main id="main-content" className="main-content" tabIndex={-1}>
          <AboutMeSection
            profile={profile}
            controller={this.controllers.aboutMe}
          />
          <AcademicSection
            profile={profile}
            controller={this.controllers.academic}
          />
          <WorkExperienceSection
            profile={profile}
            controller={this.controllers.workExperience}
          />
          <ProjectsSection
            profile={profile}
            controller={this.controllers.project}
          />
          <SkillsSection
            profile={profile}
            technicalSkillsController={this.controllers.technicalSkills}
            softSkillsController={this.controllers.softSkills}
          />
          <ContactSection
            profile={profile}
            controller={this.controllers.contact}
          />
        </main>
        <ScrollToTop />
        <ScrollProgress />
      </MainLayout>
    );
  }
}

export default MainPage;
