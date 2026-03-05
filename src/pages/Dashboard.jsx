import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, trend }) => (
    <div className="premium-card !p-6 flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-xs text-green-500 font-bold mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> {trend}
            </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <Icon size={24} className="text-black" />
        </div>
    </div>
)

const Dashboard = () => {
    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Umumiy Savdo" value="$42,500" icon={DollarSign} trend="+12.5%" />
                <StatCard title="Umumiy Buyurtmalar" value="1,280" icon={ShoppingBag} trend="+8.2%" />
                <StatCard title="Mijozlar" value="1,420" icon={Users} trend="+3.1%" />
                <StatCard title="Bugungi Savdo" value="$425.00" icon={PieChart} trend="+0.4%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 premium-card">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold">So'nggi buyurtmalar</h3>
                        <button className="text-xs font-bold uppercase tracking-widest hover:underline">Hammasini ko'rish</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-xs">#120{i}</div>
                                    <div>
                                        <p className="text-sm font-bold">O'tkirbek Karimov</p>
                                        <p className="text-xs text-gray-500">Chicken King Menu x 2</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">$42.00</p>
                                    <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">YETKAZILDI</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="premium-card bg-black text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-6">Top Operatorlar</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Ali Valiyev", count: 45 },
                                { name: "Otabek G'ulomov", count: 32 },
                                { name: "Sardor Ahmedov", count: 28 },
                                { name: "Javohir Toshmatov", count: 21 },
                                { name: "Rustam Karimov", count: 18 }
                            ].map((op, idx) => (
                                <div key={idx} className="flex items-center justify-between group cursor-default">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                                            {idx + 1}
                                        </div>
                                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                            {op.name}
                                        </p>
                                    </div>
                                    <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded-lg">
                                        {op.count} ta
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                </div>
            </div>
        </div>
    )
}

const PieChart = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
)

export default Dashboard
