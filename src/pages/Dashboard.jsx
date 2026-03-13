import React from 'react';
import { useQuery } from 'react-query';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Users, DollarSign, Clock } from 'lucide-react';

// Function to fetch dashboard data
const fetchDashboardData = async () => {
    const { data: recentOrders, error: ordersError } = await supabase
        .from('orders')
        .select('id, created_at, total_price, status, customer_name')
        .order('created_at', { ascending: false })
        .limit(5);

    if (ordersError) throw new Error(ordersError.message);

    // Placeholder data for stats - replace with actual queries
    const { count: totalOrders, error: totalOrdersError } = await supabase.from('orders').select('*', { count: 'exact', head: true });
    const { count: totalCustomers, error: totalCustomersError } = await supabase.from('customers').select('*', { count: 'exact', head: true });
    
    // You would calculate revenue with a proper query or function
    const totalRevenue = 12500000; // Example static value

    return { 
        recentOrders,
        stats: {
            totalRevenue,
            totalOrders: totalOrders || 0,
            totalCustomers: totalCustomers || 0,
            avgOrderValue: totalOrders ? totalRevenue / totalOrders : 0
        }
    };
};

// Stat Card Component
const StatCard = ({ icon, title, value, subtext }) => (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 flex flex-col justify-between hover:bg-gray-800 transition-all duration-300">
        <div className="flex items-center justify-between text-gray-400 mb-4">
            <p className="font-semibold">{title}</p>
            {icon}
        </div>
        <div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
        </div>
    </div>
);


// Recent Order Item Component
const RecentOrderItem = ({ order }) => {
    const getStatusChip = (status) => {
        switch (status) {
            case 'pending': return <span className="bg-yellow-500/10 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">Kutilmoqda</span>;
            case 'completed': return <span className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full">Yakunlandi</span>;
            case 'cancelled': return <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1 rounded-full">Bekor qilindi</span>;
            default: return <span className="bg-gray-600/50 text-gray-300 text-xs font-bold px-3 py-1 rounded-full">{status}</span>;
        }
    };

    return (
        <div className="grid grid-cols-4 items-center p-4 rounded-xl hover:bg-gray-800/60 transition-colors duration-200 gap-4">
            <p className="font-bold text-white truncate">{order.customer_name || "Noma'lum"}</p>
            <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
            <p className="font-mono text-sm text-white text-right">{order.total_price.toLocaleString('uz-UZ')} so'm</p>
            <div className="flex justify-end">{getStatusChip(order.status)}</div>
        </div>
    );
};


const Dashboard = () => {
    const { data, error, isLoading } = useQuery('dashboardData', fetchDashboardData);

    if (isLoading) {
        return <div className="text-center text-gray-400 p-10">Ma'lumotlar yuklanmoqda...</div>;
    }

    if (error) {
        return <div className="text-center text-red-400 p-10">Xatolik yuz berdi: {error.message}</div>;
    }
    
    const { recentOrders, stats } = data;

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard 
                    icon={<DollarSign size={20} />} 
                    title="Umumiy Savdo" 
                    value={`${(stats.totalRevenue / 1000000).toFixed(1)}M so'm`}
                />
                <StatCard 
                    icon={<Package size={20} />} 
                    title="Buyurtmalar" 
                    value={stats.totalOrders}
                />
                <StatCard 
                    icon={<Users size={20} />} 
                    title="Mijozlar" 
                    value={stats.totalCustomers}
                />
                <StatCard 
                    icon={<Clock size={20} />} 
                    title="O'rtacha Buyurtma" 
                    value={`${Math.round(stats.avgOrderValue / 1000)}K so'm`}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Section */}
                <div className="lg:col-span-2 bg-gray-900/70 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">So'nggi buyurtmalar</h2>
                        <Link to="/orders" className="flex items-center gap-2 text-sm font-bold text-[#F26522] hover:underline hover:text-orange-400 transition-colors">
                            Hammasini ko'rish
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div>
                        {recentOrders.length > 0 ? (
                            <div className="space-y-2">
                                {/* Table Header */}
                                <div className="grid grid-cols-4 text-xs text-gray-500 font-semibold uppercase px-4 gap-4">
                                    <span>Mijoz</span>
                                    <span>Sana</span>
                                    <span className="text-right">Summa</span>
                                    <span className="text-right">Holat</span>
                                </div>
                                {recentOrders.map(order => <RecentOrderItem key={order.id} order={order} />)}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Package size={40} className="mx-auto text-gray-600 mb-4" />
                                <h3 className="font-bold text-white">Buyurtmalar mavjud emas</h3>
                                <p className="text-sm text-gray-500 mt-1">Yangi buyurtmalar shu yerda ko'rinadi.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Top Operators Section */}
                <div className="bg-gray-900/70 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-4">Top Operatorlar</h2>
                    <div className="text-center py-16">
                         <Users size={40} className="mx-auto text-gray-600 mb-4" />
                        <h3 className="font-bold text-white">Ma'lumot yo'q</h3>
                        <p className="text-sm text-gray-500 mt-1">Operatorlar statistikasi tez orada qo'shiladi.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
