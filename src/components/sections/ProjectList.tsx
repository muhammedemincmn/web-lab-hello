// src/components/sections/ProjectList.tsx
import { useState, useMemo } from 'react';
import type { Project, FilterState, Category, SortField, SortOrder } from '../../types/project';
import { applyFilters } from '../../utils/projectHelpers';
import ProjectFilter from '../forms/ProjectFilter';

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

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

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  selectedCategory: 'all',
  sortField: 'year',
  sortOrder: 'desc',
};

// ── Sub-components that belong only here ─────────────────────────
function LoadingSkeleton() {
  return (
    <div role="status" aria-label="Projeler yükleniyor" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="rounded-3xl bg-gray-200/50 dark:bg-white/5 animate-pulse h-96" aria-hidden="true" />
      ))}
      <span className="sr-only">Yükleniyor…</span>
    </div>
  );
}

function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center bg-error/10 dark:bg-error/5 rounded-3xl border border-error/20 dark:border-error/10">
      <span className="text-4xl" aria-hidden="true">⚠️</span>
      <p className="text-error dark:text-red-400 font-medium">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="px-6 py-3 rounded-full bg-error text-white text-sm font-semibold hover:bg-error/90 focus:outline-none focus:ring-2 focus:ring-error/50 transition-colors shadow-lg shadow-error/20"
      >
        Tekrar Dene
      </button>
    </div>
  );
}

function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="inline-block bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
      {tech}
    </span>
  );
}

function CustomProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group flex flex-col bg-white/70 dark:bg-[#121826]/70 backdrop-blur-3xl border border-gray-200/50 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
      aria-label={`Proje: ${project.title}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col gap-4 p-6 sm:p-8 flex-1 relative">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          {project.featured && (
            <span className="shrink-0 text-xs font-bold bg-accent/10 text-accent dark:bg-accent/20 dark:text-purple-300 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              Öne Çıkan
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 font-light">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <TechBadge key={t} tech={t} />
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 pt-5 mt-2 border-t border-gray-100 dark:border-white/5 font-medium tracking-wide">
          <span className="uppercase">{project.category}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </article>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────
export default function ProjectList({ projects, loading, error, onRetry }: Readonly<ProjectListProps>) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // LAB-6: Performans (useMemo) optimizasyonu - Sadece projects veya filters değiştiğinde çalışır
  const filteredProjects = useMemo(() => {
    return applyFilters(projects, filters);
  }, [projects, filters]);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleCategoryChange = (cat: Category | 'all') => {
    setFilters((prev) => ({ ...prev, selectedCategory: cat }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value);
    const { field, order } = SORT_OPTIONS[idx];
    setFilters((prev) => ({ ...prev, sortField: field, sortOrder: order }));
  };

  const handleReset = () => setFilters(INITIAL_FILTERS);

  // Computed
  const isFiltered =
    filters.searchQuery !== INITIAL_FILTERS.searchQuery ||
    filters.selectedCategory !== INITIAL_FILTERS.selectedCategory ||
    filters.sortField !== INITIAL_FILTERS.sortField ||
    filters.sortOrder !== INITIAL_FILTERS.sortOrder;

  const sortIndex = SORT_OPTIONS.findIndex(
    (o) => o.field === filters.sortField && o.order === filters.sortOrder
  );

  return (
    <section id="projeler" aria-labelledby="projeler-baslik" className="py-20 scroll-mt-24 animate-slide-up">
      <h2 
        id="projeler-baslik" 
        className="text-3xl sm:text-4xl font-extrabold mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400"
      >
        Projelerim
      </h2>

      <ProjectFilter
        filters={filters}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onReset={handleReset}
        isFiltered={isFiltered}
        categories={CATEGORIES}
        sortOptions={SORT_OPTIONS}
        sortIndex={sortIndex >= 0 ? sortIndex : 0}
      />

      {loading && <LoadingSkeleton />}

      {!loading && error && <ErrorCard message={error} onRetry={onRetry} />}

      {!loading && !error && filteredProjects.length === 0 && (
        <p role="status" className="text-center py-20 text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/5 rounded-3xl backdrop-blur-xl">
          Arama kriterlerinize uygun proje bulunamadı. Lütfen filtreleri temizleyip tekrar deneyin.
        </p>
      )}

      {!loading && !error && filteredProjects.length > 0 && (
        <>
          <p role="status" aria-live="polite" className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium pl-2">
            {filteredProjects.length} proje gösteriliyor {isFiltered ? '(filtrelenmiş)' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <CustomProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
