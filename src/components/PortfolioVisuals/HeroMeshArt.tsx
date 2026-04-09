/**
 * Decorative hero mesh — abstract nodes & paths (Signal palette). No external assets.
 */

import React, { useId } from "react";

export interface HeroMeshArtProps {
  className?: string;
}

export const HeroMeshArt: React.FC<HeroMeshArtProps> = ({ className }) => {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      className={className}
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`hm-g-${uid}`}
          x1="32"
          y1="24"
          x2="288"
          y2="256"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0ea5e9" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#6366f1" stopOpacity="0.14" />
          <stop offset="1" stopColor="#0ea5e9" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient
          id={`hm-r-${uid}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(200 72) rotate(90) scale(120)"
        >
          <stop stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`hm-r2-${uid}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(88 200) rotate(90) scale(90)"
        >
          <stop stopColor="#818cf8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        x="8"
        y="8"
        width="304"
        height="264"
        rx="28"
        fill={`url(#hm-g-${uid})`}
      />
      <rect
        x="8"
        y="8"
        width="304"
        height="264"
        rx="28"
        stroke={`url(#hm-g-${uid})`}
        strokeWidth="1"
        opacity="0.5"
      />
      <ellipse cx="200" cy="72" rx="100" ry="72" fill={`url(#hm-r-${uid})`} />
      <ellipse cx="96" cy="196" rx="72" ry="56" fill={`url(#hm-r2-${uid})`} />
      <path
        d="M48 180 C 90 120, 130 100, 168 88 S 248 72, 272 48"
        stroke="#0ea5e9"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M56 220 C 120 200, 160 160, 200 132 S 268 96, 288 76"
        stroke="#6366f1"
        strokeOpacity="0.3"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M72 64 L 120 112 M 200 48 L 232 96 M 248 156 L 196 200 M 128 228 L 88 168"
        stroke="#0ea5e9"
        strokeOpacity="0.2"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {(
        [
          [72, 64],
          [120, 112],
          [200, 48],
          [232, 96],
          [248, 156],
          [196, 200],
          [128, 228],
          [168, 88],
          [272, 48],
        ] as const
      ).map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="5"
          fill="#f8fafc"
          stroke="#0ea5e9"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
      ))}
      <circle cx="160" cy="140" r="7" fill="#0ea5e9" fillOpacity="0.35" />
      <circle
        cx="160"
        cy="140"
        r="14"
        stroke="#0ea5e9"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
    </svg>
  );
};
