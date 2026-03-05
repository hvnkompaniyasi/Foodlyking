import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    Search,
    ChevronRight,
    X,
    Loader2,
    Phone,
    User,
    Lock,
    ShoppingBag,
    DollarSign,
    Award,
    TrendingUp,
    Calendar,
    ArrowRight
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'

const Customers = () => {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [customerOrders, setCustomerOrders] = useState([])
    const [ordersLoading, setOrdersLoading] = useState(false)

    // Edit states
    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData] = useState({ full_name: '', phone_number: '', password: '' })

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = async () => {
        try {
            setLoading(true)
            // Mocking for now, but should select from profiles where role='customer' or a dedicated customers table
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'customer')
                .order('created_at', { ascending: false })

            if (error) throw error
            setCustomers(data || [])
        } catch (err) {
            console.error('Error fetching customers:', err)
            // Fallback mock data if table doesn't exist yet
            setCustomers([
                { id: '1', full_name: 'Jasur Ahmedov', phone_number: '+998-90-123-45-67', total_orders: 15, total_spent: 4500000 },
                { id: '2', full_name: 'Malika Karimova', phone_number: '+998-93-555-44-33', total_orders: 12, total_spent: 3800000 },
                { id: '3', full_name: 'Otabek Aliyev', phone_number: '+998-99-999-99-99', total_orders: 22, total_spent: 6200000 },
                { id: '4', full_name: 'Gulnoza Saidova', phone_number: '+998-97-111-22-33', total_orders: 8, total_spent: 1500000 },
            ])
        } finally {
            setLoading(false)
        }
    }

    const handleViewDetails = async (customer) => {
        setSelectedCustomer(customer)
        setEditData({ full_name: customer.full_name, phone_number: customer.phone_number, password: '' })
        setIsDetailsModalOpen(true)
        setEditMode(false)

        // Fetch customer orders
        try {
            setOrdersLoading(true)
            // Mocking customer orders
            setTimeout(() => {
                setCustomerOrders([
                    { id: 'ORD-1024', items: 'Osh, Shakarob', quantity: 2, total_amount: 85000, created_at: '2026-03-01T14:30:00Z', status: 'Yetkazildi' },
                    { id: 'ORD-1056', items: 'Manti, Choy', quantity: 5, total_amount: 110000, created_at: '2026-03-04T19:15:00Z', status: 'Tayyorlanmoqda' },
                ])
                setOrdersLoading(false)
            }, 800)
        } catch (err) {
            console.error(err)
            setOrdersLoading(false)
        }
    }

    const filteredCustomers = customers.filter(c =>
        c.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone_number?.includes(searchQuery)
    )

    // Top 3 by Orders
    const topByOrders = [...customers].sort((a, b) => (b.total_orders || 0) - (a.total_orders || 0)).slice(0, 3)
    // Top 3 by Spent
    const topBySpent = [...customers].sort((a, b) => (b.total_spent || 0) - (a.total_spent || 0)).slice(0, 3)

    return (
        <div className="space-y-10 max-w-[1400px] mx-auto pb-20">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-4xl font-black tracking-tighter-premium">Mijozlar</h1>
                <p className="text-sm text-gray-500 font-medium tracking-tight">Mijozlar bazasi va ularning buyurtmalar tarixi</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="premium-card bg-white border-gray-100 flex flex-col justify-between"
                >
                    <div>
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black mb-6 border border-gray-100">
                            <Users size={24} />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest-extra mb-2">Umumiy mijozlar</p>
                        <h3 className="text-5xl font-black tracking-tighter">{customers.length}</h3>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400">FAOL FOYDALANUVCHILAR</span>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" />
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="premium-card bg-black text-white border-none"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Award size={18} className="text-yellow-400" />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest-extra">Top 3 (Buyurtma soni)</p>
                    </div>
                    <div className="space-y-4">
                        {topByOrders.map((c, i) => (
                            <div key={c.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-black text-gray-600">0{i + 1}</span>
                                    <p className="text-sm font-black tracking-tight">{c.full_name}</p>
                                </div>
                                <span className="text-xs font-black bg-white/10 px-3 py-1 rounded-full">{c.total_orders} ta</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="premium-card bg-white border-gray-100"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp size={18} className="text-green-500" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest-extra">Top 3 (Umumiy summa)</p>
                    </div>
                    <div className="space-y-4">
                        {topBySpent.map((c, i) => (
                            <div key={c.id} className="flex flex-col gap-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-black tracking-tight text-gray-900">{c.full_name}</p>
                                    <span className="text-[10px] font-black text-gray-400">#{i + 1}</span>
                                </div>
                                <p className="text-lg font-black text-black">{(c.total_spent || 0).toLocaleString()} so'm</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* List Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative group w-full md:max-w-md">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Mijoz ismi yoki telefon raqami..."
                            className="premium-input !pl-14 !py-4 shadow-sm bg-white border-transparent focus:border-black/5"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="premium-card !p-0 overflow-hidden border border-gray-100 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Mijoz</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Telefon</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Buyurtmalar</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Harakat</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center text-gray-300">
                                            <Loader2 className="animate-spin mx-auto mb-4" />
                                            <p className="text-[10px] font-black uppercase tracking-widest-extra">Yuklanmoqda...</p>
                                        </td>
                                    </tr>
                                ) : filteredCustomers.map((c) => (
                                    <tr key={c.id} className="group hover:bg-gray-50/80 transition-all cursor-pointer" onClick={() => handleViewDetails(c)}>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                                                    {c.full_name?.[0]?.toUpperCase()}
                                                </div>
                                                <p className="text-sm font-black">{c.full_name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-medium text-gray-500">{c.phone_number}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <ShoppingBag size={14} className="text-gray-300" />
                                                <span className="text-sm font-black">{c.total_orders || 0} ta</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="btn-3d !py-2 !px-5 !text-[10px] !rounded-xl !shadow-none !bg-gray-100 !text-black hover:!bg-black hover:!text-white transition-all">
                                                BATAFSIL Ma'lumot
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {isDetailsModalOpen && selectedCustomer && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsDetailsModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.2)] overflow-hidden"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 h-[85vh]">
                                {/* Left Side: Details & Edit */}
                                <div className="lg:col-span-5 p-10 bg-gray-50 border-r border-gray-100 overflow-y-auto">
                                    <div className="flex items-center justify-between mb-10">
                                        <button onClick={() => setIsDetailsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-black shadow-sm transition-all">
                                            <X size={18} />
                                        </button>
                                        <button
                                            onClick={() => setEditMode(!editMode)}
                                            className={`text-[10px] font-black uppercase tracking-widest-extra ${editMode ? 'text-red-500' : 'text-black underline'}`}
                                        >
                                            {editMode ? 'BEKOR QILISH' : 'TAHRIRLASH'}
                                        </button>
                                    </div>

                                    <div className="text-center mb-10">
                                        <div className="w-24 h-24 mx-auto rounded-[2rem] bg-black text-white flex items-center justify-center text-4xl font-black mb-4 shadow-2xl">
                                            {selectedCustomer.full_name?.[0]?.toUpperCase()}
                                        </div>
                                        <h3 className="text-2xl font-black tracking-tighter">{selectedCustomer.full_name}</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Mijoz Profili</p>
                                    </div>

                                    <form className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <User size={12} /> Ism
                                            </label>
                                            <input
                                                disabled={!editMode}
                                                type="text"
                                                className={`premium-input !py-4 ${!editMode ? '!bg-white/50 !text-gray-500' : ''}`}
                                                value={editData.full_name}
                                                onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <Phone size={12} /> Telefon
                                            </label>
                                            <input
                                                disabled={!editMode}
                                                type="tel"
                                                className={`premium-input !py-4 font-mono ${!editMode ? '!bg-white/50 !text-gray-500' : ''}`}
                                                value={editData.phone_number}
                                                onChange={(e) => setEditData({ ...editData, phone_number: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <Lock size={12} /> Yangi Parol
                                            </label>
                                            <input
                                                disabled={!editMode}
                                                type="password"
                                                placeholder="••••••••"
                                                className={`premium-input !py-4 ${!editMode ? '!bg-white/50 !text-gray-400' : ''}`}
                                                value={editData.password}
                                                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                                            />
                                        </div>

                                        {editMode && (
                                            <Button className="!py-4 uppercase tracking-widest font-black text-[10px] shadow-black/10">
                                                O'zgarishlarni saqlash
                                            </Button>
                                        )}
                                    </form>
                                </div>

                                {/* Right Side: Orders History */}
                                <div className="lg:col-span-7 p-10 bg-white overflow-y-auto">
                                    <h4 className="text-sm font-black uppercase tracking-widest-extra mb-8 flex items-center gap-3">
                                        <Calendar size={18} className="text-gray-300" /> BUYURTMALAR TARIXI
                                    </h4>

                                    <div className="space-y-4">
                                        {ordersLoading ? (
                                            <div className="py-20 text-center">
                                                <Loader2 className="animate-spin mx-auto text-gray-300 mb-4" />
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Yuklanmoqda...</p>
                                            </div>
                                        ) : customerOrders.length === 0 ? (
                                            <div className="py-20 text-center text-gray-300">
                                                <p className="text-[10px] font-black uppercase tracking-widest">Buyurtmalar mavjud emas</p>
                                            </div>
                                        ) : (
                                            customerOrders.map(order => (
                                                <div key={order.id} className="p-6 rounded-3xl border border-gray-50 hover:border-black/5 hover:bg-gray-50/50 transition-all group">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <p className="text-xs font-black tracking-tight mb-1">{order.id}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${order.status === 'Yetkazildi' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1 mb-4">
                                                        <p className="text-sm font-black text-gray-800">{order.items}</p>
                                                        <p className="text-xs font-medium text-gray-400">Soni: {order.quantity} ta</p>
                                                    </div>
                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                        <p className="text-sm font-black text-black">{(order.total_amount).toLocaleString()} so'm</p>
                                                        <ArrowRight size={14} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Customers
