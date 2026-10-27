"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

// Helper: format DATE dari Postgres (YYYY-MM-DD) ke "11 September 2026"
function formatTanggal(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00'); // Hindari timezone shift
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default function DetailBeritaClient({ id }) {
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchDetail() {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('berita')
        .select('id, judul, tanggal, ringkasan, isi, foto_url')
        .eq('id', id)
        .single();

      if (err) {
        // PGRST116 = no rows found (data tidak ada)
        if (err.code === 'PGRST116') {
          setBerita(null);
        } else {
          console.error('Gagal memuat detail berita:', err.message);
          setError('Gagal memuat berita. Silakan coba lagi.');
        }
      } else {
        setBerita(data);
      }
      setLoading(false);
    }

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Memuat berita...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <p className="text-red-500 font-semibold mb-4">{error}</p>
        <Link href="/berita" className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
          Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Berita Tidak Ditemukan</h1>
        <Link href="/berita" className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
          Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Tombol Kembali */}
        <Link href="/berita" className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 font-medium flex items-center mb-8 inline-block">
          &larr; Kembali ke Berita
        </Link>

        {/* Header Detail Berita */}
        <div className="mb-8 border-b border-gray-200 dark:border-slate-700 pb-8">
          <p className="text-amber-600 dark:text-amber-400 font-bold text-sm mb-2">{formatTanggal(berita.tanggal)}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            {berita.judul}
          </h1>

          {/* Gambar Berita */}
          <div className="w-full rounded-xl overflow-hidden mb-8 shadow-sm bg-gray-100 dark:bg-slate-800 flex justify-center">
            <img
              src={berita.foto_url}
              alt={berita.judul}
              className="w-full h-auto max-h-[600px] object-contain"
            />
          </div>
        </div>

        {/* Isi Berita */}
        <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-justify mb-16">

          <p className="whitespace-pre-line">{berita.isi}</p>

          <p className="mt-8">
            Ke depannya, pihak sekolah berjanji akan terus memberikan dukungan penuh bagi kegiatan-kegiatan positif yang dapat membangun karakter serta mengasah potensi siswa. SMAN 1 Tegal membuktikan komitmennya sebagai sekolah yang unggul dalam prestasi dan santun dalam perilaku.
          </p>
        </div>

      </div>
    </div>
  );
}
