'use client';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const techStack = [
  { name: 'React', icon: '/react.svg' },
  { name: 'TypeScript', icon: '/typescript.svg' },
  { name: 'Next.js', icon: '/nextjs.svg' },
  { name: 'Tailwind', icon: '/tailwindcss.svg' },
  { name: 'Node.js', icon: '/nodejs.svg' },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Kevin Sclafani - Software Engineer</title>
      </Head>
      {/* Animated background gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-950 to-black animate-gradient-x" />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 text-foreground">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-2xl text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Kevin Sclafani
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold text-zinc-300 mb-6">
            Software Engineer & Lifelong Learner
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 mb-8">
            Building modern web experiences with React, Next.js, and TypeScript.
            Passionate about clean code, UI/UX, and continuous growth.
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://github.com/quiet-ghost"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="w-7 h-7 text-zinc-400 hover:text-blue-400 transition" />
            </a>
            <a
              href="https://linkedin.com/in/ksclafani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-7 h-7 text-zinc-400 hover:text-blue-400 transition" />
            </a>
            <a href="mailto:ksclafani26@pm.me" aria-label="Email">
              <FaEnvelope className="w-7 h-7 text-zinc-400 hover:text-blue-400 transition" />
            </a>
          </div>
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-3 mt-2 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
          >
            View Projects
          </motion.a>
        </motion.section>

        {/* About Card */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="w-full max-w-xl bg-zinc-900/80 rounded-2xl shadow-xl p-8 mb-12 border border-zinc-800 backdrop-blur"
        >
          <h3 className="flex justify-center text-2xl font-bold text-blue-400 mb-2">
            About Me
          </h3>
          <p className="text-center text-zinc-300 text-lg">
            I&apos;m a software developer currently studying Computer
            Programming at Gwinnett Technical College. I love building
            beautiful, performant programs and I am always eager to learn new
            technologies. I&apos;m actively seeking opportunities in the
            software industry to grow and contribute.
          </p>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-full max-w-xl flex flex-col items-center"
        >
          <h4 className="text-lg font-semibold text-zinc-400 mb-4">
            Tech Stack
          </h4>
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center group">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-9 h-9 mb-1 grayscale group-hover:grayscale-0 transition"
                />
                <span className="text-xs text-zinc-400 group-hover:text-blue-400 transition">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
      <style jsx global>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
