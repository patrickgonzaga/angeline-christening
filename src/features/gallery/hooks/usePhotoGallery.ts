import { useState, useEffect } from 'react';

export interface GalleryImage {
  id: string | number;
  url: string;
  caption: string;
  link?: string;
  network?: string;
}

const LOCAL_FALLBACK_IMAGES: GalleryImage[] = [
  { id: 1, url: '/assets/baby.jpg', caption: 'Princess Angeline Patrice Pangaribuan Gonzaga' },
  { id: 2, url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600', caption: 'Fairytale Carriage & Sparkles' },
  { id: 3, url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', caption: 'Sacred Gold Details' },
  { id: 4, url: 'https://images.unsplash.com/photo-1519225495810-7517c297567a?auto=format&fit=crop&q=80&w=600', caption: 'Blush Pink Roses' },
  { id: 5, url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600', caption: 'Celebrating the Sacred Gift' },
  { id: 6, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600', caption: 'Fairy Lights of Hope' }
];

export function usePhotoGallery() {
  const [images, setImages] = useState<GalleryImage[]>(LOCAL_FALLBACK_IMAGES);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const feedId = import.meta.env.VITE_CURATOR_FEED_ID || '';

  useEffect(() => {
    if (!feedId) return;

    const fetchFeed = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://cdn.curator.io/published/${feedId}.json`);
        if (!res.ok) throw new Error('Failed to fetch curator feed');
        const data = await res.json();
        
        if (data.posts && data.posts.length > 0) {
          const formatted: GalleryImage[] = data.posts.map((post: any) => ({
            id: post.id,
            url: post.image,
            caption: post.text || `Shared on ${post.network_name}`,
            link: post.url,
            network: post.network_name
          }));
          
          // Keep the baby photo pinned as the first thumbnail, then add the social posts!
          setImages([
            { id: 'baby-main', url: '/assets/baby.jpg', caption: 'Princess Angeline Patrice Pangaribuan Gonzaga' },
            ...formatted
          ]);
        }
      } catch (err) {
        console.error('Error fetching social media wall feed, loading fallback gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [feedId]);

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
    loading,
    activeIdx,
    setActiveIdx,
    handlePrev,
    handleNext
  };
}
