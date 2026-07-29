import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

export const ThemeMotifSection: React.FC = () => {
  const colors = [
    { name: 'Rose Pink', class: 'bg-[#EFA3C8]' },
    { name: 'Blush', class: 'bg-[#F8D7E8]' },
    { name: 'Gold', class: 'bg-[#D4AF37]' },
    { name: 'Ivory', class: 'bg-[#FFF9F4]', border: true },
  ];

  return (
    <section id="theme-motif" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(248,215,232,0.20) 0%, rgba(255,249,244,1) 45%, rgba(205,180,219,0.15) 100%)' }}
    >
      {/* Princess pattern watermark */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'url(/assets/princess-bg-pattern.png)', backgroundSize: '520px auto', backgroundRepeat: 'repeat', opacity: 0.2 }} />
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-rose-pink/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 border-glow-pink text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center border-2 border-gold shadow-md">
              <Palette className="w-8 h-8 text-gold" />
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl text-plum mb-4">Princess Theme & Motif</h2>
          <div className="w-24 h-1 bg-gold/50 mx-auto mb-8 rounded-full"></div>

          <p className="text-lg sm:text-xl text-plum/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            We would love for you to join our celebration dressed in our motif. 
            <br className="hidden sm:block" />
            Please wear <strong>Pastel Colors, Floral Prints, or Light Shades</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {colors.map((color, index) => (
              <motion.div 
                key={color.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg ${color.class} ${color.border ? 'border border-gold/30' : ''}`}
                />
                <span className="text-sm font-medium text-plum/70 tracking-wide uppercase">{color.name}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-white/40 rounded-2xl border border-rose-pink/20 inline-block">
             <p className="text-sm sm:text-base text-plum/80 italic">
               "Dress comfortably and beautifully as we welcome Angeline to the Christian world."
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
