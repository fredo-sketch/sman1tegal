export default function About() {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header Halaman dengan Latar Gambar */}
      <div className="relative bg-slate-900 py-20 text-center text-white border-b-4 border-amber-500 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-bg.png"
            alt="Latar SMAN 1 Tegal" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/90"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight animate-fade-in-up">
            Tentang SMAN 1 Tegal
          </h1>
          <p className="text-amber-500 font-semibold text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up drop-shadow-sm">
            Mengenal Lebih Dekat Profil, Sejarah, dan Visi Misi Kami
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Bagian Profil & Sejarah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 border-b-2 border-amber-500 pb-2 inline-block">
              Profil Sekolah
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              Selama lebih dari enam dekade, SMA Negeri 1 Tegal secara konsisten menjadi kawah candradimuka bagi generasi muda yang cerdas secara intelektual dan luhur dalam moral. Berpegang teguh pada motto 'Unggul dalam Prestasi, Berkarakter, dan Berbudaya', kami mendedikasikan diri untuk mencetak lulusan berkualitas yang siap menghadapi tantangan kompetisi global, tanpa pernah melupakan akar budaya dan nilai-nilai luhur bangsa.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 border-b-2 border-amber-500 pb-2 inline-block">
              Sejarah Singkat
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              SMA Negeri 1 Tegal didirikan sekitar tahun 1950. Pada saat itu, Masyarakat Kota Tegal tidak memiliki satupun gedung Sekolah Lanjutan Tingkat Atas (SLTA) /SMA. Selain itu, gedung sekolah di Kota Tegal sangatlah sedikit dan tidak mudah diakses. Oleh karena itu masyarakat mulai berinisiatif untuk mendirikan SMA di Kota Tegal. Usaha tersebut membuahkan hasil ketika SK Depdikbud No.26/SK/8.III turun pada tanggal 21 Agustus 1958.[1] Pencapaian ini disusul dengan pengangkatan Bapak Nyoewono Tjokrosoebroto sebagai direktur pertama. SMA N 1 Tegal sendiri diresmikan oleh Bapak Sewojo pada tanggal 3 November 1958 selaku inspeksi SMA di Kementerian Pendidikan dan Kebudayaan. Pada tahun 2007, sekolah ini menggunakan Kurikulum Tingkat Satuan Pendidikan sebelumnya dengan KBK.
            </p>
          </div>
        </div>

        {/* Bagian Visi & Misi */}
        <div className="bg-slate-50 dark:bg-slate-800 p-8 md:p-12 rounded-2xl mb-16 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Visi & Misi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Visi Kami</h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium italic">
                "Terbentuknya generasi muda yang bertaqwa, sehat, cerdas, berkepribadian Indonesia, dan berwawasan global."
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Misi Kami</h3>
              <ul className="text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>Mengamalkan nilai-nilai moral agama dan keyakinan masing-masing;</li>
                <li>Melaksanakan tata tertib sekolah;</li>
                <li>Mengoptimalkan potensi kecerdasan akademik dan non akademik peserta didik berdasarkan pada nilai-nilai luhur bangsa Indonesia;</li>
                <li>Meningkatkan daya saing peserta didik dalam bidang ilmu pengetahuan dan teknologi bertaraf nasional dan internasional;</li>
                <li>Mewujudkan lingkungan dan budaya sekolah yang berintegritas, bersih, sehat, indah, aman, ramah dan menyenangkan;</li>
                <li>Meningkatkan sarana dan prasarana pembelajaran yang memadai dan bertaraf internasional;</li>
                <li>Meningkatkan profesionalitas tenaga pendidik dan kependidikan.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bagian Alamat */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 border-b-2 border-amber-500 pb-2 inline-block">
            Lokasi Kami
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-4">
            SMA Negeri 1 Tegal berlokasi di tempat yang strategis dan mudah dijangkau di pusat kota.
          </p>
          <div className="inline-block bg-slate-900 text-white px-6 py-4 rounded-lg shadow-md text-left">
            <p className="font-bold text-amber-400 mb-1">SMA Negeri 1 Tegal</p>
            <p className="text-sm">Jl. Menteri Supeno No.16, Slerok</p>
            <p className="text-sm">Kec. Tegal Timur, Kota Tegal</p>
            <p className="text-sm mb-2">Jawa Tengah 52125, Indonesia</p>
            <p className="text-sm text-slate-400">Telp: (0283) 353498</p>
          </div>
        </div>

      </div>
    </div>
  );
}