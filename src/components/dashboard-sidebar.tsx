
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Layers, 
  ClipboardList, 
  MessageSquare, 
  Users, 
  LogOut,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const navItems = [
  { name: 'Boshqaruv paneli', href: '/admin', icon: LayoutDashboard },
  { name: 'Taomlar', href: '/admin/foods', icon: UtensilsCrossed },
  { name: 'Kategoriyalar', href: '/admin/categories', icon: Layers },
  { name: 'Buyurtmalar', href: '/admin/orders', icon: ClipboardList },
  { name: 'Mijozlar', href: '/admin/customers', icon: Users },
  { name: 'Sozlamalar', href: '/admin/settings', icon: Settings },
];

interface SidebarProps {
  onClose?: () => void;
  className?: string;
}

export function DashboardSidebar({ onClose, className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Chiqildi",
      description: "Tizimdan muvaffaqiyatli chiqdingiz.",
    });
    router.push('/');
  };

  return (
    <div className={cn("w-full h-full flex flex-col z-50", className)}>
      <div className="p-8">
        <div className="bg-secondary/10 border-2 border-black rounded-2xl p-4 flex items-center gap-3">
          <div className="bg-secondary p-2 border-2 border-black rounded-xl text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-secondary tracking-widest">Status</p>
            <p className="font-black text-sm uppercase">KING ADMIN</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-6 py-4 rounded-2xl transition-all border-2 border-transparent group uppercase font-black text-xs tracking-wider",
                isActive 
                  ? "bg-primary text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                  : "text-muted-foreground hover:bg-white hover:border-black hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-white" : "group-hover:text-primary transition-colors")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-6 py-5 rounded-2xl bg-red-50 text-red-500 border-2 border-red-500 font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Tizimdan chiqish</span>
        </button>
      </div>
    </div>
  );
}
