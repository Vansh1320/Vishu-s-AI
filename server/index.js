require('dotenv').config({ override: true });
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// CORS configuration - allow production origins
const isDevelopment = process.env.NODE_ENV !== 'production';
const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (isDevelopment) return callback(null, true);
    
    // In production, check allowed origins
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// Helper: call OpenAI Chat Completions if key is present
async function callOpenAI(system, user, schemaDescription) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('⚠️  No OPENAI_API_KEY found in environment');
    return null;
  }
  console.log('🔑 Using API Key:', apiKey.substring(0, 20) + '...');
  try {
    const base = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };
    if (process.env.OPENAI_HTTP_REFERER) headers['HTTP-Referer'] = process.env.OPENAI_HTTP_REFERER;
    if (process.env.OPENAI_X_TITLE) headers['X-Title'] = process.env.OPENAI_X_TITLE;

    const resp = await axios.post(
      `${base}/chat/completions`,
      {
        model,
        temperature: 0.3,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      },
      { headers }
    );
    const text = resp.data.choices?.[0]?.message?.content?.trim?.() || '';
    if (!text) return null;
    if (schemaDescription === 'json') {
      try { return JSON.parse(text); } catch { return null; }
    }
    return text;
  } catch (e) {
    // Quota or network errors: return null so callers use deterministic fallback
    const msg = e.response?.data || e.message;
    console.warn('AI provider error (using fallback):', msg);
    return null;
  }
}

// AI Storyboard: from script to array of shots
app.post('/api/storyboard', async (req, res) => {
  const { script } = req.body || {};
  if (!script || !script.trim()) return res.status(400).json({ error: 'script required' });

  // Try OpenAI for structured output
  const ai = await callOpenAI(
    'You convert film scripts into concise storyboard shots. Respond ONLY with JSON array of strings (<=12).',
    `Script: ${script}\nReturn JSON array of short shot descriptions.`,
    'json'
  );

  if (Array.isArray(ai) && ai.length) {
    return res.json({ shots: ai.slice(0, 12) });
  }

  // Fallback: deterministic sentence split
  const shots = String(script)
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 12);
  res.json({ shots });
});

// AI Camera Plan: from description to movement tuning
app.post('/api/camera-plan', async (req, res) => {
  const { description } = req.body || {};
  const ai = await callOpenAI(
    'Return camera tracking parameters as JSON: { mode: "smooth|fast|cinematic", lead: number(10-60), follow: number(0.04-0.3) }',
    `Description: ${description || 'Track subject with cinematic feel'}.`,
    'json'
  );
  if (ai && typeof ai === 'object') return res.json(ai);
  res.json({ mode: 'cinematic', lead: 40, follow: 0.08 });
});

// AI Render Preset: from prompt to material/colors
app.post('/api/render-preset', async (req, res) => {
  const { prompt } = req.body || {};
  const ai = await callOpenAI(
    'Map prompt to material settings JSON: { color: hex, metalness: 0-1, roughness: 0-1 }',
    `Prompt: ${prompt || 'cyan sci-fi glowing cube'}`,
    'json'
  );
  if (ai && typeof ai === 'object') return res.json(ai);
  res.json({ color: '#00bfff', metalness: 0.4, roughness: 0.3 });
});

// AI Video Edit plan
app.post('/api/edit-plan', async (req, res) => {
  const { brief, segments } = req.body || {};
  const context = Array.isArray(segments) ? segments.map(s => `${s.label}:${s.duration}s`).join(', ') : 'intro:10, performance:40, outro:10';
  const ai = await callOpenAI(
    'Return JSON { segments: [{ label, duration, note }] } rebalancing durations to fit 120 seconds unless otherwise stated.',
    `Brief: ${brief || 'upbeat teaser'}\nCurrent segments: ${context}`,
    'json'
  );
  if (ai?.segments) return res.json(ai);
  res.json({
    segments: [
      { label: 'Cold Open', duration: 12, note: 'Hook with strongest moment' },
      { label: 'Setup', duration: 28, note: 'Introduce characters and tone' },
      { label: 'Climax', duration: 55, note: 'High-energy montage' },
      { label: 'Call to Action', duration: 15, note: 'Show title and CTA overlay' },
    ],
  });
});

// AI Shot reference matcher
app.post('/api/shot-matcher', async (req, res) => {
  const { mood, location } = req.body || {};
  const ai = await callOpenAI(
    'Return JSON { references: [{ title, description, image }] } with 3 cinematic references.',
    `Mood: ${mood || 'noir night'} Location: ${location || 'city rooftop'}`,
    'json'
  );
  if (ai?.references) return res.json(ai);
  res.json({
    references: [
      {
        title: 'Moody Rooftop Wide',
        description: 'Wide establishing shot with rain-soaked skyline and neon reflections.',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Close-Up with Practical Glow',
        description: 'Character framed against cyan signage, bokeh city lights behind.',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Drone Dusk Sweep',
        description: 'Slow-moving aerial push across rooftop toward subject.',
        image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80',
      },
    ],
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
