/**
 * Plausible Analytics Component
 * Dynamically loads Plausible Analytics script
 */

import { Component, ReactNode } from "react";

interface PlausibleAnalyticsProps {
  domain?: string;
}

export class PlausibleAnalytics extends Component<PlausibleAnalyticsProps> {
  private scriptLoaded = false;

  componentDidMount(): void {
    const { domain } = this.props;

    if (
      !domain ||
      typeof window === "undefined" ||
      typeof document === "undefined" ||
      this.scriptLoaded
    ) {
      return;
    }

    // Load Plausible script
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-domain", domain);
    script.src = "https://plausible.io/js/script.js";
    script.onload = () => {
      this.scriptLoaded = true;
    };
    document.head.appendChild(script);
  }

  render(): ReactNode {
    return null; // This component doesn't render anything
  }
}

export default PlausibleAnalytics;
