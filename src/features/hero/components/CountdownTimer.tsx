import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  // Target: August 16, 2026 at 10:00 AM (Asia/Manila is UTC+8)
  const targetDate = new Date("2026-08-16T10:00:00+08:00").getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isEventPassed = targetDate <= new Date().getTime();

  if (isEventPassed) {
    return (
      <div className="flex flex-col items-center justify-center my-6 px-4">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gold/40 shadow-md border-glow-gold">
          <span className="text-gold text-base animate-pulse">✦</span>
          <span className="font-sans text-xs md:text-sm font-bold text-plum uppercase tracking-widest">
            Christened with Love • August 16, 2026
          </span>
          <span className="text-gold text-base animate-pulse">✦</span>
        </div>
        <p className="font-cursive text-2xl md:text-3xl text-plum/90 mt-2 font-medium">
          Welcome to the Christian World, Princess Angeline!
        </p>
      </div>
    );
  }

  const timeItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-5 my-8">
      {timeItems.map((item, idx) => (
        <div 
          key={idx}
          className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-md border border-gold/30 rounded-2xl w-16 h-20 md:w-24 md:h-28 shadow-md border-glow-gold hover:scale-105 transition-transform"
        >
          <span className="font-sans font-bold text-2xl md:text-4xl text-plum">{String(item.value).padStart(2, '0')}</span>
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-widest text-rose-pink mt-1 md:mt-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
