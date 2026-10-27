"use client";
import { useState, useEffect } from 'react';
import BeritaCard from '../../components/BeritaCard';
import { supabase } from '@/lib/supabaseClient';

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

export default function DaftarBerita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBerita() {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('berita')
        .select('id, judul, tanggal, ringkasan, foto_url')
        .order('tanggal', { ascending: false });

      if (err) {
        console.error('Gagal memuat data berita:', err.message);
        setError('Gagal memuat daftar berita. Silakan coba lagi.');
      } else {
        setBerita(data || []);
      }
      setLoading(false);
    }

    fetchBerita();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div>
        {/* Header Halaman Berita dengan Latar Gambar dan Animasi */}
      <div className="relative bg-slate-900 py-20 text-center text-white border-b-4 border-amber-500 overflow-hidden mb-12">

        {/* Gambar Latar Belakang */}
        <div className="absolute inset-0 z-0">
          <img
            src="/berita-bg.png"
            alt="Latar Berita SMAN 1 Tegal"
            className="w-full h-full object-cover opacity-100"
          />
          {/* Overlay Gelap */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/90"></div>
        </div>

        {/* Konten Teks */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight animate-fade-in-up text-white">
            Kumpulan Berita SMANSA
          </h1>
          <p className="text-amber-500 font-semibold text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up drop-shadow-sm">
            Kabar terbaru, prestasi, dan agenda kegiatan SMA Negeri 1 Tegal
          </p>
        </div>
      </div>

        {/* Grid Berita */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {loading && (
            <div className="text-center py-20 text-slate-500 dark:text-slate-400">
              <p className="text-lg font-medium">Memuat berita...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 font-semibold">{error}</p>
            </div>
          )}

          {!loading && !error && berita.length === 0 && (
            <div className="text-center py-20 text-slate-500 dark:text-slate-400">
              <p>Belum ada berita.</p>
            </div>
          )}

          {!loading && !error && berita.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {berita.map((item) => (
                <BeritaCard
                  key={item.id}
                  id={item.id}
                  judul={item.judul}
                  tanggal={formatTanggal(item.tanggal)}
                  ringkasan={item.ringkasan}
                  gambar={item.foto_url}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
