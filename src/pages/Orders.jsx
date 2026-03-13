import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, Bike, Check, XCircle, ShoppingCart } from 'lucide-react';

// --- MOCK DATA ---
const mockOrders = [
    { id: '7892', customer: { name: 'Azizbek Akbarov' }, date: '2024-07-30 14:25', amount: 95000, status: 'Yangi' },
    { id: '7891', customer: { name: 'Laylo Rustamova' }, date: '2024-07-30 13:10', amount: 29000, status: 'Tayyorlanmoqda' },
    { id: '7890', customer: { name: 'Sardor Komilov' }, date: '2024-07-29 18:45', amount: 75000, status: 'Yo\'lda' },
    { id: '7889', customer: { name: 'Madina Aliyeva' }, date: '2024-07-29 12:05', amount: 37000, status: 'Yetkazildi' },
    { id: '7888', customer: { name: 'Otabek Abdullaev' }, date: '2024-07-28 20:15', amount: 54000, status: 'Bekor qilindi' },
];

const statusConfig = {
    'Yangi': { color: '#FFC20E', icon: ShoppingCart },
    'Tayyorlanmoqda': { color: '#3B82F6', icon: Clock },
    'Yo\'lda': { color: '#F26522', icon: Bike },
    'Yetkazildi': { color: '#00A99D', icon: Check },
    'Bekor qilindi': { color: '#EF4444', icon: XCircle },
};

const filterTabs = ['Barchasi', 'Yangi', 'Tayyorlanmoqda', 'Yo\'lda', 'Yetkazildi', 'Bekor qilindi'];

// --- Order Row Component ---
const OrderRow = ({ order }) => {
    const navigate = useNavigate();
    const { color, icon: Icon } = statusConfig[order.status] || {};
    const isNew = order.status === 'Yangi';

    return (
        <motion.tr 
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => navigate(`/orders/${order.id}`)} 
            className="bg-white hover:shadow-2xl hover:shadow-gray-500/10 rounded-2xl transition-all duration-300 cursor-pointer relative"
            aria-label={`Buyurtma #FDLK-${order.id} tafsilotlarini ko'rish`}
        >
            <td className="p-5 rounded-l-2xl">
                <span className={`font-black text-sm ${isNew ? 'text-orange-500' : 'text-gray-800'}`}>#FDLK-{order.id}</span>
                {isNew && <div style={{ '--status-color': color, boxShadow: `0 0 15px 0px ${color}` }} className="w-2.5 h-2.5 rounded-full bg-[var(--status-color)] absolute left-2 top-1/2 -translate-y-1/2 animate-pulse"></div>}
            </td>
            <td className="p-5 font-bold text-sm text-gray-600">{order.customer.name}</td>
            <td className="p-5 font-medium text-xs text-gray-500">{order.date}</td>
            <td className="p-5"><span className="font-black text-black text-sm">{order.amount.toLocaleString()} so'm</span></td>
            <td className="p-5 rounded-r-2xl">
                <div style={{ '--status-color': color, boxShadow: `0 0 20px -3px ${color}60` }} className={`flex items-center gap-2 text-xs font-bold py-2 px-4 rounded-full bg-[var(--status-color)]/10 text-[var(--status-color)]`}>
                    <Icon size={16} />
                    <span>{order.status}</span>
                </div>
            </td>
        </motion.tr>
    );
};

// --- Main Orders Page Component ---
const Orders = () => {
    const [activeFilter, setActiveFilter] = useState('Barchasi');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrders = useMemo(() => {
        return mockOrders
            .filter(order => activeFilter === 'Barchasi' || order.status === activeFilter)
            .filter(order => 
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [activeFilter, searchTerm]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter-premium">Buyurtmalar</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Barcha buyurtmalarni boshqarish paneli</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text"
                        placeholder="ID yoki Mijoz bo'yicha..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="premium-input bg-white w-full !pl-10"
                        aria-label="Buyurtmalarni ID yoki mijoz ismi bo'yicha qidirish"
                    />
                </div>
            </div>

            {/* Segmented Filter */}
            <div className="w-full bg-gray-100 p-1.5 rounded-2xl flex items-center gap-2">
                {filterTabs.map(tab => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveFilter(tab)}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all duration-300 ${activeFilter === tab ? 'bg-white text-black shadow-md' : 'bg-transparent text-gray-500 hover:text-black'}`}
                        aria-pressed={activeFilter === tab}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
                 <table className="w-full border-separate" style={{ borderSpacing: '0 1rem' }}>
                    <thead>
                        <tr>
                            <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Buyurtma ID</th>
                            <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Mijoz</th>
                            <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Sana</th>
                            <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Summa</th>
                            <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => <OrderRow key={order.id} order={order} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
