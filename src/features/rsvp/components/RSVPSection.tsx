import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader, User, Mail, Phone, Users, MessageSquare, Gift, Heart, Calendar } from 'lucide-react';
import { useRSVPForm } from '../hooks/useRSVPForm';

interface SelectionCard {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
}

export const RSVPSection: React.FC<{ onRSVPSubmitSuccess: () => void }> = ({ onRSVPSubmitSuccess }) => {
  const {
    selectedOptions,
    name,
    email,
    phone,
    companions,
    message,
    giftIntention,
    preferredRole,
    godparentConfirm,
    isLoading,
    formError,
    successData,
    setName,
    setEmail,
    setPhone,
    setCompanions,
    setMessage,
    setGiftIntention,
    setPreferredRole,
    setGodparentConfirm,
    handleCardToggle,
    handleSubmit,
    handleReset
  } = useRSVPForm(onRSVPSubmitSuccess);

  const selectionCards: SelectionCard[] = [
    {
      id: 'ninong_ninang',
      title: 'Become a Ninong/Ninang',
      desc: 'Answer the call to guide Princess Angeline in faith and love as a godparent.',
      icon: Heart,
    },
    {
      id: 'reception',
      title: 'Attend the Reception',
      desc: 'Join us at Queens Rush Kitchenette for a joyful lunch celebration.',
      icon: Calendar,
    },
    {
      id: 'gift',
      title: 'Send a Gift',
      desc: 'Indicate your gift details to help us set up her registry catalog.',
      icon: Gift,
    },
    {
      id: 'blessing',
      title: 'Send a Blessing',
      desc: 'Offer your prayers and wishes to be added to her glowing memory star wall.',
      icon: MessageSquare,
    },
  ];

  return (
    <section id="rsvp" className="relative py-24 px-4 bg-gradient-to-b from-blush/15 to-ivory overflow-hidden">
      
      <div className="absolute top-10 right-10 text-gold/15 text-5xl pointer-events-none select-none">✦</div>
      <div className="absolute bottom-10 left-10 text-gold/15 text-5xl pointer-events-none select-none">✦</div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-4 py-1.5 rounded-full">Royal Invitation</span>
          <h2 className="font-cursive text-5xl md:text-6xl text-plum mt-3 font-semibold">Join the Fairytale</h2>
          <p className="font-sans text-xs md:text-sm text-plum/60 italic mt-2">Kindly respond before August 1, 2026</p>
        </div>

        <AnimatePresence mode="wait">
          {!successData ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="p-8 md:p-12 rounded-3xl bg-white/80 border border-gold/20 shadow-lg border-glow-gold relative"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div>
                  <label className="block text-plum font-sans font-bold text-sm tracking-wide mb-4 text-center">
                    Select Your Response (Select all that apply)
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectionCards.map((card) => {
                      const isSelected = selectedOptions.includes(card.id);
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.id}
                          onClick={() => handleCardToggle(card.id)}
                          className={`relative p-6 rounded-2xl border text-left cursor-pointer select-none transition-all duration-300 flex flex-col justify-between h-44 ${
                            isSelected
                              ? 'bg-rose-pink/10 border-gold border-glow-pink scale-[1.03] shadow-md shadow-rose-pink/5'
                              : 'bg-white border-rose-pink/20 hover:border-gold/50 hover:bg-ivory/30'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className={`p-2.5 rounded-xl ${isSelected ? 'bg-rose-pink text-white' : 'bg-blush/20 text-rose-pink'}`}>
                              <Icon className="w-5 h-5" />
                            </span>
                            
                            <span className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                              isSelected ? 'bg-gold border-gold text-plum' : 'border-rose-pink/30 bg-transparent'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </span>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-sans font-bold text-sm text-plum">{card.title}</h4>
                            <p className="font-sans text-[11px] text-plum/60 mt-1 leading-normal">{card.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {formError && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans text-center"
                  >
                    ⚠️ {formError}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-rose-pink/10">
                  
                  <div className="flex flex-col">
                    <label htmlFor="fullName" className="font-sans font-semibold text-xs text-plum/70 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-pink" />
                      <input
                        type="text"
                        id="fullName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Patrick Gonzaga"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-rose-pink/20 focus:border-gold focus:ring-1 focus:ring-gold bg-white/50 text-sm font-sans outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="emailAddress" className="font-sans font-semibold text-xs text-plum/70 mb-1.5">
                      Email Address <span className="text-plum/40 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-pink" />
                      <input
                        type="email"
                        id="emailAddress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="patrick@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-rose-pink/20 focus:border-gold focus:ring-1 focus:ring-gold bg-white/50 text-sm font-sans outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="mobileNumber" className="font-sans font-semibold text-xs text-plum/70 mb-1.5">
                      Mobile Number <span className="text-plum/40 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-pink" />
                      <input
                        type="tel"
                        id="mobileNumber"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0917-123-4567"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-rose-pink/20 focus:border-gold focus:ring-1 focus:ring-gold bg-white/50 text-sm font-sans outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {selectedOptions.includes('reception') && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex flex-col"
                    >
                      <label htmlFor="companionsCount" className="font-sans font-semibold text-xs text-plum/70 mb-1.5">Number of Companions</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-pink" />
                        <select
                          id="companionsCount"
                          value={companions}
                          onChange={(e) => setCompanions(parseInt(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-rose-pink/20 focus:border-gold focus:ring-1 focus:ring-gold bg-white/50 text-sm font-sans outline-none transition-colors appearance-none"
                        >
                          <option value={0}>No companions (Just me)</option>
                          <option value={1}>1 companion</option>
                          <option value={2}>2 companions</option>
                          <option value={3}>3 companions</option>
                          <option value={4}>4 companions</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {selectedOptions.includes('gift') && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex flex-col md:col-span-2"
                    >
                      <label htmlFor="giftDesc" className="font-sans font-semibold text-xs text-plum/70 mb-1.5">Gift Intention Details</label>
                      <input
                        type="text"
                        id="giftDesc"
                        value={giftIntention}
                        onChange={(e) => setGiftIntention(e.target.value)}
                        placeholder="e.g., Baby stroller, diapers, fairy-tale picture book, etc."
                        className="w-full px-4 py-3 rounded-xl border border-rose-pink/20 focus:border-gold focus:ring-1 focus:ring-gold bg-white/50 text-sm font-sans outline-none transition-colors"
                      />
                    </motion.div>
                  )}

                  {selectedOptions.includes('ninong_ninang') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex flex-col md:col-span-2 space-y-4 p-5 rounded-2xl bg-gold/5 border border-gold/25"
                    >
                      <div>
                        <span className="block font-sans font-bold text-xs text-plum mb-2">Preferred Godparent Role</span>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer font-sans text-xs text-plum font-semibold">
                            <input
                              type="radio"
                              name="role"
                              value="Ninong"
                              checked={preferredRole === 'Ninong'}
                              onChange={() => setPreferredRole('Ninong')}
                              className="accent-rose-pink w-4 h-4 cursor-pointer"
                            />
                            Ninong (Godfather)
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer font-sans text-xs text-plum font-semibold">
                            <input
                              type="radio"
                              name="role"
                              value="Ninang"
                              checked={preferredRole === 'Ninang'}
                              onChange={() => setPreferredRole('Ninang')}
                              className="accent-rose-pink w-4 h-4 cursor-pointer"
                            />
                            Ninang (Godmother)
                          </label>
                        </div>
                      </div>

                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={godparentConfirm}
                          onChange={(e) => setGodparentConfirm(e.target.checked)}
                          className="accent-rose-pink w-4 h-4 mt-0.5 cursor-pointer"
                        />
                        <span className="font-sans text-[11px] text-plum/70 leading-relaxed font-light">
                          I graciously accept the spiritual responsibility of guiding Princess Angeline in Christian faith, character, and lifelong support.
                        </span>
                      </label>
                    </motion.div>
                  )}

                  <div className="flex flex-col md:col-span-2">
                    <label htmlFor="blessingMessage" className="font-sans font-semibold text-xs text-plum/70 mb-1.5">
                      Your Blessing & Message {selectedOptions.includes('blessing') ? '(Required)' : '(Optional)'}
                    </label>
                    <textarea
                      id="blessingMessage"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your prayers, blessings, and fairytale wishes for our little princess..."
                      className="w-full px-4 py-3 rounded-xl border border-rose-pink/20 focus:border-gold focus:ring-1 focus:ring-gold bg-white/50 text-sm font-sans outline-none resize-none transition-colors"
                    />
                  </div>

                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-shimmer cursor-pointer font-sans font-bold text-plum text-sm uppercase tracking-widest px-10 py-4.5 rounded-full shadow-lg border border-gold/50 min-w-[200px] flex items-center justify-center gap-2 mx-auto disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin text-plum" />
                        Submitting Royal Scroll...
                      </>
                    ) : (
                      'Submit Response'
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 md:p-12 rounded-3xl bg-white border-2 border-gold shadow-xl text-center border-glow-gold relative overflow-hidden"
            >
              <div className="absolute -top-16 -left-16 w-36 h-36 bg-blush/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-blush/20 rounded-full blur-2xl" />

              <div className="flex justify-center mb-6">
                <span className="flex items-center justify-center bg-gold border border-gold text-plum rounded-full w-16 h-16 shadow-inner animate-pulse">
                  <Check className="w-8 h-8 stroke-[3]" />
                </span>
              </div>

              <span className="font-sans text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/10 px-4 py-1.5 rounded-full">Royal Decree</span>
              <h3 className="font-cursive text-5xl text-plum mt-3 mb-2 font-semibold">Response Recorded!</h3>
              <p className="font-sans text-xs text-plum/60 italic max-w-md mx-auto">
                Thank you, {name}, for your response. Your place in Princess Angeline's fairytale has been logged in the royal scroll.
              </p>

              <div className="my-8 max-w-sm mx-auto p-5 rounded-2xl bg-ivory border border-gold/30 border-glow-gold">
                <span className="font-sans text-[9px] uppercase font-bold text-rose-pink tracking-widest">Royal Scroll Code</span>
                <p className="font-sans font-bold text-2xl text-plum mt-1 tracking-wider">{successData.refNo}</p>
                <div className="mt-4 pt-3 border-t border-rose-pink/15 text-left space-y-2">
                  <span className="font-sans font-bold text-[10px] text-plum/50 uppercase tracking-widest block">Automation En Route:</span>
                  
                  {successData.options.includes('ninong_ninang') && (
                    <div className="flex items-center gap-2 text-xs font-sans text-plum/85">
                      <span className="text-green-500">✓</span> <span>Godparent Invitation email queued</span>
                    </div>
                  )}

                  {successData.options.includes('reception') && (
                    <div className="flex items-center gap-2 text-xs font-sans text-plum/85">
                      <span className="text-green-500">✓</span> <span>Reception Confirmation email queued</span>
                    </div>
                  )}

                  {successData.options.includes('gift') && (
                    <div className="flex items-center gap-2 text-xs font-sans text-plum/85">
                      <span className="text-green-500">✓</span> <span>Gift Acknowledgement email queued</span>
                    </div>
                  )}

                  {!successData.options.includes('ninong_ninang') && 
                   !successData.options.includes('reception') && 
                   !successData.options.includes('gift') && 
                   successData.options.includes('blessing') && (
                    <div className="flex items-center gap-2 text-xs font-sans text-plum/85">
                      <span className="text-green-500">✓</span> <span>Thank You for Your Blessing email queued</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs font-sans text-plum/85">
                    <span className="text-green-500">✓</span> <span>Parents (Patrick & Family) notified via email</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-sans text-[11px] text-plum/50 font-light max-w-sm mx-auto">
                  A verification email has been dispatched to <strong>{email}</strong>. If you selected a blessing, check the <em>Blessing Stars Wall</em> below to see your star rise!
                </p>
                <button
                  onClick={handleReset}
                  className="font-sans font-bold text-xs uppercase tracking-widest text-rose-pink hover:text-gold transition-colors underline cursor-pointer"
                >
                  Submit Another Response
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
};
