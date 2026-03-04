
'use client';

import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, Package, Bike, UtensilsCrossed } from 'lucide-react';

export default function OrdersPage() {
  const currentOrder = {
    id: 'FK-98210',
    restaurant: 'Burger Royale',
    status: 'Preparing',
    progress: 45,
    estimatedTime: '15 mins',
    items: [
      { name: 'King Burger', price: 12.99 },
      { name: 'Truffle Fries', price: 5.99 }
    ]
  };

  const steps = [
    { label: 'Confirmed', icon: CheckCircle2, completed: true },
    { label: 'Preparing', icon: UtensilsCrossed, active: true },
    { label: 'Picked up', icon: Package, completed: false },
    { label: 'Near you', icon: Bike, completed: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold font-headline mb-8">Active Orders</h1>
        
        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white mb-12">
          <CardHeader className="bg-primary text-white p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <CardTitle className="text-3xl font-bold font-headline">Order #{currentOrder.id}</CardTitle>
                <p className="opacity-90 mt-1">From {currentOrder.restaurant}</p>
              </div>
              <Badge className="bg-white text-primary px-4 py-1.5 text-sm font-bold border-none">
                {currentOrder.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Clock className="h-4 w-4" />
              Estimated delivery in {currentOrder.estimatedTime}
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {/* Status Steps */}
            <div className="relative flex justify-between mb-12 px-2">
              <div className="absolute top-5 left-8 right-8 h-1 bg-secondary z-0" />
              <div className="absolute top-5 left-8 h-1 bg-primary transition-all duration-1000 z-0" style={{ width: '33%' }} />
              
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center">
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center border-4 ${
                      step.completed || step.active ? 'bg-primary border-white text-white shadow-lg' : 'bg-white border-secondary text-muted-foreground'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] mt-3 font-bold uppercase tracking-widest ${
                      step.active ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="bg-secondary/30 rounded-2xl p-6 mb-8">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-primary" />
                Order Items
              </h3>
              <div className="space-y-3">
                {currentOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">1x {item.name}</span>
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-secondary pt-3 mt-3 flex justify-between font-bold text-lg">
                  <span>Total Paid</span>
                  <span className="text-primary">$18.98</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-accent/5 p-4 rounded-2xl border border-accent/20">
              <div className="bg-accent/10 p-3 rounded-full">
                <Bike className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-bold text-accent">John is your delivery partner</p>
                <p className="text-sm text-muted-foreground">He is currently waiting at the restaurant.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold font-headline mb-6">Recent Orders</h2>
        <div className="space-y-4 opacity-70">
          <div className="bg-white p-6 rounded-2xl border border-secondary flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center font-bold text-primary">S</div>
              <div>
                <p className="font-bold">Sakura Zen</p>
                <p className="text-xs text-muted-foreground">March 12, 2024 • $34.50</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">Reorder</Button>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-secondary flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center font-bold text-primary">B</div>
              <div>
                <p className="font-bold">Bella Pizza</p>
                <p className="text-xs text-muted-foreground">March 08, 2024 • $22.10</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">Reorder</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
