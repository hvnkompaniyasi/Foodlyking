import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isWithinInterval } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown, Award, TrendingUp, Flame, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// MOCK DATA
const mockFoodData = [
    { id: 1, name: 'BBQ Burger', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop', price: 45000 },
    { id: 2, name: 'Chicken King', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=2073&auto=format&fit=crop', price: 29000 },
    { id: 3, name: 'Special Kombo', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop', price: 75000 },
    { id: 4, name: 'Coca-Cola 1.5L', image: 'https://images.unsplash.com/photo-1622483767028-3f6e92c3ea09?q=80&w=1974&auto=format&fit=crop', price: 12000 },
    { id: 5, name: 'Student Kombo', image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=1974&auto=format&fit=crop', price: 25000 },
];

// Expanded mock sales data for better filtering examples
const mockSalesData = [
    // Last week
    { foodId: 2, quantity: 15, date: '2024-07-29' }, { foodId: 1, quantity: 10, date: '2024-07-29' },
    { foodId: 3, quantity: 20, date: '2024-07-28' }, { foodId: 5, quantity: 25, date: '2024-07-28' },
    { foodId: 5, quantity: 30, date: '2024-07-27' }, { foodId: 4, quantity: 50, date: '2024-07-27' },
    { foodId: 1, quantity: 12, date: '2024-07-26' }, { foodId: 2, quantity: 18, date: '2024-07-25' },
    // Previous week
    { foodId: 4, quantity: 60, date: '2024-07-22' }, { foodId: 1, quantity: 22, date: '2024-07-21' },
    { foodId: 3, quantity: 15, date: '2024-07-20' }, { foodId: 5, quantity: 40, date: '2024-07-19' },
];

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="premium-card bg-white border-gray-100 flex items-start justify-between p-5">
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest-extra mb-2">{title}</p>
            <h3 className="text-xl font-black tracking-tight text-black">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ backgroundColor: color + '1A' }}><Icon size={20} style={{ color: color }} /></div>
    </div>
);

const Statistics = () => {
    const defaultDate = { from: new Date(2024, 6, 19), to: new Date(2024, 6, 29) };
    const [date, setDate] = useState(defaultDate);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const pickerRef = useRef(null);

    // Close picker on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsPickerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const foodStats = useMemo(() => {
        const filteredSales = mockSalesData.filter(sale => {
            const saleDate = new Date(sale.date);
            // Handle date range properly
            return date.from && date.to && isWithinInterval(saleDate, { start: date.from, end: date.to });
        });

        const stats = mockFoodData.map(food => {
            const sales = filteredSales.filter(sale => sale.foodId === food.id);
            const totalSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
            const totalRevenue = totalSold * food.price;
            return { ...food, totalSold, totalRevenue };
        });

        stats.sort((a, b) => b.totalRevenue - a.totalRevenue);
        return stats.filter(s => s.totalSold > 0); // Only show items that were sold in the period
    }, [date]);

    const getRating = (index) => {
        if (index < 2) return { text: 'Top Seller', className: 'bg-[#00A99D] text-white' };
        return { text: 'O\'rtacha', className: 'bg-[#FFC20E]/50 text-yellow-800' };
    };

    const top5Foods = useMemo(() => foodStats.slice(0, 5), [foodStats]);
    const totalSaleVolume = useMemo(() => foodStats.reduce((sum, food) => sum + food.totalSold, 0), [foodStats]);
    const topSeller = useMemo(() => foodStats.length > 0 ? foodStats.sort((a,b) => b.totalSold - a.totalSold)[0] : null, [foodStats]);
    const topRevenueFood = useMemo(() => foodStats.length > 0 ? foodStats.sort((a,b) => b.totalRevenue - a.totalRevenue)[0] : null, [foodStats]);

    const GradientBar = ({ x, y, width, height }) => (
        <g>
            <defs><linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F26522" /><stop offset="100%" stopColor="#00A99D" /></linearGradient></defs>
            <rect x={x} y={y} width={width} height={height} rx={8} fill="url(#colorGradient)" />
        </g>
    );

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter-premium">Statistika</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Sotuvlar tahlili va taomlar reytingi</p>
                </div>
                <div className="relative w-full md:w-auto" ref={pickerRef}>
                    <button onClick={() => setIsPickerOpen(!isPickerOpen)} aria-label="Vaqt oralig'ini tanlang" className={`premium-input bg-white w-full !py-4 !px-6 flex items-center justify-between gap-4 text-left text-sm font-bold shadow-sm transition-all ${isPickerOpen ? 'border-orange-500' : 'border-transparent'}`}>
                        <CalendarIcon size={18} className={isPickerOpen ? 'text-orange-500' : 'text-gray-400'} />
                        <span className="text-black">{`${format(date.from, "dd MMM")} - ${format(date.to, "dd MMM, yyyy")}`}</span>
                        <ChevronDown size={18} className={`transition-transform ${isPickerOpen ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
                    </button>
                    <AnimatePresence>
                        {isPickerOpen && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-2 z-50 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2">
                                <DayPicker mode="range" selected={date} onSelect={setDate} numberOfMonths={2} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Eng xaridorgir taom" value={topSeller?.name || 'Mavjud Emas'} icon={Flame} color="#F26522" />
                <StatCard title="Jami sotuv hajmi" value={`${totalSaleVolume} ta`} icon={ShoppingBag} color="#00A99D" />
                <StatCard title="Eng ko'p daromad" value={topRevenueFood?.name || 'Mavjud Emas'} icon={TrendingUp} color="#FFC20E" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 premium-card !p-0 overflow-hidden border border-gray-100 bg-white">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left border-collapse" aria-label="Taomlar statistikasi jadvali">
                            <thead className="bg-gray-50/50 border-b border-gray-100"><tr><th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Taom</th><th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Sotilgan soni</th><th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Umumiy tushum</th><th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Reyting</th></tr></thead>
                            <AnimatePresence>
                                {foodStats.map((food, index) => (
                                    <motion.tr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} key={food.id} className="group relative hover:bg-gray-50/80 transition-colors duration-200 cursor-pointer" onClick={() => setSelectedFood(food)}>
                                        <td className="px-6 py-4"><div className="flex items-center gap-4"><img src={food.image} alt={food.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100" /><p className="text-sm font-black text-gray-800">{food.name}</p></div></td>
                                        <td className="px-6 py-4 font-black text-gray-800 text-sm">{food.totalSold} ta</td>
                                        <td className="px-6 py-4 font-black text-black text-sm">{food.totalRevenue.toLocaleString()} so'm</td>
                                        <td className="px-6 py-4"><span className={`px-3 py-1.5 text-[10px] font-black rounded-lg ${getRating(index).className}`}>{getRating(index).text}</span></td>
                                        <td className="absolute left-0 top-0 h-full w-1 bg-[#F26522] scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </table>
                    </div>
                </div>

                <div className="premium-card bg-black text-white">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Award size={18} className="text-yellow-400" />Top 5 (Daromad bo'yicha)</h3>
                    <div style={{ width: '100%', height: 300 }}><ResponsiveContainer><BarChart data={top5Foods} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" /><XAxis type="number" hide /><YAxis type="category" dataKey="name" tick={{ fill: '#A1A1AA', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} width={80} /><Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem' }} /><Bar dataKey="totalRevenue" name="Umumiy tushum" shape={<GradientBar />} /></BarChart></ResponsiveContainer></div>
                </div>
            </div>

            <AnimatePresence>
                {selectedFood && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" aria-modal="true">
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedFood(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="p-8">
                                <h2 className="text-2xl font-black mb-2">{selectedFood.name}</h2><p className="text-gray-500">Kunlik savdo dinamikasi (keyingi versiyada qo'shiladi).</p>
                                <button onClick={() => setSelectedFood(null)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200" aria-label="Yopish"><X size={16}/></button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Statistics;
