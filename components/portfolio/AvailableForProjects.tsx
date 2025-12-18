"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function AvailableForProjects() {
  const { isDark } = useTheme();

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div
        className={`max-w-4xl mx-auto backdrop-blur-xl rounded-3xl p-8 md:p-12 border shadow-2xl transition-all duration-300 ${
          isDark
            ? "bg-zinc-900/70 border-cyan-400/20 shadow-cyan-400/10"
            : "bg-white/80 border-gray-200/50 shadow-gray-900/10"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
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

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-4xl md:text-5xl font-bold mb-8 pb-2 leading-tight ${
              isDark
                ? "text-cyan-400"
                : "text-cyan-600"
            }`}
          >
            Let&apos;s Build Something Together
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto  mb-12 leading-relaxed"
          >
            I&apos;m currently accepting new internships and collaborations. I
            am looking for all oppertunities to grow my skills, I&apos;m here to
            help bring your ideas to life.
          </motion.p>

          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div
              className={`backdrop-blur-xl rounded-2xl border p-6 group transition-all duration-300 ${
                isDark
                  ? "bg-zinc-800/50 border-cyan-400/20 hover:border-cyan-400/40"
                  : "bg-white/70 border-gray-200/50 hover:border-cyan-500/40"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isDark
                    ? "bg-cyan-400/10 group-hover:bg-cyan-400/20"
                    : "bg-cyan-100 group-hover:bg-cyan-200"
                }`}
              >
                <Clock
                  className={`w-6 h-6 ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
                />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
              >
                Quick Response
              </h3>
              <p
                className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-gray-700"}`}
              >
                Will respond in a timely manner to all inquiries. I&apos;m here
                to learn and grow my skill set. So don&apos;t hesitate to reach
                out if you have any questions or guidance.
              </p>
            </div>

            <div
              className={`backdrop-blur-xl rounded-2xl border p-6 group transition-all duration-300 ${
                isDark
                  ? "bg-zinc-800/50 border-cyan-400/20 hover:border-cyan-400/40"
                  : "bg-white/70 border-gray-200/50 hover:border-blue-500/40"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isDark
                    ? "bg-blue-400/10 group-hover:bg-blue-400/20"
                    : "bg-blue-100 group-hover:bg-blue-200"
                }`}
              >
                <Calendar
                  className={`w-6 h-6 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                Flexible Schedule
              </h3>
              <p
                className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-gray-700"}`}
              >
                Available for both short-term internships and long-term
                collaborations. Looking for any and all opportunities to grow
                within the field.
              </p>
            </div>

            <div
              className={`backdrop-blur-xl rounded-2xl border p-6 group transition-all duration-300 ${
                isDark
                  ? "bg-zinc-800/50 border-cyan-400/20 hover:border-cyan-400/40"
                  : "bg-white/70 border-gray-200/50 hover:border-purple-500/40"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isDark
                    ? "bg-purple-400/10 group-hover:bg-purple-400/20"
                    : "bg-purple-100 group-hover:bg-purple-200"
                }`}
              >
                <MessageCircle
                  className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${isDark ? "text-purple-400" : "text-purple-600"}`}
              >
                Clear Communication
              </h3>
              <p
                className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-gray-700"}`}
              >
                I will be fully transparent and responsive throughout the
                project. Regular updates and clear communication, as I am still
                learning and growing.
              </p>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 group"
            >
              <a href="#contact" className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button
              variant="outline"
              asChild
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/50 px-8 py-3 rounded-xl transition-all duration-300"
            >
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </Button>
          </motion.div>

          {/* Availability note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-zinc-500 text-sm mt-8"
          >
            Currently looking for internships • Remote & On-site Available
            (location and time dependent as I do work full-time)
          </motion.p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${
          isDark ? "bg-cyan-400/8" : "bg-cyan-400/4"
        }`} />
      </div>
    </section>
  );
}
