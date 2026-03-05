import React from 'react'

const Input = ({ label, id, type = 'text', placeholder, value, onChange, error, ...props }) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium mb-1.5 ml-1 text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`premium-input ${error ? 'border-red-500' : ''}`}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500 ml-1">{error}</p>}
        </div>
    )
}

export default Input
