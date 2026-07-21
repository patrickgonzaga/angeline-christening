import React, { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
}

export const Sparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let sparkles: Sparkle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const createSparkle = (x: number, y: number): Sparkle => {
      return {
        x,
        y,
        size: Math.random() * 3 + 1,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.7 + 0.3,
        fadeSpeed: Math.random() * 0.005 + 0.002,
      };
    };

    // Seed sparkles initially
    for (let i = 0; i < 40; i++) {
      sparkles.push(createSparkle(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    const drawSparkle = (sparkle: Sparkle) => {
      if (!ctx) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${sparkle.opacity})`; // Champagne Gold #D4AF37
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#D4AF37';
      ctx.fill();
      ctx.restore();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly add new sparkles
      if (sparkles.length < 60 && Math.random() < 0.1) {
        sparkles.push(createSparkle(Math.random() * canvas.width, canvas.height + 10));
      }

      sparkles.forEach((sparkle, idx) => {
        sparkle.y += sparkle.speedY;
        sparkle.x += sparkle.speedX;
        sparkle.opacity -= sparkle.fadeSpeed;

        if (sparkle.opacity <= 0 || sparkle.y < 0) {
          sparkles[idx] = createSparkle(Math.random() * canvas.width, canvas.height + 10);
        } else {
          drawSparkle(sparkle);
        }
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
