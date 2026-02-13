# Audit: Learning Topic Detail Page — Content Lengkap & Mudah Dipahami

**Tanggal:** 2025-02  
**Lingkup:** Halaman detail topik Learning (`/learning/:sectionSlug/:topicId`): rendering, struktur konten seed, dan rekomendasi agar konten terbaik, lengkap, dan detail.

---

## 1. Ringkasan

- **Detail page** menampilkan satu topik dengan struktur 8 bagian (Learning flow → Material → … → Additional information), blok kode, dan gambar.
- **Seed** (`backend/src/seed/seedData.ts`) berisi puluhan section dan ratusan topik dengan format **1. Learning flow:** … **8. Additional information:** plus `codeExample` dan `imageUrl`.
- **Audit ini** memastikan: (1) semua format konten yang dipakai seed ter-render dengan benar, (2) konten terlihat lengkap dan mudah dipahami, (3) ada rekomendasi untuk konten dan UX.

---

## 2. Apa yang Sudah Didukung (Rendering)

| Fitur                     | Status | Keterangan                                                                                                          |
| ------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| **8 bagian terstruktur**  | ✅     | Regex `**N. Judul:**` dengan N 1–8; urutan tampil: 1–6 → Code → 7–8 → Image                                         |
| **Paragraf**              | ✅     | Dipisah `\n\n`; mendukung **bold** dan `code` inline                                                                |
| **Daftar bernomor**       | ✅     | Format `(1) (2)` atau `1. 2.` (style seed) → `<ol>`                                                                 |
| **Daftar bullet**         | ✅     | Baris diawali `-`, `*`, atau `•` → `<ul>`                                                                           |
| **Daftar bertingkat**     | ✅     | Baris dengan indent ≥2 spasi + bullet → nested `<ul>`                                                               |
| **Bold & inline code**    | ✅     | `**teks**` → `<strong>`, `` `kode` `` → `<code>` dengan class theme                                                 |
| **Link**                  | ✅     | `[teks](url)` dengan url `https?://` atau `#...` → `<a>` (external: `target="_blank"`, `rel="noopener noreferrer"`) |
| **Callout**               | ✅     | Blok diawali **Tip:** / **Note:** / **Important:** → kotak dengan label dan border kiri (design token)              |
| **Section kosong**        | ✅     | Jika body section kosong → tampil placeholder “— No content for this section —” agar struktur 8 bagian tetap jelas  |
| **TOC**                   | ✅     | “On this page” dengan anchor ke tiap section; `scroll-margin-top` agar tidak tertutup sticky header                 |
| **Fallback non‑struktur** | ✅     | Jika tidak ada **1. Learning flow:**, konten di-render sebagai paragraf + code + image                              |

---

## 3. Struktur Konten Seed (Format yang Diharapkan)

Agar detail page menampilkan konten **lengkap dan terstruktur**, setiap topik sebaiknya:

1. **Memakai format 8 bagian** di `content`:
   - `**1. Learning flow:**` … langkah belajar (bisa pakai (1) (2) (3)).
   - `**2. Material:**` … konsep dan definisi.
   - `**3. Explanation:**` … penjelasan mendalam.
   - `**4. Application:**` … kapan dipakai.
   - `**5. How to implement:**` … langkah implementasi (sering (1)(2)(3)).
   - `**6. Logic & how the code works:**` … walkthrough kode.
   - `**7. Example problem & solution:**` … soal + solusi.
   - `**8. Additional information:**` … tips, LeetCode, edge case, dll.

2. **Opsional per topik:**
   - `codeExample` + `codeLanguage` → blok kode setelah section 6.
   - `imageUrl` → gambar setelah section 8.
   - `description` → ringkasan singkat di bawah judul topik.

