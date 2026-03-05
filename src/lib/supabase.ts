import { createClient } from '@supabase/supabase-js';

// Vercel Environment Variables orqali olinadi. 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

// URL formatini tekshirish va tozalash
const getCleanUrl = (url?: string) => {
  if (!url) return 'https://placeholder.supabase.co';
  let clean = url.endsWith('/') ? url.slice(0, -1) : url;
  if (!clean.startsWith('http')) {
    clean = `https://${clean}`;
  }
  return clean;
};

const cleanUrl = getCleanUrl(supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.warn('Supabase config missing. URL:', supabaseUrl ? 'Set' : 'Missing', 'Key:', supabaseAnonKey ? 'Set' : 'Missing');
  }
}

export const supabase = createClient(
  cleanUrl, 
  supabaseAnonKey || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
