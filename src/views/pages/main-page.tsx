import React, { ReactNode } from "react";
import Navbar from "../components/navbar";
import BasePage, { BasePageState } from "./base-page";
import AboutMeSection from "./sections/about-me-section";
import AcademicSection from "./sections/academic-section";
import HonorsSection from "./sections/honors-section";
import CertificationSection from "./sections/certifications-section";
import TechnicalSkillsSection from "./sections/technical-skills-section";
import WorkExperienceSection from "./sections/work-experience-section";
import ProjectsSection from "./sections/projects-section";
import SoftSkillsSection from "./sections/soft-skills-section";
import LanguagesSection from "./sections/languages-section";
import ContactSection from "./sections/contact-section";
import "../../assets/css/main-page.css";
import { MainPageController } from "../../controllers/main-page-controller";
import { UserProfile } from "../../types/user";
import { ISectionConfig } from "../../models/section-model";
import { RETRY_CONFIG, SCROLL_CONFIG } from "../../config/main-page-config";
import { SmoothScrollManager } from "../../utils/smooth-scroll-manager";
import { ScrollObserverManager } from "../../utils/scroll-observer-manager";
import { LoadingComponent, ErrorComponent, BackToTopButton } from "../components/ui";
import { MainPageFooterComponent } from "../components/footer";

/**
 * MainPageState - Extended state interface
 */
type MainPageState = BasePageState & {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  retryCount: number;
};

/**
 * MainPage - View Layer (MVC Pattern)
 * Refactored to Component-Based Architecture
 * 
 * Principles Applied:
 * - OOP: Class-based component with proper encapsulation
 * - SOLID:
 *   - SRP: Delegates responsibilities to specialized components
 *   - OCP: Extensible via composition
 *   - DIP: Depends on abstractions (components, utilities)
 * - DRY: Uses reusable components and centralized configs
 * - KISS: Simple, clear structure
 * - Component-Based: Composed of smaller, focused components
 */
class MainPage extends BasePage<{}, MainPageState> {
  private readonly controller: MainPageController;
  private readonly smoothScrollManager: SmoothScrollManager;
  private readonly scrollObserverManager: ScrollObserverManager;

  constructor(props: {}) {
    super(props);
    this.state = {
      ...this.state,
      profile: null,
      loading: true,
      error: null,
      retryCount: 0,
    };
    this.controller = new MainPageController();
    this.smoothScrollManager = new SmoothScrollManager(SCROLL_CONFIG.OFFSET);
    this.scrollObserverManager = new ScrollObserverManager(
      SCROLL_CONFIG.OBSERVER_THRESHOLD,
      SCROLL_CONFIG.OBSERVER_ROOT_MARGIN
    );
    this.initializeSections();
  }

