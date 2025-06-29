'use client';

import { motion } from 'framer-motion';
import { FaCameraRetro, FaVideo, FaUser } from 'react-icons/fa';

const services = [
  {
    title: 'Wedding Photography',
    description: 'Timeless memories of your special day',
    priceNote: '₹700 for 1 reel (under 2 mins, includes editing & photos)',
    gradient: 'from-pink-500 to-red-400',
    icon: <FaCameraRetro className="text-4xl text-white" />,
  },
  {
    title: 'Cinematic Videography',
    description: 'High-quality storytelling videos',
    priceNote: 'Rates flexible – includes editing and photo coverage',
    gradient: 'from-purple-600 to-indigo-500',
    icon: <FaVideo className="text-4xl text-white" />,
  },
  {
    title: 'Portraits & Lifestyle',
    description: 'Professional studio and outdoor shoots',
    priceNote: 'Flexible pricing with editing and photo package',
    gradient: 'from-yellow-400 to-orange-500',
    icon: <FaUser className="text-4xl text-white" />,
  },
];

const whatsappNumber = '7579632372';

function generateWhatsappLink(service: string) {
  const message = encodeURIComponent(`Hey Aryan, I'm interested in your ${service.toLowerCase()} service.`);
  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

const sparkleVariants = {
  initial: {
    scale: 0,
    opacity: 0,
    x: 0,
    y: 0,
  },
  animate: {
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    x: [0, -10, 10, 0],
    y: [0, -10, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
    },
  },
};

export default function Services() {
  return (
    <section className="py-20 px-6 bg-black text-white relative overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        Our Services
      </h2>

      {/* Sparkle trails */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full blur-sm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.2,
          }}
          variants={sparkleVariants}
          initial="initial"
          animate="animate"
        />
      ))}

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ scale: 1.05, rotate: [0, 1.5, -1.5, 0] }}
            className={`relative bg-gradient-to-br ${service.gradient} p-1 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300`}
          >
            <div className="bg-black rounded-3xl p-6 h-full flex flex-col justify-between border border-white/10 shadow-inner">
              <div className="mb-4 flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  {service.icon}
                </div>
                <h3 className="text-xl font-extrabold text-white">{service.title}</h3>
              </div>
              <p className="text-sm mb-2 text-gray-200">{service.description}</p>
              <p className="text-xs italic text-gray-400 mb-4">{service.priceNote}</p>
              <a
                href={generateWhatsappLink(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block text-center py-2 px-4 rounded-full font-semibold bg-white text-black hover:bg-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
