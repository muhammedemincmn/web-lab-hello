// src/components/forms/ProjectFilter.tsx
import type { Category, SortField, SortOrder, FilterState } from '../../types/project';

interface ProjectFilterProps {
  filters: FilterState;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (cat: Category | 'all') => void;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
  isFiltered: boolean;
  categories: { value: Category | 'all'; label: string }[];
  sortOptions: { field: SortField; order: SortOrder; label: string }[];
  sortIndex: number;
}

export default function ProjectFilter({
  filters,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onReset,
  isFiltered,
  categories,
  sortOptions,
  sortIndex,
}: Readonly<ProjectFilterProps>) {
  return (
    <div className="flex flex-col gap-5 mb-12 p-3 sm:p-5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] border border-gray-200/50 dark:border-white/5 shadow-sm">
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <label className="sr-only" htmlFor="search-input">
          Proje ara
        </label>
        <div className="relative flex-1">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input
            id="search-input"
            type="search"
            value={filters.searchQuery}
            onChange={onSearchChange}
            placeholder="Proje, açıklama veya teknoloji ara…"
            aria-label="Proje ara"
            className="w-full rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-black/20 pl-11 pr-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all shadow-inner dark:shadow-none"
            />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <select
            id="sort-select"
            value={sortIndex >= 0 ? sortIndex : 0}
            onChange={onSortChange}
            aria-label="Sıralama seçin"
            className="w-full sm:w-auto rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-black/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all cursor-pointer font-medium text-gray-700 dark:text-gray-300 appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
          >
            {sortOptions.map((opt, idx) => (
              <option key={idx} value={idx}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories (Segmented Control Style) */}
      <div role="group" aria-label="Kategori filtresi" className="flex flex-wrap items-center gap-2 p-1.5 bg-gray-100/50 dark:bg-black/20 rounded-[1.5rem] border border-gray-200/50 dark:border-white/5 inline-flex w-full sm:w-max">
        {categories.map((cat) => {
          const isActive = filters.selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onCategoryChange(cat.value)}
              aria-pressed={isActive}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none ${
                isActive
                  ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-white/5'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            aria-label="Filtreleri sıfırla"
            className="ml-auto sm:ml-2 px-4 py-2 rounded-full text-sm font-medium text-error hover:bg-error/10 transition-colors focus:outline-none focus:ring-2 focus:ring-error/20 flex items-center gap-1"
          >
            <span aria-hidden="true">✕</span> Sıfırla
          </button>
        )}
      </div>
    </div>
  );
}
