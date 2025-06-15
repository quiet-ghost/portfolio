import { motion } from "framer-motion";
import { Briefcase, FileDown } from "lucide-react";
import Link from "next/link";
import { Section } from "./Section";

const experiences = [
  {
    role: "Student, Computer Programming (AAS)",
    company: "Gwinnett Technical College",
    location: "Lawrenceville, GA",
    period: "2023 – Present",
    description: [
      "Focused on software engineering, web development, and database systems.",
      "Completed coursework in Java, Python, SQL, and modern web technologies."
    ],
    tech: ["Java", "Python", "SQL", "JavaScript", "React", "Next.js", "Tailwind CSS"]
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
      "Continually learn and develop skills relevant to the position."
    ],
    tech: ["Inventory Management", "Team Leadership", "Process Improvement"]
  },
  {
    role: "Receiver - Tackle Warehouse",
    company: "Sports Warehouse, LLC",
    location: "Alpharetta, GA",
    period: "Aug 2021 – Dec 2022",
    description: [
      "Accurately receive all ground/freight inbound product.",
      "Schedule, document, and communicate deliveries and return authorizations.",
      "Work independently and prioritize tasks with no supervisory oversight.",
      "Operate in-house and office software (LibreOffice, Office365, Word, Excel)."
    ],
    tech: ["Receiving", "Documentation", "Office Software"]
  },
  {
    role: "Lead Multimedia/Live Stream Coordinator",
    company: "Journey Church Buford",
    location: "Buford, GA",
    period: "Jan 2006 – Dec 2022",
    description: [
      "Use Pro Presenter, OBS, and other software to distribute services live.",
      "Coordinate with leadership using Google Drive for Sunday Service needs.",
      "Troubleshoot technical and multimedia issues (Pro Presenter, OBS, ISP, etc.).",
      "Maintain and organize all multimedia social sites (YouTube, Facebook)."
    ],
    tech: ["Pro Presenter", "OBS", "Google Drive", "YouTube", "Facebook"]
  },
  {
    role: "Supply Chain Tech Lead - Supply Chain Management",
    company: "Northside Forsyth Hospital",
    location: "Cumming, GA",
    period: "Jan 2016 – Aug 2021",
    description: [
      "Large scale inventory management and daily warehouse orders.",
      "Planned and executed new procedures for efficiency.",
      "Coordinated with vendors for returns and shipments.",
      "Trained new employees on policies and procedures."
    ],
    tech: ["Inventory Management", "Vendor Coordination", "Training"]
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
      "Customer service and follow-up calls."
    ],
    tech: ["Sales", "POS Systems", "Customer Service"]
  }
];

export function Experience() {
  return (
    <Section id="experience" className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-cyan-400">Experience</h2>
        <Link
          href="/CV/Resume Final .pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500/80 text-zinc-900 font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors backdrop-blur"
        >
          <FileDown className="w-5 h-5" />
          Download CV
        </Link>
      </div>
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role + exp.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-2xl bg-zinc-900/80 border border-cyan-700/30 shadow-lg shadow-cyan-500/10 p-6 backdrop-blur"
          >
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span className="text-lg font-semibold text-zinc-100">{exp.role}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-1 text-zinc-400 text-sm">
              <span>{exp.company}</span>
              <span className="mx-1">•</span>
              <span>{exp.location}</span>
              <span className="mx-1">•</span>
              <span>{exp.period}</span>
            </div>
            <ul className="list-disc list-inside text-zinc-300 mb-2 text-base space-y-1">
              {exp.description.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              {exp.tech.map(tech => (
                <span key={tech} className="px-3 py-1 rounded-full bg-cyan-700/20 text-cyan-300 text-xs font-mono border border-cyan-700/40">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
} 