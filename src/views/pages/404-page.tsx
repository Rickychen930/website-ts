/**
 * 404 Error Page Component
 * Professional 404 page with helpful navigation
 */

import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/common";
import "../../assets/css/404-page.css";

interface NotFoundPageState {
  searchQuery: string;
}

class NotFoundPage extends Component<{}, NotFoundPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchQuery: "",
    };
  }

  private handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    this.setState({ searchQuery: e.target.value });
  };

  private handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery.trim()) {
      // Dispatch search event
      const event = new CustomEvent("openGlobalSearch", {
        detail: { query: searchQuery.trim() },
      });
      document.dispatchEvent(event);
    }
  };

  private handleGoHome = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render(): ReactNode {
    return (
      <div className="not-found-page">
        <Card className="not-found-card">
          <div className="not-found-content">
            <div className="not-found-icon" aria-hidden="true">
              🔍
            </div>
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Page Not Found</h2>
            <p className="not-found-message">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="not-found-actions">
              <Link
                to="/"
                className="not-found-button not-found-button-primary"
                onClick={this.handleGoHome}
              >
                <span className="not-found-button-icon" aria-hidden="true">
                  🏠
                </span>
                Go to Homepage
              </Link>

              <button
                className="not-found-button not-found-button-secondary"
                onClick={() => window.history.back()}
                type="button"
              >
                <span className="not-found-button-icon" aria-hidden="true">
                  ⬅️
                </span>
                Go Back
              </button>
            </div>

            <div className="not-found-search">
              <p className="not-found-search-label">
                Or search for what you're looking for:
              </p>
              <form
                className="not-found-search-form"
                onSubmit={this.handleSearchSubmit}
              >
                <input
                  type="text"
                  className="not-found-search-input"
                  placeholder="Search projects, skills, experience..."
                  value={this.state.searchQuery}
                  onChange={this.handleSearchChange}
                  aria-label="Search input"
                />
                <button
                  type="submit"
                  className="not-found-search-button"
                  aria-label="Search"
                >
                  <span aria-hidden="true">🔍</span>
                </button>
              </form>
            </div>

            <div className="not-found-links">
              <p className="not-found-links-label">Popular Sections:</p>
              <ul className="not-found-links-list">
                <li>
                  <a href="#about" className="not-found-link">
                    About Me
                  </a>
                </li>
                <li>
                  <a href="#skills" className="not-found-link">
                    Technical Skills
                  </a>
                </li>
                <li>
                  <a href="#experience" className="not-found-link">
                    Work Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" className="not-found-link">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="not-found-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default NotFoundPage;
