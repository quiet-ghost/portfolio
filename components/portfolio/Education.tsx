import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  BookOpen,
  Award,
  Timer,
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
    status: "completed",
    type: "course",
    skills: ["Algorithms", "Exception Handling", "JavaFX", "Data Structures"],
    description:
      "Advanced Java concepts including Data Structures, Algorithms, JavaFX, Exception Handling, GUI applications.",
  },
  {
    id: "cpp1",
    title: "C++ I",
    institution: "Gwinnett Technical College",
    date: "Spring 2026",
    icon: "devicon:cplusplus",
    status: "upcoming",
    type: "course",
    skills: [
      "Basic Concepts",
      "I/O control",
      "Pointers",
      "Data Managing",
      "Arrays",
    ],
    description:
      "C++ I includes C++ concepts, simple I/O and expressions, I/O and control statements, arrays, pointers, structures, managing data.",
  },
  {
    id: "amazonJrDev",
    title: "Amazon Junior Developer Course",
    institution: "Coursera",
    date: "TBD",
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
    id: "amazonIntroSoftDev",
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
      imagePath:
        "/Certificates/Coursera-6RTCH4DQZY6B-SoftwareDevelopment-1.png",
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
        return isDark ? "#f472b6" : "#ec4899"; // pink for certifications
      case "course":
        return isDark ? "#22d3ee" : "#0891b2"; // cyan for courses
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
        className={`backdrop-blur rounded-xl border-2 shadow-lg p-5 h-full transition-all duration-300 ${
          isDark
            ? "bg-zinc-800/80 shadow-cyan-400/10"
            : "bg-white/80 shadow-gray-900/10"
        }`}
        style={{
          borderColor:
            course.type === "certification"
              ? `${getTypeColor(course.type)}40`
              : isDark
                ? "#3f3f4650"
                : "#e5e7eb50",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4 min-h-[3.5rem]">
              <div
                className="w-12 h-12 rounded-lg border-2 flex items-center justify-center flex-shrink-0"
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
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base font-semibold leading-tight mb-1 line-clamp-2 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {course.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${isDark ? "text-zinc-400" : "text-gray-600"}`}
                >
                  {course.institution}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <Badge
              variant={course.status === "completed" ? "default" : "secondary"}
              className="text-xs font-medium flex items-center gap-1.5 px-2.5 py-1"
              style={{
                backgroundColor: `${getStatusColor(course.status)}20`,
                color: getStatusColor(course.status),
                borderColor: getStatusColor(course.status),
              }}
            >
              {course.status === "completed" && (
                <CheckCircle className="w-3 h-3" />
              )}
              {course.status === "in progress" && <Timer className="w-3 h-3" />}
              {course.status === "upcoming" && <Clock className="w-3 h-3" />}
              {course.status}
            </Badge>
          </div>

          {/* Type and Date */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5"
              style={{
                backgroundColor: `${getTypeColor(course.type)}20`,
                color: getTypeColor(course.type),
              }}
            >
              {course.type === "certification" ? (
                <Award className="w-3 h-3" />
              ) : (
                <BookOpen className="w-3 h-3" />
              )}
              {course.type}
            </span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 opacity-60" />
              <span
                className={`text-xs font-medium ${isDark ? "text-zinc-400" : "text-gray-600"}`}
              >
                {course.date}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className={`text-sm leading-relaxed mb-4 flex-grow ${isDark ? "text-zinc-300" : "text-gray-700"}`}
          >
            {course.description}
          </p>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {course.skills.slice(0, 3).map((skill: string, index: number) => (
                <span
                  key={index}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium ${
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
                  className={`text-xs px-2.5 py-1 font-medium ${isDark ? "text-zinc-500" : "text-gray-500"}`}
                >
                  +{course.skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-700/30">
            <div className="flex items-center gap-4 text-xs font-medium">
              {course.hours && (
                <span className={isDark ? "text-zinc-400" : "text-gray-600"}>
                  {course.hours} hours
                </span>
              )}
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
            <div className="flex gap-2 mt-4">
              {course.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs font-medium"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3 w-3 mr-1.5" />
                    Course
                  </a>
                </Button>
              )}
              {course.hasCertificate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewCertificate(course.certificate);
                  }}
                >
                  <GraduationCap className="h-3 w-3 mr-1.5" />
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
  const [activeTab, setActiveTab] = useState<
    "all" | "courses" | "certifications"
  >("all");
  const { isDark } = useTheme();

  // Dynamic counters
  const completedCourses = courses.filter(
    (c) => c.type === "course" && c.status === "completed",
  ).length;
  const completedCertifications = courses.filter(
    (c) => c.type === "certification" && c.status === "completed",
  ).length;
  const inProgressItems = courses.filter(
    (c) => c.status === "in progress",
  ).length;
  const totalCompleted = completedCourses + completedCertifications;

  // Filter and sort courses based on active tab
  const filteredCourses = courses
    .filter((course) => {
      if (activeTab === "all") return true;
      if (activeTab === "courses") return course.type === "course";
      if (activeTab === "certifications")
        return course.type === "certification";
      return true;
    })
    .sort((a, b) => {
      // Sort by status first (completed, in progress, upcoming)
      const statusOrder = { completed: 0, "in progress": 1, upcoming: 2 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      // Then by type (certifications first)
      if (a.type !== b.type) {
        return a.type === "certification" ? -1 : 1;
      }
      return 0;
    });

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
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-cyan-400" : "text-cyan-600"
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
                className={`text-2xl font-bold ${isDark ? "text-rose-400" : "text-rose-600"}`}
              >
                {completedCertifications}
              </div>
              <div
                className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-600"}`}
              >
                Certifications
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${isDark ? "text-amber-400" : "text-amber-600"}`}
              >
                {inProgressItems}
              </div>
              <div
                className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-600"}`}
              >
                In Progress
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${isDark ? "text-green-400" : "text-green-600"}`}
              >
                {totalCompleted}
              </div>
              <div
                className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-600"}`}
              >
                Total Completed
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("all")}
              className={
                activeTab === "all"
                  ? isDark
                    ? "bg-cyan-600"
                    : "bg-cyan-500"
                  : ""
              }
            >
              All ({courses.length})
            </Button>
            <Button
              variant={activeTab === "courses" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("courses")}
              className={
                activeTab === "courses"
                  ? isDark
                    ? "bg-cyan-600"
                    : "bg-cyan-500"
                  : ""
              }
            >
              Courses ({courses.filter((c) => c.type === "course").length})
            </Button>
            <Button
              variant={activeTab === "certifications" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("certifications")}
              className={
                activeTab === "certifications"
                  ? isDark
                    ? "bg-rose-600"
                    : "bg-rose-500"
                  : ""
              }
            >
              Certifications (
              {courses.filter((c) => c.type === "certification").length})
            </Button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
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
                            <h3 className="text-xl font-bold mb-2 leading-tight">
                              {course.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm opacity-70">
                              <span className="font-medium">
                                {course.institution}
                              </span>
                              <span className="font-medium">{course.date}</span>
                              <span className="capitalize font-medium">
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
                                    <CheckCircle className="w-3 h-3 text-green-500" />
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
                className={`relative rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col ${
                  isDark
                    ? "bg-zinc-900/95 border border-pink-400/30"
                    : "bg-white/95 border border-pink-200"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {currentCertificate && (
                  <>
                    <div
                      className={`w-full px-4 py-3 border-b ${
                        isDark
                          ? "bg-zinc-900/90 border-pink-700/30"
                          : "bg-white/90 border-pink-200"
                      }`}
                    >
                      <h3
                        className={`text-xl font-bold mb-2 flex items-center gap-2 leading-tight ${
                          isDark ? "text-pink-400" : "text-pink-600"
                        }`}
                      >
                        <Award className="w-5 h-5" />
                        {currentCertificate.title}
                      </h3>
                      <p
                        className={`font-medium ${
                          isDark
                            ? "text-zinc-400 text-sm"
                            : "text-gray-600 text-sm"
                        }`}
                      >
                        {currentCertificate.provider} •{" "}
                        {currentCertificate.date}
                      </p>
                    </div>
                    <div
                      className={`flex-1 w-full flex justify-center p-4 ${
                        isDark ? "bg-zinc-800/80" : "bg-gray-50"
                      }`}
                    >
                      <Image
                        src={currentCertificate.imagePath}
                        alt={currentCertificate.title}
                        width={800}
                        height={600}
                        className={`w-full max-h-[60vh] object-contain rounded-lg border-2 ${
                          isDark ? "border-pink-400/20" : "border-pink-200"
                        }`}
                        onError={() =>
                          console.error("Failed to load certificate image")
                        }
                      />
                    </div>
                    <div
                      className={`w-full flex justify-end gap-3 p-3 border-t ${
                        isDark
                          ? "bg-zinc-900/90 border-pink-700/30"
                          : "bg-white/90 border-pink-200"
                      }`}
                    >
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
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-lg transition-colors backdrop-blur ${
                          isDark
                            ? "bg-pink-500/80 text-white shadow-pink-500/20 hover:bg-pink-400"
                            : "bg-pink-500 text-white shadow-pink-500/20 hover:bg-pink-600"
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        Download Certificate
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
