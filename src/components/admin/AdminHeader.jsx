


import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Home, CalendarDays, User, LogOut } from 'lucide-react'

const AdminHeader = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-white via-slate-50 to-blue-50/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm px-8 py-4 flex justify-between items-center">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Admin Dashboard
          </span>
        </h1>
        <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4" />
          {today}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Home className="h-4 w-4" />
          <span>Website</span>
        </button>

        {/* Profile Card */}
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-md border border-slate-200/60 hover:shadow-lg transition-all duration-300">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || 'Admin'}
            </p>
            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white/50">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader