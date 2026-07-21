export interface RSVPResponse {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  options: string[];
  companions: number;
  message?: string;
  gift_intention?: string;
  preferred_role?: string;
  reference_number: string;
  created_at?: string;
}
