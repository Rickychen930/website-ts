# Design System — Signal

Sistem desain terpusat untuk **website-ts**. Semua UI harus konsisten, responsif, token-driven, dan mudah di-maintain (KISS + DRY).

---

## Filosofi

1. **Token-first** — Tidak ada hex/rgb/spacing mentah di komponen; hanya `var(--…)`.
2. **Component-based** — Compose dari atom → layout → domain.
3. **Responsive by default** — Mobile-first; breakpoint dari token container.
4. **Accessible** — Kontras, focus ring, reduced motion, touch targets.
5. **Performance** — Animasi ringan; dekorasi tidak mengganggu konten.

**Nama tema:** `Signal` — deep slate, electric sky cyan, violet halus di gradient.

**Single source of truth:** `src/styles/design-tokens.css`

---

## Hierarki komponen (Atomic Design)

```
Pages (views/pages/)
  └── Layout (Header, Footer, Section)
        └── Domain (ProjectCard, ExperienceItem, SkillBadge, …)
              └── UI Atoms (Button, Card, Typography, Loading)
```

| Layer          | Lokasi                               | Contoh                         | Tanggung jawab                   |
| -------------- | ------------------------------------ | ------------------------------ | -------------------------------- |
| **UI**         | `views/components/ui/`               | `Button`, `Card`, `Typography` | Variant, a11y, tidak tahu domain |
| **Layout**     | `views/components/layout/`           | `Section`, `Header`, `Footer`  | Grid, rhythm, section chrome     |
| **Domain**     | `views/components/domain/`           | `ProjectCard`, `HonorCard`     | Menampilkan data profil          |
| **Shared**     | `src/components/`                    | `ThemeToggle`, `ScrollReveal`  | Efek global, bukan MVC view      |
| **Pages**      | `views/pages/`                       | `Home`, `Projects`             | Compose sections + data          |
| **Page shell** | `views/components/layout/PageShell/` | `PageShell`                    | `page-inner` + optional `rail`   |

---

## Design tokens

### Sumber & aturan

| Sumber                         | Penggunaan                                                    |
| ------------------------------ | ------------------------------------------------------------- |
| `src/styles/design-tokens.css` | **CSS** — semua `*.module.css` & global styles                |
| `src/config/theme.ts`          | **Runtime TS** — theme object (light/dark) jika dipakai di JS |
| `src/styles/base.css`          | Reset, body, typography global                                |
| `src/styles/layout-system.css` | Container, grid, section spacing                              |
| `src/styles/page-patterns.css` | Page shell, filters, CTA band, empty states                   |
| `src/styles/dark-mode.css`     | Override tambahan (jika ada)                                  |

**Aturan keras:** Jangan hardcode `#0ea5e9`, `16px`, `box-shadow: 0 4px…` di file komponen. Pakai token.

### Kategori token

#### Warna

```css
/* Primitif */
--color-primary-50 … --color-primary-900
--color-accent-50 … --color-accent-700
--color-neutral-50 … --color-neutral-900

/* Semantik */
--bg-primary, --bg-secondary, --bg-card
--text-primary, --text-secondary, --text-muted
--border-primary, --color-success, --color-error

/* Alias tema — prefer di komponen */
--theme-primary, --theme-accent
--theme-surface, --theme-surface-alt, --theme-surface-card
--theme-text, --theme-text-muted, --theme-heading
--theme-border
```

#### Spacing

```css
--spacing-xs   /* 0.25rem */
--spacing-sm   /* 0.5rem  */
--spacing-md   /* 1rem    */
--spacing-lg   /* 1.5rem  */
--spacing-xl   /* 2rem    */
--spacing-2xl … --spacing-6xl
```

#### Tipografi

```css
--font-family-sans      /* Plus Jakarta Sans */
--font-family-display   /* Space Grotesk */
--font-family-mono      /* JetBrains Mono */

--font-size-xs … --font-size-8xl
--font-weight-light … --font-weight-bold
--line-height-tight | normal | relaxed
--letter-spacing-tight | normal | wide
```

