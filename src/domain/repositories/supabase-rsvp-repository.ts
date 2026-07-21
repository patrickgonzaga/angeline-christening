import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { RSVPResponse } from '../models/rsvp';
import type { RSVPRepository } from './rsvp-repository';

export class SupabaseRSVPRepository implements RSVPRepository {
  private supabase: SupabaseClient | null = null;
  private storageKey = 'angeline_rsvps';

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

    if (supabaseUrl && supabaseAnonKey) {
      this.supabase = createClient(supabaseUrl, supabaseAnonKey);
    } else {
      console.warn(
        'Supabase credentials missing. SupabaseRSVPRepository running in LocalStorage mode.'
      );
    }
  }

  private getLocalRSVPs(): RSVPResponse[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed: RSVPResponse[] = JSON.parse(raw);
      // Filter out any leftover mock/seeded data
      return parsed;
    } catch (e) {
      console.error('Error reading from LocalStorage:', e);
      return [];
    }
  }

  private saveLocalRSVP(rsvp: RSVPResponse) {
    try {
      const current = this.getLocalRSVPs();
      const updated = [rsvp, ...current];
      localStorage.setItem(this.storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving to LocalStorage:', e);
    }
  }

  async getAllBlessings(): Promise<RSVPResponse[]> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from('angeline_rsvps')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error('Supabase fetch failed:', err);
        throw err;
      }
    }
    return this.getLocalRSVPs();
  }

  async submitRSVP(rsvp: RSVPResponse): Promise<RSVPResponse> {
    const fullRsvp = {
      ...rsvp,
      created_at: new Date().toISOString()
    };

    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from('angeline_rsvps')
          .insert([fullRsvp])
          .select()
          .single();
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase insert failed:', err);
        throw err;
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.saveLocalRSVP(fullRsvp);
      return fullRsvp;
    }
  }
}

export const rsvpRepository = new SupabaseRSVPRepository();
