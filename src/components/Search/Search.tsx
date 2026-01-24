/**
 * Search Component - Global search functionality
 * Allows users to search through projects, skills, and content
 */

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { Typography } from "@/views/components/ui/Typography";
import styles from "./Search.module.css";

interface SearchResult {
  type: "project" | "skill" | "experience" | "certification";
  id: string;
  title: string;
  description: string;
  category?: string;
  url?: string;
}

interface SearchProps {
  onResultClick?: (result: SearchResult) => void;
  placeholder?: string;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  onResultClick,
  placeholder = "Search projects, skills, experience...",
  className = "",
}) => {
  const { profile } = useProfile();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate searchable content
  const searchableContent = useMemo(() => {
    if (!profile) return [];

    const content: SearchResult[] = [];

    // Projects
    profile.projects.forEach((project) => {
      content.push({
        type: "project",
        id: project.id,
        title: project.title,
        description: project.description,
        category: project.category,
        url: `/projects#${project.id}`,
      });
    });

    // Skills
    profile.technicalSkills.forEach((skill) => {
      content.push({
        type: "skill",
        id: skill.id,
        title: skill.name,
        description: `${skill.category} skill - ${skill.proficiency}`,
        category: skill.category,
      });
    });

    // Experience
    profile.experiences.forEach((exp) => {
      content.push({
        type: "experience",
        id: exp.id,
        title: `${exp.position} at ${exp.company}`,
        description: exp.description || "",
        category: exp.company,
        url: `/experience#${exp.id}`,
      });
    });

    // Certifications
    profile.certifications.forEach((cert) => {
      content.push({
        type: "certification",
        id: cert.id,
        title: cert.name,
        description: cert.issuer || "",
        category: cert.issuer,
        url: `/about#certifications`,
      });
    });

    return content;
  }, [profile]);

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();
    return searchableContent
      .filter((item) => {
        const searchText =
          `${item.title} ${item.description} ${item.category || ""}`.toLowerCase();
        return searchText.includes(lowerQuery);
      })
      .slice(0, 8); // Limit to 8 results
  }, [query, searchableContent]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && results[focusedIndex]) {
          handleResultClick(results[focusedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result);
    } else if (result.url) {
      window.location.href = result.url;
    }
    setIsOpen(false);
    setQuery("");
    setFocusedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setFocusedIndex(-1);
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsOpen(true);
    }
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    const labels = {
      project: "Project",
      skill: "Skill",
      experience: "Experience",
      certification: "Certification",
    };
    return labels[type];
  };

  return (
    <div className={`${styles.search} ${className}`} ref={searchRef}>
      <div className={styles.searchInputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label="Search"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="search-results-listbox"
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        <span className={styles.searchIcon} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          id="search-results-listbox"
          className={styles.results}
          role="listbox"
          aria-label="Search results"
        >
          {results.map((result, index) => (
            <button
              key={result.id}
              type="button"
              className={`${styles.resultItem} ${index === focusedIndex ? styles.resultItemFocused : ""}`}
              onClick={() => handleResultClick(result)}
              role="option"
              aria-selected={index === focusedIndex}
            >
              <div className={styles.resultContent}>
                <Typography
                  variant="body"
                  weight="semibold"
                  className={styles.resultTitle}
                >
                  {result.title}
                </Typography>
                <Typography
                  variant="small"
                  color="secondary"
                  className={styles.resultDescription}
                >
                  {result.description}
                </Typography>
              </div>
              <span className={styles.resultType}>
                {getTypeLabel(result.type)}
              </span>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className={styles.noResults} role="status" aria-live="polite">
          <Typography variant="body" color="secondary">
            No results found for "{query}"
          </Typography>
        </div>
      )}
    </div>
  );
};
