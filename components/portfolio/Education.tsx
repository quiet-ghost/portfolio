import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  GraduationCap,
  X,
  Calendar,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Section } from "./Section";
import { Icon } from "@iconify/react";

const CERT_TITLE = "Python Programming Certification";
const CERT_PROVIDER = "Zero to Mastery";
const CERT_DATE = "Summer 2025";
const CERT_PNG = "/Certificates/python-cert-1.png";

const educationData = [
  {
    id: 1,
    title: "Web Development 1",
    institution: "Gwinnett Technical College",
    date: "Fall 2024",
    description: "Intro to web development fundamentals and modern practices.",
    icon: "devicon:html5",
    status: "completed",
    type: "course",
    location: "Lawrenceville, GA",
  },
  {
    id: 2,
    title: "SQL",
    institution: "Gwinnett Technical College",
    date: "Spring 2025",
    description: "Database management and Python programming fundamentals.",
    icon: "devicon:mysql",
    status: "completed",
    type: "course",
    location: "Lawrenceville, GA",
  },
  {
    id: 3,
    title: "Python Programming",
    institution: "Gwinnett Technical College",
    date: "Spring 2025",
    description: "Intro to Python programming fundamentals.",
    icon: "devicon:python",
    status: "completed",
    type: "course",
    location: "Lawrenceville, GA",
  },
  {
    id: 4,
    title: "Python Programming",
    institution: "Zero to Mastery",
    date: "Spring 2025",
    description: "Started comprehensive Python programming course.",
    icon: "devicon:python",
    status: "completed",
    type: "certification",
    link: "https://zerotomastery.io/courses/learn-python/",
    isBranch: false,
  },
  {
    id: 5,
    title: "Java Programming 1",
    institution: "Gwinnett Technical College",
    date: "Summer 2025",
    description: "Current semester: Fundamentals of Java programming and OOP.",
    icon: "devicon:java",
    status: "current",
    type: "course",
    location: "Lawrenceville, GA",
  },
  {
    id: 6,
    title: "Python Programming Certification",
    institution: "Zero to Mastery",
    date: "Summer 2025",
    description: "Completed comprehensive Python programming course.",
    icon: "devicon:python",
    status: "completed",
    type: "certification",
    hasCertificate: true,
  },
  {
    id: 7,
    title: "Java Programming II",
    institution: "Gwinnett Technical College",
    date: "Fall 2025",
    description:
      "Database access, File access, exception handling, running threads, using sockets to talk across a network, and remotely calling methods using RMI techniques.",
    icon: "devicon:java",
    status: "upcoming",
    type: "course",
    location: "Lawrenceville, GA",
  },
];

