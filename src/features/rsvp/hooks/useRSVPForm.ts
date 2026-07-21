import { useState } from 'react';
import { rsvpRepository } from '../../../domain/repositories/supabase-rsvp-repository';
import { webhookService } from '../../../services/webhook';
import type { RSVPResponse } from '../../../domain/models/rsvp';
import confetti from 'canvas-confetti';

export function useRSVPForm(onRSVPSubmitSuccess: () => void) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companions, setCompanions] = useState(0);
  const [message, setMessage] = useState('');
  const [giftIntention, setGiftIntention] = useState('');
  const [preferredRole, setPreferredRole] = useState<'Ninong' | 'Ninang' | ''>('');
  const [godparentConfirm, setGodparentConfirm] = useState(false);

  // Status flags
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    refNo: string;
    options: string[];
  } | null>(null);

  const handleCardToggle = (id: string) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== id));
      if (id === 'ninong_ninang') {
        setPreferredRole('');
        setGodparentConfirm(false);
      }
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const generateRefNumber = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `ANG-${result}`;
  };

  const triggerCelebration = () => {
    const colors = ['#F8D7E8', '#EFA3C8', '#D4AF37', '#5A3E5C'];
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validations
    if (selectedOptions.length === 0) {
      setFormError('Please select at least one response category (e.g., Send a Blessing, Attend the Reception).');
      return;
    }
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (selectedOptions.includes('ninong_ninang')) {
      if (!preferredRole) {
        setFormError('Please select your preferred godparent role (Ninong or Ninang).');
        return;
      }
      if (!godparentConfirm) {
        setFormError('Please check the confirmation box accepting the role of Godparent.');
        return;
      }
    }

    setIsLoading(true);

    const referenceNumber = generateRefNumber();
    const payload: RSVPResponse = {
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      options: selectedOptions,
      companions: selectedOptions.includes('reception') ? companions : 0,
      message: message.trim(),
      gift_intention: selectedOptions.includes('gift') ? giftIntention.trim() : '',
      preferred_role: selectedOptions.includes('ninong_ninang') ? preferredRole : undefined,
      reference_number: referenceNumber,
    };

    try {
      // 1. Submit to Supabase / LocalStorage repository
      const dbResult = await rsvpRepository.submitRSVP(payload);

      // 2. Submit to Webhook
      const webhookResult = await webhookService.sendRSVP(dbResult);

      if (!webhookResult.success) {
        console.warn('Webhook delivery reported error, but RSVP is saved:', webhookResult.error);
      }

      setIsLoading(false);
      setSuccessData({
        refNo: referenceNumber,
        options: selectedOptions
      });
      triggerCelebration();
      onRSVPSubmitSuccess();

    } catch (err: any) {
      console.error(err);
      setIsLoading(false);
      setFormError(err.message || 'An error occurred during submission. Please try again.');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSelectedOptions([]);
    setCompanions(0);
    setMessage('');
    setGiftIntention('');
    setPreferredRole('');
    setGodparentConfirm(false);
    setSuccessData(null);
  };

  return {
    selectedOptions,
    name,
    email,
    phone,
    companions,
    message,
    giftIntention,
    preferredRole,
    godparentConfirm,
    isLoading,
    formError,
    successData,
    setName,
    setEmail,
    setPhone,
    setCompanions,
    setMessage,
    setGiftIntention,
    setPreferredRole,
    setGodparentConfirm,
    handleCardToggle,
    handleSubmit,
    handleReset
  };
}
