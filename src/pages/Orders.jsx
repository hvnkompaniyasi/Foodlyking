import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Printer, CheckCircle, XCircle, Clock, Bike, Check } from 'lucide-react';

// --- MOCK DATA ---
const mockOrders = [
    { id: '#FDLK-7892', customer: { name: 'Azizbek Akbarov', phone: '+998 90 123 45 67' }, date: '2024-07-30 14:25', amount: 95000, status: 'Yangi', items: [{ name: 'BBQ Burger', quantity: 2 }, { name: 'Cola 1.5L', quantity: 1 }] },
    { id: '#FDLK-7891', customer: { name: 'Laylo Rustamova', phone: '+998 93 987 65 43' }, date: '2024-07-30 13:10', amount: 29000, status: 'Tayyorlanmoqda', items: [{ name: 'Chicken King', quantity: 1 }] },
    { id: '#FDLK-7890', customer: { name: 'Sardor Komilov', phone: '+998 99 555 88 99' }, date: '2024-07-29 18:45', amount: 75000, status: 'Yo\'lda', items: [{ name: 'Special Kombo', quantity: 1 }] },
    { id: '#FDLK-7889', customer: { name: 'Madina Aliyeva', phone: '+998 91 234 56 78' }, date: '2024-07-29 12:05', amount: 37000, status: 'Yetkazildi', items: [{ name: 'Student Kombo', quantity: 1 }, { name: 'Cola 0.5L', quantity: 1 }] },
    { id: '#FDLK-7888', customer: { name: 'Otabek Abdullaev', phone: '+998 94 657 34 21' }, date: '2024-07-28 20:15', amount: 54000, status: 'Bekor qilindi', items: [{ name: 'BBQ Burger', quantity: 1 }, { name: 'Fanta 1L', quantity: 1 }] },
];

const statusConfig = {
    'Yangi': { color: '#FFC20E', icon: Clock, label: 'Yangi' },
    'Tayyorlanmoqda': { color: '#3B82F6', icon: Clock, label: 'Tayyorlanmoqda' },
    'Yo\'lda': { color: '#F26522', icon: Bike, label: 'Yo\'lda' },
    'Yetkazildi': { color: '#00A99D', icon: Check, label: 'Yetkazildi' },
    'Bekor qilindi': { color: '#EF4444', icon: XCircle, label: 'Bekor qilindi' },
};

const filterTabs = ['Barchasi', 'Yangi', 'Tayyorlanmoqda', 'Yo\'lda', 'Yetkazildi'];

// --- Order Row Component ---
const OrderRow = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { color, icon: Icon } = statusConfig[order.status] || {};

    const isNew = order.status === 'Yangi';

    return (
        <React.Fragment>
            <tr 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="group bg-white hover:shadow-2xl hover:shadow-gray-500/10 rounded-2xl transition-all duration-300 cursor-pointer"
                aria-expanded={isExpanded}
                aria-label={`Buyurtma ${order.id} tafsilotlarini ${isExpanded ? 'yopish' : 'ochish'}`}
            >
                <td className="p-5 rounded-l-2xl">
                    <span className={`font-black text-sm ${isNew ? 'text-orange-500' : 'text-gray-800'}`}>{order.id}</span>
                    {isNew && <div className="w-2 h-2 rounded-full bg-orange-500 absolute left-2 top-1/2 -translate-y-1/2 animate-pulse"></div>}
                </td>
                <td className="p-5 font-bold text-sm text-gray-600">{order.customer.name}</td>
                <td className="p-5 font-medium text-xs text-gray-500">{order.date}</td>
                <td className="p-5"><span className="font-black text-black text-sm">{order.amount.toLocaleString()} so'm</span></td>
                <td className="p-5">
                    <div style={{ '--status-color': color, boxShadow: `0 0 15px -2px ${color}50` }} className={`flex items-center gap-2 text-xs font-bold py-2 px-3 rounded-lg bg-[var(--status-color)] text-white`}>
                        <Icon size={14} />
                        <span>{order.status}</span>
                    </div>
                </td>
                <td className="p-5 rounded-r-2xl text-right">
                    <ChevronDown size={20} className={`text-gray-400 group-hover:text-black transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </td>
            </tr>
            <AnimatePresence>
                {isExpanded && (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <td colSpan={6} className="pb-4 px-2">
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                <div className="bg-gray-50 rounded-2xl p-5 mx-2.5 flex justify-between items-start">
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-wider text-gray-500 mb-3">Tarkibi</h4>
                                        <ul className="space-y-2 mb-4">
                                            {order.items.map(item => <li key={item.name} className="text-sm font-bold text-gray-700">{item.quantity}x {item.name}</li>)}
                                        </ul>
                                        <h4 className="font-black text-xs uppercase tracking-wider text-gray-500 mb-2">Mijoz raqami</h4>
                                        <p className="font-bold text-gray-700">{order.customer.phone}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button aria-label="Kvitansiya chiqarish" className="p-3 bg-white rounded-lg shadow-sm border text-gray-600 hover:text-black hover:border-gray-300 transition-all"><Printer size={16} /></button>
                                        <button aria-label="Buyurtmani bekor qilish" className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"><XCircle size={16} /></button>
                                        <button aria-label="Buyurtmani tasdiqlash" className="flex items-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-bold text-sm"><CheckCircle size={16} /> Tasdiqlash</button>
                                    </div>
                                </div>
                            </motion.div>
                        </td>
                    </motion.tr>
                )}
            </AnimatePresence>
        </React.Fragment>
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
                            <th className="p-4"></th>
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
