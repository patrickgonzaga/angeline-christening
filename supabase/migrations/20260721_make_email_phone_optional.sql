-- Migration: Make email and phone optional for angeline_rsvps table
-- Created on: July 21, 2026

ALTER TABLE public.angeline_rsvps ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.angeline_rsvps ALTER COLUMN phone DROP NOT NULL;
