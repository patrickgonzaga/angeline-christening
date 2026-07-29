import React from 'react';
import { Heart, Globe, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "You are invited to Princess Angeline Gonzaga's Christening!";
    
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'messenger') {
      shareUrl = `fb-messenger://share/?link=${encodeURIComponent(url)}`;
    } else if (platform === 'email') {
      shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
    } else {
      navigator.clipboard.writeText(url);
      alert('Magical link copied to clipboard!');
      return;
    }
    
    window.open(shareUrl, '_blank');
  };

  return (
    <footer className="relative bg-plum text-white pt-16 pb-12 px-4 overflow-hidden border-t border-gold/30">
      {/* Princess pattern - screen blend for dark footer */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'url(/assets/princess-bg-pattern.png)', backgroundSize: '450px auto', backgroundRepeat: 'repeat', opacity: 0.2, mixBlendMode: 'screen' }} />
      
      <div className="absolute top-10 left-1/4 text-gold/10 text-xl animate-pulse">✦</div>
      <div className="absolute bottom-10 right-1/4 text-gold/10 text-xl animate-pulse" style={{ animationDelay: '1.5s' }}>✦</div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 space-y-8">
        
        <div className="relative">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <svg className="w-12 h-12 text-gold fill-gold" viewBox="0 0 24 24">
              <path d="M2 18h20v2H2zm2-2h16l-3-7-3 4-2-5-2 5-3-4z" />
            </svg>
          </motion.div>
          <span className="absolute -top-1 -right-2 text-gold text-sm animate-ping">✦</span>
          <span className="absolute -bottom-1 -left-2 text-gold text-xs animate-ping" style={{ animationDelay: '0.8s' }}>✦</span>
        </div>

        <span className="font-cursive text-3xl text-gold font-semibold tracking-wide">
          Princess Angeline
        </span>

        <div className="space-y-2">
          <p className="font-sans text-xs md:text-sm tracking-wide text-blush max-w-md mx-auto flex items-center justify-center gap-1.5 font-light">
            Made with <Heart className="w-3.5 h-3.5 fill-rose-pink text-rose-pink inline animate-pulse" /> by Daddy Patrick
          </p>
          <p className="font-sans text-[11px] text-white/50 tracking-wider font-light">
            for our little Princess Angeline Patrice Pangaribuan Gonzaga
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleShare('facebook')}
            title="Share on Facebook"
            className="w-10 h-10 rounded-full border border-gold/40 hover:bg-gold hover:text-plum text-gold transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="font-bold text-xs font-sans">FB</span>
          </button>
          <button
            onClick={() => handleShare('messenger')}
            title="Share on Messenger"
            className="w-10 h-10 rounded-full border border-gold/40 hover:bg-gold hover:text-plum text-gold transition-colors flex items-center justify-center cursor-pointer"
          >
            <MessageCircle className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => handleShare('email')}
            title="Share via Email"
            className="w-10 h-10 rounded-full border border-gold/40 hover:bg-gold hover:text-plum text-gold transition-colors flex items-center justify-center cursor-pointer"
          >
            <Mail className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => handleShare('copy')}
            title="Share Website Link"
            className="w-10 h-10 rounded-full border border-gold/40 hover:bg-gold hover:text-plum text-gold transition-colors flex items-center justify-center cursor-pointer"
          >
            <Globe className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="w-16 h-[1px] bg-gold/30 mx-auto" />

        <div className="text-[10px] font-sans text-white/40 tracking-wider space-y-1">
          <p>© {currentYear} Princess Angeline's Christening. All Rights Reserved.</p>
          <p className="font-light italic">Praise God from whom all blessings flow.</p>
        </div>

      </div>

    </footer>
  );
};
