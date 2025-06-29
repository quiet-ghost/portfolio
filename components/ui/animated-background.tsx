"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark } = useTheme();

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener("resize", generateParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", generateParticles);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            particle.speedX *= -1;
            newX = Math.max(0, Math.min(window.innerWidth, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            particle.speedY *= -1;
            newY = Math.max(0, Math.min(window.innerHeight, newY));
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient mesh background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isDark 
          ? 'from-cyan-500/5 via-blue-500/5 to-purple-500/5' 
          : 'from-cyan-500/3 via-blue-500/3 to-purple-500/3'
      }`} />
      
      {/* Animated gradient orbs */}
      <motion.div
        className={`absolute w-96 h-96 rounded-full blur-3xl ${
          isDark 
            ? 'bg-gradient-to-r from-cyan-400/10 to-blue-400/10' 
            : 'bg-gradient-to-r from-cyan-400/5 to-blue-400/5'
        }`}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: "10%",
          top: "20%",
        }}
      />
      
      <motion.div
        className={`absolute w-80 h-80 rounded-full blur-3xl ${
          isDark 
            ? 'bg-gradient-to-r from-purple-400/10 to-pink-400/10' 
            : 'bg-gradient-to-r from-purple-400/5 to-pink-400/5'
        }`}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          right: "15%",
          top: "40%",
        }}
      />
      
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: "60%",
          bottom: "20%",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse follower effect */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/5 to-blue-400/5 blur-2xl pointer-events-none"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}