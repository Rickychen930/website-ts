# Learning Detail – Pengecekan Detail

**Tanggal:** 14 Februari 2025  
**Lingkup:** Learning main, Section page, Topic Detail, model, seed, routing, aksesibilitas

---

## Ringkasan

| Area              | Status   | Catatan                                                                                 |
| ----------------- | -------- | --------------------------------------------------------------------------------------- |
| Routing           | ✅ OK    | `/learning`, `/learning/:sectionSlug`, `/learning/:sectionSlug/:topicId` urutan benar   |
| Model & Domain    | ✅ OK    | `LearningTopicItem` punya `imageUrl`, `codeLanguage`; `LearningSection` lengkap         |
| Transform Profile | ✅ OK    | Backend mengisi `id` via `extractId` (ObjectId atau fallback `learning-item-sIdx-iIdx`) |
| Hero Image        | ✅ Fixed | Overlay gradient dipindah ke `::after` agar tampil di atas gambar                       |
| Section Themes    | ✅ OK    | Semua 16 slug section punya gradient & icon                                             |
| Aksesibilitas     | ✅ OK    | Breadcrumb, aria-label, focus-visible, TOC anchors                                      |
| Responsivitas     | ✅ OK    | clamp(), max-width, grid layout                                                         |

---

## 1. Routing & Navigasi

- **Urutan route:** Topic detail (`:topicId`) didefinisikan sebelum section (`:sectionSlug`) – benar.
- **Breadcrumb:** Learning → Section → Topic (current).
- **Footer nav:** Prev topic | Back to Section | Next topic; `encodeURIComponent(topicId)` dipakai untuk URL aman.
- **Jump to (Learning main):** `#section-{slug}` mengarah ke `id="section-{slug}"` pada Card.

---

## 2. Data Flow

### Backend → Frontend

- `transformProfile.ts` memetakan `learningSections` dan `items` dengan `extractId`.
- `id` item: `_id` MongoDB (jika ada) atau `learning-item-{sectionIdx}-{itemIdx}`.
- `imageUrl`, `codeExample`, `codeLanguage` ditransform dengan benar.

### Fallback Gambar

- **LearningSectionPage** & **LearningTopicDetail:** `getTopicImageUrl()` memakai `item.imageUrl` atau placehold.co dengan warna per section.
- Setiap card dan detail selalu menampilkan gambar.

---

## 3. Perbaikan yang Diterapkan

### Hero Overlay (LearningTopicDetail)

- **Sebelum:** `::before` di `.heroFigure` – overlay di belakang gambar.
- **Sesudah:** `::after` – overlay gradient tampil di atas gambar (visual lebih baik).

---

## 4. Komponen & UX

### LearningTopicDetail

- Hero image: full-width, rasio 21:9, `object-fit: cover`.
- Section cards: background, border kiri accent, hover shadow.
- Callouts: ikon untuk Tip, Note, Important.
- TOC: tampil jika `blockOrder.length > 2`; anchor `#detail-heading-{key}`.
- Heading: `scroll-margin-top: 5rem` untuk scroll ke heading saat klik TOC.

### LearningSectionPage

- Topic cards: thumbnail 6×4rem, nomor urut, deskripsi clamp 2 baris.
- Empty state: ikon + teks bila section tanpa topik.

### Learning (main)

- Section cards: gradient banner, badge "Start here" untuk how-to-learn.
- Quick nav "Jump to" jika sections > 1.

---

## 5. Edge Case yang Sudah Ditangani

| Kasus                            | Penanganan                                   |
| -------------------------------- | -------------------------------------------- |
| Section tidak ditemukan          | `Navigate to="/learning"`                    |
| Topic tidak ditemukan            | `Navigate to="/learning"`                    |
| topicId ter-encode (spasi, dll.) | `decodeURIComponent(topicId)` sebelum lookup |
| Topik tanpa content              | Hero + "No content for this topic yet."      |
| Section tanpa slug               | Card tidak link; quick nav tampil teks saja  |
| Profile loading/error            | Loading spinner / PageError dengan Retry     |

---

## 6. Pengecekan Lanjutan (Lanjutan)

### Backend API

- **ProfileController.getProfile:** Mengembalikan profile ter-transform (termasuk learningSections).
- **ProfileController.updateProfile:** Menerima learningSections; memetakan `sec.items` dengan `title`, `description`, `order`, `content`, `codeExample`, `codeLanguage`, `imageUrl`; mempertahankan `...item` (id ikut tersimpan bila ada).
- **Transform:** `extractId(item, \`learning-item-${sIdx}-${iIdx}\`)`— id dari`\_id` MongoDB atau fallback index-based.

### ProfileService & ProfileContext

- Fetch dari `/api/profile` → `ProfileModel.create(data)`.
- Cache 5 menit; `refetch()` clear cache dan reload.
- Fallback (dev only): `FALLBACK_PROFILE` **tanpa** learningSections — halaman Learning tampil empty state.

### Admin Learning

- `adminService.getProfile()` → `adminService.updateProfile(profile)`.
- `toEditable` memetakan LearningSection → EditableSection (termasuk items).
- Add section/item: tidak mengirim `id` pada item baru; backend akan isi via `extractId` (fallback index).
- **Catatan:** Item baru mendapat id dari fallback `learning-item-${sIdx}-${iIdx}`. Jika admin mengubah urutan, index berubah → id berubah → URL topic bisa tidak valid. Untuk stabilitas link, pertimbangkan id eksplisit atau subdocument schema dengan \_id.

### Seed vs Section Themes

- 16 section di seed; 16 slug di `sectionThemes` — semua cocok.
- Semua section punya `published: true` di seed.

---

## 7. Rekomendasi Jangka Panjang

1. **Gambar:** Ganti placehold.co dengan diagram/ilustrasi edukatif (lihat `LEARNING_AUDIT_REPORT.md`).
2. **Sticky TOC:** Pertimbangkan sticky TOC pada scroll untuk topik panjang.
3. **Metadata:** Tambah `readingTime` atau `lastUpdated` di model jika dibutuhkan.
4. **Stable IDs:** Untuk Admin Learning, pertimbangkan id stabil (mis. nanoid) pada item baru agar URL tidak berubah saat reorder.

---

_Report generated after detailed Learning section audit. Updated with backend, Admin, and ProfileService checks._
