
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ChevronLeft, CreditCard, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
          <div className="bg-primary/10 p-8 rounded-full mb-6">
            <ShoppingBag className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-headline mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Go back and explore delicious foods!</p>
          <Link href="/">
            <Button size="lg" className="rounded-full px-8 bg-primary">Start Browsing</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8 text-primary font-medium">
          <Link href="/" className="hover:underline flex items-center">
            <ChevronLeft className="h-4 w-4" /> Back to Restaurants
          </Link>
        </div>

        <h1 className="text-3xl font-bold font-headline mb-12">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-secondary shadow-sm">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-headline">{item.name}</h3>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-secondary shadow-lg sticky top-24">
              <h2 className="text-xl font-bold font-headline mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>
              <Button size="lg" className="w-full rounded-full bg-accent hover:bg-accent/90 font-bold mb-4">
                <CreditCard className="mr-2 h-5 w-5" /> Checkout
              </Button>
              <p className="text-[10px] text-center text-muted-foreground">By checking out, you agree to our terms of service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
