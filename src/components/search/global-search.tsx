/**
 * Global Search Component
 * Professional search functionality across all sections
 */

import React, { Component, ReactNode, createRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { UserProfile } from "../../types/user";
import { SectionIds, SectionNames } from "../../constants";
import "../../assets/css/global-search.css";

export interface SearchResult {
  section: string;
  sectionId: string;
  title: string;
  content: string;
  type:
    | "section"
    | "project"
    | "skill"
    | "experience"
    | "certification"
    | "academic";
  url?: string;
}

interface GlobalSearchProps {
  profile: UserProfile | null;
  onResultClick?: (result: SearchResult) => void;
  onClose?: () => void;
  showTrigger?: boolean;
  triggerButton?: ReactNode;
}

interface GlobalSearchState {
  query: string;
  results: SearchResult[];
  isOpen: boolean;
  selectedIndex: number;
  isSearching: boolean;
}

export class GlobalSearch extends Component<
  GlobalSearchProps,
  GlobalSearchState
> {
  private inputRef = createRef<HTMLInputElement>();
  private searchTimeout: NodeJS.Timeout | null = null;

  constructor(props: GlobalSearchProps) {
    super(props);
    this.state = {
      query: "",
      results: [],
      isOpen: false,
      selectedIndex: -1,
      isSearching: false,
    };
  }

  componentDidMount(): void {
    // Listen for keyboard shortcut (Ctrl+K or Cmd+K)
    document.addEventListener("keydown", this.handleKeyboardShortcut);
    // Listen for custom search trigger event
    document.addEventListener("openGlobalSearch", this.openSearch);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.handleKeyboardShortcut);
    document.removeEventListener("openGlobalSearch", this.openSearch);
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  private handleKeyboardShortcut = (e: KeyboardEvent): void => {
    // Ctrl+K or Cmd+K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      this.openSearch();
    }

    // Escape to close
    if (e.key === "Escape" && this.state.isOpen) {
      this.closeSearch();
    }
  };

  private openSearch = (): void => {
    this.setState({ isOpen: true }, () => {
      // Focus input after opening
      setTimeout(() => {
        this.inputRef.current?.focus();
      }, 100);
    });
  };

  private closeSearch = (): void => {
    this.setState({ isOpen: false, query: "", results: [], selectedIndex: -1 });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  private handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const query = e.target.value;
    this.setState({ query });

    // Debounce search
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (query.trim().length === 0) {
      this.setState({ results: [], isSearching: false });
      return;
    }

    this.setState({ isSearching: true });

    this.searchTimeout = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  };

  private performSearch = (query: string): void => {
    const { profile } = this.props;
    if (!profile) {
      this.setState({ results: [], isSearching: false });
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search in profile name and title
    if (
      profile.name?.toLowerCase().includes(lowerQuery) ||
      profile.title?.toLowerCase().includes(lowerQuery) ||
      profile.bio?.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        section: SectionNames.ABOUT,
        sectionId: SectionIds.ABOUT,
        title: profile.name || "Profile",
        content: profile.bio || profile.title || "",
        type: "section",
      });
    }

    // Search in projects
    if (profile.projects) {
      profile.projects.forEach((project) => {
        const name = (project as any).name || "";
        const description = (project as any).description || "";
        if (
          name.toLowerCase().includes(lowerQuery) ||
          description.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            section: SectionNames.PROJECTS,
            sectionId: SectionIds.PROJECTS,
            title: name,
            content: description,
            type: "project",
            url: (project as any).link,
          });
        }
      });
    }

    // Search in technical skills
    if (profile.technicalSkills) {
      profile.technicalSkills.forEach((skillCategory) => {
        const category = (skillCategory as any).category || "";
        const items = (skillCategory as any).items || [];

        items.forEach((item: string) => {
          if (
            item.toLowerCase().includes(lowerQuery) ||
            category.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              section: SectionNames.TECHNICAL_SKILLS,
              sectionId: SectionIds.SKILLS,
              title: item,
              content: `Category: ${category}`,
              type: "skill",
            });
          }
        });
      });
    }

    // Search in work experience
    if (profile.experiences) {
      profile.experiences.forEach((exp) => {
        const company = (exp as any).company || "";
        const position = (exp as any).position || "";
        const description = (exp as any).description || "";

        if (
          company.toLowerCase().includes(lowerQuery) ||
          position.toLowerCase().includes(lowerQuery) ||
          description.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            section: SectionNames.WORK_EXPERIENCE,
            sectionId: SectionIds.EXPERIENCE,
            title: `${position} at ${company}`,
            content: description,
            type: "experience",
          });
        }
      });
    }

    // Search in certifications
    if (profile.certifications) {
      profile.certifications.forEach((cert) => {
        const name = (cert as any).name || "";
        const issuer = (cert as any).issuer || "";

        if (
          name.toLowerCase().includes(lowerQuery) ||
          issuer.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            section: SectionNames.CERTIFICATIONS,
            sectionId: SectionIds.CERTIFICATIONS,
            title: name,
            content: `Issued by: ${issuer}`,
            type: "certification",
          });
        }
      });
    }

    // Search in academics
    if (profile.academics) {
      profile.academics.forEach((academic) => {
        const degree = (academic as any).degree || "";
        const institution = (academic as any).institution || "";

        if (
          degree.toLowerCase().includes(lowerQuery) ||
          institution.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            section: SectionNames.ACADEMIC,
            sectionId: SectionIds.ACADEMIC,
            title: degree,
            content: institution,
            type: "academic",
          });
        }
      });
    }

    this.setState({ results, isSearching: false });
  };

  private handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>): void => {
    const { results, selectedIndex } = this.state;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.setState({
        selectedIndex:
          selectedIndex < results.length - 1
            ? selectedIndex + 1
            : selectedIndex,
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.setState({
        selectedIndex: selectedIndex > 0 ? selectedIndex - 1 : -1,
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        this.handleResultClick(results[selectedIndex]);
      } else if (results.length > 0) {
        this.handleResultClick(results[0]);
      }
    }
  };

  private handleResultClick = (result: SearchResult): void => {
    // Scroll to section with consistent offset
    const element = document.getElementById(result.sectionId);
    if (element) {
      const offset = 80; // Consistent with SmoothScrollManager
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    if (this.props.onResultClick) {
      this.props.onResultClick(result);
    }

    this.closeSearch();
  };

  private renderResult = (result: SearchResult, index: number): ReactNode => {
    const { selectedIndex } = this.state;
    const isSelected = index === selectedIndex;

    return (
      <div
        key={`${result.type}-${index}`}
        className={`search-result ${isSelected ? "selected" : ""}`}
        onClick={() => this.handleResultClick(result)}
        onMouseEnter={() => this.setState({ selectedIndex: index })}
      >
        <div className="search-result-icon" aria-hidden="true">
          {this.getTypeIcon(result.type)}
        </div>
        <div className="search-result-content">
          <div className="search-result-title">{result.title}</div>
          <div className="search-result-section">{result.section}</div>
          {result.content && (
            <div className="search-result-preview">
              {result.content.substring(0, 100)}...
            </div>
          )}
        </div>
      </div>
    );
  };

  private getTypeIcon = (type: SearchResult["type"]): string => {
    switch (type) {
      case "project":
        return "🚀";
      case "skill":
        return "💻";
      case "experience":
        return "💼";
      case "certification":
        return "🏆";
      case "academic":
        return "🎓";
      default:
        return "📄";
    }
  };

  render(): ReactNode {
    const { isOpen, query, results, isSearching } = this.state;
    const { showTrigger = true, triggerButton } = this.props;

    if (!isOpen) {
      if (triggerButton) {
        return (
          <div onClick={this.openSearch} style={{ display: "inline-block" }}>
            {triggerButton}
          </div>
        );
      }

      if (!showTrigger) {
        return null;
      }

      return (
        <button
          className="global-search-trigger"
          onClick={this.openSearch}
          aria-label="Open search (Ctrl+K)"
          title="Search (Ctrl+K or Cmd+K)"
        >
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <span className="search-placeholder">Search...</span>
          <span className="search-shortcut">Ctrl+K</span>
        </button>
      );
    }

    return (
      <div className="global-search-overlay" onClick={this.closeSearch}>
        <div
          className="global-search-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="global-search-header">
            <div className="search-input-wrapper">
              <span className="search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                ref={this.inputRef}
                type="text"
                className="search-input"
                placeholder="Search projects, skills, experience..."
                value={query}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                autoFocus
                aria-label="Search input"
              />
              {query && (
                <button
                  className="search-clear"
                  onClick={() => this.setState({ query: "", results: [] })}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <button
              className="search-close"
              onClick={this.closeSearch}
              aria-label="Close search"
            >
              ×
            </button>
          </div>

          <div className="global-search-results">
            {isSearching ? (
              <div className="search-loading">Searching...</div>
            ) : query.trim().length === 0 ? (
              <div className="search-empty">
                <div className="search-empty-icon">🔍</div>
                <div className="search-empty-text">
                  Start typing to search...
                </div>
                <div className="search-empty-hint">
                  Search across projects, skills, experience, and more
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="search-empty">
                <div className="search-empty-icon">😕</div>
                <div className="search-empty-text">No results found</div>
                <div className="search-empty-hint">Try different keywords</div>
              </div>
            ) : (
              <>
                <div className="search-results-header">
                  {results.length} result{results.length !== 1 ? "s" : ""} found
                </div>
                <div className="search-results-list">
                  {results.map((result, index) =>
                    this.renderResult(result, index),
                  )}
                </div>
              </>
            )}
          </div>

          <div className="global-search-footer">
            <div className="search-hints">
              <span className="search-hint">
                <kbd>↑</kbd>
                <kbd>↓</kbd> Navigate
              </span>
              <span className="search-hint">
                <kbd>Enter</kbd> Select
              </span>
              <span className="search-hint">
                <kbd>Esc</kbd> Close
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalSearch;
