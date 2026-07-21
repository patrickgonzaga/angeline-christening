import type { RSVPResponse } from '../domain/models/rsvp';

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://YOUR-N8N-DOMAIN/webhook/angeline-rsvp';

export const webhookService = {
  async sendRSVP(rsvp: RSVPResponse): Promise<{ success: boolean; error?: string }> {
    console.log('Sending RSVP data to webhook:', WEBHOOK_URL, rsvp);

    // If it's the placeholder URL, we simulate success for local preview and print the logs
    if (WEBHOOK_URL.includes('YOUR-N8N-DOMAIN')) {
      console.log('Mock Webhook: Bypassing real network call for placeholder domain. Data logged successfully.');
      return { success: true };
    }

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...rsvp,
          submitted_date: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Webhook post failed:', error);
      return { 
        success: false, 
        error: error.message || 'Network error occurred while connecting to n8n webhook.' 
      };
    }
  }
};
