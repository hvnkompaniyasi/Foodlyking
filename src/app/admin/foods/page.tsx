'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Star, Pencil, Trash2, Clock, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RESTAURANTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function AdminFoodsPage() {
  const [activeCategory, setActiveCategory] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  
  const allDishes = RESTAURANTS.flatMap(r => r.menu.map(d => ({ ...d, restaurantName: r.name })));
  
  const categories = ['Barchasi', 'Burgers', 'Pizza', 'Sushi', 'Ramen', 'Sides', 'Dessert'];

  const filteredDishes = allDishes.filter(dish => {
    const matchesCategory = activeCategory === 'Barchasi' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 md:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-2">
            Taomlar boshqaruvi <span role="img" aria-label="burger">🍔</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Menyudagi barcha taomlarni ko'rish va tahrirlash</p>
        </div>
        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-5 w-5" /> Yangi Taom Qo'shish
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Taom nomini qidiring..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-white border-none shadow-sm rounded-2xl text-lg focus-visible:ring-primary"
            />
          </div>
          <Button variant="outline" className="h-14 rounded-2xl border-none shadow-sm bg-white md:w-auto px-6">
            <SlidersHorizontal className="mr-2 h-5 w-5" /> Filtrlar
          </Button>
        </div>

        {/* Category Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm whitespace-nowrap border border-transparent flex-shrink-0",
                activeCategory === cat 
                  ? "bg-primary text-white shadow-primary/30" 
                  : "bg-white text-muted-foreground hover:bg-secondary border-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid - Responsive grid columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary group">
              <div className="relative h-48 md:h-56">
                <Image 
                  src={dish.image} 
                  alt={dish.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-white/95 text-primary px-4 py-1.5 rounded-full font-bold text-sm shadow-md">
                  ${dish.price.toFixed(2)}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 px-2 py-1 rounded-lg flex items-center gap-1 shadow-md">
                  <Star className="h-3 w-3 fill-[#FFD700] text-[#FFD700]" />
                  <span className="text-[10px] font-bold">4.8</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold font-headline mb-1 line-clamp-1">{dish.name}</h3>
                    <Badge variant="secondary" className="text-[10px] font-bold text-primary uppercase tracking-wider rounded-lg px-2 py-0">
                      {dish.category}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <button className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-border/50">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors border border-border/50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
                  {dish.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-secondary text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    15-20 DAQ
                  </div>
                  <div className="flex items-center gap-1.5 text-green-600">
                    SOTUVDA BOR
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-secondary/50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">Hech narsa topilmadi</h3>
            <p className="text-muted-foreground">Qidiruv so'rovini yoki filtrni o'zgartirib ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
}
