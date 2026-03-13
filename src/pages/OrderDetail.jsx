import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Printer, X, ShoppingCart, Clock, Bike, Check as CheckIcon, ThumbsUp, CheckCheck } from 'lucide-react';

const statusConfig = {
    'Yangi': { color: '#FFC20E', icon: ShoppingCart, label: 'Yangi' },
    'Tayyorlanmoqda': { color: '#4285F4', icon: Clock, label: 'Tayyorlanmoqda' },
    'Tayyor': { color: '#3B82F6', icon: ThumbsUp, label: 'Tayyor'},
    'Yo\'lda': { color: '#F26522', icon: Bike, label: 'Yo\'lda' },
    'Yetkazildi': { color: '#00A99D', icon: CheckIcon, label: 'Yetkazildi' },
    'Bekor qilindi': { color: '#EF4444', icon: X, label: 'Bekor qilindi' },
};

const workflowConfig = {
    'Yangi': { text: 'QABUL QILISH', nextStatus: 'Tayyorlanmoqda', color: '#00A99D', icon: CheckCircle },
    'Tayyorlanmoqda': { text: 'TAYYOR', nextStatus: 'Tayyor', color: '#4285F4', icon: ThumbsUp },
    'Tayyor': { text: 'YO\'LGA CHIQARISH', nextStatus: 'Yo\'lda', color: '#F26522', icon: Bike },
    'Yo\'lda': { text: 'YETKAZILDI', nextStatus: 'Yetkazildi', color: '#00A99D', icon: CheckCheck },
};

const initialOrders = {
    '7892': { id: '#FDLK-7892', customer: { name: 'Azizbek Akbarov', phone: '+998 90 123 45 67' }, date: '2024-07-30 14:25', amount: 102000, status: 'Yangi', items: [{ name: 'BBQ Burger', quantity: 2, price: 45000, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=200' }, { name: 'Cola 1.5L', quantity: 1, price: 12000, image: null }] },
};

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [orders, setOrders] = useState(initialOrders);
    const [order, setOrder] = useState(orders[id] || initialOrders['7892']); // Fallback

    const [isCancelModalOpen, setCancelModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    const handleStatusUpdate = (newStatus) => {
        const updatedOrder = { ...order, status: newStatus };
        setOrder(updatedOrder);
        const updatedOrders = { ...orders, [id]: updatedOrder };
        setOrders(updatedOrders);
    };

    const handleCancelSubmit = () => {
        if (cancelReason.trim()) {
            handleStatusUpdate('Bekor qilindi');
            setCancelModalOpen(false);
        }
    };
    
    const currentStatus = useMemo(() => statusConfig[order.status], [order.status]);
    const currentAction = workflowConfig[order.status];

    return (
        <div className="bg-black text-white min-h-full p-6 md:p-8 space-y-8 font-sans">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/orders')} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors" aria-label="Ortga qaytish">
                        <ArrowLeft size={22} />
                    </button>
                    <div className='flex items-center gap-4'>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter-premium text-white">Buyurtma {order.id}</h1>
                        {currentStatus && (
                            <div style={{ '--status-color': currentStatus.color, boxShadow: `0 0 20px -3px ${currentStatus.color}60` }} className={`flex items-center gap-2 text-xs font-bold py-2 px-4 rounded-full bg-[var(--status-color)]/10 text-[var(--status-color)]`}>
                                <currentStatus.icon size={16} />
                                <span>{currentStatus.label}</span>
                            </div>
                        )}
                    </div>
                </div>
                 <div className="flex items-center gap-3 w-full md:w-auto">
                    {currentAction && (
                        <button 
                            onClick={() => handleStatusUpdate(currentAction.nextStatus)} 
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-5 text-white rounded-xl font-bold uppercase transition-all shadow-lg"
                            style={{ backgroundColor: currentAction.color, boxShadow: `0 0 20px -3px ${currentAction.color}60` }}
                            aria-label={currentAction.text}
                        >
                            <currentAction.icon size={18} /> {currentAction.text}
                        </button>
                    )}
                    <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors" aria-label="Chekni chop etish">
                        <Printer size={18} />
                    </button>
                    {order.status !== 'Bekor qilindi' && order.status !== 'Yetkazildi' && (
                        <button onClick={() => setCancelModalOpen(true)} className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition-colors" aria-label="Buyurtmani bekor qilish">
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-white mb-4">Taomlar ro'yxati</h3>
                    <div className="space-y-4">
                        {order.items.map(item => (
                            <div key={item.name} className="flex items-start md:items-center justify-between p-4 bg-gray-800/50 rounded-xl flex-col md:flex-row gap-4 md:gap-0">
                                <div className="flex items-center gap-4">
                                    {item.image ? 
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" /> :
                                        <div className='w-16 h-16 rounded-lg bg-[#F26522]/10 flex items-center justify-center'>
                                            <ShoppingCart size={24} className='text-[#F26522]'/>
                                        </div>
                                    }
                                    <div>
                                        <p className="font-bold text-white">{item.name}</p>
                                        <p className="text-sm text-gray-400">{item.quantity} x {item.price.toLocaleString()} so'm</p>
                                    </div>
                                </div>
                                <div className='bg-white rounded-lg px-4 py-2'>
                                    <p className="font-black text-lg text-black">{(item.quantity * item.price).toLocaleString()} so'm</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-black border border-gray-800 rounded-2xl p-8 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-lg text-white mb-4">Mijoz ma'lumotlari</h3>
                            <p className="font-bold text-2xl text-white">{order.customer.name}</p>
                            <p className="text-gray-400 text-lg">{order.customer.phone}</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-8">
                            <div className="flex justify-between items-center text-gray-500 font-medium">
                                <p>Jami summa:</p>
                                <p className="text-black font-black text-3xl">{order.amount.toLocaleString()} so'm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <AnimatePresence>
                {isCancelModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setCancelModalOpen(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
                            <h2 className="font-bold text-xl text-white mb-2">Buyurtmani bekor qilish</h2>
                            <p className="text-gray-400 mb-6">Iltimos, bekor qilish sababini aniq yozing. Bu mijozga bildirishnoma sifatida yuboriladi.</p>
                            <textarea 
                                value={cancelReason}
                                onChange={e => setCancelReason(e.target.value)}
                                placeholder="Masalan: 'Afsuski, tanlangan taom hozirda mavjud emas...'"
                                className="w-full p-4 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                                rows={4}
                                aria-label="Bekor qilish sababi"
                            ></textarea>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setCancelModalOpen(false)} className="py-2 px-5 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all">Ortga</button>
                                <button onClick={handleCancelSubmit} disabled={!cancelReason.trim()} className="py-2 px-5 bg-[#F26522] text-white font-bold rounded-lg hover:bg-[#F26522]/90 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed">Tasdiqlash</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrderDetail;
