// src/components/layout/Footer.tsx

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-500">
      <p>&copy; {currentYear} Muhammed Emin. Tüm hakları saklıdır.</p>
    </footer>
  );
}
