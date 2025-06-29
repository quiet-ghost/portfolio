import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Section } from "./Section";

export function About() {
  const { isDark } = useTheme();
  
  return (
    <Section id="about" variant="card" className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={`text-4xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent ${
          isDark 
            ? 'from-cyan-400 to-blue-400' 
            : 'from-cyan-600 to-blue-600'
        }`}>
          About Me
        </h2>
        <p className={`text-lg leading-relaxed ${
          isDark ? 'text-zinc-300' : 'text-gray-700'
        }`}>
          I&apos;m Kevin, a Computer Programming Student getting my AAS from Gwinnett Technical College. I&apos;m interested in a wide range of software development roles and enjoy problem solving, automation, and working with data. I&apos;m adaptable, eager to learn, and open to opportunities across my continuously growing tech stack.
        </p>
      </motion.div>
    </Section>
  );
}