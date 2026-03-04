'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Star, Pencil, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RESTAURANTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AdminFoodsPage() {
  const [activeCategory, setActiveCategory] = useState('Barchasi');
  
  // Get all dishes from all restaurants for the dashboard
  const allDishes = RESTAURANTS.flatMap(r => r.menu.map(d => ({ ...d, restaurantName: r.name })));
  
  const categories = ['Barchasi', 'Fast Food', 'Healthy', 'Drinks', 'Desserts'];

  const filteredDishes = activeCategory === 'Barchasi' 
    ? allDishes 
    : allDishes.filter(dish => dish.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          Taomlar <span role="img" aria-label="burger">🍔</span>
        </h1>
        <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-5 w-5" /> Yangi Taom
        </Button>
      </div>

      {/* Categories & Search - Aligned to Left */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm whitespace-nowrap border border-transparent",
                activeCategory === cat 
                  ? "bg-[#00D1B2] text-white shadow-[#00D1B2]/30" 
                  : "bg-white text-muted-foreground hover:bg-secondary border-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Qidirish..." 
            className="pl-12 h-14 bg-white border-none shadow-sm rounded-2xl text-lg focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary group">
            <div className="relative h-56">
              <Image 
                src={dish.image} 
                alt={dish.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {/* Price Tag */}
              <div className="absolute top-4 left-4 bg-white/95 text-primary px-4 py-1.5 rounded-full font-bold text-sm shadow-md">
                {dish.price.toLocaleString()} 000 so'm
              </div>
              {/* Rating */}
              <div className="absolute top-4 right-4 bg-white/95 px-2 py-1 rounded-lg flex items-center gap-1 shadow-md">
                <Star className="h-3 w-3 fill-[#FFD700] text-[#FFD700]" />
                <span className="text-[10px] font-bold">4.8</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold font-headline mb-1">{dish.name}</h3>
                  <span className="text-[10px] font-bold text-[#00D1B2] uppercase tracking-wider">{dish.category.toUpperCase()}</span>
                </div>
                <div className="flex gap-2">
                  <button className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-border/50">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors border border-border/50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm line-clamp-2 mb-6 h-10">
                {dish.description}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-secondary text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  15 DAQ
                </div>
                <div className="flex items-center gap-1.5 text-primary">
                  10 TA QOLDI
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
