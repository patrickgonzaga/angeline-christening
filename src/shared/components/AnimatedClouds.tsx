import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedClouds: React.FC = () => {
  const clouds = [
    { id: 1, top: '5%', size: 'w-48 md:w-80 h-16 md:h-24', duration: 50, delay: 0, opacity: 0.2 },
    { id: 2, top: '15%', size: 'w-64 md:w-96 h-20 md:h-32', duration: 75, delay: -15, opacity: 0.15 },
    { id: 3, top: '40%', size: 'w-40 md:w-72 h-14 md:h-20', duration: 42, delay: -7, opacity: 0.18 },
    { id: 4, top: '65%', size: 'w-72 md:w-[450px] h-24 md:h-36', duration: 85, delay: -30, opacity: 0.12 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className={`absolute ${cloud.size} bg-gradient-to-r from-white/30 via-white/50 to-white/10 rounded-full blur-2xl`}
          style={{ top: cloud.top, opacity: cloud.opacity }}
          animate={{
            x: ['-50vw', '100vw'],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: cloud.delay,
          }}
        />
      ))}
    </div>
  );
};
