'use client';

import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      {/* Floating lights */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl top-[-60px] left-[-60px] animate-pulse" />
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl bottom-[-80px] right-[-80px] animate-pulse delay-300" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Let’s Work Together
        </h2>

        {/* Contact Info Card */}
        <motion.div
          whileHover={{
            scale: 1.02,
            rotateX: 5,
            rotateY: 5,
            boxShadow: '0px 15px 30px rgba(255, 255, 255, 0.15)',
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="bg-gray-800/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-left max-w-xl mx-auto shadow-lg"
        >
          <ul className="space-y-6 text-sm md:text-base">
            <li className="flex items-center gap-4">
              <FaPhoneAlt className="text-pink-400 text-xl" />
              <a
                href="tel:+917579632372"
                className="text-white font-medium hover:underline"
              >
                +91 7579632372
              </a>
            </li>
            <li className="flex items-center gap-4">
              <FaEnvelope className="text-purple-400 text-xl" />
              <a
                href="mailto:aryansarcastic77@gmail.com"
                className="text-white font-medium hover:underline"
              >
                aryansarcastic77@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-4">
              <FaInstagram className="text-pink-500 text-xl" />
              <a
                href="https://www.instagram.com/_m_aryann/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                _m_aryann
              </a>
            </li>
            <li className="flex items-center gap-4">
              <FaFacebookF className="text-blue-500 text-xl" />
              <a
                href="#"
                className="text-white hover:underline"
              >
                Not Active :(
              </a>
            </li>
          </ul>

        </motion.div>
      </motion.div>
    </section>
  );
}
