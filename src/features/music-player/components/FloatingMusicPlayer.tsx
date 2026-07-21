import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NOTES = {
  E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99,
  C4: 261.63, D4: 293.66
};

const MELODY: [keyof typeof NOTES | 'REST', number][] = [
  ['E4', 0.5], ['E4', 0.5], ['G4', 1.5],
  ['E4', 0.5], ['E4', 0.5], ['G4', 1.5],
  ['E4', 0.5], ['G4', 0.5], ['C5', 1.0], ['B4', 1.0], ['A4', 0.5], ['A4', 0.5], ['G4', 1.5],
  ['D4', 0.5], ['E4', 0.5], ['F4', 1.0], ['D4', 0.5], ['E4', 0.5], ['F4', 1.0],
  ['D4', 0.5], ['F4', 0.5], ['B4', 1.0], ['A4', 1.0], ['G4', 0.5], ['B4', 0.5], ['C5', 1.5],
  ['REST', 1.0],
  ['C4', 0.5], ['C4', 0.5], ['C5', 1.5],
  ['A4', 0.5], ['F4', 0.5], ['G4', 1.5],
  ['E4', 0.5], ['C4', 0.5], ['F4', 1.0], ['G4', 0.5], ['A4', 0.5], ['G4', 1.0],
  ['C4', 0.5], ['C4', 0.5], ['C5', 1.5],
  ['A4', 0.5], ['F4', 0.5], ['G4', 1.5],
  ['E4', 0.5], ['C4', 0.5], ['F4', 1.0], ['E4', 0.5], ['D4', 0.5], ['C4', 1.5],
  ['REST', 1.0]
];

export const FloatingMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const noteTimeoutRef = useRef<any>(null);
  const currentNoteIndexRef = useRef(0);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : volume, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      stopMelody();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
      gainNodeRef.current = audioCtxRef.current.createGain();
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      gainNodeRef.current.connect(audioCtxRef.current.destination);
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playMusicBoxNote = (frequency: number, durationSec: number) => {
    const ctx = audioCtxRef.current;
    const destination = gainNodeRef.current;
    if (!ctx || !destination) return;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    noteGain.gain.setValueAtTime(0, ctx.currentTime);
    noteGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);

    osc.connect(noteGain);
    noteGain.connect(destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + durationSec);
  };

  const playMelodyLoop = () => {
    if (!isPlayingRef.current) return;

    initAudio();

    const bpm = 90;
    const beatDuration = 60 / bpm;

    const currentNote = MELODY[currentNoteIndexRef.current];
    const [noteName, durationBeats] = currentNote;
    const durationSec = durationBeats * beatDuration;

    if (noteName !== 'REST') {
      const freq = NOTES[noteName];
      playMusicBoxNote(freq, durationSec);
    }

    currentNoteIndexRef.current = (currentNoteIndexRef.current + 1) % MELODY.length;

    noteTimeoutRef.current = setTimeout(() => {
      playMelodyLoop();
    }, durationSec * 1000);
  };

  const startMelody = () => {
    setIsPlaying(true);
    isPlayingRef.current = true;
    initAudio();
    playMelodyLoop();
  };

  const stopMelody = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (noteTimeoutRef.current) {
      clearTimeout(noteTimeoutRef.current);
      noteTimeoutRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      startMelody();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mb-3 p-4 rounded-2xl glass-panel border-glow-pink shadow-xl w-64 text-plum flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Music className={`w-4 h-4 text-rose-pink ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                <span className="font-semibold text-xs tracking-wider uppercase font-sans text-plum/80">Angeline's Lullaby</span>
              </div>
              <span className="text-[10px] text-rose-pink font-semibold bg-rose-pink/15 px-2 py-0.5 rounded-full">Music Box</span>
            </div>

            <div className="text-[10px] italic text-plum/60 text-center select-none py-1">
              {isPlaying ? 'Playing Brahms\' Lullaby... 🎵' : 'Music Box Paused'}
            </div>

            <div className="flex items-center gap-2 bg-ivory/50 p-2 rounded-xl border border-rose-pink/10">
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
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            initAudio();
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
