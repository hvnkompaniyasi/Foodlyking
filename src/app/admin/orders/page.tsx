'use client';

import { useState } from 'react';
import { 
  Search, 
  Package, 
  Clock, 
  Filter,
  CheckCircle2,
  XCircle,
  Truck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Yangi': return <Package className="h-5 w-5" />;
      case 'Olingan': return <Truck className="h-5 w-5" />;
      case 'Yetkazilgan': return <CheckCircle2 className="h-5 w-5" />;
      case 'Bekor qilingan': return <XCircle className="h-5 w-5" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Yangi': return "bg-primary text-white";
      case 'Olingan': return "bg-secondary text-white";
      case 'Yetkazilgan': return "bg-green-500 text-white";
      case 'Bekor qilingan': return "bg-red-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">Buyurtmalar <span className="text-primary">Boshqaruvi</span></h1>
        <p className="text-muted-foreground font-medium">Barcha buyurtmalarni holatiga ko'ra kuzating</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
        <div className="flex bg-white p-2 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full xl:w-auto overflow-x-auto no-scrollbar gap-2">
          {['Hammasi', 'Yangi', 'Olingan', 'Yetkazilgan', 'Bekor qilingan'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-6 py-3 rounded-xl text-sm font-black transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-primary text-white" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full xl:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Mijoz ismi yoki ID raqami..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flat-input pl-12 h-14 w-full"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="flat-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 group">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className={cn(
                  "h-16 w-16 rounded-2xl border-2 border-black flex items-center justify-center",
                  getStatusColor(order.status)
                )}>
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-black text-xl">{order.customer}</span>
                    <span className="text-muted-foreground font-bold">#{order.id}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {order.time}</span>
                    <span>{order.items} ta mahsulot</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-auto md:gap-16 border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <div className="text-2xl font-black text-primary mb-1">${order.total.toFixed(2)}</div>
                  <Badge className={cn("font-black rounded-lg border-2 border-black px-3 py-1", getStatusColor(order.status))}>
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flat-button-secondary py-2 px-4 h-10 text-xs">
                    Batafsil
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center flat-card bg-muted/30 border-dashed">
            <Package className="h-20 w-20 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-2xl font-black">Buyurtmalar topilmadi</h3>
            <p className="text-muted-foreground font-medium">Qidiruv natijasi bo'yicha hech qanday ma'lumot yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
}