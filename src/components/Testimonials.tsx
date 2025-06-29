'use client';

import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  name: string;
  quote: string;
  role: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ria Kapoor",
    quote: "Aryan made our wedding unforgettable! The photos were dreamy and emotional. Highly recommended!",
    role: "Bride, Delhi",
    initials: "R",
  },
  {
    name: "Kabir Malhotra",
    quote: "His work brings moments to life. Every frame feels alive with emotion. Superb quality!",
    role: "Event Organizer",
    initials: "K",
  },
  {
    name: "Tanvi Sharma",
    quote: "We got a portrait shoot done and it exceeded expectations. The vibe, editing – all 10/10!",
    role: "Model & Influencer",
    initials: "T",
  },
  {
    name: "Nikhil Verma",
    quote: "Aryan’s team captured our college fest with such color and energy. Super impressed!",
    role: "Student, SRCC",
    initials: "N",
  },
  {
    name: "Shruti Joshi",
    quote: "The cinematic reels we got for Instagram blew up! Editing skills are top notch.",
    role: "Content Creator",
    initials: "S",
  },
  {
    name: "Manav Mehta",
    quote: "Professionalism, creativity and quick delivery — what more do you want? Loved the event shoot!",
    role: "Entrepreneur",
    initials: "M",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white via-gray-100 to-purple-50 text-gray-800 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-[-4rem] left-[-4rem] w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-[-4rem] right-[-4rem] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500" />

      <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
        What People Are Saying
      </h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              rotate: [0, 1.5, -1.5, 0],
              transition: { duration: 0.5 },
            }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.15,
              duration: 0.6,
              ease: 'easeOut',
              type: 'spring',
              damping: 10,
              stiffness: 80,
            }}
            className="relative bg-white p-6 rounded-3xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform-gpu"
          >
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 text-white flex items-center justify-center rounded-full font-bold text-lg shadow-md mb-4">
              {t.initials}
            </div>

            {/* Quote Icon */}
            <FaQuoteLeft className="text-purple-400 text-xl mb-2" />

            {/* Quote */}
            <p className="italic text-sm text-gray-700 leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            {/* Name and role */}
            <div className="mt-4">
              <p className="font-semibold text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
