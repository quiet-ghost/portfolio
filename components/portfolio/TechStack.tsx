import { Icon } from "@iconify/react";
import { useState } from "react";
import { Section } from "./Section";

const techList = [
  { name: "Next.js", category: "Frontend", icon: "devicon:nextjs" },
  { name: "React", category: "Frontend", icon: "devicon:react" },
  { name: "Tailwind CSS", category: "Frontend", icon: "devicon:tailwindcss" },
  { name: "TypeScript", category: "Frontend", icon: "devicon:typescript" },
  { name: "JavaScript", category: "Frontend", icon: "devicon:javascript" },
  { name: "Java", category: "Backend", icon: "devicon:java" },
  { name: "Python", category: "Backend", icon: "devicon:python" },
  { name: "SQL", category: "Database", icon: "devicon:mysql" },
  { name: "C++", category: "Backend", icon: "devicon:cplusplus" },
  { name: "Supabase", category: "Database", icon: "devicon:supabase" },
];

const techCategories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
];

export function TechStack() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? techList : techList.filter(t => t.category === filter);

  return (
    <Section id="techstack" className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">Tech Stack</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {techCategories.map(cat => {
          const isSelected = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 rounded-full border border-cyan-500 font-medium transition-colors backdrop-blur
                ${isSelected ? "bg-cyan-400 text-zinc-900 font-bold" : "bg-zinc-800/70 text-cyan-300 hover:bg-cyan-500 hover:text-zinc-900"}`}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map(tech => (
          <div
            key={tech.name}
            className="flex items-center gap-3 rounded-xl bg-zinc-900/80 border border-cyan-700/30 shadow-lg shadow-cyan-500/10 p-4 text-zinc-100 font-medium text-lg backdrop-blur hover:scale-105 hover:shadow-cyan-400/30 transition-transform duration-200"
          >
            <Icon icon={tech.icon} width={32} height={32} className="w-8 h-8" />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
} 