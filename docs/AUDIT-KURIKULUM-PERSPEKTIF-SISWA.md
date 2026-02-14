# Audit Kurikulum: Perspektif Siswa (Student Perspective)

**Tujuan:** Mengevaluasi kurikulum seolah-olah saya adalah siswa yang belajar mandiri, untuk mengidentifikasi kelemahan yang membuat materi sulit dipahami, membingungkan, atau membuat pusing.  
**Penerima laporan:** Educator dan ahli kurikulum.  
**Tanggal:** 14 Februari 2025

---

## 1. Ringkasan Eksekutif (untuk Educator)

Sebagai **siswa**, setelah membaca sampel topik dari How to Learn, Competitive Programming (Complexity, DP, Greedy, Backtracking, Bit, Trie), Database (SQL), System Design, dan English:

- **Yang bekerja dengan baik:** Struktur 8 bagian konsisten; "Your first step" dan "By the end" memberi arah; tautan LeetCode dan prerequisite section jelas; English section relatif lebih ramah (rules + examples).
- **Yang membuat pusing atau sulit:** (1) **Kepadatan konsep** — banyak istilah dan ide dalam satu blok Material/Explanation tanpa "jembatan" kalimat sederhana. (2) **Jargon tanpa definisi pertama** — QPS, DAU, CAP, LB, PQ, LIS, LCS, MVCC, WAL, TTL, cache-aside, write-through, dll. muncul tanpa satu kalimat "apa itu". (3) **Solusi terlalu ringkas** — Solution sering satu baris kode atau pseudocode; siswa yang belum pernah lihat pattern tidak tahu "kenapa begitu". (4) **Asumsi bahasa pemrograman** — CP didominasi C++; siswa yang hanya Python/JS bingung (unordered_map, vector, dll.). (5) **Kurang scaffolding** — jarang ada "kesalahan umum", "one-sentence takeaway", atau diagram/visual yang disediakan (hanya disuruh "draw"). (6) **Lompatan konsep** — e.g. DP dari state/recurrence langsung ke knapsack 2D + space optimization; kurang jembatan (Fibonacci → knapsack). (7) **Prerequisite kabur** — "Basic programming", "recursion" tidak didefinisikan; recursion diajarkan di mana di kurikulum ini?

Rekomendasi utama: **kurangi kepadatan per blok** (satu ide utama + satu paragraf "dengan kata lain"), **definisikan jargon pada kemunculan pertama**, **perpanjang contoh Problem/Solution** dengan 2–3 kalimat "why", **tambah blok "Common misconception" atau "Takeaway"**, dan **opsional: sediakan versi Python/JS untuk CP** atau setidaknya satu kalimat "Dalam Python/JS: gunakan dict/list yang setara."

---

## 2. Kelemahan Per Kategori

### 2.1 Kepadatan (Density) — "Terlalu Banyak Sekaligus"

| Lokasi                      | Masalah                                                                                                                                                                           | Dampak ke siswa                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Material** (banyak topik) | 5–10 konsep dalam satu paragraf (e.g. System Design Basics: Requirements, functional/non-functional, QPS, DAU, Load balancer, app servers, DB, cache, CAP dalam sedikit kalimat). | Siswa bingung mana yang harus diingat dulu; sulit "chunking". |
| **Explanation**             | Sering mengulang Material dengan kalimat sama padat, bukan "dengan kata lain" yang lebih sederhana.                                                                               | Tidak ada "second pass" yang benar-benar mempermudah.         |
| **How to implement**        | Nomor (1)(2)(3)(4) berisi banyak sub-steps; satu nomor = satu konsep besar.                                                                                                       | Siswa tidak tahu harus berhenti di mana untuk praktik.        |

**Contoh (Dynamic Programming — Material):**  
_"DP needs optimal substructure and overlapping subproblems. Define state (dp[i], dp[i][j]), recurrence, base case, and order. Memoization = top-down + cache; tabulation = bottom-up table."_  
→ Untuk siswa baru: "optimal substructure", "overlapping subproblems", "state", "recurrence", "memoization", "tabulation" dalam tiga kalimat. Tidak ada satu kalimat: "Jadi, DP = menyimpan jawaban sub-soal supaya tidak hitung ulang."

