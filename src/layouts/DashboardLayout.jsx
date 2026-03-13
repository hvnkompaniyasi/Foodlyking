import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  LogOut,
  Package,
  Users,
  PieChart,
  Menu as MenuIcon,
  X,
  Search,
} from 'lucide-react'

const DashboardLayout = () => {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])
  
  // Basic responsive check
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize() // initial check
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Buyurtmalar', path: '/orders' },
    { icon: Users, label: 'Operatorlar', path: '/operators' },
    { icon: Users, label: 'Mijozlar', path: '/customers' },
    { icon: PieChart, label: 'Statistika', path: '/stats' },
  ]

  const filteredMenuItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 shadow-[25px_0_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 relative z-[1001]">
      {/* Logo & Close Button Area */}
      <div className={`p-6 mb-2 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-black tracking-tighter-premium leading-none">Foodly</h2>
            <div className="bg-black text-white px-3 py-1.5 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <span className="text-[10px] font-black uppercase tracking-widest">King</span>
            </div>
          </div>
        
        {isMobile && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Qidiruv..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-10 pr-4 text-sm font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-3">
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-5 px-5 py-4 rounded-[1.5rem] transition-all duration-300 group relative ${isActive
                ? 'bg-black text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] scale-[1.02]'
                : 'text-gray-400 hover:bg-gray-50 hover:text-black hover:translate-x-1'
                }`}
            >
              <item.icon size={22} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-black transition-colors'} />
              <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-black text-[13px] tracking-tight uppercase"
                >
                  {item.label}
              </motion.span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Area at the Bottom */}
      <div className="p-6 mt-auto">
        <div className="p-4 bg-gray-50/50 rounded-[2rem] border border-gray-100">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 px-5 py-4 w-full rounded-2xl text-red-500 hover:bg-white hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 font-black text-xs tracking-widest uppercase`}
          >
            <LogOut size={20} />
            <span>Chiqish</span>
          </button>
        </div>
      </div>
    </div>
  )

  const mainContentMargin = isSidebarOpen ? 'lg:ml-[320px]' : 'lg:ml-0';

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Desktop & Mobile Sidebar Container */}
      <div className='lg:block hidden'>
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? 320 : 0, padding: isSidebarOpen ? '0' : '0' }}
          transition={{ type: 'spring', damping: 30, stiffness: 250 }}
          className="fixed left-0 top-0 h-screen z-[1001] bg-white overflow-hidden"
        >
          <div className='w-[320px] h-full'>
            <SidebarContent />
          </div>
        </motion.aside>
      </div>


      {/* Mobile Sidebar (Slide-in) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000]"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[300px] z-[2001] bg-white"
            >
              <SidebarContent isMobile={true} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentMargin}`}>
        <header className="h-20 bg-white/80 backdrop-blur-lg border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-2 sm:gap-4">
             <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsMobileOpen(true)
                } else {
                  setIsSidebarOpen(!isSidebarOpen)
                }
              }}
              className="p-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition-all"
            >
              <MenuIcon size={22} />
            </button>
            <h1 className="text-lg sm:text-xl font-black tracking-tighter-premium truncate max-w-[150px] sm:max-w-none">
              {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-black leading-none">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest leading-none">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-700 shadow-sm overflow-hidden group hover:border-black transition-all cursor-pointer">
              {user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
