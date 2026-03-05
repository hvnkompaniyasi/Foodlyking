import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Crown, ShieldCheck, Mail, Lock, Loader2 } from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { error } = await signIn({ email, password })
            if (error) throw error
            navigate('/')
        } catch (err) {
            setError(err.message || 'Kirishda xatolik yuz berdi. Ma’lumotlaringizni tekshiring.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-dot overflow-hidden">
            {/* Background elements */}
            <div className="bg-mesh" />

            {/* Animated decorative circles */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-80 h-80 bg-black/[0.02] rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -right-20 w-96 h-96 bg-black/[0.03] rounded-full blur-3xl pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[480px] z-10"
            >
                <div className="premium-card relative overflow-hidden">
                    {/* Top bar accent */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-black" />

                    <div className="text-center mb-12 relative">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-2xl mb-6 shadow-2xl shadow-black/20"
                        >
                            <Crown size={32} />
                        </motion.div>

                        <h1 className="text-4xl font-extrabold tracking-tighter-premium mb-3 bg-gradient-to-b from-black to-gray-700 bg-clip-text text-transparent">
                            Foodly King
                        </h1>
                        <p className="text-sub font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                            <ShieldCheck size={14} className="text-black/30" />
                            Secret Admin Access
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1">Email manzili</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="admin@foodlyking.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="premium-input !pl-12"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1">Maxfiy parol</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="premium-input !pl-12"
                                    required
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3"
                                >
                                    <div className="text-red-500 mt-0.5">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <p className="text-xs font-bold text-red-600 leading-tight">
                                        {error}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="pt-4">
                            <Button type="submit" loading={loading} className="py-5 text-base uppercase tracking-widest">
                                Tizimga kirish
                            </Button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-black/[0.03] flex flex-col items-center gap-4">
                        <p className="text-[10px] font-black tracking-[0.2em] text-black/20 uppercase">
                            Foodly Management Core v2.0
                        </p>
                        <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                            <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                            <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                        </div>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-10 text-xs text-black/30 font-medium"
                >
                    &copy; 2026 Foodly King Global. Barcha huquqlar himoyalangan.
                </motion.p>
            </motion.div>
        </div>
    )
}

export default Login

