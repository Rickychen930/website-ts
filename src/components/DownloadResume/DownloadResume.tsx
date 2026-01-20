/**
 * Download Resume Button - Animated download button
 */

import React from "react";
import { Button } from "@/views/components/ui/Button";
import styles from "./DownloadResume.module.css";

interface DownloadResumeProps {
  resumeUrl?: string;
  className?: string;
}

export const DownloadResume: React.FC<DownloadResumeProps> = ({
  resumeUrl = "/RICKY - CV - 8 AUG.pdf",
  className = "",
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Ricky_Chen_CV.pdf";
    link.target = "_blank";
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
      aria-label="Download resume"
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
