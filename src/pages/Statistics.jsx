import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown, Award, DollarSign, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// MOCK DATA (will be replaced with Supabase data)
const mockFoodData = [
    { id: 1, name: 'BBQ Burger', image: '/images/foods/bbq-burger.png', price: 45000, category: 'Burgers' },
    { id: 2, name: 'Chicken King Burger', image: '/images/foods/chicken-king.png', price: 29000, category: 'Burgers' },
    { id: 3, name: 'Special Combo', image: '/images/foods/special-combo.png', price: 75000, category: 'Combos' },
    { id: 4, name: 'Cola 1.5L', image: '/images/foods/cola.png', price: 12000, category: 'Drinks' },
    { id: 5, name: 'Student Combo', image: '/images/foods/student-combo.png', price: 25000, category: 'Combos' },
];

const mockSalesData = [
    { foodId: 2, quantity: 50, date: '2024-07-29' },
    { foodId: 1, quantity: 45, date: '2024-07-29' },
    { foodId: 3, quantity: 30, date: '2024-07-28' },
    { foodId: 5, quantity: 70, date: '2024-07-27' },
    { foodId: 4, quantity: 120, date: '2024-07-26' },
    { foodId: 2, quantity: 25, date: '2024-07-25' },
];

// --- Components ---
const Statistics = () => {
    const [date, setDate] = useState({ from: new Date(2024, 6, 25), to: new Date() });
    const [selectedFood, setSelectedFood] = useState(null);

    const foodStats = useMemo(() => {
        const stats = mockFoodData.map(food => {
            const sales = mockSalesData.filter(sale => sale.foodId === food.id);
            const totalSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
            const totalRevenue = totalSold * food.price;
            return { ...food, totalSold, totalRevenue };
        });

        stats.sort((a, b) => b.totalSold - a.totalSold);
        return stats;
    }, [date]);

    const getRating = (index) => {
        if (index < 3) return { text: 'Top Seller', className: 'bg-[#F26522]/10 text-[#F26522]' };
        return { text: 'O\'rtacha', className: 'bg-gray-100 text-gray-600' };
    };

    const top5Foods = foodStats.slice(0, 5);

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter-premium">Statistika</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Sotuvlar tahlili va taomlar reytingi</p>
                </div>
                {/* Date Range Picker (Placeholder) */}
                <div className="w-full md:w-auto">
                    <button className="premium-input bg-white w-full !py-4 !px-6 flex items-center justify-between gap-4 text-left font-bold text-sm">
                        <CalendarIcon size={18} className="text-gray-400"/>
                        <span>{`${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`}</span>
                        <ChevronDown size={18} className="text-gray-400"/>
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Foods List */}
                <div className="lg:col-span-2 space-y-4">
                     <div className="premium-card !p-0 overflow-hidden border border-gray-100 bg-white">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Taom</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Sotilgan soni</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Umumiy tushum</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Reyting</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {foodStats.map((food, index) => {
                                    const rating = getRating(index);
                                    return (
                                        <tr key={food.id} className="group hover:bg-gray-50/80 transition-all cursor-pointer" onClick={() => setSelectedFood(food)}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                                                        {/* Image placeholder */}
                                                    </div>
                                                    <p className="text-sm font-black">{food.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-600 text-sm">{food.totalSold} ta</td>
                                            <td className="px-6 py-4 font-black text-sm">{food.totalRevenue.toLocaleString()} so'm</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1.5 text-[10px] font-black rounded-lg ${rating.className}`}>{rating.text}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Side: Chart */}
                <div className="space-y-6">
                    <div className="premium-card bg-black text-white">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Award size={18} className="text-yellow-400" />
                            Top 5 Taom (Sotilgan soni)
                        </h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={top5Foods} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                    <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                        contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem' }}
                                    />
                                    <Bar dataKey="totalSold" name="Sotilgan soni">
                                        {top5Foods.map((entry, index) => (
                                            <Bar key={`bar-${index}`} dataKey="totalSold" fill={index % 2 === 0 ? '#F26522' : '#00A99D'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for single food stats (placeholder) */}
            <AnimatePresence>
                {selectedFood && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                         <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedFood(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                             initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-xl overflow-hidden">
                            <div className="p-8">
                                <h2 className="text-2xl font-black mb-2">{selectedFood.name}</h2>
                                <p className="text-gray-500">Kunlik savdo dinamikasi (keyinroq qo'shiladi).</p>
                                 <button onClick={() => setSelectedFood(null)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                                    X
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Statistics;
