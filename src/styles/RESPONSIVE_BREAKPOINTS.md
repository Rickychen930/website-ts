# Responsive Breakpoints

Use these breakpoints consistently so layout does not “jump” at random widths.

## Standard breakpoints (align with design-tokens.css and design-tokens.ts)

| Name        | Value    | Usage                                                                                        |
| ----------- | -------- | -------------------------------------------------------------------------------------------- |
| **Mobile**  | `640px`  | `(width <= 640px)` – single column, stacked CTAs, larger touch targets                       |
| **Tablet**  | `768px`  | `(width <= 768px)` for mobile menu / global layout; `641px–768px` for tablet-specific tweaks |
| **Desktop** | `1024px` | `(width >= 1024px)` for desktop nav; `769px–1024px` for tablet landscape                     |
| **Wide**    | `1200px` | Used in Header for container / nav layout                                                    |

## CSS usage

- Prefer **range queries** for clarity:  
  `(width <= 640px)`, `(width >= 641px) and (width <= 768px)`, `(width >= 1025px)`.
- **Container widths** come from `design-tokens.css`:  
  `--container-sm` (640px), `--container-md` (768px), `--container-lg` (1024px), `--container-xl` (1200px), `--container-2xl` (1400px).
- **Touch targets:** In `accessibility.css`, interactive elements use min 44×44px (or 2.75rem) at `(width <= 768px)`.

## Exceptions

- **Admin layout:** Uses `900px` for sidebar collapse in `Admin.module.css`; keep as-is for dashboard UX.
- **Landscape:** Some components use `(orientation: landscape) and (width <= 768px)` for mobile landscape.

## Audit checklist

When adding or changing responsive styles:

- [ ] Use 640 / 768 / 1024 (and 1200 where needed), not ad-hoc pixel values.
- [ ] Use `var(--container-*)` for max-width where appropriate.
- [ ] Test at 320px, 640px, 768px, 1024px, and 1280px.
