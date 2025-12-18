import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Section } from "./Section";

export function About() {
  const { isDark } = useTheme();

  return (
    <Section id="about" variant="card" className="max-w-4xl mx-auto">
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
          className={`text-4xl font-bold mb-8 ${
            isDark ? "text-cyan-400" : "text-cyan-600"
          }`}
        >
          About Me
        </h2>
        <p
          className={`text-lg leading-relaxed ${
            isDark ? "text-zinc-300" : "text-gray-700"
          }`}
        >
          Computer Programming student at Gwinnett Technical College working
          toward my AAS. I&apos;m interested in backend and full-stack
          development. I like figuring out how things work under the hood and
          building solutions that solve actual problems. Open to opportunities
          where I can contribute and grow as a developer.
        </p>
      </motion.div>
    </Section>
  );
}
