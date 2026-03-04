'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Star, Pencil, Trash2, Clock, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RESTAURANTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight">Taomlar <span className="text-primary">Menyusi</span></h1>
          <p className="text-muted-foreground font-medium mt-1">Barcha mahsulotlarni tahrirlang va yangilarini qo'shing</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <button className="flat-button-primary flex items-center gap-2">
              <Plus className="h-6 w-6" /> Yangi Taom Qo'shish
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase">Yangi mahsulot</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-black text-sm uppercase">Taom nomi</Label>
                <Input id="name" placeholder="Masalan: King Burger" className="flat-input h-12" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price" className="font-black text-sm uppercase">Narxi ($)</Label>
                  <Input id="price" type="number" placeholder="12.99" className="flat-input h-12" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category" className="font-black text-sm uppercase">Kategoriya</Label>
                  <Input id="category" placeholder="Burgers" className="flat-input h-12" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="font-black text-sm uppercase">Tavsifi</Label>
                <Textarea id="description" placeholder="Mahsulot haqida ma'lumot..." className="flat-input min-h-[100px]" />
              </div>
              <div className="border-2 border-dashed border-black rounded-xl p-8 text-center bg-muted/20 hover:bg-muted/40 cursor-pointer transition-all">
                <ImageIcon className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <span className="font-black text-sm text-muted-foreground">RASM YUKLASH</span>
              </div>
            </div>
            <DialogFooter>
              <button className="flat-button-primary w-full">SAQLASH</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input 
              placeholder="Qidiruv..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flat-input pl-14 h-16 text-lg"
            />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-xl text-sm font-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                activeCategory === cat 
                  ? "bg-secondary text-white" 
                  : "bg-white text-muted-foreground hover:bg-muted"
              )}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="flat-card overflow-hidden group">
            <div className="relative h-56 border-b-2 border-black">
              <Image 
                src={dish.image} 
                alt={dish.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 left-4 bg-primary text-white border-2 border-black px-4 py-2 rounded-xl font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                ${dish.price.toFixed(2)}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-black uppercase mb-1">{dish.name}</h3>
                  <span className="text-xs font-black text-secondary uppercase tracking-widest">{dish.category}</span>
                </div>
                <div className="flex gap-2">
                  <button className="h-10 w-10 border-2 border-black rounded-xl bg-white flex items-center justify-center hover:bg-muted transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="h-10 w-10 border-2 border-black rounded-xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-muted-foreground font-medium text-sm line-clamp-2 mb-6">
                {dish.description}
              </p>

              <div className="flex justify-between items-center pt-4 border-t-2 border-black border-dashed font-black text-xs uppercase">
                <div className="flex items-center gap-1.5 text-primary">
                  <Clock className="h-4 w-4" /> 15-20 DAQ
                </div>
                <div className="text-green-600">SOTUVDA</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}