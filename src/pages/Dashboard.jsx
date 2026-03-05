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
                <StatCard title="Kunlik Daromad" value="$4,250" icon={DollarSign} trend="+12.5%" />
                <StatCard title="Yangi Buyurtmalar" value="128" icon={ShoppingBag} trend="+8.2%" />
                <StatCard title="Mijozlar" value="1,420" icon={Users} trend="+3.1%" />
                <StatCard title="Conversion" value="3.2%" icon={PieChart} trend="+0.4%" />
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
                        <h3 className="text-lg font-bold mb-4">Maxfiy Eslatma</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Bugungi barcha buyurtmalar sifatli va tez yetkazilishi shart. Maxfiylikni saqlang.
                        </p>
                        <div className="pt-4 border-t border-white/10">
                            <p className="text-xs font-bold text-gray-500 uppercase">Tizim holati</p>
                            <div className="flex items-center gap-2 mt-2 font-mono text-sm text-green-400">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                ONLINE
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
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
