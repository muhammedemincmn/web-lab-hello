// src/components/sections/About.tsx
export default function About() {
  return (
    <section id="hakkimda" aria-labelledby="hakkimda-baslik" className="py-20 scroll-mt-24 animate-slide-up w-full">
      <h2 
        id="hakkimda-baslik" 
        className="text-3xl sm:text-4xl font-extrabold mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400"
      >
        Kısaca Ben
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center bg-white/50 dark:bg-white/[0.02] backdrop-blur-3xl border border-gray-200/50 dark:border-white/5 p-8 sm:p-12 lg:p-16 rounded-3xl shadow-sm w-full">
        
        {/* Profile Image with Glow Effect */}
        <figure className="relative flex flex-col items-center group col-span-1 lg:col-span-4 justify-center">
          <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 w-48 h-48 lg:w-64 lg:h-64 m-auto" />
          <img
            src="https://via.placeholder.com/300"
            alt="Muhammed Emin profil fotoğrafı"
            className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-white dark:border-[#121826] shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </figure>
        
        <div className="flex flex-col gap-6 col-span-1 lg:col-span-8 text-center lg:text-left w-full">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Kod yazmaktan daha fazlası...
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-light">
            Dinamik ve yenilikçi projelere daima ilgi duyan bir geliştiriciyim. Öğrenme sürecimi 
            sürekli devam ettiriyor ve güçlü teknolojileri (<span className="text-primary font-medium">React, iOS, AWS</span>)
            projelerime entegre etmeyi amaçlıyorum. 
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-light">
            İster güçlü bir <strong className="font-medium text-gray-900 dark:text-white">REST API</strong> yazıyor olayım, 
            ister mobil/web için erişilebilir kullanıcı arayüzleri geliştiriyor olayım; 
            <span className="italic"> performans, temiz kod ve modüler tasarım </span> 
            vazgeçilmez prensiplerimdir.
          </p>
        </div>
      </div>
    </section>
  );
}

