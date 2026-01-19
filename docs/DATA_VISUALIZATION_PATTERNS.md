# Data Visualization Patterns

## Optimized Patterns for Displaying Profile Data

> **Purpose**: Specific patterns and best practices for displaying each type of profile data effectively

---

## 📊 Data Types & Visualization Strategies

### 1. Academics (Education)

**Data Structure**:

```typescript
{
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
}
```

**Visualization Pattern**: **Timeline Card**

```
┌────────────────────────────────────────────┐
│ 🎓 Master of Artificial Intelligence       │
│                                            │
│ University of Technology Sydney – Australia│
│ Field: Artificial Intelligence             │
│                                            │
│ 📅 2025 – 2027                             │
│                                            │
│ Description: Master of Artificial          │
│ Intelligence | Specializing in machine...  │
└────────────────────────────────────────────┘
```

**Design Decisions**:

- ✅ Degree as primary title (most important)
- ✅ Institution in primary color (branding)
- ✅ Field as tertiary info (context)
- ✅ Date range with calendar icon
- ✅ Description below (collapsible if long)
- ✅ Reverse chronological order (newest first)

**Responsive Behavior**:

- Desktop: Full width card (max 800px)
- Mobile: Full width, stacked layout

---

### 2. Certifications

**Data Structure**:

```typescript
{
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}
```

**Visualization Pattern**: **Credential Card**

```
┌────────────────────────────────────────────┐
│ 📜 iOS & Swift Development                 │
│                                            │
│ Issued by: Udemy                          │
│                                            │
│ ┌──────────────────────────────────────┐  │
│ │ Issued: Feb 2023                     │  │
│ │ Expires: --                          │  │
│ │ Credential ID: UDEMY-IOS-SWIFT-2023  │  │
│ └──────────────────────────────────────┘  │
│                                            │
│ [🔗 View Credential →]                    │
└────────────────────────────────────────────┘
```

**Design Decisions**:

- ✅ Certification icon as visual anchor
- ✅ Credential info in bordered box (emphasizes importance)
- ✅ Expiry date only if exists (optional)
- ✅ Clickable link if URL available
- ✅ Grid layout: 2-3 columns

**Visual Hierarchy**:

1. Name (H5, semibold)
2. Issuer (body, secondary)
3. Dates & ID (small, in box)
4. Link (if available)

---

### 3. Experiences (Work History)

**Data Structure**:

```typescript
{
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}
```

**Visualization Pattern**: **Vertical Timeline with Cards**

```
Timeline Visualization:
    │
    ●  Software Engineer (H5)
    │  Samsung R&D Institute – Jakarta
    │  📍 Jakarta, Indonesia
    │
    │  May 2023 – May 2024 | 1 year
    │  [Current Badge] (if applicable)
    │
    │  Description text explaining the role...
    │
    │  Achievements:
    │  • Developed TV Plugin for SmartThings...
    │  • Contributed to One UI 6 enhancements...
    │  • Improved UX for millions of users...
    │
    │  Technologies: [TypeScript] [Node.js] [REST APIs]
    │
    ●  Software Engineer
    │  Apple Developer Academy
    │  ...
```

**Design Decisions**:

- ✅ Timeline provides visual chronology
- ✅ Current position highlighted (primary color)
- ✅ Position as title, company below
- ✅ Location always visible (with icon)
- ✅ Duration calculated and shown
- ✅ Achievements as bullet list (maximum 4 shown)
- ✅ Technologies as tags (all visible)

**States**:

- Current: Green accent border, "Current" badge
- Past: Standard styling
- Hover: Subtle lift effect

---

### 4. Projects

**Data Structure**:

```typescript
{
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'backend' | 'fullstack' | 'other';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  achievements: string[];
  architecture?: string;
}
```

**Visualization Pattern**: **Interactive Project Card**

```
┌──────────────────────────────────────────────┐
│ [fullstack] [Active]                         │
│                                              │
│ giftforyou.idn                               │
│ Full-stack e-commerce platform...            │
│                                              │
│ Jan 2025 – Present                           │
│                                              │
│ [React] [TypeScript] [Express.js] [MongoDB]  │
│ [+2 more]                                    │
│                                              │
│ • Built production-ready e-commerce...       │
│ • Implemented secure authentication...       │
│                                              │
│ [GitHub] [Live Demo] [View Details]          │
└──────────────────────────────────────────────┘
```

**Design Decisions**:

- ✅ Category and status badges at top (quick scan)
- ✅ Title as H4 (prominent)
- ✅ Description truncated (150 chars), expand on click
- ✅ Technologies: Show 5, indicate more
- ✅ Achievements: Show 2-3, expand for more
- ✅ Actions: GitHub, Live Demo, Details (if available)
- ✅ Active projects: Green accent, "Active" badge

**Grid Layout**:

- Desktop: 3 columns (grid-template-columns: repeat(3, 1fr))
- Tablet: 2 columns
- Mobile: 1 column

**Interaction States**:

- Hover: Lift card, show full description preview
- Click: Expand for full details (modal or expanded view)

