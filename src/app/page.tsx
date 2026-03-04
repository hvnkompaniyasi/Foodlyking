
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Maxfiy tizim uchun oddiy login tekshiruvi (simulyatsiya)
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
          <div className="inline-flex items-center justify-center bg-primary p-4 border-4 border-black rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white mb-6">
            <Star className="h-10 w-10 fill-white" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            FOODLY<span className="text-primary">KING</span>
          </h1>
          <p className="text-muted-foreground font-bold mt-2 uppercase text-xs tracking-widest">
            MAXFIY BOSHQARUV PORTALI
          </p>
        </div>

        <form onSubmit={handleLogin} className="flat-card p-8 space-y-6 bg-white">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
              Foydalanuvchi nomi
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flat-input pl-12 h-14 font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
              Maxfiy kalit
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flat-input pl-12 h-14 font-bold"
                required
              />
            </div>
          </div>

          <button type="submit" className="flat-button-primary w-full h-14 text-lg flex items-center justify-center gap-2">
            TIZIMGA KIRISH <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <p className="text-center mt-8 text-xs font-black text-muted-foreground uppercase tracking-widest">
          © 2024 FOODLY KING CORP. BARCHA HUQUQLAR HIMOYALANGAN.
        </p>
      </div>
    </div>
  );
}
