'use client';

import { useInView } from 'react-intersection-observer';

export default function LazyVideo({ src }: { src: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div ref={ref} className="w-full h-full">
      {inView ? (
        <video
          src={src}
          muted
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover rounded-2xl"
        />
      ) : (
        <div className="w-full h-full aspect-[9/16] bg-zinc-900 flex items-center justify-center text-sm text-zinc-500">
          Preparing video...
        </div>
      )}
    </div>
  );
}
