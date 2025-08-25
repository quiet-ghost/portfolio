import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  GraduationCap,
  X,
  Code,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Section } from "./Section";
import { Icon } from "@iconify/react";

// Course interface
interface Course {
  id: string;
  title: string;
  institution: string;
  date: string;
  icon: string;
  status: "completed" | "in progress" | "upcoming";
  type: "course" | "certification";
  skills: string[];
  description: string;
  link?: string;
  hasCertificate?: boolean;
  hours?: number;
  certificate?: {
    title: string;
    provider: string;
    date: string;
    imagePath: string;
  };
}

// Course data
const courses: Course[] = [
  {
    id: "webdev1",
    title: "Web Development 1",
    institution: "Gwinnett Technical College",
    date: "Fall 2024",
    icon: "devicon:html5",
    status: "completed",
    type: "course",
    skills: ["HTML5", "CSS3", "Responsive Design", "Web Accessibility"],
    description:
      "Foundation of web development with semantic HTML and modern CSS. Learned to create responsive, accessible websites using modern web standards.",
  },
  {
    id: "sql",
    title: "SQL Database Management",
    institution: "Gwinnett Technical College",
    date: "Spring 2025",
    icon: "devicon:mysql",
    status: "completed",
    type: "course",
    skills: [
      "SQL",
      "Database Design",
      "Data Modeling",
      "MySQL",
      "Query Optimization",
    ],
    description:
      "Comprehensive database management covering relational database design, SQL queries, and performance optimization.",
  },
  {
    id: "python1",
    title: "Python Programming",
    institution: "Gwinnett Technical College",
    date: "Spring 2025",
    icon: "devicon:python",
    status: "completed",
    type: "course",
    skills: [
      "Python Syntax",
      "Variables & Data Types",
      "Control Structures",
      "Functions",
      "File I/O",
    ],
    description:
      "Introduction to programming using Python. Covered fundamental programming concepts and problem-solving techniques.",
  },
  {
    id: "ztm-python",
    title: "Complete Python Developer",
    institution: "Zero to Mastery",
    date: "Spring 2025",
    icon: "devicon:python",
    status: "completed",
    type: "certification",
    skills: [
      "Advanced Python",
      "Web Scraping",
      "APIs",
      "Testing",
      "Django",
      "Flask",
      "Data Science",
    ],
    description:
      "Comprehensive Python certification covering web development, data science, and professional development practices.",
    link: "https://zerotomastery.io/courses/learn-python/",
    hasCertificate: true,
    hours: 30,
    certificate: {
      title: "Python Programming Certification",
      provider: "Zero to Mastery",
      date: "Summer 2025",
      imagePath: "/Certificates/python-cert-1.png",
    },
  },
  {
    id: "java1",
    title: "Java Programming 1",
    institution: "Gwinnett Technical College",
    date: "Summer 2025",
    icon: "devicon:java",
    status: "completed",
    type: "course",
    skills: [
      "Java Syntax",
      "OOP Principles",
      "Inheritance",
      "Polymorphism",
      "Exception Handling",
    ],
    description:
      "Object-oriented programming using Java. Emphasis on design patterns, inheritance, and professional coding practices.",
  },
  {
    id: "java2",
    title: "Java Programming 2",
    institution: "Gwinnett Technical College",
    date: "Fall 2025",
    icon: "devicon:java",
    status: "in progress",
    type: "course",
    skills: [
      "JDBC",
      "Multithreading",
      "Socket Programming",
      "RMI",
      "Enterprise Patterns",
    ],
    description:
      "Advanced Java concepts including database connectivity, concurrent programming, and distributed systems.",
  },
  {
    id: "amazonJrDev",
    title: "Amazon Junior Developer Course",
    institution: "Coursera",
    date: "Summer/Fall 2025",
    icon: "devicon:java",
    status: "in progress",
    type: "certification",
    skills: [
      "Java",
      "Systems Development",
      "Full-Stack Development",
      "SQL",
      "Generative AI",
      "JUnit",
      "SDLC",
      "Object-oriented Programming",
      "Test Driven Development",
    ],
    description:
      "Java programming, object-oriented design, data structures, algorithms, SQL, and full-stack web development with Spring Boot through hands-on projects.",
    link: "https://www.coursera.org/professional-certificates/amazon-junior-software-developer",
  },
  {
    id: "amazonJrDev",
    title: "Amazon Introduction to Software Development",
    institution: "Coursera",
    date: "Summer 2025",
    icon: "devicon:java",
    status: "completed",
    type: "certification",
    skills: [
      "Java",
      "Program Development",
      "Programming Principles",
      "SDLC",
      "Object-oriented Programming",
      "Test Driven Development",
    ],
    description:
      "Java programming, object-oriented design, data structures, algorithms.",
    link: "https://www.coursera.org/account/accomplishments/verify/6RTCH4DQZY6B",
    hasCertificate: true,
    certificate: {
      title: "Amazon Introduction to Software Development",
      provider: "Coursera",
      date: "Summer 2025",
      imagePath: "/Certificates/Coursera 6RTCH4DQZY6B-SoftwareDevelopment.pdf",
    },
  },
];

