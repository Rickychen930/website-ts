/**
 * Google Analytics Component
 * Dynamically loads Google Analytics script
 */

import { Component, ReactNode } from "react";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export class GoogleAnalytics extends Component<GoogleAnalyticsProps> {
  private scriptLoaded = false;

  componentDidMount(): void {
    const { measurementId } = this.props;

    if (!measurementId || typeof window === "undefined" || this.scriptLoaded) {
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]): void {
      window.dataLayer!.push(args);
    }
    (window as any).gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId, {
      page_path: window.location.pathname,
      send_page_view: true,
    });

    // Load GA script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.onload = () => {
      this.scriptLoaded = true;
    };
    document.head.appendChild(script);
  }

  render(): ReactNode {
    return null; // This component doesn't render anything
  }
}

export default GoogleAnalytics;
