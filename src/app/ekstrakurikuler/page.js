"use client";
import { useState, useEffect } from 'react';

export default function EkskulPage() {
  const [ekskul, setEkskul] = useState([]);

  useEffect(() => {
    const dataLokal = localStorage.getItem('dataEkskul');
    if (dataLokal) {
      setEkskul(JSON.parse(dataLokal));
    } else {
      const dataAwal = [
        { id: 1, nama: "Pramuka Ambalan", deskripsi: "Ekstrakurikuler wajib pembentuk karakter disiplin dan mandiri.", foto: "/placeholder.jpg" },
        { id: 2, nama: "Paskibraka", deskripsi: "Pasukan pengibar bendera pusaka SMAN 1 Tegal.", foto: "/placeholder.jpg" },
      ];
      localStorage.setItem('dataEkskul', JSON.stringify(dataAwal));
      setEkskul(dataAwal);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-12">Ekstrakurikuler SMANSA</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ekskul.map((e) => (
            <div key={e.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-700">
              <div className="h-48 bg-gray-200">
                <img src={e.foto} alt={e.nama} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">{e.nama}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{e.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}