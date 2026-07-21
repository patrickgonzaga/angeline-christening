import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Moon, Sparkles, Home, Stethoscope } from 'lucide-react';

export const LittlePrincess: React.FC = () => {
  const timelineEvents = [
    {
      date: 'July 16, 2026',
      title: 'Our Sweet Angel Arrived',
      desc: 'Princess Angeline was born, wrapping our world in endless love, soft yawns, and tiny dreams.',
      icon: Heart,
    },
    {
      date: 'July 17, 2026',
      title: 'Out of the Hospital and in to our forever home',
      desc: 'Leaving the hospital and entering her warm nursery, marking the start of our beautiful journey at home.',
      icon: Home,
    },
    {
      date: 'July 23, 2026',
      title: 'First Pediatrician Checkup',
      desc: 'Her first official clinic visit. The doctor says she is doing fantastic, healthy, and growing strong!',
      icon: Stethoscope,
    },
    {
      date: 'July 20, 2026',
      title: 'Crying at 2am',
      desc: 'Welcoming the late-night feeds and midnight diaper changes—exhausting but full of quiet, precious parent-daughter bonding.',
      icon: Moon,
    },
    {
      date: 'July 20, 2026',
      title: 'Her First Sponge Bath',
      desc: 'Splash, splash! A tiny, gentle sponge bath that left her feeling fresh, clean, and wrapped in warm, cozy towels.',
      icon: Sparkles,
    },
    {
      date: 'August 16, 2026',
      title: 'Her Holy Christening',
      desc: 'Consecrated under God’s grace and surrounded by the love of her parents, family, and godparents.',
      icon: Calendar,
    },
  ];

  return (
    <section id="princess-story" className="relative py-24 px-4 bg-gradient-to-b from-blush/10 to-ivory overflow-hidden">
      
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
            className="lg:col-span-5 rounded-3xl bg-plum p-1.5 shadow-xl relative min-h-[300px] flex items-center justify-center overflow-hidden border border-gold/40 group"
          >
            <div className="absolute inset-2 border border-gold/30 rounded-2xl pointer-events-none" />
            <img 
              src="/assets/baby.jpg" 
              alt="Baby Angeline Swaddled" 
              className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-700 min-h-[340px]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-plum/30 flex flex-col justify-end p-6 text-white text-left" />
            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
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

          <div className="relative border-l border-rose-pink/20 max-w-2xl mx-auto pl-6 space-y-12 py-4">
            {[...timelineEvents]
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event, index) => {
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
                    <span className="absolute -left-[37px] top-1.5 flex items-center justify-center bg-white border border-gold text-gold rounded-full w-6 h-6 shadow-sm z-10 hover:scale-110 transition-transform">
                      <Icon className="w-3.5 h-3.5" />
                    </span>

                    <div className="p-6 rounded-2xl bg-white/50 border border-rose-pink/15 hover:border-gold/30 hover:bg-white/80 transition-all shadow-sm">
                      <span className="font-sans text-[10px] font-bold text-rose-pink uppercase tracking-widest">{event.date}</span>
                      <h4 className="font-sans font-bold text-base text-plum mt-1">{event.title}</h4>
                      <p className="font-sans text-xs text-plum/70 mt-2 font-light leading-relaxed">{event.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>

      </div>

      {/* Background Petals decoration */}
      <div className="absolute top-20 left-10 text-rose-pink/25 text-3xl animate-pulse select-none">🌸</div>
      <div className="absolute bottom-20 right-10 text-rose-pink/25 text-2xl animate-pulse select-none" style={{ animationDelay: '1.2s' }}>🌸</div>

    </section>
  );
};
