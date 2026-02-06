# 🎨 Design System Sync - Complete Documentation

**Tema desain tunggal:** Lihat **[DESIGN_THEME.md](./DESIGN_THEME.md)** untuk tema "Modern Tech Paper", alias `--theme-*`, dan aturan agar semua komponen tetap selaras.

## ✅ Sistem yang Telah Di-Sync

### 1. CSS Variables System (`design-tokens.css`)

Semua design tokens sekarang tersedia sebagai CSS variables yang bisa digunakan di semua komponen:

#### Colors

- `--color-primary-*` (50-900) - Primary blue palette
- `--color-accent-*` (50-700) - Accent green palette
- `--color-neutral-*` (50-900) - Neutral grays
- `--text-primary`, `--text-secondary`, `--text-tertiary` - Text colors
- `--bg-primary`, `--bg-secondary`, `--bg-card` - Background colors
- `--border-primary`, `--border-secondary` - Border colors

#### Spacing

- `--spacing-xs` (4px) sampai `--spacing-5xl` (128px)
- Konsisten di semua komponen

#### Typography

- `--font-size-*` (xs sampai 6xl)
- `--font-weight-*` (light sampai bold)
- `--line-height-*` (tight, normal, relaxed)
- `--letter-spacing-*` (tight, normal, wide)
- `--font-family-sans`, `--font-family-mono`, `--font-family-display`, `--font-family-quote` (Georgia/serif for testimonials)

#### Layout

- `--container-*` (sm sampai 2xl)
- `--radius-*` (sm sampai full)
- `--shadow-*` (sm sampai glow-strong)
- `--shadow-glow`, `--shadow-glow-strong`, `--shadow-glow-accent` - Glow effects (with opacity)
- `--shadow-card-hover` - Card hover state shadow
- `--transition-*` (fast, normal, slow, ease)
- `--z-*` (base sampai tooltip)
- `--overlay-backdrop` - Modal/overlay backdrop (light + dark)

#### Focus (accessibility)

- `--focus-outline-width`, `--focus-outline-offset`
- `--focus-ring-color`, `--focus-ring-glow`
- `--focus-outline-width-high` - High contrast mode (3px)

#### State opacity

- `--opacity-disabled`, `--opacity-loading-overlay`, `--opacity-decorative`, `--opacity-ripple`

#### Gradients

- `--gradient-primary` - Primary gradient
- `--gradient-primary-accent` - Primary to accent
- `--gradient-card` - Card background
- `--gradient-hero` - Hero section background
- `--gradient-text` - Text gradient

### 2. Layout System (`layout-system.css`)

Utility classes untuk konsisten layout:

- Container system dengan max-widths
- Grid system (grid-cols-1 sampai 4, auto-fit, auto-fill)
- Flex utilities (flex, flex-col, items-center, justify-between, etc.)
- Spacing utilities (p-_, m-_, gap-\*)

### 3. Komponen yang Telah Di-Update

#### ✅ Core Components

- **App.css** - Body, code, pre, skip-to-content, focus states
- **Section** - Padding, container, dividers, titles
- **Card** - Background, borders, shadows, padding variants
- **Button** - All variants (primary, secondary, outline, ghost), sizes
- **Header** - Background, borders, navigation links, container, search width (rem)
- **Footer** - Colors, spacing, newsletter, links (Link + aria-label)
- **Home** - Hero section, grids, spacing, colors
- **Contact** - Form, cards, success/error states, spacing
- **About, Projects, Experience** - Section layout, grids, tokens
- **Privacy, Terms** - Placeholder pages, SEO, tokens

### 4. Accessibility & contrast

- **Focus**: Semua komponen pakai token focus; high-contrast mode pakai `--focus-outline-width-high` (3px).
- **Reduced motion**: Animasi/transisi dinonaktifkan di Card, ScrollProgress, Experience emptyIcon, touch-ripple, Skeleton, PageTransition.
- **Disabled/loading**: Pakai `--opacity-disabled`, `--opacity-loading-overlay`.
- **Form**: Contact form punya label, aria-describedby untuk error, aria-label pada tombol. Newsletter pakai aria-label.

### 5. Dark Mode Support

Semua CSS variables otomatis berubah di dark mode:

- Background colors menjadi dark
- Text colors menjadi light
- Borders disesuaikan
- Gradients disesuaikan untuk visibility

## 📋 Checklist Konsistensi

### Colors ✅

- [x] Primary colors menggunakan `--color-primary-*`
- [x] Accent colors menggunakan `--color-accent-*`
- [x] Text colors menggunakan `--text-*`
- [x] Background colors menggunakan `--bg-*`
- [x] Border colors menggunakan `--border-*`
- [x] Semantic colors (success, error, warning) tersedia

