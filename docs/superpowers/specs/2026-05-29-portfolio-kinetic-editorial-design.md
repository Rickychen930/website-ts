# Portfolio Redesign — Kinetic Editorial

**Date:** 2026-05-29  
**Owner:** Ricky Chen — Fullstack / AI Engineer, Sydney  
**Approach:** A — Kinetic Editorial  
**Stack:** React 19 + TypeScript + Framer Motion + CSS Modules

---

## 1. Goals

- World-class portfolio that does not look AI-generated or template-based
- Dark default with light mode toggle
- Hybrid layout: single-scroll main page + project detail pages
- Balanced: cinematic first impression + highly readable content
- Performance-first: no heavy libraries beyond Framer Motion (already installed)

---

## 2. Design System

### 2.1 Typography

| Role                 | Font           | Source       |
| -------------------- | -------------- | ------------ |
| Display / Headings   | Syne           | Google Fonts |
| Body                 | Inter          | Google Fonts |
| Mono / Labels / Tags | JetBrains Mono | Google Fonts |

Import via `<link>` in `public/index.html`. No npm package needed.

### 2.2 Color Tokens

**Dark mode (default — `.dark` class on `<html>` or body):**

```css
--bg-base: #09090b --bg-surface: #111113 --bg-elevated: #1a1a1f
  --text-primary: #fafaf9 --text-muted: #71717a --text-dim: #3f3f46
  --accent-1: #6366f1 /* indigo — primary CTA */ --accent-2: #06b6d4
  /* cyan — tags, secondary */ --accent-glow: rgba(99, 102, 241, 0.15)
  --border: rgba(255, 255, 255, 0.06) --border-hover: rgba(255, 255, 255, 0.12);
```

**Light mode (`.light` class):**

```css
--bg-base: #fafaf9 --bg-surface: #f4f4f5 --bg-elevated: #e4e4e7
  --text-primary: #09090b --text-muted: #52525b --text-dim: #a1a1aa
  --accent-1: #4f46e5 --accent-2: #0891b2 --accent-glow: rgba(79, 70, 229, 0.1)
  --border: rgba(0, 0, 0, 0.08) --border-hover: rgba(0, 0, 0, 0.14);
```

### 2.3 Spacing Scale

4px base unit. CSS custom properties `--space-1` through `--space-20`:
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 224, 256, 288, 320, 384`

### 2.4 Border Radius

```css
--radius-sm: 6px --radius-md: 12px --radius-lg: 20px --radius-xl: 32px
  --radius-full: 9999px;
```

### 2.5 Shadows / Glow

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4) --shadow-md: 0 4px 16px
  rgba(0, 0, 0, 0.5) --shadow-glow: 0 0 40px var(--accent-glow);
```

### 2.6 Z-Index Scale

```
--z-base:    0
--z-raised:  10
--z-nav:     100
--z-modal:   200
--z-cursor:  999
```

---

## 3. Layout Structure

### 3.1 Main Page (route `/`) — Single Scroll

```
┌─────────────────────────────────────┐
│  HEADER — fixed, blur backdrop      │
├─────────────────────────────────────┤
│  HERO — 100vh                       │
├─────────────────────────────────────┤
│  STACK MARQUEE — infinite scroll    │
├─────────────────────────────────────┤
│  ABOUT — 2-column                   │
├─────────────────────────────────────┤
│  WORK — editorial timeline          │
├─────────────────────────────────────┤
│  PROJECTS — bento grid              │
├─────────────────────────────────────┤
│  CONTACT — full bleed               │
├─────────────────────────────────────┤
│  FOOTER — minimal                   │
└─────────────────────────────────────┘
```

### 3.2 Additional Routes

| Route           | Page                                  |
| --------------- | ------------------------------------- |
| `/projects/:id` | ProjectDetail — full project write-up |
| `/resume`       | Resume/CV — printable layout          |
| `/admin/*`      | Admin CMS — minimal rebuild           |
| `*`             | NotFound                              |

### 3.3 Max Width & Gutters

```css
--container-max: 1200px --container-pad: clamp(1.5rem, 5vw, 4rem)
  /* responsive gutter */;
```

Section wrapper: `max-width: var(--container-max)`, centered, padding via `--container-pad`.

---

## 4. Animation System

All animation via **Framer Motion**. Philosophy: physics-based spring motion, never linear/mechanical.

### 4.1 Scroll Reveal (FadeUp)

Reusable wrapper component. `whileInView={{ opacity:1, y:0 }}` with `viewport={{ once: true, margin: "-80px" }}`.

Default: `initial={{ opacity:0, y:32 }}`, transition `ease:[0.25,0,0,1] duration:0.6`.

Stagger children via `staggerChildren: 0.08` in parent variants.

### 4.2 Hero Text — SplitText

