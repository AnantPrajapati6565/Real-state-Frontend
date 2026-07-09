// import { useEffect, useState } from 'react'
// import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import api from '../../services/api'
// import AdminSidebar from './AdminSidebar'
// import AdminHeader from './AdminHeader'

// const AdminDashboard = ({ children }) => {
//   const { user } = useAuth()
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [stats, setStats] = useState({
//     projects: 0,
//     contacts: 0,
//     testimonials: 0,
//     services: 0,
//     gallery: 0
//   })
//   const [loading, setLoading] = useState(true)
//   const [recentContacts, setRecentContacts] = useState([])
//   const [recentProjects, setRecentProjects] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
        
//         const [projectsRes, contactsRes, testimonialsRes, servicesRes, galleryRes] = await Promise.all([
//           api.get('/projects'),
//           api.get('/contacts'),
//           api.get('/testimonials/admin'),
//           api.get('/services/admin'),
//           api.get('/gallery')
//         ])
        
//         setStats({
//           projects: projectsRes.data.data?.length || 0,
//           contacts: contactsRes.data.data?.length || 0,
//           testimonials: testimonialsRes.data.data?.length || 0,
//           services: servicesRes.data.data?.length || 0,
//           gallery: galleryRes.data.data?.length || 0
//         })

//         setRecentContacts(contactsRes.data.data?.slice(0, 5) || [])
//         setRecentProjects(projectsRes.data.data?.slice(0, 5) || [])
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error)
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [])

//   const getStatusColor = (status) => {
//     const colors = {
//       available: 'bg-green-100 text-green-800',
//       sold: 'bg-red-100 text-red-800',
//       ongoing: 'bg-yellow-100 text-yellow-800',
//       completed: 'bg-blue-100 text-blue-800',
//       pending: 'bg-yellow-100 text-yellow-800',
//       read: 'bg-blue-100 text-blue-800',
//       replied: 'bg-green-100 text-green-800'
//     }
//     return colors[status] || 'bg-gray-100 text-gray-800'
//   }

//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     })
//   }

//   // Check if we're on a sub-route (like /admin/projects)
//   const isSubRoute = location.pathname !== '/admin/dashboard'

//   // If children are passed (sub-route), render with children
//   if (children) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <AdminSidebar />
//         <div className="flex-1">
//           <AdminHeader />
//           <div className="p-6">
//             {/* Home Button inside content area */}
//             <div className="mb-4">
//               <button
//                 onClick={() => navigate('/')}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <span>🏠</span>
//                 Back to Home
//               </button>
//             </div>
//             {children}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // If on sub-route with Outlet
//   if (isSubRoute) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <AdminSidebar />
//         <div className="flex-1">
//           <AdminHeader />
//           <div className="p-6">
//             {/* Home Button inside content area */}
//             <div className="mb-4">
//               <button
//                 onClick={() => navigate('/')}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <span>🏠</span>
//                 Back to Home
//               </button>
//             </div>
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Main Dashboard View
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <AdminSidebar />
//       <div className="flex-1">
//         <AdminHeader />
        
