
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
            <span className="text-xl font-bold tracking-tight text-primary font-headline">FOODLY KING</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Restaurants</Link>
            <Link href="/orders" className="text-sm font-medium hover:text-primary transition-colors">Orders</Link>
            <Link href="/discover" className="text-sm font-medium hover:text-primary transition-colors">Discover AI</Link>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for restaurants or dishes..."
              className="pl-9 w-full bg-secondary/50 border-none rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10">
            <User className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg font-medium">Home</Link>
                <Link href="/orders" className="text-lg font-medium">My Orders</Link>
                <Link href="/discover" className="text-lg font-medium">AI Discovery</Link>
                <Link href="/profile" className="text-lg font-medium">Profile</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
