import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  r: number; // rotation
  d: number; // density/sway rate
  size: number;
  speedY: number;
  speedX: number;
  color: string;
}

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const petalColors = [
      'rgba(248, 215, 232, 0.65)', // Blush Pink #F8D7E8
      'rgba(239, 163, 200, 0.75)', // Rose Pink #EFA3C8
      'rgba(239, 163, 200, 0.55)',
      'rgba(255, 249, 244, 0.8)'   // Ivory #FFF9F4 (mixed in for lightness)
    ];

    const createPetal = (startY = -20): Petal => {
      return {
        x: Math.random() * canvas.width,
        y: startY,
        r: Math.random() * Math.PI * 2,
        d: Math.random() * 0.02 + 0.005,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.0 + 0.8,
        speedX: Math.random() * 0.6 - 0.1, // slightly drifting right
        color: petalColors[Math.floor(Math.random() * petalColors.length)]
      };
    };

    // Seed initial petals at various heights
    for (let i = 0; i < 25; i++) {
      petals.push(createPetal(Math.random() * canvas.height));
    }

    const drawPetal = (petal: Petal) => {
      if (!ctx) return;
      ctx.save();
      ctx.beginPath();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.r);
      
      // Draw a rose petal shape using bezier curves
      ctx.moveTo(0, -petal.size);
      ctx.bezierCurveTo(petal.size / 2, -petal.size, petal.size, -petal.size / 2, petal.size / 2, petal.size / 2);
      ctx.bezierCurveTo(0, petal.size, -petal.size / 2, petal.size, -petal.size / 2, petal.size / 2);
      ctx.bezierCurveTo(-petal.size, -petal.size / 2, -petal.size / 2, -petal.size, 0, -petal.size);
      
      ctx.fillStyle = petal.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(239, 163, 200, 0.3)';
      ctx.fill();
      ctx.restore();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (petals.length < 35 && Math.random() < 0.05) {
        petals.push(createPetal(-20));
      }

      petals.forEach((petal, idx) => {
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y * petal.d) * 0.4;
        petal.r += petal.d * 0.5;

        // Reset if offscreen
        if (petal.y > canvas.height + 20 || petal.x < -20 || petal.x > canvas.width + 20) {
          petals[idx] = createPetal(-20);
        } else {
          drawPetal(petal);
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
    />
  );
};
