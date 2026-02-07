# Resume – ATS-Optimized

Resume ini dibangun dari data portfolio (seed/profile) dan disusun mengikuti standar **ATS (Applicant Tracking System)** agar ramah parsing dan ranking oleh sistem rekrutmen.

## File

| File                       | Deskripsi                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **RICKY_CHEN_RESUME.md**   | Resume dalam Markdown. Bisa dikonversi ke PDF/Word.                                                                                  |
| **RICKY_CHEN_RESUME.html** | Resume dalam HTML (sumber). Bisa dibuka di browser lalu **Print → Save as PDF**.                                                     |
| **public/resume.html**     | Salinan ATS resume yang dilayani di situs. Tombol "View / Download Resume" di Home membuka ini; pengunjung bisa Print → Save as PDF. |

## Cara Export ke PDF

### Dari Markdown (disarankan)

```bash
# Dengan pandoc (install: brew install pandoc / apt install pandoc)
pandoc docs/resume/RICKY_CHEN_RESUME.md -o docs/resume/RICKY_CHEN_RESUME.pdf -V geometry:margin=0.75in

# Atau ke Word
pandoc docs/resume/RICKY_CHEN_RESUME.md -o docs/resume/RICKY_CHEN_RESUME.docx
```

### Dari HTML

1. Buka `docs/resume/RICKY_CHEN_RESUME.html` di browser.
2. **File → Print** (atau Ctrl/Cmd + P).
3. Pilih **Save as PDF** / **Print to PDF**.

## Prinsip ATS yang Diterapkan

- **Struktur jelas:** Section standar (Experience, Education, Skills, Projects, Certifications).
- **Heading konsisten:** PROFESSIONAL SUMMARY, EXPERIENCE, EDUCATION, TECHNICAL SKILLS, dll.
- **Satu kolom:** Tidak pakai tabel/kolom yang bikin ATS salah baca.
- **Kata kunci:** Istilah yang sering dicari (TypeScript, React, Swift, RESTful APIs, Agile, dll).
- **Bullet dengan action verb:** Developed, Implemented, Contributed, Built, dll.
- **Font standar:** Arial/Helvetica di HTML agar aman saat di-parse.
- **Tanpa grafik/logo:** Hanya teks agar ATS tidak gagal baca.

## Sinkronisasi dengan Data

Data resume diambil dari `backend/src/seed/seedData.ts`. Jika profile di-update (experience, project, skill), resume Markdown/HTML bisa di-update manual atau lewat script generate (jika ada).
