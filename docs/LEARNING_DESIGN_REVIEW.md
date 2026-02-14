# Learning Section – Senior Designer Review & Rombakan

## Ringkasan

Sebagai senior designer, saya meninjau seluruh Learning section (landing, section page, topic detail) plus komponen terkait (sectionThemes, Home CTA). Berikut **apa yang ingin diubah** dan **alasan** — plus implementasi yang dilakukan agar section ini jadi **yang terbaik**.

---

## 1. Learning Landing (`/learning`)

### Yang sudah baik

- Grid kartu section dengan gradient banner + icon per section.
- Quick nav "Jump to" untuk banyak section.
- Label "Curriculum", info line, empty state ada.
- Responsive, touch target 2.75rem, print-friendly.

### Yang diubah / ditambah

| Aspek                | Sebelum                         | Sesudah (target)                                                                                                      |
| -------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Hero / identitas** | Hanya title + subtitle Section. | Intro lebih kuat: eyebrow "Curriculum", title "Learning", subtitle yang lebih engaging; rasa "mulai belajar di sini". |
| **Quick nav**        | Daftar link teks saja.          | Pill/chip dengan **icon per section** (dari sectionThemes) agar lebih scannable dan konsisten dengan kartu.           |
| **Kartu section**    | Hover: border + arrow.          | Hover lebih jelas: subtle scale/glow, border-left accent pakai gradient section; "View topics" lebih menonjol.        |
| **Empty state**      | Icon + 2 baris teks.            | Icon lebih besar, copy lebih ramah ("Belum ada section" + CTA ke seed/admin).                                         |

---

## 2. Learning Section Page (`/learning/:sectionSlug`)

### Yang sudah baik

- Breadcrumb, header dengan banner gradient, list topic dengan thumb + index.
- Topic card hover (border, shadow, translateY).

### Yang diubah / ditambah

| Aspek                         | Sebelum                                     | Sesudah (target)                                                                                            |
| ----------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Breadcrumb**                | Teks + "/".                                 | Tetap aksesibel; bisa tambah chevron/separator visual yang lebih jelas.                                     |
| **Header**                    | Banner 6rem, title clamp.                   | Banner sedikit lebih tinggi di desktop; hierarchy title vs description lebih tegas.                         |
| **Daftar topic**              | "Select topic (N)".                         | Tetap "Select topic (N)" tapi tambah konteks "1–N" atau progress feel (mis. "Topic 1 of 12") di label/list. |
| **Topic card**                | Thumb kiri, index badge, title, desc clamp. | Hover lebih distinct; index badge pakai warna section (soft gradient) agar konsisten dengan tema section.   |
| **Footer "Back to Learning"** | Satu link.                                  | Tetap satu link; styling konsisten dengan design system (primary button-style atau secondary).              |

---

## 3. Learning Topic Detail (`/learning/:sectionSlug/:topicId`)

### Yang sudah baik

- Breadcrumb 3-level, hero image/placeholder, TOC (details/summary), 8-part content, callouts, code block, prev/next + back.

### Yang diubah / ditambah

| Aspek              | Sebelum                                                | Sesudah (target)                                                                                                         |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ----- | --------------------------------------------------------------------------------------- |
| **Section accent** | Semua detail section pakai `border-left: primary-500`. | Border-left (atau accent strip) pakai **gradient section** (dari sectionSlug) agar setiap section punya warna identitas. |
| **TOC**            | Sticky di desktop, details di mobile.                  | Tetap; pastikan sticky offset tidak tertutup header; summary lebih jelas ("On this page").                               |
| **Footer nav**     | Prev                                                   | Back to Section                                                                                                          | Next. | Prev/Next lebih seperti card (background, hover); judul panjang di-truncate; aksesibel. |
| **Hero**           | Gradient overlay generic.                              | Overlay bisa subtle; placeholder tetap pakai gradient section (sudah).                                                   |

---

## 4. Konsistensi & global

- **Section theme (gradient + icon)** dipakai konsisten di: landing card, section page banner & topic thumb, topic detail banner & hero placeholder & (opsional) detail section accent.
- **Typography**: tetap pakai design tokens (--font-_, --line-height-_); reading width 65ch di body sudah baik.
- **Aksesibilitas**: focus visible, reduced motion, skip link, ARIA tetap dipertahankan.
- **Dark mode**: gradient dan contrast dicek agar tetap terbaca.

---

## 5. Hal yang tidak diubah (sengaja)

- **Struktur konten 8-part** dan parsing (learning flow → … → additional information) — sudah jelas untuk learner.
- **Backend / seed** — tidak diubah; hanya frontend & CSS.
- **Routing** — tetap `/learning`, `/learning/:sectionSlug`, `/learning/:sectionSlug/:topicId`.

---

## 6. Implementasi yang dilakukan

