import { useState, useEffect, useCallback } from 'react';
import { rsvpRepository } from '../../../domain/repositories/static-rsvp-repository';
import type { RSVPResponse } from '../../../domain/models/rsvp';

export interface RSVPStats {
  ninongCount: number;
  ninangCount: number;
  messageCount: number;
  rsvpCount: number;
  guestCount: number;
}

export function useBlessingStars(refreshTrigger: number) {
  const [blessings, setBlessings] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<RSVPStats>({
    ninongCount: 0,
    ninangCount: 0,
    messageCount: 0,
    rsvpCount: 0,
    guestCount: 0,
  });

  const fetchBlessings = useCallback(async () => {
    try {
      const data = await rsvpRepository.getAllBlessings();
      
      const calculatedStats = data.reduce(
        (acc, item) => {
          const isNinongNinang = item.options?.includes('ninong_ninang');
          const isAttending = item.options?.includes('reception');
          const hasMessage = item.message && item.message.trim().length > 0;
          
          if (isNinongNinang) {
            if (item.preferred_role === 'Ninong') {
              acc.ninongCount += 1;
            } else if (item.preferred_role === 'Ninang') {
              acc.ninangCount += 1;
            }
          }
          
          if (hasMessage) {
            acc.messageCount += 1;
          }
          
          if (isAttending) {
            acc.rsvpCount += 1;
            acc.guestCount += 1 + (item.companions || 0);
          }
          
          return acc;
        },
        { ninongCount: 0, ninangCount: 0, messageCount: 0, rsvpCount: 0, guestCount: 0 }
      );

      setStats(calculatedStats);

      const filtered = data.filter((item) => item.message && item.message.trim().length > 0);
      setBlessings(filtered);
    } catch (err) {
      console.error('Error fetching blessings for wall:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlessings();
  }, [fetchBlessings, refreshTrigger]);

  return { blessings, loading, stats };
}
