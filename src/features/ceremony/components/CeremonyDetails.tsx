import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Map, Utensils } from 'lucide-react';

export const CeremonyDetails: React.FC = () => {
  const venues = [
    {
      type: 'The Ceremony',
      name: 'Diocesan Shrine & Parish of St. Columban',
      address: 'St. Columban Street, Olongapo City, Philippines',
      time: '10:00 AM - August 16, 2026',
      details: 'Please arrive 15 minutes early as the holy sacrament will start promptly. White and pastel formal attire is encouraged.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Diocesan+Shrine+%26+Parish+of+St.+Columban+Olongapo+City',
      icon: Map,
      badge: 'Holy Sacrament'
    },
    {
      type: 'The Reception',
      name: 'Harmony Events Place',
      address: 'Canal Road, Olongapo City, Philippines',
      time: 'Lunch Reception follows immediately',
      details: 'Join us for a royal lunch, cake-cutting, and celebration program right after the church ceremony.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Harmony+Events+Place+Olongapo+City',
      icon: Utensils,
      badge: 'Royal Banquet'
    }
  ];

  return (
    <section id="ceremony-details" className="relative py-24 px-4 bg-gradient-to-b from-ivory to-blush/15 overflow-hidden">
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-rose-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-4 py-1.5 rounded-full">Where & When</span>
          <h2 className="font-cursive text-5xl md:text-6xl text-plum mt-3 font-semibold">Ceremony & Banquet Details</h2>
          <p className="font-sans text-xs md:text-sm text-plum/60 italic mt-2">Join us at the sanctuary and the feast</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {venues.map((venue, index) => {
            const Icon = venue.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex flex-col justify-between p-8 rounded-3xl bg-white/80 border border-gold/20 hover:border-gold/50 shadow-md border-glow-gold transition-all relative overflow-hidden group hover:scale-[1.01]"
              >
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-gold/5 rounded-full group-hover:bg-gold/10 transition-colors duration-500" />
                
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-sans text-[10px] font-bold text-rose-pink uppercase tracking-widest bg-rose-pink/10 px-3 py-1 rounded-full">
                      {venue.badge}
                    </span>
                    <span className="font-cursive text-2xl text-gold font-semibold">{venue.type}</span>
                  </div>

                  <h3 className="font-sans font-bold text-xl md:text-2xl text-plum mb-4 leading-snug group-hover:text-gold transition-colors duration-300">
                    {venue.name}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-rose-pink shrink-0 mt-0.5" />
                      <span className="font-sans text-sm text-plum/85 font-medium">{venue.time}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-rose-pink shrink-0 mt-0.5" />
                      <span className="font-sans text-xs text-plum/70 leading-relaxed">{venue.address}</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs leading-relaxed text-plum/60 border-t border-rose-pink/10 pt-4 italic font-light">
                    {venue.details}
                  </p>
                </div>

                <div className="mt-8">
                  <a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-gold/50 hover:bg-gold text-plum font-sans font-semibold text-xs uppercase tracking-widest hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <Icon className="w-4 h-4" />
                    Open Google Maps
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <div className="flex justify-center mt-20">
        <div className="text-gold text-xl animate-pulse">✦  ✦  ✦</div>
      </div>

    </section>
  );
};
