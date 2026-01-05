// pages/main-page.tsx
import React, { ReactNode } from "react";
import Navbar from "../components/navbar-component";
import BasePage, { BasePageState } from "./base-page";
import AboutMeSection from "./sections/about-me-section";
import AcademicSection from "./sections/academic-section";
import HonorsSection from "./sections/honour-section";
import CertificationSection from "./sections/certifications-section";
import TechnicalSkillsSection from "./sections/technical-skills-section";
import WorkExperienceSection from "./sections/work-experience-section";
import ProjectsSection from "./sections/projects-section";
import SoftSkillsSection from "./sections/soft-skills-section";
import LanguagesSection from "./sections/languages-section";
import ContactSection from "./sections/contact-section";
import "../../assets/css/main-page.css";
import MainController from "../../controllers/main-controller";
import { UserProfile } from "../../types/user";

type MainPageState = BasePageState & {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  retryCount: number;
};

interface SectionConfig {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  dataKey: keyof UserProfile;
}

class MainPage extends BasePage<{}, MainPageState> {
  private controller: MainController;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 2000;

  private readonly SECTION_CONFIGS: SectionConfig[] = [
    { id: "about", title: "About Me", component: AboutMeSection, dataKey: "name" },
    { id: "academic", title: "Academic", component: AcademicSection, dataKey: "academics" },
    { id: "honors", title: "Honors", component: HonorsSection, dataKey: "honors" },
    { id: "certifications", title: "Certifications", component: CertificationSection, dataKey: "certifications" },
    { id: "skills", title: "Technical Skills", component: TechnicalSkillsSection, dataKey: "technicalSkills" },
    { id: "experience", title: "Work Experience", component: WorkExperienceSection, dataKey: "experiences" },
    { id: "projects", title: "Projects", component: ProjectsSection, dataKey: "projects" },
    { id: "soft-skills", title: "Soft Skills", component: SoftSkillsSection, dataKey: "softSkills" },
    { id: "languages", title: "Languages", component: LanguagesSection, dataKey: "languages" },
    { id: "contact", title: "Contact", component: ContactSection, dataKey: "contacts" },
  ];

  constructor(props: {}) {
    super(props);
    this.state = {
      ...this.state,
      profile: null,
      loading: true,
      error: null,
      retryCount: 0,
    };
    this.controller = new MainController();
  }

  async componentDidMount(): Promise<void> {
    await this.loadProfile();
  }

  /**
   * Load user profile with retry logic
   */
  private async loadProfile(): Promise<void> {
    this.setState({ loading: true, error: null });

    try {
      const profile = await this.controller.getUserProfile();

      if (!profile) {
        throw new Error("Failed to load profile data");
      }

      this.setState({ 
        profile, 
        loading: false, 
        error: null,
        retryCount: 0,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      const newRetryCount = this.state.retryCount + 1;

      if (newRetryCount < this.MAX_RETRIES) {
        // Retry after delay
        setTimeout(() => {
          this.setState({ retryCount: newRetryCount });
          this.loadProfile();
        }, this.RETRY_DELAY);
      } else {
        this.setState({ 
          loading: false, 
          error: errorMessage,
          retryCount: 0,
        });
      }
    }
  }

  /**
   * Handle retry button click
   */
  private handleRetry = (): void => {
    this.setState({ retryCount: 0 });
    this.loadProfile();
  };

  protected renderHeader(): ReactNode {
    return <Navbar items={this.controller.getNavbarItems()} />;
  }

  /**
   * Render loading state
   */
  protected renderLoading(): ReactNode {
    return (
      <div className="main-page-loading">
        <div className="loading-spinner" aria-label="Loading">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Loading profile...</p>
      </div>
    );
  }

  /**
   * Render error state
   */
  private renderError(): ReactNode {
    const { error, retryCount } = this.state;
    
    return (
      <div className="main-page-error">
        <div className="error-content">
          <div className="error-icon" aria-hidden="true">⚠️</div>
          <h2 className="error-title">Unable to Load Profile</h2>
          <p className="error-message">{error || "An unexpected error occurred"}</p>
          {retryCount > 0 && retryCount < this.MAX_RETRIES && (
            <p className="error-retry-info">Retrying... ({retryCount}/{this.MAX_RETRIES})</p>
          )}
          <button 
            className="error-retry-button" 
            onClick={this.handleRetry}
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /**
   * Render a single section
   */
  private renderSection(config: SectionConfig, profile: UserProfile, index: number): ReactNode {
    const { id, title, component: SectionComponent, dataKey } = config;
    const data = profile[dataKey];

    // Skip section if data is empty or undefined
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null;
    }

    // Special handling for AboutMeSection which needs the entire profile
    const sectionData = dataKey === "name" ? profile : data;

    return (
      <section 
        key={id} 
        id={id}
        className="section-block"
        aria-label={title || "Content section"}
      >
        {title && (
          <header className="section-header">
            <h2 className="section-title" id={id ? `${id}-title` : undefined}>
              {title}
            </h2>
            <div className="section-title-underline" aria-hidden="true"></div>
          </header>
        )}
        <div className="section-content" role="region" aria-labelledby={id ? `${id}-title` : undefined}>
          <SectionComponent data={sectionData} />
        </div>
      </section>
    );
  }

  /**
   * Render all sections
   * Enhanced with index for staggered animations
   */
  private renderSections(): ReactNode {
    const { profile } = this.state;

    if (!profile) {
      return null;
    }

    return (
      <div className="contents-section">
        {this.SECTION_CONFIGS.map((config, index) => 
          this.renderSection(config, profile, index)
        )}
      </div>
    );
  }

  /**
   * Render footer
   */
  protected renderFooter(): ReactNode {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="footer" role="contentinfo">
        <div className="footer-content">
          <p className="footer-text">© {currentYear} Ricky Inc. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  protected renderContent(): ReactNode {
    const { loading, error, profile } = this.state;

    if (loading) {
      return (
        <div className="main-page">
          {this.renderLoading()}
        </div>
      );
    }

    if (error || !profile) {
      return (
        <div className="main-page">
          {this.renderError()}
        </div>
      );
    }

    return (
      <div className="main-page">
        {this.renderSections()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default MainPage;
