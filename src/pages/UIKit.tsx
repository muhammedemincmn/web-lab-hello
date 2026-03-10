import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Alert from '../components/Alert';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-14" aria-labelledby={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}>
        <h2
            id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-xl font-semibold mb-6 pb-2 border-b-2 border-secondary inline-block"
        >
            {title}
        </h2>
        <div>{children}</div>
    </section>
);

export default function UIKit() {
    const [dark, setDark] = useState(() =>
        document.documentElement.classList.contains('dark')
    );
    const [inputError, setInputError] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a
                            href="/"
                            className="text-sm text-muted dark:text-gray-400 hover:text-secondary transition-colors"
                            aria-label="Portfolyoya dön"
                        >
                            ← Portfolyo
                        </a>
                        <h1 className="text-xl font-bold tracking-tight">UI Kit</h1>
                    </div>
                    <button
                        type="button"
                        aria-label={dark ? 'Açık temaya geç' : 'Koyu temaya geç'}
                        onClick={() => setDark(d => !d)}
                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors"
                    >
                        <span aria-hidden="true">{dark ? '☀️' : '🌙'}</span>
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                <p className="text-muted dark:text-gray-400 mb-12 text-base">
                    LAB-4 kapsamında geliştirilen tüm bileşenlerin tüm varyantları aşağıda sergilenmektedir.
                </p>

                {/* ---- BUTTON ---- */}
                <Section title="Button — 4 Varyant × 3 Boyut">
                    {/* Variants */}
                    <div className="mb-6">
                        <p className="text-sm text-muted dark:text-gray-400 mb-3 font-medium">Varyantlar (md boyut)</p>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="primary" size="md" label="Primary buton">Primary</Button>
                            <Button variant="secondary" size="md" label="Secondary buton">Secondary</Button>
                            <Button variant="danger" size="md" label="Danger buton">Danger</Button>
                            <Button variant="ghost" size="md" label="Ghost buton">Ghost</Button>
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="mb-6">
                        <p className="text-sm text-muted dark:text-gray-400 mb-3 font-medium">Boyutlar (primary varyant)</p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button variant="primary" size="sm" label="Küçük buton">Small</Button>
                            <Button variant="primary" size="md" label="Orta buton">Medium</Button>
                            <Button variant="primary" size="lg" label="Büyük buton">Large</Button>
                        </div>
                    </div>

                    {/* Disabled */}
                    <div>
                        <p className="text-sm text-muted dark:text-gray-400 mb-3 font-medium">Devre dışı durumu</p>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="primary" size="md" disabled aria-label="Devre dışı buton">Disabled</Button>
                            <Button variant="danger" size="md" disabled aria-label="Devre dışı tehlike butonu">Disabled Danger</Button>
                        </div>
                    </div>
                </Section>

                {/* ---- INPUT ---- */}
                <Section title="Input — Label, Help Text & Error State">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                        {/* Normal */}
                        <Input
                            id="demo-normal"
                            label="Normal Input"
                            type="text"
                            placeholder="Bir şeyler yazın..."
                            helpText="Bu alan hakkında kısa bir açıklama."
                        />

                        {/* With error */}
                        <Input
                            id="demo-error"
                            label="Hatalı Input"
                            type="email"
                            placeholder="eposta@ornek.com"
                            error="Geçerli bir e-posta adresi giriniz."
                        />

                        {/* Controlled with validation */}
                        <div className="sm:col-span-2 max-w-sm">
                            <Input
                                id="demo-live"
                                label="Canlı Doğrulama"
                                type="text"
                                value={inputValue}
                                onChange={e => {
                                    setInputValue(e.target.value);
                                    setInputError(e.target.value.length < 3 && e.target.value.length > 0
                                        ? 'En az 3 karakter giriniz.'
                                        : '');
                                }}
                                placeholder="Yazmaya başlayın..."
                                helpText="En az 3 karakter gerekli."
                                error={inputError}
                            />
                        </div>
                    </div>
                </Section>

                {/* ---- CARD ---- */}
                <Section title="Card — 3 Varyant">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card
                            variant="elevated"
                            title="Elevated Kart"
                            imageSrc="https://via.placeholder.com/400x180"
                            imageAlt="Örnek görsel"
                            footer={<Button size="sm" variant="primary" label="Devamını oku">Devamını oku</Button>}
                        >
                            Gölgeli yüksek kontrast kart. Üzerine gelindiğinde gölge artar.
                        </Card>

                        <Card
                            variant="outlined"
                            title="Outlined Kart"
                            imageSrc="https://via.placeholder.com/400x180"
                            imageAlt="Örnek görsel"
                            footer={<Button size="sm" variant="ghost" label="Detaylar">Detaylar →</Button>}
                        >
                            Kenarlık çizgili, sade yüzey kartı. Listeleme UI'ları için idealdir.
                        </Card>

                        <Card
                            variant="filled"
                            title="Filled Kart"
                            footer={<Button size="sm" variant="secondary" label="İncele">İncele</Button>}
                        >
                            Dolu arka plan yüzeylli kart. Bilgi kutuları veya istatistik widgetları için uygundur.
                        </Card>
                    </div>
                </Section>

                {/* ---- ALERT ---- */}
                <Section title="Alert — 4 Varyant + Kapatılabilir">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <Alert variant="info" title="Bilgi">
                            Bu bir bilgi mesajıdır. Kullanıcıya genel bir not iletmek için kullanılır.
                        </Alert>
                        <Alert variant="success" title="Başarılı!">
                            İşleminiz başarıyla tamamlandı. Verileriniz kaydedildi.
                        </Alert>
                        <Alert variant="warning" title="Uyarı">
                            Bu işlem geri alınamaz. Lütfen devam etmeden önce emin olun.
                        </Alert>
                        <Alert variant="error" title="Hata">
                            Bir hata oluştu. Lütfen sayfayı yenileyip tekrar deneyin.
                        </Alert>
                        <Alert variant="info" title="Kapatılabilir Alert" dismissible>
                            Bu alert'in sağındaki × butonuna basarak kapatabilirsiniz.
                        </Alert>
                        <Alert variant="success" title="Kapatılabilir Başarı" dismissible>
                            Teklif gönderildi! Bu bildirimi kapatabilirsiniz.
                        </Alert>
                    </div>
                </Section>

                {/* ---- Design Tokens ---- */}
                <Section title="Design Tokens — Renk Paleti">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                        {[
                            { label: 'primary', cls: 'bg-primary' },
                            { label: 'secondary', cls: 'bg-secondary' },
                            { label: 'accent', cls: 'bg-accent' },
                            { label: 'surface', cls: 'bg-surface border border-gray-200' },
                            { label: 'muted', cls: 'bg-muted' },
                            { label: 'error', cls: 'bg-error' },
                            { label: 'success', cls: 'bg-success' },
                        ].map(({ label, cls }) => (
                            <div key={label} className="flex flex-col items-center gap-2">
                                <div className={`w-full h-14 rounded-xl ${cls}`} aria-label={`${label} rengi`} />
                                <span className="text-xs font-medium text-muted dark:text-gray-400">{label}</span>
                            </div>
                        ))}
                    </div>
                </Section>
            </main>

            <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-muted dark:text-gray-500">
                <p>LAB-4 UI Kit — Muhammed Emin · Tailwind CSS v4</p>
            </footer>
        </div>
    );
}
