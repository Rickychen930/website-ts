/**
 * Skill Experience Utilities - Backend functions for calculating skill experience
 */

import type { IProfile } from "../models/Profile";

/**
 * Calculate years of experience for a skill based on related experiences
 * @param skillName - Name of the technical skill
 * @param profile - Profile containing experiences
 * @returns Total years of experience (rounded to 1 decimal place)
 */
export const calculateSkillExperience = (
  skillName: string,
  profile: IProfile,
): number => {
  const experiences = Array.isArray(profile.experiences)
    ? profile.experiences
    : [];

  const relatedExperiences = experiences.filter(
    (exp) =>
      exp.skillIds?.includes(skillName) ||
      exp.technologies.some(
        (tech) => tech.toLowerCase() === skillName.toLowerCase(),
      ),
  );

  if (relatedExperiences.length === 0) {
    return 0;
  }

  // Calculate total months across all related experiences
  let totalMonths = 0;
  const experienceRanges: Array<{ start: Date; end: Date }> = [];

  for (const exp of relatedExperiences) {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();

    // Check for overlapping date ranges and merge them
    let merged = false;
    for (let i = 0; i < experienceRanges.length; i++) {
      const range = experienceRanges[i];
      // Check if ranges overlap
      if (
        (start >= range.start && start <= range.end) ||
        (end >= range.start && end <= range.end) ||
        (start <= range.start && end >= range.end)
      ) {
        // Merge overlapping ranges
        range.start = start < range.start ? start : range.start;
        range.end = end > range.end ? end : range.end;
        merged = true;
        break;
      }
    }

    if (!merged) {
      experienceRanges.push({ start, end });
    }
  }

  // Calculate total months from merged ranges
  for (const range of experienceRanges) {
    const years = range.end.getFullYear() - range.start.getFullYear();
    const months = range.end.getMonth() - range.start.getMonth();
    const days = range.end.getDate() - range.start.getDate();

    // Convert to total months (approximate)
    const totalMonthsForRange =
      years * 12 + months + (days > 0 ? days / 30 : 0);
    totalMonths += Math.max(0, totalMonthsForRange);
  }

  // Convert to years and round to 1 decimal place
  const years = totalMonths / 12;
  return Math.round(years * 10) / 10;
};

/**
 * Update technical skills' yearsOfExperience based on experiences
 * This function can be called after updating experiences to recalculate skill experience
 * @param profile - Profile to update
 * @returns Updated profile with recalculated skill experience
 */
export const updateSkillExperienceFromExperiences = (
  profile: IProfile,
): IProfile => {
  const technicalSkills = Array.isArray(profile.technicalSkills)
    ? profile.technicalSkills
    : [];

  const updatedSkills = technicalSkills.map((skill) => {
    const calculatedExperience = calculateSkillExperience(skill.name, profile);

    // Only update if calculated value is greater than current or if current is not set
    if (
      !skill.yearsOfExperience ||
      calculatedExperience > skill.yearsOfExperience
    ) {
      return {
        ...skill,
        yearsOfExperience: calculatedExperience,
      };
    }

    return skill;
  });

  return {
    ...profile,
    technicalSkills: updatedSkills,
  } as IProfile;
};
