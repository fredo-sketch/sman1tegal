"use client";
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Helper: format DATE dari Postgres (YYYY-MM-DD) ke "11 September 2026"
function formatTanggal(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

const FORM_GURU_INIT = { nama: '', mapel: '', foto_url: '/placeholder.jpg' };
const FORM_EKSKUL_INIT = { nama: '', deskripsi: '', foto_url: '/placeholder.jpg' };
const FORM_BERITA_INIT = { judul: '', tanggal: '', ringkasan: '', isi: '', foto_url: '/placeholder.jpg' };

export default function AdminPage() {
  // --- STATE LOGIN ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(true);

  // --- STATE TAB AKTIF ---
  const [tab, setTab] = useState('guru');

  // --- STATE DATA ---
  const [guru, setGuru] = useState([]);
  const [ekskul, setEkskul] = useState([]);
  const [berita, setBerita] = useState([]);

  // --- STATE LOADING & ERROR DATA ---
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);

  // --- STATE FORM ---
  const [formGuru, setFormGuru] = useState(FORM_GURU_INIT);
  const [formEkskul, setFormEkskul] = useState(FORM_EKSKUL_INIT);
  const [formBerita, setFormBerita] = useState(FORM_BERITA_INIT);

  // --- STATE MODE EDIT ---
  const [editingGuruId, setEditingGuruId] = useState(null);
  const [editingEkskulId, setEditingEkskulId] = useState(null);
  const [editingBeritaId, setEditingBeritaId] = useState(null);

  // --- STATE SUBMIT ---
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ==========================================
  // CEK SESSION SAAT HALAMAN DIMUAT
  // ==========================================
  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      }
      setLoadingAuth(false);
    }
    checkSession();

    // Pantau perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // ==========================================
  // FETCH DATA BERDASARKAN TAB AKTIF
  // ==========================================
  const fetchData = useCallback(async (activeTab) => {
    setLoadingData(true);
    setDataError(null);

    const endpointMap = {
      guru: '/api/admin/guru',
      ekskul: '/api/admin/ekskul',
      berita: '/api/admin/berita',
    };

    try {
      const res = await fetch(endpointMap[activeTab]);
      if (!res.ok) throw new Error(`Gagal memuat data (status ${res.status})`);
      const data = await res.json();

      if (activeTab === 'guru') setGuru(data);
      else if (activeTab === 'ekskul') setEkskul(data);
      else if (activeTab === 'berita') setBerita(data);
    } catch (err) {
      setDataError(err.message);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData(tab);
    }
  }, [isLoggedIn, tab, fetchData]);

  // ==========================================
  // FUNGSI LOGIN & LOGOUT (Supabase Auth)
  // ==========================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingAuth(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Email atau password salah!');
    }
    setLoadingAuth(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // ==========================================
  // FUNGSI UPLOAD GAMBAR ke API Route
  // ==========================================
  const handleFileChange = async (e, setForm) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar! Maksimal 5MB.');
      e.target.value = '';
      return;
    }

    setUploadingImage(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Upload gagal');
      setForm((prev) => ({ ...prev, foto_url: result.url }));
    } catch (err) {
      alert('Upload gambar gagal: ' + err.message);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  // ==========================================
  // FUNGSI KELOLA GURU
  // ==========================================
  const handleTambahGuru = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('Sesi habis, silakan login kembali.'); setSubmitting(false); return; }

    try {
      const res = await fetch('/api/admin/guru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formGuru),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Gagal menambah guru');
      setGuru((prev) => [...prev, result]);
      setFormGuru(FORM_GURU_INIT);
      alert('Guru berhasil ditambahkan!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditGuru = (g) => {
    setEditingGuruId(g.id);
    setFormGuru({ nama: g.nama, mapel: g.mapel, foto_url: g.foto_url });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimpanEditGuru = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('Sesi habis, silakan login kembali.'); setSubmitting(false); return; }

    try {
      const res = await fetch(`/api/admin/guru/${editingGuruId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formGuru),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Gagal menyimpan perubahan');
      setGuru((prev) => prev.map((g) => g.id === editingGuruId ? result : g));
      setFormGuru(FORM_GURU_INIT);
      setEditingGuruId(null);
      alert('Guru berhasil diperbarui!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBatalEditGuru = () => {
    setEditingGuruId(null);
    setFormGuru(FORM_GURU_INIT);
  };

  const handleHapusGuru = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data guru ini?')) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('Sesi habis, silakan login kembali.'); return; }

    try {
      const res = await fetch(`/api/admin/guru/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Gagal menghapus guru');
      }
      setGuru((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ==========================================
  // FUNGSI KELOLA EKSKUL
  // ==========================================
  const handleTambahEkskul = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('Sesi habis, silakan login kembali.'); setSubmitting(false); return; }

    try {
      const res = await fetch('/api/admin/ekskul', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEkskul),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Gagal menambah ekskul');
      setEkskul((prev) => [...prev, result]);
      setFormEkskul(FORM_EKSKUL_INIT);
      alert('Ekskul berhasil ditambahkan!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditEkskul = (ex) => {
    setEditingEkskulId(ex.id);
    setFormEkskul({ nama: ex.nama, deskripsi: ex.deskripsi, foto_url: ex.foto_url });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimpanEditEkskul = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('Sesi habis, silakan login kembali.'); setSubmitting(false); return; }

    try {
      const res = await fetch(`/api/admin/ekskul/${editingEkskulId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEkskul),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Gagal menyimpan perubahan');
      setEkskul((prev) => prev.map((ex) => ex.id === editingEkskulId ? result : ex));
      setFormEkskul(FORM_EKSKUL_INIT);
      setEditingEkskulId(null);
      alert('Ekskul berhasil diperbarui!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBatalEditEkskul = () => {
    setEditingEkskulId(null);
    setFormEkskul(FORM_EKSKUL_INIT);
  };

  const handleHapusEkskul = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data ekskul ini?')) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('Sesi habis, silakan login kembali.'); return; }

    try {
      const res = await fetch(`/api/admin/ekskul/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Gagal menghapus ekskul');
      }
      setEkskul((prev) => prev.filter((ex) => ex.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ==========================================
  // FUNGSI KELOLA BERITA
  // ==========================================
  const handleTambahBerita = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('Sesi habis, silakan login kembali.'); setSubmitting(false); return; }

    try {
      const res = await fetch('/api/admin/berita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formBerita),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Gagal menambah berita');
      setBerita((prev) => [result, ...prev]);
      setFormBerita(FORM_BERITA_INIT);
      alert('Berita berhasil ditambahkan!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditBerita = (b) => {
    setEditingBeritaId(b.id);
    // tanggal dari Postgres sudah dalam format YYYY-MM-DD, cocok untuk input[type="date"]
    setFormBerita({ judul: b.judul, tanggal: b.tanggal, ringkasan: b.ringkasan, isi: b.isi, foto_url: b.foto_url });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimpanEditBerita = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('Sesi habis, silakan login kembali.'); setSubmitting(false); return; }

    try {
      const res = await fetch(`/api/admin/berita/${editingBeritaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formBerita),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Gagal menyimpan perubahan');
      setBerita((prev) => prev.map((b) => b.id === editingBeritaId ? result : b));
      setFormBerita(FORM_BERITA_INIT);
      setEditingBeritaId(null);
      alert('Berita berhasil diperbarui!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBatalEditBerita = () => {
    setEditingBeritaId(null);
    setFormBerita(FORM_BERITA_INIT);
  };

  const handleHapusBerita = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data berita ini?')) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('Sesi habis, silakan login kembali.'); return; }

    try {
      const res = await fetch(`/api/admin/berita/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Gagal menghapus berita');
      }
      setBerita((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ==========================================
  // RENDER: LOADING AUTH
  // ==========================================
  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors">
        <p className="text-slate-500 dark:text-slate-400 font-medium">Memuat...</p>
      </div>
    );
  }

  // ==========================================
  // RENDER: HALAMAN LOGIN
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Silakan masuk ke panel SMANSA</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm text-center font-semibold">{error}</div>}
            <div className="space-y-4">
              {/* Tambahan text-slate-900 dark:text-white dan placeholder-gray-400 */}
              <input type="email" required className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" placeholder="Email Admin" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" required className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={loadingAuth} className="w-full py-3 px-4 rounded-lg shadow-sm text-white bg-amber-600 hover:bg-amber-700 font-bold transition-colors disabled:opacity-50">
              {loadingAuth ? 'Masuk...' : 'Masuk ke Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: DASHBOARD ADMIN
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-10 px-4 transition-colors">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
        
        {/* Header Admin */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">SMANSA Admin Panel</h1>
            <p className="text-amber-500 text-sm">Kelola Data Website (Supabase)</p>
          </div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">Logout</button>
        </div>

        {/* Menu Tab */}
        <div className="flex border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
          <button onClick={() => setTab('guru')} className={`flex-1 py-4 font-bold transition-colors ${tab === 'guru' ? 'text-amber-600 border-b-2 border-amber-600 bg-white dark:bg-slate-800' : 'text-gray-500 dark:text-gray-400'}`}>Data Guru</button>
          <button onClick={() => setTab('ekskul')} className={`flex-1 py-4 font-bold transition-colors ${tab === 'ekskul' ? 'text-amber-600 border-b-2 border-amber-600 bg-white dark:bg-slate-800' : 'text-gray-500 dark:text-gray-400'}`}>Data Ekskul</button>
          <button onClick={() => setTab('berita')} className={`flex-1 py-4 font-bold transition-colors ${tab === 'berita' ? 'text-amber-600 border-b-2 border-amber-600 bg-white dark:bg-slate-800' : 'text-gray-500 dark:text-gray-400'}`}>Data Berita</button>
        </div>

        {/* KONTEN TAB: GURU */}
        {tab === 'guru' && (
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
              {editingGuruId ? 'Edit Data Guru' : 'Tambah Guru Baru'}
            </h2>
            <form onSubmit={editingGuruId ? handleSimpanEditGuru : handleTambahGuru} className="mb-8">
              {/* Upload Foto Guru */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-slate-700 border-2 border-amber-500 flex-shrink-0">
                  <img src={formGuru.foto_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto Guru</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFormGuru)} className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-amber-500 file:text-white hover:file:bg-amber-600" />
                  {uploadingImage && <p className="text-xs text-amber-600 mt-1">Mengupload gambar...</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tambahan text-slate-900 dark:text-white dan placeholder-gray-400 pada semua form input */}
                <input required type="text" placeholder="Nama Guru (beserta gelar)" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formGuru.nama} onChange={(e) => setFormGuru({...formGuru, nama: e.target.value})} />
                <input required type="text" placeholder="Mata Pelajaran / Jabatan" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formGuru.mapel} onChange={(e) => setFormGuru({...formGuru, mapel: e.target.value})} />
                <div className="flex gap-2">
                  <button type="submit" disabled={submitting || uploadingImage} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50">
                    {submitting ? 'Menyimpan...' : editingGuruId ? 'Simpan Perubahan' : 'Tambah Guru'}
                  </button>
                  {editingGuruId && (
                    <button type="button" onClick={handleBatalEditGuru} className="bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-slate-700 dark:text-white font-bold py-2 px-3 rounded transition-colors">
                      Batal
                    </button>
                  )}
                </div>
              </div>
            </form>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Daftar Guru Saat Ini</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-white">
                    <th className="p-4 border-b dark:border-slate-600 w-16">ID</th>
                    <th className="p-4 border-b dark:border-slate-600">Nama</th>
                    <th className="p-4 border-b dark:border-slate-600">Mapel</th>
                    <th className="p-4 border-b dark:border-slate-600 text-center w-32">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingData ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Memuat data...</td></tr>
                  ) : dataError ? (
                    <tr><td colSpan="4" className="p-4 text-center text-red-500">{dataError}</td></tr>
                  ) : guru.length === 0 ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Belum ada data guru.</td></tr>
                  ) : guru.map(g => (
                    <tr key={g.id} className="border-b dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="p-4">{g.id}</td>
                      <td className="p-4 font-semibold">{g.nama}</td>
                      <td className="p-4">{g.mapel}</td>
                      <td className="p-4 text-center flex gap-2 justify-center">
                        <button onClick={() => handleEditGuru(g)} className="bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded text-sm font-bold">Edit</button>
                        <button onClick={() => handleHapusGuru(g.id)} className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded text-sm font-bold">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* KONTEN TAB: EKSKUL */}
        {tab === 'ekskul' && (
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
              {editingEkskulId ? 'Edit Data Ekskul' : 'Tambah Ekskul Baru'}
            </h2>
            <form onSubmit={editingEkskulId ? handleSimpanEditEkskul : handleTambahEkskul} className="flex flex-col gap-4 mb-8">
              {/* Upload Foto Ekskul */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 dark:bg-slate-700 border-2 border-amber-500 flex-shrink-0">
                  <img src={formEkskul.foto_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto Ekskul</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFormEkskul)} className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-amber-500 file:text-white hover:file:bg-amber-600" />
                  {uploadingImage && <p className="text-xs text-amber-600 mt-1">Mengupload gambar...</p>}
                </div>
              </div>

              <input required type="text" placeholder="Nama Ekstrakurikuler" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formEkskul.nama} onChange={(e) => setFormEkskul({...formEkskul, nama: e.target.value})} />
              <textarea required placeholder="Deskripsi Singkat" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400 h-24" value={formEkskul.deskripsi} onChange={(e) => setFormEkskul({...formEkskul, deskripsi: e.target.value})}></textarea>
              <div className="flex gap-2 w-fit">
                <button type="submit" disabled={submitting || uploadingImage} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50">
                  {submitting ? 'Menyimpan...' : editingEkskulId ? 'Simpan Perubahan' : 'Tambah Ekskul'}
                </button>
                {editingEkskulId && (
                  <button type="button" onClick={handleBatalEditEkskul} className="bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-slate-700 dark:text-white font-bold py-2 px-3 rounded transition-colors">
                    Batal
                  </button>
                )}
              </div>
            </form>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Daftar Ekskul Saat Ini</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-white">
                    <th className="p-4 border-b dark:border-slate-600 w-16">ID</th>
                    <th className="p-4 border-b dark:border-slate-600">Nama Ekskul</th>
                    <th className="p-4 border-b dark:border-slate-600">Deskripsi</th>
                    <th className="p-4 border-b dark:border-slate-600 text-center w-32">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingData ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Memuat data...</td></tr>
                  ) : dataError ? (
                    <tr><td colSpan="4" className="p-4 text-center text-red-500">{dataError}</td></tr>
                  ) : ekskul.length === 0 ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Belum ada data ekskul.</td></tr>
                  ) : ekskul.map(ex => (
                    <tr key={ex.id} className="border-b dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="p-4">{ex.id}</td>
                      <td className="p-4 font-semibold">{ex.nama}</td>
                      <td className="p-4">{ex.deskripsi}</td>
                      <td className="p-4 text-center flex gap-2 justify-center">
                        <button onClick={() => handleEditEkskul(ex)} className="bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded text-sm font-bold">Edit</button>
                        <button onClick={() => handleHapusEkskul(ex.id)} className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded text-sm font-bold">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* KONTEN TAB: BERITA */}
        {tab === 'berita' && (
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
              {editingBeritaId ? 'Edit Data Berita' : 'Tambah Berita Baru'}
            </h2>
            <form onSubmit={editingBeritaId ? handleSimpanEditBerita : handleTambahBerita} className="flex flex-col gap-4 mb-8">
              {/* Upload Foto Berita */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 dark:bg-slate-700 border-2 border-amber-500 flex-shrink-0">
                  <img src={formBerita.foto_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto Berita</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFormBerita)} className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-amber-500 file:text-white hover:file:bg-amber-600" />
                  {uploadingImage && <p className="text-xs text-amber-600 mt-1">Mengupload gambar...</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Judul Berita" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formBerita.judul} onChange={(e) => setFormBerita({...formBerita, judul: e.target.value})} />
                <input required type="date" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white" value={formBerita.tanggal} onChange={(e) => setFormBerita({...formBerita, tanggal: e.target.value})} />
              </div>
              <input required type="text" placeholder="Ringkasan Singkat (Muncul di Homepage)" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formBerita.ringkasan} onChange={(e) => setFormBerita({...formBerita, ringkasan: e.target.value})} />
              <textarea required placeholder="Isi Berita Lengkap" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400 h-32" value={formBerita.isi} onChange={(e) => setFormBerita({...formBerita, isi: e.target.value})}></textarea>
              <div className="flex gap-2 w-fit">
                <button type="submit" disabled={submitting || uploadingImage} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50">
                  {submitting ? 'Menyimpan...' : editingBeritaId ? 'Simpan Perubahan' : 'Tambah Berita'}
                </button>
                {editingBeritaId && (
                  <button type="button" onClick={handleBatalEditBerita} className="bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-slate-700 dark:text-white font-bold py-2 px-3 rounded transition-colors">
                    Batal
                  </button>
                )}
              </div>
            </form>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Daftar Berita Saat Ini</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-white">
                    <th className="p-4 border-b dark:border-slate-600 w-16">ID</th>
                    <th className="p-4 border-b dark:border-slate-600 w-36">Tanggal</th>
                    <th className="p-4 border-b dark:border-slate-600">Judul Berita</th>
                    <th className="p-4 border-b dark:border-slate-600 text-center w-32">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingData ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Memuat data...</td></tr>
                  ) : dataError ? (
                    <tr><td colSpan="4" className="p-4 text-center text-red-500">{dataError}</td></tr>
                  ) : berita.length === 0 ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Belum ada data berita.</td></tr>
                  ) : berita.map(b => (
                    <tr key={b.id} className="border-b dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="p-4">{b.id}</td>
                      <td className="p-4">{formatTanggal(b.tanggal)}</td>
                      <td className="p-4 font-semibold">{b.judul}</td>
                      <td className="p-4 text-center flex gap-2 justify-center">
                        <button onClick={() => handleEditBerita(b)} className="bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded text-sm font-bold">Edit</button>
                        <button onClick={() => handleHapusBerita(b.id)} className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded text-sm font-bold">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
