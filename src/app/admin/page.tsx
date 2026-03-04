
'use client';

import { 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign,
  ArrowUpRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const DATA = [
  { name: 'Dush', sales: 4000 },
  { name: 'Sesh', sales: 3000 },
  { name: 'Chor', sales: 2000 },
  { name: 'Pay', sales: 2780 },
  { name: 'Jum', sales: 1890 },
  { name: 'Shan', sales: 2390 },
  { name: 'Yak', sales: 3490 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tight">Asosiy <span className="text-primary">Ko'rsatkichlar</span></h1>
        <p className="text-muted-foreground font-medium mt-1">Bugungi kungi tizim holati va umumiy statistika</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Bugungi tushum", value: "$2,450", icon: DollarSign, color: "bg-green-500", trend: "+12%" },
          { label: "Yangi buyurtmalar", value: "48", icon: Package, color: "bg-primary", trend: "+5%" },
          { label: "Mijozlar", value: "1,240", icon: Users, color: "bg-secondary", trend: "+18%" },
          { label: "Faoliyat", value: "98%", icon: TrendingUp, color: "bg-orange-400", trend: "Stabil" }
        ].map((stat, i) => (
          <div key={i} className="flat-card p-6 bg-white">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 border-2 border-black rounded-xl text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black bg-muted px-2 py-1 rounded border-2 border-black">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-muted-foreground font-black text-xs uppercase tracking-widest">{stat.label}</h3>
            <div className="text-3xl font-black mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flat-card p-8 bg-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black uppercase">Haftalik Savdo</h3>
            <button className="text-xs font-black text-primary hover:underline flex items-center gap-1 uppercase">
              Batafsil <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontWeight: 'bold', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontWeight: 'bold', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '2px solid black',
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                    fontWeight: 'bold'
                  }}
                />
                <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                  {DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flat-card p-8 bg-white flex flex-col">
          <h3 className="text-xl font-black uppercase mb-6">So'nggi harakatlar</h3>
          <div className="space-y-6 flex-1">
            {[
              { text: "Yangi buyurtma #1092", time: "2 daq oldin", icon: Package, color: "text-primary" },
              { text: "Taom tahrirlandi", time: "15 daq oldin", icon: CheckCircle2, color: "text-green-500" },
              { text: "Kuryer yo'lga chiqdi", time: "22 daq oldin", icon: Clock, color: "text-secondary" },
              { text: "Mijoz fikri keldi", time: "1 soat oldin", icon: Users, color: "text-orange-400" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`mt-1 ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black text-sm uppercase leading-none mb-1">{item.text}</p>
                  <p className="text-xs text-muted-foreground font-bold uppercase">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="flat-button-secondary w-full mt-8 py-3 text-xs uppercase">Barchasini ko'rish</button>
        </div>
      </div>
    </div>
  );
}
