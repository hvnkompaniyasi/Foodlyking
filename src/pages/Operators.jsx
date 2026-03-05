import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    Users,
    UserPlus,
    Search,
    Phone,
    Mail,
    ChevronRight,
    BarChart3,
    X,
    Loader2,
    ShoppingBag,
    DollarSign
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'

const Operators = () => {
    const navigate = useNavigate()
    const [operators, setOperators] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedOperator, setSelectedOperator] = useState(null)
    const [isStatsOpen, setIsStatsOpen] = useState(false)

    useEffect(() => {
        fetchOperators()
    }, [])

    const fetchOperators = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'operator')
                .order('created_at', { ascending: false })

            if (error) throw error
            setOperators(data || [])
        } catch (err) {
            console.error('Error fetching operators:', err)
        } finally {
            setLoading(false)
        }
    }

    const filteredOperators = operators.filter(op =>
        op.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.phone_number?.includes(searchQuery) ||
        op.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-10 max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter-premium">Operatorlar</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Tizim operatorlarini boshqarish va statistikasini kuzatish</p>
                </div>
                <Button
                    onClick={() => navigate('/operators/add')}
                    className="!w-auto !py-3 !px-8 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
                >
                    <UserPlus size={18} />
                    <span className="uppercase tracking-widest text-[10px] font-black">Yangi operator</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Operators List */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Ism, telefon yoki email bo'yicha qidirish..."
                            className="premium-input !pl-14 !py-4 shadow-sm bg-white border-transparent focus:border-gray-100"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="premium-card !p-0 overflow-hidden border border-gray-100 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Operator</th>
                                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Kontakt</th>
                                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Holat</th>
                                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center text-gray-400">
                                                <Loader2 className="animate-spin mx-auto mb-4" />
                                                <p className="text-sm font-bold uppercase tracking-widest">Yuklanmoqda...</p>
                                            </td>
                                        </tr>
                                    ) : filteredOperators.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center text-gray-400">
                                                <p className="text-sm font-bold uppercase tracking-widest">Hech qanday operator topilmadi</p>
                                            </td>
                                        </tr>
                                    ) : filteredOperators.map((op) => (
                                        <tr
                                            key={op.id}
                                            onClick={() => {
                                                setSelectedOperator(op)
                                                setIsStatsOpen(true)
                                            }}
                                            className="hover:bg-gray-50/80 cursor-pointer transition-all group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-500 transition-colors group-hover:bg-black group-hover:text-white group-hover:border-black">
                                                        {op.full_name?.[0]?.toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black">{op.full_name}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ID: {op.id.slice(0, 8)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                                        <Phone size={14} className="text-gray-300" /> {op.phone_number}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                        <Mail size={14} className="text-gray-300" /> {op.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[10px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-black uppercase tracking-wider">FAOL</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                                                    <ChevronRight size={18} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Operator Stats Sidebar */}
                <div className="lg:col-span-4">
                    <AnimatePresence mode="wait">
                        {isStatsOpen && selectedOperator ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="premium-card sticky top-28 bg-black text-white p-8"
                            >
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-lg font-black tracking-tighter">Statistika</h3>
                                    <button onClick={() => setIsStatsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-5 mb-10">
                                    <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center text-2xl font-black">
                                        {selectedOperator.full_name?.[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xl font-black leading-none">{selectedOperator.full_name}</p>
                                        <p className="text-xs font-bold text-gray-500 mt-2">{selectedOperator.phone_number}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 mb-10">
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 group hover:bg-white/10 transition-colors">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Umumiy Buyurtmalar</p>
                                        <div className="flex items-end justify-between">
                                            <p className="text-3xl font-black">156</p>
                                            <div className="p-2 bg-white/5 rounded-xl text-gray-400"><ShoppingBag size={16} /></div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 group hover:bg-white/10 transition-colors">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Umumiy Summa</p>
                                        <div className="flex items-end justify-between">
                                            <p className="text-3xl font-black">$12,450</p>
                                            <div className="p-2 bg-white/5 rounded-xl text-gray-400"><DollarSign size={16} /></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5 pt-8 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Bugungi buyurtmalar</p>
                                        <p className="text-sm font-black text-green-400">12 ta</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Bugungi summa</p>
                                        <p className="text-sm font-black text-green-400">$840.00</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">O'rtacha qiymat</p>
                                        <p className="text-sm font-black">$79.80</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="premium-card bg-white flex flex-col items-center justify-center py-20 text-center text-gray-300 border-2 border-dashed border-gray-100">
                                <BarChart3 size={40} className="mb-4 opacity-20" />
                                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                    Statistikani ko'rish uchun<br />operatorni tanlang
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Operators