#### Radius, shadow, motion

```css
--radius-sm … --radius-full
--theme-radius, --theme-radius-card
--shadow-sm … --shadow-2xl, --shadow-colored, --shadow-glow
--theme-shadow, --theme-shadow-hover

--transition-fast | normal | slow
--ease-out-expo, --ease-in-out-expo
--theme-transition
```

#### Layout & z-index

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1200px;
--container-2xl: 1400px;

--z-dropdown, --z-sticky, --z-modal, --z-tooltip, …
```

#### Gradient & pola

```css
--gradient-hero, --gradient-hero-glow
--gradient-primary-accent, --gradient-text
--pattern-line-color, --pattern-grid-size
```

### Dark mode

- Class `.dark` pada `<html>` atau root (via `ThemeContext`).
- Override token di blok `.dark` dalam `design-tokens.css`.
- Komponen **tidak** mendefinisikan warna dark sendiri — cukup pakai `--theme-*` / `--bg-*` / `--text-*`.

```tsx
// ThemeContext men-toggle class + localStorage
document.documentElement.classList.toggle("dark", isDark);
```

---

## Responsive system

### Breakpoints (referensi)

| Nama    | Lebar      | Penggunaan                                 |
| ------- | ---------- | ------------------------------------------ |
| **sm**  | ≤ 640px    | Typography scale down, stack columns       |
| **md**  | ≤ 768px    | Nav mobile, padding section, touch targets |
| **lg**  | 769–1024px | Tablet grid 2 kolom                        |
| **xl+** | > 1024px   | Desktop multi-column, hero lebar penuh     |

Gunakan **container tokens** di CSS:

```css
.section-inner {
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--spacing-lg);
}