**Rekomendasi untuk educator:** Setiap blok Material maksimal **satu ide utama** + **satu paragraf "Dengan kata lain"** (plain language). Konsep sekunder (e.g. tabulation vs memoization) bisa di Explanation atau How to implement dengan kalimat terpisah.

---

### 2.2 Jargon Tanpa Definisi Pertama — "Apa Itu QPS?"

| Istilah (contoh)                              | Di mana muncul            | Masalah                                                                                                                                   |
| --------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| QPS, DAU                                      | System Design, Scaling    | Tidak ada kalimat "QPS = queries per second; DAU = daily active users."                                                                   |
| CAP                                           | System Design             | "Consistency, Availability, Partition tolerance — pick two" tanpa definisi singkat masing-masing.                                         |
| LB                                            | System Design, contoh     | "Client → LB → App" — LB tidak dijelaskan di kalimat yang sama (Load balancer disebut di Material tapi singkat).                          |
| PQ                                            | Dijkstra, Heaps           | "PQ = (0, src)" — PQ (priority queue) kadang tidak dieja di topik itu.                                                                    |
| LIS, LCS                                      | DP                        | Singkatan dipakai di application/list; siswa belum tentu tahu Longest Increasing Subsequence / Longest Common Subsequence.                |
| MVCC, WAL                                     | Transactions, Explanation | Singkatan atau istilah teknis tanpa satu kalimat definisi.                                                                                |
| TTL, cache-aside, write-through, write-behind | Scaling & Caching         | Beberapa istilah dalam satu kalimat; "cache-aside" dan "write-through" tidak dijelaskan dengan satu contoh "kapan dipakai".               |
| Relaxation (Dijkstra)                         | Dijkstra                  | "Relaxation: we only update if we found a shorter path" — "relaxation" istilah teknis; siswa bisa mengerti dari konteks tapi tidak yakin. |

**Dampak:** Siswa yang rajin akan googling; siswa yang malas atau terburu-buru akan "nembak" arti atau skip → salah paham atau ilusi paham.

**Rekomendasi:** Setiap **istilah teknis atau singkatan** pada **kemunculan pertama** di topik: tambah **satu kalimat definisi** (atau tanda kurung), e.g. "QPS (queries per second) and DAU (daily active users)." Konsisten di seluruh kurikulum.

---

### 2.3 Solusi Terlalu Ringkas — "Kenapa Solusinya Begitu?"

| Topik                       | Format Solution saat ini                                                                           | Masalah untuk siswa                                                                                                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Two Sum                     | "One pass with unordered_map... For each nums[i], if (target - nums[i]) exists in map, return ..." | Siswa yang belum pernah lihat "complement" bisa tidak paham _mengapa_ cek (target - x).                                                                                      |
| Subarray Sum Equals K       | "cnt[0]=1. For each x: sum+=x; ans+=cnt[sum-K]; cnt[sum]++."                                       | Sangat ringkas; tidak ada kalimat "Kita menghitung berapa banyak prefix dengan sum = (sum sekarang - K), karena itulah yang membuat subarray berakhir di sini punya sum K."  |
| DP Knapsack                 | "vector<int> dp(W+1, 0); for(i) for(w=W; w>=weight[i]; w--) ..."                                   | Mengapa loop w mundur? Dijelaskan di logicAndCode tapi bisa satu kalimat di Solution: "Loop w mundur agar kita tidak pakai nilai yang sudah di-update untuk item yang sama." |
| Backtracking Subsets        | "path.push_back(nums[i]); dfs(i+1); path.pop_back(); dfs(i+1)."                                    | Siswa yang belum pernah lihat "include/exclude" tree bisa tidak paham bahwa dua dfs = dua cabang (ambil / tidak ambil).                                                      |
| System Design URL shortener | Poin (1)(2)(3)(4)(5) sangat padat.                                                                 | Setiap poin bisa 1–2 kalimat "why" (e.g. "base62 supaya URL pendek dan bisa di-decode ke ID").                                                                               |

**Dampak:** Siswa bisa menyalin kode dan jalan, tapi tidak "aha" — mudah lupa atau tidak bisa adaptasi ke soal lain.

