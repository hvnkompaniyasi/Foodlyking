
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, ShieldAlert, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Role tekshirish
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile?.role === 'king') {
        toast({
          title: "Xush kelibsiz!",
          description: "Boshqaruv paneliga muvaffaqiyatli kirdingiz.",
        });
        router.push('/admin');
      } else {
        await supabase.auth.signOut();
        toast({
          variant: "destructive",
          title: "Kirish rad etildi!",
          description: "Sizda ushbu portalga kirish huquqi yo'q.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Xatolik!",
        description: error.message || "Login yoki parol noto'g'ri.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-primary p-5 border-4 border-black rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white mb-6 animate-bounce">
            <ShieldAlert className="h-12 w-12" />
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">
            FOODLY<span className="text-primary">KING</span>
          </h1>
          <div className="mt-2 inline-block bg-secondary text-white px-4 py-1 border-2 border-black font-black text-[10px] uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            MAXFIY BOSHQARUV PORTALI
          </div>
        </div>

        <form onSubmit={handleLogin} className="flat-card p-10 space-y-8 bg-white">
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
              Email manzilingiz
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="admin@foodlyking.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flat-input pl-12 h-16 text-lg font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
              Maxfiy kalit
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flat-input pl-12 h-16 text-lg font-bold"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="flat-button-primary w-full h-16 text-xl flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>KIRISH <ArrowRight className="h-6 w-6" /></>}
          </button>
        </form>

        <p className="text-center mt-10 text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-50">
          © 2024 FOODLY KING CORP. BARCHA HUQUQLAR MAXFIY.
        </p>
      </div>
    </div>
  );
}
