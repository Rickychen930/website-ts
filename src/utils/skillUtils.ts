/**
 * Skill Utilities - Functions for calculating and managing skill experience
 */

import type { Experience, TechnicalSkill } from "@/types/domain";

/**
 * Calculate years of experience for a skill based on related experiences
 * @param skillName - Name of the technical skill
 * @param experiences - Array of experiences that may use this skill
 * @returns Total years of experience (rounded to 1 decimal place)
 */
export const calculateSkillExperience = (
  skillName: string,
  experiences: readonly Experience[],
): number => {
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
 * Get all skills used in a specific experience
 * @param experience - The experience to analyze
 * @param allSkills - All available technical skills
 * @returns Array of technical skills used in this experience
 */
export const getSkillsForExperience = (
  experience: Experience,
  allSkills: readonly TechnicalSkill[],
): readonly TechnicalSkill[] => {
  if (!experience.skillIds || experience.skillIds.length === 0) {
    return [];
  }

  return allSkills.filter((skill) => experience.skillIds?.includes(skill.name));
};

/**
 * Get all experiences that use a specific skill
 * @param skillName - Name of the technical skill
 * @param experiences - Array of all experiences
 * @returns Array of experiences that use this skill
 */
export const getExperiencesForSkill = (
  skillName: string,
  experiences: readonly Experience[],
): readonly Experience[] => {
  return experiences.filter(
    (exp) =>
      exp.skillIds?.includes(skillName) ||
      exp.technologies.some(
        (tech) => tech.toLowerCase() === skillName.toLowerCase(),
      ),
  );
};

/**
 * Validate and update skill years of experience based on experiences
 * @param skill - Technical skill to validate
 * @param experiences - Array of all experiences
 * @returns Updated years of experience if calculated value differs significantly
 */
export const validateSkillExperience = (
  skill: TechnicalSkill,
  experiences: readonly Experience[],
): number | null => {
  const calculated = calculateSkillExperience(skill.name, experiences);

  // If skill has no yearsOfExperience set, return calculated value
  if (!skill.yearsOfExperience) {
    return calculated;
  }

  // If calculated value differs by more than 0.5 years, suggest update
  const difference = Math.abs(calculated - skill.yearsOfExperience);
  if (difference > 0.5) {
    return calculated;
  }

  return null; // No update needed
};
