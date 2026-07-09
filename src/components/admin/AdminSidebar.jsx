import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AdminSidebar = () => {
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/projects', icon: '🏗️', label: 'Projects' },
    { path: '/admin/services', icon: '🔧', label: 'Services' },
    { path: '/admin/testimonials', icon: '⭐', label: 'Testimonials' },
    { path: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
    { path: '/admin/contacts', icon: '📧', label: 'Contacts' },
  ]

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-400">🏡 Admin</h2>
        <p className="text-xs text-gray-400 mt-1">Real Estate Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-800 text-gray-300'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors mt-4"
      >
        <span className="text-xl">🚪</span>
        <span className="font-medium">Logout</span>
      </button>

      {/* Version */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">v1.0.0</p>
      </div>
    </div>
  )
}

export default AdminSidebar

