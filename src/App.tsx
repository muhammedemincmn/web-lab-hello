import './App.css';

function App() {
  return (
    <>
      {/* Klavye kullanıcıları için menüyü atlama linki */}
      <a href="#main-content" className="skip-link">Ana içeriğe atla</a>

      <header>
        <h1>Muhammed Emin - Kişisel Portfolyo</h1>
        <nav aria-label="Ana navigasyon">
          <ul>
            <li><a href="#hakkimda">Hakkımda</a></li>
            <li><a href="#projeler">Projeler</a></li>
            <li><a href="#iletisim">İletişim</a></li>
          </ul>
        </nav>
      </header>

      <main id="main-content">
        <section id="hakkimda">
          <h2>Hakkımda</h2>
          <figure>
            {/* Gerçek bir fotoğrafın varsa public klasörüne koyup yolunu verebilirsin */}
            <img src="https://via.placeholder.com/150" alt="Muhammed Emin vesikalık fotoğrafı" />
            <figcaption>Muhammed Emin</figcaption>
          </figure>
          <p>Yazılım mühendisliği öğrencisiyim. DevOps, bulut mimarileri (AWS) ve mobil uygulama geliştirme (iOS) üzerine odaklanıyorum.</p>
          <ul>
            <li>React & TypeScript</li>
            <li>iOS Development</li>
            <li>AWS (Cloud)</li>
          </ul>
        </section>

        <section id="projeler">
          <h2>Projelerim</h2>
        </section>

        <section id="iletisim">
          <h2>İletişim</h2>
          <form action="#" method="POST" noValidate>
            <fieldset>
              <legend>İletişim Formu</legend>

              <div className="form-group">
                <label htmlFor="name">Ad Soyad: </label>
                <input type="text" id="name" name="name" required minLength={2} aria-describedby="name-error" />
                <small id="name-error" className="error-msg" role="alert"></small>
              </div>

              <div className="form-group">
                <label htmlFor="email">E-posta: </label>
                <input type="email" id="email" name="email" required aria-describedby="email-error" />
                <small id="email-error" className="error-msg" role="alert"></small>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Konu: </label>
                <select id="subject" name="subject" required aria-describedby="subject-error">
                  <option value="">-- Seçiniz --</option>
                  <option value="is">İş Teklifi</option>
                  <option value="soru">Soru</option>
                  <option value="oneri">Öneri</option>
                </select>
                <small id="subject-error" className="error-msg" role="alert"></small>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mesajınız:</label>
                <textarea id="message" name="message" rows={5} required minLength={10} aria-describedby="message-error"></textarea>
                <small id="message-error" className="error-msg" role="alert"></small>
              </div>

              <button type="submit">Gönder</button>
            </fieldset>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Muhammed Emin. Tüm hakları saklıdır.</p>
      </footer>
    </>
  )
}

export default App;