3. **Format teks di dalam body:**
   - Paragraf: pisahkan dengan dua newline.
   - **Bold:** `**teks**`.
   - Inline code: `` `kode` ``.
   - Link: `[teks](https://...)` atau `[anchor](#id)`.
   - Daftar bernomor: `(1) Langkah satu` atau `1. Langkah satu`.
   - Daftar bullet: `- item` atau `* item`; sub-item: indent 2+ spasi lalu `- sub`.
   - Callout: paragraf baru yang diawali `**Tip:**`, `**Note:**`, atau `**Important:**` (diikuti isi).

---

## 4. Rekomendasi Konten (Agar Lengkap & Mudah Dipahami)

- **Konsistensi 8 bagian:** Usahakan tiap topik punya 1–8 (boleh kosong isi untuk section yang tidak relevan; placeholder “— No content for this section —” akan tampil).
- **Learning flow (1):** Beri 3–5 langkah konkret (baca → coba kode → kerjakan soal) dengan (1) (2) (3).
- **How to implement (5):** Gunakan daftar bernomor; setiap langkah 1–2 kalimat jelas.
- **Example problem (7):** Sertakan nama soal (e.g. “Two Sum — LeetCode #1”), constraint singkat, dan solusi (ide + kompleksitas). Bisa tambah link: `[LeetCode #1](https://leetcode.com/problems/...)`.
- **Additional information (8):** Sertakan rekomendasi soal lain, interview tip, common mistake, dan referensi (bisa link).
- **Panjang:** Paragraf panjang sebaiknya dipecah jadi 2–3 kalimat per paragraf atau jadi bullet/numbered list agar mudah di-scan.
- **Callout:** Pakai **Tip:** / **Note:** / **Important:** untuk hal yang mudah terlewat (misalnya overflow di binary search, lazy deletion di Dijkstra).

---

## 5. Rekomendasi Teknis / UX

- **Link eksternal:** Sudah aman (`https?://` atau `#`); untuk referensi LeetCode/artikel bisa pakai `[LeetCode #1](https://...)` di seed.
- **Gambar:** `imageUrl` sebaiknya HTTPS; alt text di-set dari `item.title` untuk aksesibilitas.
- **Print:** Sudah ada aturannya di `LearningTopicDetail.module.css` (break-inside, margin) agar cetak rapi.
- **Dark mode:** Semua pakai CSS variables dari design tokens; tidak perlu class tambahan.

---

## 6. Checklist Cepat per Topik (Seed)

- [ ] Ada **1. Learning flow:** dengan langkah jelas (1)(2)(3)…
- [ ] Ada **2. Material** dan **3. Explanation** (konsep + penjelasan).
- [ ] Ada **4. Application** (kapan dipakai).
- [ ] Ada **5. How to implement** dengan langkah bernomor.
- [ ] Ada **6. Logic & how the code works** (jalan kode).
- [ ] Ada **7. Example problem & solution** (nama soal + solusi).
- [ ] Ada **8. Additional information** (tips, link, referensi).
- [ ] Jika ada kode: `codeExample` + `codeLanguage` diisi.
- [ ] Paragraf tidak terlalu panjang; gunakan list di mana cocok.
- [ ] (Opsional) **Tip:** / **Note:** untuk poin penting; link ke LeetCode/referensi di **8.**

---

## 7. File Terkait

- **View:** `src/views/pages/Learning/LearningTopicDetail.tsx` (parsing, renderBody, renderInline, callout, nested list, empty section, link).
- **Styles:** `src/views/pages/Learning/LearningTopicDetail.module.css` (callout, bodyLink, bodyListNested, emptySectionHint).
- **Seed:** `backend/src/seed/seedData.ts` → `learningSections[].items[]` dengan `content`, `codeExample`, `codeLanguage`, `imageUrl`.
- **Transform:** `backend/src/utils/transformProfile.ts` → memastikan `content` dan fields lain sampai ke frontend dengan `id` stabil.

Dengan ini, detail page siap menampilkan konten yang **lengkap, terstruktur, dan mudah dipahami**, serta siap dipakai untuk penulisan konten terbaik dan paling detail di seed.
