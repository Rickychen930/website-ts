import React, { ReactNode } from "react";
import "../../assets/css/main-page.css";
import TableOfContents from "../../components/navigation/table-of-contents";
import FloatingCTA from "../../components/navigation/floating-cta";
import SkipLinks from "../../components/navigation/skip-links";
import Breadcrumbs from "../../components/navigation/breadcrumbs";
import GlobalSearch from "../../components/search/global-search";
import LazySection from "../../components/sections/lazy-section";
import {
  ErrorMessages,
  Messages,
  RetryConfig,
  ScrollConfig,
  SectionIds,
  SectionNames,
} from "../../constants";
import { MainPageController } from "../../controllers/main-page-controller";
import { ISectionConfig } from "../../models/section-model";
import { UserProfile } from "../../types/user";
import { ScrollObserverManager } from "../../utils/scroll-observer-manager";
import { updateSEOFromProfile } from "../../utils/seo";
import { SmoothScrollManager } from "../../utils/smooth-scroll-manager";
import { shouldDisplayData } from "../../utils/view-helpers";
import { trackSectionView } from "../../utils/analytics";
import { MainPageFooterComponent } from "../components/footer";
import Navbar from "../components/navbar";
import {
  BackToTopButton,
  ErrorComponent,
  LoadingComponent,
  toast,
} from "../components/ui";
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
import TestimonialsSection from "./sections/testimonials-section";
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
  private isMounted: boolean = false;
  private retryTimeouts: NodeJS.Timeout[] = [];

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
      ScrollConfig.OBSERVER_ROOT_MARGIN,
    );

    // Set up section view tracking
    this.scrollObserverManager.setSectionViewCallback(
      (sectionId, sectionName) => {
        trackSectionView(sectionId, sectionName);
      },
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
        dataKey: "name",
      },
      {
        id: SectionIds.SKILLS,
        title: SectionNames.TECHNICAL_SKILLS,
        component: TechnicalSkillsSection,
        dataKey: "technicalSkills",
      },
      {
        id: SectionIds.EXPERIENCE,
        title: SectionNames.WORK_EXPERIENCE,
        component: WorkExperienceSection,
        dataKey: "experiences",
      },
      {
        id: SectionIds.PROJECTS,
        title: SectionNames.PROJECTS,
        component: ProjectsSection,
        dataKey: "projects",
      },
      {
        id: SectionIds.ACADEMIC,
        title: SectionNames.ACADEMIC,
        component: AcademicSection,
        dataKey: "academics",
      },
      {
        id: SectionIds.CERTIFICATIONS,
        title: SectionNames.CERTIFICATIONS,
        component: CertificationSection,
        dataKey: "certifications",
      },
      {
        id: SectionIds.HONORS,
        title: SectionNames.HONORS,
        component: HonorsSection,
        dataKey: "honors",
      },
      {
        id: SectionIds.SOFT_SKILLS,
        title: SectionNames.SOFT_SKILLS,
        component: SoftSkillsSection,
        dataKey: "softSkills",
      },
      {
        id: SectionIds.LANGUAGES,
        title: SectionNames.LANGUAGES,
        component: LanguagesSection,
        dataKey: "languages",
      },
      {
        id: "testimonials",
        title: SectionNames.TESTIMONIALS,
        component: TestimonialsSection,
        dataKey: "testimonials", // Use testimonials as dataKey
        isVisible: () => true, // Always show testimonials section
      },
      {
        id: SectionIds.CONTACT,
        title: SectionNames.CONTACT,
        component: ContactSection,
        dataKey: "contacts",
      },
    ];
    this.controller.initializeSections(sections);
  }

  /**
   * Component lifecycle - Mount
   */
  async componentDidMount(): Promise<void> {
    this.isMounted = true;
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
    this.isMounted = false;
    this.smoothScrollManager.cleanup();
    this.scrollObserverManager.cleanup();
    // Cleanup all pending retry timeouts
    this.retryTimeouts.forEach((timeout) => clearTimeout(timeout));
    this.retryTimeouts = [];
  }

  /**
   * Initialize section observer for scroll animations
   * Enhanced with better error handling and edge cases
   */
  private initializeSectionObserver(): void {
    // Edge case: Check if component is still mounted
    if (!this.isMounted) return;

    // Edge case: Check browser environment
    if (typeof document === "undefined" || !this.state.profile) return;

    try {
      const visibleSections = this.controller.getVisibleSections(
        this.state.profile,
      );

      // Edge case: Handle empty sections
      if (!visibleSections || visibleSections.length === 0) {
        return;
      }

      const elements = visibleSections
        .map((config) => {
          try {
            return document.getElementById(config.id);
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              const { logWarn } = require("../../utils/logger");
              logWarn(
                `Failed to get element for section ${config.id}`,
                error,
                "MainPage",
              );
            }
            return null;
          }
        })
        .filter((el): el is HTMLElement => el !== null);

      // Edge case: Only initialize if elements found
      if (elements.length > 0) {
        this.scrollObserverManager.initialize(elements);
      }
    } catch (error) {
      // Edge case: Handle observer initialization errors
      if (process.env.NODE_ENV === "development") {
        const { logError } = require("../../utils/logger");
        logError("Error initializing section observer", error, "MainPage");
      }
    }
  }

  /**
   * Load user profile with retry logic
   * Enhanced with better error handling and edge cases
   */
  private async loadProfile(): Promise<void> {
    // Edge case: Prevent multiple simultaneous loads
    if (this.state.loading) {
      return;
    }

    this.setState({ loading: true, error: null });

    try {
      // Edge case: Add timeout to prevent hanging requests
      const profilePromise = this.controller.getUserProfile();
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), 30000); // 30 second timeout
      });

      const profile = await Promise.race([profilePromise, timeoutPromise]);

      // Edge case: Validate profile structure
      if (!profile) {
        throw new Error(ErrorMessages.LOAD_PROFILE_FAILED);
      }

      if (
        !profile.name ||
        typeof profile.name !== "string" ||
        !profile.name.trim()
      ) {
        throw new Error(ErrorMessages.INVALID_INPUT);
      }

      // Edge case: Validate required fields
      if (!profile.title || !profile.location || !profile.bio) {
        if (process.env.NODE_ENV === "development") {
          const { logWarn } = require("../../utils/logger");
          logWarn("Profile missing some fields", profile, "MainPage");
        }
      }

      // Update SEO metadata
      updateSEOFromProfile(profile);

      this.setState({
        profile,
        loading: false,
        error: null,
        retryCount: 0,
      });

      // Show success notification (only on first load, not retries)
      if (this.state.retryCount === 0) {
        toast.success("Profile loaded successfully", 3000);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : ErrorMessages.LOAD_PROFILE_FAILED;
      const newRetryCount = this.state.retryCount + 1;

      // Edge case: Handle timeout and network errors differently
      const isNetworkError =
        errorMessage.includes("timeout") ||
        errorMessage.includes("network") ||
        errorMessage.includes("fetch");

      if (newRetryCount < RetryConfig.MAX_RETRIES && isNetworkError) {
        // Exponential backoff for network errors
        const retryDelay =
          RetryConfig.RETRY_DELAY * Math.pow(2, newRetryCount - 1);
        const timeoutId = setTimeout(() => {
          if (this.state !== null && this.isMounted) {
            this.setState({ retryCount: newRetryCount });
            this.loadProfile();
          }
        }, retryDelay);
        this.retryTimeouts.push(timeoutId);
      } else if (newRetryCount < RetryConfig.MAX_RETRIES) {
        // Linear backoff for other errors
        const retryDelay = RetryConfig.RETRY_DELAY * newRetryCount;
        const timeoutId = setTimeout(() => {
          if (this.state !== null && this.isMounted) {
            this.setState({ retryCount: newRetryCount });
            this.loadProfile();
          }
        }, retryDelay);
        this.retryTimeouts.push(timeoutId);
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
   * Override renderBody to use MainPageState.loading instead of BasePageState.isLoading
   * This ensures the content appears after loading completes
   */
  protected renderBody(): ReactNode {
    return <div className="page-content">{this.renderContent()}</div>;
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
  private getSectionData(
    config: ISectionConfig,
    profile: UserProfile,
  ): unknown {
    const { dataKey, id } = config;

    const data = profile[dataKey];

    // Testimonials section - pass testimonials array directly (even if empty)
    // This allows testimonials section to render empty state if needed
    if (id === "testimonials") {
      return data !== undefined ? data : null;
    }

    // For sections with custom isVisible function, allow null data
    // The section component will handle rendering empty states
    if (config.isVisible) {
      return data !== undefined ? (dataKey === "name" ? profile : data) : null;
    }

    // For other sections, validate data before returning
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
  private readonly sectionPriorityMap = new Map<
    string,
    "high" | "normal" | "low"
  >([
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

    // Edge case: If no visible sections, show message instead of returning null
    if (visibleSections.length === 0) {
      if (process.env.NODE_ENV === "development") {
        const { logWarn } = require("../../utils/logger");
        logWarn(
          "No visible sections found",
          { profileKeys: Object.keys(profile) },
          "MainPage",
        );
      }
      return (
        <div className="contents-section">
          <div className="section-empty-state" role="status" aria-live="polite">
            <p>No content sections available.</p>
          </div>
        </div>
      );
    }

    // Filter out null sections and check if any remain
    const renderedSections = visibleSections
      .map((config) => {
        const sectionData = this.getSectionData(config, profile);

        // For sections with custom isVisible function, always render even if data is null
        // This allows sections like testimonials to render empty states
        if (!sectionData && !config.isVisible) {
          return null;
        }

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
      })
      .filter((section) => section !== null);

    // Edge case: If all sections were filtered out, show message
    if (renderedSections.length === 0) {
      if (process.env.NODE_ENV === "development") {
        const { logWarn } = require("../../utils/logger");
        logWarn(
          "All sections were filtered out during rendering",
          { visibleSectionsCount: visibleSections.length },
          "MainPage",
        );
      }
      return (
        <div className="contents-section">
          <div className="section-empty-state" role="status" aria-live="polite">
            <p>Content is being prepared. Please check back soon.</p>
          </div>
        </div>
      );
    }

    return <div className="contents-section">{renderedSections}</div>;
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
      return <div className="main-page">{this.renderLoading()}</div>;
    }

    if (error || !profile) {
      return <div className="main-page">{this.renderError()}</div>;
    }

    const visibleSections = this.controller.getVisibleSections(profile);

    // Generate breadcrumbs
    const breadcrumbs = [
      { name: "Home", url: "/" },
      { name: profile.name, url: window.location.href },
    ];

    return (
      <div className="main-page">
        <SkipLinks />
        <Breadcrumbs items={breadcrumbs} />
        <main id="main-content" role="main">
          {this.renderSections()}
        </main>
        <BackToTopButton />
        <FloatingCTA resumeUrl="/assets/document/RICKY_CV_8_AUG.pdf" />
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

  /**
   * Override render to use MainPageState.loading instead of BasePageState.isLoading
   * This ensures the content appears after loading completes
   */
  public render(): ReactNode {
    return (
      <div className="page-container">
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default MainPage;