//         <div className="p-6">
//           {/* Home Button - Top Right Corner */}
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//               <p className="text-gray-600 mt-1">
//                 Welcome back, {user?.name}!
//               </p>
//             </div>
//             <button
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//             >
//               <span className="text-xl">🏠</span>
//               <span>View Website</span>
//             </button>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Total Projects</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.projects}</p>
//                 </div>
//                 <div className="p-3 bg-blue-100 rounded-full">
//                   <span className="text-2xl">🏗️</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/projects" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   Manage Projects →
//                 </Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Contact Messages</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.contacts}</p>
//                 </div>
//                 <div className="p-3 bg-green-100 rounded-full">
//                   <span className="text-2xl">📧</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/contacts" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   View Messages →
//                 </Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Testimonials</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.testimonials}</p>
//                 </div>
//                 <div className="p-3 bg-yellow-100 rounded-full">
//                   <span className="text-2xl">⭐</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/testimonials" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   Manage Testimonials →
//                 </Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Services</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.services}</p>
//                 </div>
//                 <div className="p-3 bg-purple-100 rounded-full">
//                   <span className="text-2xl">🔧</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/services" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   Manage Services →
//                 </Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Gallery Items</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.gallery}</p>
//                 </div>
//                 <div className="p-3 bg-pink-100 rounded-full">
//                   <span className="text-2xl">🖼️</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/gallery" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   Manage Gallery →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               <Link to="/admin/projects" className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors">
//                 <div className="text-3xl mb-2">🏗️</div>
//                 <div className="font-medium text-sm">Add Project</div>
//               </Link>
//               <Link to="/admin/contacts" className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors">
//                 <div className="text-3xl mb-2">📧</div>
//                 <div className="font-medium text-sm">View Contacts</div>
//               </Link>
//               <Link to="/admin/testimonials" className="bg-yellow-600 text-white p-4 rounded-lg text-center hover:bg-yellow-700 transition-colors">
//                 <div className="text-3xl mb-2">⭐</div>
//                 <div className="font-medium text-sm">Add Testimonial</div>
//               </Link>
//               <Link to="/admin/services" className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors">
//                 <div className="text-3xl mb-2">🔧</div>
//                 <div className="font-medium text-sm">Add Service</div>
//               </Link>
//               <Link to="/admin/gallery" className="bg-pink-600 text-white p-4 rounded-lg text-center hover:bg-pink-700 transition-colors">
//                 <div className="text-3xl mb-2">🖼️</div>
//                 <div className="font-medium text-sm">Add Image</div>
//               </Link>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Recent Contacts</h2>
//                 <Link to="/admin/contacts" className="text-sm text-blue-600 hover:text-blue-800">
//                   View All →
//                 </Link>
//               </div>
//               {recentContacts.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No contacts yet</p>
//               ) : (
//                 <div className="space-y-4">
//                   {recentContacts.map((contact) => (
//                     <div key={contact.id} className="flex items-center justify-between border-b pb-3 last:border-0">
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{contact.full_name}</p>
//                         <p className="text-sm text-gray-500 truncate">{contact.subject}</p>
//                       </div>
//                       <div className="flex items-center gap-2 ml-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
//                           {contact.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
//                 <Link to="/admin/projects" className="text-sm text-blue-600 hover:text-blue-800">
//                   View All →
//                 </Link>
//               </div>
//               {recentProjects.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No projects yet</p>
//               ) : (
//                 <div className="space-y-4">
//                   {recentProjects.map((project) => (
//                     <div key={project.id} className="flex items-center justify-between border-b pb-3 last:border-0">
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{project.name}</p>
//                         <p className="text-sm text-gray-500 truncate">{project.location}</p>
//                       </div>
//                       <div className="flex items-center gap-2 ml-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
//                           {project.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* System Info with Home Button */}
//           <div className="mt-8 bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                   <div>
//                     <p className="text-gray-500">Admin User</p>
//                     <p className="font-medium text-gray-900">{user?.name}</p>
//                     <p className="text-gray-600">{user?.email}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Total Content Items</p>
//                     <p className="font-medium text-gray-900">
//                       {stats.projects + stats.services + stats.testimonials + stats.contacts + stats.gallery}
//                     </p>
//                     <p className="text-gray-600">Across all categories</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Last Login</p>
//                     <p className="font-medium text-gray-900">{new Date().toLocaleString()}</p>
//                     <p className="text-gray-600">Current session</p>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => navigate('/')}
//                 className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//               >
//                 <span className="text-2xl">🏠</span>
//                 <span className="font-medium">Visit Website</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard



// import { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import api from '../../services/api'
// import AdminSidebar from './AdminSidebar'
// import AdminHeader from './AdminHeader'

