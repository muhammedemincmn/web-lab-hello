// src/App.tsx
// LAB-6: Ara Checkpoint #1 — App as an Orchestrator & Strict TypeScript

import { useState, useEffect, useCallback } from 'react';
import './App.css';
import type { Project } from './types/project';
import { fetchProjects } from './services/projectService';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Section & Form Components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import ProjectList from './components/sections/ProjectList';
import ContactForm from './components/forms/ContactForm';

function App() {
  // ── Application State ───────────────────────────────────────────────────
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dark, setDark] = useState<boolean>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // ── Dark mode effect ─────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // ── Data fetching ────────────────────────────────────────────────────────
  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Projeler yüklenirken bir hata oluştu.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-xl"
      >
        Ana içeriğe atla
      </a>

      {/* Header Layout */}
      <Header dark={dark} toggleDark={() => setDark((prev) => !prev)} />

      {/* Main Content Sections */}
      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20">
        <Hero />
        <About />
        <Skills />
        <ProjectList 
          projects={projects} 
          loading={loading} 
          error={error} 
          onRetry={loadProjects} 
        />
        
        {/* Contact Section */}
        <section id="iletisim" aria-labelledby="iletisim-baslik" className="py-12 scroll-mt-24">
          <h2 id="iletisim-baslik" className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2">
            İletişim
          </h2>
          <ContactForm />
        </section>
      </main>

      {/* Footer Layout */}
      <Footer />
    </div>
  );
}

export default App;