"use client";
import { useState, useEffect } from 'react';
import BeritaCard from '../../components/BeritaCard';
import { dummyBerita } from '../../data/beritaData';

export { dummyBerita };

export default function DaftarBerita() {
  const [berita, setBerita] = useState(dummyBerita);

  useEffect(() => {
    const dataLokal = localStorage.getItem('dataBerita');
    if (dataLokal) {
      setBerita(JSON.parse(dataLokal));
    } else {
      localStorage.setItem('dataBerita', JSON.stringify(dummyBerita));
      setBerita(dummyBerita);
    }
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

        {/* Grid 6 Berita */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {berita.map((item) => (
              <BeritaCard
                key={item.id}
                id={item.id}
                judul={item.judul}
                tanggal={item.tanggal}
                ringkasan={item.ringkasan}
                gambar={item.gambar || item.foto}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}