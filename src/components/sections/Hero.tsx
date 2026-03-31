// src/components/sections/Hero.tsx
export default function Hero() {
  return (
    <section 
      className="py-16 sm:py-28 flex flex-col items-center sm:items-start gap-5 text-center sm:text-left animate-fade-in relative" 
      aria-label="Giriş"
    >
      {/* Decorative background glow for dark mode */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50 dark:opacity-100 animate-pulse-slow pointer-events-none" />

      <p className="text-primary dark:text-secondary font-semibold tracking-widest uppercase text-sm mb-2">
        MERHABA, BEN
      </p>
      
      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
        Muhammed Emin.
      </h1>
      
      <h2 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent py-2 leading-[1.1]">
        Dijital çözümler üretiyorum.
      </h2>
      
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mt-4 leading-relaxed font-light">
        Modern web uygulamaları, mobil geliştirmeler ve bulut tabanlı sistemler üzerine odaklanan 
        bir yazılım mühendisi adayıyım. Karmaşık problemleri basit, güzel arayüzlere ve temiz 
        kod bloklarına dönüştürmeyi severim.
      </p>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <a 
          href="#projeler" 
          className="px-8 py-3.5 rounded-full bg-primary text-white font-medium hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-[#070B14] text-center"
        >
          Projelerimi Gör
        </a>
        <a 
          href="#iletisim" 
          className="px-8 py-3.5 rounded-full bg-white/50 dark:bg-white/5 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 transition-all hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-offset-[#070B14] text-center"
        >
          İletişime Geç
        </a>
      </div>
    </section>
  );
}
