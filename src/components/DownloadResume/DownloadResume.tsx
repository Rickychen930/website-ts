/**
 * Download Resume Button - Opens ATS-optimized resume (view/print to PDF) or downloads PDF
 */

import React from "react";
import { Button } from "@/views/components/ui/Button";
import { trackEvent } from "@/utils/analytics";
import styles from "./DownloadResume.module.css";

interface DownloadResumeProps {
  /** URL to resume: use /resume.html for ATS version (open then Print → Save as PDF), or .pdf for direct download */
  resumeUrl?: string;
  className?: string;
}

const DEFAULT_RESUME_URL = "/resume.html";

export const DownloadResume: React.FC<DownloadResumeProps> = ({
  resumeUrl = DEFAULT_RESUME_URL,
  className = "",
}) => {
  const isPdf = resumeUrl.toLowerCase().endsWith(".pdf");

  const handleDownload = () => {
    trackEvent("download_resume");
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (isPdf) {
      link.download = "Ricky_Chen_Resume.pdf";
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handleDownload}
      className={`${styles.downloadButton} ${className}`}
      aria-label={
        isPdf
          ? "Download resume (PDF)"
          : "Open resume (use Print to save as PDF)"
      }
    >
      <span className={styles.icon} aria-hidden="true">
        📄
      </span>
      <span>{isPdf ? "Download Resume" : "View / Download Resume"}</span>
      <span className={styles.arrow} aria-hidden="true">
        ↓
      </span>
    </Button>
  );
};