**Rekomendasi:** Setiap **Solution** wajib punya: (a) **1–3 kalimat "ide utama"** (why), (b) **baris kode/pseudocode** yang ada sekarang, (c) opsional: **satu kalimat "common mistake"** (e.g. "Jangan lupa cnt[0]=1 untuk subarray yang mulai dari index 0.").

---

### 2.4 Asumsi Bahasa Pemrograman (C++ vs Python/JS)

| Section                 | Kode dominan                                                           | Masalah                                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Competitive Programming | Hampir semua C++ (vector, unordered_map, priority_queue, lambda, dll.) | Siswa yang hanya bisa Python atau JavaScript tidak punya "jalan" — harus translate sendiri atau skip kode.                   |
| How to Learn, Interview | Menyebut "type the code", "LeetCode"                                   | LeetCode mendukung banyak bahasa, tapi materi tertulis tidak memberi alternatif "Dalam Python: gunakan dict; dalam JS: Map." |

**Dampak:** Siswa non-C++ merasa kurikulum "bukan untuk saya" atau menghabiskan waktu ekstra untuk konversi mental.

**Rekomendasi:** (1) Tambah **satu kalimat** di awal section Competitive Programming atau di How to Learn: "Contoh kode di CP section dalam C++; konsep yang sama berlaku di Python (dict, list, heapq) dan JavaScript (Map, Array)." (2) Atau: sediakan **snippet Python/JS** untuk 2–3 topik pertama (e.g. Two Sum, Binary Search) sebagai template, lalu "untuk topik berikut gunakan struktur yang sama dalam bahasa pilihan Anda."

---

### 2.5 Kurang Scaffolding — "Apa yang Sering Salah? Apa Takeaway-nya?"

| Yang ada sekarang                          | Yang jarang/hampir tidak ada                                                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Your first step, Prerequisites, By the end | **Common misconception** (e.g. "Siswa sering lupa base case di DP.")                                                          |
| Material, Explanation, How to implement    | **One-sentence takeaway** di akhir setiap section (e.g. "Big O = bagaimana waktu naik ketika input membesar.")                |
| "Draw a diagram"                           | **Diagram/visual yang disediakan** (gambar atau ASCII) — siswa disuruh gambar tapi tidak ada referensi.                       |
| Problem & Solution                         | **Langkah "sebelum menulis kode"** yang eksplisit (e.g. "Tulis dulu state dan recurrence dalam bahasa Indonesia, baru kode.") |

**Dampak:** Siswa yang ragu tidak punya "checkpoint" (apakah saya salah paham?); siswa yang suka ringkasan tidak punya satu kalimat untuk diingat.

**Rekomendasi:** (1) Tambah **opsional "Common mistake"** atau **"Tip"** di beberapa topik (bisa di Additional info). (2) Tambah **satu kalimat takeaway** di akhir Material atau awal Explanation (format: "**Takeaway:** ..."). (3) Untuk topik yang membutuhkan gambar (e.g. Trie, BFS/DFS, system design), sediakan **satu diagram sederhana** (bisa ASCII di code block) sebagai referensi "gambar yang dimaksud kira-kira seperti ini."

---

### 2.6 Lompatan Konsep — "Kok Langsung Ini?"

| Topik                 | Lompatan                                                                                    | Saran jembatan                                                                                                                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **DP**                | Dari "state, recurrence" langsung ke 0/1 knapsack 2D dan space optimization.                | Sebelum knapsack: satu sub-bagian atau paragraf "Contoh paling sederhana: Fibonacci. State = F(i), recurrence = F(i)=F(i-1)+F(i-2). Itu juga DP." Baru kemudian "Untuk knapsack, state punya dua dimensi: ..."                                   |
| **Backtracking**      | Template "base case, choice, recurse, undo" tanpa gambar pohon keputusan.                   | Satu paragraf: "Bayangkan pohon: setiap level = satu index. Cabang kiri = ambil elemen, cabang kanan = tidak ambil. Backtrack = setelah selesai satu cabang, kita 'undo' dan coba cabang lain." Bisa + diagram ASCII (root → [ambil] → [tidak]). |
| **System Design**     | Dari "clarify, estimate, diagram" langsung ke komponen (LB, cache, sharding).               | Untuk siswa yang belum pernah bikin backend: satu kalimat "Ini seperti diagram yang Anda lihat di artikel arsitektur; kita akan pakai blok-blok yang sama (client, server, DB) dan memberi nama standar."                                        |
| **Scaling & Caching** | Cache-aside, write-through, write-behind, replication, sharding, queue dalam satu Material. | Pecah: "Pertama: strategi cache (3 cara). Kedua: skala database (replikasi vs sharding). Ketiga: antrian pesan." Masing-masing 1–2 kalimat "kapan dipakai."                                                                                      |

**Dampak:** Siswa yang belum punya mental model akan merasa "langsung berat"; yang sudah pernah dengar istilah bisa ikuti tapi tidak yakin urutan logikanya.

**Rekomendasi:** Untuk topik yang punya **prerequisite konsep dalam kurikulum yang sama**, tambah **satu kalimat referensi** (e.g. "Seperti di topik Graphs, kita punya state (node); di DP state bisa index atau (index, kapasitas)."). Untuk topik yang melompat dari "definisi" ke "contoh sulit", sisipkan **contoh minimal** (e.g. Fibonacci untuk DP) sebelum contoh wawancara (knapsack).

---

### 2.7 Prerequisite Kabur

| Yang tertulis                                             | Masalah                                                                                                                                                                                       |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Basic programming (variables, loops, arrays, functions)" | Tidak ada definisi operasional: apakah "bisa tulis loop dan function" cukup? Apakah harus sudah pernah pakai array of objects?                                                                |
| "Recursion" (untuk DP, Backtracking)                      | Recursion tidak diajarkan sebagai topik tersendiri di kurikulum ini; diasumsikan dari "basic programming" atau dari topik Graphs (DFS). Siswa murni pemula bisa tidak tahu apa itu recursion. |
| "Basic idea of tables, rows, columns" (SQL)               | Cukup jelas untuk yang pernah spreadsheet/DB; untuk yang belum, "tables, rows, columns" bisa abstrak.                                                                                         |
| "Computer Networks (HTTP & TCP)"                          | Nama section jelas; tapi "ideally Node.js or Backend" — apakah wajib atau bisa skip? Kalimat bisa dipertegas: "Wajib: ...; sangat disarankan: ..."                                            |

**Dampak:** Siswa tidak tahu apakah dirinya "cukup siap"; bisa masuk topik dan baru sadar kurang dasar (frustrasi) atau menganggap harus selesai semua prerequisite dulu (terlalu lama).

**Rekomendasi:** (1) Di **How to Learn**, tambah **satu blok "Prerequisite minimal"**: e.g. "Anda bisa mengikuti jalur CP jika sudah bisa: menulis loop, function, dan array; membaca kode yang memanggil dirinya sendiri (recursion) — jika belum, kerjakan dulu 2–3 soal recursion di LeetCode." (2) Untuk topik yang butuh recursion, tambah **satu kalimat**: "Recursion = function memanggil dirinya sendiri; akan dipakai di Graphs (DFS) dan di sini (backtracking)." (3) Bedakan **prerequisite wajib** vs **sangat disarankan** di learningFlowIntro.

---

### 2.8 Konsistensi Level dan Gaya

| Pengamatan                                                           | Contoh                                                                                                        |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Beberapa topik sangat ringkas (1–2 kalimat per blok).                | Bit Manipulation: Material singkat; How to implement sangat to-the-point.                                     |
| Beberapa topik sangat padat.                                         | Scaling & Caching, System Design, DP: banyak konsep per paragraf.                                             |
| English section lebih "tutorial" (rules + examples + decision flow). | Grammar, Vocabulary: "Before writing: ask finished time? → Yes: past simple."                                 |
| Technical section lebih "reference" (definisi + poin-poin).          | CP, System Design: cocok untuk yang sudah pernah dengar istilah; kurang ramah untuk benar-benar pertama kali. |

**Dampak:** Siswa yang terbiasa gaya English (step-by-step) mungkin kaget di technical (banyak istilah); siswa yang suka reference mungkin merasa English terlalu "pelan".

**Rekomendasi:** Tidak harus semua topik sama persis; **standar minimal**: setiap topik punya (1) **satu kalimat "ide utama"** di awal Material atau di Explanation, (2) **definisi jargon pada first use**, (3) **Solution dengan 1–3 kalimat "why"**. Untuk topik yang target pemula absolut (e.g. Complexity & Strategy, SQL Queries), tambah sedikit gaya "tutorial" (decision tree, one example walk-through).

---

## 3. Apakah Saya (sebagai Siswa) Akan Paham dan Tidak Pusing?

- **Paham dengan baik:** Jika saya **sudah punya dasar** (pernah belajar algoritma dasar, recursion, satu bahasa pemrograman, dan sedikit DB/HTTP), kurikulum **sangat berguna** sebagai rangkuman dan checklist. "By the end" dan Learning flow membantu saya tahu apa yang harus bisa. Prerequisite section dan link ke topik lain mengurangi rasa tersesat.
- **Paham tapi butuh effort ekstra:** Banyak topik **padat**; saya harus **baca ulang**, googling istilah, dan **mencoba kode sendiri** baru "klik". Tanpa praktik, saya bisa ilusi paham.
- **Bisa pusing jika:** (1) Saya **benar-benar pemula** (baru bisa variabel dan loop) → masuk CP atau System Design akan kewalahan. (2) Saya **hanya baca sekali** dan tidak mengetik kode / tidak buat ringkasan → Material dan Solution terlalu ringkas untuk sekali baca. (3) Saya **tidak pakai C++** dan tidak mau translate → frustrasi di section CP. (4) Saya butuh **visual** (diagram, pohon) → kurikulum hampir tidak menyediakan gambar; hanya menyuruh "draw".

**Kesimpulan untuk educator:** Kurikulum **cukup kuat** untuk siswa yang **sudah punya dasar** dan **belajar aktif** (baca ulang, praktik, cari definisi). Untuk **pemula absolut** atau siswa yang **hanya baca pasif**, kurikulum akan terasa **terlalu padat dan banyak jargon**; risiko **pusing atau ilusi paham** tinggi tanpa perbaikan di density, jargon, dan scaffolding di atas.

---

## 4. Rekomendasi Prioritas untuk Ahli Kurikulum

| Prioritas  | Aksi                                                                                                                                                          | Dampak                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Tinggi** | **Definisikan jargon pada first use** (QPS, DAU, CAP, LIS, LCS, TTL, cache-aside, PQ, relaxation, dll.) dengan satu kalimat atau tanda kurung.                | Mengurangi kebingungan dan salah tafsir.                  |
| **Tinggi** | **Perpanjang Solution** dengan 1–3 kalimat "ide utama / why" (dan opsional: common mistake).                                                                  | Meningkatkan pemahaman mendalam dan retensi.              |
| **Tinggi** | **Kurangi kepadatan Material**: satu ide utama per paragraf; tambah paragraf "Dengan kata lain" (plain language).                                             | Siswa bisa chunking dan tidak kewalahan.                  |
| **Sedang** | **Tambah contoh minimal / jembatan** (e.g. Fibonacci sebelum knapsack; pohon keputusan untuk backtracking; satu diagram ASCII untuk system design atau trie). | Mengurangi lompatan konsep.                               |
| **Sedang** | **Prerequisite operasional** di How to Learn + kalimat "Recursion = ..." di topik yang butuh.                                                                 | Siswa tahu apakah dirinya siap; pemula tidak salah masuk. |
| **Sedang** | **Satu kalimat takeaway** (atau "Common mistake") per topik di Additional info atau akhir Material.                                                           | Checkpoint dan ringkasan untuk siswa.                     |
| **Rendah** | **Sediakan alternatif bahasa** (Python/JS) untuk 2–3 topik CP pertama, atau satu kalimat "Dalam Python/JS: ..."                                               | Inklusif untuk non-C++; tidak mengubah struktur.          |
| **Rendah** | **Sediakan satu diagram referensi** (ASCII atau link gambar) untuk topik yang sangat visual (Trie, BFS/DFS, URL shortener).                                   | Membantu siswa yang belajar visual.                       |

---

## 5. Penutup

Audit ini disusun dari sudut pandang **siswa yang belajar mandiri**. Kelemahan utama yang berisiko membuat siswa **tidak paham atau pusing** adalah: **kepadatan konsep**, **jargon tanpa definisi**, **solusi terlalu ringkas**, **asumsi C++**, dan **kurang scaffolding (takeaway, misconception, diagram)**. Rekomendasi di atas dapat dijadikan bahan **revisi bertahap** oleh educator dan ahli kurikulum tanpa mengubah struktur 8 bagian yang sudah ada.

---

## 6. Tindak Lanjut oleh Educator / Ahli Kurikulum (Implementasi)

Berikut perbaikan yang telah diterapkan di `learningSeed.ts` berdasarkan rekomendasi audit siswa:

| Rekomendasi                                     | Tindakan                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prerequisite operasional**                    | How to Learn: Prerequisites diperjelas menjadi "operasional" — bisa menulis variabel, loop, array, function; bisa membaca recursion. Ditambah: jika belum pernah recursion, kerjakan 2–3 soal recursion di LeetCode sebelum DP & Backtracking.                                                                                                                                                                               |
| **Catatan C++ / Python / JS**                   | How to Learn → Additional info: ditambah kalimat bahwa contoh kode di section CP dalam C++; konsep sama berlaku di Python (dict, list, heapq) dan JavaScript (Map, Array).                                                                                                                                                                                                                                                   |
| **Definisi jargon (System Design)**             | System Design Basics → Material: QPS, DAU, CAP, LB didefinisikan (QPS = queries per second, DAU = daily active users; CAP = Consistency, Availability, Partition tolerance dengan satu kalimat masing-masing; LB = load balancer).                                                                                                                                                                                           |
| **Definisi jargon (Scaling)**                   | Scaling, Caching & Message Queues → Material: TTL (time-to-live) ditambah; cache-aside, write-through, write-behind tetap dengan penjelasan singkat; penjelasan dalam bahasa yang lebih terang.                                                                                                                                                                                                                              |
| **DP: jembatan + Solution why**                 | DP → Material: paragraf **Dengan kata lain** ditambah (DP = menyimpan jawaban sub-soal; contoh Fibonacci → knapsack). Explanation: LIS/LCS dieja (Longest Increasing Subsequence, Longest Common Subsequence). Application: LIS dan LCS diberi tanda kurung penuh. Solution knapsack: ditambah kalimat "why" (loop w mundur agar tidak pakai item sama dua kali) dan **Common mistake** (lupa loop mundur = jadi unlimited). |
| **Two Sum: Solution why + Takeaway**            | Complexity & Strategy → Example/Solution: ide "complement" (target - x) dijelaskan; ditambah **Takeaway** untuk Big O. Additional info: **Takeaway** satu kalimat (Big O = cara ringkas menyatakan jumlah kerja ketika input membesar).                                                                                                                                                                                      |
| **Subarray Sum Equals K: why + common mistake** | Prefix Sum & Sliding Window → Example: Solution diperpanjang dengan ide prefix sum dan prefix[i-1] = sum - K; **Common mistake:** lupa cnt[0]=1.                                                                                                                                                                                                                                                                             |
| **Backtracking: pohon keputusan**               | Backtracking → Material: paragraf **Dengan kata lain — pohon keputusan** ditambah (level = indeks; dua cabang = ambil / tidak ambil; backtrack = undo untuk cabang lain).                                                                                                                                                                                                                                                    |
| **Dijkstra: PQ & relaxation**                   | Dijkstra → Material: PQ dijelaskan sebagai "priority queue = struktur data yang mengeluarkan elemen terkecil"; **Relaxation** = memperbarui jarak ke tetangga jika ditemukan path lebih pendek.                                                                                                                                                                                                                              |
| **Takeaway (Complexity)**                       | Complexity & Strategy → Additional info: **Takeaway** satu kalimat untuk Big O.                                                                                                                                                                                                                                                                                                                                              |

Perbaikan tambahan yang dapat dilakukan pada putaran berikut: perluas "Dengan kata lain" dan takeaway ke lebih banyak topik; tambah diagram ASCII untuk Trie/BFS/DFS; sediakan snippet Python/JS untuk 2–3 topik CP pertama.

### Putaran lanjutan (pematangan materi)

| Topik                                    | Perbaikan                                                                                                                                                                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Greedy**                               | Paragraf **Dengan kata lain** (greedy = tidak mundur; pilihan lokal harus bisa dibuktikan aman). **Takeaway** di additionalInfo.                                                                                        |
| **Graphs BFS/DFS**                       | Definisi V, E; BFS/DFS dieja; paragraf **Dengan kata lain** (BFS lapis demi lapis = shortest path; DFS + visited). Solution Number of Islands: ide + **Common mistake** (lupa visited). **Takeaway** di additionalInfo. |
| **Trees & BST**                          | Definisi LNR/NLR/LRN, LCA, h. Solution Validate BST: kalimat **why** (range ke bawah) + **Takeaway**.                                                                                                                   |
| **SQL Queries**                          | Material diperjelas (JOIN, GROUP BY, HAVING); paragraf **Dengan kata lain**. Solution contoh: ide + **Takeaway**.                                                                                                       |
| **Indexes & Query Performance**          | Definisi **Seq Scan**, **Index Scan**, **N+1** pada first use.                                                                                                                                                          |
| **React Fundamentals**                   | Paragraf **Dengan kata lain** (komponen, props, key). **Takeaway** dan **Common mistake** (key = index) di additionalInfo.                                                                                              |
| **Security Basics**                      | XSS, SQL injection, CSRF, **parameterized query** didefinisikan dengan satu kalimat jelas pada first use.                                                                                                               |
| **System Design Basics (URL shortener)** | Solution: tiap poin diberi kalimat "why" (base62, cache, 301 vs 302). **Takeaway** ditambah.                                                                                                                            |
| **Node.js Event Loop**                   | Paragraf **Dengan kata lain** (satu thread, async = tidak blocking, banyak I/O bergantian).                                                                                                                             |
| **Heaps**                                | **Takeaway** di additionalInfo (heap, Top K, Merge K).                                                                                                                                                                  |
| **Intervals**                            | Paragraf **Dengan kata lain** (merge = sort start + gabung; non-overlapping = sort end + greedy). Solution: **why** (exchange argument). **Takeaway** di additionalInfo.                                                |
| **Stack & Monotonic**                    | Definisi monotonic stack, next greater; paragraf **Dengan kata lain**. Solution: **why** + **Common mistake** (sisa di stack). **Takeaway** di additionalInfo.                                                          |
| **Bit Manipulation**                     | Definisi set bits; paragraf **Dengan kata lain** (XOR pasangan hilang, n&(n-1)). Solution: **why**. **Takeaway** di additionalInfo.                                                                                     |
| **Tries**                                | Definisi isEnd; paragraf **Dengan kata lain** (prefix = jalan dari root). Solution: **why**. **Takeaway** di additionalInfo.                                                                                            |
| **Union-Find (DSU)**                     | Definisi representative, path compression, union by rank; paragraf **Dengan kata lain**. Solution: **why**. **Takeaway** di additionalInfo.                                                                             |
| **Linked List**                          | Paragraf **Dengan kata lain** (dummy, Floyd); definisi Floyd. Solution: **why**. **Takeaway** + **Common mistake** (empty/single, fast->next) di additionalInfo.                                                        |
| **LRU Cache & Min Stack**                | Paragraf **Dengan kata lain** (list+map, min_so_far). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                                |
| **Strings: Palindrome & Sliding**        | Paragraf **Dengan kata lain** (expand center, sliding window + map). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                 |
| **Binary Search on Answer**              | Paragraf **Dengan kata lain** (binary search di nilai jawaban, check monoton). Solution: **why**. **Takeaway** di additionalInfo.                                                                                       |
| **Express & REST**                       | Material: definisi middleware; paragraf **Dengan kata lain** (routing + middleware, REST = resource + method). Solution: **why**. **Takeaway** + **Common mistake** (express.json, async handler) di additionalInfo.    |
| **React Hooks**                          | Paragraf **Dengan kata lain** (useState/useEffect, rules of hooks). Solution: **why**. **Takeaway** + **Common mistake** (hooks di if/loop, deps, cleanup) di additionalInfo.                                           |
| **React Context & State**                | Definisi prop drilling; paragraf **Dengan kata lain** (broadcast value, hindari data sering berubah). Solution: **why**. **Takeaway** + **Common mistake** (value identity) di additionalInfo.                          |
| **React Routing & Data Fetching**        | Paragraf **Dengan kata lain** (route → component, fetch di useEffect([id])). Solution: **why**. **Takeaway** di additionalInfo.                                                                                         |
| **System Design & Behavioral**           | Definisi QPS, LB, STAR; paragraf **Dengan kata lain**. **Takeaway** di additionalInfo.                                                                                                                                  |
| **OOP Fundamentals**                     | Paragraf **Dengan kata lain** (encapsulation, polymorphism, composition). Solution: **why**. **Takeaway** di additionalInfo.                                                                                            |
| **OOP, SOLID, DRY & KISS**               | SOLID (S,O,L,I,D) dieja singkat; paragraf **Dengan kata lain** (S, D, DRY, KISS). Solution: **why**. **Takeaway** di additionalInfo.                                                                                    |
| **Design Patterns**                      | Definisi Singleton, Factory, Observer, Strategy; paragraf **Dengan kata lain**. Solution: **why**. **Takeaway** di additionalInfo.                                                                                      |
| **Transactions & ACID**                  | Paragraf **Dengan kata lain** (ACID, transfer = BEGIN/COMMIT/ROLLBACK). Solution: **why**. **Takeaway** di additionalInfo.                                                                                              |
| **Sorting & Searching**                  | Paragraf **Dengan kata lain** (setelah sort, two pointers O(n), binary search O(log n)). Solution: **why**. **Takeaway** di additionalInfo.                                                                             |
| **Prefix Sum & Sliding Window**          | Paragraf **Dengan kata lain** (prefix sum, subarray sum K, sliding window). Solution: **why**. **Takeaway** di additionalInfo.                                                                                          |
| **Dijkstra**                             | Paragraf **Dengan kata lain** (greedy pop, relax, stale skip). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                       |
| **Coding Interview Strategy** (CP)       | Paragraf **Dengan kata lain** (flow, jangan langsung kode). **Takeaway** di additionalInfo.                                                                                                                             |
| **Coding Interviews** (Interview Prep)   | Paragraf **Dengan kata lain** (clarify, example, approach). **Takeaway** di additionalInfo.                                                                                                                             |
| **Data Structures Overview** (CS Theory) | Paragraf **Dengan kata lain** (array vs list, stack/queue/hash). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                     |
| **Graphs & Trees** (CS Theory)           | Paragraf **Dengan kata lain** (BFS/DFS, inorder BST). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                                |
| **Heaps, Tries & Advanced** (CS Theory)  | Paragraf **Dengan kata lain** (top K, merge K, trie prefix). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                         |
| **HTTP & TCP Basics**                    | Paragraf **Dengan kata lain** (URL → DNS → TCP → TLS → HTTP). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                        |
| **Processes, Threads & Concurrency**     | Paragraf **Dengan kata lain** (process vs thread, race, mutex, deadlock). Solution: **why**. **Takeaway** di additionalInfo.                                                                                            |
| **REST API Design**                      | Paragraf **Dengan kata lain** (resource + method, status konsisten). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                 |
| **Auth & Databases in Backend**          | Paragraf **Dengan kata lain** (JWT vs session, N+1, hash password). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                  |
| **Learning Path & Study Tips**           | Paragraf **Dengan kata lain** (satu topik selesai, active recall). Solution: **why**. **Takeaway** di additionalInfo.                                                                                                   |
| **Complexity & Strategy**                | Paragraf **Dengan kata lain** (Big O, loop, hash map).                                                                                                                                                                  |
| **System Design Basics**                 | Paragraf **Dengan kata lain** (clarify → estimate → diagram → deep dive). Solution: **why**. **Takeaway** di additionalInfo.                                                                                            |
| **Scaling, Caching & Queues**            | Paragraf **Dengan kata lain** (cache-aside, write-through, queue, sharding). Solution: **why**. **Takeaway** di additionalInfo.                                                                                         |
| **Event Loop & Async**                   | **Takeaway** + Solution **why** (Promise.all) di additionalInfo.                                                                                                                                                        |

—
_Dokumen ini dapat disampaikan ke educator dan tim kurikulum untuk tindak lanjut perbaikan konten._
