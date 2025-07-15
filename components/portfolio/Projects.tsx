import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowDown, GitBranch } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Section } from "./Section";

export function Projects() {
  const { isDark } = useTheme();

  return (
    <Section id="projects" variant="card" className="max-w-5xl mx-auto">
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
          Featured Projects
        </h2>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.5 },
              y: { duration: 0.7 },
              scale: { duration: 0.7 },
            }}
            whileHover={{ scale: 1.02 }}
            style={{ willChange: "transform, opacity" }}
          >
            <Card
              className={`backdrop-blur rounded-xl border shadow-lg p-6 h-full transition-all duration-300 ${
                isDark
                  ? "bg-zinc-800/80 border-cyan-400/20 shadow-cyan-400/10"
                  : "bg-white/80 border-gray-200/50 shadow-gray-900/10"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3
                      className={`text-xl text-center pb-2 font-semibold ${
                        isDark ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    >
                      Highlight Helper
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Next.js", "React", "Tailwind CSS", "Supabase"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className={`rounded-full px-3 py-1 text-xs font-medium border ${
                              isDark
                                ? "bg-zinc-700/80 border-cyan-400/30 text-cyan-400"
                                : "bg-cyan-100 border-cyan-300 text-cyan-800"
                            }`}
                          >
                            {tech}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                <p
                  className={`mb-4 flex-grow ${
                    isDark ? "text-zinc-400" : "text-gray-600"
                  }`}
                >
                  A productivity tool built for work to increase efficiency in
                  day-to-day tasks. Built with Next.js, React, Tailwind CSS, and
                  Supabase.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900/60"
                    asChild
                  >
                    <a
                      href="https://github.com/quiet-ghost/highlight-helper"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitBranch className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900/60"
                    asChild
                  >
                    <a
                      href="https://hl-helper.quietghost.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowDown className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.5 },
              y: { duration: 0.7 },
              scale: { duration: 0.7 },
            }}
            whileHover={{ scale: 1.02 }}
            style={{ willChange: "transform, opacity" }}
          >
            <Card
              className={`backdrop-blur rounded-xl border shadow-lg p-6 h-full transition-all duration-300 ${
                isDark
                  ? "bg-zinc-800/80 border-cyan-400/20 shadow-cyan-400/10"
                  : "bg-white/80 border-gray-200/50 shadow-gray-900/10"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3
                      className={`text-xl text-center pb-2 font-semibold ${
                        isDark ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    >
                      Mux-Sesh
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Go", "Bubble Tea", "tmux", "CLI"].map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-full px-3 py-1 text-xs font-medium border ${
                            isDark
                              ? "bg-zinc-700/80 border-cyan-400/30 text-cyan-400"
                              : "bg-cyan-100 border-cyan-300 text-cyan-800"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  className={`mb-4 flex-grow ${
                    isDark ? "text-zinc-400" : "text-gray-600"
                  }`}
                >
                  A beautiful, fzf-like tmux session manager with GitHub
                  repository cloning support. Features fuzzy search, project
                  management, and telescope-inspired UI.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900/60"
                    asChild
                  >
                    <a
                      href="https://github.com/quiet-ghost/mux-sesh"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitBranch className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.5 },
              y: { duration: 0.7 },
              scale: { duration: 0.7 },
            }}
            whileHover={{ scale: 1.02 }}
            style={{ willChange: "transform, opacity" }}
          >
            <Card
              className={`backdrop-blur rounded-xl border shadow-lg p-6 h-full transition-all duration-300 ${
                isDark
                  ? "bg-zinc-800/80 border-cyan-400/20 shadow-cyan-400/10"
                  : "bg-white/80 border-gray-200/50 shadow-gray-900/10"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3
                      className={`text-xl text-center font-semibold pb-2 ${
                        isDark ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    >
                      Mux-Manager
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Lua", "Neovim", "Telescope", "tmux"].map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-full px-3 py-1 text-xs font-medium border ${
                            isDark
                              ? "bg-zinc-700/80 border-cyan-400/30 text-cyan-400"
                              : "bg-cyan-100 border-cyan-300 text-cyan-800"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  className={`mb-4 flex-grow ${
                    isDark ? "text-zinc-400" : "text-gray-600"
                  }`}
                >
                  A Neovim plugin for tmux session management using Telescope.
                  Features live preview, project sessionizer, and seamless
                  integration with Neovim workflow.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900/60"
                    asChild
                  >
                    <a
                      href="https://github.com/quiet-ghost/mux-manager"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitBranch className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
