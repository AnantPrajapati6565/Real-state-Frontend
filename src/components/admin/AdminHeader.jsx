import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AdminHeader = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <span>🏠</span>
          <span>Home</span>
        </button>
        
        <span className="text-sm text-gray-600">
          👋 {user?.name}
        </span>
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
          {user?.name?.charAt(0) || 'A'}
        </div>
      </div>
    </header>
  )
}

export default AdminHeader