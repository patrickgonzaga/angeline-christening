import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, BookOpen, Camera, Search, Sparkles, Check, Crown } from 'lucide-react';
import { STATIC_RSVPS } from '../../../data/rsvps';
import type { RSVPResponse } from '../../../domain/models/rsvp';

export const RSVPSection: React.FC<{ onRSVPSubmitSuccess?: () => void }> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedResult, setSearchedResult] = useState<RSVPResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchedResult(null);
      setHasSearched(false);
      return;
    }

    const q = searchQuery.trim().toLowerCase();
    const match = STATIC_RSVPS.find(
      (r) =>
        r.reference_number?.toLowerCase() === q ||
        r.name.toLowerCase().includes(q) ||
        r.email?.toLowerCase() === q
    );

    setSearchedResult(match || null);
    setHasSearched(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ninongCount = STATIC_RSVPS.filter((r) => r.preferred_role === 'Ninong').length;
  const ninangCount = STATIC_RSVPS.filter((r) => r.preferred_role === 'Ninang').length;
  const blessingCount = STATIC_RSVPS.filter((r) => r.message && r.message.trim().length > 0).length;
  const totalGuests = STATIC_RSVPS.reduce((acc, r) => {
    if (r.options?.includes('reception')) {
      return acc + 1 + (r.companions || 0);
    }
    return acc;
  }, 0);

  return (
    <section
      id="rsvp"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, rgba(248,215,232,0.25) 0%, rgba(255,249,244,1) 40%, rgba(205,180,219,0.18) 100%)',
      }}
    >
      {/* Princess pattern watermark */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/princess-bg-pattern.png)',
          backgroundSize: '480px auto',
          backgroundRepeat: 'repeat',
          opacity: 0.2,
        }}
      />
      {/* Top and bottom gold divider lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-pink/40 to-transparent pointer-events-none z-0" />

      <div className="absolute top-10 right-10 text-gold/15 text-5xl pointer-events-none select-none">✦</div>
      <div className="absolute bottom-10 left-10 text-gold/15 text-5xl pointer-events-none select-none">✦</div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full shadow-sm">
            <Crown size={12} className="text-gold" />
            Royal Decree • RSVPs Closed
          </div>
          <h2 className="font-cursive text-5xl md:text-6xl text-plum mt-3 font-semibold">
            A Joyous Sacrament Celebrated
          </h2>
          <p className="font-sans text-xs md:text-sm text-plum/70 italic mt-2">
            The Christening of Princess Angeline Patrice took place on Sunday, August 16, 2026
          </p>
        </div>

        {/* Closed Announcement Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 md:p-12 rounded-3xl bg-white/85 border-2 border-gold/30 shadow-xl border-glow-gold relative overflow-hidden text-center"
        >
          {/* Subtle decorative blurs */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-blush/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex justify-center mb-4">
            <span className="p-4 rounded-full bg-blush/30 border border-gold/30 text-rose-pink shadow-inner inline-flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-gold" />
            </span>
          </div>

          <h3 className="font-cursive text-3xl md:text-4xl text-plum font-semibold mb-3">
            Our Hearts Are Filled With Gratitude!
          </h3>

          <p className="font-sans text-xs md:text-sm text-plum/75 leading-relaxed max-w-2xl mx-auto font-light mb-8">
            Thank you to all our cherished family, honored godparents, and dear friends who joined us in prayer,
            love, and celebration. Online RSVPs are now officially closed as the christening ceremony and reception
            have completed. All submitted blessings and guest responses are permanently enshrined in Princess Angeline's
            Royal Archives and keepsake memory book.
          </p>

          {/* Celebration Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
            <div className="p-4 rounded-2xl bg-ivory/80 border border-gold/25 shadow-sm flex flex-col items-center">
              <Heart className="w-5 h-5 text-rose-pink mb-1.5" />
              <span className="font-sans font-bold text-2xl text-plum">{ninongCount + ninangCount}</span>
              <span className="font-sans text-[10px] text-plum/60 uppercase tracking-wider mt-0.5">Godparents</span>
              <span className="text-[9px] text-rose-pink font-semibold">{ninongCount} Ninongs • {ninangCount} Ninangs</span>
            </div>

            <div className="p-4 rounded-2xl bg-ivory/80 border border-gold/25 shadow-sm flex flex-col items-center">
              <MessageSquare className="w-5 h-5 text-rose-pink mb-1.5" />
              <span className="font-sans font-bold text-2xl text-plum">{blessingCount}</span>
              <span className="font-sans text-[10px] text-plum/60 uppercase tracking-wider mt-0.5">Blessings Sent</span>
              <span className="text-[9px] text-gold font-semibold">Stars on Memory Wall</span>
            </div>

            <div className="p-4 rounded-2xl bg-ivory/80 border border-gold/25 shadow-sm flex flex-col items-center">
              <Crown className="w-5 h-5 text-rose-pink mb-1.5" />
              <span className="font-sans font-bold text-2xl text-plum">{totalGuests}</span>
              <span className="font-sans text-[10px] text-plum/60 uppercase tracking-wider mt-0.5">Reception Guests</span>
              <span className="text-[9px] text-plum/50 font-semibold">Marz Unlimited</span>
            </div>

            <div className="p-4 rounded-2xl bg-ivory/80 border border-gold/25 shadow-sm flex flex-col items-center">
              <BookOpen className="w-5 h-5 text-rose-pink mb-1.5" />
              <span className="font-sans font-bold text-2xl text-plum">{STATIC_RSVPS.length}</span>
              <span className="font-sans text-[10px] text-plum/60 uppercase tracking-wider mt-0.5">Total Responses</span>
              <span className="text-[9px] text-rose-pink font-semibold">Logged into Archives</span>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scrollToSection('blessings')}
              className="btn-shimmer cursor-pointer font-sans font-bold text-plum text-xs uppercase tracking-widest px-6 py-3.5 rounded-full border border-gold/40 shadow-sm flex items-center gap-2"
            >
              <Sparkles size={14} className="text-gold" />
              Blessing Stars Wall
            </button>

            <button
              onClick={() => scrollToSection('memory-book')}
              className="cursor-pointer font-sans font-bold text-plum bg-white hover:bg-ivory transition-colors text-xs uppercase tracking-widest px-6 py-3.5 rounded-full border border-gold/30 shadow-sm flex items-center gap-2"
            >
              <BookOpen size={14} className="text-rose-pink" />
              Digital Memory Book
            </button>

            <button
              onClick={() => scrollToSection('gallery')}
              className="cursor-pointer font-sans font-bold text-white bg-plum hover:bg-plum/90 transition-all text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-sm border border-plum/30 flex items-center gap-2"
            >
              <Camera size={14} className="text-gold" />
              Christening Photo Gallery
            </button>
          </div>

          {/* Guest Royal Scroll Lookup Accordion */}
          <div className="mt-10 pt-8 border-t border-rose-pink/15 max-w-lg mx-auto text-left">
            <div className="text-center mb-3">
              <span className="font-sans font-bold text-xs uppercase tracking-wider text-plum/70 flex items-center justify-center gap-1.5">
                <Search size={13} className="text-rose-pink" /> Look Up Your Recorded Royal Scroll
              </span>
              <p className="font-sans text-[11px] text-plum/50 italic mt-0.5">
                Enter your name or Royal Reference Code (e.g., ANG-N5S19)
              </p>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name or Reference Code..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-rose-pink/25 focus:border-gold focus:ring-1 focus:ring-gold bg-white text-xs font-sans outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-plum text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-plum/90 transition-colors cursor-pointer shrink-0"
              >
                Search
              </button>
            </form>

            <AnimatePresence>
              {hasSearched && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  {searchedResult ? (
                    <div className="p-4 rounded-2xl bg-ivory border border-gold/40 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-sans text-[9px] uppercase font-bold text-rose-pink tracking-widest">
                            Royal Scroll Found
                          </span>
                          <h4 className="font-sans font-bold text-sm text-plum">{searchedResult.name}</h4>
                          <p className="font-sans text-[10px] text-plum/60">
                            Code: <strong className="text-gold">{searchedResult.reference_number}</strong>
                          </p>
                        </div>
                        <span className="px-2 py-1 rounded-md bg-green-100 text-green-800 text-[10px] font-bold flex items-center gap-1">
                          <Check size={12} /> Confirmed
                        </span>
                      </div>

                      {searchedResult.preferred_role && (
                        <p className="font-sans text-xs text-plum font-semibold">
                          Role: <span className="text-rose-pink font-bold">{searchedResult.preferred_role}</span>
                        </p>
                      )}

                      {searchedResult.message && (
                        <div className="p-2.5 rounded-lg bg-white border border-rose-pink/10 italic text-[11px] text-plum/80 leading-relaxed">
                          "{searchedResult.message}"
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-pink/5 border border-rose-pink/20 text-center font-sans text-xs text-plum/70">
                      No response found matching "{searchQuery}". Please check the spelling or reference code.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
