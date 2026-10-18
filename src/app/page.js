import BeritaCard from '../components/BeritaCard';
import Link from 'next/link';
import AnimatedCounter from '../components/AnimatedCounter';
import { dummyBerita } from '../data/beritaData';

export default function Home() {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white">
        
        {/* Gambar Latar Belakang */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/hero.png" 
            alt="Gedung SMAN 1 Tegal" 
            className="w-full h-full object-cover animate-slow-zoom"
          />
          {/* Overlay gelap */}
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>
        
<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center animate-fade-in-up">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Selamat Datang di<br className="hidden md:block"/> SMA Negeri 1 Tegal
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl font-light">
Jelajahi lebih luas website kami dan manfaatkan dengan sebaik-baiknya. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/about" className="px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-600 transition shadow-lg">
              Jelajahi Sekolah &rarr;
            </Link>
          <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=info@sman1tegal.sch.id" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-slate-900 transition text-center"
            >
              Hubungi Kami
            </a>
          </div>
          
{/* STATISTIK BAWAH HERO */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-white/20 pt-8">
            <div>
              <p className="text-2xl font-bold text-amber-400">1950</p>
              <p className="text-sm text-slate-300">Tahun Berdiri</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400">A</p>
              <p className="text-sm text-slate-300">Akreditasi BAN-SM</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400">
                <AnimatedCounter end={1026} duration={2000} />
              </p>
              <p className="text-sm text-slate-300">Siswa Aktif</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400">
                <AnimatedCounter end={75} duration={2500} suffix="%" />
              </p>
              <p className="text-sm text-slate-300">Lulusan PTN</p>
            </div>
          </div>
        </div>
      </section>

      {/* RUNNING TEXT / PENGUMUMAN SEKOLAH */}
      <div className="bg-amber-500 text-slate-900 py-3 overflow-hidden flex items-center shadow-md relative z-20 border-y border-amber-600">
        
        <div className="animate-marquee font-bold text-sm md:text-base cursor-default whitespace-nowrap">
          
          <img src="/logo.png" alt="Logo" className="h-6 w-auto inline-block align-middle ml-4 mr-2" />
          <span className="inline-block align-middle">Selamat Datang di Portal Informasi Resmi SMA Negeri 1 Tegal.</span>
          
          <img src="/logo.png" alt="Pembatas Logo" className="h-6 w-auto inline-block align-middle mx-6" />
          
          <span className="inline-block align-middle">Informasi Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2027/2028 akan segera diumumkan. Pantau terus menu Berita kami.</span>
          
          <img src="/logo.png" alt="Pembatas Logo" className="h-6 w-auto inline-block align-middle mx-6" />
          
          <span className="inline-block align-middle">Mari bersama wujudkan Generasi Pelajar Pancasila yang Unggul, Cerdas, Berintegritas, dan Berbudaya Tinggi.</span>
          <img src="/logo.png" alt="Logo" className="h-6 w-auto inline-block align-middle ml-2 mr-4" />
          
        </div>
      </div>

         {/* 2. ABOUT / SAMBUTAN SECTION */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-500 tracking-widest uppercase">Profil & Komitmen Akademik</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">Menyemai Karakter, Merajut Prestasi</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
               <div>
                 <img 
            src="/kepsek.png" 
            alt="Foto Kepala Sekolah" 
            className="w-full h-full object-cover"
          />
               </div>
               <div>
                 <h4 className="font-bold text-xl text-slate-900 dark:text-white">Dr. Budi Setiawan, M.Pd.</h4>
                 <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-3">Kepala Sekolah SMAN 1 Tegal</p>
                 <p className="text-slate-600 dark:text-slate-300 text-sm italic">"Kami berkomitmen mencetak pelajar yang tidak hanya cerdas secara akademik, namun juga memiliki akhlak mulia dan kepedulian sosial."</p>
               </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">Membangun Generasi Emas yang Cerdas & Berintegritas</h4>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Dengan kebersamaan dan rekam jejak pengabdian lebih dari 70 tahun, SMA Negeri 1 Tegal konsisten mengemban amanah sebagai institusi pendidikan berkualitas di Jawa Tengah.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Melalui implementasi Kurikulum Merdeka, kami membimbing setiap insan pelajar untuk tidak hanya unggul dalam kancah olimpiade sains, namun juga berakar tajam pada profil Pelajar Pancasila.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BERITA SECTION */}
      <section className="py-20 bg-gray-50 dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h2 className="text-sm font-bold text-amber-500 tracking-widest uppercase">Informasi Sekolah</h2>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">Berita Terbaru</h3>
            </div>
            <Link href="/berita" className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 font-medium transition shadow-sm">
              Lihat Semua Berita &rarr;
            </Link>
          </div>
          
      {/* Grid Berita Terbaru */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {dummyBerita.slice(0, 3).map((berita) => (
            <BeritaCard 
              key={berita.id}
              id={berita.id}
              judul={berita.judul}
              tanggal={berita.tanggal}
              ringkasan={berita.ringkasan}
              gambar={berita.gambar}
            />
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}