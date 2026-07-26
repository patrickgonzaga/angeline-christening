import React, { useState } from 'react';
import { Sparkles } from '../shared/components/Sparkles';
import { FallingPetals } from '../shared/components/FallingPetals';
import { AnimatedClouds } from '../shared/components/AnimatedClouds';
import { Hero } from '../features/hero';
import { LittlePrincess } from '../features/storybook';
import { CeremonyDetails } from '../features/ceremony';
import { GodparentsSection } from '../features/godparents';
import { RSVPSection } from '../features/rsvp';
import { BlessingStarsWall } from '../features/blessings';
import { DigitalMemoryBook } from '../features/memory-book';
import { PhotoGallery } from '../features/gallery';
import { Footer } from '../features/footer';
import { FloatingMusicPlayer } from '../features/music-player';

const App: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRSVPSubmitSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-ivory text-plum font-sans selection:bg-rose-pink/30">
      {/* Global Background Visuals */}
      <Sparkles />
      <FallingPetals />
      <AnimatedClouds />

      {/* Floating Music Player */}
      <FloatingMusicPlayer />

      {/* Main Flow Layout */}
      <main className="relative z-20">
        <Hero />
        <LittlePrincess />
        <CeremonyDetails />
        <GodparentsSection refreshTrigger={refreshTrigger} />
        <RSVPSection onRSVPSubmitSuccess={handleRSVPSubmitSuccess} />
        <BlessingStarsWall refreshTrigger={refreshTrigger} />
        <DigitalMemoryBook refreshTrigger={refreshTrigger} />
        <PhotoGallery />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
