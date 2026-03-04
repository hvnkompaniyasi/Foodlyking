import { createClient } from '@supabase/supabase-js';

// Vercel Environment Variables orqali olinadi. 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

// URL oxirida ortiqcha / bo'lsa uni olib tashlash
const cleanUrl = supabaseUrl?.endsWith('/') ? supabaseUrl.slice(0, -1) : supabaseUrl;

if (!cleanUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.error('Supabase configuration missing! Please check Vercel environment variables.');
  }
}

export const supabase = createClient(
  cleanUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
