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
  Smile,
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
    <div className={cn("w-64 bg-white h-full border-r flex flex-col z-50", className)}>
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-2xl shadow-lg shadow-primary/30 text-white">
            <Smile className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary font-headline">FOODLY</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group",
                isActive 
                  ? "bg-primary/10 text-primary font-bold shadow-sm" 
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-primary"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout - Always on the bottom left side */}
      <div className="p-4 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl px-4 h-12">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Chiqish</span>
        </Button>
      </div>
    </div>
  );
}
