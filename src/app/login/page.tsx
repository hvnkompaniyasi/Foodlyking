
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, Copy, AlertCircle, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const router = useRouter();

  const handleCopyError = () => {
    if (errorDetails) {
      navigator.clipboard.writeText(errorDetails);
      toast({ title: "Nusxalandi!", description: "Xatolik tafsilotlari clipboardga saqlandi." });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErrorDetails(null);
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setErrorDetails(`Auth Xatosi: ${authError.message}`);
        throw authError;
      }
      
      if (!authData.user) throw new Error("Foydalanuvchi topilmadi.");

      // Profilni tekshirish
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) {
        let msg = profileError.message;
        if (msg.includes('infinite recursion')) {
          msg = "Supabase RLS qoidasida xatolik (Infinite Recursion). Iltimos, Supabase Dashboard-da profiles jadvali uchun 'SELECT' qoidasini 'auth.uid() = id' qilib o'zgartiring.";
        }
        setErrorDetails(`Profil yuklash xatosi: ${msg}\nKodni: ${profileError.code}`);
        await supabase.auth.signOut();
        throw new Error("Profil ma'lumotlarini o'qishda xatolik yuz berdi.");
      }

      if (!profile) {
        setErrorDetails(`Profil topilmadi. Profiles jadvalida User ID: ${authData.user.id} bo'lgan qator mavjudligini tekshiring.`);
        await supabase.auth.signOut();
        throw new Error("Profilingiz tizimda topilmadi.");
      }

      if (profile.role === 'king') {
        toast({ title: "Xush kelibsiz!", description: "Boshqaruv paneliga kirdingiz." });
        router.push('/dashboard');
      } else {
        setErrorDetails(`Ruxsat rad etildi. Sizning rolingiz: '${profile.role}'. Faqat 'king' roli kira oladi.`);
        await supabase.auth.signOut();
        throw new Error("Sizda admin huquqlari yo'q.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Kirishda xatolik!",
        description: error.message || "Noma'lum xatolik.",
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
            MAXFIY PORTAL
          </div>
        </div>

        <form onSubmit={handleLogin} className="flat-card p-10 space-y-8 bg-white">
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
            />
          </div>

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
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="flat-button-primary w-full h-20 text-2xl flex items-center justify-center gap-4 disabled:opacity-70 mt-4 uppercase font-black tracking-widest"
          >
            {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : <>KIRISH <ArrowRight className="h-8 w-8" /></>}
          </button>

          {errorDetails && (
            <Alert variant="destructive" className="mt-6 border-2 border-black bg-red-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="font-black uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                Texnik Tashxis <Info className="h-3 w-3" />
              </AlertTitle>
              <AlertDescription className="font-mono text-[10px] break-all bg-white p-3 border border-black rounded-lg mb-3 max-h-32 overflow-y-auto whitespace-pre-wrap">
                {errorDetails}
              </AlertDescription>
              <button 
                type="button"
                onClick={handleCopyError}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-xl font-black text-[10px] uppercase hover:bg-gray-800"
              >
                <Copy className="h-3 w-3" /> Xatolikni nusxalash
              </button>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
