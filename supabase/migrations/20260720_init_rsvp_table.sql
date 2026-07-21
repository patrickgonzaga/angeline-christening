-- Migration: Initialize RSVPs and blessings table for Princess Angeline
-- Created on: July 20, 2026

CREATE TABLE IF NOT EXISTS public.angeline_rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  options TEXT[] NOT NULL, -- Selected options: e.g. ['ninong_ninang', 'reception', 'gift', 'blessing']
  companions INTEGER DEFAULT 0,
  message TEXT,
  gift_intention TEXT,
  preferred_role TEXT, -- 'Ninong' or 'Ninang'
  reference_number TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row-Level Security (RLS) to secure database tables
ALTER TABLE public.angeline_rsvps ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public guest submissions (Inserts)
CREATE POLICY "Allow public submissions" 
ON public.angeline_rsvps 
FOR INSERT 
WITH CHECK (true);

-- Policy 2: Allow public read access to blessings for the Blessing Stars Wall (Selects)
CREATE POLICY "Allow public reads for stars wall" 
ON public.angeline_rsvps 
FOR SELECT 
USING (true);

-- Create index on created_at for fast, descending order retrieval
CREATE INDEX IF NOT EXISTS angeline_rsvps_created_at_idx 
ON public.angeline_rsvps (created_at DESC);
