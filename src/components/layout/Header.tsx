// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';

interface HeaderProps {
  dark: boolean;
  toggleDark: () => void;
}

export default function Header({ dark, toggleDark }: Readonly<HeaderProps>) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/70 dark:bg-[#070B14]/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            M.Emin
          </h1>
        </div>

        {/* Mobile menu toggle button */}
        <button
          className="sm:hidden p-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
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
          } sm:flex flex-col sm:flex-row absolute sm:static top-full left-0 w-full sm:w-auto bg-white/95 dark:bg-[#070B14]/95 sm:bg-transparent p-6 sm:p-0 border-b sm:border-0 border-gray-200 dark:border-white/5 gap-6 sm:gap-8 items-center backdrop-blur-3xl sm:backdrop-blur-none`}
        >
          <ul className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-sm font-medium w-full sm:w-auto text-gray-600 dark:text-gray-300">
            <li>
              <a href="#hakkimda" className="hover:text-primary dark:hover:text-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                Hakkımda
              </a>
            </li>
            <li>
              <a href="#yetenekler" className="hover:text-primary dark:hover:text-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                Yetenekler
              </a>
            </li>
            <li>
              <a href="#projeler" className="hover:text-primary dark:hover:text-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                Projeler
              </a>
            </li>
            <li>
              <a href="#iletisim" className="hover:text-primary dark:hover:text-secondary transition-colors" onClick={() => setMenuOpen(false)}>
                İletişim
              </a>
            </li>
            <li>
              <button
                type="button"
                aria-label={dark ? 'Açık temaya geç' : 'Koyu temaya geç'}
                onClick={toggleDark}
                className="p-2 sm:p-2.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all flex items-center justify-center w-10 h-10"
              >
                <span aria-hidden="true" className="text-lg">{dark ? '☀️' : '🌙'}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
