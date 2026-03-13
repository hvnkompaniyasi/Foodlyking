import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Printer, MessageCircle, X, Info } from 'lucide-react';

// --- MOCK DATA (to be replaced with actual data fetching) ---
const mockOrderData = {
    '#FDLK-7892': { id: '#FDLK-7892', customer: { name: 'Azizbek Akbarov', phone: '+998 90 123 45 67', image: 'https://i.pravatar.cc/150?u=azizbek' }, date: '2024-07-30 14:25', amount: 95000, status: 'Yangi', items: [{ name: 'BBQ Burger', quantity: 2, price: 45000, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=200' }, { name: 'Cola 1.5L', quantity: 1, price: 12000, image: 'https://images.unsplash.com/photo-1622483767028-3f6e92c3ea09?q=80&w=200' }] },
    // ... other orders can be added here for direct access testing
};

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const order = mockOrderData[`#FDLK-${id}`] || mockOrderData['#FDLK-7892']; // Fallback for demonstration

    const [isCancelModalOpen, setCancelModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    const handleCancelSubmit = () => {
        if (cancelReason.trim()) {
            console.log('Buyurtma bekor qilindi. Sabab:', cancelReason);
            // Here you would typically update the order status via API
            setCancelModalOpen(false);
            navigate('/orders'); // Go back to orders list
        }
    };

    return (
        <div className="bg-black text-white min-h-full p-6 md:p-10 space-y-8 font-sans">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors" aria-label="Ortga qaytish">
                        <ArrowLeft size={22} />
                    </button>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter-premium text-white">Buyurtma {order.id}</h1>
                        <p className="text-gray-400 font-medium">Tafsilotlar va boshqaruv</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-5 bg-[#00A99D]/20 text-[#00A99D] rounded-xl font-bold hover:bg-[#00A99D]/30 transition-all" aria-label="Buyurtmani qabul qilish">
                        <CheckCircle size={18} /> Qabul qilish
                    </button>
                    <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors" aria-label="Chekni chop etish">
                        <Printer size={18} />
                    </button>
                    <button onClick={() => setCancelModalOpen(true)} className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition-colors" aria-label="Buyurtmani bekor qilish">
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Order Items */}
                <div className="lg:col-span-2 space-y-6">
                     <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h3 className="font-bold text-lg text-white mb-4">Taomlar</h3>
                        <div className="space-y-4">
                            {order.items.map(item => (
                                <div key={item.name} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                        <div>
                                            <p className="font-bold text-white">{item.name}</p>
                                            <p className="text-sm text-gray-400">{item.quantity} x {item.price.toLocaleString()} so'm</p>
                                        </div>
                                    </div>
                                    <p className="font-black text-lg text-white">{(item.quantity * item.price).toLocaleString()} so'm</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Customer & Total */}
                <div className="space-y-8">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                         <img src={order.customer.image} alt={order.customer.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700" />
                        <h3 className="font-bold text-xl text-white">{order.customer.name}</h3>
                        <p className="text-gray-400 mb-4">{order.customer.phone}</p>
                        <button className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-sky-500/20 text-sky-400 rounded-xl font-bold hover:bg-sky-500/30 transition-all" aria-label="Mijozga xabar yuborish">
                           <MessageCircle size={18} /> Xabar yuborish
                        </button>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <div className="flex justify-between items-center text-gray-400 font-medium">
                            <p>Jami summa:</p>
                            <p className="text-white font-black text-2xl">{order.amount.toLocaleString()} so'm</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Order Modal */}
            <AnimatePresence>
                {isCancelModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setCancelModalOpen(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
                            <h2 className="font-bold text-xl text-white mb-4">Buyurtmani bekor qilish</h2>
                            <p className="text-gray-400 mb-6">Iltimos, bekor qilish sababini aniq va tushunarli qilib yozing. Bu ma'lumot mijozga yuboriladi.</p>
                            <textarea 
                                value={cancelReason}
                                onChange={e => setCancelReason(e.target.value)}
                                placeholder="Masalan: 'Kechirasiz, tanlangan taom hozirda mavjud emas...'"
                                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                rows={4}
                                aria-label="Bekor qilish sababi"
                            ></textarea>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setCancelModalOpen(false)} className="py-2 px-5 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all">Ortga</button>
                                <button onClick={handleCancelSubmit} disabled={!cancelReason.trim()} className="py-2 px-5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all disabled:bg-red-900 disabled:text-gray-500">Tasdiqlash</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrderDetail;
