// src/App.tsx
// LAB-5: UI = f(state) — useState, useEffect, fetch, filter/sort — No-Any

import { useState, useEffect, useCallback } from 'react';
import './App.css';
import type { Project, FilterState, Category, SortField, SortOrder } from './types/project';
import { fetchProjects } from './services/projectService';
import { applyFilters } from './utils/projectHelpers';

// ── Constants ──────────────────────────────────────────────────────────────
const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'ios', label: 'iOS' },
  { value: 'web', label: 'Web' },
  { value: 'devops', label: 'DevOps' },
  { value: 'backend', label: 'Backend' },
  { value: 'other', label: 'Diğer' },
];

const SORT_OPTIONS: { field: SortField; order: SortOrder; label: string }[] = [
  { field: 'year', order: 'desc', label: 'En Yeni' },
  { field: 'year', order: 'asc', label: 'En Eski' },
  { field: 'title', order: 'asc', label: 'A → Z' },
  { field: 'title', order: 'desc', label: 'Z → A' },
  { field: 'category', order: 'asc', label: 'Kategori' },
];

// ── Initial filter state ───────────────────────────────────────────────────
const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  selectedCategory: 'all',
  sortField: 'year',
  sortOrder: 'desc',
};

// ── Sub-components ─────────────────────────────────────────────────────────

/** Badge rendered per tech item on a project card */
function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="inline-block bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full">
      {tech}
    </span>
  );
}

/** Single project card */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
      aria-label={`Proje: ${project.title}`}
    >
      <img
        src={project.image}
        alt={`${project.title} görseli`}
        className="w-full h-44 object-cover"
      />
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
            {project.title}
          </h3>
          {project.featured && (
            <span className="shrink-0 text-xs font-medium bg-accent/10 text-accent dark:bg-accent/20 dark:text-purple-300 px-2 py-0.5 rounded-full">
              Öne Çıkan
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map(t => (
            <TechBadge key={t} tech={t} />
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="capitalize">{project.category}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </article>
  );
}

/** Loading skeleton grid */
function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Projeler yükleniyor"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse h-80"
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Yükleniyor…</span>
    </div>
  );
}

/** Error state */
function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <span className="text-5xl" aria-hidden="true">⚠️</span>
      <p className="text-gray-700 dark:text-gray-300 font-medium">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="px-5 py-2 rounded-xl bg-secondary text-white text-sm font-medium hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors"
      >
        Tekrar Dene
      </button>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
