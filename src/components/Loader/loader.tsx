'use client';

import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold"
      >
        Aryan's Lens
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-xl md:text-2xl"
      >
        Capturing Moments, Creating Stories
      </motion.p>
    </section>
  );
}
