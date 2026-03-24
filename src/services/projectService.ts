// src/services/projectService.ts
// LAB-5: Async fetch service — No-Any Policy, response.ok check, throw new Error

import type { Project } from '../types/project';

const PROJECTS_URL = '/data/projects.json';

export async function fetchProjects(): Promise<Project[]> {
    const response = await fetch(PROJECTS_URL);

    if (!response.ok) {
        throw new Error(
            `Projeler yüklenemedi: ${response.status} ${response.statusText}`
        );
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Veri formatı geçersiz: dizi bekleniyor.');
    }

    return data as Project[];
}
