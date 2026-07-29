import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Calendar, MessageSquare, Crown, Heart, Sparkles, Users } from 'lucide-react';
import { generateCoords } from '../../../shared/utils/hash';
import { useBlessingStars } from '../hooks/useBlessingStars';
import type { RSVPResponse } from '../../../domain/models/rsvp';

interface BlessingStarsWallProps {
  refreshTrigger: number;
}

export const BlessingStarsWall: React.FC<BlessingStarsWallProps> = ({ refreshTrigger }) => {
  const { blessings, loading, stats } = useBlessingStars(refreshTrigger);
  const [selectedBlessing, setSelectedBlessing] = useState<RSVPResponse | null>(null);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'August 2026';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section id="blessings-wall" className="relative py-24 bg-plum text-white overflow-hidden min-h-[500px]">
      {/* Princess pattern - screen blend for dark bg */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ backgroundImage: 'url(/assets/princess-bg-pattern.png)', backgroundSize: '500px auto', backgroundRepeat: 'repeat', opacity: 0.2, mixBlendMode: 'screen' }} />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#714f73] via-[#3d273f] to-plum pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col h-full justify-between">
        
        <div className="text-center mb-10">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/25">Magical Sky</span>
          <h2 className="font-cursive text-5xl md:text-6xl text-white mt-3 font-semibold">Blessing Stars Wall</h2>
          <p className="font-sans text-xs md:text-sm text-blush/80 italic mt-2 max-w-md mx-auto">
            Each star holds a sacred wish for Princess Angeline. Click on any glowing star to read their blessing.
          </p>
        </div>

        {/* Real-time Response Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto w-full"
        >
          {/* Ninongs */}
          <div className="relative group overflow-hidden bg-white/5 backdrop-blur-md border border-gold/25 rounded-2xl p-5 text-center transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mx-auto w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2.5">
              <Crown size={15} />
            </div>
            <span className="block text-3xl font-cursive font-bold text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.4)] mb-0.5">
              {stats.ninongCount}
            </span>
            <span className="block text-[10px] md:text-xs font-sans uppercase tracking-widest text-blush font-semibold">
              Ninongs
            </span>
          </div>

          {/* Ninangs */}
          <div className="relative group overflow-hidden bg-white/5 backdrop-blur-md border border-gold/25 rounded-2xl p-5 text-center transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mx-auto w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2.5">
              <Heart size={15} className="fill-gold/10 text-gold" />
            </div>
            <span className="block text-3xl font-cursive font-bold text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.4)] mb-0.5">
              {stats.ninangCount}
            </span>
            <span className="block text-[10px] md:text-xs font-sans uppercase tracking-widest text-blush font-semibold">
              Ninangs
            </span>
          </div>

          {/* Wishes */}
          <div className="relative group overflow-hidden bg-white/5 backdrop-blur-md border border-gold/25 rounded-2xl p-5 text-center transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mx-auto w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2.5">
              <Sparkles size={15} />
            </div>
            <span className="block text-3xl font-cursive font-bold text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.4)] mb-0.5">
              {stats.messageCount}
            </span>
            <span className="block text-[10px] md:text-xs font-sans uppercase tracking-widest text-blush font-semibold">
              Wishes Sent
            </span>
          </div>

          {/* Guests */}
          <div className="relative group overflow-hidden bg-white/5 backdrop-blur-md border border-gold/25 rounded-2xl p-5 text-center transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mx-auto w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2.5">
              <Users size={15} />
            </div>
            <span className="block text-3xl font-cursive font-bold text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.4)] mb-0.5">
              {stats.guestCount}
            </span>
            <span className="block text-[10px] md:text-xs font-sans uppercase tracking-widest text-blush font-semibold">
              Attending RSVPs
            </span>
          </div>
        </motion.div>

        <div className="relative w-full h-[450px] md:h-[500px] bg-black/25 rounded-3xl border border-gold/20 shadow-2xl overflow-hidden backdrop-blur-sm">
          
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-t-gold border-gold/20 animate-spin" />
                <span className="font-sans text-xs text-blush/60">Summoning star alignments...</span>
              </div>
            </div>
          ) : blessings.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <p className="font-sans text-sm text-blush/60 italic">No blessings have ascended yet. Be the first to send a blessing in the RSVP scroll!</p>
            </div>
          ) : (
            <div className="absolute inset-0">
              {blessings.map((blessing, idx) => {
                const { x, y } = generateCoords(blessing.reference_number || blessing.name, idx);
                const starSize = 18 + (idx % 3) * 6;
                const floatDuration = 4 + (idx % 4) * 2;
                const floatDelay = (idx % 5) * 0.5;

                return (
                  <motion.button
                    key={blessing.id || blessing.reference_number || idx}
                    onClick={() => setSelectedBlessing(blessing)}
                    className="absolute group flex items-center justify-center p-2 rounded-full cursor-pointer focus:outline-none z-10"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0.75, 1, 0.75],
                      scale: 1,
                      y: [0, -12, 0] 
                    }}
                    transition={{
                      opacity: { repeat: Infinity, duration: floatDuration - 1, ease: 'easeInOut' },
                      y: { repeat: Infinity, duration: floatDuration, ease: 'easeInOut', delay: floatDelay },
                      scale: { duration: 0.6 }
                    }}
                    whileHover={{ scale: 1.3, zIndex: 30 }}
                  >
                    <div className="absolute inset-0 bg-gold/30 rounded-full blur-md group-hover:bg-gold/50 transition-all duration-300 animate-pulse-slow" />
                    
                    <Star 
                      className="text-gold fill-gold/80 drop-shadow-[0_0_8px_#D4AF37] group-hover:scale-110 transition-transform" 
                      size={starSize}
                    />

                    <span className="absolute -bottom-8 bg-plum border border-gold/40 text-[10px] font-sans font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 text-white whitespace-nowrap z-25 shadow-md">
                      {blessing.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}

          <div className="absolute top-10 left-10 w-0.5 h-0.5 bg-white opacity-40 animate-[shootingStar_12s_infinite]" />
          <div className="absolute top-40 right-20 w-0.5 h-0.5 bg-white opacity-30 animate-[shootingStar_8s_infinite_2s]" />

        </div>

      </div>

      {/* BLESSING MODAL OVERLAY */}
      <AnimatePresence>
        {selectedBlessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlessing(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-gold text-plum rounded-3xl p-8 max-w-md w-full shadow-2xl relative border-glow-gold cursor-default"
            >
              <button
                onClick={() => setSelectedBlessing(null)}
                className="absolute top-4 right-4 text-plum/40 hover:text-plum transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                
                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-4 animate-bounce">
                  <Star size={20} className="fill-gold" />
                </div>

                <span className="font-sans text-[10px] font-bold text-rose-pink uppercase tracking-widest">A Sacred Blessing</span>
                <h4 className="font-cursive text-4xl text-plum font-semibold mt-1 mb-4">{selectedBlessing.name}</h4>

                <div className="relative bg-ivory/80 border border-rose-pink/15 p-6 rounded-2xl w-full my-4 italic font-sans text-xs md:text-sm leading-relaxed text-plum/85 font-light shadow-inner">
                  <span className="absolute -top-3 left-4 text-rose-pink bg-white px-2">
                    <MessageSquare size={14} />
                  </span>
                  “{selectedBlessing.message}”
                </div>

                {selectedBlessing.options.includes('ninong_ninang') && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-gold px-3 py-1 rounded-full mb-3">
                    ✨ Godparent ({selectedBlessing.preferred_role})
                  </span>
                )}

                <div className="flex items-center gap-1.5 text-[11px] text-plum/50 font-sans mt-2">
                  <Calendar size={12} className="text-rose-pink" />
                  <span>Ascended on {formatDate(selectedBlessing.created_at)}</span>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg) scale(0);
            opacity: 0;
          }
          10% {
            transform: translateX(-100px) translateY(100px) rotate(-45deg) scale(1);
            opacity: 1;
          }
          20% {
            transform: translateX(-300px) translateY(300px) rotate(-45deg) scale(0);
            opacity: 0;
          }
          100% {
            transform: translateX(-300px) translateY(300px) rotate(-45deg) scale(0);
            opacity: 0;
          }
        }
      `}</style>

    </section>
  );
};
