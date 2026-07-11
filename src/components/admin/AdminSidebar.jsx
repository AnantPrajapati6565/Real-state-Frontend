// // import { Link, useLocation } from 'react-router-dom'
// // import { useAuth } from '../../context/AuthContext'

// // const AdminSidebar = () => {
// //   const location = useLocation()
// //   const { logout } = useAuth()

// //   const menuItems = [
// //     { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
// //     { path: '/admin/projects', icon: '🏗️', label: 'Projects' },
// //     { path: '/admin/services', icon: '🔧', label: 'Services' },
// //     { path: '/admin/testimonials', icon: '⭐', label: 'Testimonials' },
// //     { path: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
// //     { path: '/admin/contacts', icon: '📧', label: 'Contacts' },
// //   ]

// //   const isActive = (path) => {
// //     return location.pathname === path || location.pathname.startsWith(path + '/')
// //   }

// //   return (
// //     <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
// //       {/* Logo */}
// //       <div className="mb-8">
// //         <h2 className="text-2xl font-bold text-blue-400">🏡 Admin</h2>
// //         <p className="text-xs text-gray-400 mt-1">Real Estate Dashboard</p>
// //       </div>

// //       {/* Navigation */}
// //       <nav className="flex-1 space-y-2">
// //         {menuItems.map((item) => (
// //           <Link
// //             key={item.path}
// //             to={item.path}
// //             className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
// //               isActive(item.path)
// //                 ? 'bg-blue-600 text-white'
// //                 : 'hover:bg-gray-800 text-gray-300'
// //             }`}
// //           >
// //             <span className="text-xl">{item.icon}</span>
// //             <span className="font-medium">{item.label}</span>
// //           </Link>
// //         ))}
// //       </nav>

// //       {/* Logout Button */}
// //       <button
// //         onClick={logout}
// //         className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors mt-4"
// //       >
// //         <span className="text-xl">🚪</span>
// //         <span className="font-medium">Logout</span>
// //       </button>

// //       {/* Version */}
// //       <div className="mt-4 pt-4 border-t border-gray-800">
// //         <p className="text-xs text-gray-500">v1.0.0</p>
// //       </div>
// //     </div>
// //   )
// // }

// // export default AdminSidebar




// import { Link, useLocation } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'

// const AdminSidebar = () => {
//   const location = useLocation()
//   const { logout } = useAuth()

//   const menuItems = [
//     { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
//     { path: '/admin/projects', icon: '🏗️', label: 'Projects' },
//     { path: '/admin/services', icon: '🔧', label: 'Services' },
//     { path: '/admin/testimonials', icon: '⭐', label: 'Testimonials' },
//     { path: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
//     { path: '/admin/contacts', icon: '📧', label: 'Contacts' },
//   ]

//   const isActive = (path) => {
//     return location.pathname === path || location.pathname.startsWith(path + '/')
//   }

//   return (
//     <div className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-gray-950 text-white flex flex-col shadow-2xl border-r border-slate-800/50 backdrop-blur-sm">
//       {/* Premium Logo Section */}
//       <div className="p-6 border-b border-slate-800/50">
//         <div className="flex items-center gap-3">
//           <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
//             <span className="text-2xl">🏡</span>
//           </div>
//           <div>
//             <h2 className="text-xl font-bold tracking-wide">
//               Estate<span className="text-cyan-400">Admin</span>
//             </h2>
//             <p className="text-xs text-slate-400">Real Estate Dashboard</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-5 space-y-3">
//         {menuItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`group flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 ${
//               isActive(item.path)
//                 ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 scale-105'
//                 : 'text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-2'
//             }`}
//           >
//             <span className="text-2xl group-hover:scale-110 transition-transform">
//               {item.icon}
//             </span>
//             <span className="font-medium">{item.label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Logout Button */}
//       <button
//         onClick={logout}
//         className="mx-5 mb-5 flex items-center justify-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 py-3 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
//       >
//         <span className="text-xl">🚪</span>
//         <span className="font-semibold">Logout</span>
//       </button>

//       {/* Footer */}
//       <div className="border-t border-slate-800/50 p-5 text-center">
//         <p className="text-sm text-slate-400 font-medium">Estate Admin Panel</p>
//         <p className="text-xs text-slate-500 mt-1">Version 2.0</p>
//       </div>
//     </div>
//   )
// }

// export default AdminSidebar




import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  LayoutDashboard, 
  Building2, 
  Wrench, 
  Star, 
  Image, 
  Mail,
  LogOut,
  Home,
  Settings,
  UserCog
} from 'lucide-react'

const AdminSidebar = () => {
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/projects', icon: Building2, label: 'Projects' },
    { path: '/admin/services', icon: Wrench, label: 'Services' },
    { path: '/admin/testimonials', icon: Star, label: 'Testimonials' },
    { path: '/admin/gallery', icon: Image, label: 'Gallery' },
    { path: '/admin/contacts', icon: Mail, label: 'Contacts' },
  ]

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-gray-950 text-white flex flex-col shadow-2xl border-r border-slate-800/50 backdrop-blur-sm">
      {/* Premium Logo Section */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Home className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wide">
              Estate<span className="text-cyan-400">Admin</span>
            </h2>
            <p className="text-xs text-slate-400">Real Estate Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 scale-105'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-2'
              }`}
            >
              <Icon className={`h-5 w-5 group-hover:scale-110 transition-transform ${
                isActive(item.path) ? 'text-white' : 'text-slate-400 group-hover:text-white'
              }`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mx-5 mb-5 flex items-center justify-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 py-3 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
      >
        <LogOut className="h-5 w-5" />
        <span className="font-semibold">Logout</span>
      </button>

      {/* Footer */}
      <div className="border-t border-slate-800/50 p-5 text-center">
        <p className="text-sm text-slate-400 font-medium">Estate Admin Panel</p>
        <p className="text-xs text-slate-500 mt-1">Version 2.0</p>
      </div>
    </div>
  )
}

export default AdminSidebar