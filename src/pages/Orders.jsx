import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Package, Burger, GlassWater } from 'lucide-react'

// Mock Data for Orders
const mockOrders = [
  {
    id: '#FDLK-7892',
    customerName: 'O'tkirbek Karimov',
    items: [
      { name: 'Chicken King Burger', quantity: 2, icon: Burger },
      { name: 'Cola 1.5L', quantity: 1, icon: GlassWater },
    ],
    totalAmount: 58000,
    status: 'Yangi',
    timestamp: '2024-07-28T10:30:00Z',
  },
  {
    id: '#FDLK-7891',
    customerName: 'Ali Valiyev',
    items: [{ name: 'Double Cheeseburger', quantity: 1, icon: Burger }],
    totalAmount: 32000,
    status: 'Tayyorlanmoqda',
    timestamp: '2024-07-28T10:25:00Z',
  },
  {
    id: '#FDLK-7890',
    customerName: 'Sardor Ahmedov',
    items: [
        { name: 'Special Combo', quantity: 1, icon: Burger },
        { name: 'Fanta 1L', quantity: 2, icon: GlassWater },
    ],
    totalAmount: 75000,
    status: 'Yo'lda',
    timestamp: '2024-07-28T10:15:00Z',
  },
  {
    id: '#FDLK-7889',
    customerName: 'Javohir Toshmatov',
    items: [{ name: 'Beef Burger', quantity: 4, icon: Burger }],
    totalAmount: 112000,
    status: 'Yetkazildi',
    timestamp: '2024-07-27T18:45:00Z',
  },
    {
    id: '#FDLK-7888',
    customerName: 'Rustam Karimov',
    items: [{ name: 'Student Combo', quantity: 1, icon: Burger }],
    totalAmount: 25000,
    status: 'Bekor qilindi',
    timestamp: '2024-07-27T15:20:00Z',
  },
];

const statusColors = {
  'Yangi': 'bg-[#FFC20E]/10 text-[#FFC20E]',
  'Tayyorlanmoqda': 'bg-blue-500/10 text-blue-500',
  'Yo'lda': 'bg-purple-500/10 text-purple-500',
  'Yetkazildi': 'bg-[#00A99D]/10 text-[#00A99D]',
  'Bekor qilindi': 'bg-[#F26522]/10 text-[#F26522]',
};

const filterTabs = ['Barchasi', 'Yangi', 'Tayyorlanmoqda', 'Yo'lda', 'Yetkazildi'];

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState('Barchasi');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const filteredOrders = mockOrders.filter(order => 
    activeFilter === 'Barchasi' || order.status === activeFilter
  );

  const toggleOrderDetails = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  }

  return (
    <div className="space-y-8">
      {/* Filters Panel */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
        {filterTabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-6 py-3 text-sm font-black rounded-[1.2rem] transition-all duration-300 ${activeFilter === tab 
                ? 'bg-black text-white shadow-lg' 
                : 'text-gray-500 hover:bg-gray-100'}`}
            >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table/List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <div className="col-span-2">Buyurtma ID</div>
            <div className="col-span-3">Mijoz</div>
            <div className="col-span-2">Umumiy Summa</div>
            <div className="col-span-2">Holati</div>
            <div className="col-span-2">Vaqti</div>
            <div className="col-span-1"></div>
        </div>

        {/* Table Body */}
        {filteredOrders.map(order => (
            <div key={order.id}>
                <div 
                    className="grid grid-cols-12 px-6 py-5 items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
                    onClick={() => toggleOrderDetails(order.id)}
                >
                    <div className="col-span-2 font-black text-sm text-gray-800">{order.id}</div>
                    <div className="col-span-3 font-bold text-sm text-gray-600">{order.customerName}</div>
                    <div className="col-span-2 font-black text-sm text-gray-800">
                        {order.totalAmount.toLocaleString()} so'm
                    </div>
                    <div className="col-span-2">
                        <span className={`px-3 py-1.5 text-xs font-black rounded-lg ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                            {order.status}
                        </span>
                    </div>
                    <div className="col-span-2 text-sm font-bold text-gray-500">
                        {new Date(order.timestamp).toLocaleString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="col-span-1 flex justify-end">
                        <motion.div animate={{ rotate: expandedOrderId === order.id ? 180 : 0 }}>
                            <ChevronDown size={20} className="text-gray-400" />
                        </motion.div>
                    </div>
                </div>
                
                {/* Expandable Details Section */}
                <AnimatePresence>
                    {expandedOrderId === order.id && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="bg-gray-50/80 px-6 overflow-hidden"
                        >
                            <div className="py-4">
                                <h4 className="font-black text-xs uppercase tracking-wider text-gray-500 mb-3">Buyurtma tarkibi</h4>
                                <ul className="space-y-3">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100/50">
                                            <div className="flex items-center gap-4">
                                                <item.icon size={20} className="text-gray-500" />
                                                <span className="font-bold text-sm text-gray-800">{item.name}</span>
                                            </div>
                                            <span className="font-black text-sm text-gray-600">x{item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
