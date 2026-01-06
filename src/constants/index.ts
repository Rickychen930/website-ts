/**
 * Constants Index
 * Main export file for all constants
 * 
 * Usage:
 * import { Colors, Strings, Config } from '@/constants';
 * import { SectionNames, AccentColors } from '@/constants';
 */

// Import first (all imports must be at the top)
import { Colors } from './colors';
import { Strings } from './strings';
import { Config } from './config';
import { ImportPaths } from './import-paths';

// Colors
export * from './colors';
export { Colors, AccentColors, BackgroundColors, TextColors, BorderColors, Gradients, ColorEnum } from './colors';

// Strings
export * from './strings';
export { Strings, SectionNames, NavLabels, NavIds, SectionIds, SectionHrefs, Messages, ErrorMessages, SuccessMessages, ActionLabels, SectionTitles, SEOLabels, SectionEnum, MessageEnum, AriaLabels } from './strings';

// Config
export * from './config';
export { Config, ApiConfig, RetryConfig, ScrollConfig, NavbarConfig, AnimationConfig, LayoutConfig, TypographyConfig, ZIndex, Breakpoints, IconSizes, ZIndexEnum, BreakpointEnum } from './config';

// Import utilities
export * from './import-paths';
export { ImportPaths, importPath } from './import-paths';

/**
 * Re-export commonly used constants for convenience
 */
export const Constants = {
  Colors,
  Strings,
  Config,
  ImportPaths,
} as const;

