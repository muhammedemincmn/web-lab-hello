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
    <div className="flex flex-col gap-4 mb-8 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <label className="sr-only" htmlFor="search-input">
          Proje ara
        </label>
        <input
          id="search-input"
          type="search"
          value={filters.searchQuery}
          onChange={onSearchChange}
          placeholder="Proje, açıklama veya teknoloji ara…"
          aria-label="Proje ara"
          className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
        />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
            Sırala:
          </label>
          <select
            id="sort-select"
            value={sortIndex >= 0 ? sortIndex : 0}
            onChange={onSortChange}
            aria-label="Sıralama seçin"
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
          >
            {sortOptions.map((opt, idx) => (
              <option key={idx} value={idx}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories */}
      <div role="group" aria-label="Kategori filtresi" className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = filters.selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onCategoryChange(cat.value)}
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
            onClick={onReset}
            aria-label="Filtreleri sıfırla"
            className="ml-auto px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/40"
          >
            ✕ Sıfırla
          </button>
        )}
      </div>
    </div>
  );
}
