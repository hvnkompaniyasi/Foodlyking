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
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-xl text-white">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground uppercase">FOODLY<span className="text-primary">KING</span></span>
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-sm font-bold hover:text-primary transition-colors">Restoranlar</Link>
            <Link href="/orders" className="text-sm font-bold hover:text-primary transition-colors">Buyurtmalarim</Link>
            <Link href="/discover" className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-1.5">
              AI Tavsiyalar
              <Badge className="bg-secondary text-[10px] px-1.5 py-0 h-4 border-none font-black">YANGI</Badge>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative mr-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Qidiruv..."
              className="pl-10 w-48 bg-muted border-none rounded-xl h-10 text-sm focus-visible:ring-primary focus-visible:w-64 transition-all"
            />
          </div>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 h-11 w-11 rounded-xl group transition-all">
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary border-2 border-white font-black">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-secondary/10 h-11 w-11 rounded-xl">
            <User className="h-5 w-5" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-11 w-11 rounded-xl">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-l-[2rem] border-none p-0">
              <div className="p-8 space-y-8 mt-12">
                <div className="flex flex-col space-y-6">
                  <Link href="/" className="text-3xl font-black hover:text-primary">Bosh sahifa</Link>
                  <Link href="/orders" className="text-3xl font-black hover:text-primary">Buyurtmalarim</Link>
                  <Link href="/discover" className="text-3xl font-black hover:text-primary">AI Tavsiyalar</Link>
                  <Link href="/cart" className="text-3xl font-black hover:text-primary">Savat</Link>
                </div>
                <hr className="border-muted" />
                <div className="flex flex-col space-y-4">
                  <Link href="/admin/foods" className="text-xl font-bold text-primary">Admin Panel</Link>
                  <Link href="/profile" className="text-lg font-medium text-muted-foreground">Profil sozlamalari</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}