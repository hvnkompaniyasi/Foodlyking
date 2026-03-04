'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Package, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

type OrderStatus = 'Yangi' | 'Olingan' | 'Yetkazilgan' | 'Bekor qilingan';

const ORDERS = [
  { id: '1001', customer: 'Azizov Shokir', total: 45.50, status: 'Yangi', time: '5 daqiqa oldin', items: 3 },
  { id: '1002', customer: 'Malika Karimova', total: 22.00, status: 'Olingan', time: '15 daqiqa oldin', items: 1 },
  { id: '1003', customer: 'Bobur Mirzo', total: 89.90, status: 'Yetkazilgan', time: '1 soat oldin', items: 5 },
  { id: '1004', customer: 'Oyatillo Abdujalilov', total: 12.00, status: 'Bekor qilingan', time: '2 soat oldin', items: 2 },
  { id: '1005', customer: 'Sevara Azimova', total: 34.20, status: 'Yangi', time: '10 daqiqa oldin', items: 2 },
];

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'Hammasi'>('Hammasi');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = ORDERS.filter(order => {
    const matchesStatus = activeTab === 'Hammasi' || order.status === activeTab;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || order.id.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Yangi': return <Badge className="bg-primary text-white font-bold rounded-lg border-none">YANGI</Badge>;
      case 'Olingan': return <Badge className="bg-secondary text-white font-bold rounded-lg border-none">OLINGAN</Badge>;
      case 'Yetkazilgan': return <Badge className="bg-green-500 text-white font-bold rounded-lg border-none">YETKAZILDI</Badge>;
      case 'Bekor qilingan': return <Badge variant="destructive" className="font-bold rounded-lg border-none">BEKOR QILINDI</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black mb-2">Buyurtmalar boshqaruvi</h1>
        <p className="text-muted-foreground">Mijozlardan kelib tushgan buyurtmalarni kuzatib boring</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex bg-white p-1.5 rounded-2xl border border-border w-full md:w-auto overflow-x-auto no-scrollbar">
          {['Hammasi', 'Yangi', 'Olingan', 'Yetkazilgan', 'Bekor qilingan'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Mijoz yoki ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-2xl border-none bg-white shadow-sm focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-[1.5rem] border border-border hover:border-primary/20 transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center text-white",
                  order.status === 'Yangi' ? "bg-primary" : order.status === 'Olingan' ? "bg-secondary" : "bg-muted text-muted-foreground"
                )}>
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">{order.customer}</span>
                    <span className="text-muted-foreground text-sm">#{order.id}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {order.time}</span>
                    <span>{order.items} ta mahsulot</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
                <div className="text-center md:text-right">
                  <div className="text-xl font-black text-primary mb-1">${order.total.toFixed(2)}</div>
                  {getStatusBadge(order.status)}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-10 px-4 font-bold border-muted">
                    Batafsil
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuLabel>Holatni o'zgartirish</DropdownMenuLabel>
                      <DropdownMenuItem className="text-secondary font-bold">Olingan</DropdownMenuItem>
                      <DropdownMenuItem className="text-green-600 font-bold">Yetkazilgan</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive font-bold">Bekor qilish</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-muted-foreground/30">
            <Package className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Buyurtmalar mavjud emas</h3>
            <p className="text-muted-foreground">Tanlangan filtr bo'yicha hech narsa topilmadi</p>
          </div>
        )}
      </div>
    </div>
  );
}