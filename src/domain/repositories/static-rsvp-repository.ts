import type { RSVPResponse } from '../models/rsvp';
import type { RSVPRepository } from './rsvp-repository';
import { STATIC_RSVPS } from '../../data/rsvps';

/**
 * Pure TypeScript RSVP Repository.
 * 100% in-memory TypeScript data layer with zero external backend or database connection.
 */
export class StaticRSVPRepository implements RSVPRepository {
  async getAllBlessings(): Promise<RSVPResponse[]> {
    return STATIC_RSVPS;
  }

  async submitRSVP(rsvp: RSVPResponse): Promise<RSVPResponse> {
    return {
      ...rsvp,
      created_at: new Date().toISOString(),
    };
  }
}

export const rsvpRepository = new StaticRSVPRepository();
