import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Menu items with correct paths
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg backdrop-blur-md transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/real-estate-logo--removebg-preview.png"
              alt="Prime Estate Logo"
              className="h-14 w-auto drop-shadow-md"
            />
            <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 tracking-wide">
              Prime Estate
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition duration-300
                           after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400
                           after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">👋 {user?.name}</span>
                <Link
                  to="/admin/dashboard"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="bg-blue-600 dark:bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition"
              >
                Admin Login
              </Link>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md hover:scale-105 transition"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="yellow" viewBox="0 0 24 24">
                  <path d="M12 4.5a1.5 1.5 0 010-3 1.5 1.5 0 010 3zm0 18a1.5 1.5 0 010-3 1.5 1.5 0 010 3zM4.5 12a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm18 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zM5.64 5.64a1.5 1.5 0 01-2.12-2.12 1.5 1.5 0 012.12 2.12zm12.72 12.72a1.5 1.5 0 01-2.12-2.12 1.5 1.5 0 012.12 2.12zM5.64 18.36a1.5 1.5 0 01-2.12 2.12 1.5 1.5 0 012.12-2.12zm12.72-12.72a1.5 1.5 0 01-2.12 2.12 1.5 1.5 0 012.12-2.12zM12 7a5 5 0 100 10 5 5 0 000-10z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.64 13.64A9 9 0 1110.36 2.36a7 7 0 1011.28 11.28z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-slideDown">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
                >
                  {item.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <Link to="/admin/dashboard" className="text-blue-600 dark:text-blue-400 font-semibold">Dashboard</Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/admin/login"
                  className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 text-center transition"
                >
                  Admin Login
                </Link>
              )}

              {/* Dark Mode Toggle in Mobile */}
              <button
                onClick={toggleTheme}
                className="mt-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md hover:scale-105 transition self-start"
              >
                {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar









