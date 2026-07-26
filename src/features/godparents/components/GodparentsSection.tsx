import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, UserCheck, Loader, ChevronRight } from 'lucide-react';
import { useGodparents } from '../hooks/useGodparents';

interface GodparentsSectionProps {
  refreshTrigger?: number;
}

export const GodparentsSection: React.FC<GodparentsSectionProps> = ({ refreshTrigger = 0 }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ninong' | 'ninang'>('all');
  const { godparents, ninongs, ninangs, loading } = useGodparents(refreshTrigger);

  const scrollToRSVP = () => {
    const el = document.getElementById('rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredNinongs = activeTab === 'ninang' ? [] : ninongs;
  const filteredNinangs = activeTab === 'ninong' ? [] : ninangs;
  const totalCount = godparents.length;

  return (
    <section id="godparents" className="relative py-24 px-4 bg-gradient-to-b from-ivory via-blush/10 to-ivory overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/3 left-10 text-gold/15 text-5xl pointer-events-none select-none">✦</div>
      <div className="absolute bottom-1/3 right-10 text-gold/15 text-5xl pointer-events-none select-none">✦</div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Spiritual Guardians
          </span>
          <h2 className="font-cursive text-5xl md:text-6xl text-plum mt-3 font-semibold">
            Ninong & Ninang
          </h2>
          <p className="font-sans text-xs md:text-sm text-plum/70 italic mt-2 max-w-xl mx-auto">
            “Chosen by love to guide Princess Angeline in faith, grace, and lifelong wisdom.”
          </p>
        </div>

        {/* Category Filter Tabs & Counter */}
        {totalCount > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 max-w-3xl mx-auto">
            <div className="inline-flex p-1.5 rounded-full bg-white/80 border border-gold/30 shadow-sm backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2 rounded-full font-sans text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-gold text-white shadow-md'
                    : 'text-plum/70 hover:text-plum hover:bg-gold/10'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setActiveTab('ninong')}
                className={`px-5 py-2 rounded-full font-sans text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'ninong'
                    ? 'bg-rose-pink text-white shadow-md'
                    : 'text-plum/70 hover:text-plum hover:bg-rose-pink/10'
                }`}
              >
                Ninong ({ninongs.length})
              </button>
              <button
                onClick={() => setActiveTab('ninang')}
                className={`px-5 py-2 rounded-full font-sans text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'ninang'
                    ? 'bg-rose-pink text-white shadow-md'
                    : 'text-plum/70 hover:text-plum hover:bg-rose-pink/10'
                }`}
              >
                Ninang ({ninangs.length})
              </button>
            </div>

            <button
              onClick={scrollToRSVP}
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-rose-pink hover:text-gold transition-colors cursor-pointer"
            >
              <span>Accept Spiritual Calling</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 text-plum/50">
            <Loader className="w-8 h-8 animate-spin text-gold mb-3" />
            <p className="font-sans text-xs uppercase tracking-widest">Unrolling Royal Scroll of Godparents...</p>
          </div>
        )}

        {/* Empty Database State */}
        {!loading && totalCount === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 md:p-14 rounded-3xl bg-white/80 border border-gold/30 shadow-lg text-center max-w-xl mx-auto border-glow-gold relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="font-cursive text-4xl text-plum font-semibold mb-2">Be Her Spiritual Guardian</h3>
            <p className="font-sans text-xs md:text-sm text-plum/70 leading-relaxed max-w-md mx-auto mb-6">
              No godparents have registered on the royal scroll yet. If you have been invited to guide Princess Angeline in Christian faith, respond in the royal RSVP section below!
            </p>

            <button
              onClick={scrollToRSVP}
              className="btn-shimmer cursor-pointer font-sans font-bold text-plum text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-md border border-gold/50 inline-flex items-center gap-2"
            >
              <span>RSVP as Ninong / Ninang</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Database Content Grids */}
        {!loading && totalCount > 0 && (
          <div className="space-y-12">
            
            {/* Ninongs Section */}
            {filteredNinongs.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px flex-1 bg-gold/20" />
                  <h3 className="font-cursive text-3xl text-plum font-semibold px-2 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-gold" /> Ninong (Godfathers)
                  </h3>
                  <span className="h-px flex-1 bg-gold/20" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredNinongs.map((item, index) => (
                    <motion.div
                      key={item.id || item.reference_number || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="p-5 rounded-2xl bg-white/80 border border-gold/20 hover:border-gold/60 shadow-sm hover:shadow-md transition-all text-center group relative overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <h4 className="font-sans font-bold text-sm text-plum group-hover:text-gold transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-sans text-[10px] uppercase font-semibold text-gold tracking-widest mt-1 block">
                          Ninong
                        </span>
                      </div>

                      {item.message && item.message.trim().length > 0 && (
                        <p className="font-sans text-[11px] text-plum/60 italic mt-3 pt-3 border-t border-gold/10 line-clamp-2">
                          “{item.message}”
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Ninangs Section */}
            {filteredNinangs.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px flex-1 bg-rose-pink/20" />
                  <h3 className="font-cursive text-3xl text-plum font-semibold px-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-pink" /> Ninang (Godmothers)
                  </h3>
                  <span className="h-px flex-1 bg-rose-pink/20" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredNinangs.map((item, index) => (
                    <motion.div
                      key={item.id || item.reference_number || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="p-5 rounded-2xl bg-white/80 border border-rose-pink/20 hover:border-rose-pink/60 shadow-sm hover:shadow-md transition-all text-center group relative overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-full bg-rose-pink/10 border border-rose-pink/30 text-rose-pink flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <Heart className="w-5 h-5 fill-rose-pink/20" />
                        </div>
                        <h4 className="font-sans font-bold text-sm text-plum group-hover:text-rose-pink transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-sans text-[10px] uppercase font-semibold text-rose-pink tracking-widest mt-1 block">
                          Ninang
                        </span>
                      </div>

                      {item.message && item.message.trim().length > 0 && (
                        <p className="font-sans text-[11px] text-plum/60 italic mt-3 pt-3 border-t border-rose-pink/10 line-clamp-2">
                          “{item.message}”
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </section>
  );
};
