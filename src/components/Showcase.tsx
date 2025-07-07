'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import { db } from '@/utils/firebase';

type Media = {
  id: string;
  title: string;
  src: string;
  type: 'photo' | 'video';
  visible: boolean;
  position: number;
};

function LazyVideo({ src, title }: { src: string; title: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
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
  const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
  const [mediaItems, setMediaItems] = useState<Media[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const q = query(collection(db, activeTab), orderBy('position'));
      const snapshot = await getDocs(q);
      const items: Media[] = snapshot.docs
        .map(doc => ({ ...(doc.data() as Media), id: doc.id }))
        .filter(item => item.visible);
      setMediaItems(items);
    };

    fetchMedia();
  }, [activeTab]);

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
          {(['photo', 'video'] as const).map(type => (
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
          {mediaItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl p-3 rounded-3xl relative overflow-hidden shadow-xl group transition-all duration-300 cursor-pointer"
            >
              <div
                className={`relative w-full overflow-hidden rounded-2xl border border-zinc-800 shadow-inner ${item.type === 'video' ? 'aspect-[9/16]' : 'aspect-[4/3]'
                  }`}
              >
                {item.type === 'video' ? (
                  <LazyVideo src={item.src} title={item.title} />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain rounded-2xl transition-transform duration-500"
                  />
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-semibold text-lg">{item.title}</p>
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
