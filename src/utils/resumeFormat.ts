/**
 * Shared resume formatting – ATS-friendly, consistent across PDF, HTML, and on-screen.
 * Single source of truth for experience line, contact label/value, order, and sanitization.
 */

/** Preferred contact order for resume (Email first, then Phone, LinkedIn, GitHub, etc.) */
const CONTACT_TYPE_ORDER: Record<string, number> = {
  email: 0,
  phone: 1,
  linkedin: 2,
  github: 3,
  website: 4,
  other: 5,
};

/** Sort contacts for resume display: Email → Phone → LinkedIn → GitHub → Website → Other */
export function sortContactsForResume<
  T extends { type: string; value: string },
>(contacts: ReadonlyArray<T>): T[] {
  return [...contacts].sort(
    (a, b) =>
      (CONTACT_TYPE_ORDER[a.type?.toLowerCase()] ?? 6) -
      (CONTACT_TYPE_ORDER[b.type?.toLowerCase()] ?? 6),
  );
}

/** Trim and collapse multiple spaces (for clean ATS-friendly text). */
export function trimResumeText(s: string | null | undefined): string {
  if (s == null) return "";
  return s.replace(/\s+/g, " ").trim();
}

/** Avoid duplicate city: show "Company, Location" only if location not already at end of company. */
export function formatExperienceCompanyLine(
  company: string,
  location?: string | null,
): string {
  if (!location?.trim()) return company.trim();
  const c = company.trim();
  const loc = location.trim();
  if (c.toLowerCase().endsWith(loc.toLowerCase())) return c;
  return `${c}, ${loc}`;
}

/** Capitalize contact type for display (e.g. linkedin → LinkedIn). */
export function formatContactLabel(
  type: string,
  label?: string | null,
): string {
  if (label?.trim()) return label.trim();
  const t = type.trim().toLowerCase();
  if (t === "linkedin") return "LinkedIn";
  if (t === "github") return "GitHub";
  if (t === "email") return "Email";
  if (t === "phone") return "Phone";
  if (t === "website") return "Website";
  return type.trim()
    ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    : type;
}

/** Short, ATS-friendly contact value: no https, clean URLs for LinkedIn/GitHub. */
export function formatContactValue(type: string, value: string): string {
  const v = value.trim();
  if (!v) return v;
  const lower = v.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  if (type === "email" || type === "phone") return v;
  if (type === "linkedin")
    return lower.toLowerCase().startsWith("linkedin.com")
      ? lower
      : `linkedin.com/in/${lower.split("/").pop() || lower}`;
  if (type === "github")
    return lower.toLowerCase().startsWith("github.com")
      ? lower
      : `github.com/${lower.split("/").pop() || lower}`;
  if (type === "website") return lower;
  return v;
}