export function Education() {
  const [showCert, setShowCert] = useState(false);
  const { isDark } = useTheme();

  const getStatusColor = (status: string) => {
    if (isDark) {
      switch (status) {
        case "completed":
          return "border-green-400/60 bg-green-400/10";
        case "current":
          return "border-cyan-400/60 bg-cyan-400/10 animate-pulse";
        case "in-progress":
          return "border-yellow-400/60 bg-yellow-400/10";
        case "upcoming":
          return "border-purple-400/60 bg-purple-400/10";
        default:
          return "border-cyan-400/60 bg-cyan-400/10";
      }
    } else {
      switch (status) {
        case "completed":
          return "border-green-600/60 bg-green-100";
        case "current":
          return "border-cyan-600/60 bg-cyan-100 animate-pulse";
        case "in-progress":
          return "border-yellow-600/60 bg-yellow-100";
        case "upcoming":
          return "border-purple-600/60 bg-purple-100";
        default:
          return "border-cyan-600/60 bg-cyan-100";
      }
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "current":
        return "Current";
      case "in-progress":
        return "In Progress";
      case "upcoming":
        return "Upcoming";
      default:
        return "";
    }
  };

  return (
    <Section id="education" variant="card" className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDark ? "from-cyan-400 to-blue-400" : "from-cyan-600 to-blue-600"
            }`}
          >
            Education & Certifications
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-zinc-400" : "text-gray-600"
            }`}
          >
            My academic journey and professional development in software
            engineering
          </p>
        </div>

        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 via-blue-400/30 to-purple-400/50 z-0" />

          {/* ZTM branch lines */}
          <div className="absolute left-8 top-[240px] w-20 h-0.5 bg-gradient-to-r from-cyan-400/50 to-yellow-400/50 z-0" />
          <div className="absolute left-[7rem] top-[240px] h-[160px] w-0.5 bg-gradient-to-b from-yellow-400/50 to-purple-400/50 z-0" />
          <div className="absolute left-8 top-[400px] w-20 h-0.5 bg-gradient-to-r from-purple-400/50 to-cyan-400/50 z-0" />

          {/* Timeline items */}
          <div className="space-y-12">
            {educationData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${item.isBranch ? "pl-40" : "pl-20"} min-h-[100px] group`}
              >
                {/* Icon */}
                <div
                  className={`absolute left-0 w-16 h-16 rounded-full border-2 ${getStatusColor(item.status)} flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300 ${
                    isDark ? "bg-zinc-900/90" : "bg-white/90"
                  }`}
                >
                  <Icon
                    icon={item.icon}
                    className={`w-8 h-8 ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`backdrop-blur-xl rounded-2xl border shadow-xl p-6 w-full relative overflow-hidden transition-all duration-300 ${
                    isDark
                      ? "bg-zinc-800/90 border-cyan-400/20 shadow-cyan-400/5 group-hover:border-cyan-400/40"
                      : "bg-white/90 border-gray-200/50 shadow-gray-900/10 group-hover:border-cyan-500/40"
                  }`}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3
                            className={`text-xl font-bold transition-colors ${
                              isDark
                                ? "text-cyan-400 group-hover:text-cyan-300"
                                : "text-cyan-600 group-hover:text-cyan-500"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              isDark
                                ? item.status === "completed"
                                  ? "bg-green-400/20 text-green-400 border-green-400/40"
                                  : item.status === "current"
                                    ? "bg-cyan-400/20 text-cyan-400 border-cyan-400/40"
                                    : item.status === "in-progress"
                                      ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/40"
                                      : "bg-purple-400/20 text-purple-400 border-purple-400/40"
                                : item.status === "completed"
                                  ? "bg-green-100 text-green-800 border-green-300"
                                  : item.status === "current"
                                    ? "bg-cyan-100 text-cyan-800 border-cyan-300"
                                    : item.status === "in-progress"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                      : "bg-purple-100 text-purple-800 border-purple-300"
                            }`}
                          >
                            {getStatusText(item.status)}
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-4 text-sm mb-1 ${
                            isDark ? "text-zinc-400" : "text-gray-600"
                          }`}
                        >
                          <span className="font-medium">
                            {item.institution}
                          </span>
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          isDark ? "text-zinc-400" : "text-gray-600"
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <p
                      className={`text-sm leading-relaxed mb-4 ${
                        isDark ? "text-zinc-300" : "text-gray-700"
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Action buttons */}
                    {(item.link || item.hasCertificate) && (
                      <div className="flex gap-3">
                        {item.link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`transition-all duration-200 ${
                              isDark
                                ? "text-zinc-400 hover:text-cyan-400 hover:bg-cyan-400/10"
                                : "text-gray-600 hover:text-cyan-600 hover:bg-cyan-500/10"
                            }`}
                            asChild
                          >
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Course
                            </a>
                          </Button>
                        )}
                        {item.hasCertificate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`transition-all duration-200 ${
                              isDark
                                ? "text-zinc-400 hover:text-cyan-400 hover:bg-cyan-400/10"
                                : "text-gray-600 hover:text-cyan-600 hover:bg-cyan-500/10"
                            }`}
                            onClick={() => setShowCert(true)}
                          >
                            <GraduationCap className="h-4 w-4 mr-2" />
                            View Certificate
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
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
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="w-full px-6 pt-6 pb-2 bg-zinc-900/90 border-b border-cyan-700/30">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-1">
                    {CERT_TITLE}
                  </h3>
                  <p className="text-zinc-400 text-base">
                    {CERT_PROVIDER} • {CERT_DATE}
                  </p>
                </div>
                {/* Certificate Image */}
                <div className="flex-1 w-full flex justify-center items-center bg-zinc-800/80 p-4">
                  <Image
                    src={CERT_PNG}
                    alt={CERT_TITLE}
                    width={800}
                    height={600}
                    className="w-full max-h-[70vh] object-contain rounded-lg border border-cyan-400/20"
                    onError={() =>
                      console.error("Failed to load certificate image")
                    }
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
                    href={CERT_PNG}
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
      </motion.div>
    </Section>
  );
}

