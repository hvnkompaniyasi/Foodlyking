import { createClient } from '@supabase/supabase-js';

// Vercel Environment Variables orqali olinadi. 
// Build jarayonida xatolik bermasligi uchun default (placeholder) qiymatlar qo'shildi.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
