import React, { ReactNode } from "react";
import "../../assets/css/main-page.css";
import TableOfContents from "../../components/navigation/table-of-contents";
import GlobalSearch from "../../components/search/global-search";
import LazySection from "../../components/sections/lazy-section";
import {
  ErrorMessages,
  Messages,
  RetryConfig,
  ScrollConfig,
  SectionIds,
  SectionNames
} from "../../constants";
import { MainPageController } from "../../controllers/main-page-controller";
import { ISectionConfig } from "../../models/section-model";
import { UserProfile } from "../../types/user";
import { ScrollObserverManager } from "../../utils/scroll-observer-manager";
import { updateSEOFromProfile } from "../../utils/seo";
import { SmoothScrollManager } from "../../utils/smooth-scroll-manager";
import { shouldDisplayData } from "../../utils/view-helpers";
import { MainPageFooterComponent } from "../components/footer";
import Navbar from "../components/navbar";
import { BackToTopButton, ErrorComponent, LoadingComponent, toast } from "../components/ui";
import BasePage, { BasePageState } from "./base-page";
import AboutMeSection from "./sections/about-me-section";
import AcademicSection from "./sections/academic-section";
import CertificationSection from "./sections/certifications-section";
import ContactSection from "./sections/contact-section";
import HonorsSection from "./sections/honors-section";
import LanguagesSection from "./sections/languages-section";
import ProjectsSection from "./sections/projects-section";
import SoftSkillsSection from "./sections/soft-skills-section";
import TechnicalSkillsSection from "./sections/technical-skills-section";
import WorkExperienceSection from "./sections/work-experience-section";

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
    this.smoothScrollManager = new SmoothScrollManager(ScrollConfig.OFFSET);
    this.scrollObserverManager = new ScrollObserverManager(
      ScrollConfig.OBSERVER_THRESHOLD,
      ScrollConfig.OBSERVER_ROOT_MARGIN
    );
    this.initializeSections();
  }

  /**
   * Initialize section configurations
   * Follows DRY principle - Centralized configuration
   * UI Optimization: Reordered sections for better flow:
   * 1. About Me (introduction)
   * 2. Technical Skills (core competencies - most important for portfolio)
   * 3. Work Experience (professional background)
   * 4. Projects (portfolio showcase)
   * 5. Academic (educational background)
   * 6. Certifications (credentials)
   * 7. Honors (achievements)
   * 8. Soft Skills (interpersonal skills)
   * 9. Languages (language proficiency)
   * 10. Contact (contact information)
   */
  private initializeSections(): void {
    const sections: ISectionConfig[] = [
      { 
        id: SectionIds.ABOUT, 
        title: SectionNames.ABOUT, 
        component: AboutMeSection, 
        dataKey: "name" 
      },
      { 
        id: SectionIds.SKILLS, 
        title: SectionNames.TECHNICAL_SKILLS, 
        component: TechnicalSkillsSection, 
        dataKey: "technicalSkills" 
      },
      { 
        id: SectionIds.EXPERIENCE, 
        title: SectionNames.WORK_EXPERIENCE, 
        component: WorkExperienceSection, 
        dataKey: "experiences" 
      },
      { 
        id: SectionIds.PROJECTS, 
        title: SectionNames.PROJECTS, 
        component: ProjectsSection, 
        dataKey: "projects" 
      },
      { 
        id: SectionIds.ACADEMIC, 
        title: SectionNames.ACADEMIC, 
        component: AcademicSection, 
        dataKey: "academics" 
      },
      { 
        id: SectionIds.CERTIFICATIONS, 
        title: SectionNames.CERTIFICATIONS, 
        component: CertificationSection, 
        dataKey: "certifications" 
      },
      { 
        id: SectionIds.HONORS, 
        title: SectionNames.HONORS, 
        component: HonorsSection, 
        dataKey: "honors" 
      },
      { 
        id: SectionIds.SOFT_SKILLS, 
        title: SectionNames.SOFT_SKILLS, 
        component: SoftSkillsSection, 
        dataKey: "softSkills" 
      },
      { 
        id: SectionIds.LANGUAGES, 
        title: SectionNames.LANGUAGES, 
        component: LanguagesSection, 
        dataKey: "languages" 
      },
      { 
        id: SectionIds.CONTACT, 
        title: SectionNames.CONTACT, 
        component: ContactSection, 
        dataKey: "contacts" 
      },
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
      }, ScrollConfig.INITIALIZATION_DELAY);
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
        throw new Error(ErrorMessages.LOAD_PROFILE_FAILED);
      }

      if (!profile.name?.trim()) {
        throw new Error(ErrorMessages.INVALID_INPUT);
      }

      // Update SEO metadata
      updateSEOFromProfile(profile);

      this.setState({ 
        profile, 
        loading: false, 
        error: null,
        retryCount: 0,
      });

      // Show success notification
      toast.success("Profile loaded successfully", 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ErrorMessages.LOAD_PROFILE_FAILED;
      const newRetryCount = this.state.retryCount + 1;

      if (newRetryCount < RetryConfig.MAX_RETRIES) {
        const retryDelay = RetryConfig.RETRY_DELAY * newRetryCount;
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
        
        // Show error notification
        toast.error(errorMessage, 5000);
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
        items={this.controller.getNavbarItemsWithDropdowns()}
        brandLogo="/logo.png"
        brandText=""
        useDropdowns={true}
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
        message={Messages.LOADING} 
        useSkeleton={true}
        skeletonVariant="card"
      />
    );
  }

  /**
   * Render error state using ErrorComponent
   * Component-Based: Delegates to specialized component
   */
  protected renderError(): ReactNode {
    const { error, retryCount } = this.state;
    
    return (
      <ErrorComponent
        error={error}
        retryCount={retryCount}
        maxRetries={RetryConfig.MAX_RETRIES}
        onRetry={this.handleRetry}
      />
    );
  }

  /**
   * Get section data from profile
   * Performance: Uses utility helper for validation
   */
  private getSectionData(config: ISectionConfig, profile: UserProfile): unknown {
    const { dataKey } = config;
    const data = profile[dataKey];
    
    if (!shouldDisplayData(data)) {
      return null;
    }
    
    return dataKey === "name" ? profile : data;
  }


  /**
   * Get section priority untuk lazy loading
   * High priority sections (About, Skills, Contact) load immediately
   * Performance: Memoized priority lookup
   * UI Optimization: Technical Skills is high priority (core content)
   */
  private readonly sectionPriorityMap = new Map<string, "high" | "normal" | "low">([
    ["about", "high"],
    ["skills", "high"], // Technical Skills is core content
    ["contact", "high"],
    ["languages", "low"],
    ["soft-skills", "low"],
    ["honors", "low"], // Honors can load later
  ]);

  private getSectionPriority(id: string): "high" | "normal" | "low" {
    return this.sectionPriorityMap.get(id) || "normal";
  }

  /**
   * Render all sections dengan lazy loading
   * Performance optimized dengan progressive rendering
   */
  private renderSections(): ReactNode {
    const { profile } = this.state;
    if (!profile) return null;

    const visibleSections = this.controller.getVisibleSections(profile);
    if (visibleSections.length === 0) return null;

    return (
      <div className="contents-section">
        {visibleSections.map((config) => {
          const sectionData = this.getSectionData(config, profile);
          
          if (!sectionData) return null;

          return (
            <LazySection
              key={config.id}
              config={config}
              profile={profile}
              priority={this.getSectionPriority(config.id)}
              onVisible={(id) => {
                // Optional: Track section visibility (development only)
                // Logging handled by LazySection component if needed
              }}
            />
          );
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

    const visibleSections = this.controller.getVisibleSections(profile);

    return (
      <div className="main-page">
        {this.renderSections()}
        <BackToTopButton />
        <GlobalSearch 
          profile={profile}
          showTrigger={false}
          onResultClick={(result) => {
            // Scroll handled in GlobalSearch component
            toast.info(`Navigating to ${result.section}`, 2000);
          }}
        />
        <TableOfContents
          sections={visibleSections}
          onSectionClick={(sectionId) => {
            // Scroll handled in TableOfContents component
          }}
        />
      </div>
    );
  }
}

export default MainPage;