  /**
   * Initialize section configurations
   * Follows DRY principle - Centralized configuration
   */
  private initializeSections(): void {
    const sections: ISectionConfig[] = [
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
    this.controller.initializeSections(sections);
  }

  /**
   * Component lifecycle - Mount
   */
  async componentDidMount(): Promise<void> {
    this.smoothScrollManager.setup();
    await this.loadProfile();
  }

  /**
   * Component lifecycle - Update
   */
  componentDidUpdate(prevProps: {}, prevState: MainPageState): void {
    if (prevState.loading && !this.state.loading && this.state.profile) {
      setTimeout(() => {
        this.initializeSectionObserver();
      }, SCROLL_CONFIG.INITIALIZATION_DELAY);
    }
  }

  /**
   * Component lifecycle - Unmount
   */
  componentWillUnmount(): void {
    this.smoothScrollManager.cleanup();
    this.scrollObserverManager.cleanup();
  }

  /**
   * Initialize section observer for scroll animations
   */
  private initializeSectionObserver(): void {
    if (typeof document === "undefined" || !this.state.profile) return;

    const visibleSections = this.controller.getVisibleSections(this.state.profile);
    const elements = visibleSections
      .map(config => document.getElementById(config.id))
      .filter((el): el is HTMLElement => el !== null);
    
    this.scrollObserverManager.initialize(elements);
  }

  /**
   * Load user profile with retry logic
   */
  private async loadProfile(): Promise<void> {
    this.setState({ loading: true, error: null });

    try {
      const profile = await this.controller.getUserProfile();

      if (!profile) {
        throw new Error("Failed to fetch profile. Please check if REACT_APP_API_URL is configured and the backend server is running.");
      }

      if (!profile.name?.trim()) {
        throw new Error("Invalid profile data: profile name is missing");
      }

      this.setState({ 
        profile, 
        loading: false, 
        error: null,
        retryCount: 0,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load profile";
      const newRetryCount = this.state.retryCount + 1;

      if (newRetryCount < RETRY_CONFIG.MAX_RETRIES) {
        const retryDelay = RETRY_CONFIG.RETRY_DELAY * newRetryCount;
        setTimeout(() => {
          if (this.state !== null) {
            this.setState({ retryCount: newRetryCount });
            this.loadProfile();
          }
        }, retryDelay);
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

  /**
   * Render header (navbar)
   */
  protected renderHeader(): ReactNode {
    return (
      <Navbar 
        items={this.controller.getNavbarItems()}
        brandLogo="/logo.png"
        brandText=""
      />
    );
  }

  /**
   * Render loading state using LoadingComponent with skeleton
   * Component-Based: Delegates to specialized component
   */
  protected renderLoading(): ReactNode {
    return (
      <LoadingComponent 
        message="Loading profile..." 
        useSkeleton={true}
        skeletonVariant="card"
      />
    );
  }

  /**
   * Render error state using ErrorComponent
   * Component-Based: Delegates to specialized component
   */
  private renderError(): ReactNode {
    const { error, retryCount } = this.state;
    
    return (
      <ErrorComponent
        error={error}
        retryCount={retryCount}
        maxRetries={RETRY_CONFIG.MAX_RETRIES}
        onRetry={this.handleRetry}
      />
    );
  }

  /**
   * Get section data from profile
   */
  private getSectionData(config: ISectionConfig, profile: UserProfile): unknown {
    const { dataKey } = config;
    const data = profile[dataKey];
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null;
    }
    return dataKey === "name" ? profile : data;
  }

  /**
   * Render section header
   */
  private renderSectionHeader(config: ISectionConfig): ReactNode {
    const { id, title } = config;
    if (!title) return null;

    return (
      <header className="section-header">
        <h2 className="section-title" id={`${id}-title`}>
          {title}
        </h2>
        <div className="section-title-underline" aria-hidden="true"></div>
      </header>
    );
  }

  /**
   * Render all sections directly
   * Component-Based: Renders sections without wrapper component
   */
  private renderSections(): ReactNode {
    const { profile } = this.state;
    if (!profile) return null;

    const visibleSections = this.controller.getVisibleSections(profile);
    if (visibleSections.length === 0) return null;

    return (
      <div className="contents-section">
        {visibleSections.map((config) => {
          const { component: SectionComponent, id } = config;
          const sectionData = this.getSectionData(config, profile);

          if (!SectionComponent || !sectionData) return null;

          try {
            return (
              <section
                key={id}
                id={id}
                className="section-block"
                aria-label={config.title || "Content section"}
              >
                {this.renderSectionHeader(config)}
                <div className="section-content" role="region" aria-labelledby={`${id}-title`}>
                  <SectionComponent data={sectionData} />
                </div>
              </section>
            );
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.error(`Error rendering section ${id}:`, error);
            }
            return null;
          }
        })}
      </div>
    );
  }

  /**
   * Render footer using MainPageFooterComponent
   * Component-Based: Delegates to specialized component
   */
  protected renderFooter(): ReactNode {
    const { profile } = this.state;
    return <MainPageFooterComponent profile={profile} />;
  }

  /**
   * Render main content
   * Component-Based: Composes smaller components
   */
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
        <BackToTopButton />
      </div>
    );
  }
}

export default MainPage;
