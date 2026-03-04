'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu as MenuIcon, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight text-primary font-headline uppercase">FOODLY KING</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Restoranlar</Link>
            <Link href="/orders" className="text-sm font-medium hover:text-primary transition-colors">Buyurtmalarim</Link>
            <Link href="/discover" className="text-sm font-medium hover:text-primary transition-colors">AI Tavsiyalar</Link>
          </div>
        </div>

        <div className="flex-1 max-w-sm mx-8 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Restoran yoki taom qidirish..."
              className="pl-10 w-full bg-secondary/50 border-none rounded-2xl h-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 h-10 w-10 rounded-xl">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary border-2 border-white">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10 h-10 w-10 rounded-xl">
            <User className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 rounded-xl">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-l-3xl">
              <div className="flex flex-col space-y-6 mt-12">
                <Link href="/" className="text-xl font-bold">Bosh sahifa</Link>
                <Link href="/orders" className="text-xl font-bold">Buyurtmalarim</Link>
                <Link href="/discover" className="text-xl font-bold">AI Tavsiyalar</Link>
                <Link href="/cart" className="text-xl font-bold">Savat</Link>
                <Link href="/admin/foods" className="text-xl font-bold text-primary">Admin Panel</Link>
                <hr className="border-secondary" />
                <Link href="/profile" className="text-lg font-medium text-muted-foreground">Profil sozlamalari</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
