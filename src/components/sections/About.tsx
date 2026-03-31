// src/components/sections/About.tsx
export default function About() {
  return (
    <section id="hakkimda" aria-labelledby="hakkimda-baslik" className="py-12 scroll-mt-24">
      <h2 
        id="hakkimda-baslik" 
        className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2"
      >
        Hakkımda
      </h2>
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <figure className="flex flex-col items-center gap-3 shrink-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Muhammed Emin profil fotoğrafı"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow"
          />
          <figcaption className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Muhammed Emin
          </figcaption>
        </figure>
        <div className="flex flex-col gap-4 max-w-2xl">
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Dinamik ve yenilikçi projelere daima ilgi duyan bir geliştiriciyim. Öğrenme sürecimi sürekli devam ettiriyor ve en son teknolojileri projelerime entegre etmeyi amaçlıyorum. 
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            İster güçlü bir REST API yazıyor olayım, ister erişilebilir kullanıcı arayüzleri geliştiriyor olayım; performans, temiz kod ve modüler tasarım vazgeçilmez prensiplerimdir.
          </p>
        </div>
      </div>
    </section>
  );
}
