
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu as MenuIcon, UtensilsCrossed, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Chiqildi",
      description: "Tizimdan muvaffaqiyatli chiqdingiz.",
    });
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-4 border-black">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 border-2 border-black rounded-xl text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground uppercase">FOODLY<span className="text-primary">KING</span></span>
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            <Badge className="bg-muted text-muted-foreground border-2 border-black font-black uppercase text-[10px] tracking-widest py-1 px-3">
              ADMIN REJIM
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative mr-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Qidiruv..."
              className="flat-input pl-10 w-48 h-10 text-xs focus:w-64 transition-all"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative hover:bg-muted h-11 w-11 rounded-xl border-2 border-transparent hover:border-black transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </Button>
          
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex hover:bg-red-50 hover:text-red-500 h-11 w-11 rounded-xl border-2 border-transparent hover:border-red-500 transition-all"
          >
            <LogOut className="h-5 w-5" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-11 w-11 rounded-xl border-2 border-black">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-4 border-black p-0">
              <div className="p-8 space-y-8 mt-12">
                <div className="flex flex-col space-y-6">
                  <Link href="/dashboard" className="text-3xl font-black hover:text-primary uppercase tracking-tighter">Bosh sahifa</Link>
                  <Link href="/dashboard/foods" className="text-3xl font-black hover:text-primary uppercase tracking-tighter">Taomlar</Link>
                  <Link href="/dashboard/orders" className="text-3xl font-black hover:text-primary uppercase tracking-tighter">Buyurtmalar</Link>
                  <Link href="/dashboard/categories" className="text-3xl font-black hover:text-primary uppercase tracking-tighter">Kategoriyalar</Link>
                </div>
                <hr className="border-4 border-black" />
                <button onClick={handleLogout} className="text-2xl font-black text-red-500 uppercase tracking-tighter flex items-center gap-2">
                  <LogOut className="h-6 w-6" /> TIZIMDAN CHIQISH
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
