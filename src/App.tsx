import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import Card from './components/Card';

function App() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-br-lg"
      >
        Ana içeriğe atla
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Muhammed Emin
          </h1>

          <nav aria-label="Ana navigasyon" className="flex items-center gap-4 sm:gap-6">
            <ul className="flex gap-4 sm:gap-6 text-sm sm:text-base font-medium">
              <li><a href="#hakkimda" className="hover:text-secondary dark:hover:text-secondary transition-colors">Hakkımda</a></li>
              <li><a href="#projeler" className="hover:text-secondary dark:hover:text-secondary transition-colors">Projeler</a></li>
              <li><a href="#iletisim" className="hover:text-secondary dark:hover:text-secondary transition-colors">İletişim</a></li>
              <li>
                <a href="/ui-kit" className="hover:text-accent dark:hover:text-accent transition-colors text-accent font-semibold">
                  UI Kit
                </a>
              </li>
            </ul>

            {/* Dark mode toggle */}
            <button
              type="button"
              aria-label={dark ? 'Açık temaya geç' : 'Koyu temaya geç'}
              onClick={() => setDark(d => !d)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors"
            >
              <span aria-hidden="true">{dark ? '☀️' : '🌙'}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* Hakkımda */}
        <section id="hakkimda" aria-labelledby="hakkimda-baslik">
          <h2 id="hakkimda-baslik" className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2">
            Hakkımda
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <figure className="flex flex-col items-center gap-3 shrink-0">
              <img
                src="https://via.placeholder.com/150"
                alt="Muhammed Emin vesikalık fotoğrafı"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-md"
              />
              <figcaption className="text-sm text-muted dark:text-gray-400 font-medium">
                Muhammed Emin
              </figcaption>
            </figure>
            <div className="flex flex-col gap-4">
              <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Yazılım mühendisliği öğrencisiyim. DevOps, bulut mimarileri (AWS) ve mobil uygulama geliştirme (iOS) üzerine odaklanıyorum.
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Yetenekler">
                {['React & TypeScript', 'iOS Development', 'AWS (Cloud)', 'DevOps'].map(skill => (
                  <li
                    key={skill}
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projelerim */}
        <section id="projeler" aria-labelledby="projeler-baslik">
          <h2 id="projeler-baslik" className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2">
            Projelerim
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              variant="elevated"
              title="iOS Akıllı Şehir Uygulaması"
              imageSrc="https://via.placeholder.com/400x200"
              imageAlt="iOS uygulaması ekran görüntüsü"
              footer={
                <Button size="sm" variant="ghost" label="Projeyi görüntüle">
                  Detaylar →
                </Button>
              }
            >
              SwiftUI ile geliştirilmiş, Elazığ için akıllı şehir mobil uygulaması.
            </Card>

            <Card
              variant="elevated"
              title="Portfolyo Web Sitesi"
              imageSrc="https://via.placeholder.com/400x200"
              imageAlt="Web sitesi ekran görüntüsü"
              footer={
                <Button size="sm" variant="ghost" label="Projeyi görüntüle">
                  Detaylar →
                </Button>
              }
            >
              React + TypeScript + Tailwind CSS v4 ile oluşturulmuş kişisel portfolyo.
            </Card>

            <Card
              variant="elevated"
              title="AWS DevOps Pipeline"
              imageSrc="https://via.placeholder.com/400x200"
              imageAlt="AWS altyapı şeması"
              footer={
                <Button size="sm" variant="ghost" label="Projeyi görüntüle">
                  Detaylar →
                </Button>
              }
            >
              AWS CodePipeline kullanarak otomatik build, test ve deploy altyapısı.
            </Card>
          </div>
        </section>

        {/* İletişim */}
        <section id="iletisim" aria-labelledby="iletisim-baslik">
          <h2 id="iletisim-baslik" className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2">
            İletişim
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10 max-w-xl">
            <form action="#" method="POST" noValidate aria-label="İletişim Formu">
              <fieldset className="border-none p-0 space-y-5">
                <legend className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                  İletişim Formu
                </legend>

                <Input
                  id="name"
                  label="Ad Soyad"
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  helpText="En az 2 karakter giriniz."
                  placeholder="Adınız Soyadınız"
                />

                <Input
                  id="email"
                  label="E-posta"
                  type="email"
                  name="email"
                  required
                  helpText="Geçerli bir e-posta adresi giriniz."
                  placeholder="ornek@eposta.com"
                />

                <div className="flex flex-col gap-1">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Konu
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
                  >
                    <option value="">-- Seçiniz --</option>
                    <option value="is">İş Teklifi</option>
                    <option value="soru">Soru</option>
                    <option value="oneri">Öneri</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    aria-describedby="message-help"
                    placeholder="Mesajınızı buraya yazınız..."
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-base resize-y focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
                  />
                  <p id="message-help" className="text-xs text-muted dark:text-gray-400">
                    En az 10 karakter.
                  </p>
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                  Gönder
                </Button>
              </fieldset>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-muted dark:text-gray-500">
        <p>© 2026 Muhammed Emin. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

export default App;