






import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { Eye, EyeOff, LogIn } from 'lucide-react'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  // ✅ Calculate greeting during render (no useEffect needed)
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const greeting = getGreeting()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      toast.success('✅ Login successful!')
      navigate('/admin/dashboard')
    } else {
      toast.error(result.message || '❌ Invalid email or password')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] bg-[radial-gradient(circle_at_top_right,#1E293B,transparent_60%)] py-12 px-4 sm:px-6 lg:px-8">
      {/* Font imports (add to index.html for performance) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] shadow-2xl p-8 md:p-10 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
        
        {/* Dynamic Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-xl transform transition-all duration-500 hover:scale-110 hover:rotate-3">
            <span className="text-4xl">🏢</span>
          </div>
          <h2 className="mt-6 text-4xl font-playfair font-bold text-white tracking-tight">
            {greeting}, Admin
          </h2>
          <p className="mt-2 text-gray-300 font-inter">
            Welcome back to your luxury property dashboard.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 font-inter mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 outline-none transition-all duration-300 font-inter"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password Input with Toggle */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 font-inter mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 outline-none transition-all duration-300 font-inter pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black font-bold font-inter text-base hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Sign in to Dashboard
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 font-inter">
            Real Estate Admin Portal © {new Date().getFullYear()}
          </p>
          <p className="text-xs text-gray-500 font-inter mt-1 opacity-60">
            Secure • Private • Premium
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

