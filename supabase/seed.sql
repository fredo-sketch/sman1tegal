-- ============================================================
-- SMANSA TEGAL — Seed Script (Data Awal)
-- Jalankan SETELAH schema.sql di Supabase SQL Editor
-- ============================================================

-- ============================================================
-- SEED GURU
-- ============================================================
INSERT INTO public.guru (nama, mapel, foto_url) VALUES
  ('Dr. Budi Setiawan, M.Pd.', 'Kepala Sekolah', '/placeholder.jpg'),
  ('Siti Aminah, S.Pd.', 'Matematika', '/placeholder.jpg');

-- ============================================================
-- SEED EKSKUL
-- ============================================================
INSERT INTO public.ekskul (nama, deskripsi, foto_url) VALUES
  ('Pramuka Ambalan', 'Ekstrakurikuler wajib pembentuk karakter disiplin dan mandiri.', '/placeholder.jpg'),
  ('Paskibraka', 'Pasukan pengibar bendera pusaka SMAN 1 Tegal.', '/placeholder.jpg');

-- ============================================================
-- SEED BERITA
-- Catatan: foto_url menggunakan path /public yang sudah ada di project.
-- Tanggal disimpan sebagai DATE (YYYY-MM-DD), tampilan diformat di frontend.
-- ============================================================
INSERT INTO public.berita (judul, tanggal, ringkasan, isi, foto_url) VALUES
(
  'Siswa SMAN 1 Tegal Ukir Prestasi di LDBI Tingkat Nasional 2026',
  '2026-09-11',
  'Carissa Belinda Mahira, perwakilan Tim Debat Jateng dari SMAN 1 Tegal, sukses dinobatkan sebagai Pembicara Terbaik ke-3 di ajang LDBI Nasional.',
  'TEGAL — Prestasi membanggakan kembali diraih oleh SMAN 1 Tegal di tingkat nasional. Salah satu siswinya, Carissa Belinda Mahira, yang mewakili Tim Debat Provinsi Jawa Tengah, berhasil mencatatkan pencapaian gemilang dalam ajang Lomba Debat Bahasa Indonesia (LDBI) Tingkat Nasional 2026.

Dalam kompetisi bergengsi tersebut, Carissa sukses membawa pulang Medali Emas setelah dinobatkan sebagai Pembicara Terbaik ke-3 (Best Speaker). Tak hanya itu, bersama timnya ia juga berhasil menorehkan serangkaian prestasi lainnya, di antaranya:
- Pembicara Terbaik 3 (Medali Emas)
- Quaterfinalist (Perempat Finalis LDBI)
- Peringkat 3 Open Breaking

Pencapaian ini menjadi bukti komitmen SMAN 1 Tegal sebagai sekolah berintegritas yang terus mendukung siswanya untuk berprestasi di tingkat nasional. Selamat dan sukses selalu untuk Carissa Belinda Mahira atas raihan prestasinya yang mengharumkan nama sekolah dan Provinsi Jawa Tengah!',
  '/berita1.jpg'
),
(
  'Carissa Belinda Mahira Raih Predikat Pembicara Terbaik 1 LDBI Provinsi Jawa Tengah',
  '2026-09-02',
  'Carissa Belinda Mahira sukses meraih predikat Pembicara Terbaik I Provinsi Jawa Tengah dalam Lomba Debat Bahasa Indonesia (LDBI) 2026 dan siap melaju ke ajang Nasional.',
  'Hi, Mates! ✨

Selamat dan sukses untuk Carissa Belinda Mahira yang berhasil meraih predikat Pembicara Terbaik I Provinsi Jawa Tengah dalam Lomba Debat Bahasa Indonesia (LDBI) 2026! 🏆🔥

Pencapaian ini menjadi bukti dari kemampuan, kerja keras, dan semangat luar biasa yang telah diberikan. Kini, saatnya melanjutkan perjuangan bersama tim Jawa Tengah di LDBI Tingkat Nasional 2026 💙

Selamat berjuang, Abel! Tunjukkan kemampuan terbaik dan harumkan nama Jawa Tengah serta SMAN 1 Tegal di tingkat nasional!',
  '/berita2.jpg'
),
(
  'Tim SMANSA Juara 1 KRENOVA Kota Tegal dengan Inovasi OPTIRAIN',
  '2026-04-21',
  'Tim SMAN 1 Tegal sukses menjadi Juara 1 KRENOVA 2026 berkat inovasi OPTIRAIN, sistem pendeteksi mikroplastik pada air hujan berbasis IoT.',
  '🏆 CHAMPIONS ALERT: OPTIRAIN MENGGUNCANG KRENOVA 2026! 🏆
Halo, Mates! ✨

Kabar membanggakan datang dari panggung inovasi! Tim SMAN 1 Kota Tegal baru saja menorehkan prestasi gemilang sebagai Juara 1 Lomba KRENOVA Kota Tegal Tingkat Pelajar Tahun 2026 melalui karya revolusioner mereka: OPTIRAIN! 💡🌧️

Apa itu OPTIRAIN? OPTIRAIN adalah sistem Turbidity Sensor canggih berbasis Automated Rotating-Chamber dan Geotagging Real-Time IoT. Inovasi ini dirancang khusus untuk mendeteksi indikatif mikroplastik pada air hujan secara instan.

Mengapa Ini Penting? 🌊 Tahukah kamu? Bahaya mikroplastik yang tidak kasat mata dapat memicu stres oksidatif hingga kerusakan DNA. OPTIRAIN hadir sebagai solusi deteksi dini yang:
✅ Akurat & Real-Time: Menggunakan teknologi sensor optik dan IoT.
✅ Efisien: Biaya operasional jauh lebih murah (hemat hingga 90%) dibanding uji lab konvensional.
✅ Data-Driven: Membantu Pemerintah Kota Tegal memetakan sebaran polusi plastik secara digital.

Kemenangan ini menjadi bukti nyata semangat kreativitas dan kepedulian siswa SMA Negeri 1 Kota Tegal terhadap kelestarian lingkungan dan kesehatan.

Selamat kepada TIM SMA Negeri 1 Tegal:
✨ Basyasya Afifah
✨ Rafif Franando Al Farobby
✨ M. Ghaizan Altaf Zahrif',
  '/berita3.jpg'
),
(
  'Delapan Siswa SMAN 1 Tegal Melaju ke OSN Tingkat Provinsi 2026',
  '2026-07-13',
  'Sebanyak delapan siswa berprestasi SMAN 1 Tegal sukses lolos Olimpiade Sains Nasional (OSN) Tingkat Kota dan siap bersaing di Tingkat Provinsi Jawa Tengah.',
  'Hi, Mates! 💙

Selamat kepada seluruh siswa SMA Negeri 1 Tegal yang berhasil lolos Olimpiade Sains Nasional (OSN) Tingkat Kota dan akan melanjutkan perjuangan di OSN Tingkat Provinsi 2026. 🏅✨

Berikut adalah daftar 8 siswa-siswi kebanggaan SMAN 1 Tegal yang mewakili sekolah ke tingkat provinsi:
1. Kentzi Adelio Pratama - Bidang Matematika
2. Almayra Anindita Irawan - Bidang Fisika
3. Tri Dharma Budiman - Bidang Kimia
4. Calysta Erlene Valerie - Bidang Biologi
5. M. Fadhila Nuril Azhar - Bidang Biologi
6. Erga Chaerul Anam - Bidang Ekonomi
7. Azwa Aurelia Rizki - Bidang Kebumian
8. Mozarifa Ayla Larasati - Bidang Astronomi

Pencapaian ini merupakan hasil dari kerja keras, ketekunan, serta semangat belajar yang luar biasa. Terima kasih juga kepada para guru pembimbing yang telah mendampingi dan memberikan dukungan terbaik dalam setiap prosesnya.

Semoga langkah menuju tingkat provinsi diberikan kelancaran dan hasil yang terbaik. Tetap percaya pada kemampuan diri, terus berusaha, dan tunjukkan prestasi terbaik untuk mengharumkan nama SMAN 1 Tegal. Semangat berjuang, calon juara! 🌟',
  '/berita4.jpg'
),
(
  'Kentzi Adelio Pratama Lolos Grand Final Nasional OSN Bidang Matematika',
  '2026-08-20',
  'Kentzi Adelio Pratama berhasil menempati peringkat ke-13 Nasional dan melaju ke Grand Final OSN 2026 bidang Matematika.',
  'Hi mates! ✨✨
Kabar membanggakan kembali datang dari SMA kita tercinta! 💙

Selamat kepada Kentzi Adelio Pratama, siswa SMA Negeri 1 Tegal, yang berhasil melaju ke Grand Final Nasional OSN bidang Matematika dan menempati peringkat ke-13 nasional! 🏆💥

Pencapaian ini menjadi bukti dari kerja keras, ketekunan, dan semangat Kentzi dalam mengasah kemampuan serta keberanian dalam menghadapi setiap tantangan.

Menjadi 13 terbaik nasional sudah menjadi prestasi yang sangat membanggakan. Semoga Kentzi diberikan kemudahan dan mendapatkan hasil terbaik di Grand Final Nasional. 🔥🔥

Teruslah berjuang, teruslah menginspirasi!
Smansa bangga padamu, Kentzi! 💙🤍',
  '/berita5.jpg'
),
(
  'Pengumuman Penetapan Kelulusan Kelas XII T.A. 2025/2026',
  '2026-05-04',
  'Informasi resmi terkait pengumuman kelulusan peserta didik kelas XII SMA Negeri 1 Tegal Tahun Pelajaran 2025/2026.',
  'PENGUMUMAN KELULUSAN
SMA NEGERI 1 TEGAL
TAHUN AJARAN 2025/2026

Assalamualaikum warahmatullahi wabarakatuh,
Salam sejahtera bagi kita semua.

Puji syukur kita panjatkan ke hadirat Allah Yang Maha Esa atas rahmat dan karunia-Nya, sehingga SMA Negeri 1 Tegal dapat menyelenggarakan proses pendidikan dengan baik hingga pada tahap pengumuman kelulusan peserta didik kelas XII Tahun Pelajaran 2025/2026.

Pengumuman kelulusan ini merupakan hasil dari rangkaian proses penilaian yang telah dilaksanakan secara menyeluruh, meliputi aspek akademik maupun nonakademik, sesuai dengan ketentuan yang berlaku. Penetapan kelulusan didasarkan pada rapat dewan guru yang mengacu pada kriteria kelulusan yang telah ditetapkan oleh sekolah dan regulasi dari Kementerian Pendidikan.

Bagi para siswa yang dinyatakan lulus, kami ucapkan selamat atas pencapaian ini. Jadikanlah bekal ilmu yang telah didapat sebagai pijakan untuk melangkah ke jenjang pendidikan yang lebih tinggi maupun ke dunia masyarakat. Tetap junjung tinggi nilai "Berkarakter dan Berbudaya" sebagai identitas alumni SMAN 1 Tegal.',
  '/berita6.png'
),
(
  'Kegiatan Parenting dan Motivasi FORPISMA (Forum PIK-R)',
  '2026-02-06',
  'PIK-R SMAN 1 Tegal sukses menyelenggarakan kegiatan FORPISMA untuk memperkuat kesiapan mental dan emosional remaja masa kini.',
  'Kegiatan FORPISMA (Forum PIK-R SMAN 1 Tegal) diselenggarakan oleh PIK-R (Pusat Informasi dan Konseling Remaja) SMAN 1 Tegal. PIK R adalah sebuah wadah kegiatan program Penyiapan Kehidupan Berkeluarga Bagi Remaja (PKBR) yang dikelola dari, oleh, dan untuk remaja. Wadah ini bertujuan memberikan pelayanan informasi dan konseling kesehatan reproduksi, pendewasaan usia perkawinan, serta penyiapan kehidupan berkeluarga, sering kali di bawah naungan program GenRe (Generasi Berencana) BKKBN.

PIK R SMAN 1 Tegal dengan kegiatan tahunannya yaitu FORPISMA dilaksanakan pada hari Kamis, 29 Januari 2026, bertempat di Aula Sekolah, mulai pukul 07.30 hingga 10.00 WIB.

Kegiatan ini menjadi salah satu program pembinaan karakter remaja yang bertujuan memperkuat kesiapan mental, emosional, dan pribadi peserta didik dalam menghadapi dinamika kehidupan remaja masa kini. Hal ini selaras dengan tujuan PIK R yaitu sebagai wadah konseling, terutama sebagai tempat mencari solusi permasalahan remaja dari sudut pandang sebaya.',
  '/berita7.png'
);

