"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const fullText = "Software Developer Student";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950" />
      
      {/* Fade out gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-zinc-900/80 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-32 h-32 mx-auto mb-8"
            >
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] backdrop-blur-sm" />
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
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4"
            >
              Kevin Sclafani
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl md:text-2xl text-cyan-400 mb-8 font-mono min-h-[2.5rem]"
            >
              {typed}
              <span className="inline-block w-2 h-6 align-middle bg-cyan-400 animate-pulse ml-1" style={{verticalAlign:'-0.2em'}}></span>
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center gap-6"
            >
              <motion.a
                href="https://github.com/quiet-ghost"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Github className="w-8 h-8" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/ksclafani"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Linkedin className="w-8 h-8" />
              </motion.a>
              <motion.a
                href="mailto:quietghosttv@pm.me"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-8 h-8" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 