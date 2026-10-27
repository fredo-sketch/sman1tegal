"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function GuruPage() {
  const [guru, setGuru] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGuru() {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('guru')
        .select('id, nama, mapel, foto_url')
        .order('id', { ascending: true });

      if (err) {
        console.error('Gagal memuat data guru:', err.message);
        setError('Gagal memuat data guru. Silakan coba lagi.');
      } else {
        setGuru(data || []);
      }
      setLoading(false);
    }

    fetchGuru();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-12">Daftar Guru &amp; Staf</h1>

        {loading && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p className="text-lg font-medium">Memuat data guru...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && guru.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p>Belum ada data guru.</p>
          </div>
        )}

        {!loading && !error && guru.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {guru.map((g) => (
              <div key={g.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6 border border-gray-100 dark:border-slate-700">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 border-4 border-amber-500">
                  <img src={g.foto_url} alt={g.nama} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white text-center">{g.nama}</h3>
                <p className="text-amber-600 dark:text-amber-400 text-sm font-medium mt-1">{g.mapel}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
