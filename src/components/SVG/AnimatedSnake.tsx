'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let t = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);

    const snake = {
      points: [] as { x: number; y: number }[],
      length: 100,
      speed: 0.02,
    };

    const animate = () => {
      t += snake.speed;

      const x = width / 2 + Math.sin(t * 2) * width * 0.4;
      const y = height / 2 + Math.cos(t * 3) * height * 0.3;

      snake.points.push({ x, y });
      if (snake.points.length > snake.length) {
        snake.points.shift();
      }

      // Clear with low opacity to create trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'hsl(' + (t * 200 % 360) + ', 100%, 65%)';

      for (let i = 0; i < snake.points.length - 1; i++) {
        const p1 = snake.points[i];
        const p2 = snake.points[i + 1];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }

      ctx.stroke();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
