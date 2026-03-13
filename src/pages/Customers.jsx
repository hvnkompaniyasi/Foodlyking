import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const CustomerRow = ({ customer }) => (
    <tr className="hover:bg-gray-800/60 transition-colors">
        <td className="p-4 font-bold">#{customer.id}</td>
        <td className="p-4">{customer.name}</td>
        <td className="p-4 text-gray-400">{customer.phone}</td>
        <td className="p-4">{customer.firstOrder}</td>
        <td className="p-4 font-bold text-right">{customer.totalOrders} ta</td>
    </tr>
);

const Customers = () => {
    // Bu ma'lumotlar backenddan kelishi kerak
    const [customers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState({ column: 'totalOrders', direction: 'desc' });

    const sortedCustomers = useMemo(() => {
        if (!customers.length) return [];

        const sorted = [...customers].sort((a, b) => {
            if (a[sort.column] < b[sort.column]) {
                return sort.direction === 'asc' ? -1 : 1;
            }
            if (a[sort.column] > b[sort.column]) {
                return sort.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sorted;
    }, [customers, sort]);

    const filteredCustomers = useMemo(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase().trim();
        if (!lowercasedSearchTerm) return sortedCustomers;

        return sortedCustomers.filter(customer =>
            customer.name.toLowerCase().includes(lowercasedSearchTerm) ||
            customer.phone.includes(lowercasedSearchTerm)
        );
    }, [searchTerm, sortedCustomers]);

    const handleSort = (column) => {
        if (sort.column === column) {
            setSort({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
        } else {
            setSort({ column, direction: 'desc' });
        }
    };
    
    const SortIcon = ({ column }) => {
        if (sort.column !== column) return null;
        return sort.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    };

    return (
        <div className="bg-black text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-black tracking-tighter-premium text-white">Mijozlar</h1>
                    <p className="text-gray-400 mt-1">Barcha mijozlar ro'yxati va ularning statistikasi.</p>
                </header>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="p-4 flex items-center justify-end border-b border-gray-800">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Mijoz ismi yoki raqami..."
                                className="w-full sm:w-64 bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                                aria-label="Mijozlarni qidirish"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-gray-400 uppercase tracking-wider">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4 cursor-pointer" onClick={() => handleSort('name')}>Ism <SortIcon column='name' /></th>
                                    <th className="p-4">Telefon</th>
                                    <th className="p-4 cursor-pointer" onClick={() => handleSort('firstOrder')}>Birinchi buyurtma <SortIcon column='firstOrder' /></th>
                                    <th className="p-4 text-right cursor-pointer" onClick={() => handleSort('totalOrders')}>Jami buyurtmalar <SortIcon column='totalOrders' /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.length > 0 ? (
                                    filteredCustomers.map(customer => <CustomerRow key={customer.id} customer={customer} />)
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-8 text-gray-500">
                                            Mijozlar topilmadi.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;
