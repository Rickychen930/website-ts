# Penilaian Resume Secara Mendalam (HR & Resume Specialist)

Dokumen ini menilai resume Anda dari sudut pandang **HR Owner**, **Resume Specialist**, dan **keterbacaan sistem (ATS)**. Gunakan bersama fitur **Tes Keterbacaan ATS** di halaman Resume untuk cek otomatis.

---

## 1. Dapatkah resume dibaca sistem (ATS) secara otomatis?

### Jawaban singkat: **Ya, dengan struktur saat ini.**

Alasan teknis:

| Aspek                                     | Status | Keterangan                                                                                                                               |
| ----------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| **Teks asli (bukan gambar)**              | ✅     | PDF dihasilkan dengan jsPDF = teks vector/real text. ATS tidak perlu OCR; teks bisa diekstrak langsung.                                  |
| **Layout satu kolom**                     | ✅     | Satu kolom, kiri ke kanan, atas ke bawah. Parsing urutan teks predictable.                                                               |
| **Section heading standar**               | ✅     | PROFESSIONAL SUMMARY, EXPERIENCE, EDUCATION, SKILLS, PROJECTS, CERTIFICATIONS, HONORS & AWARDS, LANGUAGES — nama yang umum dikenali ATS. |
| **Kontak terstruktur**                    | ✅     | Format "Email: x                                                                                                                         | Phone: y | LinkedIn: ..." memudahkan ekstraksi field. Urutan: Email → Phone → LinkedIn → GitHub. |
| **Tanpa elemen yang mengacaukan parsing** | ✅     | Tidak ada tabel kompleks, text box terpisah, atau grafik di dalam alur teks.                                                             |
| **Font standar**                          | ✅     | Helvetica (PDF) / Arial, Helvetica (HTML) — font sistem, embedding bersih.                                                               |

**Kesimpulan ATS:** Resume Anda **dapat dibaca sistem secara otomatis** karena: (1) PDF berisi teks asli, (2) struktur dan nama section standar, (3) layout sederhana, (4) kontak dan experience/education punya pola jelas (label + value, tanggal, role, company).

---

## 2. Nilai dari sisi HR & Resume Specialist

### 2.1 Struktur & Urutan Section

- **Urutan section** mengikuti praktik umum: Header (nama, title, lokasi, kontak) → Summary → Experience → Education → Skills → Projects → Sertifikasi → Penghargaan → Highlights → Bahasa.
- Cocok untuk **experienced hire** (Experience sebelum Education). Untuk fresh graduate, beberapa perusahaan lebih suka Education dulu; bisa dipertimbangkan opsi urutan nanti jika perlu.
- **Professional Summary** di awal membantu recruiter dan ATS menangkap konteks dan kata kunci di baris pertama.

**Nilai: 9/10** — Struktur rapi dan ATS-friendly.

### 2.2 Kontak & Identitas

- Nama jelas, title dan lokasi dalam satu blok.
- Kontak: Email, Phone, LinkedIn, GitHub (dan lainnya) dengan label eksplisit dan URL yang dipendek (tanpa https), konsisten di PDF dan tampilan.
- Duplikasi kota di experience sudah dihindari (company + location tidak double).

**Nilai: 9/10** — Kontak siap untuk ATS dan HR.

### 2.3 Experience (Pengalaman Kerja)

- Format: **Position | Company, Location** lalu **Tanggal** lalu deskripsi & achievements.
- Tanggal konsisten (Start – End atau Present).
- Achievements pakai bullet; technologies disebut terpisah — bagus untuk keyword matching ATS dan pembacaan HR.
- Teks di-trim dan spasi ganda dirapikan.

**Nilai: 9/10** — Format experience siap di-parse dan dibaca manusia.

### 2.4 Education

- Degree, field, institution, dan tanggal (jika ada) jelas.
- Tanggal hanya tampil jika ada data (tidak ada " | – " kosong).

**Nilai: 9/10** — Ringkas dan terstruktur.

### 2.5 Skills

- Technical vs Soft dipisah dengan label "Technical:" dan "Soft:" — ATS dan HR mudah memetakan.
- Daftar skill dalam teks (bukan gambar/chart), sehingga keyword matching ATS berjalan baik.

