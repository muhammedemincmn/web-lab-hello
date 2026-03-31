// src/utils/projectHelpers.ts
// LAB-5: Filter & sort helpers — no-any, localeCompare, typed inputs/outputs

import type { Project, FilterState } from '../types/project';

/** Search: matches title, description or any tech item (case-insensitive) */
function matchesSearch(project: Project, query: string): boolean {
    if (query.trim() === '') return true;
    const q = query.toLowerCase();
    return (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tech.some(t => t.toLowerCase().includes(q))
    );
}

/** Category filter: passes all when 'all' is selected */
function matchesCategory(
    project: Project,
    category: FilterState['selectedCategory']
): boolean {
    return category === 'all' || project.category === category;
}

/** Sort comparator using localeCompare for string fields */
function compareProjects(
    a: Project,
    b: Project,
    sortField: FilterState['sortField'],
    sortOrder: FilterState['sortOrder']
): number {
    let result = 0;

    switch (sortField) {
        case 'title':
            result = a.title.localeCompare(b.title, 'tr');
            break;
        case 'year':
            result = a.year - b.year;
            break;
        case 'category':
            result = a.category.localeCompare(b.category, 'tr');
            break;
    }

    return sortOrder === 'asc' ? result : -result;
}

/** Main helper: applies search → category filter → sort */
export function applyFilters(
    projects: Project[],
    filters: FilterState
): Project[] {
    return projects
        .filter(p => matchesSearch(p, filters.searchQuery))
        .filter(p => matchesCategory(p, filters.selectedCategory))
        .sort((a, b) =>
            compareProjects(a, b, filters.sortField, filters.sortOrder)
        );
}
