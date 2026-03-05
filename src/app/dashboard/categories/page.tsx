
'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: "Kategoriyalarni yuklashda muammo bo'ldi.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    setIsAdding(true);
    try {
      const { error } = await supabase
        .from('categories')
        .insert([{ name: newCatName }]);
      
      if (error) throw error;

      toast({ title: "Muvaffaqiyatli", description: "Yangi kategoriya qo'shildi." });
      setNewCatName('');
      fetchCategories();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Xatolik", description: error.message });
    } finally {
      setIsAdding(false);
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 text-secondary animate-spin mb-4" />
        <p className="font-black uppercase text-xs tracking-widest text-secondary">Kategoriyalar yuklanmoqda...</p>
      </div>
    );
  }

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
                <Input 
                  id="cat-name" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Masalan: Burgerlar" 
                  className="flat-input h-12" 
                />
              </div>
            </div>
            <DialogFooter>
              <button 
                onClick={handleAddCategory}
                disabled={isAdding}
                className="flat-button-secondary w-full uppercase"
              >
                {isAdding ? "Qo'shilmoqda..." : "Qo'shish"}
              </button>
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
              <div className="h-20 w-20 bg-secondary/10 border-2 border-black rounded-2xl flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
                {cat.name[0].toUpperCase()}
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
              <h3 className="text-2xl font-black uppercase tracking-tight line-clamp-1">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
