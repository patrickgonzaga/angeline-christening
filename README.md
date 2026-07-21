# 👑 Princess Angeline's Christening & Reception Website

This is a luxury, fairytale storybook-themed invitation and RSVP portal built for **Princess Angeline Patrice Pangaribuan Gonzaga's** Holy Christening and Reception. 

The codebase is built using **React 18, Vite, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide React** and strictly follows the **SOLID Feature-First Architecture** guidelines.

---

## 🏛️ Feature-First SOLID Architecture

The project directory isolates concerns into four distinct layers to ensure Single Responsibility (S) and Dependency Inversion (D):

```text
src/
├── app/                             # Composition layer
│   └── App.tsx                      # Page layout shell composing the UI
│
├── domain/                          # Pure business logic (NO React imports)
│   ├── models/
│   │   └── rsvp.ts                  # RSVP entity models
│   └── repositories/
│       ├── rsvp-repository.ts       # Repository contract
│       └── supabase-rsvp-repository.ts # Supabase & LocalStorage concrete implementation
│
├── features/                        # Cohesive domain features (barrels)
│   ├── hero/                        # Hero section & Countdown timer
│   ├── storybook/                   # Parents' letter & Princess timeline
│   ├── ceremony/                    # Church & reception Google Maps cards
│   ├── rsvp/                        # Multi-choice selectors, form & useRSVPForm hook
│   ├── blessings/                   # Star sky field, modal details & useBlessingStars hook
│   ├── memory-book/                 # Keepsake summary & binder preview lightboxes
│   ├── gallery/                     # Image grid, lightboxes & usePhotoGallery hook
│   ├── music-player/                # Offline Web Audio chimes synthesizer
│   └── footer/                      # Dedication, crown animations & social share triggers
│
├── shared/                          # Global cross-feature modules
│   ├── components/                  # Rising sparkles, falling petals, animated clouds
│   └── utils/                       # Coordinates seedable hash generator
│
├── index.css                        # Tailwind v4 globals & themes
└── main.tsx                         # Entry point (references src/app/App.tsx)
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory to configure integrations:

```env
# 1. Supabase Connection (Optional - falls back to LocalStorage)
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 2. n8n automation Webhook
VITE_N8N_WEBHOOK_URL=https://your-n8n-domain/webhook/angeline-rsvp

# 3. Curator.io Social Wall (Optional - falls back to Unsplash Fairytale feed)
VITE_CURATOR_FEED_ID=your_curator_feed_id_slug
```

---

## 🗄️ Database Setup (Supabase)

To save guest responses, execute this SQL script in your Supabase SQL Editor. The migration file is also saved at [`supabase/migrations/20260720_init_rsvp_table.sql`](file:///d:/Patrick%20Documents/Project/PatCommandCenter/projects/angeline-christening/supabase/migrations/20260720_init_rsvp_table.sql):

```sql
CREATE TABLE IF NOT EXISTS public.angeline_rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  options TEXT[] NOT NULL, -- e.g. ['ninong_ninang', 'reception', 'gift', 'blessing']
  companions INTEGER DEFAULT 0,
  message TEXT,
  gift_intention TEXT,
  preferred_role TEXT, -- 'Ninong' or 'Ninang'
  reference_number TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row-Level Security
ALTER TABLE public.angeline_rsvps ENABLE ROW LEVEL SECURITY;

-- Allow guests to submit RSVP scrolls (Inserts)
CREATE POLICY "Allow public submissions" 
ON public.angeline_rsvps FOR INSERT 
WITH CHECK (true);

-- Allow public read access for the Blessing Stars Wall (Selects)
CREATE POLICY "Allow public reads for stars wall" 
ON public.angeline_rsvps FOR SELECT 
USING (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS angeline_rsvps_created_at_idx 
ON public.angeline_rsvps (created_at DESC);
```

---

## 🔗 n8n Webhook Payload Format

When a guest submits the form, a JSON payload is POSTed to `VITE_N8N_WEBHOOK_URL`:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "09171234567",
  "options": ["ninong_ninang", "reception", "blessing"],
  "companions": 2,
  "message": "Welcome to the Christian world, sweet Angeline!",
  "gift_intention": "",
  "preferred_role": "Ninang",
  "reference_number": "ANG-AB12C",
  "submitted_date": "2026-07-20T08:50:00.000Z"
}
```

### Automation & Email Flow Logic
Based on the `options` array, your n8n workflow can trigger the following automations:
1. **Contains `ninong_ninang`**: Send a **Godparent Invitation email** (detailing preferred role, baptism vows, and date).
2. **Contains `reception`**: Send a **Reception Confirmation email** (includes a QR code containing `reference_number` and directions).
3. **Contains `gift`**: Send a **Gift Acknowledgement email** (sends thank you note for registering gift intention).
4. **Only contains `blessing`**: Send a **Thank You for Your Blessing email**.
5. **Always**: Sends a notification email to the Gonzaga parents (Patrick & Family) with the full payload.

---

## 🎵 Offline Web Audio Lullaby Synthesizer

The floating music player ("Angeline's Lullaby") features a custom Web Audio API synthesizer. When active:
- It creates a virtual oscillator using a **Triangle wave** to mimic a physical music box.
- It applies an envelope (quick attack of `0.02s` and exponential decay) to simulate notes being plucked.
- It loops through a custom coded pitch frequency dictionary playing **Brahms' Lullaby** at a slow, soothing 90 BPM.
- This chimes engine works completely offline without depending on external MP3 URLs, resolving CORS, buffering, and asset loading latency issues.

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start local dev server**:
   ```bash
   npm run dev
   ```
3. **Generate production build bundle**:
   ```bash
   npm run build
   ```
