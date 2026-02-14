/**
 * Visual themes for Learning sections - gradient + icon per slug
 */

import React from "react";

/** Returns true if image URL is missing or a placeholder (e.g. placehold.co). Use for gradient+icon fallback. */
export function isPlaceholderImage(url: string | undefined): boolean {
  return !url || url.includes("placehold.co");
}

// Icon components as simple SVG paths
const icons = {
  book: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
      <path d="M8 15h4" />
    </svg>
  ),
  code: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  react: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="12" rx="2" ry="10" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  database: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  brain: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      <path d="M12 13c-3 0-6 2-6 6h12c0-4-3-6-6-6z" />
      <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
    </svg>
  ),
  server: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <path d="M6 6h.01" />
      <path d="M6 18h.01" />
    </svg>
  ),
  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  language: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  interview: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  network: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4" />
      <path d="M12 19v4" />
      <path d="M4.22 4.22l2.83 2.83" />
      <path d="M16.95 16.95l2.83 2.83" />
      <path d="M1 12h4" />
      <path d="M19 12h4" />
      <path d="M4.22 19.78l2.83-2.83" />
      <path d="M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  atom: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
};

// Gradient strings (CSS linear-gradient)
const gradients = {
  indigo: "linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #818cf8 100%)",
  blue: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
  emerald: "linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)",
  violet: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #8b5cf6 100%)",
  teal: "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)",
  rose: "linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)",
  amber: "linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)",
  cyan: "linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)",
  fuchsia: "linear-gradient(135deg, #a21caf 0%, #c026d3 50%, #d946ef 100%)",
  slate: "linear-gradient(135deg, #334155 0%, #475569 50%, #64748b 100%)",
};

// Map slugs to themes
const slugToTheme: Record<
  string,
  { gradient: string; iconKey: keyof typeof icons }
> = {
  "how-to-learn": { gradient: gradients.indigo, iconKey: "book" },
  "competitive-programming": { gradient: gradients.blue, iconKey: "code" },
  react: { gradient: gradients.cyan, iconKey: "react" },
  nodejs: { gradient: gradients.emerald, iconKey: "server" },
  "database-sql": { gradient: gradients.violet, iconKey: "database" },
  "cs-theory": { gradient: gradients.amber, iconKey: "brain" },
  "data-analytics": { gradient: gradients.teal, iconKey: "database" },
  "ai-ml": { gradient: gradients.fuchsia, iconKey: "brain" },
  "system-design-devops": { gradient: gradients.slate, iconKey: "server" },
  "security-testing": { gradient: gradients.rose, iconKey: "shield" },
  "programming-languages": { gradient: gradients.violet, iconKey: "code" },
  "english-learning": { gradient: gradients.blue, iconKey: "language" },
  "quantum-computing": { gradient: gradients.indigo, iconKey: "atom" },
  "interview-preparation": {
    gradient: gradients.emerald,
    iconKey: "interview",
  },
  "operating-systems-concurrency": {
    gradient: gradients.amber,
    iconKey: "server",
  },
  "computer-networks": { gradient: gradients.teal, iconKey: "network" },
};

export function getSectionTheme(slug: string): {
  gradient: string;
  icon: React.ReactNode;
} {
  const theme = slugToTheme[slug] ?? {
    gradient: gradients.indigo,
    iconKey: "book",
  };
  return {
    gradient: theme.gradient,
    icon: icons[theme.iconKey] ?? icons.book,
  };
}
