/**
 * Project Filter Component - Advanced filtering dan sorting untuk projects
 */

import React, { useState, useMemo } from "react";
import styles from "./ProjectFilter.module.css";

export type FilterOption =
  | "all"
  | "web"
  | "mobile"
  | "ai"
  | "backend"
  | "frontend";
export type SortOption = "newest" | "oldest" | "name" | "popular";

interface ProjectFilterProps {
  projects: any[];
  onFilterChange: (filteredProjects: any[]) => void;
  className?: string;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  projects,
  onFilterChange,
  className = "",
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions: { value: FilterOption; label: string; icon: string }[] =
    [
      { value: "all", label: "All Projects", icon: "📁" },
      { value: "web", label: "Web", icon: "🌐" },
      { value: "mobile", label: "Mobile", icon: "📱" },
      { value: "ai", label: "AI/ML", icon: "🤖" },
      { value: "backend", label: "Backend", icon: "⚙️" },
      { value: "frontend", label: "Frontend", icon: "🎨" },
    ];

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (project) => project.category?.toLowerCase() === activeFilter,
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.technologies?.some((tech: string) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.startDate || 0).getTime() -
            new Date(a.startDate || 0).getTime()
          );
        case "oldest":
          return (
            new Date(a.startDate || 0).getTime() -
            new Date(b.startDate || 0).getTime()
          );
        case "name":
          return (a.title || "").localeCompare(b.title || "");
        case "popular":
          return (b.stars || 0) - (a.stars || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, activeFilter, searchQuery, sortBy]);

  React.useEffect(() => {
    onFilterChange(filteredAndSortedProjects);
  }, [filteredAndSortedProjects, onFilterChange]);

  return (
    <div className={`${styles.projectFilter} ${className}`}>
      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
          aria-label="Search projects"
        />
        <span className={styles.searchIcon} aria-hidden="true">
          🔍
        </span>
      </div>

      {/* Filter Buttons */}
      <div
        className={styles.filterButtons}
        role="group"
        aria-label="Filter projects"
      >
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            className={`${styles.filterButton} ${
              activeFilter === option.value ? styles.active : ""
            }`}
            aria-pressed={activeFilter === option.value}
          >
            <span className={styles.filterIcon}>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className={styles.sortContainer}>
        <label htmlFor="sort-select" className={styles.sortLabel}>
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className={styles.sortSelect}
          aria-label="Sort projects"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A-Z)</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Results Count */}
      <div className={styles.resultsCount}>
        Showing {filteredAndSortedProjects.length} of {projects.length} projects
      </div>
    </div>
  );
};