function App() {
  // ── State ────────────────────────────────────────────────────────────────
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [dark, setDark] = useState<boolean>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // ── Dark mode effect ─────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // ── Data fetching ─────────────────────────────────────────────────────────
  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // ── Derived data (filteredProjects) ───────────────────────────────────────
  const filteredProjects = applyFilters(projects, filters);

  // ── Filter handlers ───────────────────────────────────────────────────────
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleCategoryChange = (cat: Category | 'all') => {
    setFilters(prev => ({ ...prev, selectedCategory: cat }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value);
    const { field, order } = SORT_OPTIONS[idx];
    setFilters(prev => ({ ...prev, sortField: field, sortOrder: order }));
  };

  const handleReset = () => setFilters(INITIAL_FILTERS);

  // ── Computed ──────────────────────────────────────────────────────────────
  const isFiltered =
    filters.searchQuery !== INITIAL_FILTERS.searchQuery ||
    filters.selectedCategory !== INITIAL_FILTERS.selectedCategory ||
    filters.sortField !== INITIAL_FILTERS.sortField ||
    filters.sortOrder !== INITIAL_FILTERS.sortOrder;

  const sortIndex = SORT_OPTIONS.findIndex(
    o => o.field === filters.sortField && o.order === filters.sortOrder
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-xl"
      >
        Ana içeriğe atla
      </a>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Muhammed Emin</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Kişisel Portfolyo
            </p>
          </div>

          <nav aria-label="Ana navigasyon">
            <ul className="flex items-center gap-3 sm:gap-5 text-sm font-medium">
              <li>
                <a
                  href="#hakkimda"
                  className="hover:text-secondary transition-colors"
                >
                  Hakkımda
                </a>
              </li>
              <li>
                <a
                  href="#projeler"
                  className="hover:text-secondary transition-colors"
                >
                  Projeler
                </a>
              </li>
              <li>
                <a
                  href="#iletisim"
                  className="hover:text-secondary transition-colors"
                >
                  İletişim
                </a>
              </li>
              <li>
                <button
                  type="button"
                  aria-label={dark ? 'Açık temaya geç' : 'Koyu temaya geç'}
                  onClick={() => setDark(d => !d)}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-colors"
                >
                  <span aria-hidden="true">{dark ? '☀️' : '🌙'}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ── Main ── */}
      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* ── Hakkımda ── */}
        <section id="hakkimda" aria-labelledby="hakkimda-baslik">
          <h2 id="hakkimda-baslik" className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2">
            Hakkımda
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <figure className="flex flex-col items-center gap-3 shrink-0">
              <img
                src="https://via.placeholder.com/150"
                alt="Muhammed Emin vesikalık fotoğrafı"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow"
              />
              <figcaption className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Muhammed Emin
              </figcaption>
            </figure>
            <div className="flex flex-col gap-4">
              <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Yazılım mühendisliği öğrencisiyim. DevOps, bulut mimarileri (AWS)
                ve mobil uygulama geliştirme (iOS) üzerine odaklanıyorum.
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

        {/* ── Projelerim ── */}
        <section id="projeler" aria-labelledby="projeler-baslik">
          <h2 id="projeler-baslik" className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2">
            Projelerim
          </h2>

          {/* ── Filter toolbar ── */}
          <div className="flex flex-col gap-4 mb-8 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            {/* Row 1: search + sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <label className="sr-only" htmlFor="search-input">
                Proje ara
              </label>
              <input
                id="search-input"
                type="search"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                placeholder="Proje, açıklama veya teknoloji ara…"
                aria-label="Proje ara"
                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
              />

              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                  Sırala:
                </label>
                <select
                  id="sort-select"
                  value={sortIndex >= 0 ? sortIndex : 0}
                  onChange={handleSortChange}
                  aria-label="Sıralama seçin"
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
                >
                  {SORT_OPTIONS.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: category filters */}
            <div
              role="group"
              aria-label="Kategori filtresi"
              className="flex flex-wrap gap-2"
            >
              {CATEGORIES.map(cat => {
                const isActive = filters.selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryChange(cat.value)}
                    aria-pressed={isActive}
                    className={[
                      'px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150',
                      'focus:outline-none focus:ring-2 focus:ring-secondary/40',
                      isActive
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                    ].join(' ')}
                  >
                    {cat.label}
                  </button>
                );
              })}

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Filtreleri sıfırla"
                  className="ml-auto px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/40"
                >
                  ✕ Sıfırla
                </button>
              )}
            </div>
          </div>

          {/* ── Results ── */}
          {loading && <LoadingSkeleton />}

          {!loading && error && (
            <ErrorCard message={error} onRetry={loadProjects} />
          )}

          {!loading && !error && filteredProjects.length === 0 && (
            <p
              role="status"
              className="text-center py-16 text-gray-500 dark:text-gray-400"
            >
              Arama kriterlerinize uygun proje bulunamadı.
            </p>
          )}

          {!loading && !error && filteredProjects.length > 0 && (
            <>
              <p
                role="status"
                aria-live="polite"
                className="text-sm text-gray-500 dark:text-gray-400 mb-4"
              >
                {filteredProjects.length} proje gösteriliyor
                {isFiltered ? ' (filtrelenmiş)' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* ── İletişim ── */}
        <section id="iletisim" aria-labelledby="iletisim-baslik">
          <h2 id="iletisim-baslik" className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2">
            İletişim
          </h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10 max-w-xl">
            <form action="#" method="POST" noValidate aria-label="İletişim Formu">
              <fieldset className="border-none p-0 space-y-5">
                <legend className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                  Mesaj Gönder
                </legend>

                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm font-medium">Ad Soyad</label>
                  <input
                    id="name" name="name" type="text" required minLength={2}
                    placeholder="Adınız Soyadınız"
                    aria-required="true"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-medium">E-posta</label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="ornek@eposta.com"
                    aria-required="true"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-sm font-medium">Mesajınız</label>
                  <textarea
                    id="message" name="message" rows={4} required minLength={10}
                    placeholder="Mesajınızı buraya yazınız…"
                    aria-required="true"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-secondary text-white text-sm font-medium hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors"
                >
                  Gönder
                </button>
              </fieldset>
            </form>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-500">
        <p>© 2026 Muhammed Emin. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

export default App;