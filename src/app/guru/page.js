"use client";
import { useState, useEffect } from 'react';

export default function GuruPage() {
  const [guru, setGuru] = useState([]);

  useEffect(() => {
    // Ambil data dari localStorage saat halaman dimuat
    const dataLokal = localStorage.getItem('dataGuru');
    if (dataLokal) {
      setGuru(JSON.parse(dataLokal));
    } else {
      // Data dummy awal jika localStorage masih kosong
      const dataAwal = [
        { id: 1, nama: "Dr. Budi Setiawan, M.Pd.", mapel: "Kepala Sekolah", foto: "/placeholder.jpg" },
        { id: 2, nama: "Siti Aminah, S.Pd.", mapel: "Matematika", foto: "/placeholder.jpg" },
      ];
      localStorage.setItem('dataGuru', JSON.stringify(dataAwal));
      setGuru(dataAwal);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-12">Daftar Guru & Staf</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {guru.map((g) => (
            <div key={g.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6 border border-gray-100 dark:border-slate-700">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 border-4 border-amber-500">
                <img src={g.foto} alt={g.nama} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white text-center">{g.nama}</h3>
              <p className="text-amber-600 dark:text-amber-400 text-sm font-medium mt-1">{g.mapel}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}