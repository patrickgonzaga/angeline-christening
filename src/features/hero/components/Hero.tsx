import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronDown } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-16 pb-20 px-4 overflow-hidden bg-gradient-to-b from-blush/20 via-ivory to-blush/10">
      
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent pointer-events-none z-10" />

      {/* Top Header Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center z-20"
      >
        <svg className="w-12 h-12 text-gold animate-bounce mb-2" style={{ animationDuration: '3s' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 18h20v2H2zm2-2h16l-3-7-3 4-2-5-2 5-3-4z" />
        </svg>
        <span className="font-cursive text-3xl md:text-4xl text-gold font-semibold tracking-wide drop-shadow-sm select-none">
          Princess Angeline
        </span>
      </motion.div>

      {/* Hero Body Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full text-center z-20 mt-8">
        
        {/* Large Circular Portrait with Gold Floral Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 50, delay: 0.3 }}
          className="relative w-56 h-56 md:w-72 md:h-72 mb-8"
        >
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/60 animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute inset-[3px] rounded-full border border-gold/40 animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }} />
          
          <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-gold bg-blush shadow-xl">
            <img 
              src="/assets/baby.jpg" 
              alt="Princess Angeline" 
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>

          <div className="absolute -top-1 -right-1 text-gold text-2xl animate-pulse">✦</div>
          <div className="absolute -bottom-1 -left-1 text-gold text-2xl animate-pulse" style={{ animationDelay: '0.8s' }}>✦</div>
        </motion.div>

        {/* Cursive Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-cursive text-5xl md:text-7xl text-plum leading-tight px-4 font-semibold"
        >
          You are invited to Princess Angeline’s <br />
          <span className="text-gold">Christening & Reception</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-sans text-sm md:text-lg text-plum/70 max-w-lg mt-4 italic font-light"
        >
          “A precious gift from above, sent to fill our lives with love.”
        </motion.p>

        {/* Date and Location Quick Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-8 px-4"
        >
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gold/20 shadow-sm text-left">
            <Calendar className="w-6 h-6 text-rose-pink" />
            <div>
              <h4 className="text-[10px] uppercase font-bold text-plum/50 font-sans tracking-widest">Date</h4>
              <p className="text-sm font-bold text-plum font-sans">August 16, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gold/20 shadow-sm text-left">
            <Clock className="w-6 h-6 text-rose-pink" />
            <div>
              <h4 className="text-[10px] uppercase font-bold text-plum/50 font-sans tracking-widest">Time</h4>
              <p className="text-sm font-bold text-plum font-sans">10:00 AM Manila</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gold/20 shadow-sm text-left">
            <MapPin className="w-6 h-6 text-rose-pink" />
            <div>
              <h4 className="text-[10px] uppercase font-bold text-plum/50 font-sans tracking-widest">Locations</h4>
              <p className="text-sm font-bold text-plum font-sans truncate">St. Columban & Harmony</p>
            </div>
          </div>
        </motion.div>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-6"
        >
          <CountdownTimer />
        </motion.div>

        {/* Shimmer Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center px-4"
        >
          <button
            onClick={() => scrollToSection('princess-story')}
            className="btn-shimmer cursor-pointer font-sans font-bold text-plum text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-lg border border-gold/50"
          >
            Open Royal Invitation
          </button>
          
          <button
            onClick={() => scrollToSection('rsvp')}
            className="bg-plum hover:bg-plum/90 transition-all cursor-pointer font-sans font-bold text-white text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-lg border border-rose-pink/30 hover:shadow-rose-pink/20 hover:shadow-xl"
          >
            RSVP Now
          </button>
        </motion.div>

      </div>

      {/* Floating Castle Silhouette */}
      <div className="absolute bottom-0 w-full max-w-5xl opacity-[0.09] pointer-events-none z-0">
        <svg viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-gold">
          <path fill="currentColor" d="M100 400h1000V250H980v-40h-40v40H860V150h-50v100h-30V180H730v70h-50V120h-70v130h-40V90h-80v160h-40V120h-70v130h-50V180h-50v70h-30V150h-50V250H140v-40H100v40z" />
          <path fill="currentColor" d="M600 20l30 80h-60zM490 60l20 70h-40zM710 60l20 70h-40zM350 90l15 70h-30zM850 90l15 70h-30z" />
          <line x1="0" y1="398" x2="1200" y2="398" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        onClick={() => scrollToSection('princess-story')}
        className="absolute bottom-4 flex flex-col items-center cursor-pointer text-plum/50 hover:text-plum transition-colors z-20"
      >
        <span className="text-[10px] font-sans uppercase tracking-widest font-semibold mb-1">Discover more</span>
        <ChevronDown className="w-4 h-4 text-gold" />
      </motion.div>

    </section>
  );
};