**Nilai: 9/10** — Ramah ATS dan mudah dibaca.

### 2.6 Projects, Certifications, Honors, Languages

- Format konsisten: judul/nama, issuer/tanggal di satu baris dengan pemisah " | ".
- Bahasa dalam format **Name (Proficiency)** — jelas untuk ATS dan HR.

**Nilai: 9/10** — Informatif tanpa berantakan.

### 2.7 Keterbacaan & Estetika

- Font dan ukuran konsisten (nama 22pt, heading 11pt, body 9–10pt).
- Jarak antar section dan anti-orphan heading (minimal ruang sebelum section) mengurangi heading “melayang” di bawah halaman.
- Bullet dan baris panjang di-wrap dengan benar; posisi vertikal (y) dihitung per baris sehingga tidak tumpang tindih.

**Nilai: 9/10** — Profesional dan rapi.

---

## 3. Skor Ringkas (HR + ATS)

| Dimensi                                | Skor       | Catatan                                                                        |
| -------------------------------------- | ---------- | ------------------------------------------------------------------------------ |
| Keterbacaan ATS (sistem baca otomatis) | **95/100** | Teks asli, section standar, layout sederhana, kontak & experience terstruktur. |
| Struktur & Urutan                      | **9/10**   | Urutan section standar, summary di atas.                                       |
| Kontak & Identitas                     | **9/10**   | Lengkap, label jelas, URL rapi.                                                |
| Experience                             | **9/10**   | Role, company, tanggal, achievements, technologies jelas.                      |
| Education & Skills                     | **9/10**   | Degree, institution, technical/soft terpisah.                                  |
| Konsistensi & Tampilan                 | **9/10**   | Trim teks, tidak overlap, heading tidak orphan.                                |

**Rata-rata (kualitatif): ~9/10** — Resume siap dipakai untuk lamaran dan **dapat dibaca sistem (ATS) secara otomatis** dengan baik.

---

## 4. Cara mengetes “apakah resume saya bisa dibaca sistem?”

1. **Di aplikasi:** Buka halaman **Resume** (atau Admin → Resume), lalu gunakan tombol **Tes Keterbacaan ATS**. Anda akan melihat:
   - **Skor** (0–100) dan status **Dapat dibaca ATS** (Ya/Tidak).
   - **Checklist** per item (nama, kontak, section, layout, experience, education, skills, summary).
   - **Rekomendasi** jika ada yang kurang.
   - **Preview teks** — simulasi teks seperti yang diekstrak ATS dari PDF (untuk verifikasi manual).

2. **Manual:** Unduh PDF resume, buka di viewer, gunakan “Copy All Text” atau “Select All” lalu paste ke Notepad. Urutan dan kejelasan teks yang ter-copy mendekati apa yang ATS baca. Bandingkan dengan **Preview teks** di laporan ATS.

---

## 5. Rekomendasi lanjutan (opsional)

- **Professional Summary:** Pastikan diisi dengan kata kunci yang relevan untuk role target (ATS sering memakai summary untuk matching).
- **Kontak:** Minimal satu Email dan satu Phone agar ATS dan HR bisa menghubungi; LinkedIn/GitHub memperkuat profil.
- **Experience & Education:** Pastikan setiap entri punya Role/Position + Company dan Start Date (dan End Date/Present jika berlaku); institution + degree untuk education.
- **Skills:** Isi Technical dan/atau Soft Skills; daftar ini sering dipakai ATS untuk keyword match.

---

## 6. Kesimpulan

- **Apakah resume Anda dapat dibaca dari sistem secara otomatis?** **Ya.** PDF teks asli, layout satu kolom, section dan kontak terstruktur, sehingga ATS dapat mengekstrak dan mem-parse teks dengan baik.
- **Nilai secara mendalam:** Resume dinilai **sangat baik** dari sisi struktur, konsistensi, dan kesiapan ATS; skor kualitatif sekitar **9/10** di tiap dimensi utama.
- Gunakan **Tes Keterbacaan ATS** di halaman Resume untuk cek berkala dan memastikan data (nama, kontak, experience, education, skills, summary) tetap lengkap.
