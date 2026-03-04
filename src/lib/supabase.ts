import { createClient } from '@supabase/supabase-js';

// Vercel Environment Variables orqali olinadi. 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Build vaqtida xatolik bermasligi uchun tekshiruv
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL yoki Anon Key topilmadi. Iltimos, Vercel Environment Variables-ni sozlang.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