// const AdminDashboard = ({ children }) => {
//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const [stats, setStats] = useState({
//     projects: 0,
//     contacts: 0,
//     testimonials: 0,
//     services: 0,
//     gallery: 0
//   })
//   const [loading, setLoading] = useState(true)
//   const [recentContacts, setRecentContacts] = useState([])
//   const [recentProjects, setRecentProjects] = useState([])

//   // ============================================
//   // FETCH DATA
//   // ============================================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
        
//         const [projectsRes, contactsRes, testimonialsRes, servicesRes, galleryRes] = await Promise.all([
//           api.get('/projects'),
//           api.get('/contacts'),
//           api.get('/testimonials/admin'),
//           api.get('/services/admin'),
//           api.get('/gallery')
//         ])
        
//         setStats({
//           projects: projectsRes.data.data?.length || 0,
//           contacts: contactsRes.data.data?.length || 0,
//           testimonials: testimonialsRes.data.data?.length || 0,
//           services: servicesRes.data.data?.length || 0,
//           gallery: galleryRes.data.data?.length || 0
//         })

//         setRecentContacts(contactsRes.data.data?.slice(0, 5) || [])
//         setRecentProjects(projectsRes.data.data?.slice(0, 5) || [])
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error)
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [])

//   // ============================================
//   // HELPERS
//   // ============================================
//   const getStatusColor = (status) => {
//     const colors = {
//       available: 'bg-green-100 text-green-800',
//       sold: 'bg-red-100 text-red-800',
//       ongoing: 'bg-yellow-100 text-yellow-800',
//       completed: 'bg-blue-100 text-blue-800',
//       pending: 'bg-yellow-100 text-yellow-800',
//       read: 'bg-blue-100 text-blue-800',
//       replied: 'bg-green-100 text-green-800'
//     }
//     return colors[status] || 'bg-gray-100 text-gray-800'
//   }

//   // ============================================
//   // LOADING
//   // ============================================
//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <AdminSidebar />
//         <div className="flex-1">
//           <AdminHeader />
//           <div className="flex justify-center items-center h-96">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading dashboard...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // IF CHILDREN (sub-route like /admin/projects)
//   // ============================================
//   if (children) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <AdminSidebar />
//         <div className="flex-1">
//           <AdminHeader />
//           <div className="p-6">
//             {children}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // MAIN DASHBOARD VIEW
//   // ============================================
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <AdminSidebar />
//       <div className="flex-1">
//         <AdminHeader />
        