### Spacing ✅

- [x] Padding menggunakan `--spacing-*`
- [x] Margin menggunakan `--spacing-*`
- [x] Gap menggunakan `--spacing-*`
- [x] Container padding konsisten

### Typography ✅

- [x] Font sizes menggunakan `--font-size-*`
- [x] Font weights menggunakan `--font-weight-*`
- [x] Line heights menggunakan `--line-height-*`
- [x] Letter spacing menggunakan `--letter-spacing-*`

### Layout ✅

- [x] Border radius menggunakan `--radius-*`
- [x] Shadows menggunakan `--shadow-*`
- [x] Transitions menggunakan `--transition-*`
- [x] Z-index menggunakan `--z-*`
- [x] Container max-widths menggunakan `--container-*`

### Gradients ✅

- [x] Background gradients menggunakan `--gradient-*`
- [x] Text gradients menggunakan `--gradient-text`
- [x] Card gradients menggunakan `--gradient-card`

## 🎯 Best Practices

### 1. Always Use Variables

```css
/* ✅ Correct */
.my-component {
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* ❌ Wrong */
.my-component {
  color: #1e293b;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### 2. Dark Mode Support

Semua variables otomatis support dark mode. Tidak perlu override manual.

### 3. Responsive Design

Gunakan spacing variables yang konsisten untuk responsive breakpoints.

### 4. Component Consistency

Semua komponen harus menggunakan:

- Same spacing scale
- Same color palette
- Same typography scale
- Same border radius
- Same shadows
- Same transitions

## 📊 Sync Status

### Fully Synced ✅

- **Global**: App.css, design-tokens.css, animations.css, creative-design.css, modern-design.css, advanced-effects.css, ux-improvements.css, accessibility.css
- **Layout**: Section, Header, Footer
- **UI**: Card, Button, Typography, Loading, CodeBlock
- **Pages**: Home, About, Projects, Experience, Contact, Privacy, Terms
- **Domain**: ProjectCard, TestimonialCard, StatItem, ExperienceItem, SkillBadge, SoftSkillBadge, AcademicItem, CertificationCard, HonorCard
- **Components**: Timeline, SkillChart, ProjectFilter, TestimonialCarousel, AchievementBadge, Search, AccessibilityInfo, BackToTop, ScrollProgress, SkipLinks, ErrorBoundary, PageTransition, Skeleton

### Design Token Usage

- Warna: `--color-primary-*`, `--color-accent-*`, `--text-*`, `--bg-*`, `--border-*`
- Spacing: `--spacing-*`, `--container-*` untuk max-width
- Ukuran: rem untuk width/height konsisten (contoh: 18.75rem, 25rem)
- Overlay: `--overlay-backdrop` untuk modal backdrop
- Typography responsif: h5/h6 scaling di mobile

## 🚀 Next Steps (optional)

1. ~~Gunakan `--focus-outline-width` / `--focus-ring-color` di komponen untuk focus konsisten~~ ✅ Done (26 file CSS)
2. ~~Canvas dark mode (ParticleBackground & InteractiveBackground)~~ ✅ Done (pakai primary[400]/accent[400] saat dark)
3. ~~Shadow glow & card hover tokens~~ ✅ Done (--shadow-glow with opacity, --shadow-card-hover)
4. ~~Reduced motion: ParticleBackground, CursorEffect, useCounter~~ ✅ Done (semua respect prefers-reduced-motion)
5. Test dark mode di semua halaman (manual)
6. Verifikasi responsive di breakpoints 640px, 768px, 1024px (manual)

## 🔄 Data & types sync

- Lihat **docs/SYNC_DATA_AND_TYPES.md** untuk alur data (backend ↔ ProfileService ↔ ProfileContext) dan sinkronisasi setelah admin save (refetch). Domain types: **src/types/domain.ts** dan **backend/src/types/domain.ts** harus tetap sama.

## 📝 Notes

- **Last verified:** Build OK; print styles, lazy loading, focus tokens, reduced motion, baseline-browser-mapping@latest (devDependency), dark mode canvas (ParticleBackground & InteractiveBackground pakai primary[400]/accent[400] saat dark).
- **Security:** `npm audit fix` sudah dijalankan (safe). Vulnerability yang tersisa butuh `npm audit fix --force` (breaking); bisa ditangani nanti dengan upgrade react-scripts / eslint / csurf terencana.
- Semua variables didefinisikan di `design-tokens.css`
- Dark mode variables otomatis override di `.dark` class
- Layout utilities tersedia di `layout-system.css`
- Konsistensi adalah prioritas utama
