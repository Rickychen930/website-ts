/**
 * ProjectSearch - Search and Filter Component for Projects
 * Professional search functionality with filters
 * 
 * Features:
 * - Real-time search
 * - Technology filter
 * - Date range filter
 * - Clear filters
 * - Keyboard shortcuts (Ctrl+K / Cmd+K)
 */

import React, { Component } from 'react';
import { IProject } from '../../models/project-model';
import { debounce } from '../../utils/common-utils';
import './ProjectSearch.css';

export interface IProjectSearchProps {
  projects: IProject[];
  onFilterChange: (filteredProjects: IProject[]) => void;
  placeholder?: string;
}

interface IProjectSearchState {
  searchQuery: string;
  selectedTechnologies: Set<string>;
  sortBy: 'date' | 'name' | 'relevance';
  sortOrder: 'asc' | 'desc';
  isSearchFocused: boolean;
}

/**
 * ProjectSearch Component
 * Search and filter projects
 */
export class ProjectSearch extends Component<IProjectSearchProps, IProjectSearchState> {
  private searchInputRef: React.RefObject<HTMLInputElement | null> = React.createRef();
  private allTechnologies: Set<string> = new Set();
  private debouncedApplyFilters: () => void;

  constructor(props: IProjectSearchProps) {
    super(props);
    
    // Extract all unique technologies
    props.projects.forEach(project => {
      if (project.technologies) {
        project.technologies.forEach(tech => {
          const techName = typeof tech === 'string' ? tech : tech.name;
          if (techName) {
            this.allTechnologies.add(techName);
          }
        });
      }
    });

    this.state = {
      searchQuery: '',
      selectedTechnologies: new Set(),
      sortBy: 'date',
      sortOrder: 'desc',
      isSearchFocused: false,
    };

    // Debounce filter application for better performance
    this.debouncedApplyFilters = debounce(this.applyFilters, 300);
  }

  componentDidMount(): void {
    // Keyboard shortcut: Ctrl+K / Cmd+K to focus search
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    this.applyFilters();
  }

  componentDidUpdate(prevProps: IProjectSearchProps, prevState: IProjectSearchState): void {
    // Only debounce search query changes, apply others immediately
    const searchQueryChanged = prevState.searchQuery !== this.state.searchQuery;
    const otherFiltersChanged = 
      prevState.selectedTechnologies !== this.state.selectedTechnologies ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.sortOrder !== this.state.sortOrder ||
      prevProps.projects !== this.props.projects;

    if (searchQueryChanged) {
      this.debouncedApplyFilters();
    } else if (otherFiltersChanged) {
      this.applyFilters();
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  private handleDocumentKeyDown = (e: KeyboardEvent): void => {
    // Ctrl+K or Cmd+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (this.searchInputRef.current) {
        this.searchInputRef.current.focus();
        this.searchInputRef.current.select();
      }
    }

    // ESC to clear search
    if (e.key === 'Escape' && this.state.searchQuery) {
      this.handleClearSearch();
    }
  };

