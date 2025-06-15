"use client";
import { useTheme } from "@/components/ThemeProvider";
import { Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, setIsDark } = useTheme();

  const toggleTheme = () => setIsDark(!isDark);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    }
  };

  return (
    <nav
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2 max-w-2xl w-[92vw] flex items-center justify-between px-6 py-2 rounded-full bg-zinc-900/80 backdrop-blur-md"
      style={{
        boxShadow: '0 4px 32px 0 #06b6d433', // soft cyan shadow
      }}
    >
      {/* Desktop Nav */}
      <div className="hidden md:flex flex-1 justify-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
            className="relative px-3 py-1 text-base font-medium text-zinc-100 transition-colors duration-200 hover:text-cyan-400 focus:text-cyan-400 focus:outline-none group"
          >
            {link.name}
            <span className="pointer-events-none absolute left-0 right-0 bottom-0 h-0.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-x-100 group-focus:scale-x-100 scale-x-0 transition-all duration-300 origin-left w-full" />
          </Link>
        ))}
        {/* Light/Dark Toggle */}
        <button
          className="ml-4 p-2 rounded-full bg-transparent hover:bg-[#233554]/80 transition text-[#64ffda]"
          onClick={toggleTheme}
          aria-label="Toggle light/dark mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 rounded-full focus:outline-none text-[#64ffda] bg-transparent hover:bg-[#233554]/80 transition"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Open menu"
      >
        <Menu className="w-7 h-7" />
      </button>
      {/* Light/Dark Toggle for mobile */}
      <button
        className="md:hidden ml-2 p-2 rounded-full bg-transparent hover:bg-[#233554]/80 transition text-[#64ffda]"
        onClick={toggleTheme}
        aria-label="Toggle light/dark mode"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a192f]/95 backdrop-blur rounded-b-2xl border-b border-[#233554]/60 shadow-lg animate-fade-in mt-2">
          <div className="flex flex-col gap-4 px-8 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className="text-[#ccd6f6] font-medium text-lg hover:text-[#64ffda] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 