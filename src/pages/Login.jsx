import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Lock, Mail } from 'lucide-react'

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
            setError(err.message || 'Login xatosi. Ma’lumotlarni tekshiring.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Foodly King</h1>
                    <p className="text-sub font-medium">Faqat adminlar uchun maxfiy panel</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-2">
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="admin@foodlyking.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <Input
                        label="Parol"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-red-500 mb-4 px-1 font-medium"
                        >
                            {error}
                        </motion.p>
                    )}

                    <div className="pt-4">
                        <Button type="submit" loading={loading}>
                            Kirish
                        </Button>
                    </div>
                </form>

                <p className="text-center mt-8 text-xs text-sub uppercase tracking-widest font-semibold">
                    Foodly Management System
                </p>
            </motion.div>
        </div>
    )
}

export default Login
