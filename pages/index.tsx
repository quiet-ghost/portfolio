"use client"
import { motion } from 'framer-motion';
import Head from 'next/head';


export default function Home() {
  return (
    <>
      <Head>
        <title>Kevin Sclafani - Software Engineer</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <motion.h1
          className="text-4xl font-bold text-slate-600 dark:text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            scale: [1, 1.1, 1.1, 1, 1],
            transition: {duration: 2}
          }}
        >
          Welcome to my portfolio!
        </motion.h1>

        <div className="mt-4 text-xl text-center text-zinc-400">
          <motion.h4
            className="text-xl font-bold text-slate-600 dark:text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {duration: 2}
            }}
            >
            My name is{' '}
          <span className="text-2xl font-bold opacity-100 text-slate-600 dark:text-blue-400">Kevin Sclafani</span>
          <p className="mt-4 text-xl text-center">
          I&apos;m a{' '}
          <span className="text-2xl font-bold opacity-100 text-slate-600 dark:text-blue-400">Software Engineer</span>{' '}
          looking to expand my skills and experience. Here is my journey thus far and what I&apos;m looking to accomplish. Some join me in the adventure that is software development.
        </p>
          </motion.h4>
        </div>
        
      </div>
    </>
  );
}