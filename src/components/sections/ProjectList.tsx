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
    <div role="status" aria-label="Projeler yükleniyor" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse h-80" aria-hidden="true" />
      ))}
      <span className="sr-only">Yükleniyor…</span>
    </div>
  );
}

function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/50">
      <span className="text-4xl" aria-hidden="true">⚠️</span>
      <p className="text-red-700 dark:text-red-400 font-medium">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="px-5 py-2.5 rounded-xl bg-red-600 dark:bg-red-500 text-white text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-colors"
      >
        Tekrar Dene
      </button>
    </div>
  );
}

function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="inline-block bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full">
      {tech}
    </span>
  );
}

/**
 * Renders individual project card using the universal Card component if preferred,
 * or as a custom layout to fit the specific needs.
 */
function CustomProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
      aria-label={`Proje: ${project.title}`}
    >
      <img src={project.image} alt={project.title} className="w-full h-44 object-cover" />
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
          {project.tech.map((t) => (
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
    <section id="projeler" aria-labelledby="projeler-baslik" className="py-12 scroll-mt-24">
      <h2 id="projeler-baslik" className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2">
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
        <p role="status" className="text-center py-16 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
          Arama kriterlerinize uygun proje bulunamadı.
        </p>
      )}

      {!loading && !error && filteredProjects.length > 0 && (
        <>
          <p role="status" aria-live="polite" className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
            {filteredProjects.length} proje gösteriliyor {isFiltered ? '(filtrelenmiş)' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <CustomProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
