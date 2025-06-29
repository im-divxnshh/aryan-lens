'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Facebook, Instagram, Phone, Camera, Film, Image as ImageIcon, Video } from 'lucide-react';
import Image from 'next/image';
import MainImage from '@/assets/main.jpg';
export default function AboutPage() {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray: React.ReactNode[] = [];
      for (let i = 0; i < 80; i++) {
        const size = Math.random() * 2 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        starArray.push(
          <div
            key={i}
            className="star"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  const bgIcons = [
    <Camera key="camera" />,
    <Film key="film" />,
    <ImageIcon key="image" />,
    <Video key="video" />,
  ];

  return (
    <section id="about" className="relative py-24 px-6 md:px-20 overflow-hidden text-gray-900">
      {/* Background: Neon wave + stars + shaky outlined icons */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        <div className="neon-wave" />
        <div className="star-container">{stars}</div>

        <div className="icon-grid">
          {Array.from({ length: 25 }).map((_, index) => (
            <div key={index} className={`shaky-icon icon-outline icon-${index % 5}`}>
              {bgIcons[index % bgIcons.length]}
            </div>
          ))}
        </div>
      </div>

      {/* Foreground Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Text and Social */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-6 backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-lg border border-white/20 text-white"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 text-transparent bg-clip-text">
            Who is Aryan?
          </h2>
          <p className="text-lg md:text-xl leading-relaxed">
            I’m <strong>Aryan</strong>, a passionate photographer and filmmaker who turns fleeting
            moments into lasting cinematic memories. My lens captures not just light—but life.
          </p>

          <div className="flex gap-4 pt-2">
            <SocialIcon
              href="https://wa.me/7579632372?text=Let's%20make%20it%20together!"
              color="hover:bg-green-100 text-green-600"
            >
              <Phone size={24} />
            </SocialIcon>

            <SocialIcon href="https://www.instagram.com/_m_aryann/" color="hover:bg-pink-100 text-pink-500">
              <Instagram size={24} />
            </SocialIcon>
            <SocialIcon href="" color="hover:bg-blue-100 text-blue-600">
              <Facebook size={24} />
            </SocialIcon>
            <SocialIcon href="mailto:aryansarcastic77@gmail.com" color="hover:bg-red-100 text-red-500">
              <Mail size={24} />
            </SocialIcon>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center md:justify-end relative"
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl group transition-all duration-500">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-400 via-pink-400 to-red-400 blur-2xl opacity-60 group-hover:opacity-80 animate-pulse z-0" />
            <Image
              src={MainImage}
              alt="Aryan"
              fill
              className="object-cover rounded-full relative z-10 transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Internal CSS */}
      <style jsx>{`
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.2;
          filter: blur(1px);
          animation: twinkle ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .neon-wave {
          position: absolute;
          top: 0;
          left: 0;
          height: 200%;
          width: 200%;
          background: radial-gradient(circle at center, #ff00cc 0%, #333399 100%);
          opacity: 0.1;
          animation: neonMotion 10s linear infinite;
          z-index: -1;
        }

        @keyframes neonMotion {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-30%, -30%) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .icon-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 40px;
          padding: 40px;
          pointer-events: none;
          z-index: 0;
        }

        .shaky-icon {
          animation: shaky 3s infinite ease-in-out alternate;
        }

        @keyframes shaky {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(-1px, 1px) rotate(-1deg);
          }
          50% {
            transform: translate(1px, -1px) rotate(1deg);
          }
          75% {
            transform: translate(1px, 1px) rotate(-1deg);
          }
          100% {
            transform: translate(-1px, -1px) rotate(1deg);
          }
        }

       .icon-outline :global(svg) {
  stroke: #fff;
  stroke-width: 1.5;
  fill: none;
  opacity: 0.05;
  width: 48px;
  height: 48px;
}
      `}</style>
    </section>
  );
}

function SocialIcon({
  href,
  color,
  children,
}: {
  href: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 ${color}`}
    >
      {children}
    </a>
  );
}