---

### 5. Technical Skills

**Data Structure**:

```typescript
{
  name: string;
  category: 'language' | 'framework' | 'database' | 'tool' | 'cloud' | 'other';
  proficiency: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  yearsOfExperience?: number;
}
```

**Visualization Pattern**: **Categorized Skill Grid with Proficiency**

#### Option A: Proficiency Bars (Detailed)

```
Programming Languages
┌────────────────────────────────────────┐
│ Python              ████████  75%      │
│                     4 years            │
│                                         │
│ Swift               ████████  75%      │
│                     3 years            │
│                                         │
│ TypeScript          ████████  75%      │
│                     2 years            │
└────────────────────────────────────────┘
```

#### Option B: Skill Badges (Compact)

```
Programming Languages
[Python • 4yr] [Swift • 3yr] [TypeScript • 2yr]
[JavaScript • 3yr] [C++ • 4yr] [Java • 2yr]
```

**Design Decisions**:

- ✅ Group by category (better organization)
- ✅ Show proficiency visually (bar or color)
- ✅ Years of experience if available
- ✅ Sort by proficiency (expert → beginner) or alphabetically

**Proficiency Color Mapping**:

- Expert: `accent-600` (green) - 100% bar
- Advanced: `primary-600` (blue) - 75% bar
- Intermediate: `warning-500` (orange) - 50% bar
- Beginner: `neutral-400` (gray) - 25% bar

**Layout**:

- Category headers: H4, semibold
- Grid: 2-3 columns per category
- Responsive: Stacks on mobile

---

### 6. Soft Skills

**Data Structure**:

```typescript
{
  name: string;
  category: "leadership" |
    "communication" |
    "problem-solving" |
    "collaboration" |
    "adaptability" |
    "other";
}
```

**Visualization Pattern**: **Category Pills**

```
Soft Skills

[Leadership] [Problem Solving] [Collaboration]
[Communication] [Adaptability] [Analytical Thinking]
```

**Design Decisions**:

- ✅ Simple pill/badge style
- ✅ Grouped by category (optional)
- ✅ Muted background, readable text
- ✅ No hierarchy (all equally important)

**Alternative**: **Card with Icons**

```
┌────────────────┐  ┌────────────────┐
│ 🤝             │  │ 🔧             │
│ Collaboration  │  │ Problem        │
│                │  │ Solving        │
└────────────────┘  └────────────────┘
```

---

### 7. Languages

**Data Structure**:

```typescript
{
  name: string;
  proficiency: "native" |
    "fluent" |
    "professional" |
    "conversational" |
    "basic";
}
```

**Visualization Pattern**: **Language Badges with Proficiency**

```
Languages

🇮🇩 Bahasa Indonesia      Native
🇬🇧 English                Professional Working Proficiency
```

**Design Decisions**:

- ✅ Flag emoji as visual identifier (if applicable)
- ✅ Language name: Bold
- ✅ Proficiency: Secondary text, descriptive
- ✅ Native proficiency: Highlighted (primary color)
- ✅ Simple list format

---

### 8. Honors & Awards

**Data Structure**:

```typescript
{
  title: string;
  issuer: string;
  date: string;
  description?: string;
  url?: string;
}
```

**Visualization Pattern**: **Achievement Card**

```
┌────────────────────────────────────────────┐
│ 🥉 3rd Place – Competitive Programming     │
│                                            │
│ Widyatama International Coding Competition │
│                                            │
│ Jan 2021                                   │
│                                            │
│ Ranked 3rd in a Southeast Asia-wide coding │
│ competition. Collaborated in a team to...  │
│                                            │
│ [🔗 Learn More →]                          │
└────────────────────────────────────────────┘
```

**Design Decisions**:

- ✅ Trophy/medal emoji for visual interest
- ✅ Title emphasized (achievement name)
- ✅ Issuer secondary (who gave it)
- ✅ Date prominent (when)
- ✅ Description if available (context)
- ✅ Link if URL exists

**Layout**:

- Grid: 2-3 columns
- Card variant: Elevated
- Most recent first (reverse chronological)

---

### 9. Statistics

**Data Structure**:

```typescript
{
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
}
```

**Visualization Pattern**: **Stat Card**

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│                  │  │                  │  │                  │
│       2+         │  │        8         │  │      1M+         │
│                  │  │                  │  │                  │
│ Years of         │  │ Projects         │  │ Users            │
│ Experience       │  │ Delivered        │  │ Impacted         │
│                  │  │                  │  │                  │
│ Professional...  │  │ Successfully...  │  │ Total users...   │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

**Design Decisions**:

- ✅ Large number: 3xl (3rem), bold, primary color
- ✅ Label: Body size, secondary color
- ✅ Description: Small text, tertiary (optional)
- ✅ Centered alignment
- ✅ Equal width cards in grid
- ✅ Subtle background, no border

**Animation** (Optional):

- Count-up animation on scroll into view
- Duration: 1-2 seconds

---

### 10. Testimonials

**Data Structure**:

