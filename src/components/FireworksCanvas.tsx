import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
}

const COLORS = [
  '#f43f5e', // Rose
  '#fb7185', // Soft Rose
  '#f59e0b', // Amber/Gold
  '#ec4899', // Pink
  '#fbbf24', // Yellow Gold
  '#fda4af', // Blossom pink
];

interface FireworksCanvasProps {
  burstTrigger?: number; // increments on demand
  className?: string;
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({
  burstTrigger = 0,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Trigger burst on prop change
  useEffect(() => {
    if (burstTrigger > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      createBurst(canvas.width * (0.3 + Math.random() * 0.4), canvas.height * (0.2 + Math.random() * 0.25));
    }
  }, [burstTrigger]);

  const createBurst = (x: number, y: number) => {
    // Hard cap on total active particles to prevent lag
    if (particlesRef.current.length > 50) return;

    const count = 30; // Lightweight count
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 2 + 1.2,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial gentle celebratory burst (only twice, does not loop continuously forever)
    const t1 = setTimeout(() => {
      createBurst(width * 0.4, height * 0.25);
    }, 500);
    const t2 = setTimeout(() => {
      createBurst(width * 0.6, height * 0.2);
    }, 1200);

    // Tab visibility handling: pause and flush if hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        particlesRef.current = [];
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      } else {
        if (!animFrameRef.current) {
          animFrameRef.current = requestAnimationFrame(loop);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const loop = () => {
      if (document.hidden) return;

      if (particlesRef.current.length === 0) {
        // Clear canvas completely when idle to free GPU
        ctx.clearRect(0, 0, width, height);
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.vx *= 0.98; // friction
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-20 ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};
