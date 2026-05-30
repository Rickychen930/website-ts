# Portfolio Redesign — Kinetic Editorial (v2 — Upgraded)

**Date:** 2026-05-29
**Owner:** Ricky Chen — Fullstack / AI Engineer, Sydney
**Approach:** A — Kinetic Editorial + Full Interactivity Upgrade
**Stack:** React 19 + TypeScript + Framer Motion + CSS Modules

---

## 1. Goals

- World-class portfolio that does not look AI-generated or template-based
- Dark default with light mode toggle
- Hybrid layout: single-scroll main page + project detail pages
- Balanced: cinematic first impression + highly readable content
- Performance-first: no heavy libraries beyond Framer Motion (already installed)
- Every section is interactive — nothing is purely passive

---

## 2. Design System

### 2.1 Typography

| Role                 | Font           | Source       |
| -------------------- | -------------- | ------------ |
| Display / Headings   | Syne           | Google Fonts |
| Body                 | Inter          | Google Fonts |
| Mono / Labels / Tags | JetBrains Mono | Google Fonts |

Import via `<link>` in `public/index.html`. No npm package needed.
All fonts: `font-display: swap`, preconnect to `fonts.googleapis.com` + `fonts.gstatic.com`.

### 2.2 Color Tokens

**Dark mode (default — `:root` or `.dark` class):**

```css
--bg-base: #09090b;
--bg-surface: #111113;
--bg-elevated: #1a1a1f;
--text-primary: #fafaf9;
--text-muted: #71717a;
--text-dim: #3f3f46;
--accent-1: #6366f1; /* indigo — primary CTA */
--accent-2: #06b6d4; /* cyan — tags, secondary */
--accent-glow: rgba(99, 102, 241, 0.15);
--accent-glow-2: rgba(6, 182, 212, 0.12);
--border: rgba(255, 255, 255, 0.06);
--border-hover: rgba(255, 255, 255, 0.12);
--gradient-text: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
```

**Light mode (`.light` class):**

```css
--bg-base: #fafaf9;
--bg-surface: #f4f4f5;
--bg-elevated: #e4e4e7;
--text-primary: #09090b;
--text-muted: #52525b;
--text-dim: #a1a1aa;
--accent-1: #4f46e5;
--accent-2: #0891b2;
--accent-glow: rgba(79, 70, 229, 0.1);
--accent-glow-2: rgba(8, 145, 178, 0.08);
--border: rgba(0, 0, 0, 0.08);
--border-hover: rgba(0, 0, 0, 0.14);
--gradient-text: linear-gradient(135deg, #4f46e5 0%, #0891b2 100%);
```

### 2.3 Spacing Scale

4px base unit. `--space-1` through `--space-20`:
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 224, 256, 288, 320, 384`

### 2.4 Border Radius

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-xl: 32px;
--radius-full: 9999px;
```

