# Menambah Section atau Topic di Learning

Panduan singkat agar penambahan section/topic tetap konsisten dengan struktur dan tampilan.

---

## 1. Di mana mengedit

- **Data curriculum:** `backend/src/seed/learningSeed.ts`
- **Struktur & validasi:** `backend/src/seed/learningSeedStructure.ts`
- **Tema (gradient + ikon) per section:** `src/views/pages/Learning/sectionThemes.tsx`
- **Sitemap (slug section):** `scripts/generate-sitemap.js` → `LEARNING_SECTION_SLUGS`

---

## 2. Menambah section baru

1. **Tema**  
   Di `sectionThemes.tsx`, tambah entry di `slugToTheme`:
   - `"slug-section-kamu": { gradient: gradients.xxx, iconKey: "yyy" }`  
     Pilih `gradients` dan `iconKey` yang ada di file yang sama.

2. **Gambar**  
   Di `learningSeed.ts`, tambah key di objek `IMG` (mis. `namaSection: "https://images.unsplash.com/..."`).

3. **Data section**  
   Di `learningSeed.ts`, tambah satu elemen ke array `sectionConfigs`:
   - `title`, `slug` (kebab-case, unik), `description`, `order`, `published: true`, `topics: [...]`.

4. **Sitemap**  
   Di `scripts/generate-sitemap.js`, tambah slug baru ke array `LEARNING_SECTION_SLUGS`, lalu jalankan:

   ```bash
   npm run sitemap:generate
   ```

   (atau lewat `npm run build` jika script ini dipanggil di prebuild.)

5. **Validasi**  
   Setiap topic di section baru harus punya `imageKey` yang ada di `IMG`. Section `slug` dan topic `id` harus **kebab-case** (huruf kecil, angka, strip; contoh: `how-to-learn`, `event-loop-and-async`). Kalau tidak, `validateLearningSeed` akan throw saat seed di-load.

---

## 3. Menambah topic baru

1. Di section yang sesuai, tambah satu objek ke array `topics` dengan:
   - `id`: kebab-case, unik (dipakai di URL), mis. `"nama-topic"`
   - `title`, `description`, `order`
   - `imageKey`: key yang ada di `IMG` (boleh pakai key yang sama dengan topic lain)
   - `contentBlocks`: objek dengan 8 field (lihat `TopicContentBlocks` di `learningSeedStructure.ts`):
     - `learningFlow`: array string (4–6 langkah)
     - `learningFlowIntro`: opsional
     - `material`, `explanation`, `application`, `howToImplement`, `logicAndCode`, `example`, `additionalInfo`: string
   - Opsional: `codeExample`, `codeLanguage`

2. Ikuti konvensi di komentar `learningSeedStructure.ts` (paragraf singkat, bullet, **bold**, `code`, format "Problem: ... Solution: ..." di example).

3. Setelah mengedit seed, jalankan validasi (otomatis saat import):
   ```bash
   npx tsx -e "import './backend/src/seed/learningSeed'"
   ```
   Jika ada `imageKey` atau `slug`/`id` yang salah, akan muncul error.

---

## 4. Setelah mengubah seed

- **Development:** Restart backend jika perlu; jalankan `npm run seed` jika ingin isi ulang DB dari seed.
- **Sitemap:** Jika menambah/menghapus section, update `LEARNING_SECTION_SLUGS` dan generate lagi sitemap.

## 5. Validasi di CI

Untuk memastikan seed tetap valid (slug, id, imageKey), jalankan validasi sebelum build atau di pipeline:

```bash
npm run learning:validate
```

(Script menjalankan `backend/src/seed/learningSeed.ts`; `validateLearningSeed` akan throw jika ada `imageKey` atau slug/id yang tidak valid.)

Jika ada error, perbaiki `learningSeed.ts` atau `IMG` sampai validasi lulus.
