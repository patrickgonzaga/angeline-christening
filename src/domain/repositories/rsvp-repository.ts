import type { RSVPResponse } from '../models/rsvp';

export interface RSVPRepository {
  getAllBlessings(): Promise<RSVPResponse[]>;
  submitRSVP(rsvp: RSVPResponse): Promise<RSVPResponse>;
}
