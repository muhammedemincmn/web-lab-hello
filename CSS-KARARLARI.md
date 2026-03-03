# CSS Kararları

## 1. Breakpoint Seçimi

Projede üç breakpoint belirledik: **0–639px (Mobil)**, **640px (Tablet)** ve **1024px (Masaüstü)**.
Bu değerler, Tailwind CSS ve modern CSS kılavuzlarından esinlenen yaygın endüstri standartlarına dayanmaktadır.
640px tablet eşiği, dokunmatik cihazların tipik yatay genişliğini kapsamakta olup 1024px masaüstü eşiği ise içeriği rahatça iki–üç sütuna yayabileceğimiz noktayı temsil eder.

## 2. Layout Tercihleri (Flex vs Grid)

**Flexbox**, doğrusal (tek eksenli) dizilimler için tercih edildi: `<header>` satırı, `<nav>` linkleri ve beceri etiketleri (skill tags).
**CSS Grid**, iki boyutlu ızgara düzeni gerektiren alanlarda kullanıldı: "Hakkımda" bölümü (fotoğraf + metin alanı) ve "Projelerim" kartları (`repeat(auto-fit, minmax(280px, 1fr))`).
Bu ayrım, her layout primitifini en güçlü olduğu senaryoda kullanmayı amaçlar.

## 3. Design Tokens

`src/styles/tokens.css` dosyasında CSS özel değişkenleri (custom properties) ile renk paleti, 8-noktalı boşluk skalası, border-radius ve `clamp()` tabanlı akışkan tipografi tanımlandı.
Tüm bileşenler `var(--color-primary)` gibi token referansları üzerinden stil alır; böylece tasarım değişiklikleri tek noktadan uygulanabilir.
Koyu mod desteği `@media (prefers-color-scheme: dark)` bloğu ile token düzeyinde yönetilmekte, bileşen koduna koyu mod mantığı karışmamaktadır.

## 4. Mobile-First Responsive Strateji

Tüm temel stiller herhangi bir medya sorgusu olmaksızın yazıldı; bu stiller 0–639px aralığı için geçerlidir.
Daha büyük ekranlar için yalnızca ek veya genişletici stiller `@media (min-width: …)` kurallarıyla eklendi.
Bu yaklaşım tarayıcının ayrıştırma yükünü azaltır ve mobil önce tasarım felsefesini doğrudan kod yapısına yansıtır.
