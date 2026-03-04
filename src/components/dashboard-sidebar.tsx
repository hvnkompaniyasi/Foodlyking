'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Layers, 
  ClipboardList, 
  MessageSquare, 
  Users, 
  LogOut,
  Utensils,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Boshqaruv paneli', href: '/admin', icon: LayoutDashboard },
  { name: 'Taomlar', href: '/admin/foods', icon: UtensilsCrossed },
  { name: 'Kategoriyalar', href: '/admin/categories', icon: Layers },
  { name: 'Buyurtmalar', href: '/admin/orders', icon: ClipboardList },
  { name: 'Fikr-mulohazalar', href: '/admin/feedback', icon: MessageSquare },
  { name: 'Mijozlar', href: '/admin/customers', icon: Users },
];

interface SidebarProps {
  onClose?: () => void;
  className?: string;
}

export function DashboardSidebar({ onClose, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("w-64 bg-white h-full border-r border-border/40 flex flex-col z-50", className)}>
      {/* Logo Section */}
      <div className="p-8 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-2xl shadow-xl shadow-primary/20 text-white">
            <Utensils className="h-6 w-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-foreground font-headline uppercase">FOODLY<span className="text-primary">KING</span></span>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden h-10 w-10 rounded-xl">
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-5 py-4 rounded-2xl transition-all group",
                isActive 
                  ? "bg-primary text-white font-black shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-white" : "group-hover:text-primary transition-colors")} />
              <span className="text-[15px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-border/40 mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl px-5 h-14 font-bold">
          <LogOut className="h-5 w-5" />
          <span>Chiqish</span>
        </Button>
      </div>
    </div>
  );
}