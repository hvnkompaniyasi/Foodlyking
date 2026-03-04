'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Layers, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const CATEGORIES = [
  { id: '1', name: 'Burgers', count: 12, icon: '🍔' },
  { id: '2', name: 'Pizza', count: 8, icon: '🍕' },
  { id: '3', name: 'Sushi', count: 15, icon: '🍣' },
  { id: '4', name: 'Desserts', count: 6, icon: '🍰' },
  { id: '5', name: 'Drinks', count: 20, icon: '🥤' },
  { id: '6', name: 'Ramen', count: 5, icon: '🍜' },
];

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2">Kategoriyalar boshqaruvi</h1>
          <p className="text-muted-foreground">Menyudagi taomlar turlarini tahrirlang</p>
        </div>
        <Button className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-black h-14 px-8 rounded-2xl flat-button shadow-xl shadow-secondary/20">
          <Plus className="mr-2 h-6 w-6" /> Yangi Kategoriya
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Kategoriya qidirish..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 rounded-2xl border-none bg-white shadow-sm focus-visible:ring-primary text-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="bg-white p-6 rounded-[2rem] border border-border hover:border-secondary/50 transition-all group flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="h-16 w-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-3xl">
                {cat.icon}
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-black mb-1">{cat.name}</h3>
                <Badge className="bg-muted text-muted-foreground hover:bg-muted border-none font-bold">
                  {cat.count} ta mahsulot
                </Badge>
              </div>
              <div className="flex gap-2">
                <button className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <Pencil className="h-5 w-5" />
                </button>
                <button className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}