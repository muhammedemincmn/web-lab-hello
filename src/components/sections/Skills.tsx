// src/components/sections/Skills.tsx
export default function Skills() {
  const skills = [
    'React & TypeScript', 
    'iOS Development (SwiftUI)', 
    'AWS (Cloud)', 
    'DevOps & CI/CD', 
    'Tailwind CSS',
    'Node.js & Python'
  ];

  return (
    <section id="yetenekler" aria-labelledby="yetenekler-baslik" className="py-12 scroll-mt-24">
      <h2 
        id="yetenekler-baslik" 
        className="text-2xl sm:text-3xl font-bold mb-8 inline-block border-b-2 border-secondary pb-2"
      >
        Yetenekler & Teknolojiler
      </h2>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10">
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Sık sık kullandığım ve projelerimde deneyim kazandığım temel teknolojiler:
        </p>
        <ul className="flex flex-wrap gap-3" aria-label="Yetenekler listesi">
          {skills.map(skill => (
            <li
              key={skill}
              className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium hover:border-secondary dark:hover:border-secondary transition-colors"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
