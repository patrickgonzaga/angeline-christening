import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Crown, Heart } from 'lucide-react';
import { useBlessingStars } from '../../blessings/hooks/useBlessingStars';

interface DigitalMemoryBookProps {
  refreshTrigger: number;
}

export const DigitalMemoryBook: React.FC<DigitalMemoryBookProps> = ({ refreshTrigger }) => {
  const [showPreview, setShowPreview] = useState(false);
  const { blessings, loading } = useBlessingStars(refreshTrigger);

  const dbBlessingsWithMessages = blessings.filter(
    (b) => b.message && b.message.trim().length > 0
  );

  const formatBookDate = (dateStr?: string) => {
    if (!dateStr) return 'AUG 2026';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).toUpperCase();
  };

  return (
    <section id="memory-book" className="relative py-24 px-4 bg-gradient-to-b from-blush/10 to-ivory overflow-hidden">
      
      <div className="absolute top-10 left-10 w-24 h-24 bg-rose-pink/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-4 py-1.5 rounded-full">Keepsake</span>
          <h2 className="font-cursive text-5xl md:text-6xl text-plum mt-3 font-semibold">Digital Memory Book</h2>
          <p className="font-sans text-xs md:text-sm text-plum/60 italic mt-2">Preserving love and blessings for a lifetime</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/70 border border-gold/20 p-8 md:p-12 rounded-3xl border-glow-gold">
          
          <div className="md:col-span-7 text-left space-y-6">
            <div className="flex items-center gap-2 text-rose-pink">
              <BookOpen className="w-5 h-5" />
              <span className="font-sans font-bold text-xs uppercase tracking-widest">Angeline's Registry Book</span>
            </div>

            <h3 className="font-sans font-bold text-2xl text-plum leading-snug">
              Every blessing, prayer, and wish bound in a royal memory book.
            </h3>

            <p className="font-sans text-xs md:text-sm leading-relaxed text-plum/70 font-light">
              We believe that the love and wisdom shared by our family and friends are the most valuable guides 
              for Angeline. To preserve this magic, all guest blessings on the <em>Blessing Stars Wall</em> are recorded into a custom fairytale-themed keepsake memory book.
            </p>

            <div className="space-y-3 font-sans text-xs text-plum/85">
              <div className="flex items-center gap-2">
                <span className="text-gold">✦</span> <span>Fairy-tale illustrations custom bound with baby portrait</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold">✦</span> <span>Chronological directory of blessings, messages, and godparents</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold">✦</span> <span>Live registry log of all guest responses for the Gonzaga family archive</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setShowPreview(true)}
                className="btn-shimmer cursor-pointer font-sans font-bold text-plum text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl border border-gold/50 shadow-md flex items-center gap-2"
              >
                <Sparkles size={14} className="text-plum animate-pulse" />
                Preview Memory Book
              </button>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <motion.div 
              whileHover={{ rotateY: -15, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 100 }}
              onClick={() => setShowPreview(true)}
              className="relative w-48 h-64 bg-plum rounded-r-2xl border-l-[8px] border-gold/70 shadow-2xl flex flex-col justify-between p-6 text-white cursor-pointer select-none border border-gold/30"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-y-0 left-0 w-2 bg-black/20" />
              
              <div className="space-y-2 border-b border-gold/20 pb-4">
                <span className="text-[9px] uppercase font-bold text-gold tracking-widest font-sans">Holy Sacrament</span>
                <h4 className="font-cursive text-xl font-semibold leading-tight text-white">The Memory Book of Angeline</h4>
              </div>

              <div className="flex justify-center my-4 opacity-50">
                <Crown className="w-10 h-10 text-gold animate-pulse" />
              </div>

              <div className="text-center">
                <p className="font-sans text-[8px] text-white/50 uppercase tracking-widest font-bold">Gonzaga Archives</p>
                <p className="font-sans text-[9px] text-gold font-semibold mt-0.5">August 16, 2026</p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreview(false)}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-gold text-plum rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border-glow-gold cursor-default my-8"
            >
              <div className="flex justify-between items-center border-b border-rose-pink/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-rose-pink" />
                  <span className="font-sans font-bold text-xs uppercase tracking-widest text-plum/70">Memory Book Preview</span>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="font-sans text-[10px] font-bold uppercase tracking-widest text-rose-pink hover:text-gold transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>

              <div className="bg-ivory border border-rose-pink/15 p-6 rounded-2xl space-y-6 text-center select-none shadow-inner max-h-[400px] overflow-y-auto">
                <div className="border-b border-rose-pink/10 pb-4">
                  <h4 className="font-cursive text-3xl text-gold font-semibold">Book Cover</h4>
                  <p className="font-sans text-[10px] text-plum/50 mt-1 uppercase tracking-widest">Page 1</p>
                  <div className="border border-gold/40 rounded-full w-24 h-24 overflow-hidden mx-auto my-3 bg-blush shadow-sm">
                    <img src="/assets/baby.jpg" alt="Baby Thumbnail" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-sans font-bold text-sm text-plum">Princess Angeline Patrice Pangaribuan Gonzaga</p>
                  <p className="font-sans text-[10px] text-plum/60 italic mt-0.5">Baptized August 16, 2026</p>
                </div>

                <div className="space-y-4 border-b border-rose-pink/10 pb-4 text-left">
                  <h4 className="font-cursive text-2xl text-gold font-semibold text-center">Fairy-tale Blessings</h4>
                  <p className="font-sans text-[10px] text-plum/50 text-center uppercase tracking-widest">
                    {dbBlessingsWithMessages.length > 0 ? `Total ${dbBlessingsWithMessages.length} entries` : 'Page 2'}
                  </p>
                  
                  {loading ? (
                    <p className="font-sans text-[11px] text-plum/50 italic text-center py-4">Summoning book entries...</p>
                  ) : dbBlessingsWithMessages.length === 0 ? (
                    <p className="font-sans text-[11px] text-plum/50 italic text-center py-4">No blessings registered in database yet. Be the first to send a message on the RSVP form!</p>
                  ) : (
                    dbBlessingsWithMessages.map((blessing, idx) => (
                      <div key={blessing.id || blessing.reference_number || idx} className="p-3 bg-white border border-rose-pink/10 rounded-xl space-y-1">
                        <div className="flex justify-between text-[10px] font-sans font-bold text-plum/50">
                          <span className="uppercase flex items-center gap-1">
                            <Heart size={10} className="text-gold fill-gold" />
                            {blessing.name}
                          </span>
                          <span>{formatBookDate(blessing.created_at)}</span>
                        </div>
                        <p className="font-sans text-[11px] italic text-plum/75 leading-relaxed">“{blessing.message}”</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="text-center pt-2">
                  <span className="font-sans text-[10px] italic text-plum/40">
                    {dbBlessingsWithMessages.length > 0 ? 'Gonzaga Royal Family Archives' : 'Waiting for sweet wishes to fill these pages...'}
                  </span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
