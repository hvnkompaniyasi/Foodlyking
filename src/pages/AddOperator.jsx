import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, UserPlus, X, Phone, Mail, Lock, User } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { createClient } from '@supabase/supabase-js'
import Button from '../components/ui/Button'

// Temporary client to avoid signing out the current admin
const tempSupabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    { auth: { persistSession: false } }
)

const AddOperator = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '+998-',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/[^\d]/g, '');
        let part = numbers.startsWith('998') ? numbers : '998' + numbers;

        let formatted = '+998';
        if (part.length > 3) {
            formatted += '-' + part.substring(3, 5);
        }
        if (part.length > 5) {
            formatted += '-' + part.substring(5, 8);
        }
        if (part.length > 8) {
            formatted += '-' + part.substring(8, 10);
        }
        if (part.length > 10) {
            formatted += '-' + part.substring(10, 12);
        }
        return formatted.substring(0, 18);
    }

    const handlePhoneChange = (e) => {
        const val = e.target.value;
        if (val.length < 5) {
            setFormData({ ...formData, phone_number: '+998-' });
            return;
        }
        setFormData({ ...formData, phone_number: formatPhoneNumber(val) });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { data: authData, error: authError } = await tempSupabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            })

            if (authError) throw authError

            if (authData.user) {
                const { error: profileError } = await tempSupabase
                    .from('profiles')
                    .upsert({
                        id: authData.user.id,
                        full_name: formData.full_name,
                        phone_number: formData.phone_number,
                        role: 'operator',
                        email: formData.email
                    })

                if (profileError) throw profileError
            }

            navigate('/operators')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-[800px] mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/operators')}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-black hover:shadow-lg transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-black tracking-tighter-premium">Yangi operator qo'shish</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Tizim uchun yangi mas'ul operatorni ro'yxatdan o'tkazing</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card bg-white p-10 border border-gray-50"
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <User size={12} /> To'liq ismi
                        </label>
                        <input
                            type="text"
                            placeholder="Ali Valiyev"
                            className="premium-input !py-4"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Phone size={12} /> Telefon raqami
                        </label>
                        <input
                            type="tel"
                            placeholder="+998-XX-XXX-XX-XX"
                            className="premium-input !py-4 font-mono"
                            value={formData.phone_number}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Mail size={12} /> Email manzili
                        </label>
                        <input
                            type="email"
                            placeholder="operator@foodlyking.com"
                            className="premium-input !py-4"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Lock size={12} /> Parol
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="premium-input !py-4"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className="md:col-span-2 pt-6">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2 italic">
                                <X size={14} /> {error}
                            </div>
                        )}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/operators')}
                                className="px-8 py-4 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                            >
                                Bekor qilish
                            </button>
                            <Button
                                type="submit"
                                loading={loading}
                                className="!w-auto !px-12 !py-4-5 uppercase tracking-widest font-black text-xs shadow-xl shadow-black/10"
                            >
                                Operatorni saqlash
                            </Button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default AddOperator
