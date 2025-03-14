import { motion } from 'framer-motion';


export default function About() {
  return (
    <div className="container p-4 mx-auto">
      <motion.h1 className="text-3xl font-bold">About Me</motion.h1>
      <p className="mt-4">I’m a developer skilled in TypeScript, Tailwind, and more...</p>
    </div>
  );
}