@media (width <= 768px) {
  .section-inner {
    padding-inline: var(--spacing-md);
  }
}
```

File referensi: `src/styles/layout-system.css`, `src/styles/mobile-enhancements.css`.

### Mobile-first checklist

- [ ] Layout stack vertikal di ≤ 768px
- [ ] Font hero: `--font-size-4xl` → `--font-size-3xl` di mobile
- [ ] Gap grid: `--spacing-lg` → `--spacing-md`
- [ ] Tombol & link: min-height / min-width **44px**
- [ ] Tidak ada horizontal scroll involuntary
- [ ] Landscape phone: cek `mobile-enhancements.css`

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Particle / cursor effects harus respect preferensi ini (lihat `animations.css`, `ParticleBackground`).

---

## Komponen inti

### Button (`views/components/ui/Button`)

| Prop        | Nilai                                            | Default   |
| ----------- | ------------------------------------------------ | --------- |
| `variant`   | `primary` \| `secondary` \| `outline` \| `ghost` | `primary` |
| `size`      | `sm` \| `md` \| `lg`                             | `md`      |
| `fullWidth` | boolean                                          | `false`   |
| `isLoading` | boolean + `aria-busy`                            | `false`   |

CSS: `Button.module.css` — hanya token, modifier BEM `button--{variant}`.

### Typography

- Gunakan komponen `Typography` untuk variant konsisten (`h1`–`body`, `muted`).
- Satu H1 per halaman (SEO + a11y).

### Card

- Background: `var(--theme-surface-card)`
- Border: `var(--theme-border)`
- Radius: `var(--theme-radius-card)`
- Hover: `var(--theme-shadow-hover)` + `transform` halus dengan `--ease-out-expo`

### Section (`views/components/layout/Section`)

| Prop              | Fungsi                                          |
| ----------------- | ----------------------------------------------- |
| `variant`         | `default` \| `alt` — band background bergantian |
| `surface`         | `default` \| `hero` \| `minimal`                |
| `headerAlign`     | `center` \| `start`                             |
| `titleDecoration` | `underline` \| `none`                           |
| `containerBleed`  | Hero full-bleed                                 |

Pattern: **rhythm vertikal** — alternate `variant="alt"` antar section panjang.

---

## Visual hierarchy (halaman portfolio)

Prioritas konten (atas → bawah):

1. **Hero** — nama, title, bio singkat, CTA, social
2. **Featured projects** — 3–6 kartu terbaik
3. **Stats** — angka kredibilitas
4. **Experience** — timeline kronologis terbalik
5. **Skills** — kategori + badge
6. **Education & certifications**
7. **Testimonials**

Setiap blok dibungkus `Section` dengan `label` (eyebrow) + `title` + `subtitle` opsional.

---

## Spacing & grid

### Skala vertikal antar section

- Section padding block: `--spacing-3xl` desktop, `--spacing-2xl` tablet, `--spacing-xl` mobile
- Gap antar kartu dalam grid: `--spacing-lg`
- Stack item dalam kartu: `--spacing-sm` – `--spacing-md`

### Grid pola umum

```css
.grid-projects {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
}
```

---

## Focus & accessibility

```css
:focus-visible {
  outline: var(--focus-outline-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-outline-offset);
  box-shadow: 0 0 0 4px var(--focus-ring-glow);
}
```

- Skip links: `src/components/SkipLinks`
- `aria-busy`, `aria-label`, roles pada nav/form/list
- Kontras teks: `--text-primary` on `--bg-primary` (cek WCAG AA)
- High contrast: `accessibility.css` → `prefers-contrast: high`

---

## Animasi

| Level | Contoh                        | Token                                  |
| ----- | ----------------------------- | -------------------------------------- |
| Micro | Button ripple, link underline | `--transition-fast`, `--ease-out-expo` |
| Meso  | Card hover lift               | `--theme-shadow-hover`                 |
| Macro | Scroll reveal, section enter  | Framer Motion — sparingly              |

**Jangan** animasi yang memblokir interaksi atau memicu layout shift berlebihan (CLS).

---

## Admin UI

- Pakai token yang sama; variasi density boleh `--spacing-md` untuk tabel.
- File: `views/pages/Admin/*.module.css` — tetap `var(--theme-*)`, hindari warna ad-hoc.

---

## Audit halaman

```bash
npm run design:check   # hex di module CSS, page-inner per halaman publik
```

## Menambah komponen baru

1. Tentukan layer: `ui` | `layout` | `domain`.
2. Buat folder: `ComponentName/index.ts`, `ComponentName.tsx`, `ComponentName.module.css`.
3. Props interface eksplisit; extend HTML attributes jika native element.
4. CSS hanya token; jalankan `npm run css:check` jika tersedia.
5. Export dari `index.ts` barrel.
6. Dokumentasikan variant di header file komponen.

### Template CSS modul

```css
.root {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--theme-surface-card);
  border: 1px solid var(--theme-border);
  border-radius: var(--theme-radius-card);
  box-shadow: var(--theme-shadow);
  transition: box-shadow var(--theme-transition);
}

.root:hover {
  box-shadow: var(--theme-shadow-hover);
}

@media (width <= 768px) {
  .root {
    padding: var(--spacing-md);
  }
}
```

---

## Anti-patterns (hindari)

| ❌ Jangan                  | ✅ Lakukan                                          |
| -------------------------- | --------------------------------------------------- |
| `color: #0ea5e9`           | `color: var(--theme-accent)`                        |
| `padding: 12px 20px`       | `padding: var(--spacing-sm) var(--spacing-lg)`      |
| Duplikasi grid di 10 file  | Utility di `layout-system.css` atau komponen layout |
| Inline style untuk tema    | CSS module + token                                  |
| Komponen domain import API | Data dari page/controller/context                   |

---

## Sinkronisasi & tooling

```bash
npm run css:check      # arsitektur CSS / hardcoded values
npm run lint           # ESLint frontend
```

Dokumen tema historis: `DESIGN_THEME.md`, audit: `docs/UI_UX_DESIGN_GUIDELINES.md`.

---

_Design system ini hidup bersama kode — ubah token di `design-tokens.css` dulu, baru komponen mengikuti._
