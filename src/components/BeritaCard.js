import Link from 'next/link';

export default function BeritaCard({ id, judul, tanggal, ringkasan, gambar }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-lg transition">
      
      <div className="h-48 bg-gray-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
        <img 
          src={gambar} 
          alt={judul} 
          className="w-full h-full object-contain p-2" 
        />
        
        {/* Label Tanggal */}
        <div className="absolute bottom-0 left-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 shadow-sm">
          {tanggal}
        </div>
      </div>
      
      {/* Bagian Teks */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">{judul}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{ringkasan}</p>
        <Link href={`/berita/${id}`} className="text-amber-600 font-semibold text-sm hover:text-amber-700 flex items-center">
          Baca Selengkapnya &rarr;
        </Link>
      </div>
      
    </div>
  );
}