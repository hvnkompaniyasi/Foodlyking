
'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, MoreVertical, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

const CATEGORIES = [
  { id: '1', name: 'Burgerlar', count: 12, icon: '🍔' },
  { id: '2', name: 'Pitssalar', count: 8, icon: '🍕' },
  { id: '3', name: 'Sushi', count: 15, icon: '🍣' },
  { id: '4', name: 'Desertlar', count: 6, icon: '🍰' },
  { id: '5', name: 'Ichimliklar', count: 20, icon: '🥤' },
  { id: '6', name: 'Ramen', count: 5, icon: '🍜' },
];

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Kategoriyalar <span className="text-secondary">Boshqaruvi</span></h1>
          <p className="text-muted-foreground font-medium mt-1 uppercase text-xs tracking-widest">Menyu turlarini tartiblang</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <button className="flat-button-secondary flex items-center gap-2">
              <Plus className="h-6 w-6" /> Yangi Kategoriya
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase">Yangi Kategoriya</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cat-name" className="font-black text-sm uppercase">Kategoriya nomi</Label>
                <Input id="cat-name" placeholder="Masalan: Burgerlar" className="flat-input h-12" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cat-icon" className="font-black text-sm uppercase">Ikonka (Emoji)</Label>
                <Input id="cat-icon" placeholder="🍔" className="flat-input h-12 text-center text-2xl" />
              </div>
            </div>
            <DialogFooter>
              <button className="flat-button-secondary w-full uppercase">Qo'shish</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Kategoriya qidirish..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flat-input pl-12 h-14 font-bold text-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="flat-card p-6 flex flex-col justify-between h-56 bg-white group">
            <div className="flex justify-between items-start">
              <div className="h-20 w-20 bg-secondary/10 border-2 border-black rounded-2xl flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div className="flex flex-col gap-2">
                <button className="h-10 w-10 border-2 border-black rounded-xl bg-white flex items-center justify-center hover:bg-muted transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                  <Pencil className="h-4 w-4" />
                </button>
                <button className="h-10 w-10 border-2 border-black rounded-xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tight">{cat.name}</h3>
              <div className="flex items-center gap-2 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                <Hash className="h-3 w-3" /> {cat.count} ta mahsulot bor
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
