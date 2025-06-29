import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import { Section } from "./Section";

const techList = [
  { name: "Next.js", category: "Frontend", icon: "/TechStack/Next.js.svg" },
  { name: "React", category: "Frontend", icon: "/TechStack/React.svg" },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: "/TechStack/Tailwind CSS.svg",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: "/TechStack/TypeScript.svg",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    icon: "/TechStack/JavaScript.svg",
  },
  { name: "Java", category: "Backend", icon: "/TechStack/Java.svg" },
  { name: "Python", category: "Backend", icon: "/TechStack/Python.svg" },
  { name: "SQL", category: "Database", icon: "/TechStack/MySQL.svg" },
  { name: "C++", category: "Backend", icon: "/TechStack/C++ (CPlusPlus).svg" },
  {
    name: "Supabase",
    category: "Database",
    icon: "/TechStack/supabase-logo-icon.svg",
  },
];

const techCategories = ["All", "Frontend", "Backend", "Database"];

export function TechStack() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? techList : techList.filter((t) => t.category === filter);
  const { isDark } = useTheme();

  return (
    <Section id="techstack" variant="card" className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.6 },
          y: { duration: 0.8 },
        }}
        style={{ willChange: "transform, opacity" }}
      >
        <h2
          className={`text-4xl font-bold mb-8 text-center bg-gradient-to-r bg-clip-text text-transparent ${
            isDark ? "from-cyan-400 to-blue-400" : "from-cyan-600 to-blue-600"
          }`}
        >
          Tech Stack
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {techCategories.map((cat) => {
            const isSelected = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full border font-medium transition-all duration-200 ${
                  isSelected
                    ? isDark
                      ? "bg-cyan-400 text-zinc-900 border-cyan-400 font-bold"
                      : "bg-cyan-600 text-white border-cyan-600 font-bold"
                    : isDark
                      ? "bg-zinc-800/70 text-cyan-300 border-cyan-500 hover:bg-cyan-500 hover:text-zinc-900"
                      : "bg-white/70 text-cyan-700 border-cyan-300 hover:bg-cyan-600 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((tech, index) => (
            <motion.div
              key={`${filter}-${tech.name}`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              style={{ willChange: "transform, opacity" }}
              className={`flex items-center gap-3 rounded-xl border shadow-lg p-4 font-medium text-lg backdrop-blur ${
                isDark
                  ? "bg-zinc-800/80 border-cyan-700/30 shadow-cyan-500/10 text-zinc-100 hover:shadow-cyan-400/30"
                  : "bg-white/80 border-gray-200/50 shadow-gray-900/10 text-gray-900 hover:shadow-gray-900/20"
              }`}
            >
              <Image
                src={tech.icon}
                alt={`${tech.name} icon`}
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
