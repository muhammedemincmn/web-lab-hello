// src/components/sections/Skills.tsx
export default function Skills() {
  const skills = [
    'React & TypeScript', 
    'iOS Development (SwiftUI)', 
    'AWS (Cloud)', 
    'DevOps & CI/CD', 
    'Tailwind CSS v4',
    'Node.js & Python',
    'Git & GitHub Actions',
    'REST APIs'
  ];

  return (
    <section id="yetenekler" aria-labelledby="yetenekler-baslik" className="py-20 scroll-mt-24 animate-slide-up">
      <h2 
        id="yetenekler-baslik" 
        className="text-3xl sm:text-4xl font-extrabold mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400"
      >
        Öne Çıkan Yeteneklerim
      </h2>
      <div className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-3xl border border-gray-200/50 dark:border-white/5 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Subtle background gradient detail */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        
        <p className="mb-8 text-base sm:text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl relative z-10">
          Sık sık kullandığım ve projelerimde sistemleri ayağa kaldırmak için başvurduğum temel teknolojiler:
        </p>
        
        <ul className="flex flex-wrap gap-4 relative z-10" aria-label="Yetenekler listesi">
          {skills.map(skill => (
            <li
              key={skill}
              className="px-5 py-2.5 rounded-full bg-white dark:bg-[#121826] border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 hover:text-primary dark:hover:text-primary transition-all duration-300 cursor-default hover:-translate-y-0.5"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
