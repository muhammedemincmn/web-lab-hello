// src/types/project.ts
// LAB-5: TypeScript type definitions — No-Any Policy enforced

export type Category = 'ios' | 'web' | 'devops' | 'backend' | 'other';

export type SortField = 'title' | 'year' | 'category';

export type SortOrder = 'asc' | 'desc';

export interface Project {
    readonly id: string;
    title: string;
    description: string;
    tech: string[];
    year: number;
    category: Category;
    featured: boolean;
    image: string;
}

export interface FilterState {
    searchQuery: string;
    selectedCategory: Category | 'all';
    sortField: SortField;
    sortOrder: SortOrder;
}
