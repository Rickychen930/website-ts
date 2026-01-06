/**
 * Import Path Aliases
 * Centralized path definitions for consistent imports
 *
 * This file defines path aliases that can be used throughout the application
 * Make sure tsconfig.json includes these paths in compilerOptions.paths
 */

/**
 * Path Aliases Configuration
 * Use these constants to maintain consistent import paths
 */
export const ImportPaths = {
  // Root aliases
  ROOT: "@",
  SRC: "@/src",

  // Core directories
  COMPONENTS: "@/components",
  VIEWS: "@/views",
  CONTROLLERS: "@/controllers",
  MODELS: "@/models",
  SERVICES: "@/services",
  UTILS: "@/utils",
  TYPES: "@/types",
  CONSTANTS: "@/constants",
  CONFIG: "@/config",
  ROUTES: "@/routes",
  ASSETS: "@/assets",

  // Specific subdirectories
  VIEWS_COMPONENTS: "@/views/components",
  VIEWS_PAGES: "@/views/pages",
  ASSETS_CSS: "@/assets/css",
  ASSETS_IMAGES: "@/assets/images",
} as const;

/**
 * Helper function to generate import path
 * @param alias - Path alias key
 * @param path - Additional path after alias
 * @returns Full import path
 *
 * @example
 * importPath('COMPONENTS', 'ui/button') // returns '@/components/ui/button'
 */
export function importPath(
  alias: keyof typeof ImportPaths,
  path: string = "",
): string {
  const basePath = ImportPaths[alias];
  return path ? `${basePath}/${path}` : basePath;
}

/**
 * Type for import path aliases
 */
export type ImportPathAlias = keyof typeof ImportPaths;
