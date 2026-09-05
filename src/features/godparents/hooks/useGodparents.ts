import { useState, useEffect, useCallback } from 'react';
import { rsvpRepository } from '../../../domain/repositories/static-rsvp-repository';
import type { RSVPResponse } from '../../../domain/models/rsvp';

export function useGodparents(refreshTrigger: number) {
  const [godparents, setGodparents] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGodparents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await rsvpRepository.getAllBlessings();
      const filtered = data.filter(
        (item) =>
          item.options?.includes('ninong_ninang') ||
          item.preferred_role === 'Ninong' ||
          item.preferred_role === 'Ninang'
      );
      setGodparents(filtered);
    } catch (err) {
      console.error('Error fetching godparents from database:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGodparents();
  }, [fetchGodparents, refreshTrigger]);

  const ninongs = godparents.filter((item) => item.preferred_role === 'Ninong');
  const ninangs = godparents.filter((item) => item.preferred_role === 'Ninang' || !item.preferred_role || item.preferred_role !== 'Ninong');

  return { godparents, ninongs, ninangs, loading };
}
