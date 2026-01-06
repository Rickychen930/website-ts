/**
 * GitHub Contributions Component
 * Displays GitHub contribution graph for skills verification
 *
 * Features:
 * - Visual proof of coding activity
 * - Skills verification for recruiters
 * - Professional display
 */

import React, { Component, ReactNode } from "react";
import "../../assets/css/github-contributions.css";

interface GitHubContributionsProps {
  username?: string;
  showStats?: boolean;
  theme?: "light" | "dark" | "auto";
}

interface GitHubContributionsState {
  loading: boolean;
  error: string | null;
  contributions: number | null;
}

/**
 * GitHubContributions Component
 * Displays GitHub contribution graph
 */
class GitHubContributions extends Component<
  GitHubContributionsProps,
  GitHubContributionsState
> {
  private readonly username: string;
  private readonly githubUrl: string;

  constructor(props: GitHubContributionsProps) {
    super(props);
    this.username = props.username || "rickychen930"; // Default username
    this.githubUrl = `https://github.com/${this.username}`;

    this.state = {
      loading: true,
      error: null,
      contributions: null,
    };
  }

  componentDidMount(): void {
    // GitHub contribution graph is loaded via image
    // Set loading to false after component mounts
    this.setState({ loading: false });
  }

  private handleViewProfile = (): void => {
    if (typeof window !== "undefined") {
      window.open(this.githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  private handleImageError = (): void => {
    this.setState({
      error: "Failed to load GitHub contributions image",
      loading: false,
    });
  };

  private handleImageLoad = (): void => {
    this.setState({
      loading: false,
      error: null,
    });
  };

  render(): ReactNode {
    const { showStats = true } = this.props;
    const { loading, error } = this.state;

    if (loading) {
      return (
        <div className="github-contributions-loading">
          <div className="github-contributions-skeleton" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="github-contributions-error">
          <p>Unable to load GitHub contributions</p>
        </div>
      );
    }

    // GitHub contribution graph image URL
    const imageUrl = `https://ghchart.rshah.org/${this.username}`;

    return (
      <div className="github-contributions">
        <div className="github-contributions-header">
          <h3 className="github-contributions-title">GitHub Activity</h3>
          {showStats && (
            <p className="github-contributions-subtitle">
              Visual proof of coding activity and contributions
            </p>
          )}
        </div>

        <div className="github-contributions-content">
          <div className="github-contributions-graph">
            <img
              src={imageUrl}
              alt={`GitHub contributions for ${this.username}`}
              className="github-contributions-image"
              loading="lazy"
              onError={this.handleImageError}
              onLoad={this.handleImageLoad}
            />
          </div>

          <div className="github-contributions-footer">
            <button
              className="github-contributions-button"
              onClick={this.handleViewProfile}
              type="button"
              aria-label={`View ${this.username} GitHub profile`}
            >
              <span className="github-contributions-icon" aria-hidden="true">
                🔗
              </span>
              <span>View GitHub Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GitHubContributions;
