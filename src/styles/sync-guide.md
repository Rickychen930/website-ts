# Design System Sync Guide

## CSS Variables Usage

Semua komponen HARUS menggunakan CSS variables dari `design-tokens.css` untuk konsistensi.

### Colors

- `var(--color-primary-500)` - Primary blue
- `var(--color-accent-500)` - Accent green
- `var(--text-primary)` - Main text color
- `var(--text-secondary)` - Secondary text
- `var(--bg-primary)` - Main background
- `var(--bg-card)` - Card background
- `var(--border-primary)` - Border color

### Spacing

- `var(--spacing-xs)` - 4px
- `var(--spacing-sm)` - 8px
- `var(--spacing-md)` - 16px
- `var(--spacing-lg)` - 24px
- `var(--spacing-xl)` - 32px
- `var(--spacing-2xl)` - 48px
- `var(--spacing-3xl)` - 64px
- `var(--spacing-4xl)` - 96px

### Border Radius

- `var(--radius-sm)` - 4px
- `var(--radius-md)` - 8px
- `var(--radius-lg)` - 12px
- `var(--radius-xl)` - 16px
- `var(--radius-2xl)` - 24px

### Shadows

- `var(--shadow-sm)` - Small shadow
- `var(--shadow-md)` - Medium shadow
- `var(--shadow-lg)` - Large shadow
- `var(--shadow-glow)` - Glow effect

### Transitions

- `var(--transition-fast)` - 150ms
- `var(--transition-normal)` - 300ms
- `var(--transition-slow)` - 500ms
- `var(--transition-ease)` - Easing function

### Gradients

- `var(--gradient-primary)` - Primary gradient
- `var(--gradient-primary-accent)` - Primary to accent
- `var(--gradient-card)` - Card gradient
- `var(--gradient-hero)` - Hero background

## Layout System

Gunakan layout utilities dari `layout-system.css`:

- `.container` - Max width container
- `.grid` - Grid layout
- `.flex` - Flexbox layout
- Spacing utilities (`.p-md`, `.mt-lg`, etc.)

## Dark Mode

Semua variables otomatis berubah di dark mode dengan class `.dark` pada root element.

## Checklist untuk Sync

- [ ] Semua colors menggunakan CSS variables
- [ ] Semua spacing menggunakan CSS variables
- [ ] Semua border-radius menggunakan CSS variables
- [ ] Semua shadows menggunakan CSS variables
- [ ] Semua transitions menggunakan CSS variables
- [ ] Container menggunakan max-width variables
- [ ] Dark mode support dengan variables
- [ ] Responsive breakpoints konsisten
