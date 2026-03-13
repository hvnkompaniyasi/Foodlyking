import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Printer, X, ShoppingCart, Clock, Bike, Check as CheckIcon } from 'lucide-react';

const statusConfig = {
    'Yangi': { color: '#FFC20E', icon: ShoppingCart, label: 'Yangi' },
    'Tayyorlanmoqda': { color: '#3B82F6', icon: Clock, label: 'Tayyorlanmoqda' },
    'Yo\'lda': { color: '#F26522', icon: Bike, label: 'Yo\'lda' },
    'Yetkazildi': { color: '#00A99D', icon: CheckIcon, label: 'Yetkazildi' },
    'Bekor qilindi': { color: '#EF4444', icon: X, label: 'Bekor qilindi' },
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
            console.log('Buyurtma bekor qilindi. Sabab:', cancelReason);
            setCancelModalOpen(false);
        }
    };
    
    const currentStatus = useMemo(() => statusConfig[order.status], [order.status]);

    return (
        <div className="bg-black text-white min-h-full p-6 md:p-8 space-y-8 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/orders')} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors" aria-label="Ortga qaytish">
                        <ArrowLeft size={22} />
                    </button>
                    <div className='flex items-center gap-4'>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter-premium text-white">Buyurtma {order.id}</h1>
                        <div style={{ '--status-color': currentStatus.color, boxShadow: `0 0 20px -3px ${currentStatus.color}60` }} className={`flex items-center gap-2 text-xs font-bold py-2 px-4 rounded-full bg-[var(--status-color)]/10 text-[var(--status-color)]`}>
                            <currentStatus.icon size={16} />
                            <span>{currentStatus.label}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Panel */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
                <p className='text-gray-400 font-medium text-sm'>Boshqaruv paneli</p>
                <div className="flex items-center gap-3">
                    {order.status === 'Yangi' && (
                        <button onClick={() => handleStatusUpdate('Tayyorlanmoqda')} className="flex items-center justify-center gap-2 py-3 px-5 bg-[#00A99D] text-white rounded-xl font-bold hover:bg-[#00A99D]/80 transition-all shadow-lg shadow-green-500/20" aria-label="Buyurtmani qabul qilish">
                            <CheckCircle size={18} /> Qabul qilish
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
                    <div className="bg-black border border-gray-800 rounded-2xl p-8">
                        <h3 className="font-bold text-lg text-white mb-4">Mijoz ma'lumotlari</h3>
                        <p className="font-bold text-2xl text-white">{order.customer.name}</p>
                        <p className="text-gray-400 text-lg">{order.customer.phone}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="flex justify-between items-center text-gray-500 font-medium">
                            <p>Jami summa:</p>
                            <p className="text-black font-black text-3xl">{order.amount.toLocaleString()} so'm</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <AnimatePresence>{isCancelModalOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setCancelModalOpen(false)} /><motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl"><h2 className="font-bold text-xl text-white mb-4">Buyurtmani bekor qilish</h2><p className="text-gray-400 mb-6">Iltimos, bekor qilish sababini aniq va tushunarli qilib yozing. Bu ma'lumot mijozga yuboriladi.</p><textarea value={cancelReason} onChange={e => setCancelReason(e.target.value)} placeholder="Masalan: 'Kechirasiz, tanlangan taom hozirda mavjud emas...'" className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500" rows={4} aria-label="Bekor qilish sababi"></textarea><div className="flex justify-end gap-4 mt-6"><button onClick={() => setCancelModalOpen(false)} className="py-2 px-5 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all">Ortga</button><button onClick={handleCancelSubmit} disabled={!cancelReason.trim()} className="py-2 px-5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all disabled:bg-red-900 disabled:text-gray-500">Tasdiqlash</button></div></motion.div></div>)}</AnimatePresence>
        </div>
    );
};

export default OrderDetail;
