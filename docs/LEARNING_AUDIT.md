# Learning Section – Audit & Improvements

Ringkasan audit dan perbaikan yang diterapkan agar learning section lebih konsisten, maintainable, dan robust.

---

## 0. Pengecekan keseluruhan (full audit)

| Area                  | Status | Catatan                                                                                                                                                                                                                                                       |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Routing**           | ✅     | `/learning`, `/learning/:sectionSlug`, `/learning/:sectionSlug/:topicId`; route topic detail didefinisikan sebelum section-only agar match benar.                                                                                                             |
| **Profile & API**     | ✅     | ProfileController getProfile → transformProfile → learningSections; updateProfile menerima learningSections dan mempertahankan item.id.                                                                                                                       |
| **Seed**              | ✅     | seedData impor learningSections dari learningSeed; buildLearningSections sort by order; imageMap untuk semua imageKey.                                                                                                                                        |
| **Frontend state**    | ✅     | useProfile() → getPublishedLearningSections() (filter published + sort by order).                                                                                                                                                                             |
| **Fallback profile**  | ✅     | FALLBACK_PROFILE punya learningSections: [] agar shape eksplisit saat backend down (dev).                                                                                                                                                                     |
| **Topic URL**         | ✅     | Link pakai encodeURIComponent(item.id); detail page pakai decodeURIComponent(topicId) untuk resolve topic.                                                                                                                                                    |
| **Section themes**    | ✅     | Semua slug yang dipakai (how-to-learn, competitive-programming, nodejs, database-sql, react, interview-preparation) ada di sectionThemes; fallback indigo + book.                                                                                             |
| **Sitemap**           | ✅     | LEARNING_SECTION_SLUGS di generate-sitemap.js diselaraskan dengan learningSeed (6 section); sitemap.xml hanya memuat URL section yang ada.                                                                                                                    |
| **SkipLinks**         | ✅     | Di /learning dan /learning/\* ada skip link ke #learning, #learning-section, atau #learning-topic-detail.                                                                                                                                                     |
| **Admin**             | ✅     | AdminLearning load/save profile.learningSections; backend menyimpan items dengan id, title, content, dll.                                                                                                                                                     |
| **Empty / not found** | ✅     | Section 0 topics → empty state. Section slug tidak ada → Navigate to /learning. Topic tidak ada → Navigate to /learning. Catch-all route `path="*"` menampilkan halaman NotFound (judul, path yang diminta, link ke Home & Learning) alih-alih redirect ke /. |

---

## 1. Audit findings (perbaikan sebelumnya)

### 1.1 Urutan section & topic

- **Problem:** `getPublishedLearningSections()` hanya filter `published`, tidak sort by `order`. Urutan tampil mengandalkan urutan array dari API.
- **Perbaikan:** Sort eksplisit: `filter(...).sort((a, b) => a.order - b.order)` di `ProfileModel.getPublishedLearningSections()`. Di seed, `buildLearningSections()` juga sort sections dan items by `order` agar output selalu terurut.

### 1.2 Duplikasi logic

- **Problem:** `isPlaceholderImage()` didefinisikan di `LearningSectionPage.tsx` dan `LearningTopicDetail.tsx`.
- **Perbaikan:** Dipindah ke `sectionThemes.tsx` dan di-export; kedua halaman mengimpor dari sana.

### 1.3 Sinkronisasi label konten

- **Problem:** Label 8 bagian konten (Learning flow, Material, …) ada di backend (`CONTENT_SECTION_LABELS`) dan frontend (`SECTION_LABELS`). Perubahan di satu tempat bisa bikin tidak sync.
- **Perbaikan:** Tambah komentar di `LearningTopicDetail.tsx`: "Must match backend learningSeedStructure CONTENT_SECTION_LABELS". Backend tetap single source of truth untuk seed; frontend hanya menampilkan.

### 1.4 Back to top

- **Problem:** Tombol "Back to top" hanya tampil jika `sections.length > 6`. Saat ada persis 6 section, tombol tidak muncul.
- **Perbaikan:** Kondisi diubah ke `sections.length >= 6`.

### 1.5 Section tanpa slug

- **Problem:** Jika section tidak punya `slug`, link kartu ke `"#"` (dead link).
- **Perbaikan:** Fallback `to="/learning"` ketika `!section.slug` sehingga kartu tetap mengarah ke halaman Learning.

### 1.6 Seed builder

- **Problem:** Urutan section/topic di output bergantung urutan input; tidak ada jaminan sort.
- **Perbaikan:** Di `buildLearningSections()`: items di-sort by `order`, lalu sections di-sort by `order`. Dokumentasi ditambah: jika `imageMap[imageKey]` tidak ada, `imageUrl` undefined (UI pakai gradient fallback).

---

## 2. Checklist konsistensi

