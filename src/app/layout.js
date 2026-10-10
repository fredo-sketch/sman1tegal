import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from '../components/Footer';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'SMANSA Tegal | Portal Resmi',
  description: 'Website Resmi SMA Negeri 1 Tegal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-slate-900 transition-colors duration-300 flex flex-col min-h-screen`}>
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          <Suspense fallback={<nav className="h-16 bg-white shadow-md"></nav>}>
            <Navbar />
          </Suspense>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />

        </ThemeProvider>

      </body>
    </html>
  );
}