/**
 * Download Resume Button - One-click PDF download when profile is loaded
 */

import React from "react";
import { Button } from "@/views/components/ui/Button";
import { trackEvent } from "@/utils/analytics";
import { useProfile } from "@/contexts/ProfileContext";
import { downloadResumePdf } from "@/utils/resumePdfDownload";
import styles from "./DownloadResume.module.css";

interface DownloadResumeProps {
  className?: string;
  /** Compact style for header (smaller button, shorter label) */
  compact?: boolean;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  /** Overrides default "Download Resume" / "Download CV" text */
  label?: string;
  /** When false, hides the leading icon and trailing arrow */
  showDecorations?: boolean;
  /** Skip DownloadResume.module.css extras (use plain Button styles only) */
  plain?: boolean;
}

export const DownloadResume: React.FC<DownloadResumeProps> = ({
  className = "",
  compact = false,
  variant = "primary",
  size: sizeProp,
  label,
  showDecorations = true,
  plain = false,
}) => {
  const { profile } = useProfile();

  const handleDownload = () => {
    trackEvent("download_resume");
    if (profile) {
      downloadResumePdf({
        name: profile.name || "Your Name",
        title: profile.title || "",
        location: profile.location || "",
        bio: profile.bio || "",
        contacts: profile.contacts ?? [],
        experiences: profile.experiences ?? [],
        academics: profile.academics ?? [],
        projects: profile.projects ?? [],
        technicalSkills: profile.technicalSkills ?? [],
        softSkills: profile.softSkills ?? [],
        certifications: profile.certifications ?? [],
        honors: profile.honors ?? [],
        stats: profile.stats ?? [],
        languages: profile.languages ?? [],
      });
    } else {
      window.open("/resume", "_blank", "noopener,noreferrer");
    }
  };

  const size = sizeProp ?? (compact ? "sm" : "lg");
  const text = label ?? (compact ? "Download CV" : "Download Resume");

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      className={`${plain ? "" : styles.downloadButton} ${className}`.trim()}
      aria-label={`${text} (PDF)`}
    >
      {showDecorations ? (
        <span className={styles.icon} aria-hidden="true">
          📄
        </span>
      ) : null}
      <span>{text}</span>
      {showDecorations && !compact && size === "lg" ? (
        <span className={styles.arrow} aria-hidden="true">
          ↓
        </span>
      ) : null}
    </Button>
  );
};