```typescript
{
  author: string;
  role: string;
  company: string;
  content: string;
  date: string;
  avatarUrl?: string;
}
```

**Visualization Pattern**: **Testimonial Card with Quote**

```
┌────────────────────────────────────────────┐
│                                            │
│  "I had the pleasure of working alongside  │
│   Ricky at Apple Developer Academy. As a   │
│   highly skilled programmer..."            │
│                                            │
│  ──                                        │
│                                            │
│  Latifah Munawaroh                        │
│  Data Scientist                            │
│  Apple Developer Academy | Digital Talent  │
│                                            │
│  Nov 2024                                  │
│                                            │
└────────────────────────────────────────────┘
```

**Design Decisions**:

- ✅ Quote marks (large decorative)
- ✅ Content: Italic, body size
- ✅ Author: Bold, H5 size
- ✅ Role/Company: Smaller, secondary
- ✅ Date: Small, tertiary
- ✅ Avatar: Circular image if available
- ✅ Max width: 400px (optimal reading width)

**Layout**:

- Grid: 2-3 columns
- Alternating styles (optional): Left/right alignment
- Carousel option for mobile (if many testimonials)

---

## 🎯 Data Display Best Practices

### 1. Progressive Disclosure

**Principle**: Show summary first, details on demand

**Implementation**:

- Project descriptions: Truncate to 150 chars, expand on click
- Achievements: Show 2-3, expand for full list
- Technologies: Show 5, indicate more
- Long descriptions: Collapsible sections

### 2. Empty States

**Pattern**: Friendly message when no data

```tsx
{items.length === 0 ? (
  <div className={styles.empty}>
    <Typography variant="h4" color="secondary">
      No items available
    </Typography>
    <Typography variant="body" color="tertiary">
      Content will be available soon.
    </Typography>
  </div>
) : (
  // Render items
)}
```

### 3. Loading States

**Pattern**: Skeleton screens

```tsx
{isLoading ? (
  <Skeleton count={3} height={200} />
) : (
  // Render content
)}
```

### 4. Error States

**Pattern**: Clear error message with retry

```tsx
{error ? (
  <div className={styles.error}>
    <Typography variant="h4">Failed to load</Typography>
    <Typography variant="body" color="secondary">
      {error.message}
    </Typography>
    <Button onClick={retry}>Try Again</Button>
  </div>
) : (
  // Render content
)}
```

### 5. Date Formatting

**Consistent Formats**:

- Full dates: "January 2023" or "Jan 2023"
- Date ranges: "Jan 2023 – May 2024"
- Durations: "1 year", "2 years 3 months"
- Current: "Jan 2023 – Present"

**Implementation**:

```typescript
formatDateRange(startDate, endDate);
// Returns: "Jan 2023 – May 2024" or "Jan 2023 – Present"
```

### 6. Number Formatting

**Large Numbers**:

- 1,000,000 → "1M+"
- 1,000 → "1K+"
- Less than 1,000 → Show actual number

**Implementation**:

```typescript
formatNumber(value);
// 1000000 → "1M+"
// 8500 → "8.5K+"
// 125 → "125"
```

---

## 📱 Responsive Patterns

### Mobile (< 768px)

- Single column layouts
- Stacked cards
- Reduced padding (1rem)
- Touch-friendly buttons (min 44px)
- Truncated text more aggressively
- Collapsible sections

### Tablet (768px - 1024px)

- 2-column grids
- Medium padding (1.5rem)
- Balanced truncation

### Desktop (> 1024px)

- Multi-column grids (3-4 columns)
- Full padding (2rem)
- Show more content by default
- Hover effects enabled

---

## 🎨 Visual Hierarchy Rules

### Priority Order (Within Each Component):

1. **Primary Information**
   - Name/Title
   - Date/Time
   - Status indicators

2. **Secondary Information**
   - Descriptions
   - Context (location, company)
   - Metadata

3. **Tertiary Information**
   - Tags
   - Links
   - Additional details

### Typography Hierarchy:

- **H1-H2**: Never use in cards (too large)
- **H3-H4**: Card titles
- **H5**: Item titles
- **Body**: Descriptions
- **Small**: Metadata, dates
- **Caption**: Labels, tags

---

## ✅ Checklist for Data Display

### Before Implementing Any Component:

- [ ] Data structure matches TypeScript interface
- [ ] Empty states handled
- [ ] Loading states implemented
- [ ] Error states with retry option
- [ ] Responsive on all breakpoints
- [ ] Dates formatted consistently
- [ ] Numbers formatted (if applicable)
- [ ] Text truncation where needed
- [ ] Progressive disclosure for long content
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Visual hierarchy clear
- [ ] Consistent with design tokens

---

## 🔄 Data Flow Pattern

```
Backend Data
    ↓
Transform (add IDs, format dates)
    ↓
ProfileModel (domain model)
    ↓
React Components
    ↓
Display with styling
    ↓
User Interaction
    ↓
Optional: Expand/Filter/Sort
```

---

**Next Steps**: Refer to component implementations in `/src/views/components/domain/`
