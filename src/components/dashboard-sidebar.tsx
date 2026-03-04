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
  Moon,
  Smile
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Taomlar', href: '/admin/foods', icon: UtensilsCrossed },
  { name: 'Kategoriya', href: '/admin/categories', icon: Layers },
  { name: 'Buyurtmalar', href: '/admin/orders', icon: ClipboardList },
  { name: 'Fikrlar', href: '/admin/feedback', icon: MessageSquare },
  { name: 'Mijozlar', href: '/admin/customers', icon: Users },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r flex flex-col z-50">
      <div className="p-6 flex items-center gap-3 mb-8">
        <div className="bg-primary p-2 rounded-2xl shadow-lg shadow-primary/30">
          <Smile className="text-white h-8 w-8" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-primary font-headline">FOODLY</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-8 py-4 transition-all hover:bg-secondary/50 group",
                isActive ? "active-nav-item" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t">
        <button className="flex items-center gap-4 px-4 py-3 w-full text-muted-foreground hover:bg-secondary rounded-xl transition-all">
          <Moon className="h-5 w-5" />
          <span className="text-sm font-medium">TUNGI MAVZU</span>
        </button>
      </div>
    </div>
  );
}