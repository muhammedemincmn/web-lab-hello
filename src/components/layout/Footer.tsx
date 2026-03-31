// src/components/layout/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200/40 dark:border-white/5 py-10 text-center text-sm text-gray-400 dark:text-gray-500 font-light flex flex-col items-center gap-2">
      <div className="w-12 h-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full mb-4"></div>
      <p>&copy; {currentYear} Muhammed Emin. Sizin için tasarlandı.</p>
    </footer>
  );
}

