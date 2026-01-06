# Constants

Centralized constants for colors, strings, and configuration values.

## Structure

```
constants/
├── colors.ts      # Color definitions (hex values, gradients)
├── strings.ts     # String constants (labels, messages, section names)
├── config.ts      # Configuration values (API, scroll, navbar, etc.)
├── index.ts       # Main export file
└── README.md      # This file
```

## Usage

### Colors

```typescript
import { Colors, AccentColors, Gradients } from '../constants';

// Using color constants
<div style={{ color: Colors.ACCENT_PRIMARY }}>Text</div>
<div style={{ background: AccentColors.PRIMARY }}>Background</div>
<div style={{ background: Gradients.ACCENT_FULL }}>Gradient</div>

// Using enum for type safety
import { ColorEnum } from '../constants';
const color = ColorEnum.ACCENT_PRIMARY;
```

### Strings

```typescript
import { Strings, SectionNames, NavLabels, Messages } from '../constants';

// Section names
<h1>{Strings.SECTIONS.ABOUT}</h1>
<h1>{SectionNames.PROJECTS}</h1>

// Navigation labels
<nav>{NavLabels.ABOUT}</nav>

// Messages
<p>{Messages.LOADING}</p>
<p>{Strings.ERRORS.NETWORK}</p>

// Using enum
import { SectionEnum } from '../constants';
const section = SectionEnum.ABOUT;
```

### Configuration

```typescript
import { Config, ApiConfig, ScrollConfig, NavbarConfig } from '../constants';

// API configuration
const timeout = Config.API.TIMEOUT;
const retries = ApiConfig.RETRIES;

// Scroll configuration
const offset = ScrollConfig.OFFSET;

// Navbar configuration
const height = NavbarConfig.HEIGHT;

// Breakpoints
import { Breakpoints, BreakpointEnum } from '../constants';
if (window.innerWidth < Breakpoints.TABLET) {
  // Mobile layout
}
```

## Available Constants

### Colors

- **BaseColors**: `WHITE`, `BLACK`, `TRANSPARENT`
- **AccentColors**: `PRIMARY`, `ALT`, `HOVER`, `LIGHT`, `DARK`, `SECONDARY`, `TERTIARY`
- **BackgroundColors**: Various background color definitions
- **TextColors**: Text color definitions
- **BorderColors**: Border color definitions
- **Gradients**: Predefined gradient strings

### Strings

- **SectionNames**: All section names (`ABOUT`, `PROJECTS`, etc.)
- **NavLabels**: Navigation labels
- **NavIds**: Navigation item IDs
- **SectionIds**: Section anchor IDs
- **SectionHrefs**: Section href values
- **Messages**: Common UI messages
- **ErrorMessages**: Error message strings
- **SuccessMessages**: Success message strings
- **Placeholders**: Input placeholder text
- **AriaLabels**: ARIA label strings
- **LanguageProficiency**: Language proficiency levels

### Configuration

- **ApiConfig**: API timeout, retries, cache settings
- **RetryConfig**: Retry logic configuration
- **ScrollConfig**: Scroll behavior settings
- **NavbarConfig**: Navbar dimensions and behavior
- **AnimationConfig**: Animation durations and transitions
- **LayoutConfig**: Layout spacing and sizing
- **TypographyConfig**: Font families and sizes
- **ZIndex**: Z-index layer definitions
- **Breakpoints**: Responsive breakpoint values
- **IconSizes**: Icon size definitions

## Best Practices

1. **Always use constants** instead of hardcoded values
2. **Import only what you need** to keep bundle size small
3. **Use enums** when you need type safety
4. **Use the combined objects** (`Colors`, `Strings`, `Config`) for convenience
5. **Extend constants** as needed, but keep them organized

## Examples

### Example 1: Using Colors in Component

```typescript
import React from 'react';
import { Colors, Gradients } from '../constants';

const MyComponent: React.FC = () => {
  return (
    <div style={{ 
      background: Gradients.ACCENT_FULL,
      color: Colors.TEXT_ON_ACCENT 
    }}>
      Content
    </div>
  );
};
```

### Example 2: Using Strings for Navigation

```typescript
import { SectionNames, SectionHrefs } from '../constants';

const navItems = [
  { label: SectionNames.ABOUT, href: SectionHrefs.ABOUT },
  { label: SectionNames.PROJECTS, href: SectionHrefs.PROJECTS },
];
```

### Example 3: Using Config for API Calls

```typescript
import { ApiConfig } from '../constants';

async function fetchData() {
  const response = await fetch(url, {
    timeout: ApiConfig.TIMEOUT,
    retries: ApiConfig.RETRIES,
  });
}
```

### Example 4: Responsive Design with Breakpoints

```typescript
import { Breakpoints } from '../constants';

const isMobile = window.innerWidth < Breakpoints.TABLET;
const isDesktop = window.innerWidth >= Breakpoints.DESKTOP;
```

