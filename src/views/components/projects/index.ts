/**
 * Projects Components Index
 * Centralized exports for project components
 *
 * Principles Applied:
 * - DRY: Single source of exports
 * - KISS: Simple barrel export
 */

export {
  ProjectBadge,
  ProjectStatusBadge,
  ProjectCategoryBadge,
} from "./ProjectBadge";
export { ProjectImage } from "./ProjectImage";
export { ProjectLinks } from "./ProjectLinks";
export { ProjectCodeSnippet } from "./ProjectCodeSnippet";
export { ProjectStats } from "./ProjectStats";
export { ProjectCard } from "./ProjectCard";
export { ProjectGrid } from "./ProjectGrid";
export { ProjectGrid as default } from "./ProjectGrid";
