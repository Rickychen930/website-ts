/**
 * Share Button Component
 * Professional share functionality for social media
 */

import React, { Component, ReactNode, createRef } from "react";
import { toast } from "../../views/components/ui";
import "../../assets/css/share-button.css";

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

interface ShareButtonProps {
  options?: ShareOptions;
  className?: string;
  variant?: "icon" | "button" | "dropdown";
}

interface ShareButtonState {
  isOpen: boolean;
  isSupported: boolean;
}

export class ShareButton extends Component<ShareButtonProps, ShareButtonState> {
  private dropdownRef = createRef<HTMLDivElement>();

  constructor(props: ShareButtonProps) {
    super(props);
    this.state = {
      isOpen: false,
      isSupported: typeof navigator !== "undefined" && "share" in navigator,
    };
  }

  componentDidMount(): void {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount(): void {
    document.removeEventListener("click", this.handleClickOutside);
  }

  private handleClickOutside = (e: MouseEvent): void => {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(e.target as Node)
    ) {
      this.setState({ isOpen: false });
    }
  };

  private getShareOptions(): ShareOptions {
    const defaultOptions: ShareOptions = {
      title: document.title,
      text: "Check out my portfolio!",
      url: window.location.href,
    };

    return { ...defaultOptions, ...this.props.options };
  }

  private handleNativeShare = async (): Promise<void> => {
    const options = this.getShareOptions();
    const shareData = {
      title: options.title || "",
      text: options.text || "",
      url: options.url || window.location.href,
    };

    try {
      if (this.state.isSupported && navigator.share) {
        await navigator.share(shareData);
        this.setState({ isOpen: false });
      } else {
        this.fallbackShare();
      }
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== "AbortError") {
        this.fallbackShare();
      }
    }
  };

  private fallbackShare = (): void => {
    this.setState({ isOpen: true });
  };

  private handleSocialShare = (platform: string): void => {
    const options = this.getShareOptions();
    const url = encodeURIComponent(options.url || window.location.href);
    const title = encodeURIComponent(options.title || "");
    const text = encodeURIComponent(options.text || "");

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${title}&body=${text}%20${url}`;
        break;
      case "copy":
        this.copyToClipboard();
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
      this.setState({ isOpen: false });
    }
  };

  private copyToClipboard = async (): Promise<void> => {
    const options = this.getShareOptions();
    const url = options.url || window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      this.setState({ isOpen: false });
      // Show toast notification
      toast.success("Link copied to clipboard!", 3000);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logError } = require("../../utils/logger");
        logError("Failed to copy to clipboard", error, "ShareButton");
      }
    }
  };

  private toggleDropdown = (): void => {
    this.setState((prev) => ({ isOpen: !prev.isOpen }));
  };

  private renderIconButton(): ReactNode {
    return (
      <button
        className="share-button share-button-icon"
        onClick={
          this.state.isSupported ? this.handleNativeShare : this.toggleDropdown
        }
        aria-label="Share"
        title="Share portfolio"
      >
        <span className="share-icon" aria-hidden="true">
          🔗
        </span>
      </button>
    );
  }

  private renderFullButton(): ReactNode {
    return (
      <button
        className="share-button share-button-full"
        onClick={
          this.state.isSupported ? this.handleNativeShare : this.toggleDropdown
        }
        aria-label="Share"
      >
        <span className="share-icon" aria-hidden="true">
          🔗
        </span>
        <span className="share-text">Share</span>
      </button>
    );
  }

  private renderDropdown(): ReactNode {
    const { isOpen } = this.state;

    if (!isOpen) return null;

    const platforms = [
      { id: "twitter", name: "Twitter", icon: "🐦" },
      { id: "linkedin", name: "LinkedIn", icon: "💼" },
      { id: "facebook", name: "Facebook", icon: "👥" },
      { id: "whatsapp", name: "WhatsApp", icon: "💬" },
      { id: "telegram", name: "Telegram", icon: "✈️" },
      { id: "email", name: "Email", icon: "📧" },
      { id: "copy", name: "Copy Link", icon: "📋" },
    ];

    return (
      <div className="share-dropdown" ref={this.dropdownRef}>
        {platforms.map((platform) => (
          <button
            key={platform.id}
            className="share-dropdown-item"
            onClick={() => this.handleSocialShare(platform.id)}
            aria-label={`Share on ${platform.name}`}
          >
            <span className="share-dropdown-icon" aria-hidden="true">
              {platform.icon}
            </span>
            <span className="share-dropdown-text">{platform.name}</span>
          </button>
        ))}
      </div>
    );
  }

  render(): ReactNode {
    const { variant = "icon", className = "" } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={`share-button-wrapper ${className}`.trim()}>
        {variant === "icon" && this.renderIconButton()}
        {variant === "button" && this.renderFullButton()}
        {variant === "dropdown" && (
          <>
            <button
              className="share-button share-button-dropdown"
              onClick={this.toggleDropdown}
              aria-label="Share"
              aria-expanded={isOpen}
            >
              <span className="share-icon" aria-hidden="true">
                🔗
              </span>
              <span className="share-text">Share</span>
              <span className="share-arrow" aria-hidden="true">
                {isOpen ? "▲" : "▼"}
              </span>
            </button>
            {this.renderDropdown()}
          </>
        )}
        {!this.state.isSupported && this.renderDropdown()}
      </div>
    );
  }
}

export default ShareButton;
