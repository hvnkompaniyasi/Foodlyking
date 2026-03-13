import React from 'react';
import { BarChart3, Users, CreditCard, ShoppingCart, ArrowUp, Flame, ShoppingBag, TrendingUp, UserCheck } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
        <div>
            <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: `${color}1A` }}>
                    <Icon size={20} style={{ color }} />
                </div>
            </div>
            <p className="text-4xl font-black tracking-tighter-premium text-white">{value}</p>
        </div>
    </div>
);

const RecentOrderItem = ({ order }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full">
                <span className="font-bold text-xs">#{order.id.toString().slice(-4)}</span>
            </div>
            <div>
                <p className="font-bold text-white">{order.customer}</p>
                <p className="text-xs text-gray-500">{order.items}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-white">{order.amount}</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${order.status === 'Yetkazildi' ? 'text-green-400 bg-green-500/10' : 'text-yellow-400 bg-yellow-500/10'}`}>{order.status}</span>
        </div>
    </div>
);

const TopOperatorItem = ({ operator, index }) => (
    <div className="flex items-center justify-between py-2.5">
        <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-500 w-5">{index + 1}</span>
            <p className="font-semibold text-white">{operator.name}</p>
        </div>
        <p className="font-bold text-gray-300">{operator.orders} ta</p>
    </div>
);


const Dashboard = () => {

    // Bu ma'lumotlar backenddan kelishi kerak
    const stats = [];
    const recentOrders = [];
    const topOperators = [];

    return (
        <div className="bg-black text-white min-h-screen font-sans p-8">
            <div className="max-w-screen-2xl mx-auto">
                <h1 className="text-4xl font-black tracking-tighter-premium mb-8">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.length > 0 ? (
                        stats.map((stat, index) => <StatCard key={index} {...stat} />)
                    ) : (
                        <p className="text-gray-500 col-span-4">Statistik ma'lumotlar hozircha mavjud emas.</p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">So'nggi buyurtmalar</h2>
                            <a href="/orders" className="text-sm font-bold text-[#F26522] hover:underline">Hammasini ko'rish</a>
                        </div>
                        <div>
                            {recentOrders.length > 0 ? (
                                recentOrders.map(order => <RecentOrderItem key={order.id} order={order} />)
                            ) : (
                                <p className="text-gray-500 py-8 text-center">Hozircha buyurtmalar mavjud emas.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Top Operatorlar</h2>
                        <div>
                             {topOperators.length > 0 ? (
                                topOperators.map((op, index) => <TopOperatorItem key={index} operator={op} index={index} />)
                            ) : (
                                <p className="text-gray-500 py-8 text-center">Operatorlar statistikasi mavjud emas.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
