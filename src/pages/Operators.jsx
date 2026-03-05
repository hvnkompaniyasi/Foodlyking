import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    UserPlus,
    Search,
    Phone,
    Mail,
    ChevronRight,
    BarChart3,
    ShoppingBag,
    DollarSign,
    MoreVertical,
    X,
    Loader2
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'

const Operators = () => {
    const [operators, setOperators] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedOperator, setSelectedOperator] = useState(null)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isStatsOpen, setIsStatsOpen] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        email: '',
        password: ''
    })
    const [formLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState('')

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

    const handleAddOperator = async (e) => {
        e.preventDefault()
        setFormLoading(true)
        setFormError('')

        try {
            // 1. Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            })

            if (authError) throw authError

            if (authData.user) {
                // 2. Update profile (the trigger might do this, but we'll be explicit)
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        full_name: formData.full_name,
                        phone_number: formData.phone_number,
                        role: 'operator'
                    })
                    .eq('id', authData.user.id)

                if (profileError) throw profileError
            }

            setIsAddModalOpen(false)
            setFormData({ full_name: '', phone_number: '', email: '', password: '' })
            fetchOperators()
        } catch (err) {
            setFormError(err.message)
        } finally {
            setFormLoading(false)
        }
    }

    const filteredOperators = operators.filter(op =>
        op.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.phone_number?.includes(searchQuery) ||
        op.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Operatorlar</h1>
                    <p className="text-sm text-gray-500 mt-1">Tizim operatorlarini boshqarish va statistikasini kuzatish</p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="!w-auto !py-3 !px-6 flex items-center gap-2"
                >
                    <UserPlus size={18} />
                    Yangi operator
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Operators List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Ism, telefon yoki email bo'yicha qidirish..."
                            className="premium-input !pl-12 !py-4 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="premium-card !p-0 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Operator</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Kontakt</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Holat</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                                                <Loader2 className="animate-spin mx-auto mb-2" />
                                                Yuklanmoqda...
                                            </td>
                                        </tr>
                                    ) : filteredOperators.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                                                Hech qanday operator topilmadi
                                            </td>
                                        </tr>
                                    ) : filteredOperators.map((op) => (
                                        <tr
                                            key={op.id}
                                            onClick={() => {
                                                setSelectedOperator(op)
                                                setIsStatsOpen(true)
                                            }}
                                            className="hover:bg-gray-50/50 cursor-pointer transition-colors group"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-500">
                                                        {op.full_name?.[0]?.toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold">{op.full_name}</p>
                                                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">ID: {op.id.slice(0, 8)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Phone size={12} /> {op.phone_number}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Mail size={12} /> {op.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">FAOL</span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="p-2 text-gray-400 hover:text-black transition-colors">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Operator Stats Sidebar */}
                <aside className="space-y-6">
                    <AnimatePresence mode="wait">
                        {isStatsOpen && selectedOperator ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="premium-card sticky top-28 bg-black text-white"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-lg font-bold">Operator Statistikasi</h3>
                                    <button onClick={() => setIsStatsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold">
                                        {selectedOperator.full_name?.[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold leading-none">{selectedOperator.full_name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{selectedOperator.phone_number}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Umumiy Buyurtmalar</p>
                                        <p className="text-xl font-bold">156</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Bugungi Buyurtmalar</p>
                                        <p className="text-xl font-bold">12</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Umumiy Summa</p>
                                        <p className="text-xl font-bold">$12,450</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Bugungi Summa</p>
                                        <p className="text-xl font-bold">$840</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-medium text-gray-500">O'rtacha qiymat</p>
                                        <p className="text-xs font-bold">$79.80</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-medium text-gray-500">Oxirgi buyurtma</p>
                                        <p className="text-xs font-bold text-green-400">10 daqiqa oldin</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="premium-card flex flex-col items-center justify-center py-12 text-center text-gray-400 border-dashed">
                                <BarChart3 size={40} className="mb-4 opacity-20" />
                                <p className="text-sm font-medium">Statistikani ko'rish uchun<br />operatorni tanlang</p>
                            </div>
                        )}
                    </AnimatePresence>
                </aside>
            </div>

            {/* Add Operator Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold">Yangi operator qo'shish</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleAddOperator} className="p-8 space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">To'liq ismi</label>
                                    <input
                                        type="text"
                                        placeholder="E.g. Ali Valiyev"
                                        className="premium-input !py-3.5"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Telefon raqami</label>
                                    <input
                                        type="tel"
                                        placeholder="+998 90 123 45 67"
                                        className="premium-input !py-3.5"
                                        value={formData.phone_number}
                                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email manzili</label>
                                    <input
                                        type="email"
                                        placeholder="operator@foodlyking.com"
                                        className="premium-input !py-3.5"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Parol</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="premium-input !py-3.5"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>

                                {formError && (
                                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 italic">
                                        Xatolik: {formError}
                                    </div>
                                )}

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="flex-1 py-4 text-sm font-bold border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Bekor qilish
                                    </button>
                                    <Button
                                        type="submit"
                                        loading={formLoading}
                                        className="flex-1 !py-4"
                                    >
                                        Qo'shish
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Operators
