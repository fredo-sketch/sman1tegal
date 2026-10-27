-- ============================================================
-- SMANSA TEGAL — Supabase SQL Schema
-- Jalankan seluruh file ini di Supabase SQL Editor
-- ============================================================

-- ============================================================
-- TABEL GURU
-- ============================================================
CREATE TABLE public.guru (
  id         SERIAL PRIMARY KEY,
  nama       TEXT NOT NULL,
  mapel      TEXT NOT NULL,
  foto_url   TEXT NOT NULL DEFAULT '/placeholder.jpg',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABEL EKSKUL
-- ============================================================
CREATE TABLE public.ekskul (
  id         SERIAL PRIMARY KEY,
  nama       TEXT NOT NULL,
  deskripsi  TEXT NOT NULL,
  foto_url   TEXT NOT NULL DEFAULT '/placeholder.jpg',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABEL BERITA
-- ============================================================
CREATE TABLE public.berita (
  id         SERIAL PRIMARY KEY,
  judul      TEXT NOT NULL,
  tanggal    DATE NOT NULL,
  ringkasan  TEXT NOT NULL,
  isi        TEXT NOT NULL,
  foto_url   TEXT NOT NULL DEFAULT '/placeholder.jpg',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Aktifkan RLS untuk semua tabel
ALTER TABLE public.guru   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ekskul ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;

-- Policy: siapa pun (termasuk anonymous) boleh SELECT
CREATE POLICY "Public can read guru"
  ON public.guru FOR SELECT USING (true);

CREATE POLICY "Public can read ekskul"
  ON public.ekskul FOR SELECT USING (true);

CREATE POLICY "Public can read berita"
  ON public.berita FOR SELECT USING (true);

-- INSERT/UPDATE/DELETE tidak ada policy publik → otomatis diblokir untuk anon key.
-- Operasi tulis hanya bisa dilakukan via service_role key (API Routes server-side).

-- ============================================================
-- STORAGE BUCKET "images"
-- ============================================================
-- Jalankan di SQL Editor:
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,           -- public bucket (URL bisa diakses tanpa auth)
  5242880,        -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Policy Storage: hanya authenticated user yang bisa upload/delete
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');

-- Policy Storage: siapa pun bisa baca (public bucket)
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