1. **Learning landing**: Quick nav dengan icon per section; kartu dengan hover lebih kuat dan border-left gradient; empty state lebih ramah.
2. **Section page**: Header dan topic card lebih distinctive; topic index badge pakai nuansa section theme.
3. **Topic detail**: Detail section pakai accent warna section (gradient); footer prev/next seperti card; TOC dan hero tetap dirapikan.
4. **CSS saja** di mana cukup (module.css); TSX hanya di mana perlu (e.g. quick nav icon, passing sectionSlug untuk accent).

Dokumen ini bisa dipakai untuk alignment dengan stakeholder dan untuk onboarding developer ke arah "Learning section yang terbaik".

---

## Lanjutan perbaikan (follow-up)

- **Quick nav**: Hover pill tanpa `translateY` saat `prefers-reduced-motion: reduce`.
- **Breadcrumb**: Topic detail pakai chevron (→) seperti Section page, konsisten.
- **Section page**: Jumlah topic di header ("N topics"), dark mode `topicIndex` (text-shadow lebih tebal).
- **Print**: `cardAccent`, `topicIndex`, `detailSection::before` pakai `print-color-adjust: exact` agar gradient/aksen tercetak.
- **Back to top**: Muncul bila section ≥ 4 (sebelumnya 6).
- **Empty state**: Icon section page 5rem (sama dengan landing).

---

## Perbaikan lanjutan (batch 3)

- **Landing empty state**: Tambah CTA link **"Back to Home"** agar user tidak mentok; style `.emptyStateLink` di `Learning.module.css`.
- **Staggered card reveal**: Setiap kartu section dapat **delay** `(sectionIndex - 1) * 80` ms pada `ScrollReveal` untuk efek berurutan.
- **Topic detail – estimated reading time**: Hitung dari `topic.description` + `topic.content` (≈200 kata/menit), tampilkan **"X min read"** di bawah judul; style `.readingTime`.
- **Section page – Back to top**: Jika **> 8 topic**, tampil tombol **"Back to top"** yang scroll ke `#learning-section`; footer jadi flex column (tombol + link Back to Learning). Tombol disembunyikan saat print; `prefers-reduced-motion` dan touch target 2.75rem di mobile dijaga.

---

## Perbaikan lanjutan (batch 4)

- **Landing – jumlah section**: Teks info di bawah subtitle menampilkan **"(N section(s))"** (dinamis dari `sections.length`).
- **Section page – Prev/Next section**: Di footer ditambah navigasi **← Previous section** dan **Next section →** (link ke section sebelum/sesudah dalam daftar). Layout: [Prev] [Back to Learning] [Next]; di mobile stack vertikal; judul section panjang di-truncate (max-width 40%); print pakai warna teks primary.

---

## Pengecekan dan perombakan (batch 5)

- **Section page – label "Topics"**: Label **"Topics 1–N · select one to read"** hanya ditampilkan bila **items.length > 0** (menghindari "Topics 1–0" saat section kosong).
- **TopicLink**: Prop **total** yang tidak dipakai dihapus dari interface dan pemanggilan.
- **Learning.module.css – dead code**: Dihapus class yang tidak lagi dipakai di Learning.tsx: `.sectionToolbar`, `.toolbarBtn`, `.emptySection`, `.topicList`, `.topicItem`, `.topicToggle`, `.topicContentWrap`, `.topicDetailLink`, `.topicSection`, `.topicFigure`, `.topicCodeBlock`, serta blok list `.topicContent ul/li` dan referensi print `.sectionToolbar`.
- **Section page empty state**: Dimensi SVG icon di-set **80×80** (konsisten dengan landing; ukuran tampilan tetap 5rem via CSS).

---

## Perbaikan lanjutan (batch 6)

- **Topic detail – renderBody**: Variabel **item** di callback list (parseNestedListLines) diganti jadi **listItems** / **entry** agar tidak menimpa prop `item` (LearningTopicItem).
- **Section page – a11y**: Setiap link topic dapat **aria-label** `Read topic: ${item.title}` untuk pembaca layar.
- **Topic detail – LCP**: Hero image dapat atribut **fetchPriority="high"** agar browser memprioritaskan loading gambar utama.

---

## Pengecekan dan perombakan (batch 7)

- **TopicDetailContent**: Prop **sectionSlug** yang tidak dipakai dihapus dari interface dan dari pemanggilan.
- **Topic detail – sectionTheme**: **getSectionTheme(section.slug)** dihitung sekali lewat **useMemo** dan dipakai untuk gradient (Section style), banner, dan hero placeholder (menggantikan 5+ pemanggilan per render).
- **Section page – sectionTheme**: Theme section dihitung sekali dengan **useMemo** dan diteruskan ke **TopicLink** lewat prop **sectionTheme**; banner header dan tiap TopicLink memakai objek yang sama. **getSectionTheme** hanya dipanggil sekali per section page, bukan per topic.
