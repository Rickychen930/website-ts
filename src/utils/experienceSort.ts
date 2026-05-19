import type { Experience } from "@/types/domain";

/** Current roles first, then newest start date. */
export function sortExperiencesByRecency(
  experiences: readonly Experience[],
): Experience[] {
  return [...experiences].sort((a, b) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

export function getCurrentExperiences(
  experiences: readonly Experience[],
): Experience[] {
  return sortExperiencesByRecency(experiences).filter((e) => e.isCurrent);
}
