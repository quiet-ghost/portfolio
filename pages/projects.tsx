import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold">My Projects</h1>
      <motion.div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        {/* Add project cards here */}
        <div className="p-4 bg-white shadow">Project 1</div>
        <div className="p-4 bg-white shadow">Project 2</div>
      </motion.div>
    </div>
  );
}