import type { Project } from "@/types/domain";

/** Active or ongoing projects first, then newest start date. */
export function sortProjectsByRecency(projects: readonly Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;
    const aOpen = !a.endDate;
    const bOpen = !b.endDate;
    if (aOpen && !bOpen) return -1;
    if (!aOpen && bOpen) return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

/** Best candidates for homepage / highlight bento (active first, then recency). */
export function pickFeaturedProjects(
  projects: readonly Project[],
  count: number,
): Project[] {
  const eligible = projects.filter((p) => p.isActive || !p.endDate);
  const pool = eligible.length >= count ? eligible : [...projects];
  return sortProjectsByRecency(pool).slice(0, count);
}
