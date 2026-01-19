# Quick Design Reference

## Fast lookup guide for developers

> **Quick access**: Design patterns, tokens, dan best practices

---

## 🎨 Design Tokens Quick Reference

### Colors

```typescript
// Primary Actions
primary-600: '#2563eb'  // Buttons, links, highlights
primary-500: '#3b82f6'  // Hover states

// Success/Active
accent-500: '#22c55e'   // Active badges, success indicators

// Text Colors
neutral-900: '#171717'  // Primary text
neutral-700: '#404040'  // Secondary text
neutral-500: '#737373'  // Tertiary text

// Backgrounds
neutral-50: '#fafafa'   // Light background
neutral-100: '#f5f5f5'  // Secondary background
```

### Typography

```css
H1: 3rem (48px), bold          /* Hero names */
H2: 2.25rem (36px), semibold   /* Section titles */
H3: 1.875rem (30px), semibold  /* Subsection titles */
H4: 1.5rem (24px), semibold    /* Card titles */
H5: 1.25rem (20px), semibold   /* Item titles */
Body: 1rem (16px), normal      /* Main content */
Small: 0.875rem (14px)         /* Secondary info */
```

### Spacing

```css
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

### Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

---

## 📦 Component Quick Patterns

### Project Card

```tsx
<Card variant="elevated">
  <div className={styles.header}>
    <Badge>{category}</Badge>
    {isActive && <Badge variant="active">Active</Badge>}
    <Typography variant="h4">{title}</Typography>
    <Typography variant="small">{dateRange}</Typography>
  </div>
  <Typography variant="body">{description}</Typography>
  <TechTags technologies={technologies.slice(0, 5)} />
  <Button href={githubUrl}>GitHub</Button>
</Card>
```

### Experience Item

```tsx
<article className={styles.experienceItem}>
  <TimelineDot />
  <Typography variant="h5">{position}</Typography>
  <Typography variant="body" color="primary">
    {company}
  </Typography>
  <Typography variant="small">📍 {location}</Typography>
  <Typography variant="body">{description}</Typography>
  <ul>
    {achievements.map((a) => (
      <li>{a}</li>
    ))}
  </ul>
  <TechTags technologies={technologies} />
</article>
```

### Skill Badge

```tsx
<div className={styles.skillBadge}>
  <span>{name}</span>
  {showProficiency && <ProficiencyBar level={proficiency} />}
  {yearsOfExperience && <span>{yearsOfExperience} years</span>}
</div>
```

---

## 🎯 Common Patterns

### Empty State

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

### Loading State

```tsx
{isLoading ? (
  <Skeleton count={3} height={200} />
) : (
  // Render content
)}
```

### Error State

```tsx
{error ? (
  <div className={styles.error}>
    <Typography variant="h4">Failed to load</Typography>
    <Button onClick={retry}>Try Again</Button>
  </div>
) : (
  // Render content
)}
```

### Date Formatting

```typescript
formatDateRange(startDate, endDate);
// "Jan 2023 – May 2024" or "Jan 2023 – Present"
```

### Text Truncation

```typescript
truncate(text, 150); // Truncate to 150 chars
```

---

## 📐 Layout Patterns

### Grid Layout

```css
.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Mobile */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

### Section Spacing

```css
.section {
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}
```

### Card Padding

```css
.card {
  padding: 1.5rem;
  border-radius: 0.75rem;
}
```

---

## 🎨 Visual Hierarchy Rules

1. **Primary Info**: Name, title, date (bold, larger)
2. **Secondary Info**: Description, context (normal weight)
3. **Tertiary Info**: Tags, metadata (small, muted)

### Color Usage

- **Primary text**: `neutral-900`
- **Secondary text**: `neutral-700`
- **Tertiary text**: `neutral-500`
- **Links/Highlights**: `primary-600`
- **Active/Success**: `accent-500`

---

## ✅ Component Checklist

Before implementing any component:

- [ ] Uses design tokens (not hardcoded values)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessible (keyboard nav, ARIA labels)
- [ ] Empty state handled
- [ ] Loading state implemented
- [ ] Error state with retry
- [ ] Hover/focus states
- [ ] Consistent spacing
- [ ] Semantic HTML

---

## 📱 Responsive Quick Rules

### Mobile (< 768px)

- Single column
- Stacked cards
- 1rem padding
- Touch-friendly (min 44px buttons)

### Tablet (768px - 1024px)

- 2 columns
- 1.5rem padding

### Desktop (> 1024px)

- 3-4 columns
- 2rem padding
- Hover effects

---

## 🚀 Performance Tips

1. **Lazy load images**: Use `loading="lazy"`
2. **CSS transforms**: Use for animations (better performance)
3. **Will-change**: Use sparingly
4. **Debounce**: For search/filter inputs

---

## 📚 Full Documentation

- **Design Guidelines**: `/docs/UI_UX_DESIGN_GUIDELINES.md`
- **Data Patterns**: `/docs/DATA_VISUALIZATION_PATTERNS.md`
- **Implementation Summary**: `/docs/DESIGN_IMPLEMENTATION_SUMMARY.md`
- **Design Tokens**: `/src/config/design-tokens.ts`
- **Theme**: `/src/config/theme.ts`

---

**Last Updated**: 2025-01-06
