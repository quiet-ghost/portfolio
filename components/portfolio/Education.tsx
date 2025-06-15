import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Code, Coffee, Database, Download, ExternalLink, GraduationCap, X } from "lucide-react";
import { useState } from "react";
import { Section } from "./Section";

const CERT_TITLE = "Python Programming Certification";
const CERT_PROVIDER = "Zero to Mastery";
const CERT_DATE = "Summer 2025";
const CERT_PDF = "/certificates/python-cert.pdf";

export function Education() {
  const [showCert, setShowCert] = useState(false);

  return (
    <Section id="education" className="container mx-auto px-4 py-20 bg-zinc-900/90 rounded-2xl shadow-lg mb-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-cyan-400">Education & Certifications</h2>
        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-cyan-400/30 z-0" />
          {/* ZTM branch line (horizontal) */}
          <div className="absolute left-7 top-[180px] w-16 h-0.5 bg-cyan-400/40 z-0" />
          {/* ZTM merge line (vertical) */}
          <div className="absolute left-[6.5rem] top-[180px] h-[140px] w-0.5 bg-cyan-400/30 z-0" />
          {/* ZTM merge line (horizontal) */}
          <div className="absolute left-7 top-[320px] w-16 h-0.5 bg-cyan-400/40 z-0" />
          {/* Timeline items */}
          <div className="space-y-10">
            {/* Web Development 1 */}
            <div className="relative flex items-center pl-16 min-h-[80px]">
              <div className="absolute left-0 w-14 h-14 rounded-full bg-zinc-900 border-2 border-cyan-400/60 flex items-center justify-center z-10">
                <Code className="text-cyan-400 w-7 h-7" />
              </div>
              <div className="bg-zinc-800/80 backdrop-blur rounded-xl border border-cyan-400/20 shadow-cyan-400/10 shadow-lg p-4 w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400">Web Development 1</h3>
                    <p className="text-zinc-400 text-sm">Gwinnett Technical College</p>
                  </div>
                  <span className="text-zinc-400 text-xs">Fall 2024</span>
                </div>
                <p className="text-zinc-300 text-sm mt-1">Intro to web development fundamentals and modern practices.</p>
              </div>
            </div>
            {/* SQL and Python */}
            <div className="relative flex items-center pl-16 min-h-[80px]">
              <div className="absolute left-0 w-14 h-14 rounded-full bg-zinc-900 border-2 border-cyan-400/60 flex items-center justify-center z-10">
                <Database className="text-cyan-400 w-7 h-7" />
              </div>
              <div className="bg-zinc-800/80 backdrop-blur rounded-xl border border-cyan-400/20 shadow-cyan-400/10 shadow-lg p-4 w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400">SQL and Python</h3>
                    <p className="text-zinc-400 text-sm">Gwinnett Technical College</p>
                  </div>
                  <span className="text-zinc-400 text-xs">Spring 2025</span>
                </div>
                <p className="text-zinc-300 text-sm mt-1">Database management and Python programming fundamentals.</p>
              </div>
            </div>
            {/* ZTM Python Course (Branch) */}
            <div className="relative flex items-center pl-36 min-h-[80px]">
              <div className="absolute left-0 w-14 h-14 rounded-full bg-zinc-900 border-2 border-cyan-400/60 flex items-center justify-center z-10">
                <Code className="text-cyan-400 w-7 h-7" />
              </div>
              <div className="bg-zinc-800/80 backdrop-blur rounded-xl border border-cyan-400/20 shadow-cyan-400/10 shadow-lg p-4 w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400">Python Programming</h3>
                    <p className="text-zinc-400 text-sm">Zero to Mastery</p>
                  </div>
                  <span className="text-zinc-400 text-xs">Spring 2025</span>
                </div>
                <p className="text-zinc-300 text-sm mt-1">Started comprehensive Python programming course.</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900/60" asChild>
                    <a href="https://zerotomastery.io/courses/learn-python/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Course
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            {/* Java 1 (main branch) */}
            <div className="relative flex items-center pl-16 min-h-[80px]">
              <div className="absolute left-0 w-14 h-14 rounded-full bg-zinc-900 border-2 border-cyan-400/60 flex items-center justify-center z-10">
                <Coffee className="text-cyan-400 w-7 h-7" />
              </div>
              <div className="bg-zinc-800/80 backdrop-blur rounded-xl border border-cyan-400/20 shadow-cyan-400/10 shadow-lg p-4 w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400">Java Programming 1</h3>
                    <p className="text-zinc-400 text-sm">Gwinnett Technical College</p>
                  </div>
                  <span className="text-zinc-400 text-xs">Summer 2025</span>
                </div>
                <p className="text-zinc-300 text-sm mt-1">Current semester: Fundamentals of Java programming and OOP.</p>
              </div>
            </div>
            {/* ZTM Python Course Completion (Merge) */}
            <div className="relative flex items-center pl-16 min-h-[80px]">
              <div className="absolute left-0 w-14 h-14 rounded-full bg-zinc-900 border-2 border-cyan-400/60 flex items-center justify-center z-10">
                <GraduationCap className="text-cyan-400 w-7 h-7" />
              </div>
              <div className="bg-zinc-800/80 backdrop-blur rounded-xl border border-cyan-400/20 shadow-cyan-400/10 shadow-lg p-4 w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400">Python Programming Certification</h3>
                    <p className="text-zinc-400 text-sm">Zero to Mastery</p>
                  </div>
                  <span className="text-zinc-400 text-xs">Summer 2025</span>
                </div>
                <p className="text-zinc-300 text-sm mt-1">Completed comprehensive Python programming course.</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900/60" onClick={() => setShowCert(true)}>
                    <ArrowDown className="h-4 w-4 mr-1" />
                    View Certificate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Certificate Modal */}
        <AnimatePresence>
          {showCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
              onClick={() => setShowCert(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-zinc-900/95 border border-cyan-400/30 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col items-center"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="w-full px-6 pt-6 pb-2 bg-zinc-900/90 border-b border-cyan-700/30">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-1">{CERT_TITLE}</h3>
                  <p className="text-zinc-400 text-base">{CERT_PROVIDER} • {CERT_DATE}</p>
                </div>
                {/* Certificate PDF */}
                <div className="flex-1 w-full flex justify-center items-center bg-zinc-900/80 p-4">
                  <iframe
                    src={CERT_PDF}
                    title={CERT_TITLE}
                    className="w-full h-[70vh] rounded-lg border border-cyan-400/20 bg-zinc-800"
                  />
                </div>
                {/* Modal Footer */}
                <div className="w-full flex justify-end gap-3 p-4 bg-zinc-900/90 border-t border-cyan-700/30">
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold"
                    onClick={() => setShowCert(false)}
                  >
                    <X className="w-5 h-5" />
                    Close
                  </Button>
                  <a
                    href={CERT_PDF}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500/80 text-zinc-900 font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors backdrop-blur"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
} 