"use client";
import { useState, useEffect } from 'react';

export default function AdminPage() {
  // --- STATE UNTUK LOGIN ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // --- STATE TAB AKTIF ---
  const [tab, setTab] = useState('guru');

  // --- STATE DATA ---
  const [guru, setGuru] = useState([]);
  const [ekskul, setEkskul] = useState([]);
  const [berita, setBerita] = useState([]);

  // --- STATE FORM ---
  const [formGuru, setFormGuru] = useState({ nama: '', mapel: '', foto: '/placeholder.jpg' });
  const [formEkskul, setFormEkskul] = useState({ nama: '', deskripsi: '', foto: '/placeholder.jpg' });
  const [formBerita, setFormBerita] = useState({ judul: '', tanggal: '', ringkasan: '', isi: '', foto: '/placeholder.jpg' });

  // Pengecekan awal saat halaman dimuat
  useEffect(() => {
    const statusLogin = localStorage.getItem('isLoggedIn');
    if (statusLogin === 'true') {
      setIsLoggedIn(true);
    }

    // Muat semua data dari Local Storage
    setGuru(JSON.parse(localStorage.getItem('dataGuru')) || []);
    setEkskul(JSON.parse(localStorage.getItem('dataEkskul')) || []);
    setBerita(JSON.parse(localStorage.getItem('dataBerita')) || []);
  }, []);

  // --- FUNGSI LOGIN & LOGOUT ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Username atau password salah!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // --- FUNGSI UPLOAD GAMBAR (konversi file ke base64 Data URL) ---
  const handleFileChange = (e, setForm) => {
    const file = e.target.files[0];
    if (!file) return;

    // Batas ukuran file 1.5MB agar localStorage tidak cepat penuh
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Ukuran gambar terlalu besar! Maksimal 1.5MB.");
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, foto: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // --- FUNGSI KELOLA GURU ---
  const handleTambahGuru = (e) => {
    e.preventDefault();
    const idBaru = guru.length > 0 ? Math.max(...guru.map(g => g.id)) + 1 : 1;
    const arrayBaru = [...guru, { id: idBaru, ...formGuru }];
    setGuru(arrayBaru);
    localStorage.setItem('dataGuru', JSON.stringify(arrayBaru));
    setFormGuru({ nama: '', mapel: '', foto: '/placeholder.jpg' });
    alert("Guru berhasil ditambahkan!");
  };

  const handleHapusGuru = (id) => {
    if (window.confirm("Yakin ingin menghapus data guru ini?")) {
      const arrayBaru = guru.filter(g => g.id !== id);
      setGuru(arrayBaru);
      localStorage.setItem('dataGuru', JSON.stringify(arrayBaru));
    }
  };

  // --- FUNGSI KELOLA EKSKUL ---
  const handleTambahEkskul = (e) => {
    e.preventDefault();
    const idBaru = ekskul.length > 0 ? Math.max(...ekskul.map(ex => ex.id)) + 1 : 1;
    const arrayBaru = [...ekskul, { id: idBaru, ...formEkskul }];
    setEkskul(arrayBaru);
    localStorage.setItem('dataEkskul', JSON.stringify(arrayBaru));
    setFormEkskul({ nama: '', deskripsi: '', foto: '/placeholder.jpg' });
    alert("Ekskul berhasil ditambahkan!");
  };

  const handleHapusEkskul = (id) => {
    if (window.confirm("Yakin ingin menghapus data ekskul ini?")) {
      const arrayBaru = ekskul.filter(ex => ex.id !== id);
      setEkskul(arrayBaru);
      localStorage.setItem('dataEkskul', JSON.stringify(arrayBaru));
    }
  };

  // --- FUNGSI KELOLA BERITA ---
  const handleTambahBerita = (e) => {
    e.preventDefault();
    const idBaru = berita.length > 0 ? Math.max(...berita.map(b => b.id)) + 1 : 1;
    const arrayBaru = [...berita, { id: idBaru, ...formBerita }];
    setBerita(arrayBaru);
    localStorage.setItem('dataBerita', JSON.stringify(arrayBaru));
    setFormBerita({ judul: '', tanggal: '', ringkasan: '', isi: '', foto: '/placeholder.jpg' });
    alert("Berita berhasil ditambahkan!");
  };

  const handleHapusBerita = (id) => {
    if (window.confirm("Yakin ingin menghapus data berita ini?")) {
      const arrayBaru = berita.filter(b => b.id !== id);
      setBerita(arrayBaru);
      localStorage.setItem('dataBerita', JSON.stringify(arrayBaru));
    }
  };

  // ==========================================
  // HALAMAN LOGIN
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
              <input type="text" required className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" required className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-amber-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full py-3 px-4 rounded-lg shadow-sm text-white bg-amber-600 hover:bg-amber-700 font-bold transition-colors">Masuk ke Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD ADMIN
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-10 px-4 transition-colors">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
        
        {/* Header Admin */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">SMANSA Admin Panel</h1>
            <p className="text-amber-500 text-sm">Kelola Data Website (Local Storage)</p>
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
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Tambah Guru Baru</h2>
            <form onSubmit={handleTambahGuru} className="mb-8">
              {/* Upload Foto Guru */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-slate-700 border-2 border-amber-500 flex-shrink-0">
                  <img src={formGuru.foto} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto Guru</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFormGuru)} className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-amber-500 file:text-white hover:file:bg-amber-600" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tambahan text-slate-900 dark:text-white dan placeholder-gray-400 pada semua form input */}
                <input required type="text" placeholder="Nama Guru (beserta gelar)" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formGuru.nama} onChange={(e) => setFormGuru({...formGuru, nama: e.target.value})} />
                <input required type="text" placeholder="Mata Pelajaran / Jabatan" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formGuru.mapel} onChange={(e) => setFormGuru({...formGuru, mapel: e.target.value})} />
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition-colors">Tambah Guru</button>
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
                    <th className="p-4 border-b dark:border-slate-600 text-center w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {guru.length === 0 ? <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Belum ada data guru.</td></tr> : guru.map(g => (
                    <tr key={g.id} className="border-b dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="p-4">{g.id}</td>
                      <td className="p-4 font-semibold">{g.nama}</td>
                      <td className="p-4">{g.mapel}</td>
                      <td className="p-4 text-center"><button onClick={() => handleHapusGuru(g.id)} className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded text-sm font-bold">Hapus</button></td>
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
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Tambah Ekskul Baru</h2>
            <form onSubmit={handleTambahEkskul} className="flex flex-col gap-4 mb-8">
              {/* Upload Foto Ekskul */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 dark:bg-slate-700 border-2 border-amber-500 flex-shrink-0">
                  <img src={formEkskul.foto} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto Ekskul</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFormEkskul)} className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-amber-500 file:text-white hover:file:bg-amber-600" />
                </div>
              </div>

              <input required type="text" placeholder="Nama Ekstrakurikuler" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formEkskul.nama} onChange={(e) => setFormEkskul({...formEkskul, nama: e.target.value})} />
              <textarea required placeholder="Deskripsi Singkat" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400 h-24" value={formEkskul.deskripsi} onChange={(e) => setFormEkskul({...formEkskul, deskripsi: e.target.value})}></textarea>
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-48 transition-colors">Tambah Ekskul</button>
            </form>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Daftar Ekskul Saat Ini</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-white">
                    <th className="p-4 border-b dark:border-slate-600 w-16">ID</th>
                    <th className="p-4 border-b dark:border-slate-600">Nama Ekskul</th>
                    <th className="p-4 border-b dark:border-slate-600">Deskripsi</th>
                    <th className="p-4 border-b dark:border-slate-600 text-center w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {ekskul.length === 0 ? <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Belum ada data ekskul.</td></tr> : ekskul.map(ex => (
                    <tr key={ex.id} className="border-b dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="p-4">{ex.id}</td>
                      <td className="p-4 font-semibold">{ex.nama}</td>
                      <td className="p-4">{ex.deskripsi}</td>
                      <td className="p-4 text-center"><button onClick={() => handleHapusEkskul(ex.id)} className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded text-sm font-bold">Hapus</button></td>
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
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Tambah Berita Baru</h2>
            <form onSubmit={handleTambahBerita} className="flex flex-col gap-4 mb-8">
              {/* Upload Foto Berita */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 dark:bg-slate-700 border-2 border-amber-500 flex-shrink-0">
                  <img src={formBerita.foto} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto Berita</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFormBerita)} className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-amber-500 file:text-white hover:file:bg-amber-600" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Judul Berita" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formBerita.judul} onChange={(e) => setFormBerita({...formBerita, judul: e.target.value})} />
                <input required type="date" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white" value={formBerita.tanggal} onChange={(e) => setFormBerita({...formBerita, tanggal: e.target.value})} />
              </div>
              <input required type="text" placeholder="Ringkasan Singkat (Muncul di Homepage)" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400" value={formBerita.ringkasan} onChange={(e) => setFormBerita({...formBerita, ringkasan: e.target.value})} />
              <textarea required placeholder="Isi Berita Lengkap" className="border border-gray-300 dark:border-slate-600 p-2 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400 h-32" value={formBerita.isi} onChange={(e) => setFormBerita({...formBerita, isi: e.target.value})}></textarea>
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-48 transition-colors">Tambah Berita</button>
            </form>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Daftar Berita Saat Ini</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-white">
                    <th className="p-4 border-b dark:border-slate-600 w-16">ID</th>
                    <th className="p-4 border-b dark:border-slate-600 w-32">Tanggal</th>
                    <th className="p-4 border-b dark:border-slate-600">Judul Berita</th>
                    <th className="p-4 border-b dark:border-slate-600 text-center w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {berita.length === 0 ? <tr><td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Belum ada data berita.</td></tr> : berita.map(b => (
                    <tr key={b.id} className="border-b dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="p-4">{b.id}</td>
                      <td className="p-4">{b.tanggal}</td>
                      <td className="p-4 font-semibold">{b.judul}</td>
                      <td className="p-4 text-center"><button onClick={() => handleHapusBerita(b.id)} className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded text-sm font-bold">Hapus</button></td>
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