
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Star, ArrowRight, ShieldAlert } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'king123') {
      toast({
        title: "Xush kelibsiz!",
        description: "Boshqaruv paneliga muvaffaqiyatli kirdingiz.",
      });
      router.push('/admin');
    } else {
      toast({
        variant: "destructive",
        title: "Xatolik!",
        description: "Login yoki parol noto'g'ri.",
      });
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
              Foydalanuvchi nomi
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

          <button type="submit" className="flat-button-primary w-full h-16 text-xl flex items-center justify-center gap-3">
            KIRISH <ArrowRight className="h-6 w-6" />
          </button>
        </form>

        <p className="text-center mt-10 text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-50">
          © 2024 FOODLY KING CORP. BARCHA HUQUQLAR MAXFIY.
        </p>
      </div>
    </div>
  );
}
