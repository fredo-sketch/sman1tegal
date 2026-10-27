import { createClient } from '@supabase/supabase-js';

function cleanSupabaseUrl(url) {
  if (!url) return '';
  return url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
}

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = cleanSupabaseUrl(rawUrl) || 'https://placeholder-project.supabase.co';
const supabasePublishableKey = (rawKey || '').trim() || 'placeholder-publishable-key';

// Client tunggal untuk operasi publik (SELECT) — aman dipakai di browser
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
