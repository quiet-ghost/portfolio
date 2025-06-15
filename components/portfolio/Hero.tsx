import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { Section } from "./Section";

export function Hero() {
  const { isDark, setIsDark } = useTheme();

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <Section id="hero" className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="flex flex-col items-center gap-4 bg-zinc-900/80 rounded-2xl p-8 shadow-xl shadow-cyan-500/10 backdrop-blur">
        <Image
          src="/social.png"
          alt="Kevin Sclafani avatar"
          width={120}
          height={120}
          className="rounded-full border-4 border-cyan-500 shadow-lg shadow-cyan-500/20 object-cover"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 mt-4">Kevin Sclafani</h1>
        <span className="text-cyan-400 text-lg font-mono">@quietghost</span>
        <p className="text-zinc-300 text-lg mt-2 mb-4">Student developer at Gwinnett Technical College.</p>
        <div className="flex gap-4 justify-center mt-2">
          <motion.a
            href="https://github.com/quiet-ghost"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            whileHover={{ scale: 1.15, boxShadow: "0 0 20px #22d3ee" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-full"
          >
            <Github className="w-8 h-8 text-cyan-400" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/ksclafani/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.15, boxShadow: "0 0 20px #22d3ee" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-full"
          >
            <Linkedin className="w-8 h-8 text-cyan-400" />
          </motion.a>
          <motion.a
            href="mailto:quietghosttv@pm.me"
            aria-label="Email"
            whileHover={{ scale: 1.15, boxShadow: "0 0 20px #22d3ee" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-full"
          >
            <Mail className="w-8 h-8 text-cyan-400" />
          </motion.a>
        </div>
      </div>
    </Section>
  );
} 