import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ children, onClick, type = 'button', className = '', loading = false, disabled = false }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn-3d w-full ${className} ${disabled || loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Yuklanmoqda...</span>
                </div>
            ) : (
                children
            )}
        </motion.button>
    )
}

export default Button
