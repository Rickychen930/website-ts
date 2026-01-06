/**
 * Import Examples
 * Professional import patterns and examples
 * 
 * This file demonstrates best practices for imports in the codebase
 * Use these patterns as reference when writing new code
 */

/**
 * Example 1: Component File with All Import Types
 * 
 * Shows proper ordering:
 * 1. External dependencies
 * 2. Internal absolute imports (@/...)
 * 3. Internal relative imports
 * 4. CSS imports
 */
export const EXAMPLE_COMPONENT_IMPORTS = `
// External dependencies
import React, { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Internal absolute imports
import { Colors, Strings, Config } from '@/constants';
import { UserService } from '@/services/user-service';
import { UserProfile } from '@/types/user';
import { MainPageController } from '@/controllers/main-page-controller';
import { logError } from '@/utils/logger';

// Internal relative imports
import BasePage from './base-page';
import { LoadingComponent, ErrorComponent } from '../components/ui';

// CSS imports
import './component.css';
import '@/assets/css/global.css';
`.trim();

/**
 * Example 2: Utility File
 * 
 * Shows imports for utility/helper files
 */
export const EXAMPLE_UTILITY_IMPORTS = `
// External dependencies
import axios from 'axios';

// Internal absolute imports
import { ApiConfig, RetryConfig } from '@/constants';
import { logError, logInfo } from '@/utils/logger';

// Type imports
import type { ApiResponse, ApiError } from '@/types/api';
`.trim();

/**
 * Example 3: Controller File
 * 
 * Shows imports for controller/business logic files
 */
export const EXAMPLE_CONTROLLER_IMPORTS = `
// Internal absolute imports
import { UserService } from '@/services/user-service';
import { SectionManager, ISectionConfig } from '@/models/section-model';
import { UserProfile } from '@/types/user';
import { logError } from '@/utils/logger';
import { NavbarItemType } from '@/types/navbar';
`.trim();

/**
 * Example 4: Model File
 * 
 * Shows imports for model/data files
 */
export const EXAMPLE_MODEL_IMPORTS = `
// Internal absolute imports
import { UserProfile } from '@/types/user';
import { SectionConfig } from '@/types/section';
`.trim();

/**
 * Example 5: Service File
 * 
 * Shows imports for service/API files
 */
export const EXAMPLE_SERVICE_IMPORTS = `
// External dependencies
import axios from 'axios';

// Internal absolute imports
import { ApiConfig } from '@/constants';
import { apiClient } from '@/services/api';
import { logError } from '@/utils/logger';

// Type imports
import type { UserProfile, ApiResponse } from '@/types';
`.trim();

/**
 * Example 6: Type Definition File
 * 
 * Shows imports for type definition files
 */
export const EXAMPLE_TYPE_IMPORTS = `
// External dependencies (types only)
import type { ReactNode } from 'react';

// Internal absolute imports (types)
import type { UserProfile } from '@/types/user';
import type { SectionConfig } from '@/types/section';
`.trim();

/**
 * Example 7: Constants File
 * 
 * Shows imports for constants files
 */
export const EXAMPLE_CONSTANTS_IMPORTS = `
// Usually no imports needed, or minimal type imports
import type { ColorValue } from './types';
`.trim();

/**
 * Example 8: Test File
 * 
 * Shows imports for test files
 */
export const EXAMPLE_TEST_IMPORTS = `
// External dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Internal absolute imports
import { ComponentName } from '@/components/component-name';
import { Colors } from '@/constants';

// Internal relative imports
import { helperFunction } from './test-helpers';
`.trim();

/**
 * Common Import Patterns
 */
export const IMPORT_PATTERNS = {
  // Named imports from constants
  CONSTANTS: "import { Colors, Strings, Config } from '@/constants';",
  
  // Default + named imports
  MIXED: "import React, { useState, useEffect } from 'react';",
  
  // Type-only imports
  TYPES: "import type { UserProfile } from '@/types/user';",
  
  // Namespace imports (avoid when possible)
  NAMESPACE: "import * as Utils from '@/utils';",
  
  // Barrel exports
  BARREL: "import { Button, Card, Input } from '@/components/ui';",
  
  // CSS imports
  CSS: "import './component.css';",
  CSS_ABSOLUTE: "import '@/assets/css/global.css';",
} as const;

/**
 * Anti-patterns (Don't do this)
 */
export const ANTI_PATTERNS = {
  // Deep relative paths
  DEEP_RELATIVE: "import { helper } from '../../../../utils/helper';",
  
  // Mixed import order
  MIXED_ORDER: `
import './component.css';
import React from 'react';
import { Component } from './component';
  `.trim(),
  
  // Namespace import for constants
  NAMESPACE_CONSTANTS: "import * as Constants from '@/constants';",
  
  // No grouping
  NO_GROUPING: `
import React from 'react';
import { Colors } from '@/constants';
import { Component } from './component';
import axios from 'axios';
import './component.css';
  `.trim(),
} as const;

