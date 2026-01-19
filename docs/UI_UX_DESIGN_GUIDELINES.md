# UI/UX Design Guidelines

## Senior Full-Stack Engineer Portfolio - Design System

> **Last Updated**: 2025-01-06  
> **Designer**: Senior UI/UX Designer  
> **Purpose**: Comprehensive design guidelines for displaying profile data optimally

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Visual Hierarchy](#visual-hierarchy)
3. [Component Design Specifications](#component-design-specifications)
4. [Data Visualization Patterns](#data-visualization-patterns)
5. [Responsive Design](#responsive-design)
6. [Accessibility Guidelines](#accessibility-guidelines)
7. [Color & Typography](#color--typography)
8. [Spacing & Layout](#spacing--layout)

---

## 🎨 Design Philosophy

### Core Principles

1. **Data-Driven Design**
   - Every UI element serves to effectively communicate data
   - Prioritize clarity and readability over decoration
   - Use progressive disclosure for complex information

2. **User-Centric**
   - Focus on what users want to see: skills, projects, experience
   - Minimize cognitive load with clear visual hierarchy
   - Enable quick scanning of information

3. **Professional & Modern**
   - Clean, minimalist aesthetic
   - Consistent use of design tokens
   - Subtle animations that enhance, not distract

4. **Performance-First**
   - Optimize for fast loading
   - Lazy load images and heavy content
   - Progressive enhancement

---

## 📊 Visual Hierarchy

### Information Priority (Top to Bottom)

1. **Hero Section** (First Impression)
   - Name, Title, Location
   - Brief Bio
   - Call-to-Action buttons
   - Social links

2. **Featured Projects** (Portfolio Showcase)
   - 3-6 most impressive projects
   - Visual cards with images
   - Clear call-to-action

3. **Statistics** (Credibility)
   - Key metrics (Years, Projects, Users)
   - Visual emphasis on numbers

4. **Experience Timeline** (Professional Journey)
   - Reverse chronological order
   - Clear dates and durations
   - Technologies used

5. **Skills & Expertise** (Technical Capabilities)
   - Categorized by type
   - Proficiency indicators
   - Years of experience

6. **Education & Certifications** (Credentials)
   - Clear institution names
   - Dates and credentials

7. **Testimonials** (Social Proof)
   - Real quotes from colleagues
   - Names, roles, companies

---

## 🧩 Component Design Specifications

### 1. Hero Section

**Purpose**: Create strong first impression

**Data to Display**:

- `name` (H1, 3xl-5xl)
- `title` (H3, xl-2xl)
- `location` (Body, with icon)
- `bio` (Body, 2-3 lines max)

**Design Requirements**:

```css
/* Visual Hierarchy */
.name {
  font-size: 3rem;
  font-weight: 700;
  color: primary-900;
}
.title {
  font-size: 1.5rem;
  font-weight: 500;
  color: neutral-700;
}
.location {
  font-size: 1rem;
  color: neutral-600;
  display: flex;
  align-items: center;
}
.bio {
  font-size: 1.125rem;
  line-height: 1.75;
  color: neutral-600;
  max-width: 700px;
}
```

**Best Practices**:

- Left-align on desktop, center on mobile
- Use gradient background for visual interest
- Add subtle animation on load
- CTA buttons: Primary (View Projects) and Secondary (Get in Touch)

---

### 2. Project Cards

**Purpose**: Showcase portfolio projects effectively

**Data Structure**:

```typescript
{
  (title, // H4, semibold
    category, // Badge (web/mobile/ai/backend/fullstack/other)
    startDate, // Small text, tertiary
    endDate, // Small text, tertiary (if exists)
    description, // Body text, 2-3 lines
    technologies, // Tags (max 5 visible, +X more)
    achievements, // Bullet list (max 2-3 shown)
    githubUrl, // Button
    liveUrl, // Button
    isActive); // Badge indicator
}
```

**Design Layout**:

```
┌─────────────────────────────────────┐
│ [Category] [Active]                 │
│                                     │
│ Project Title (H4)                  │
│ Date Range                          │
│                                     │
│ Description text...                 │
│                                     │
│ [Tech] [Tech] [Tech] [+X]           │
│                                     │
│ • Achievement 1                     │
│ • Achievement 2                     │
│                                     │
│ [GitHub] [Live Demo]                │
└─────────────────────────────────────┘
```

**Visual Specs**:

- Card padding: 1.5rem (24px)
- Border radius: 0.75rem (12px)
- Shadow: `shadows.lg` on hover
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Gap: 1.5rem (24px)

**States**:

- Default: Elevated card
- Hover: Lift effect, show all achievements
- Active badge: Green accent color
- Category badge: Muted background, small text

---

### 3. Experience Timeline

**Purpose**: Show professional journey chronologically

**Data Structure**:

```typescript
{
  (position, // H5, semibold
    company, // Body, primary color, medium weight
    location, // Small, with location icon
    startDate, // Formatted date range
    endDate, // "Present" if isCurrent
    isCurrent, // Badge
    description, // Body text
    achievements, // Bullet list
    technologies); // Tech tags
}
```

**Design Layout**:

```
Timeline:
    │
    ●  Current Position (H5)
    │  Company Name (primary)
    │  📍 Location
    │  Date Range | Duration
    │  [Current Badge]
    │
    │  Description text...
    │
    │  • Achievement 1
    │  • Achievement 2
    │
    │  [Tech] [Tech] [Tech]
    │
    ●  Previous Position
    │  ...
```

**Visual Specs**:

- Timeline line: 2px solid, neutral-200
- Timeline dot: 12px circle, primary-500
- Current position: Primary color accent
- Spacing between items: 3rem (48px)
- Max width: 800px

---

### 4. Skills Display

**Purpose**: Show technical expertise clearly

**Data Structure**:

```typescript
{
  (name, // Skill name
    category, // language/framework/database/tool/cloud/other
    proficiency, // expert/advanced/intermediate/beginner
    yearsOfExperience); // Optional number
}
```

**Design Patterns**:

#### Pattern A: Grid with Proficiency Bars

```
┌─────────────────────────────────────┐
│ Programming Languages               │
├─────────────────────────────────────┤
│ Python                    ████████  │ Advanced (4 years)
│ Swift                     ████████  │ Advanced (3 years)
│ TypeScript                ████████  │ Advanced (2 years)
│ C++                       ███████   │ Advanced (4 years)
└─────────────────────────────────────┘
```

#### Pattern B: Category Cards

```
┌─────────────────┐  ┌─────────────────┐
│ Languages       │  │ Frameworks      │
├─────────────────┤  ├─────────────────┤
│ Python          │  │ React           │
│ Swift           │  │ Node.js         │
│ TypeScript      │  │ Express.js      │
│ JavaScript      │  │ SwiftUI         │
│ C++             │  │ UIKit           │
└─────────────────┘  └─────────────────┘
```

**Visual Specs**:

- Proficiency bar: 100px width, 4px height
- Color mapping:
  - Expert: `accent-600` (green)
  - Advanced: `primary-600` (blue)
  - Intermediate: `warning-500` (orange)
  - Beginner: `neutral-400` (gray)
- Category headers: H4, semibold
- Grid: 2-3 columns on desktop

---

### 5. Academic & Certifications

**Purpose**: Display credentials professionally

#### Academic Item Design:

```
┌─────────────────────────────────────┐
│ Master of Artificial Intelligence   │
│ University of Technology Sydney     │
│ Field: Artificial Intelligence      │
│ 2025 – 2027                         │
│                                     │
│ Description text...                 │
└─────────────────────────────────────┘
```

#### Certification Card Design:

```
┌─────────────────────────────────────┐
│ iOS & Swift Development             │
│ Udemy                               │
│                                     │
│ Issued: Feb 2023                    │
│ Credential ID: UDEMY-IOS-SWIFT-2023 │
│                                     │
│ [View Credential →]                 │
└─────────────────────────────────────┘
```

**Visual Specs**:

- Card variant: Elevated
- Spacing: 1.5rem padding
- Grid: 2 columns desktop, 1 mobile
- Links: Primary color, underline on hover

---

### 6. Honors & Awards

**Purpose**: Highlight achievements

**Design**:

```
┌─────────────────────────────────────┐
│ 3rd Place – Competitive Programming │
│ Widyatama International Coding      │
│                                     │
│ Jan 2021                            │
│                                     │
│ Description of achievement...       │
│                                     │
│ [Learn More →]                      │
└─────────────────────────────────────┘
```

**Visual Specs**:

- Trophy/medal icon: Optional decorative element
- Emphasis on title
- Muted issuer name
- Clickable if URL exists

---

### 7. Statistics Cards

**Purpose**: Display key metrics

**Design**:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│      2+         │  │       8         │  │     1M+         │
│ Years of        │  │ Projects        │  │ Users           │
│ Experience      │  │ Delivered       │  │ Impacted        │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Visual Specs**:

- Large number: 3xl (3rem), bold, primary color
- Label: base size, secondary color
- Card: Subtle background, centered text
- Grid: 3 columns, responsive

---

### 8. Testimonials

**Purpose**: Build trust with social proof

**Design**:

```
┌─────────────────────────────────────┐
│ "Quote text here..."                │
│                                     │
│ ──                                  │
│ Name Surname                        │
│ Role                                │
│ Company                             │
│                                     │
│ Date                                │
└─────────────────────────────────────┘
```

**Visual Specs**:

- Quote mark: Large decorative element
- Text: Italic, body size
- Author: Bold, name only
- Role/Company: Smaller, secondary color
- Card: Elevated, max-width 400px
- Grid: 2-3 columns

---

## 📱 Responsive Design

### Breakpoints

```typescript
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

### Layout Adaptations

#### Mobile (< 768px)

- Single column layouts
- Stacked cards
- Reduced padding (1rem)
- Smaller font sizes
- Touch-friendly buttons (min 44px height)
- Collapsible sections

#### Tablet (768px - 1024px)

- 2-column grids where appropriate
- Medium padding (1.5rem)
- Balanced font sizes

#### Desktop (> 1024px)

- Multi-column grids (3-4 columns)
- Full padding (2rem)
- Optimal font sizes
- Hover effects enabled

---

## 🎨 Color & Typography

### Color Usage

**Primary Colors** (Tech Blue):

- `primary-600`: Main actions, links, highlights
- `primary-500`: Hover states
- `primary-700`: Active states

**Accent Colors** (Terminal Green):

- `accent-500`: Success indicators, active badges
- `accent-600`: High proficiency skills

**Neutral Colors**:

- `neutral-900`: Primary text
- `neutral-700`: Secondary text
- `neutral-500`: Tertiary text, labels
- `neutral-200`: Borders, dividers
- `neutral-50`: Backgrounds

### Typography Hierarchy

```css
H1: 3rem (48px), bold, neutral-900      /* Hero name */
H2: 2.25rem (36px), semibold            /* Section titles */
H3: 1.875rem (30px), semibold           /* Subsection titles */
H4: 1.5rem (24px), semibold             /* Card titles */
H5: 1.25rem (20px), semibold            /* Item titles */
Body: 1rem (16px), normal               /* Main content */
Small: 0.875rem (14px), normal          /* Secondary info */
Caption: 0.75rem (12px), normal         /* Labels, dates */
```

### Font Families

- **Sans-serif**: Inter (primary), system fallbacks
- **Monospace**: JetBrains Mono (code snippets)

---

## 📏 Spacing & Layout

### Spacing Scale

```css
xs: 0.25rem (4px)   /* Tight spacing */
sm: 0.5rem (8px)    /* Small gaps */
md: 1rem (16px)     /* Default spacing */
lg: 1.5rem (24px)   /* Card padding */
xl: 2rem (32px)     /* Section padding */
2xl: 3rem (48px)    /* Large sections */
3xl: 4rem (64px)    /* Hero spacing */
```

### Layout Patterns

**Section Spacing**:

```css
.section {
  padding-top: 4rem;
  padding-bottom: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}
```

**Card Grids**:

```css
.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

**Content Width**:

- Full width: 100%
- Container: max-width 1200px
- Text content: max-width 700px (optimal reading width)

---

## ♿ Accessibility Guidelines

### WCAG 2.1 AA Compliance

1. **Color Contrast**
   - Text on background: Minimum 4.5:1
   - Large text: Minimum 3:1
   - Interactive elements: Minimum 3:1

2. **Keyboard Navigation**
   - All interactive elements keyboard accessible
   - Visible focus indicators
   - Logical tab order

3. **Screen Readers**
   - Semantic HTML (`<article>`, `<section>`, `<nav>`)
   - ARIA labels where needed
   - Alt text for images
   - Descriptive link text

4. **Responsive Text**
   - Minimum 16px base font size
   - Scalable up to 200% without horizontal scroll
   - Readable line height (1.5+)

---

## 🚀 Performance Optimization

### Image Optimization

- Use WebP format with fallbacks
- Lazy loading for below-fold images
- Responsive images with srcset
- Placeholders for loading states

### Animation Guidelines

- Prefer CSS transforms over position/width changes
- Use `will-change` sparingly
- Max animation duration: 500ms
- Respect `prefers-reduced-motion`

### Loading States

- Skeleton screens for content
- Progressive loading
- Error states with retry options

---

## 📐 Component Spacing Reference

### Card Components

```
┌─────────────────────────────────┐
│ Padding: 1.5rem (24px)          │
│                                 │
│ [Content]                       │
│                                 │
│ Gap: 1rem (16px)                │
│                                 │
│ [Actions]                       │
│                                 │
└─────────────────────────────────┘
```

### List Items

```
Item 1
├─ Spacing: 1rem (16px)
Item 2
├─ Spacing: 1rem (16px)
Item 3
```

### Section Spacing

```
[Previous Section]
├─ Margin-bottom: 4rem (64px)
[Current Section]
├─ Padding: 2rem (32px) vertical
[Next Section]
```

---

## 🎯 Best Practices Checklist

### For Each Component:

- [ ] Uses design tokens (colors, spacing, typography)
- [ ] Responsive on all breakpoints
- [ ] Accessible (keyboard, screen reader, contrast)
- [ ] Loading states implemented
- [ ] Error states handled gracefully
- [ ] Hover/focus states defined
- [ ] Consistent spacing and alignment
- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Performance optimized

### For Data Display:

- [ ] Empty states handled
- [ ] Truncation for long text
- [ ] Date formatting consistent
- [ ] Numbers formatted properly
- [ ] Links are obvious and clickable
- [ ] Images have alt text
- [ ] Loading indicators visible

---

## 📚 Component Implementation Examples

### Example: Project Card Implementation

```tsx
<Card variant="elevated" className={styles.projectCard}>
  {/* Header */}
  <div className={styles.header}>
    <div className={styles.badges}>
      <Badge variant="category">{project.category}</Badge>
      {project.isActive && <Badge variant="active">Active</Badge>}
    </div>
    <Typography variant="h4" weight="semibold">
      {project.title}
    </Typography>
    <Typography variant="small" color="tertiary">
      {formatDateRange(project.startDate, project.endDate)}
    </Typography>
  </div>

  {/* Content */}
  <div className={styles.content}>
    <Typography variant="body" color="secondary">
      {truncate(project.description, 150)}
    </Typography>

    {/* Technologies */}
    <div className={styles.technologies}>
      {project.technologies.slice(0, 5).map((tech) => (
        <TechTag key={tech}>{tech}</TechTag>
      ))}
      {project.technologies.length > 5 && (
        <TechTag>+{project.technologies.length - 5}</TechTag>
      )}
    </div>

    {/* Achievements */}
    {project.achievements.length > 0 && (
      <ul className={styles.achievements}>
        {project.achievements.slice(0, 2).map((achievement, i) => (
          <li key={i}>
            <Typography variant="small">{achievement}</Typography>
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Footer Actions */}
  <div className={styles.footer}>
    {project.githubUrl && (
      <Button variant="outline" size="sm" href={project.githubUrl}>
        GitHub
      </Button>
    )}
    {project.liveUrl && (
      <Button variant="primary" size="sm" href={project.liveUrl}>
        Live Demo
      </Button>
    )}
  </div>
</Card>
```

---

## 🎨 Design Tokens Usage

Always use design tokens instead of hardcoded values:

```css
/* ✅ Good */
.title {
  color: var(--color-primary-600);
  font-size: var(--font-size-2xl);
  padding: var(--spacing-lg);
}

/* ❌ Bad */
.title {
  color: #2563eb;
  font-size: 24px;
  padding: 24px;
}
```

---

## 📝 Notes for Developers

1. **Consistency is Key**: Follow these guidelines strictly
2. **Mobile-First**: Design for mobile, enhance for desktop
3. **Performance Matters**: Optimize images, lazy load, use CSS transforms
4. **Accessibility First**: Test with keyboard and screen readers
5. **Data-Driven**: Let the data guide the design, not the other way around

---

## 🔄 Version History

- **v1.0** (2025-01-06): Initial design guidelines created
- Matches improved data structure from seed data
- Aligned with existing design tokens and theme system

---

**Questions or suggestions?** Refer to design tokens in `/src/config/design-tokens.ts`
