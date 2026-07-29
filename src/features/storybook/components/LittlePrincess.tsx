import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Moon, Sparkles, Home, Stethoscope, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  image: string;
}

export const LittlePrincess: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      date: 'July 16, 2026',
      title: 'Our Sweet Angel Arrived',
      desc: 'Princess Angeline was born, wrapping our world in endless love, soft yawns, and tiny dreams.',
      icon: Heart,
      image: '/assets/timeline-newborn.png',
    },
    {
      date: 'July 17, 2026',
      title: 'Out of the Hospital and into our forever home',
      desc: 'Leaving the hospital and entering her warm nursery, marking the start of our beautiful journey at home.',
      icon: Home,
      image: '/assets/timeline-home.png',
    },
    {
      date: 'July 20, 2026',
      title: 'Her First Sponge Bath',
      desc: 'Splash, splash! A tiny, gentle sponge bath that left her feeling fresh, clean, and wrapped in warm, cozy towels.',
      icon: Sparkles,
      image: '/assets/timeline-bath.png',
    },
    {
      date: 'July 20, 2026',
      title: 'Crying at 2am',
      desc: 'Welcoming the late-night feeds and midnight diaper changes—exhausting but full of quiet, precious parent-daughter bonding.',
      icon: Moon,
      image: '/assets/timeline-lullaby.png',
    },
    {
      date: 'July 23, 2026',
      title: 'First Pediatrician Checkup',
      desc: 'Her first official clinic visit. The doctor says she is doing fantastic, healthy, and growing strong!',
      icon: Stethoscope,
      image: '/assets/timeline-checkup.png',
    },
    {
      date: 'August 16, 2026',
      title: 'Her Holy Christening',
      desc: 'Consecrated under God’s grace and surrounded by the love of her parents, family, and godparents.',
      icon: Calendar,
      image: '/assets/baby.jpg',
    },
  ];

  const sortedEvents = [...timelineEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx(activePhotoIdx === 0 ? sortedEvents.length - 1 : activePhotoIdx - 1);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx(activePhotoIdx === sortedEvents.length - 1 ? 0 : activePhotoIdx + 1);
    }
  };

  return (
    <section id="princess-story" className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(205,180,219,0.12) 0%, rgba(248,215,232,0.18) 40%, rgba(255,249,244,1) 100%)' }}
    >
      {/* Princess pattern watermark */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'url(/assets/princess-bg-pattern.png)', backgroundSize: '500px auto', backgroundRepeat: 'repeat', opacity: 0.2 }} />
      {/* Soft radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lavender/10 rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* Decorative Top Separator */}
      <div className="flex justify-center mb-12">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="mx-4 text-gold text-lg">❦</div>
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-4 py-1.5 rounded-full">The Storybook</span>
          <h2 className="font-cursive text-5xl md:text-6xl text-plum mt-3 font-semibold">Our Little Princess</h2>
          <p className="font-sans text-xs md:text-sm text-plum/60 italic mt-2">A beautiful chapter of love and gratitude</p>
        </div>

        {/* Storybook Message Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Welcome Book Page */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-between p-8 md:p-12 rounded-3xl bg-white/70 border border-gold/30 shadow-md border-glow-gold relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blush/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="font-sans text-[10px] uppercase font-bold text-rose-pink tracking-widest block mb-2">A Message from the Parents</span>
              <h3 className="font-cursive text-4xl text-plum mb-6 font-semibold">Dear Family & Friends,</h3>
              
              <div className="font-sans text-sm leading-relaxed text-plum/85 space-y-4 font-light">
                <p>
                  Our lives were forever changed when God sent us our greatest treasure, <strong>Angeline Patrice</strong>. 
                  She has filled our home with soft giggles, tiny yawns, and a love deeper than we ever imagined.
                </p>
                <p>
                  As we present our little princess to the Lord in Holy Christening, we feel incredibly blessed to 
                  have you walk beside us in this fairytale. You are the community, the mentors, and the love that 
                  will help guide her steps as she grows.
                </p>
                <p>
                  Thank you for being an indispensable part of her life and for sharing in this milestone. 
                  We look forward to celebrating this beautiful sacrament of faith with all of you.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-rose-pink/10 flex flex-col items-start">
              <span className="font-sans text-xs text-plum/50">With all our love and gratitude,</span>
              <span className="font-cursive text-2xl text-gold font-semibold mt-1">Patrick & Lina</span>
            </div>
          </motion.div>

          {/* Floating Portrait Book Cover */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            onClick={() => setActivePhotoIdx(sortedEvents.findIndex(e => e.image === '/assets/baby.jpg'))}
            className="lg:col-span-5 rounded-3xl bg-plum p-1.5 shadow-xl relative min-h-[300px] flex items-center justify-center overflow-hidden border border-gold/40 group cursor-pointer"
          >
            <div className="absolute inset-2 border border-gold/30 rounded-2xl pointer-events-none" />
            <img 
              src="/assets/baby.jpg" 
              alt="Baby Angeline Swaddled" 
              className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-700 min-h-[340px]" 
            />
            
            <div className="absolute inset-0 bg-plum/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/40 shadow-lg">
                <ZoomIn className="w-6 h-6" />
              </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-plum/30 flex flex-col justify-end p-6 text-white text-left pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white z-10 pointer-events-none">
              <p className="font-sans text-[10px] uppercase font-bold tracking-widest text-gold">The Gonzaga Princess</p>
              <h4 className="font-cursive text-3xl font-semibold mt-1">Angeline Patrice</h4>
            </div>
          </motion.div>
        </div>

        {/* Fairytale Timeline */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="font-cursive text-4xl text-plum font-semibold">Angeline's Fairytale Timeline</h3>
            <p className="font-sans text-xs text-plum/50 italic">Milestones along her royal journey</p>
          </div>

          <div className="relative border-l-2 border-rose-pink/25 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10 py-4">
            {sortedEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <span className="absolute -left-[37px] sm:-left-[45px] top-4 flex items-center justify-center bg-white border-2 border-gold text-gold rounded-full w-7 h-7 shadow-md z-10 hover:scale-110 transition-transform">
                    <Icon className="w-3.5 h-3.5" />
                  </span>

                  <div className="p-5 sm:p-6 rounded-2xl bg-white/70 border border-rose-pink/20 hover:border-gold/40 hover:bg-white/90 transition-all shadow-md flex flex-col md:flex-row gap-5 items-center">
                    {event.image && (
                      <div 
                        onClick={() => setActivePhotoIdx(index)}
                        className="relative group flex-shrink-0 w-full md:w-44 h-44 rounded-xl overflow-hidden border border-gold/30 shadow-sm bg-plum/5 cursor-pointer"
                      >
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-plum/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/40 shadow-lg">
                            <ZoomIn className="w-5 h-5" />
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1 text-left w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[10px] font-bold text-rose-pink uppercase tracking-widest bg-rose-pink/10 px-2.5 py-0.5 rounded-full">
                          {event.date}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-base md:text-lg text-plum mt-2">{event.title}</h4>
                      <p className="font-sans text-xs md:text-sm text-plum/75 mt-2 font-light leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* LIGHTBOX POPUP MODAL FOR TIMELINE PHOTOS */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <div className="absolute top-4 right-4 flex gap-4 text-white z-50">
              <button
                onClick={() => setActivePhotoIdx(null)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/25 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div 
              className="relative w-full max-w-4xl flex items-center justify-center px-8" 
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handlePrevPhoto}
                className="absolute left-0 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/25 transition-all cursor-pointer shadow-lg z-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.div
                key={activePhotoIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-2xl overflow-hidden border border-gold/40 bg-plum shadow-2xl max-h-[75vh]"
              >
                <img
                  src={sortedEvents[activePhotoIdx].image}
                  alt={sortedEvents[activePhotoIdx].title}
                  className="max-w-full max-h-[75vh] object-contain block"
                />
                
                <div className="bg-plum/90 border-t border-gold/20 p-4 text-center">
                  <span className="font-sans text-[10px] font-bold text-rose-pink uppercase tracking-widest bg-rose-pink/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {sortedEvents[activePhotoIdx].date}
                  </span>
                  <p className="font-sans text-sm md:text-base text-gold font-semibold mt-1">
                    {sortedEvents[activePhotoIdx].title}
                  </p>
                  <p className="font-sans text-xs text-white/80 font-light mt-1 max-w-lg mx-auto leading-relaxed">
                    {sortedEvents[activePhotoIdx].desc}
                  </p>
                  <p className="font-sans text-[10px] text-white/40 mt-2 uppercase tracking-wider">
                    Milestone {activePhotoIdx + 1} of {sortedEvents.length}
                  </p>
                </div>
              </motion.div>

              <button
                onClick={handleNextPhoto}
                className="absolute right-0 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/25 transition-all cursor-pointer shadow-lg z-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Petals decoration */}
      <div className="absolute top-20 left-10 text-rose-pink/25 text-3xl animate-pulse select-none">🌸</div>
      <div className="absolute bottom-20 right-10 text-rose-pink/25 text-2xl animate-pulse select-none" style={{ animationDelay: '1.2s' }}>🌸</div>

    </section>
  );
};
