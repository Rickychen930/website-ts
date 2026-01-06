/**
 * Project Filters Component
 * Filter and sort projects by category, date, featured status
 */

import React, { Component, ReactNode } from "react";
import { IProject } from "../../models/project-model";
import "../../assets/css/project-filters.css";

export type SortOption = "date-desc" | "date-asc" | "name-asc" | "name-desc" | "featured";
export type FilterOption = string | "all"; // Category name or "all"

interface ProjectFiltersProps {
  projects: IProject[];
  onFilterChange: (filteredProjects: IProject[]) => void;
}

interface ProjectFiltersState {
  selectedCategory: FilterOption;
  sortOption: SortOption;
  categories: string[];
}

export class ProjectFilters extends Component<ProjectFiltersProps, ProjectFiltersState> {
  constructor(props: ProjectFiltersProps) {
    super(props);
    
    // Extract unique categories
    const categories = Array.from(
      new Set(
        props.projects
          .map((p) => p.category)
          .filter((c): c is string => Boolean(c))
      )
    ).sort();

    this.state = {
      selectedCategory: "all",
      sortOption: "featured",
      categories,
    };
  }

  componentDidMount(): void {
    this.applyFilters();
  }

  componentDidUpdate(prevProps: ProjectFiltersProps, prevState: ProjectFiltersState): void {
    if (
      prevProps.projects !== this.props.projects ||
      prevState.selectedCategory !== this.state.selectedCategory ||
      prevState.sortOption !== this.state.sortOption
    ) {
      this.applyFilters();
    }
  }

  private applyFilters = (): void => {
    let filtered = [...this.props.projects];

    // Filter by category
    if (this.state.selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === this.state.selectedCategory);
    }

    // Sort
    filtered = this.sortProjects(filtered, this.state.sortOption);

    this.props.onFilterChange(filtered);
  };

  private sortProjects = (projects: IProject[], sortOption: SortOption): IProject[] => {
    const sorted = [...projects];

    switch (sortOption) {
      case "featured":
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          // If both featured or both not, sort by date
          return this.compareDates(a.date, b.date);
        });

      case "date-desc":
        return sorted.sort((a, b) => this.compareDates(a.date, b.date));

      case "date-asc":
        return sorted.sort((a, b) => this.compareDates(b.date, a.date));

      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));

      default:
        return sorted;
    }
  };

  private compareDates = (dateA: string, dateB: string): number => {
    const getDateValue = (dateStr: string): number => {
      // Try to extract year from date string
      const yearMatch = dateStr.match(/\d{4}/);
      return yearMatch ? parseInt(yearMatch[0], 10) : 0;
    };

    return getDateValue(dateB) - getDateValue(dateA); // Descending (newest first)
  };

  private handleCategoryChange = (category: FilterOption): void => {
    this.setState({ selectedCategory: category });
  };

  private handleSortChange = (sortOption: SortOption): void => {
    this.setState({ sortOption });
  };

  render(): ReactNode {
    const { selectedCategory, sortOption, categories } = this.state;
    const { projects } = this.props;

    return (
      <div className="project-filters">
        <div className="project-filters-row">
          {/* Category Filter */}
          <div className="project-filter-group">
            <label className="project-filter-label" htmlFor="category-filter">
              Category
            </label>
            <div className="project-filter-buttons">
              <button
                className={`project-filter-button ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => this.handleCategoryChange("all")}
                type="button"
                aria-pressed={selectedCategory === "all"}
              >
                All ({projects.length})
              </button>
              {categories.map((category) => {
                const count = projects.filter((p) => p.category === category).length;
                return (
                  <button
                    key={category}
                    className={`project-filter-button ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => this.handleCategoryChange(category)}
                    type="button"
                    aria-pressed={selectedCategory === category}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Options */}
          <div className="project-filter-group">
            <label className="project-filter-label" htmlFor="sort-filter">
              Sort by
            </label>
            <select
              id="sort-filter"
              className="project-filter-select"
              value={sortOption}
              onChange={(e) => this.handleSortChange(e.target.value as SortOption)}
              aria-label="Sort projects"
            >
              <option value="featured">Featured First</option>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectFilters;

