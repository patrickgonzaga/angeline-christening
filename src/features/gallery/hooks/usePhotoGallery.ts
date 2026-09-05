import { useState, useMemo } from 'react';

export interface GalleryImage {
  id: string | number;
  url: string;
  caption: string;
  category?: 'Ceremony' | 'Reception' | 'Portraits' | 'Milestones';
  link?: string;
  network?: string;
}

export const CHRISTENING_GALLERY_IMAGES: GalleryImage[] = [
  // Christening Ceremony & Sacred Sacrament
  {
    id: 'c1',
    url: '/assets/photos/portrait-princess-gown.jpg',
    caption: 'Princess Angeline in Her Royal Christening Gown',
    category: 'Portraits',
    network: 'Sacrament Day',
  },
  {
    id: 'c2',
    url: '/assets/photos/ceremony-baptism.jpg',
    caption: 'The Holy Sacrament of Baptism at St. Columban Church',
    category: 'Ceremony',
    network: 'Baptism',
  },
  {
    id: 'c3',
    url: '/assets/photos/ceremony-blessing.jpg',
    caption: 'Sacred Anointing and Priest Blessing',
    category: 'Ceremony',
    network: 'Blessing',
  },
  {
    id: 'c4',
    url: '/assets/photos/ceremony-candle.jpg',
    caption: 'Lighting the Baptismal Candle — Walking in Christ’s Light',
    category: 'Ceremony',
    network: 'Tradition',
  },
  {
    id: 'c5',
    url: '/assets/photos/altar-family.jpg',
    caption: 'Family at the Altar of St. Columban Church',
    category: 'Ceremony',
    network: 'Family',
  },
  {
    id: 'c6',
    url: '/assets/photos/altar-godparents.jpg',
    caption: 'Beloved Ninongs & Ninangs Answering the Spiritual Call',
    category: 'Ceremony',
    network: 'Godparents',
  },

  // Portraits & Candids
  {
    id: 'c7',
    url: '/assets/photos/portrait-baby-smile.jpg',
    caption: 'Sweet Angelic Smiles on Her Christening Day',
    category: 'Portraits',
    network: 'Princess',
  },
  {
    id: 'c8',
    url: '/assets/photos/portrait-family-love.jpg',
    caption: 'Surrounded by Endless Love, Guidance, and Prayers',
    category: 'Portraits',
    network: 'Family Love',
  },

  // Reception Celebration at Marz Unlimited
  {
    id: 'c9',
    url: '/assets/photos/reception-cake.jpg',
    caption: 'The Royal Christening Cake & Dessert Table',
    category: 'Reception',
    network: 'Cake & Sweets',
  },
  {
    id: 'c10',
    url: '/assets/photos/reception-decor.jpg',
    caption: 'Fairytale Reception Hall Setup at Marz Unlimited',
    category: 'Reception',
    network: 'Venue',
  },
  {
    id: 'c11',
    url: '/assets/photos/reception-family.jpg',
    caption: 'Joyful Gathering with Family and Cherished Guests',
    category: 'Reception',
    network: 'Reception',
  },
  {
    id: 'c12',
    url: '/assets/photos/reception-celebration.jpg',
    caption: 'Celebrating Princess Angeline’s Fairytale Beginning',
    category: 'Reception',
    network: 'Celebration',
  },

  // Baby Milestones
  {
    id: 'm1',
    url: '/assets/baby.jpg',
    caption: 'Princess Angeline Patrice Pangaribuan Gonzaga',
    category: 'Milestones',
    network: 'Royal Portrait',
  },
  {
    id: 'm2',
    url: '/assets/baby-white.png',
    caption: 'Princess Angeline in Pure White',
    category: 'Milestones',
    network: 'Milestone',
  },
  {
    id: 'm3',
    url: '/assets/baby-paaraw.png',
    caption: 'Morning Sunbeams & Morning Giggles',
    category: 'Milestones',
    network: 'Candid',
  },
  {
    id: 'm4',
    url: '/assets/timeline-newborn.png',
    caption: 'Our Sweet Angel Arrived (July 16, 2026)',
    category: 'Milestones',
    network: 'Newborn',
  },
  {
    id: 'm5',
    url: '/assets/Thanks Ninong.jpeg',
    caption: 'Warm Thank You to our Godparents',
    category: 'Milestones',
    network: 'Keepsake',
  },
];

export function usePhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return CHRISTENING_GALLERY_IMAGES;
    return CHRISTENING_GALLERY_IMAGES.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === 0 ? filteredImages.length - 1 : activeIdx - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === filteredImages.length - 1 ? 0 : activeIdx + 1);
    }
  };

  return {
    images: filteredImages,
    totalCount: CHRISTENING_GALLERY_IMAGES.length,
    selectedCategory,
    setSelectedCategory,
    loading: false,
    activeIdx,
    setActiveIdx,
    handlePrev,
    handleNext,
  };
}
