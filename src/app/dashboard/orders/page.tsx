
'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Package, 
  Clock, 
  CheckCircle2,
  XCircle,
  Truck,
  Filter,
  ArrowRight,
  Loader2,
  Phone
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { uz } from 'date-fns/locale';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: "Buyurtmalarni yuklashda xatolik yuz berdi.",
      });
    } finally {
      setLoading(false);
    }
  };

  const statusMap: Record<string, string> = {
    'new': 'Yangi',
    'preparing': 'Olingan',
    'delivered': 'Yetkazilgan',
    'cancelled': 'Bekor qilingan'
  };

  const filteredOrders = orders.filter(order => {
    const statusLabel = statusMap[order.status] || order.status;
    const matchesStatus = activeTab === 'Barchasi' || statusLabel === activeTab;
    const matchesSearch = 
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.id.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Package className="h-5 w-5" />;
      case 'preparing': return <Truck className="h-5 w-5" />;
      case 'delivered': return <CheckCircle2 className="h-5 w-5" />;
      case 'cancelled': return <XCircle className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return "bg-primary text-white";
      case 'preparing': return "bg-secondary text-white";
      case 'delivered': return "bg-green-500 text-white";
      case 'cancelled': return "bg-red-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="font-black uppercase text-xs tracking-widest text-primary">Buyurtmalar filtri yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Buyurtmalar <span className="text-primary">Filtr</span></h1>
          <p className="text-muted-foreground font-bold mt-1 uppercase text-xs tracking-widest">Xaridlar va yetkazib berish holati</p>
        </div>
        <div className="flex items-center gap-3 bg-white border-2 border-black p-3 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <Filter className="h-6 w-6 text-primary" />
          <span className="font-black text-sm uppercase tracking-wider">Aqlli Filtr</span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
        <div className="flex bg-white p-2 border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full xl:w-auto overflow-x-auto no-scrollbar gap-2">
          {['Barchasi', 'Yangi', 'Olingan', 'Yetkazilgan', 'Bekor qilingan'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-4 rounded-3xl text-xs font-black transition-all whitespace-nowrap uppercase tracking-widest border-2 border-transparent",
                activeTab === tab 
                  ? "bg-primary text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full xl:w-[400px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input 
            placeholder="Mijoz ismi yoki ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flat-input pl-14 h-16 w-full text-lg font-bold"
          />
        </div>
      </div>

      <div className="grid gap-8">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="flat-card p-8 flex flex-col lg:flex-row items-center justify-between gap-8 bg-white group hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-8 w-full lg:w-auto">
                <div className={cn(
                  "h-20 w-20 rounded-[1.5rem] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-rotate-3 transition-transform",
                  getStatusColor(order.status)
                )}>
                  {getStatusIcon(order.status)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-4">
                    <span className="font-black text-2xl uppercase tracking-tighter line-clamp-1">{order.customer_name}</span>
                    <span className="bg-muted px-2 py-1 border-2 border-black rounded text-[10px] font-black shrink-0">#{order.id.slice(0, 8)}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">
                    <span className="flex items-center gap-2 text-primary">
                      <Clock className="h-4 w-4" /> 
                      {format(new Date(order.created_at), 'HH:mm • d-MMMM', { locale: uz })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {order.customer_phone}
                    </span>
                    <span className="flex items-center gap-2">
                      <Package className="h-4 w-4" /> {order.items?.length || 0} ta taom
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full lg:w-auto lg:gap-20 border-t-4 border-black border-dashed lg:border-none pt-8 lg:pt-0">
                <div className="text-left lg:text-right space-y-2">
                  <div className="text-3xl font-black text-primary tracking-tighter">
                    {order.total_amount?.toLocaleString()} so'm
                  </div>
                  <div className={cn("inline-block font-black rounded-xl border-2 border-black px-4 py-1.5 text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]", getStatusColor(order.status))}>
                    {statusMap[order.status] || order.status}
                  </div>
                </div>
                
                <button className="flat-button-secondary h-16 w-16 p-0 flex items-center justify-center rounded-2xl group-hover:rotate-6 transition-transform">
                  <ArrowRight className="h-8 w-8" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-32 text-center border-8 border-dashed border-muted rounded-[4rem] bg-white/50">
            <Package className="h-24 w-24 text-muted-foreground/20 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase tracking-tighter">Buyurtmalar topilmadi</h3>
            <p className="text-muted-foreground font-black uppercase text-xs tracking-widest mt-3">Siz tanlagan filtr bo'yicha ma'lumot yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
}
