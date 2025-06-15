import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowDown, Github } from "lucide-react";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projects" className="container mx-auto px-4 py-20 bg-zinc-900/90 rounded-2xl shadow-lg mb-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-zinc-800/80 backdrop-blur rounded-xl border border-cyan-400/20 shadow-cyan-400/10 shadow-lg p-6 h-full">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400">Highlight Helper</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Next.js', 'React', 'Tailwind CSS', 'Supabase'].map((tech) => (
                        <span key={tech} className="bg-zinc-700/80 border border-cyan-400/30 text-cyan-400 rounded-full px-3 py-1 text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 mb-4 flex-grow">
                  A productivity tool built for work to increase efficiency in day-to-day tasks. Built with Next.js, React, Tailwind CSS, and Supabase.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900/60" asChild>
                    <a href="https://github.com/quiet-ghost/highlight-helper" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900/60" asChild>
                    <a href="https://hl-helper.quietghost.dev" target="_blank" rel="noopener noreferrer">
                      <ArrowDown className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
          {/* You can add more projects here as needed */}
        </div>
      </div>
    </Section>
  );
} 