// Course Card Component
function CourseCard({
  course,
  isDark,
  onClick,
  onViewCertificate,
}: {
  course: Course;
  isDark: boolean;
  onClick: () => void;
  onViewCertificate: (certificate: Course["certificate"]) => void;
}) {
  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "completed":
        return isDark ? "#22c55e" : "#16a34a"; // green
      case "upcoming":
        return isDark ? "#f59e0b" : "#d97706"; // amber
      default:
        return isDark ? "#22d3ee" : "#0891b2"; // cyan
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "certification":
        return isDark ? "#fb7185" : "#e11d48"; // rose
      case "course":
        return isDark ? "#22d3ee" : "#0891b2"; // cyan
      default:
        return isDark ? "#22d3ee" : "#0891b2";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card
        className={`backdrop-blur rounded-xl border shadow-lg p-6 h-full transition-all duration-300 ${
          isDark
            ? "bg-zinc-800/80 border-zinc-700/50 hover:border-zinc-600 shadow-cyan-400/10"
            : "bg-white/80 border-gray-200/50 hover:border-gray-300 shadow-gray-900/10"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg border-2 flex items-center justify-center"
                style={{
                  backgroundColor: isDark ? "#18181b" : "#ffffff",
                  borderColor: getTypeColor(course.type),
                  boxShadow: `0 0 15px ${getTypeColor(course.type)}30`,
                }}
              >
                <Icon
                  icon={course.icon}
                  className="w-6 h-6"
                  style={{ color: getTypeColor(course.type) }}
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {course.title}
                </h3>
                <p
                  className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-600"}`}
                >
                  {course.institution}
                </p>
              </div>
            </div>

            {/* Status indicator */}
            <div
              className="w-4 h-4 rounded-full border-2"
              style={{
                backgroundColor: getStatusColor(course.status),
                borderColor: isDark ? "#18181b" : "#ffffff",
              }}
            />
          </div>

          {/* Type and Date */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: `${getTypeColor(course.type)}20`,
                color: getTypeColor(course.type),
              }}
            >
              {course.type}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 opacity-60" />
              <span
                className={`text-xs ${isDark ? "text-zinc-400" : "text-gray-600"}`}
              >
                {course.date}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className={`text-sm mb-4 flex-grow ${isDark ? "text-zinc-300" : "text-gray-700"}`}
          >
            {course.description}
          </p>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {course.skills.slice(0, 3).map((skill: string, index: number) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs ${
                    isDark
                      ? "bg-zinc-700/50 text-zinc-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {skill}
                </span>
              ))}
              {course.skills.length > 3 && (
                <span
                  className={`text-xs px-2 py-1 ${isDark ? "text-zinc-500" : "text-gray-500"}`}
                >
                  +{course.skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-700/30">
            <div className="flex items-center gap-4 text-xs">
              {course.hours && <span>{course.hours} hours</span>}
            </div>

            {course.status === "completed" && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
            {course.status === "upcoming" && (
              <Clock className="w-4 h-4 text-amber-500" />
            )}
          </div>

          {/* Action buttons */}
          {(course.link || course.hasCertificate) && (
            <div className="flex gap-2 mt-3">
              {course.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Course
                  </a>
                </Button>
              )}
              {course.hasCertificate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewCertificate(course.certificate);
                  }}
                >
                  <GraduationCap className="h-3 w-3 mr-1" />
                  Certificate
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export function Education() {
  const [showCert, setShowCert] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState<
    Course["certificate"] | null
  >(null);
  const { isDark } = useTheme();

  const completedCourses = courses.filter(
    (c) => c.status === "completed",
  ).length;

  return (
    <Section id="education" variant="card" className="max-w-6xl mx-auto">
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
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDark ? "from-cyan-400 to-blue-400" : "from-cyan-600 to-blue-600"
            }`}
          >
            Education & Certifications
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto mb-6 ${
              isDark ? "text-zinc-400" : "text-gray-600"
            }`}
          >
            My academic journey in software development and programming
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
              >
                {completedCourses}
              </div>
              <div
                className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-600"}`}
              >
                Courses Completed
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
              >
                2
              </div>
              <div
                className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-600"}`}
              >
                Certification
              </div>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.5 },
                y: { duration: 0.7 },
                scale: { duration: 0.7 },
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <CourseCard
                course={course}
                isDark={isDark}
                onClick={() => {
                  setSelectedCourse(course.id);
                  setShowDetails(true);
                }}
                onViewCertificate={(certificate) => {
                  setCurrentCertificate(certificate || null);
                  setShowCert(true);
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Course Detail Modal */}
        <AnimatePresence>
          {showDetails && selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
              onClick={() => setShowDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`relative rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden ${
                  isDark
                    ? "bg-zinc-900/95 border border-zinc-700"
                    : "bg-white/95 border border-gray-200"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const course = courses.find((c) => c.id === selectedCourse);
                  if (!course) return null;

                  return (
                    <>
                      {/* Header */}
                      <div
                        className={`px-6 py-4 border-b ${isDark ? "border-zinc-700" : "border-gray-200"}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-1">
                              {course.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm opacity-70">
                              <span>{course.institution}</span>
                              <span>{course.date}</span>
                              <span className="capitalize">
                                {course.status}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDetails(false)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 overflow-y-auto max-h-[60vh]">
                        <div className="space-y-6">
                          {/* Description */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3">
                              Course Description
                            </h4>
                            <p className="text-sm leading-relaxed">
                              {course.description}
                            </p>
                          </div>

                          {/* Skills */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <Code className="w-5 h-5" />
                              Skills Learned ({course.skills.length})
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {course.skills.map(
                                (skill: string, index: number) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex items-center gap-3 p-3 rounded-lg ${
                                      isDark
                                        ? "bg-zinc-800/50 border border-zinc-700"
                                        : "bg-gray-50 border border-gray-200"
                                    }`}
                                  >
                                    <span className="text-green-500 font-mono text-sm">
                                      ✓
                                    </span>
                                    <span className="font-medium">{skill}</span>
                                  </motion.div>
                                ),
                              )}
                            </div>
                          </div>

                          {/* Course Details */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <FileText className="w-5 h-5" />
                              Course Information
                            </h4>
                            <div
                              className={`p-4 rounded-lg ${
                                isDark
                                  ? "bg-zinc-800/50 border border-zinc-700"
                                  : "bg-gray-50 border border-gray-200"
                              }`}
                            >
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="opacity-70">
                                    Institution:
                                  </span>
                                  <p className="font-medium">
                                    {course.institution}
                                  </p>
                                </div>
                                <div>
                                  <span className="opacity-70">Date:</span>
                                  <p className="font-medium">{course.date}</p>
                                </div>
                                <div>
                                  <span className="opacity-70">Type:</span>
                                  <p className="font-medium capitalize">
                                    {course.type}
                                  </p>
                                </div>
                                <div>
                                  <span className="opacity-70">Status:</span>
                                  <p className="font-medium capitalize">
                                    {course.status}
                                  </p>
                                </div>
                                {course.hours && (
                                  <div>
                                    <span className="opacity-70">
                                      Duration:
                                    </span>
                                    <p className="font-medium">
                                      {course.hours} hours
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action buttons */}
                          {(course.link || course.hasCertificate) && (
                            <div className="flex gap-3 pt-4 border-t border-zinc-700/50">
                              {course.link && (
                                <Button variant="outline" size="sm" asChild>
                                  <a
                                    href={course.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View Course
                                  </a>
                                </Button>
                              )}
                              {course.hasCertificate && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setShowDetails(false);
                                    setCurrentCertificate(
                                      course.certificate || null,
                                    );
                                    setShowCert(true);
                                  }}
                                >
                                  <GraduationCap className="h-4 w-4 mr-2" />
                                  View Certificate
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate Modal */}
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
                className="relative bg-zinc-900/95 border border-cyan-400/30 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {currentCertificate && (
                  <>
                    <div className="w-full px-4 py-3 bg-zinc-900/90 border-b border-cyan-700/30">
                      <h3 className="text-xl font-bold text-cyan-400 mb-1">
                        {currentCertificate.title}
                      </h3>
                      <p className="text-zinc-400 text-sm">
                        {currentCertificate.provider} •{" "}
                        {currentCertificate.date}
                      </p>
                    </div>
                    <div className="flex-1 w-full flex justify-center bg-zinc-800/80 p-2">
                      {currentCertificate.imagePath.endsWith(".pdf") ? (
                        <div className="w-full flex flex-col items-center">
                          {/* Primary: Simple iframe (more reliable) */}
                          <iframe
                            src={currentCertificate.imagePath}
                            className="w-full h-[60vh] rounded-lg border border-cyan-400/20"
                            title={currentCertificate.title}
                            onError={() => {
                              console.error(
                                "iframe failed to load PDF:",
                                currentCertificate.imagePath,
                              );
                              // Could implement react-pdf fallback here if needed
                            }}
                          />
                          {/* Optional: Add a note about browser PDF viewer */}
                          <div className="mt-2 text-xs text-zinc-400 text-center">
                            PDF displayed using browser viewer
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={currentCertificate.imagePath}
                          alt={currentCertificate.title}
                          width={800}
                          height={600}
                          className="w-full max-h-[60vh] object-contain rounded-lg border border-cyan-400/20"
                          onError={() =>
                            console.error("Failed to load certificate image")
                          }
                        />
                      )}
                    </div>
                    <div className="w-full flex justify-end gap-3 p-3 bg-zinc-900/90 border-t border-cyan-700/30">
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
                        onClick={() => setShowCert(false)}
                      >
                        <X className="w-4 h-4" />
                        Close
                      </Button>
                      <a
                        href={currentCertificate.imagePath}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/80 text-zinc-900 font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors backdrop-blur"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
