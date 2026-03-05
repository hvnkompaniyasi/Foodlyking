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
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const DashboardLayout = () => {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

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

  const SidebarContent = ({ collapsed = false }) => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 shadow-[25px_0_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 relative z-[1001] !opacity-100">
      <div className={`p-8 mb-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black tracking-tighter-premium leading-none">Foodly</h2>
            <div className="bg-black text-white px-3 py-1 rounded-xl shadow-lg shadow-black/20">
              <span className="text-[10px] font-black uppercase tracking-widest">King</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg shadow-black/20">F</div>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative ${isActive
                ? 'bg-black text-white shadow-2xl shadow-black/20'
                : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                }`}
            >
              <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-black transition-colors'} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-black text-sm tracking-tight"
                >
                  {item.label}
                </motion.span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-6 px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 whitespace-nowrap shadow-xl">
                  {item.label}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-50">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300 font-black text-sm tracking-tight ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Chiqish</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 288 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="hidden lg:block fixed left-0 top-0 h-screen z-[1001]"
      >
        <div className="relative h-full">
          <SidebarContent collapsed={isCollapsed} />
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-[1002]"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar (Slide-in) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[2000]"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[280px] z-[2001] shadow-[50px_0_100px_rgba(0,0,0,0.3)] bg-white"
            >
              <SidebarContent />
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition-all"
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

        <div className="p-6 lg:p-10 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