### 2.5 Shadows / Glow

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 40px var(--accent-glow);
--shadow-glow-2: 0 0 40px var(--accent-glow-2);
```

### 2.6 Z-Index Scale

```css
--z-base: 0;
--z-raised: 10;
--z-nav: 100;
--z-modal: 200;
--z-cursor: 999;
```

### 2.7 Noise Texture (Global)

Every surface gets a subtle organic texture via a global SVG noise filter.
Applied as a `::after` pseudo-element on `body` with `pointer-events: none`, `position: fixed`, `inset: 0`, `opacity: 0.035`, `z-index: var(--z-cursor)`.
Filter: inline SVG `feTurbulence` + `feColorMatrix`. Zero performance cost. Makes every surface feel hand-crafted not machine-generated.

---

## 3. Layout Structure

### 3.1 Main Page (route `/`) — Single Scroll

```
┌─────────────────────────────────────┐
│  HEADER — fixed, blur backdrop      │
│  SCROLL DOT NAV — fixed right side  │
│  CUSTOM CURSOR — fixed overlay      │
├─────────────────────────────────────┤
│  HERO — 100dvh, mouse-parallax BG   │
├─────────────────────────────────────┤
│  STACK MARQUEE — infinite, hover    │
├─────────────────────────────────────┤
│  ABOUT — 2-col, ring stats          │
├─────────────────────────────────────┤
│  WORK — self-drawing timeline       │
├─────────────────────────────────────┤
│  PROJECTS — bento + filter tabs     │
├─────────────────────────────────────┤
│  CONTACT — copy email, inline form  │
├─────────────────────────────────────┤
│  FOOTER — minimal                   │
└─────────────────────────────────────┘
```

### 3.2 Additional Routes

| Route           | Page                                       |
| --------------- | ------------------------------------------ |
| `/projects/:id` | ProjectDetail — full spec (see §6.9)       |
| `/resume`       | Resume/CV — printable layout               |
| `/admin/*`      | Admin CMS — minimal rebuild (out of scope) |
| `*`             | NotFound                                   |

### 3.3 Max Width & Gutters

```css
--container-max: 1200px;
--container-pad: clamp(1.5rem, 5vw, 4rem);
```

---

## 4. Animation System

All animation via **Framer Motion**. Philosophy: physics-based spring — never linear, never mechanical.

### 4.1 Scroll Reveal — FadeUp

Reusable wrapper. `whileInView={{ opacity:1, y:0 }}`, `viewport={{ once: true, margin: "-80px" }}`.
Default: `initial={{ opacity:0, y:32 }}`, transition `ease:[0.25,0,0,1] duration:0.6`.
Stagger children: `staggerChildren: 0.08` on parent variants.

### 4.2 Hero Text — SplitText

Per-character on mount. Each char: `initial={{ opacity:0, y:"110%" }}`, spring `stiffness:80 damping:20`. Stagger `0.025s`. Characters clipped via `overflow:hidden` wrapper per char.

### 4.3 Role Cycling

`AnimatePresence mode="wait"`. Roles array: `["Fullstack Engineer", "AI Engineer", "Problem Solver"]`. Swap every 3s. Exit: `{ y:-20, opacity:0 }`. Enter: `{ y:20→0, opacity:0→1 }`. Transition: spring `stiffness:300 damping:30`.

### 4.4 Card 3D Tilt

`mousemove` on card → compute offset from center → apply `rotateX` + `rotateY` max ±8° via Framer Motion `useMotionValue` + `useSpring`. `mass:0.5 stiffness:200 damping:20`. `transform-style: preserve-3d`. Reset spring on `mouseLeave`.

### 4.5 Number Count-Up + Circular Ring

IntersectionObserver triggers. Counter: `easeOut` 1.5s from 0 to target.
Circular ring: SVG `<circle>` with `stroke-dasharray` + `stroke-dashoffset` animated from full offset to 0 simultaneously. Ring visually "fills" as number counts up. Spring `stiffness:60 damping:25`.

### 4.6 Hero Mesh Background — Mouse Parallax

Two large radial gradient orbs. On `mousemove` on window: update CSS vars `--mx` (0–100vw) and `--my` (0–100vh). Gradient centers translate toward cursor at 0.08× speed (subtle). CSS `transition: background-position 0.3s ease` for smoothness. `prefers-reduced-motion`: static, no transition.

Additionally: global SVG noise overlay (see §2.7).

### 4.7 Timeline — Self-Drawing Line

`useScroll({ target: sectionRef })` + `useTransform(scrollYProgress, [0,1], ["0%","100%"])`. Applied to `scaleY` of the vertical line element with `transform-origin: top`. Line visually grows downward as user scrolls through the section. Spring smoothing: `useSpring(rawProgress, { stiffness:80, damping:20 })`.

Current job dot: CSS `@keyframes pulse-ring` — expanding transparent ring, `animation: 2s ease-out infinite`.

### 4.8 Projects Filter — Layout Animation

Framer Motion `layout` prop on each card. `AnimatePresence` wraps the grid. When filter changes, cards exit (`scale:0.8, opacity:0`) and enter (`scale:1, opacity:1`) with spring. Cards that remain rearrange with automatic layout animation (smooth spring reflow). No manual position calculation needed.

Filter tabs: active tab has Framer Motion `layoutId="filter-indicator"` shared underline that slides between tabs.

### 4.9 Context-Aware Cursor

12px dot + 40px ring. Ring follows with lerp lag ~80ms.
Context states:

- Default: indigo ring, no label
- Over project card: cyan ring, label `"View"` fades in inside ring
- Over email CTA: indigo ring, label `"Copy"`
- Over external link: ring + `"↗"` icon
- Over button: ring scales to 50px, filled semi-transparent
  Color transitions: `transition: all 200ms ease`.
  Hidden on `@media (pointer: coarse)` — touch devices.

### 4.10 Nav Sliding Indicator

Active nav link tracked by `layoutId="nav-active"` on an `<motion.span>` underline element. When active section changes via IntersectionObserver, the underline slides to the new link with spring physics. Much more premium than color-only change.

### 4.11 Page Transition — Curtain Wipe

Fixed overlay `div` with `position:fixed, inset:0, background:--bg-base, z-index:500`.
On navigate: overlay animates `y: "100%"→"0%"` (curtain up, 300ms ease-in), then `y: "0%"→"-100%"` (curtain exit upward, 300ms ease-out). New page mounts behind. Total: 600ms. Feels cinematic. Framer Motion `AnimatePresence` controls mount/unmount.

### 4.12 Scroll Dot Navigation (Right Side)

Fixed `right: 1.5rem`, `top: 50%`. One dot per section. Active section dot: expands to `12px`, `--accent-1` color. Inactive: `6px`, `--text-dim`. Transition: spring. Click → `window.scrollTo` smooth to section. `aria-label="Navigate to [section]"`.

### 4.13 Marquee

Two rows, opposite directions. Pure CSS `@keyframes marquee-left` + `@keyframes marquee-right`. 40s / 35s per loop. `pauseOnHover`: `animation-play-state: paused` on mouse enter strip.
Individual item hover: Framer Motion `scale:1.1`, tooltip reveals proficiency level above item. Spring `stiffness:400 damping:25`.

### 4.14 Contact — Copy to Clipboard

Email element: on hover → label transitions to `"Click to copy"`. On click → `navigator.clipboard.writeText(email)` → icon morphs to checkmark (SVG path animation via `pathLength`) + text `"Copied!"`. Resets after 3s. Framer Motion `AnimatePresence` for label swap.

### 4.15 Reduced Motion Gate

All motion components call `useReducedMotion()`. If true: disable transforms entirely, keep only opacity transitions ≤ 200ms. Marquee: `animation-play-state: paused` (static).

---

## 5. Component Architecture

```
src/
├── styles/
│   ├── design-tokens.css      ← all CSS custom properties
│   ├── base.css               ← reset, body, typography, noise overlay
│   ├── animations.css         ← @keyframes: marquee, pulse-ring, mesh-drift
│   └── dark-mode.css          ← .light class token overrides
│
├── components/
│   ├── ui/
│   │   ├── Button/            ← primary, ghost, icon variants
│   │   ├── Tag/               ← tech badge, accent-2 color
│   │   └── Card/              ← elevated surface, hover glow, 3D tilt
│   ├── motion/
│   │   ├── FadeUp/            ← scroll reveal wrapper + stagger
│   │   ├── CountUp/           ← animated number + circular ring SVG
│   │   ├── SplitText/         ← per-letter mount animation
│   │   ├── Marquee/           ← infinite strip, pauseOnHover, item tooltip
│   │   └── CurtainTransition/ ← page curtain wipe overlay
│   └── layout/
│       ├── Header/            ← fixed nav, blur scroll, sliding indicator
│       ├── Footer/            ← minimal copyright
│       ├── Section/           ← max-width wrapper, section padding, section number
│       ├── CustomCursor/      ← context-aware glow cursor
│       └── ScrollDotNav/      ← right-side section dot navigator
│
└── views/
    ├── sections/
    │   ├── HeroSection/       ← mesh+parallax BG, SplitText name, role cycle
    │   ├── StackSection/      ← Marquee skills strip
    │   ├── AboutSection/      ← bio + CountUp ring stats
    │   ├── WorkSection/       ← self-drawing timeline + experience cards
    │   ├── ProjectsSection/   ← filter tabs + bento layout animation
    │   └── ContactSection/    ← copy email, inline form toggle, mesh BG
    └── pages/
        ├── Home/              ← compose all sections
        ├── ProjectDetail/     ← full project spec (see §6.9)
        ├── Resume/            ← printable CV layout
        ├── NotFound/          ← 404 with animation
        └── Admin/             ← CMS minimal rebuild
```

---

## 6. Section Specifications

### 6.1 Header

- Fixed top, full width, `z-index: var(--z-nav)`
- Left: `"RC"` initials mark — Syne Bold, `--accent-1`, subtle hover glow
- Right: nav links `[Work, Projects, Contact]` + theme toggle icon button
- Active link: `layoutId="nav-active"` sliding underline via Framer Motion shared layout
- On scroll >60px: `backdrop-filter: blur(20px)`, `background: rgba(9,9,11,0.85)`, border-bottom `var(--border)` — `200ms linear`
- Mobile <768px: hamburger icon → `AnimatePresence` slide-down menu overlay
- Active section tracked via `IntersectionObserver` on `[data-section]` elements

### 6.2 Hero Section

- Height: `100dvh`
- Background: two radial gradient orbs (`--accent-1`, `--accent-2`) that track `mousemove` at 0.08× speed. CSS vars `--mx` `--my` updated on `mousemove`. `transition: all 0.3s ease` on background. `prefers-reduced-motion`: static.
- Noise overlay: see §2.7
- Content: left-aligned, vertically centered via flexbox column
- Elements top → bottom:
  1. Badge: `"● Available for work · Sydney, AU"` — `--accent-2` dot (pulse), JetBrains Mono, `--text-muted`. `FadeUp` delay 0.
  2. Name: `"RICKY CHEN"` — Syne, `clamp(4rem, 10vw, 9rem)`, **CSS gradient text** (`background: var(--gradient-text); -webkit-background-clip: text`). SplitText animation. FadeUp delay 0.1s.
  3. Role: cycling text — Syne, `clamp(1.5rem, 4vw, 3rem)`, `--text-muted`. AnimatePresence role swap.
  4. Bio: one-liner ≤120 chars — Inter, `--text-muted`. FadeUp delay 0.5s.
  5. CTA row: `"View Work"` (primary button → `#projects`) + `"Download Resume"` (ghost → `/resume`). FadeUp delay 0.6s.
  6. Social row: GitHub + LinkedIn SVG icons. FadeUp delay 0.7s.
- Bottom center: animated scroll chevron (`↓`), CSS bounce keyframe.
- Section number: `"00"` — decorative, `clamp(10rem, 20vw, 18rem)`, `--text-dim` 15% opacity, absolute positioned top-right, `pointer-events:none`.

### 6.3 Stack Marquee Section

- Full viewport width, no container cap
- Two rows: row 1 scrolls left, row 2 scrolls right
- Speeds: 40s (row 1), 35s (row 2)
- `pauseOnHover`: `animation-play-state: paused` on `mouseenter` strip
- Each item: SVG icon or tech emoji + name in JetBrains Mono
- Item hover: `scale:1.1`, tooltip card above with proficiency level (`Expert / Advanced / Intermediate`)
- Background: `--bg-surface`, border top + bottom `var(--border)`
- Section number `"01"` decorative behind heading

### 6.4 About Section

- Section number `"02"` decorative
- Two columns, 60/40 split, stacks at `768px`
- Left:
  - Section label: `"About"` mono small caps
  - Bio paragraph: 3-4 sentences. Key words (`"fullstack"`, `"AI"`, `"Sydney"`) wrapped in `<mark>` styled with `--accent-2` — subtle highlight
  - `"What I build"` — 3 items with icon + label + one-line description. `FadeUp` stagger.
- Right:
  - 2×2 stats grid
  - Each stat: large `CountUp` number + `CircularRing` SVG (fills as number counts) + label
  - Stats: `5+ years`, `20+ projects`, `3 countries`, `∞ coffee`
  - Cards: `--bg-surface`, `--border`, `--radius-lg`, subtle glow on hover

### 6.5 Work Section — Self-Drawing Timeline

- Section number `"03"`, section title `"Where I've worked"`
- Vertical line: `2px` wide, `--accent-1` at 40% opacity, `left: 2rem`, `scaleY` driven by `scrollYProgress` via `useScroll` on section ref. Line grows as user scrolls.
- Per experience (max 5 most recent):
  - Dot on line: 10px circle, `--accent-1`. Current role: pulsing ring `@keyframes pulse-ring`. Past: hollow circle.
  - Card animates in `x: 40px → 0, opacity: 0 → 1` on scroll (`whileInView`)
  - Card content: Company (mono, `--text-muted`) + Location · Role title (Syne, large) · Date range + duration · Description · Tech `Tag` row · Achievements bullet list
  - Card hover: `background` lifts to `--bg-elevated`, left border `2px --accent-1` slides in
  - Current role: badge `"Current"` with pulsing dot + `--accent-2` color

### 6.6 Projects Section — Filter + Bento Layout Animation

- Section number `"04"`, title `"Things I've built"`
- Filter tabs: `[All, Web, AI, Fullstack, Backend]`
  - Active tab: `layoutId="filter-indicator"` shared underline slides between tabs
  - On filter change: `AnimatePresence` + Framer Motion `layout` on each card — cards rearrange with spring, exiting cards scale/fade out, entering scale/fade in
- Grid: CSS `grid-template-columns: repeat(12, 1fr)`, auto rows
  - Featured project (first AI or fullstack): spans 8 cols, tall. Other cards: 4 cols each.
  - Mobile: 1 col
- Each card:
  - `data-tilt` — 3D tilt on `mousemove` via `useMotionValue` + `useSpring`
  - Category tag top-left (`Tag` component)
  - Gradient placeholder (unique per category: indigo→purple for AI, cyan→blue for web) if no image
  - Project title — Syne bold
  - Description — 2-3 lines clamped
  - Tech tags row
  - Hover: border `--border-hover`, glow `var(--shadow-glow)`, reveal panel slides up from bottom with `"View Case Study →"` + links (GitHub + Live). `AnimatePresence` on reveal panel.
- "View all projects →" link below grid if >6 projects exist (links to full `/projects` route)

### 6.7 Contact Section

- Section number `"05"`, full section height
- Background: mouse-parallax mesh (same as hero, lower intensity 0.04×)
- Center-aligned content
- Label: `"Let's talk"` mono
- Heading: `"Let's build something."` — Syne, `clamp(3rem, 7vw, 6rem)`, gradient text
- Sub-line: `"Open to fullstack, AI engineering, and freelance."`
- Email CTA:
  - Displayed as large styled heading
  - Default label: `"ricky@..."` — hover shows `"Click to copy"`
  - On click: `navigator.clipboard.writeText(email)` → checkmark SVG path animation → `"Copied!"` label. Reset after 3s.
- Divider: `1px --border`
- Inline contact form (toggle):
  - Button `"Or send a message →"` → `AnimatePresence` opens form below (name + message textarea + send)
  - Form submits to existing backend `/api/messages` endpoint
  - On success: form fades out, confirmation message fades in
- Social icons: GitHub, LinkedIn — SVG inline, `--text-dim` → `--text-primary` on hover with glow

### 6.8 Footer

- Single row: `"© 2026 Ricky Chen"` left + `"Built with React"` right
- `--bg-base`, `--text-dim`. No distraction.

### 6.9 Project Detail Page (`/projects/:id`)

- Hero: full-width, `60vh`. Large project title (Syne, display). Year + category badge. Gradient BG unique to project category.
- Breadcrumb: `"Projects / [title]"` — mono, `--text-muted`
- Body: two columns (65/35)
  - Left: long description paragraphs, architecture notes, challenges section, outcome
  - Right: sticky metadata card — tech stack tags, GitHub link, live link, duration, role, category
- Screenshot/media area: CSS grid of images (lazy loaded, WebP). If no images: large gradient placeholder with project icon.
- `"Next project →"` navigation at bottom: card preview with title + category, hover tilt, links to next project in data array
- Back link: `"← All projects"` → `/`#projects smooth scroll

### 6.10 Scroll Dot Navigation (Right Side Fixed)

- `position: fixed`, `right: 1.5rem`, `top: 50%`, `transform: translateY(-50%)`
- One dot per section. `aria-label="Go to [section name]"`.
- Active: Framer Motion `layoutId="dot-active"` shared fill that moves between dots — spring animated
- Inactive: `6px` `--text-dim`. Active: `12px` `--accent-1`. Transition spring.
- Click → `element.scrollIntoView({ behavior: 'smooth' })`
- Hidden on mobile `<768px`

---

## 7. Responsive Strategy

- Mobile-first CSS throughout
- Breakpoints: `640px` (sm), `768px` (md), `1024px` (lg), `1280px` (xl)
- Hero name: `clamp(3rem, 10vw, 9rem)` — fluid
- Bento grid: 12-col → 1-col on mobile
- Timeline: stays vertical, cards full-width on mobile
- Header: hamburger at `<768px`
- Scroll dot nav: hidden `<768px`
- Custom cursor: hidden `@media (pointer: coarse)`
- Contact form: full-width on mobile

---

## 8. Performance Constraints

- Fonts: `font-display: swap`, `<link rel="preconnect">` to Google Fonts
- Images: `loading="lazy"`, WebP preferred, `<img>` with explicit `width`/`height`
- Framer Motion: `LazyMotion` with `domAnimation` feature bundle (no 3D, no drag extras unless needed)
- Marquee: pure CSS (zero JS)
- Mesh BG: CSS gradients + CSS vars (zero canvas/WebGL)
- No icon library — all SVGs inline or as React components
- Code split: all pages lazy via `React.lazy` (existing App.tsx pattern)
- Noise texture: SVG filter inline in CSS (zero network request)
- `prefers-reduced-motion`: all animations gated via `useReducedMotion()`
- Circular ring SVG: lightweight, no charting library

---

## 9. Accessibility

- Focus ring: `2px solid var(--accent-1)`, `outline-offset: 4px`
- Skip link: `"Skip to main content"` — visible on focus, first element in DOM
- Touch targets: min `44×44px` for all interactive elements
- Color contrast: all text/bg combos ≥ 4.5:1 AA
- Semantic HTML: `<nav>`, `<main>`, `<section aria-label>`, `<article>` for project cards
- Copy button: `aria-live="polite"` region announces `"Copied!"` to screen readers
- Filter tabs: `role="tablist"`, `role="tab"`, `aria-selected`
- Scroll dot nav: `aria-label` per dot
- Motion: `prefers-reduced-motion` respected everywhere

---

## 10. Files NOT in Scope

- Admin CMS pages: minimal functional rebuild only (not redesigned)
- Backend: no changes
- `/privacy`, `/terms`: minimal text layout
- Test suite: update broken imports only, no new tests

---

## 11. Implementation Order

1. Google Fonts in `public/index.html` + `design-tokens.css` (all CSS vars)
2. `base.css` (reset, body, typography, noise overlay) + `animations.css` (keyframes) + `dark-mode.css`
3. Motion utilities: `FadeUp`, `SplitText`, `CountUp` + `CircularRing`, `Marquee`, `CurtainTransition`
4. Layout: `Section` (with section-number slot), `Header` (sliding indicator), `Footer`, `CustomCursor`, `ScrollDotNav`
5. UI atoms: `Button`, `Tag`, `Card` (with tilt)
6. `ThemeContext` rebuild (dark/light toggle)
7. `HeroSection` (mouse-parallax mesh, SplitText name, role cycle, gradient text)
8. `StackSection` (marquee, pauseOnHover, item tooltip)
9. `AboutSection` (bio with highlights, CountUp + ring stats)
10. `WorkSection` (scroll-drawn timeline, pulse dot, expandable cards)
11. `ProjectsSection` (filter tabs + layout animation, bento grid, tilt cards, hover reveal)
12. `ContactSection` (copy email, inline form, mouse-parallax)
13. `Home` page (compose all sections, ScrollDotNav sections map)
14. `ProjectDetail` page (full spec §6.9)
15. `Resume` page (printable layout)
16. `NotFound` page
17. `App.tsx` rewire (CurtainTransition, ThemeProvider, contexts)
18. Admin pages minimal rebuild
19. `npm run lint` pass + broken imports fixed
