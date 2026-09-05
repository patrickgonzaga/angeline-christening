import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from 'lucide-react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';

const CATEGORIES = [
  { id: 'All', label: 'All Moments' },
  { id: 'Ceremony', label: 'Church Ceremony' },
  { id: 'Portraits', label: 'Portraits & Candids' },
  { id: 'Reception', label: 'Reception Celebration' },
  { id: 'Milestones', label: 'Baby Milestones' },
];

export const PhotoGallery: React.FC = () => {
  const {
    images,
    selectedCategory,
    setSelectedCategory,
    loading,
    activeIdx,
    setActiveIdx,
    handlePrev,
    handleNext,
  } = usePhotoGallery();

  return (
    <section
      id="gallery"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(255,249,244,1) 0%, rgba(239,163,200,0.12) 50%, rgba(212,175,55,0.08) 100%)',
      }}
    >
      {/* Princess pattern watermark */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/princess-bg-pattern.png)',
          backgroundSize: '500px auto',
          backgroundRepeat: 'repeat',
          opacity: 0.2,
        }}
      />

      <div className="absolute top-1/4 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-rose-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Camera size={12} className="text-gold" />
            Celebration Album
          </span>
          <h2 className="font-cursive text-5xl md:text-6xl text-plum mt-3 font-semibold">
            Princess Angeline’s Gallery
          </h2>
          <p className="font-sans text-xs md:text-sm text-plum/60 italic mt-2">
            Sacred moments and joyful memories from her Christening & Reception (August 16, 2026)
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveIdx(null);
                  }}
                  className={`px-4 py-2 rounded-full font-sans text-xs font-bold transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-plum text-white shadow-md border border-plum scale-105'
                      : 'bg-white/80 text-plum/70 hover:text-plum hover:bg-white border border-rose-pink/20'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="w-8 h-8 rounded-full border-2 border-t-gold border-gold/20 animate-spin" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {images.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setActiveIdx(idx)}
                  className="relative rounded-3xl bg-white p-2 border border-gold/25 shadow-md border-glow-gold overflow-hidden cursor-pointer group h-80"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-blush">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-plum/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/40 shadow-lg">
                        <ZoomIn className="w-5 h-5" />
                      </span>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-left">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-sans text-xs text-white/95 font-medium truncate flex-1">
                          {img.caption}
                        </p>
                        {img.network && (
                          <span className="text-[9px] uppercase font-bold text-gold px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-md shrink-0 border border-gold/30">
                            {img.network}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeIdx !== null && images[activeIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <div className="absolute top-4 right-4 flex gap-4 text-white z-50">
              <button
                onClick={() => setActiveIdx(null)}
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
                onClick={handlePrev}
                className="absolute left-0 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/25 transition-all cursor-pointer shadow-lg z-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-2xl overflow-hidden border border-gold/40 bg-plum shadow-2xl max-h-[75vh]"
              >
                <img
                  src={images[activeIdx].url}
                  alt={images[activeIdx].caption}
                  className="max-w-full max-h-[75vh] object-contain block"
                />

                <div className="bg-plum/95 border-t border-gold/20 p-4 text-center">
                  <p className="font-sans text-xs md:text-sm text-gold font-semibold uppercase tracking-widest">
                    {images[activeIdx].caption}
                  </p>
                  <p className="font-sans text-[10px] text-white/60 mt-1 uppercase">
                    Photo {activeIdx + 1} of {images.length}
                  </p>
                </div>
              </motion.div>

              <button
                onClick={handleNext}
                className="absolute right-0 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/25 transition-all cursor-pointer shadow-lg z-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
