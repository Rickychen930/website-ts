/**
 * Offline Indicator Component
 * Shows user when they're offline
 */

import React, { Component, ReactNode } from "react";
import "../assets/css/offline-indicator.css";

interface OfflineIndicatorState {
  isOnline: boolean;
  wasOffline: boolean;
}

/**
 * OfflineIndicator Component
 * Displays offline status to users
 */
class OfflineIndicator extends Component<{}, OfflineIndicatorState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
      wasOffline: false,
    };
  }

  componentDidMount(): void {
    if (typeof window === "undefined") return;

    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
  }

  componentWillUnmount(): void {
    if (typeof window === "undefined") return;

    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
  }

  private handleOnline = (): void => {
    this.setState({ isOnline: true, wasOffline: true });

    // Clear wasOffline after showing message
    setTimeout(() => {
      this.setState({ wasOffline: false });
    }, 3000);
  };

  private handleOffline = (): void => {
    this.setState({ isOnline: false });
  };

  render(): ReactNode {
    const { isOnline, wasOffline } = this.state;

    if (isOnline && !wasOffline) {
      return null; // Don't show anything when online
    }

    return (
      <div
        className={`offline-indicator ${isOnline ? "online" : "offline"} ${wasOffline ? "reconnected" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="offline-indicator-content">
          {isOnline ? (
            <>
              <span className="offline-indicator-icon" aria-hidden="true">
                ✓
              </span>
              <span className="offline-indicator-text">
                Connection restored
              </span>
            </>
          ) : (
            <>
              <span className="offline-indicator-icon" aria-hidden="true">
                ⚠
              </span>
              <span className="offline-indicator-text">
                You're offline. Some features may not work.
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default OfflineIndicator;
