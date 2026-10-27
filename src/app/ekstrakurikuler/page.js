"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function EkskulPage() {
  const [ekskul, setEkskul] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEkskul() {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('ekskul')
        .select('id, nama, deskripsi, foto_url')
        .order('id', { ascending: true });

      if (err) {
        console.error('Gagal memuat data ekskul:', err.message);
        setError('Gagal memuat data ekskul. Silakan coba lagi.');
      } else {
        setEkskul(data || []);
      }
      setLoading(false);
    }

    fetchEkskul();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-12">Ekstrakurikuler SMANSA</h1>

        {loading && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p className="text-lg font-medium">Memuat data ekstrakurikuler...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && ekskul.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p>Belum ada data ekstrakurikuler.</p>
          </div>
        )}

        {!loading && !error && ekskul.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ekskul.map((e) => (
              <div key={e.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-700">
                <div className="h-48 bg-gray-200">
                  <img src={e.foto_url} alt={e.nama} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">{e.nama}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{e.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
