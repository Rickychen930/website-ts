/**
 * CertificationCard Component - Domain Component
 * Displays certification information
 */

import React from "react";
import type { Certification } from "@/types/domain";
import { Card } from "@/views/components/ui/Card";
import { Typography } from "@/views/components/ui/Typography";
import { formatDate } from "@/utils/dateUtils";
import styles from "./CertificationCard.module.css";

export interface CertificationCardProps {
  certification: Certification;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
}) => {
  return (
    <Card variant="elevated" className={styles.certificationCard}>
      <div className={styles.header}>
        <Typography variant="h5" weight="semibold">
          {certification.name}
        </Typography>
        <Typography variant="small" color="tertiary">
          {certification.issuer}
        </Typography>
      </div>

      <div className={styles.content}>
        <Typography variant="small" color="secondary">
          Issued: {formatDate(certification.issueDate)}
        </Typography>
        {certification.expiryDate && (
          <Typography variant="small" color="secondary">
            Expires: {formatDate(certification.expiryDate)}
          </Typography>
        )}
        {certification.credentialId && (
          <Typography variant="caption" color="tertiary">
            Credential ID: {certification.credentialId}
          </Typography>
        )}
      </div>

      {certification.credentialUrl && (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          View Credential
        </a>
      )}
    </Card>
  );
};
