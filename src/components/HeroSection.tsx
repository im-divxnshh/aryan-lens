'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/NavBar';
import AnimatedSnake from '@/components/SVG/AnimatedSnake';
import { ChevronDown } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

export default function HeroSection() {
  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden custom-cursor">
      <AnimatedSnake />
      <Navbar />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg"
        >
          Aryan's World
        </motion.h1>

        {/* Dynamic Typewriter Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-xl md:text-2xl text-zinc-200"
        >
          I'm{' '}
          <span className="text-pink-400 font-semibold">
            <Typewriter
              words={['a Photographer', 'a Filmmaker', 'a Storyteller', 'Aryan']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl max-w-2xl text-zinc-400"
        >
          Crafting stunning visuals through the art of photography and cinematography.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10"
        >
          <motion.button
            onClick={handleScrollToAbout}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px #f472b6' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-zinc-200 transition duration-300 shadow-md flex items-center gap-2 cursor-pointer"
          >
            About Aryan
            <ChevronDown size={20} className="text-black" />
          </motion.button>

        </motion.div>
      </div>
    </section>
  );
}
