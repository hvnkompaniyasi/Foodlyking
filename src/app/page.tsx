'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      toast({
        variant: "destructive",
        title: "Konfiguratsiya xatosi!",
        description: "Supabase URL topilmadi. Vercel sozlamalarini tekshiring.",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user) throw new Error("Foydalanuvchi ma'lumotlari yuklanmadi.");

      // Profiles jadvalidan rolni tekshirish
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) {
        console.error('Profile fetch error:', profileError);
        await supabase.auth.signOut();
        throw new Error("Sizning profilingiz 'profiles' jadvalida topilmadi. Ma'muriyatga murojaat qiling.");
      }

      if (profile.role === 'king') {
        toast({
          title: "Xush kelibsiz, Qirol!",
          description: "Boshqaruv paneliga muvaffaqiyatli kirdingiz.",
        });
        router.push('/admin');
      } else {
        await supabase.auth.signOut();
        toast({
          variant: "destructive",
          title: "Kirish rad etildi!",
          description: `Sizning rolingiz: ${profile.role}. Faqat 'king' roliga ega foydalanuvchilar kira oladi.`,
        });
      }
    } catch (error: any) {
      console.error('Login detailed error:', error);
      let errorMsg = error.message || "Login yoki parol noto'g'ri.";
      
      if (errorMsg === 'Failed to fetch') {
        errorMsg = "Internet aloqasi yoki Supabase URL xatosi. Iltimos, Vercel-dagi URL to'g'riligini (https:// bilan boshlanishini) tekshiring.";
      }

      toast({
        variant: "destructive",
        title: "Xatolik!",
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-none">
            FOODLY<span className="text-primary">KING</span>
          </h1>
          <div className="mt-4 inline-block bg-secondary text-white px-6 py-2 border-4 border-black font-black text-[10px] uppercase tracking-[0.3em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            MAXFIY BOSHQARUV PORTALI
          </div>
        </div>

        <form onSubmit={handleLogin} className="flat-card p-10 space-y-8 bg-white">
          <div className="space-y-3">
            <div className="relative group">
              <div className={cn(
                "absolute left-5 transition-all duration-300 pointer-events-none z-20 flex items-center justify-center",
                (focusedField === 'email' || email) 
                  ? "top-2 scale-75 -translate-x-2 text-primary" 
                  : "top-1/2 -translate-y-1/2 text-black"
              )}>
                <Mail className="h-6 w-6" />
              </div>
              <Input
                type="email"
                value={email}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setEmail(e.target.value)}
                className="flat-input pl-16 h-20 text-lg font-bold w-full focus:border-primary pt-6"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative group">
              <div className={cn(
                "absolute left-5 transition-all duration-300 pointer-events-none z-20 flex items-center justify-center",
                (focusedField === 'password' || password) 
                  ? "top-2 scale-75 -translate-x-2 text-primary" 
                  : "top-1/2 -translate-y-1/2 text-black"
              )}>
                <Lock className="h-6 w-6" />
              </div>
              <Input
                type="password"
                value={password}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setPassword(e.target.value)}
                className="flat-input pl-16 h-20 text-lg font-bold w-full focus:border-primary pt-6"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="flat-button-primary w-full h-20 text-2xl flex items-center justify-center gap-4 disabled:opacity-70 mt-4 uppercase font-black tracking-widest"
          >
            {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : <>KIRISH <ArrowRight className="h-8 w-8" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