  private handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    // ESC to clear search
    if (e.key === 'Escape' && this.state.searchQuery) {
      this.handleClearSearch();
    }
  };

  private applyFilters = (): void => {
    const { projects } = this.props;
    const { searchQuery, selectedTechnologies, sortBy, sortOrder } = this.state;

    let filtered = [...projects];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => {
        const nameMatch = project.name?.toLowerCase().includes(query);
        const descMatch = project.description?.toLowerCase().includes(query);
        const techMatch = project.technologies?.some(tech => {
          const techName = typeof tech === 'string' ? tech : tech.name;
          return techName?.toLowerCase().includes(query);
        });
        return nameMatch || descMatch || techMatch;
      });
    }

    // Apply technology filter
    if (selectedTechnologies.size > 0) {
      filtered = filtered.filter(project => {
        if (!project.technologies) return false;
        return project.technologies.some(tech => {
          const techName = typeof tech === 'string' ? tech : tech.name;
          return selectedTechnologies.has(techName);
        });
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          const dateA = new Date(a.date || 0).getTime();
          const dateB = new Date(b.date || 0).getTime();
          comparison = dateA - dateB;
          break;
        case 'name':
          comparison = (a.name || '').localeCompare(b.name || '');
          break;
        case 'relevance':
          // Relevance based on search query match
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const aScore = this.getRelevanceScore(a, query);
            const bScore = this.getRelevanceScore(b, query);
            comparison = bScore - aScore; // Higher score first
          } else {
            comparison = 0;
          }
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    this.props.onFilterChange(filtered);
  };

  private getRelevanceScore = (project: IProject, query: string): number => {
    let score = 0;
    const name = (project.name || '').toLowerCase();
    const desc = (project.description || '').toLowerCase();

    if (name.startsWith(query)) score += 10;
    if (name.includes(query)) score += 5;
    if (desc.includes(query)) score += 2;

    if (project.technologies) {
      project.technologies.forEach(tech => {
        const techName = (typeof tech === 'string' ? tech : tech.name || '').toLowerCase();
        if (techName.includes(query)) score += 3;
      });
    }

    return score;
  };

  private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: e.target.value });
  };

  private handleTechnologyToggle = (tech: string): void => {
    this.setState(prevState => {
      const newSet = new Set(prevState.selectedTechnologies);
      if (newSet.has(tech)) {
        newSet.delete(tech);
      } else {
        newSet.add(tech);
      }
      return { selectedTechnologies: newSet };
    });
  };

  private handleSortChange = (sortBy: 'date' | 'name' | 'relevance'): void => {
    this.setState(prevState => ({
      sortBy,
      sortOrder: prevState.sortBy === sortBy && prevState.sortOrder === 'desc' ? 'asc' : 'desc',
    }));
  };

  private handleClearSearch = (): void => {
    this.setState({ searchQuery: '' });
    if (this.searchInputRef.current) {
      this.searchInputRef.current.focus();
    }
  };

  private handleClearFilters = (): void => {
    this.setState({
      searchQuery: '',
      selectedTechnologies: new Set(),
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  private handleSearchFocus = (): void => {
    this.setState({ isSearchFocused: true });
  };

  private handleSearchBlur = (): void => {
    this.setState({ isSearchFocused: false });
  };

  render(): React.ReactNode {
    const { searchQuery, selectedTechnologies, sortBy, sortOrder } = this.state;
    const { placeholder = 'Search projects...' } = this.props;
    const hasActiveFilters = searchQuery.trim() || selectedTechnologies.size > 0;

    return (
      <div className="project-search">
        {/* Search Input */}
        <div className="project-search__input-wrapper">
          <input
            ref={this.searchInputRef}
            type="text"
            className="project-search__input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={this.handleSearchChange}
            onFocus={this.handleSearchFocus}
            onBlur={this.handleSearchBlur}
            onKeyDown={this.handleInputKeyDown}
            aria-label="Search projects"
          />
          <span className="project-search__shortcut-hint">
            {navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl+K'}
          </span>
          {searchQuery && (
            <button
              type="button"
              className="project-search__clear"
              onClick={this.handleClearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="project-search__filters">
          {/* Technology Filters */}
          {this.allTechnologies.size > 0 && (
            <div className="project-search__tech-filters">
              <span className="project-search__filter-label">Technologies:</span>
              <div className="project-search__tech-tags">
                {Array.from(this.allTechnologies).map(tech => (
                  <button
                    key={tech}
                    type="button"
                    className={`project-search__tech-tag ${
                      selectedTechnologies.has(tech) ? 'project-search__tech-tag--active' : ''
                    }`}
                    onClick={() => this.handleTechnologyToggle(tech)}
                    aria-pressed={selectedTechnologies.has(tech)}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sort Options */}
          <div className="project-search__sort">
            <span className="project-search__filter-label">Sort by:</span>
            <div className="project-search__sort-buttons">
              {(['date', 'name', 'relevance'] as const).map(option => (
                <button
                  key={option}
                  type="button"
                  className={`project-search__sort-button ${
                    sortBy === option ? 'project-search__sort-button--active' : ''
                  }`}
                  onClick={() => this.handleSortChange(option)}
                  aria-pressed={sortBy === option}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                  {sortBy === option && (
                    <span className="project-search__sort-arrow">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Clear All */}
          {hasActiveFilters && (
            <button
              type="button"
              className="project-search__clear-all"
              onClick={this.handleClearFilters}
              aria-label="Clear all filters"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ProjectSearch;
