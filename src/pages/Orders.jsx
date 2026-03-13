import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Bike, Check, XCircle, ShoppingCart } from 'lucide-react';

// --- MOCK DATA ---
const mockOrders = [
    { id: '7892', customer: { name: 'Azizbek Akbarov' }, date: '2024-07-30 14:25', amount: 95000, status: 'Yangi' },
    { id: '7891', customer: { name: 'Laylo Rustamova' }, date: '2024-07-30 13:10', amount: 29000, status: 'Tayyorlanmoqda' },
    { id: '7890', customer: { name: 'Sardor Komilov' }, date: '2024-07-29 18:45', amount: 75000, status: 'Yo'lda' },
    { id: '7889', customer: { name: 'Madina Aliyeva' }, date: '2024-07-29 12:05', amount: 37000, status: 'Yetkazildi' },
    { id: '7888', customer: { name: 'Otabek Abdullaev' }, date: '2024-07-28 20:15', amount: 54000, status: 'Bekor qilindi' },
];

const statusConfig = {
    'Yangi': { color: '#FFC20E', Icon: ShoppingCart },
    'Tayyorlanmoqda': { color: '#4285F4', Icon: Clock },
    'Yo'lda': { color: '#F26522', Icon: Bike },
    'Yetkazildi': { color: '#00A99D', Icon: Check },
    'Bekor qilindi': { color: '#EF4444', Icon: XCircle },
};

const statusFilters = ['Barchasi', 'Yangi', 'Tayyorlanmoqda', 'Yo'lda', 'Yetkazildi', 'Bekor qilindi'];

const Orders = () => {
    const navigate = useNavigate();
    const [orders] = useState(mockOrders);
    const [activeFilter, setActiveFilter] = useState('Barchasi');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredByStatus = useMemo(() => {
        if (activeFilter === 'Barchasi') {
            return orders;
        }
        return orders.filter(order => order.status === activeFilter);
    }, [activeFilter, orders]);

    const filteredOrders = useMemo(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase().trim();
        if (!lowercasedSearchTerm) return filteredByStatus;

        return filteredByStatus.filter(order =>
            order.customer.name.toLowerCase().includes(lowercasedSearchTerm) ||
            order.id.includes(lowercasedSearchTerm)
        );
    }, [searchTerm, filteredByStatus]);

    const OrderRow = ({ order }) => {
        const status = statusConfig[order.status];
        return (
            <motion.tr 
                layout 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => navigate(`/orders/${order.id}`)} 
                className="cursor-pointer hover:bg-gray-800/60 transition-colors"
            >
                <td className="p-4 font-black tracking-tighter-premium">#{order.id}</td>
                <td className="p-4">{order.customer.name}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4 font-bold text-right">{order.amount.toLocaleString()} so'm</td>
                <td className="p-4">
                    <div className="flex justify-end">
                         <div style={{ '--status-color': status.color, boxShadow: `0 0 15px -5px ${status.color}60` }} className={`flex items-center gap-2 text-xs font-bold py-1.5 px-3 rounded-full bg-[var(--status-color)]/10 text-[var(--status-color)]`}>
                            <status.Icon size={14} />
                            <span>{order.status}</span>
                        </div>
                    </div>
                </td>
            </motion.tr>
        );
    };

    return (
        <div className="bg-black text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-black tracking-tighter-premium text-white">Buyurtmalar</h1>
                    <p className="text-gray-400 mt-1">Barcha buyurtmalarni ko'rish va boshqarish.</p>
                </header>
                
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    {/* Filters and Search */}
                    <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                            {statusFilters.map(filter => (
                                <button 
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${activeFilter === filter ? 'bg-[#F26522] text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="ID yoki mijoz ismi..."
                                className="w-full sm:w-64 bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                                aria-label="Buyurtmalarni ID yoki mijoz ismi bo'yicha qidirish"
                            />
                        </div>
                    </div>
                    
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-gray-400 uppercase tracking-wider">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Mijoz</th>
                                    <th className="p-4">Sana</th>
                                    <th className="p-4 text-right">Summa</th>
                                    <th className="p-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map(order => <OrderRow key={order.id} order={order} />)
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center p-8 text-gray-500">
                                                Hech qanday buyurtma topilmadi.
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
