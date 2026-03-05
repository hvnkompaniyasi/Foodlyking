import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import { Mail, Key, ShieldAlert } from 'lucide-react'

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
            setError(err.message || 'Kirishda xatolik yuz berdi.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white bg-dot p-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="login-container"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black tracking-tighter-premium mb-2">Foodly King</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest-extra">Admin Panel Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="premium-input !pl-14"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                            <Key size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="premium-input !pl-14"
                            required
                        />
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-2 text-red-500 px-1 py-2"
                            >
                                <ShieldAlert size={14} />
                                <p className="text-xs font-bold leading-none">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="pt-6">
                        <Button type="submit" loading={loading} className="py-5 bg-black hover:bg-black uppercase tracking-widest font-black text-sm">
                            Login
                        </Button>
                    </div>
                </form>

                <div className="mt-16 text-center">
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        &copy; 2026 Foodly Core System
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
