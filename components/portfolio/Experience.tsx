import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, FileDown, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Section } from "./Section";
const experiences = [
  {
    role: "Student, Computer Programming (AAS)",
    company: "Gwinnett Technical College",
    location: "Lawrenceville, GA",
    period: "2023 – Present",
    description: [
      "Focused on software engineering, web development, and database systems.",
      "Completed coursework in Java, Python, SQL, and modern web technologies.",
    ],
    tech: [
      "Java",
      "Python",
      "SQL",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    role: "Fulfillment Supervisor - Tackle/Tennis/Running/Inline Warehouse",
    company: "Sports Warehouse, LLC",
    location: "Alpharetta, GA",
    period: "Jan 2022 – Current",
    description: [
      "Ensure all customer orders are valid and charged correctly.",
      "Communicate with other departments regarding inventory or order issues.",
      "Execute daily fulfillment operations and prioritize customer orders.",
      "Develop and implement procedures with new systems.",
      "Assign tasks and provide direction to team members.",
      "Assist in employee reviews and provide feedback to management.",
      "Point person for new process implementation along side owner with communication and about new software",
      "Continually learn and develop skills relevant to the position.",
    ],
    tech: ["Inventory Management", "Team Leadership", "Process Improvement"],
  },
  {
    role: "Lead Multimedia/ Live Stream Coordinator",
    company: "Journey Church Buford",
    location: "Buford, GA",
    period: "January 2006 - December 2022",
    description: [
      "Use Pro Presenter, OBS and other software applications to distribute service live in person and across multiple live streaming services",
      "Coordinate with other leadership in the church using Google drive to ensure all needs are met each week for Sunday Service",
      "Troubleshoot any technical needs through the church including but not limited to, Pro Presenter, Google Drive, OBS, Internet (ISP related issues) any multimedia related issues",
      "Maintain and organize all multimedia social sites (YouTube and Facebook)",
    ],
    tech: [
      "Live Streaming",
      "Pro Presenter",
      "OBS Studio",
      "Open Source Software",
      "Google Drive",
      "Technical Support",
      "Social Media Management",
      "Multimedia Production",
    ],
  },
  {
    role: "Supply Chain Tech Lead - Supply Chain Management",
    company: "Northside Forsyth Hospital",
    location: "Cumming, GA",
    period: "January 2016 - August 2021",
    description: [
      "Large scale inventory management",
      "Placed daily orders to fulfill warehouse stock",
      "Planned and executed new procedures to establish the most efficient process to complete daily tasks",
      "Communicated with vendors to coordinate returns or shipments of products",
      "Picked tickets for materials of assigned departments",
      "Coordinated efficient storage areas to optimize materials movements and minimize labor hours",
    ],
    tech: [
      "Supply Chain Management",
      "Inventory Management",
      "Vendor Relations",
      "Process Optimization",
      "Warehouse Operations",
    ],
  },
  {
    role: "Retail Sales Consultant",
    company: "Prime Communications, AT&T Retailer",
    location: "Kennesaw, GA",
    period: "Apr 2014 – Dec 2015",
    description: [
      "Cash handling and Point of Sale operations.",
      "Supervised multiple people and helped exceed sales goals.",
      "Responsible for end of day procedure and deposit.",
      "Customer service and follow-up calls.",
    ],
    tech: ["Sales", "POS Systems", "Customer Service"],
  },
];

export function Experience() {
  const [showCV, setShowCV] = useState(false);
  const { isDark } = useTheme();
  return (
    <Section id="experience" variant="card" className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2
          className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
            isDark ? "from-cyan-400 to-blue-400" : "from-cyan-600 to-blue-600"
          }`}
        >
          Experience
        </h2>{" "}
        <Button
          onClick={() => setShowCV(true)}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500/80 text-zinc-900 font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors backdrop-blur"
        >
          <FileDown className="w-5 h-5" />
          View CV
        </Button>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role + exp.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative rounded-2xl border shadow-lg p-6 backdrop-blur transition-all duration-300 ${
              isDark
                ? "bg-zinc-800/80 border-cyan-700/30 shadow-cyan-500/10"
                : "bg-white/80 border-gray-200/50 shadow-gray-900/10"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Briefcase
                className={`w-5 h-5 ${
                  isDark ? "text-cyan-400" : "text-cyan-600"
                }`}
              />
              <span
                className={`text-lg font-semibold ${
                  isDark ? "text-zinc-100" : "text-gray-900"
                }`}
              >
                {exp.role}
              </span>
            </div>
            <div
              className={`flex flex-wrap items-center gap-2 mb-1 text-sm ${
                isDark ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              <span>{exp.company}</span>
              <span className="mx-1">•</span>
              <span>{exp.location}</span>
              <span className="mx-1">•</span>
              <span>{exp.period}</span>
            </div>
            <ul
              className={`list-disc list-inside mb-2 text-base space-y-1 ${
                isDark ? "text-zinc-300" : "text-gray-700"
              }`}
            >
              {" "}
              {exp.description.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              {exp.tech.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-xs font-mono border transition-all duration-200 ${
                    isDark
                      ? "bg-cyan-700/20 text-cyan-300 border-cyan-700/40 hover:bg-cyan-700/30"
                      : "bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CV Modal */}
      <AnimatePresence>
        {showCV && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setShowCV(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-zinc-900/95 border border-cyan-400/30 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="w-full px-6 pt-6 pb-2 bg-zinc-900/90 border-b border-cyan-700/30">
                <h3 className="text-2xl font-bold text-cyan-400 mb-1">My CV</h3>
                <p className="text-zinc-400 text-base">
                  Professional Experience & Education
                </p>
              </div>
              {/* CV Preview */}
              <div className="flex-1 w-full flex justify-center items-center bg-zinc-800/80 p-4 overflow-auto">
                <iframe
                  src="/cv.pdf"
                  className="w-full h-[70vh] rounded-lg border border-cyan-400/20"
                  title="CV Preview"
                />
              </div>
              {/* Modal Footer */}
              <div className="w-full px-6 py-4 bg-zinc-900/90 border-t border-cyan-700/30 flex justify-end gap-3">
                <Button
                  variant="destructive"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold"
                  onClick={() => setShowCV(false)}
                >
                  <X className="w-5 h-5" />
                  Close
                </Button>
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500/80 text-zinc-900 font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors backdrop-blur"
                >
                  <FileDown className="w-5 h-5" />
                  Download
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
