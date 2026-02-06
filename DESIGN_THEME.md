# Tema Desain – Modern Tech Paper

Satu tema dipakai untuk **seluruh** situs agar semua komponen sync satu sama lain.

---

## Nama tema

**"Modern Tech Paper"** – profesional, grid halus, tekstur kertas (grain + lecek), tipografi jelas.

---

## Sumber kebenaran (single source of truth)

- **File:** `src/styles/design-tokens.css`
- **Aturan:** Semua komponen (Section, Card, Header, Footer, Hero, Button, dll.) **hanya** memakai variabel dari file ini. **Jangan** hardcode warna, spacing, radius, atau shadow di file komponen.

---

## Token tema (alias)

Gunakan alias ini agar konsisten; isinya mengacu ke token detail di `design-tokens.css`:

| Alias                    | Untuk apa                          | Contoh pakai                                |
| ------------------------ | ---------------------------------- | ------------------------------------------- |
| `--theme-primary`        | Warna utama (tombol, link, aksen)  | `color: var(--theme-primary)`               |
| `--theme-primary-strong` | Primary lebih tegas (hover, aktif) | `border-color: var(--theme-primary-strong)` |
| `--theme-accent`         | Aksen (success, highlight)         | `background: var(--theme-accent)`           |
| `--theme-surface`        | Background halaman                 | `background: var(--theme-surface)`          |
| `--theme-surface-alt`    | Background section alternatif      | Section `variant="alt"`                     |
| `--theme-surface-card`   | Background kartu                   | Card, ProjectCard, dll.                     |
| `--theme-text`           | Teks utama                         | Body, heading                               |
| `--theme-text-muted`     | Teks sekunder                      | Subtitle, caption                           |
| `--theme-border`         | Garis, border                      | Border card, input                          |
| `--theme-radius`         | Sudut membulat umum                | Button, input                               |
| `--theme-radius-card`    | Sudut kartu                        | Card, modal                                 |
| `--theme-shadow`         | Bayangan default                   | Card, dropdown                              |
| `--theme-shadow-hover`   | Bayangan hover                     | Card hover                                  |
| `--theme-transition`     | Transisi standar                   | Hover, focus                                |
| `--theme-font`           | Font body                          | Body, paragraf                              |
| `--theme-font-display`   | Font heading                       | H1, H2, judul section                       |
| `--theme-pattern`        | Warna garis grid                   | Pola background                             |
| `--theme-pattern-size`   | Ukuran grid                        | `background-size` pola                      |

---

## Elemen tema yang sama di mana-mana

1. **Warna** – Primary (biru), Accent (hijau), dari token.
2. **Tipografi** – Plus Jakarta Sans (display + body), JetBrains Mono (code), dari token.
3. **Spacing** – `--spacing-xs` s/d `--spacing-5xl`; tidak pakai nilai bebas (mis. `12px`).
4. **Radius** – `--radius-sm` s/d `--radius-full`; kartu pakai `--theme-radius-card` / `--radius-xl`.
5. **Shadow** – `--shadow-sm` s/d `--shadow-xl`, `--shadow-colored`, `--shadow-card-edge`; hover pakai `--theme-shadow-hover`.
6. **Transisi** – `--ease-out-expo`, `--transition-normal`; komponen interaktif pakai `--theme-transition`.
7. **Pola & tekstur** – Grid garis: `--pattern-line-color`, `--pattern-grid-size`; grain + wrinkle dari overlay global (App).

---

## Dark mode

Semua token warna, background, dan gradient punya override di `.dark` di `design-tokens.css`.  
Theme alias (`--theme-*`) mengacu ke token itu, jadi dark mode otomatis ikut. **Jangan** definisi ulang warna tema di komponen; cukup andalkan token.

---

## Checklist agar tetap sync

- [ ] Tidak ada hex/rgb langsung di CSS komponen (pakai `var(--...)`).
- [ ] Spacing pakai `--spacing-*` atau `--theme-*`.
- [ ] Font pakai `--theme-font` / `--theme-font-display` atau `--font-family-*`.
- [ ] Kartu/section pakai `--theme-surface-card` / `--theme-surface-alt` dan token pola.
- [ ] Transisi pakai `--ease-out-expo` dan `--transition-normal` (atau `--theme-transition`).

---

**Terakhir diperbarui:** sesuai commit  
**File tema:** `src/styles/design-tokens.css`
