"use client"; 
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hanya hitung status "aktif" setelah mounted di client,
  // supaya HTML server & client selalu sama saat hydration (hindari hydration error).
  const isActive = (path) => mounted && pathname === path;

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Bagian Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo SMAN 1 Tegal" className="h-10 w-auto" />
            <span className="font-bold text-slate-800 dark:text-white text-lg md:text-xl">SMAN 1 Tegal</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium px-1 py-5 transition-colors ${isActive('/') ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400'}`}>
              Home
            </Link>
            <Link href="/about" className={`font-medium px-1 py-5 transition-colors ${isActive('/about') ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400'}`}>
              About
            </Link>
            <Link href="/berita" className={`font-medium px-1 py-5 transition-colors ${isActive('/berita') ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400'}`}>
              Berita
            </Link>
            {/* Tambahan Menu Guru dan Ekskul */}
            <Link href="/guru" className={`font-medium px-1 py-5 transition-colors ${isActive('/guru') ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400'}`}>
              Guru
            </Link>
            <Link href="/ekstrakurikuler" className={`font-medium px-1 py-5 transition-colors ${isActive('/ekstrakurikuler') ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400'}`}>
              Ekstrakurikuler
            </Link>
          </div>

          {/* Area Tombol Kanan */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Tombol Dark Mode */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-slate-800 dark:text-amber-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            )}

            {/* Tombol Hamburger untuk Mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-amber-500 focus:outline-none p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2 shadow-lg absolute w-full left-0 transition-colors">
          <Link href="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${isActive('/') ? 'bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-amber-500'}`}>
            Home
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${isActive('/about') ? 'bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-amber-500'}`}>
            About
          </Link>
          <Link href="/berita" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${isActive('/berita') ? 'bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-amber-500'}`}>
            Berita
          </Link>
          {/* Tambahan Menu Guru dan Ekskul untuk Mobile */}
          <Link href="/guru" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${isActive('/guru') ? 'bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-amber-500'}`}>
            Guru
          </Link>
          <Link href="/ekstrakurikuler" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${isActive('/ekstrakurikuler') ? 'bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-amber-500'}`}>
            Ekstrakurikuler
          </Link>
        </div>
      )}
    </nav>
  );
}