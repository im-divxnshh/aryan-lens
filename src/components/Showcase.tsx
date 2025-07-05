'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useInView } from 'react-intersection-observer';

import Image1 from '@/assets/photos/1.jpg';
import Image2 from '@/assets/photos/2.jpg';
import Image3 from '@/assets/photos/3.jpg';
import Image4 from '@/assets/photos/4.jpg';
import Image5 from '@/assets/photos/5.jpg';
import Image6 from '@/assets/photos/6.jpg';

type PhotoProject = {
  src: StaticImageData;
  title: string;
  type?: 'photo';
};

type VideoProject = {
  src: string;
  title: string;
  type: 'video';
};

type Project = PhotoProject | VideoProject;

const allProjects: Record<'photography' | 'film', Project[]> = {
  photography: [
    { src: Image1, title: 'Ganesh Ji' },
    { src: Image2, title: 'Temple Vibes' },
    { src: Image3, title: 'Kids Bliss' },
    { src: Image4, title: 'Kids Era' },
    { src: Image5, title: 'Pets Blossom' },
    { src: Image6, title: 'Outside Vibe' },
  ],
  film: [
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/vr-study-group.appspot.com/o/aryan%20videos%20website%2FThe%20Diary.mp4?alt=media&token=cb423ecd-f8ed-4e43-bc38-6c81aa8c5962',
      title: 'The Diary - Short Film',
      type: 'video',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/vr-study-group.appspot.com/o/aryan%20videos%20website%2F2.mp4?alt=media&token=317220cb-390d-405e-bdd0-9cf523bfc1bf',
      title: 'Portrait Video',
      type: 'video',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/vr-study-group.appspot.com/o/aryan%20videos%20website%2F3.mp4?alt=media&token=d97a0017-4085-4f1b-bf07-444dbae16b7b',
      title: 'Farewell 2025',
      type: 'video',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/vr-study-group.appspot.com/o/aryan%20videos%20website%2F4.mp4?alt=media&token=20e7e475-3333-49cb-9e9f-e785b35f17e2',
      title: 'Event Cover - 1',
      type: 'video',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/vr-study-group.appspot.com/o/aryan%20videos%20website%2F5.mp4?alt=media&token=d6a7e702-5d5f-46c4-bcf0-7d7c778d2248',
      title: 'Event Cover - 2',
      type: 'video',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/vr-study-group.appspot.com/o/aryan%20videos%20website%2F1.mp4?alt=media&token=1a94e291-a67c-4217-9edf-a661c094fd67',
      title: 'Gopal Sons Client',
      type: 'video',
    },
  ],
};

function isEmbedUrl(url: string) {
  return url.includes('youtube.com') || url.includes('vimeo.com');
}

function LazyVideo({ src }: { src: string; title: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // trigger faster
  });

  return (
    <div ref={ref} className="w-full h-full">
      {inView ? (
        <video
          src={src}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover rounded-2xl transition-all duration-500 ease-in"
        />
      ) : (
        <div className="w-full h-full aspect-[9/16] bg-zinc-900 flex items-center justify-center text-sm text-zinc-500">
          Preparing video...
        </div>
      )}
    </div>
  );
}


export default function Showcase() {
  const [activeTab, setActiveTab] = useState<'photography' | 'film'>('photography');

  return (
    <section className="relative z-10 min-h-screen px-6 py-20 bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-600 text-transparent bg-clip-text drop-shadow-xl">
          ⚡ Showcase Portal
        </h2>
        <p className="text-zinc-400 mt-2 text-lg">Visual experience in Photography & Film</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-16">
        <div className="flex space-x-10 border-b border-zinc-700 pb-2">
          {(['photography', 'film'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`text-lg font-semibold relative transition-all duration-300 ease-in-out cursor-pointer ${activeTab === type ? 'text-cyan-400' : 'text-zinc-400 hover:text-fuchsia-400'
                }`}
            >
              {type.toUpperCase()}
              {activeTab === type && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {allProjects[activeTab].map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl p-3 rounded-3xl relative overflow-hidden shadow-xl group transition-all duration-300 cursor-pointer"
            >
              <div
                className={`relative w-full overflow-hidden rounded-2xl border border-zinc-800 shadow-inner ${project.type === 'video' ? 'aspect-[9/16]' : 'aspect-[4/3]'
                  }`}
              >
                {project.type === 'video' ? (
                  isEmbedUrl(project.src) ? (
                    <iframe
                      src={project.src}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      className="w-full h-full absolute top-0 left-0 object-contain rounded-2xl"
                    />
                  ) : (
                    <LazyVideo src={project.src} title={project.title} />
                  )
                ) : (
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain rounded-2xl transition-transform duration-500"
                  />
                )}
              </div>


              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-semibold text-lg">{project.title}</p>
              </div>

              {/* Hover glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.08 }}
                className="absolute inset-0 bg-cyan-400 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
