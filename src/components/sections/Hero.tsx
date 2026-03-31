// src/components/sections/Hero.tsx
export default function Hero() {
  return (
    <section 
      className="py-12 sm:py-20 flex flex-col items-start gap-4" 
      aria-label="Giriş"
    >
      <p className="text-secondary dark:text-blue-400 font-semibold tracking-wide">
        Merhaba, benim adım
      </p>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Muhammed Emin.
      </h1>
      <h2 className="text-3xl sm:text-5xl font-bold text-gray-500 dark:text-gray-400">
        Dijital çözümler üretiyorum.
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mt-4 leading-relaxed">
        Modern web uygulamaları, mobil geliştirmeler ve bulut tabanlı sistemler üzerine odaklanan 
        yazılım mühendisliği öğrencisiyim. Karmaşık problemleri basit kod bloklarına dönüştürmeyi severim.
      </p>
      <div className="mt-8 flex gap-4">
        <a 
          href="#projeler" 
          className="px-6 py-3 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-secondary dark:focus:ring-offset-gray-950"
        >
          Projelerimi Gör
        </a>
        <a 
          href="#iletisim" 
          className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-offset-gray-950"
        >
          İletişime Geç
        </a>
      </div>
    </section>
  );
}
