import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.h1
        className="text-4xl font-bold text-blue-600 dark:text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Ghosts Portfolio
      </motion.h1>
    </div>
  );
}