Per-character animation on mount. Each letter: `initial={{ opacity:0, y:"110%" }}`, spring `stiffness:80 damping:20`. Stagger `0.025s` per character.

### 4.3 Role Cycling

`AnimatePresence` with `mode="wait"`. Roles: "Fullstack Engineer", "AI Engineer", "Problem Solver". Each swaps every 3s. Exit: `y:-20, opacity:0`. Enter: `y:20, opacity:0 → 0, 1`.

### 4.4 Card 3D Tilt

On hover, track `mousemove` relative to card center. Apply `rotateX` + `rotateY` max ±8°. Spring `mass:0.5 stiffness:200 damping:20`. Reset on `mouseLeave`.

### 4.5 Number Count-Up

Intersection Observer triggers count from 0 to target value. `easeOut` over 1.5s. Used in About stats row.

### 4.6 Animated Mesh Background (Hero)

Pure CSS `@keyframes` — two large radial gradients (`accent-1` and `accent-2`) moving slowly on `background-position`. No canvas, no JS. Fallback: static gradient. `prefers-reduced-motion`: static.

### 4.7 Custom Cursor (Desktop Only)

12px dot + 40px ring. Ring follows mouse with 80ms lag (lerp). Scales to `60px` on hover over interactive element. Hidden on mobile (`pointer: coarse`).

### 4.8 Nav on Scroll

Past 60px: `backdrop-filter: blur(20px)`, `--border` bottom border appears, `background` transitions from transparent to `rgba(9,9,11,0.85)`. `200ms linear`.

### 4.9 Page Transition

`AnimatePresence` at router level. `opacity: 0→1`, `200ms ease`.

### 4.10 Marquee

Pure CSS `animation: marquee 30s linear infinite`. Two copies of content for seamless loop. `prefers-reduced-motion`: paused/static.

### 4.11 Reduced Motion

All motion components check `useReducedMotion()` from Framer Motion. If true: skip transforms, keep opacity fade only (or nothing).

---

## 5. Component Architecture

```
src/
├── styles/
│   ├── design-tokens.css     ← all CSS custom properties
│   ├── base.css              ← reset, body, global typography
│   ├── animations.css        ← @keyframes (marquee, mesh-drift, etc.)
│   └── dark-mode.css         ← .light class token overrides
│
├── components/
│   ├── ui/
│   │   ├── Button/           ← variants: primary, ghost, icon
│   │   ├── Tag/              ← tech badge, accent-2 color
│   │   └── Card/             ← elevated surface with hover glow
│   ├── motion/
│   │   ├── FadeUp/           ← scroll reveal wrapper
│   │   ├── CountUp/          ← animated number display
│   │   ├── SplitText/        ← per-letter mount animation
│   │   └── Marquee/          ← infinite horizontal strip
│   └── layout/
│       ├── Header/           ← fixed nav, blur on scroll, theme toggle
│       ├── Footer/           ← minimal — copyright + links
│       ├── Section/          ← max-width wrapper + section padding
│       └── CustomCursor/     ← glow cursor (desktop only)
│
└── views/
    ├── sections/
    │   ├── HeroSection/      ← mesh BG, split name, role cycle, scroll cue
    │   ├── StackSection/     ← marquee of tech skills
    │   ├── AboutSection/     ← bio + animated stats grid
    │   ├── WorkSection/      ← vertical timeline + experience cards
    │   ├── ProjectsSection/  ← bento grid + tilt cards
    │   └── ContactSection/   ← email CTA + socials
    └── pages/
        ├── Home/             ← compose all sections in order
        ├── ProjectDetail/    ← full project write-up page
        ├── Resume/           ← printable CV layout
        ├── NotFound/
        └── Admin/            ← CMS (minimal rebuild)
```

---

## 6. Section Specifications

### 6.1 Header

- Position: fixed top, full width
- Left: site logo / initials "RC" in `--accent-1`
- Right: nav links (Work, Projects, Contact) + theme toggle button
- Mobile: hamburger → slide-down menu
- On scroll >60px: blur backdrop, border-bottom, semi-transparent bg
- Active section highlight via IntersectionObserver on section IDs

### 6.2 Hero Section

