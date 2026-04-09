/**
 * Decorative illustration for empty lists — cards / layers motif (no external images).
 */

import React, { useId } from "react";

export interface EmptyStateArtProps {
  className?: string;
  /** Slightly different silhouette per context */
  variant?: "projects" | "learning" | "experience";
}

export const EmptyStateArt: React.FC<EmptyStateArtProps> = ({
  className,
  variant = "projects",
}) => {
  const uid = useId().replace(/:/g, "");
  const shift = variant === "learning" ? 8 : variant === "experience" ? -4 : 0;

  return (
    <svg
      className={className}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`es-g-${uid}`}
          x1="40"
          y1="20"
          x2="170"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0ea5e9" stopOpacity="0.2" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0.12" />
        </linearGradient>
        <filter
          id={`es-blur-${uid}`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="2" result="b" />
        </filter>
      </defs>
      <g
        transform={`translate(${12 + shift}, 6)`}
        opacity="0.85"
        filter={`url(#es-blur-${uid})`}
      >
        <rect
          x="24"
          y="28"
          width="132"
          height="88"
          rx="12"
          fill="#e2e8f0"
          fillOpacity="0.45"
        />
      </g>
      <rect
        x="28"
        y="36"
        width="136"
        height="92"
        rx="14"
        stroke="#0ea5e9"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        fill={`url(#es-g-${uid})`}
      />
      <rect
        x="44"
        y="52"
        width="104"
        height="56"
        rx="8"
        fill="#f8fafc"
        fillOpacity="0.65"
        stroke="#94a3b8"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <path
        d="M56 68h80M56 80h56M56 92h72"
        stroke="#64748b"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="152" cy="48" r="10" fill="#0ea5e9" fillOpacity="0.2" />
      <path
        d="M147 48l3 3 7-8"
        stroke="#0ea5e9"
        strokeOpacity="0.65"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="168" cy="34" r="4" fill="#6366f1" fillOpacity="0.45" />
      <circle cx="36" cy="118" r="3" fill="#0ea5e9" fillOpacity="0.4" />
    </svg>
  );
};
