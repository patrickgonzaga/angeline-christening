import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const attemptPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay waiting for first user interaction:", err);
      });
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    // Attempt immediate autoplay on mount
    attemptPlay();

    // Fallback: If browser blocks autoplay until user gesture, start on first click/tap anywhere on page
    const handleFirstUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        attemptPlay();
      }
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction);
    window.addEventListener('touchstart', handleFirstUserInteraction);
    window.addEventListener('keydown', handleFirstUserInteraction);

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      // Attempt play when metadata loads as well
      if (!isPlaying) {
        attemptPlay();
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback failed:", err);
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      <audio
        ref={audioRef}
        src="/music/Princess Wonderland Lullaby.mp3"
        autoPlay
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mb-3 p-4 rounded-2xl glass-panel border-glow-pink shadow-xl w-72 text-plum flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 overflow-hidden">
                <Music className={`w-4 h-4 text-rose-pink flex-shrink-0 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                <span className="font-semibold text-xs tracking-wider uppercase font-sans text-plum/80 truncate">Princess Wonderland</span>
              </div>
              <span className="text-[10px] text-rose-pink font-semibold bg-rose-pink/15 px-2 py-0.5 rounded-full flex-shrink-0">Lullaby</span>
            </div>

            <div className="text-[11px] font-medium text-plum/70 text-center select-none py-0.5 truncate">
              {isPlaying ? '🎵 Princess Wonderland Lullaby' : 'Music Paused'}
            </div>

            {/* Time progress bar */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-rose-pink/20 rounded-lg appearance-none cursor-pointer accent-rose-pink"
              />
              <div className="flex justify-between text-[9px] text-plum/50 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls & Volume */}
            <div className="flex items-center gap-3 bg-ivory/60 p-2 rounded-xl border border-rose-pink/10">
              <button 
                onClick={togglePlay} 
                className="w-8 h-8 rounded-full bg-rose-pink text-white flex items-center justify-center hover:bg-rose-pink/90 transition-colors shadow-sm flex-shrink-0"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
              </button>

              <div className="flex items-center gap-2 flex-grow">
                <button onClick={toggleMute} className="text-rose-pink hover:text-gold transition-colors">
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-full h-1 bg-rose-pink/20 rounded-lg appearance-none cursor-pointer accent-rose-pink"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={`flex items-center justify-center w-12 h-12 rounded-full border border-gold/40 text-white shadow-lg cursor-pointer transition-transform duration-300 ${
            isPlaying ? 'bg-rose-pink border-glow-pink' : 'bg-plum border-glow-gold'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            >
              <Music className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <Music className="w-5 h-5 text-white" />
          )}
        </motion.button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute -top-1 -right-1 bg-gold hover:bg-gold/90 border border-white text-plum rounded-full w-5 h-5 flex items-center justify-center shadow-md cursor-pointer text-[10px]"
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 fill-plum" />}
        </button>

        {isPlaying && (
          <>
            <motion.span
              className="absolute text-rose-pink text-xs pointer-events-none"
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -40, x: -15, scale: 1.2, rotate: -20 }}
              transition={{ repeat: Infinity, duration: 2, delay: 0 }}
            >
              ♪
            </motion.span>
            <motion.span
              className="absolute text-gold text-xs pointer-events-none"
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -50, x: 15, scale: 1.2, rotate: 20 }}
              transition={{ repeat: Infinity, duration: 2.3, delay: 0.7 }}
            >
              ♫
            </motion.span>
          </>
        )}
      </div>
    </div>
  );
};