| Aspek                       | Status                                                                                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Section order (frontend)    | ✅ Sort by `order` di `getPublishedLearningSections()`                                                                                                |
| Section order (seed output) | ✅ Sort di `buildLearningSections()`                                                                                                                  |
| Topic order dalam section   | ✅ Sort items by `order` di `buildLearningSections()` dan di halaman detail (prev/next)                                                               |
| Label 8 bagian              | ✅ Sama di backend & frontend; ada komentar sync                                                                                                      |
| Fallback gambar             | ✅ `isPlaceholderImage` dipakai seragam; satu definisi di `sectionThemes`                                                                             |
| Theme per slug              | ✅ Semua slug yang dipakai (how-to-learn, competitive-programming, react, nodejs, database-sql, interview-preparation) punya entry di `sectionThemes` |

---

## 3. Perbaikan dari full audit

- **FALLBACK_PROFILE:** Ditambah `learningSections: []` agar shape profile lengkap saat backend tidak tersedia (dev).
- **Sitemap:** `LEARNING_SECTION_SLUGS` di `scripts/generate-sitemap.js` disesuaikan dengan section di `learningSeed.ts` (6 slug). Sitemap tidak lagi memuat URL section yang tidak ada (menghindari soft-404).

## 4. Perbaikan terbaru (post-audit)

- **CodeBlock:** Tombol **Copy** di header; `handleCopy` memakai `navigator.clipboard.writeText(code)`, state `copied` 2 detik, label "Copy" / "Copied!", `aria-label`. Media query `prefers-reduced-motion: reduce` menonaktifkan `transform: scale(0.98)` pada `:active`.
- **Learning empty state:** Pesan diperjelas: "No learning sections published yet." + "Run the seed script to load the curriculum, or check back later."
- **Node.js:** Topik baru **Express & REST** (order 1): minimal API dengan Express, routes, middleware, `express.json()`, GET/POST, error middleware; imageKey `nodejs`.
- **Section page (0 topik):** Empty state diperjelas: teks "No topics in this section yet. Check back later." + link **Browse other sections** ke `/learning`.
- **Validasi seed:** Script `npm run learning:validate` menjalankan `backend/src/seed/learningSeed.ts`; bisa dipakai di CI. Dokumentasi di LEARNING_CONTRIBUTING.md §5 mengacu ke script ini.
- **A11y topic detail:** Link prev/next di footer punya `aria-label` ("Previous topic: …", "Next topic: …").
- **Validasi seed (kebab-case):** `validateLearningSeed` memeriksa section `slug` dan topic `id` harus format kebab-case (huruf kecil, angka, strip) agar URL konsisten.
- **Skip link target fokus:** Section Learning (`#learning`, `#learning-section`, `#learning-topic-detail`) diberi `tabIndex={-1}` agar saat "Skip to curriculum" diaktifkan, fokus pindah ke target dan keyboard user tidak tersangkut di header.
- **SkipLinks pengumuman:** Teks pengumuman (aria-live) disesuaikan per target: "main content", "navigation", "contact form", "curriculum", "section topics", "topic content" (bukan lagi hanya main/navigation).
- **Konsistensi view Learning:** (1) Empty state Learning pakai `tabIndex={-1}` dan `variant="alt"` agar skip target dan tampilan selaras dengan halaman berisi section. (2) Section layout: skip target (section dengan `tabIndex={-1}`) dapat outline fokus di `.section[tabindex="-1"]:focus-visible` (Section.module.css) agar keyboard user melihat fokus setelah "Skip to curriculum". (3) Link "Back to Learning" dan "Back to {section}" punya `aria-label` ("Back to Learning overview", "Back to section: …") untuk a11y.
- **Print Section page:** LearningSectionPage.module.css mendapat `@media print`: wrapper max-width 100%, breadcrumb/link warna teks primary, topicItem break-inside avoid, footer dan backLink rapi agar cetak daftar topik per section konsisten dengan Topic detail.
- **Urutan topic di satu tempat:** `ProfileModel.getPublishedLearningSections()` sekarang mengembalikan section dengan `items` yang sudah di-sort by `order`, sehingga view (LearningSectionPage, LearningTopicDetail) tidak perlu sort lagi; logika urutan terpusat di model.
- **SeedData:** Komentar di `seedData.ts` menjelaskan bahwa `learningSections` diimpor dari `learningSeed` dan harus lulus `npm run learning:validate`; mengingatkan untuk tidak meng-inline dan mengedit section/topic di `learningSeed.ts`.

## 5. Rekomendasi ke depan

1. **Validasi seed:** Saat development, bisa tambah assertion: setiap `imageKey` di topic ada di `IMG`, dan setiap section `slug` ada di `sectionThemes`.
2. **Shared constants:** Jika monorepo mengizinkan, pertimbangkan satu file shared (e.g. `CONTENT_SECTION_LABELS`) yang di-import backend + frontend agar label benar-benar single source of truth.
3. **A11y:** Sudah ada aria-label di kartu, daftar topik, dan breadcrumb; pertahankan dan uji dengan screen reader bila perlu.
4. **SEO:** Judul/deskripsi halaman Learning dan section sudah di-set dari `useSEO`; topic detail memakai judul topic + section + profile name.
5. **Sitemap:** Setiap kali menambah/menghapus section di learningSeed, update `LEARNING_SECTION_SLUGS` di `scripts/generate-sitemap.js` lalu jalankan `npm run sitemap:generate` (atau bagian build yang memanggilnya).