//         <div className="p-6">
//           {/* ✅ ONLY ONE HOME BUTTON - in the header */}
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//               <p className="text-gray-600 mt-1">
//                 Welcome back, {user?.name}!
//               </p>
//             </div>
//             <button
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//             >
//               <span className="text-xl">🏠</span>
//               <span>View Website</span>
//             </button>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Total Projects</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.projects}</p>
//                 </div>
//                 <div className="p-3 bg-blue-100 rounded-full">
//                   <span className="text-2xl">🏗️</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/projects" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   Manage Projects →
//                 </Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Contact Messages</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.contacts}</p>
//                 </div>
//                 <div className="p-3 bg-green-100 rounded-full">
//                   <span className="text-2xl">📧</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/contacts" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   View Messages →
//                 </Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Testimonials</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.testimonials}</p>
//                 </div>
//                 <div className="p-3 bg-yellow-100 rounded-full">
//                   <span className="text-2xl">⭐</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/testimonials" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   Manage Testimonials →
//                 </Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Services</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.services}</p>
//                 </div>
//                 <div className="p-3 bg-purple-100 rounded-full">
//                   <span className="text-2xl">🔧</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/services" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   Manage Services →
//                 </Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Gallery Items</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{stats.gallery}</p>
//                 </div>
//                 <div className="p-3 bg-pink-100 rounded-full">
//                   <span className="text-2xl">🖼️</span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/gallery" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   Manage Gallery →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               <Link to="/admin/projects" className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors">
//                 <div className="text-3xl mb-2">🏗️</div>
//                 <div className="font-medium text-sm">Add Project</div>
//               </Link>
//               <Link to="/admin/contacts" className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors">
//                 <div className="text-3xl mb-2">📧</div>
//                 <div className="font-medium text-sm">View Contacts</div>
//               </Link>
//               <Link to="/admin/testimonials" className="bg-yellow-600 text-white p-4 rounded-lg text-center hover:bg-yellow-700 transition-colors">
//                 <div className="text-3xl mb-2">⭐</div>
//                 <div className="font-medium text-sm">Add Testimonial</div>
//               </Link>
//               <Link to="/admin/services" className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors">
//                 <div className="text-3xl mb-2">🔧</div>
//                 <div className="font-medium text-sm">Add Service</div>
//               </Link>
//               <Link to="/admin/gallery" className="bg-pink-600 text-white p-4 rounded-lg text-center hover:bg-pink-700 transition-colors">
//                 <div className="text-3xl mb-2">🖼️</div>
//                 <div className="font-medium text-sm">Add Image</div>
//               </Link>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Recent Contacts</h2>
//                 <Link to="/admin/contacts" className="text-sm text-blue-600 hover:text-blue-800">
//                   View All →
//                 </Link>
//               </div>
//               {recentContacts.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No contacts yet</p>
//               ) : (
//                 <div className="space-y-4">
//                   {recentContacts.map((contact) => (
//                     <div key={contact.id} className="flex items-center justify-between border-b pb-3 last:border-0">
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{contact.full_name}</p>
//                         <p className="text-sm text-gray-500 truncate">{contact.subject}</p>
//                       </div>
//                       <div className="flex items-center gap-2 ml-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
//                           {contact.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
//                 <Link to="/admin/projects" className="text-sm text-blue-600 hover:text-blue-800">
//                   View All →
//                 </Link>
//               </div>
//               {recentProjects.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No projects yet</p>
//               ) : (
//                 <div className="space-y-4">
//                   {recentProjects.map((project) => (
//                     <div key={project.id} className="flex items-center justify-between border-b pb-3 last:border-0">
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{project.name}</p>
//                         <p className="text-sm text-gray-500 truncate">{project.location}</p>
//                       </div>
//                       <div className="flex items-center gap-2 ml-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
//                           {project.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* System Info */}
//           <div className="mt-8 bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                   <div>
//                     <p className="text-gray-500">Admin User</p>
//                     <p className="font-medium text-gray-900">{user?.name}</p>
//                     <p className="text-gray-600">{user?.email}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Total Content Items</p>
//                     <p className="font-medium text-gray-900">
//                       {stats.projects + stats.services + stats.testimonials + stats.contacts + stats.gallery}
//                     </p>
//                     <p className="text-gray-600">Across all categories</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Last Login</p>
//                     <p className="font-medium text-gray-900">{new Date().toLocaleString()}</p>
//                     <p className="text-gray-600">Current session</p>
//                   </div>
//                 </div>
//               </div>
//               {/* ✅ ONLY ONE HOME BUTTON - consistent location */}
//               <button
//                 onClick={() => navigate('/')}
//                 className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//               >
//                 <span className="text-2xl">🏠</span>
//                 <span className="font-medium">Visit Website</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard








import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const AdminDashboard = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    testimonials: 0,
    services: 0,
    gallery: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentContacts, setRecentContacts] = useState([])
  const [recentProjects, setRecentProjects] = useState([])

  // ============================================
  // FETCH DATA
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const [projectsRes, contactsRes, testimonialsRes, servicesRes, galleryRes] = await Promise.all([
          api.get('/projects'),
          api.get('/contacts'),
          api.get('/testimonials/admin'),
          api.get('/services/admin'),
          api.get('/gallery')
        ])
        
        setStats({
          projects: projectsRes.data.data?.length || 0,
          contacts: contactsRes.data.data?.length || 0,
          testimonials: testimonialsRes.data.data?.length || 0,
          services: servicesRes.data.data?.length || 0,
          gallery: galleryRes.data.data?.length || 0
        })

        setRecentContacts(contactsRes.data.data?.slice(0, 5) || [])
        setRecentProjects(projectsRes.data.data?.slice(0, 5) || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // ============================================
  // HELPERS
  // ============================================
  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-green-100 text-green-800',
      sold: 'bg-red-100 text-red-800',
      ongoing: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getProjectStatusLabel = (status) => {
    const labels = {
      available: 'Available',
      sold: 'Sold',
      ongoing: 'In Progress',
      completed: 'Completed'
    }
    return labels[status] || status || 'Unknown'
  }

  // ============================================
  // LOADING
  // ============================================
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ============================================
  // IF CHILDREN (sub-route like /admin/projects)
  // ============================================
  if (children) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    )
  }

  // ============================================
  // MAIN DASHBOARD VIEW
  // ============================================
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        
        <div className="p-6">
          {/* ✅ ONLY ONE HOME BUTTON - Top Right */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.name}!
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <span className="text-xl">🏠</span>
              <span>View Website</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Projects</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.projects}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <span className="text-2xl">🏗️</span>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/projects" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Manage Projects →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Contact Messages</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.contacts}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <span className="text-2xl">📧</span>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/contacts" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View Messages →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Testimonials</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.testimonials}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/testimonials" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Manage Testimonials →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Services</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.services}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <span className="text-2xl">🔧</span>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/services" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Manage Services →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Gallery Items</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.gallery}</p>
                </div>
                <div className="p-3 bg-pink-100 rounded-full">
                  <span className="text-2xl">🖼️</span>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/gallery" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Manage Gallery →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link to="/admin/projects" className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors">
                <div className="text-3xl mb-2">🏗️</div>
                <div className="font-medium text-sm">Add Project</div>
              </Link>
              <Link to="/admin/contacts" className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors">
                <div className="text-3xl mb-2">📧</div>
                <div className="font-medium text-sm">View Contacts</div>
              </Link>
              <Link to="/admin/testimonials" className="bg-yellow-600 text-white p-4 rounded-lg text-center hover:bg-yellow-700 transition-colors">
                <div className="text-3xl mb-2">⭐</div>
                <div className="font-medium text-sm">Add Testimonial</div>
              </Link>
              <Link to="/admin/services" className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors">
                <div className="text-3xl mb-2">🔧</div>
                <div className="font-medium text-sm">Add Service</div>
              </Link>
              <Link to="/admin/gallery" className="bg-pink-600 text-white p-4 rounded-lg text-center hover:bg-pink-700 transition-colors">
                <div className="text-3xl mb-2">🖼️</div>
                <div className="font-medium text-sm">Add Image</div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Contacts</h2>
                <Link to="/admin/contacts" className="text-sm text-blue-600 hover:text-blue-800">
                  View All →
                </Link>
              </div>
              {recentContacts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No contacts yet</p>
              ) : (
                <div className="space-y-4">
                  {recentContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{contact.full_name}</p>
                        <p className="text-sm text-gray-500 truncate">{contact.subject}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
                <Link to="/admin/projects" className="text-sm text-blue-600 hover:text-blue-800">
                  View All →
                </Link>
              </div>
              {recentProjects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No projects yet</p>
              ) : (
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{project.name}</p>
                        <p className="text-sm text-gray-500 truncate">{project.location}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getProjectStatusLabel(project.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* System Info - NO HOME BUTTON HERE */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Admin User</p>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Content Items</p>
                <p className="font-medium text-gray-900">
                  {stats.projects + stats.services + stats.testimonials + stats.contacts + stats.gallery}
                </p>
                <p className="text-gray-600">Across all categories</p>
              </div>
              <div>
                <p className="text-gray-500">Last Login</p>
                <p className="font-medium text-gray-900">{new Date().toLocaleString()}</p>
                <p className="text-gray-600">Current session</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard