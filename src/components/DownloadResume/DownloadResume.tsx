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
}

export const DownloadResume: React.FC<DownloadResumeProps> = ({
  className = "",
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

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handleDownload}
      className={`${styles.downloadButton} ${className}`}
      aria-label="Download resume (PDF)"
    >
      <span className={styles.icon} aria-hidden="true">
        📄
      </span>
      <span>Download Resume</span>
      <span className={styles.arrow} aria-hidden="true">
        ↓
      </span>
    </Button>
  );
};
