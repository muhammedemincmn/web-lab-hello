// src/components/layout/Header.tsx
import { useState } from 'react';

interface HeaderProps {
  dark: boolean;
  toggleDark: () => void;
}

export default function Header({ dark, toggleDark }: Readonly<HeaderProps>) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Muhammed Emin</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
            Kişisel Portfolyo
          </p>
        </div>

        {/* Mobile menu toggle button */}
        <button
          className="sm:hidden p-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/40 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop & Mobile Navigation */}
        <nav
          aria-label="Ana navigasyon"
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row absolute sm:static top-full left-0 w-full sm:w-auto bg-white/95 dark:bg-gray-950/95 sm:bg-transparent p-4 sm:p-0 border-b sm:border-0 border-gray-200 dark:border-gray-800 gap-4 sm:gap-5 items-center`}
        >
          <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-sm font-medium w-full sm:w-auto">
            <li>
              <a href="#hakkimda" className="hover:text-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                Hakkımda
              </a>
            </li>
            <li>
              <a href="#yetenekler" className="hover:text-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                Yetenekler
              </a>
            </li>
            <li>
              <a href="#projeler" className="hover:text-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                Projeler
              </a>
            </li>
            <li>
              <a href="#iletisim" className="hover:text-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                İletişim
              </a>
            </li>
            <li>
              <button
                type="button"
                aria-label={dark ? 'Açık temaya geç' : 'Koyu temaya geç'}
                onClick={toggleDark}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-colors w-full sm:w-auto"
              >
                <span aria-hidden="true">{dark ? '☀️' : '🌙'}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
