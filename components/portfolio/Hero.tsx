"use client";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Icon } from "@iconify/react";

export default function Hero() {
  const fullText = "Software Developer Student";
  const [typed, setTyped] = useState("");
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setShowScrollIndicator(!scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Content container */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.6 },
              y: { duration: 0.8 },
            }}
            style={{ willChange: "transform, opacity" }}
            className={`text-center backdrop-blur-xl rounded-3xl p-12 border shadow-2xl ${
              isDark
                ? "bg-zinc-900/70 border-cyan-400/20 shadow-cyan-400/10"
                : "bg-white/70 border-cyan-500/20 shadow-cyan-500/10"
            }`}
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.5 },
                scale: { duration: 0.7 },
              }}
              style={{ willChange: "transform, opacity" }}
              className="relative w-36 h-36 mx-auto mb-8"
            >
              <div
                className={`absolute inset-0 rounded-full border-3 shadow-2xl backdrop-blur-sm ${
                  isDark
                    ? "border-cyan-400/60 shadow-cyan-400/30"
                    : "border-cyan-500/60 shadow-cyan-500/30"
                }`}
              />
              <Image
                src="/social.png"
                alt="Kevin Sclafani"
                fill
                className="rounded-full object-cover"
                priority
              />
            </motion.div>

            {/* Name and title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.5 },
                y: { duration: 0.6 },
              }}
              style={{ willChange: "transform, opacity" }}
              className={`text-5xl md:text-6xl font-bold mb-6 ${
                isDark
                  ? "text-cyan-400"
                  : "text-cyan-600"
              }`}
            >
              Kevin Sclafani
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.5 },
                y: { duration: 0.6 },
              }}
              style={{ willChange: "transform, opacity" }}
              className={`text-xl md:text-2xl mb-8 font-mono min-h-[2.5rem] ${
                isDark ? "text-cyan-400" : "text-cyan-600"
              }`}
            >
              {typed}
              <span
                className={`inline-block w-2 h-6 align-middle animate-pulse ml-1 ${
                  isDark ? "bg-cyan-400" : "bg-cyan-600"
                }`}
                style={{ verticalAlign: "-0.2em" }}
              ></span>
            </motion.p>

            {/* Status indicator */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/20 rounded-full px-4 py-2 mb-8"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium text-sm">
                Available for Internships
              </span>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center gap-8"
            >
              <motion.a
                href="https://github.com/quiet-ghost"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                    : "text-cyan-600 hover:text-cyan-500 hover:bg-cyan-500/10"
                }`}
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/ksclafani"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                    : "text-cyan-600 hover:text-cyan-500 hover:bg-cyan-500/10"
                }`}
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:ksclafani@quietghost.dev"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                    : "text-cyan-600 hover:text-cyan-500 hover:bg-cyan-500/10"
                }`}
              >
                <Mail className="w-8 h-8" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll for more indicator - positioned at bottom of viewport */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showScrollIndicator ? 1 : 0,
          y: showScrollIndicator ? 0 : 20,
        }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex fixed bottom-8 left-0 right-0 justify-center z-20 pointer-events-none"
      >
        <motion.button
          onClick={() => {
            const overviewSection = document.getElementById("about");
            if (overviewSection) {
              overviewSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 pointer-events-auto"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium tracking-wide">
            Scroll for more
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              icon="mdi:chevron-down"
              width={24}
              height={24}
              className="text-gray-400 dark:text-gray-500"
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
