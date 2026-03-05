import React from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, LogOut, Package, Users, Settings, PieChart } from 'lucide-react'

const DashboardLayout = () => {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Buyurtmalar', path: '/orders' },
    { icon: Users, label: 'Adminlar', path: '/admins' },
    { icon: PieChart, label: 'Statistika', path: '/stats' },
    { icon: Settings, label: 'Sozlamalar', path: '/settings' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <h2 className="text-xl font-bold tracking-tighter">Foodly King</h2>
          <span className="text-xs bg-black text-white px-2 py-0-5 rounded-full font-bold ml-1">ADMIN</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? 'bg-black text-white shadow-lg shadow-black/10'
                  : 'text-gray-500 hover:bg-gray-100'
                  }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-black'} />
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors font-semibold text-sm"
          >
            <LogOut size={20} />
            Chiqish
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <h1 className="text-lg font-bold">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-none">{user?.email?.split('@')[0]}</p>
              <p className="text-xs text-gray-500 mt-1">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-10">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