- Height: `100dvh`
- Background: animated mesh (two large accent radials, CSS keyframes, slow drift)
- Content center-left aligned, vertically centered
- Elements (top → bottom):
  1. Small label: `"Available for work · Sydney, AU"` — `--accent-2` dot + mono font
  2. Name: `"RICKY CHEN"` — Syne, `clamp(4rem, 10vw, 9rem)`, white, split-letter animation
  3. Role: cycling text — `"Fullstack Engineer"` — Syne, `clamp(1.5rem, 4vw, 3rem)`, `--text-muted`
  4. One-liner bio: max 120 chars — `--text-muted`, Inter
  5. CTA row: `"View Work"` (primary button → #projects) + `"Resume"` (ghost button → /resume)
  6. Social icons row: GitHub, LinkedIn — small, `--text-dim` hover `--text-primary`
- Bottom: animated scroll indicator (chevron bounce)
- No photo. Typography is the hero.

### 6.3 Stack Marquee Section

- Full width, no max-width cap
- Two rows scrolling opposite directions (left + right) for visual depth
- Each item: tech icon (text emoji or SVG) + name in mono font
- Speed: 40s per loop row 1, 35s row 2
- `--bg-surface` background, thin border top/bottom

### 6.4 About Section

- Two columns (60/40 split, stacks on mobile)
- Left: bio paragraph (3-4 sentences), then "What I do" — 3 bullet areas (Fullstack, AI/ML integration, Architecture)
- Right: stats grid 2×2
  - `5+ years` experience
  - `20+` projects shipped
  - `3` countries worked
  - `∞` coffee consumed (human touch)
  - Each stat: large number (CountUp) + label underneath

### 6.5 Work Section (Experience Timeline)

- Section title: `"Where I've worked"` — large, left-aligned
- Vertical line: 2px `--accent-1`, left side, partial opacity
- Per experience card:
  - Dot on the line (filled = current, hollow = past)
  - Company + location top-right in mono
  - Role title large
  - Date range + duration
  - Description paragraph
  - Tech tags row (`Tag` component)
  - Key achievements as bullet list
- Cards animate in from right on scroll (FadeUp with x offset)
- Max 4-5 most recent experiences shown

### 6.6 Projects Section (Bento Grid)

- Section title: `"Things I've built"` + link to all projects
- 12-column CSS grid, auto-placed rows
- Featured project: spans 8 cols — large card with project image or gradient placeholder, overlay on hover
- Secondary projects: 4 cols each
- Each card:
  - Category tag top-left
  - Project title (Syne, bold)
  - Description (2-3 lines, clamp)
  - Tech tags
  - Links: GitHub icon + Live icon
  - Hover: 3D tilt + border glow + subtle brightness lift
- Mobile: single column stack

### 6.7 Contact Section

- Full section height, center-aligned content
- Large heading: `"Let's build something."` — Syne, display size
- Sub-line: `"Open to fullstack, AI engineering, and freelance work."`
- Email as large clickable link: `ricky@...` — styled as heading, hover underline grow
- Horizontal divider
- Social row: GitHub, LinkedIn, (optional: Twitter/X)
- Background: very subtle mesh gradient (same as hero but dimmer)

### 6.8 Footer

- Single row: copyright left + "Built with React + ❤️" right
- `--bg-base`, `--text-dim` color — minimal, not distracting

---

## 7. Responsive Strategy

- Mobile-first CSS
- Breakpoints: `640px` (sm), `768px` (md), `1024px` (lg), `1280px` (xl)
- Hero font: `clamp()` for fluid scaling
- Bento grid collapses to 1-col on mobile
- Timeline stays single column on all sizes (already vertical)
- Nav collapses to hamburger at `< 768px`
- Custom cursor: hidden at `pointer: coarse` (touch devices)

---

## 8. Performance Constraints

- Fonts: `font-display: swap`, preconnect to Google Fonts
- Images: lazy load, `loading="lazy"`, WebP preferred
- Framer Motion: `LazyMotion` + `domAnimation` features only (tree-shakeable)
- Marquee: pure CSS (no JS scroll listener)
- Mesh BG: CSS gradients only (no canvas, no Three.js)
- No icon library — SVG inline or emoji for stack items
- Code split: each page lazy-loaded (already done in App.tsx pattern)
- `prefers-reduced-motion`: all animations gated

---

## 9. Accessibility

- Focus ring: `2px solid var(--accent-1)` with `outline-offset: 4px`
- Skip link: "Skip to main content" visible on focus
- All interactive elements: min 44×44px touch target
- Color contrast: all text/bg combos ≥ 4.5:1 (AA)
- Semantic HTML: `<nav>`, `<main>`, `<section>` with `aria-label`
- Motion: `prefers-reduced-motion` respected everywhere

---

## 10. Files NOT in scope

- Admin CMS pages: rebuild minimal (functional, not redesigned)
- Backend: no changes
- `/privacy`, `/terms`: simple text pages, minimal styling
- Test suite: update imports only, no new tests required

---

## 11. Implementation Order

1. Design tokens + base CSS + Google Fonts
2. Motion utility components (FadeUp, SplitText, CountUp, Marquee)
3. Layout components (Header, Footer, Section, CustomCursor)
4. UI atoms (Button, Tag, Card)
5. HeroSection
6. StackSection
7. AboutSection
8. WorkSection
9. ProjectsSection
10. ContactSection
11. Home page (compose sections)
12. ProjectDetail page
13. Resume page
14. NotFound page
15. Admin pages (minimal)
16. App.tsx wiring + ThemeContext rebuild
17. Lint + test pass
