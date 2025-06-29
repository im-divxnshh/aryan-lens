'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

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

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<'photography' | 'film'>('photography');

  return (
    <section className="py-20 px-4 bg-black text-white">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        Projects Showcase
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-10 space-x-6">
        {(['photography', 'film'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-6 py-2 rounded-full border-2 font-semibold transition-all cursor-pointer ${
              activeTab === type
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-lg scale-105'
                : 'border-purple-500 text-purple-300 hover:bg-purple-500/10'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {allProjects[activeTab].map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl shadow-xl bg-gray-900"
            >
              <div
                className={`relative w-full overflow-hidden border border-purple-500 rounded-2xl bg-black ${
                  project.type === 'video' ? 'aspect-[9/16]' : 'aspect-video'
                }`}
              >
                {project.type === 'video' ? (
                  isEmbedUrl(project.src) ? (
                    <iframe
                      src={project.src}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      className="w-full h-full absolute top-0 left-0 object-contain"
                    />
                  ) : (
                    <video
                      src={project.src}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-white font-medium text-lg">{project.title}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
