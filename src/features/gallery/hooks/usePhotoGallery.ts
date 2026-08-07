import { useState } from 'react';

export interface GalleryImage {
  id: string | number;
  url: string;
  caption: string;
  link?: string;
  network?: string;
}

const PUBLIC_ASSET_IMAGES: GalleryImage[] = [
  { id: 1, url: '/assets/baby.jpg', caption: 'Princess Angeline Patrice Pangaribuan Gonzaga' },
  { id: 2, url: '/assets/baby-white.png', caption: 'Princess Angeline in White' },
  { id: 3, url: '/assets/baby-paaraw.png', caption: 'Morning Sunbeams & Morning Giggles' },
  { id: 4, url: '/assets/timeline-newborn.png', caption: 'Our Sweet Angel Arrived (July 16, 2026)' },
  { id: 5, url: '/assets/timeline-home.png', caption: 'Out of the Hospital & Into Our Forever Home' },
  { id: 6, url: '/assets/timeline-bath.png', caption: 'Her First Sponge Bath' },
  { id: 7, url: '/assets/timeline-lullaby.png', caption: 'Sweet Dreams & Lullabies' },
  { id: 8, url: '/assets/timeline-checkup.png', caption: 'First Pediatrician Checkup' },
  { id: 9, url: '/assets/Thanks Ninong.jpeg', caption: 'Thank You, Ninong' }
];

export function usePhotoGallery() {
  const [images] = useState<GalleryImage[]>(PUBLIC_ASSET_IMAGES);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === 0 ? images.length - 1 : activeIdx - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === images.length - 1 ? 0 : activeIdx + 1);
    }
  };

  return {
    images,
    loading: false,
    activeIdx,
    setActiveIdx,
    handlePrev,
    handleNext
  };
}
