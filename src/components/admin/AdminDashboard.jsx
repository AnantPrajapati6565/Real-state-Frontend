



// import { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import api from '../../services/api'
// import AdminSidebar from './AdminSidebar'
// import AdminHeader from './AdminHeader'
// import { 
//   Home, 
//   Building2, 
//   Mail, 
//   Star, 
//   Wrench, 
//   Image, 
//   Plus, 
//   Eye,
//   ArrowUpRight,
//   Users,
//   Award,
//   Clock,
//   TrendingUp
// } from 'lucide-react'

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
//       available: 'bg-emerald-100 text-emerald-700',
//       sold: 'bg-rose-100 text-rose-700',
//       ongoing: 'bg-amber-100 text-amber-700',
//       completed: 'bg-blue-100 text-blue-700',
//       pending: 'bg-amber-100 text-amber-700',
//       read: 'bg-indigo-100 text-indigo-700',
//       replied: 'bg-emerald-100 text-emerald-700'
//     }
//     return colors[status] || 'bg-gray-100 text-gray-700'
//   }

//   const getProjectStatusLabel = (status) => {
//     const labels = {
//       available: 'Available',
//       sold: 'Sold',
//       ongoing: 'In Progress',
//       completed: 'Completed'
//     }
//     return labels[status] || status || 'Unknown'
//   }

//   // ============================================
//   // LOADING
//   // ============================================
//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
//         <AdminSidebar />
//         <div className="flex-1 p-8 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 min-h-screen rounded-l-[35px]">
//           <div className="flex justify-center items-center h-96">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
//               <p className="text-slate-600 font-medium">Loading dashboard...</p>
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
//       <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
//         <AdminSidebar />
//         <div className="flex-1 p-8 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 min-h-screen rounded-l-[35px]">
//           {children}
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // MAIN DASHBOARD VIEW
//   // ============================================
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
//       <AdminSidebar />
      
//       {/* Premium Content Area with Warm Gradient */}
//       <div className="flex-1 p-8 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/70 min-h-screen rounded-l-[35px] shadow-[inset_0_0_80px_rgba(212,175,55,0.05)]">
        
//         {/* Header Section with Premium Gold Accent */}
//         <div className="flex justify-between items-center mb-10 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-amber-200/30 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
//           <div>
//             <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
//               Dashboard
//             </h1>
//             <p className="text-slate-600 text-lg mt-1 flex items-center gap-2">
//               Welcome back, {user?.name}!
//               <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//             </p>
//           </div>
//           <button
//             onClick={() => navigate('/')}
//             className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
//           >
//             <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span>View Website</span>
//             <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//           </button>
//         </div>

//         {/* Stats Cards with Premium Gradients */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           {/* Projects – Deep Blue Gradient */}
//           <div className="group bg-gradient-to-br from-blue-50 to-indigo-50/80 backdrop-blur-xl rounded-3xl p-7 border border-blue-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Projects</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.projects}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Building2 className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/projects" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   Manage Projects →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Contacts – Emerald Gradient */}
//           <div className="group bg-gradient-to-br from-emerald-50 to-green-50/80 backdrop-blur-xl rounded-3xl p-7 border border-emerald-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Contacts</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.contacts}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Mail className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/contacts" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   View Messages →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Testimonials – Amber Gradient */}
//           <div className="group bg-gradient-to-br from-amber-50 to-orange-50/80 backdrop-blur-xl rounded-3xl p-7 border border-amber-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Testimonials</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.testimonials}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Star className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/testimonials" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   Manage Testimonials →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Services – Violet Gradient */}
//           <div className="group bg-gradient-to-br from-violet-50 to-purple-50/80 backdrop-blur-xl rounded-3xl p-7 border border-violet-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Services</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.services}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Wrench className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/services" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   Manage Services →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Gallery – Rose Gradient */}
//           <div className="group bg-gradient-to-br from-rose-50 to-pink-50/80 backdrop-blur-xl rounded-3xl p-7 border border-rose-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Gallery</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.gallery}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Image className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/gallery" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   Manage Gallery →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions – Premium Cards with Custom Backgrounds */}
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 mb-8 relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
//           <h2 className="text-lg font-bold text-slate-900 mb-6 relative">Quick Actions</h2>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
//             {[
//               { icon: <Plus className="h-6 w-6" />, label: 'Add Project', to: '/admin/projects', bg: 'from-blue-600 to-indigo-600' },
//               { icon: <Mail className="h-6 w-6" />, label: 'View Contacts', to: '/admin/contacts', bg: 'from-emerald-500 to-green-600' },
//               { icon: <Star className="h-6 w-6" />, label: 'Add Testimonial', to: '/admin/testimonials', bg: 'from-amber-500 to-orange-500' },
//               { icon: <Wrench className="h-6 w-6" />, label: 'Add Service', to: '/admin/services', bg: 'from-violet-600 to-purple-600' },
//               { icon: <Image className="h-6 w-6" />, label: 'Add Image', to: '/admin/gallery', bg: 'from-rose-500 to-pink-500' },
//             ].map((action, idx) => (
//               <Link
//                 key={idx}
//                 to={action.to}
//                 className={`group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-gradient-to-br ${action.bg} text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300`}
//               >
//                 <div className="group-hover:scale-110 transition-transform duration-300">
//                   {action.icon}
//                 </div>
//                 <span className="text-xs font-semibold">{action.label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Recent Activity – White Cards with Subtle Backgrounds */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Recent Contacts */}
//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
//             <div className="relative">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-bold text-slate-900">Recent Contacts</h2>
//                 <Link to="/admin/contacts" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 group">
//                   View All
//                   <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                 </Link>
//               </div>
//               {recentContacts.length === 0 ? (
//                 <p className="text-slate-500 text-center py-8">No contacts yet</p>
//               ) : (
//                 <div className="space-y-3">
//                   {recentContacts.map((contact) => (
//                     <div key={contact.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100 transition">
//                       <div className="flex-1 min-w-0">
//                         <p className="font-semibold text-slate-900 truncate">{contact.full_name}</p>
//                         <p className="text-sm text-slate-500 truncate">{contact.subject}</p>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(contact.status)}`}>
//                         {contact.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Recent Projects */}
//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
//             <div className="relative">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-bold text-slate-900">Recent Projects</h2>
//                 <Link to="/admin/projects" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 group">
//                   View All
//                   <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                 </Link>
//               </div>
//               {recentProjects.length === 0 ? (
//                 <p className="text-slate-500 text-center py-8">No projects yet</p>
//               ) : (
//                 <div className="space-y-3">
//                   {recentProjects.map((project) => (
//                     <div key={project.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100 transition">
//                       <div className="flex-1 min-w-0">
//                         <p className="font-semibold text-slate-900 truncate">{project.name}</p>
//                         <p className="text-sm text-slate-500 truncate">{project.location}</p>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(project.status)}`}>
//                         {getProjectStatusLabel(project.status)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* System Information – Premium Info Cards */}
//         <div className="mt-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
//           <h2 className="text-lg font-bold text-slate-900 mb-6 relative">System Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
//             <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-blue-50/80 border border-indigo-100/40 shadow-sm">
//               <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
//                 <Users className="h-6 w-6" />
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 font-medium">Admin User</p>
//                 <p className="font-semibold text-slate-900">{user?.name}</p>
//                 <p className="text-sm text-slate-600">{user?.email}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 border border-emerald-100/40 shadow-sm">
//               <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
//                 <Award className="h-6 w-6" />
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 font-medium">Total Content</p>
//                 <p className="font-semibold text-slate-900 text-xl">
//                   {stats.projects + stats.services + stats.testimonials + stats.contacts + stats.gallery}
//                 </p>
//                 <p className="text-sm text-slate-600">Across all categories</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 border border-amber-100/40 shadow-sm">
//               <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
//                 <Clock className="h-6 w-6" />
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 font-medium">Last Login</p>
//                 <p className="font-semibold text-slate-900">{new Date().toLocaleString()}</p>
//                 <p className="text-sm text-slate-600">Current session</p>
//               </div>
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
// import { 
//   Home, 
//   Building2, 
//   Mail, 
//   Star, 
//   Wrench, 
//   Image, 
//   Plus, 
//   Eye,
//   ArrowUpRight,
//   Users,
//   Award,
//   Clock,
//   TrendingUp
// } from 'lucide-react'

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
//   // FETCH DASHBOARD DATA (LIGHTWEIGHT)
//   // ============================================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         // Single API call – returns counts + recent items
//         const response = await api.get('/dashboard/stats')
//         const { counts, recentContacts, recentProjects } = response.data.data

//         setStats({
//           projects: counts.projects,
//           contacts: counts.contacts,
//           testimonials: counts.testimonials,
//           services: counts.services,
//           gallery: counts.gallery,
//         })

//         setRecentContacts(recentContacts || [])
//         setRecentProjects(recentProjects || [])
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error)
//         // Fallback: show nothing
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
//       available: 'bg-emerald-100 text-emerald-700',
//       sold: 'bg-rose-100 text-rose-700',
//       ongoing: 'bg-amber-100 text-amber-700',
//       completed: 'bg-blue-100 text-blue-700',
//       pending: 'bg-amber-100 text-amber-700',
//       read: 'bg-indigo-100 text-indigo-700',
//       replied: 'bg-emerald-100 text-emerald-700'
//     }
//     return colors[status] || 'bg-gray-100 text-gray-700'
//   }

//   const getProjectStatusLabel = (status) => {
//     const labels = {
//       available: 'Available',
//       sold: 'Sold',
//       ongoing: 'In Progress',
//       completed: 'Completed'
//     }
//     return labels[status] || status || 'Unknown'
//   }

//   // ============================================
//   // LOADING
//   // ============================================
//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
//         <AdminSidebar />
//         <div className="flex-1 p-8 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 min-h-screen rounded-l-[35px]">
//           <div className="flex justify-center items-center h-96">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
//               <p className="text-slate-600 font-medium">Loading dashboard...</p>
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
//       <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
//         <AdminSidebar />
//         <div className="flex-1 p-8 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 min-h-screen rounded-l-[35px]">
//           {children}
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // MAIN DASHBOARD VIEW
//   // ============================================
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
//       <AdminSidebar />
      
//       {/* Premium Content Area with Warm Gradient */}
//       <div className="flex-1 p-8 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/70 min-h-screen rounded-l-[35px] shadow-[inset_0_0_80px_rgba(212,175,55,0.05)]">
        
//         {/* Header Section with Premium Gold Accent */}
//         <div className="flex justify-between items-center mb-10 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-amber-200/30 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
//           <div>
//             <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
//               Dashboard
//             </h1>
//             <p className="text-slate-600 text-lg mt-1 flex items-center gap-2">
//               Welcome back, {user?.name}!
//               <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//             </p>
//           </div>
//           <button
//             onClick={() => navigate('/')}
//             className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
//           >
//             <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span>View Website</span>
//             <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//           </button>
//         </div>

//         {/* Stats Cards with Premium Gradients */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           {/* Projects – Deep Blue Gradient */}
//           <div className="group bg-gradient-to-br from-blue-50 to-indigo-50/80 backdrop-blur-xl rounded-3xl p-7 border border-blue-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Projects</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.projects}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Building2 className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/projects" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   Manage Projects →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Contacts – Emerald Gradient */}
//           <div className="group bg-gradient-to-br from-emerald-50 to-green-50/80 backdrop-blur-xl rounded-3xl p-7 border border-emerald-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Contacts</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.contacts}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Mail className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/contacts" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   View Messages →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Testimonials – Amber Gradient */}
//           <div className="group bg-gradient-to-br from-amber-50 to-orange-50/80 backdrop-blur-xl rounded-3xl p-7 border border-amber-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Testimonials</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.testimonials}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Star className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/testimonials" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   Manage Testimonials →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Services – Violet Gradient */}
//           <div className="group bg-gradient-to-br from-violet-50 to-purple-50/80 backdrop-blur-xl rounded-3xl p-7 border border-violet-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Services</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.services}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Wrench className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/services" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   Manage Services →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Gallery – Rose Gradient */}
//           <div className="group bg-gradient-to-br from-rose-50 to-pink-50/80 backdrop-blur-xl rounded-3xl p-7 border border-rose-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Gallery</p>
//                   <p className="text-4xl font-black text-slate-900 mt-1">{stats.gallery}</p>
//                 </div>
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Image className="h-8 w-8" />
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Link to="/admin/gallery" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
//                   Manage Gallery →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions – Premium Cards with Custom Backgrounds */}
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 mb-8 relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
//           <h2 className="text-lg font-bold text-slate-900 mb-6 relative">Quick Actions</h2>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
//             {[
//               { icon: <Plus className="h-6 w-6" />, label: 'Add Project', to: '/admin/projects', bg: 'from-blue-600 to-indigo-600' },
//               { icon: <Mail className="h-6 w-6" />, label: 'View Contacts', to: '/admin/contacts', bg: 'from-emerald-500 to-green-600' },
//               { icon: <Star className="h-6 w-6" />, label: 'Add Testimonial', to: '/admin/testimonials', bg: 'from-amber-500 to-orange-500' },
//               { icon: <Wrench className="h-6 w-6" />, label: 'Add Service', to: '/admin/services', bg: 'from-violet-600 to-purple-600' },
//               { icon: <Image className="h-6 w-6" />, label: 'Add Image', to: '/admin/gallery', bg: 'from-rose-500 to-pink-500' },
//             ].map((action, idx) => (
//               <Link
//                 key={idx}
//                 to={action.to}
//                 className={`group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-gradient-to-br ${action.bg} text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300`}
//               >
//                 <div className="group-hover:scale-110 transition-transform duration-300">
//                   {action.icon}
//                 </div>
//                 <span className="text-xs font-semibold">{action.label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Recent Activity – White Cards with Subtle Backgrounds */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Recent Contacts */}
//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
//             <div className="relative">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-bold text-slate-900">Recent Contacts</h2>
//                 <Link to="/admin/contacts" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 group">
//                   View All
//                   <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                 </Link>
//               </div>
//               {recentContacts.length === 0 ? (
//                 <p className="text-slate-500 text-center py-8">No contacts yet</p>
//               ) : (
//                 <div className="space-y-3">
//                   {recentContacts.map((contact) => (
//                     <div key={contact.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100 transition">
//                       <div className="flex-1 min-w-0">
//                         <p className="font-semibold text-slate-900 truncate">{contact.full_name}</p>
//                         <p className="text-sm text-slate-500 truncate">{contact.subject}</p>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(contact.status)}`}>
//                         {contact.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Recent Projects */}
//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
//             <div className="relative">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-bold text-slate-900">Recent Projects</h2>
//                 <Link to="/admin/projects" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 group">
//                   View All
//                   <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                 </Link>
//               </div>
//               {recentProjects.length === 0 ? (
//                 <p className="text-slate-500 text-center py-8">No projects yet</p>
//               ) : (
//                 <div className="space-y-3">
//                   {recentProjects.map((project) => (
//                     <div key={project.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100 transition">
//                       <div className="flex-1 min-w-0">
//                         <p className="font-semibold text-slate-900 truncate">{project.name}</p>
//                         <p className="text-sm text-slate-500 truncate">{project.location}</p>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(project.status)}`}>
//                         {getProjectStatusLabel(project.status)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* System Information – Premium Info Cards */}
//         <div className="mt-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
//           <h2 className="text-lg font-bold text-slate-900 mb-6 relative">System Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
//             <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-blue-50/80 border border-indigo-100/40 shadow-sm">
//               <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
//                 <Users className="h-6 w-6" />
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 font-medium">Admin User</p>
//                 <p className="font-semibold text-slate-900">{user?.name}</p>
//                 <p className="text-sm text-slate-600">{user?.email}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 border border-emerald-100/40 shadow-sm">
//               <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
//                 <Award className="h-6 w-6" />
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 font-medium">Total Content</p>
//                 <p className="font-semibold text-slate-900 text-xl">
//                   {stats.projects + stats.services + stats.testimonials + stats.contacts + stats.gallery}
//                 </p>
//                 <p className="text-sm text-slate-600">Across all categories</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 border border-amber-100/40 shadow-sm">
//               <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
//                 <Clock className="h-6 w-6" />
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 font-medium">Last Login</p>
//                 <p className="font-semibold text-slate-900">{new Date().toLocaleString()}</p>
//                 <p className="text-sm text-slate-600">Current session</p>
//               </div>
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
import { 
  Home, 
  Building2, 
  Mail, 
  Star, 
  Wrench, 
  Image, 
  Plus, 
  Eye,
  ArrowUpRight,
  Users,
  Award,
  Clock,
  TrendingUp
} from 'lucide-react'

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
  // FETCH DASHBOARD DATA (LIGHTWEIGHT)
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // ✅ Single API call – returns counts + recent items
        const response = await api.get('/dashboard/stats')
        const { counts, recentContacts, recentProjects } = response.data.data

        setStats({
          projects: counts.projects,
          contacts: counts.contacts,
          testimonials: counts.testimonials,
          services: counts.services,
          gallery: counts.gallery,
        })

        setRecentContacts(recentContacts || [])
        setRecentProjects(recentProjects || [])
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
      available: 'bg-emerald-100 text-emerald-700',
      sold: 'bg-rose-100 text-rose-700',
      ongoing: 'bg-amber-100 text-amber-700',
      completed: 'bg-blue-100 text-blue-700',
      pending: 'bg-amber-100 text-amber-700',
      read: 'bg-indigo-100 text-indigo-700',
      replied: 'bg-emerald-100 text-emerald-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
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
      <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <AdminSidebar />
        <div className="flex-1 p-8 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 min-h-screen rounded-l-[35px]">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium">Loading dashboard...</p>
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
      <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <AdminSidebar />
        <div className="flex-1 p-8 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 min-h-screen rounded-l-[35px]">
          {children}
        </div>
      </div>
    )
  }

  // ============================================
  // MAIN DASHBOARD VIEW
  // ============================================
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <AdminSidebar />
      
      <div className="flex-1 p-8 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/70 min-h-screen rounded-l-[35px] shadow-[inset_0_0_80px_rgba(212,175,55,0.05)]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-amber-200/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
            <p className="text-slate-600 text-lg mt-1 flex items-center gap-2">
              Welcome back, {user?.name}!
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>View Website</span>
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Projects */}
          <div className="group bg-gradient-to-br from-blue-50 to-indigo-50/80 backdrop-blur-xl rounded-3xl p-7 border border-blue-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Projects</p>
                  <p className="text-4xl font-black text-slate-900 mt-1">{stats.projects}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/projects" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
                  Manage Projects →
                </Link>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="group bg-gradient-to-br from-emerald-50 to-green-50/80 backdrop-blur-xl rounded-3xl p-7 border border-emerald-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Contacts</p>
                  <p className="text-4xl font-black text-slate-900 mt-1">{stats.contacts}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/contacts" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
                  View Messages →
                </Link>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="group bg-gradient-to-br from-amber-50 to-orange-50/80 backdrop-blur-xl rounded-3xl p-7 border border-amber-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Testimonials</p>
                  <p className="text-4xl font-black text-slate-900 mt-1">{stats.testimonials}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/testimonials" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
                  Manage Testimonials →
                </Link>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="group bg-gradient-to-br from-violet-50 to-purple-50/80 backdrop-blur-xl rounded-3xl p-7 border border-violet-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Services</p>
                  <p className="text-4xl font-black text-slate-900 mt-1">{stats.services}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/services" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
                  Manage Services →
                </Link>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="group bg-gradient-to-br from-rose-50 to-pink-50/80 backdrop-blur-xl rounded-3xl p-7 border border-rose-200/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 uppercase tracking-wider text-xs font-semibold">Gallery</p>
                  <p className="text-4xl font-black text-slate-900 mt-1">{stats.gallery}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Image className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/gallery" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium group-hover:gap-2 transition-all">
                  Manage Gallery →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
          <h2 className="text-lg font-bold text-slate-900 mb-6 relative">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
            {[
              { icon: <Plus className="h-6 w-6" />, label: 'Add Project', to: '/admin/projects', bg: 'from-blue-600 to-indigo-600' },
              { icon: <Mail className="h-6 w-6" />, label: 'View Contacts', to: '/admin/contacts', bg: 'from-emerald-500 to-green-600' },
              { icon: <Star className="h-6 w-6" />, label: 'Add Testimonial', to: '/admin/testimonials', bg: 'from-amber-500 to-orange-500' },
              { icon: <Wrench className="h-6 w-6" />, label: 'Add Service', to: '/admin/services', bg: 'from-violet-600 to-purple-600' },
              { icon: <Image className="h-6 w-6" />, label: 'Add Image', to: '/admin/gallery', bg: 'from-rose-500 to-pink-500' },
            ].map((action, idx) => (
              <Link
                key={idx}
                to={action.to}
                className={`group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-gradient-to-br ${action.bg} text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <span className="text-xs font-semibold">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Contacts */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
            <div className="relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900">Recent Contacts</h2>
                <Link to="/admin/contacts" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 group">
                  View All
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
              {recentContacts.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No contacts yet</p>
              ) : (
                <div className="space-y-3">
                  {recentContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100 transition">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{contact.full_name}</p>
                        <p className="text-sm text-slate-500 truncate">{contact.subject}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
            <div className="relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900">Recent Projects</h2>
                <Link to="/admin/projects" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 group">
                  View All
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
              {recentProjects.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No projects yet</p>
              ) : (
                <div className="space-y-3">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100 transition">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{project.name}</p>
                        <p className="text-sm text-slate-500 truncate">{project.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(project.status)}`}>
                        {getProjectStatusLabel(project.status)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="mt-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/30 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
          <h2 className="text-lg font-bold text-slate-900 mb-6 relative">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-blue-50/80 border border-indigo-100/40 shadow-sm">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Admin User</p>
                <p className="font-semibold text-slate-900">{user?.name}</p>
                <p className="text-sm text-slate-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 border border-emerald-100/40 shadow-sm">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Content</p>
                <p className="font-semibold text-slate-900 text-xl">
                  {stats.projects + stats.services + stats.testimonials + stats.contacts + stats.gallery}
                </p>
                <p className="text-sm text-slate-600">Across all categories</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 border border-amber-100/40 shadow-sm">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Last Login</p>
                <p className="font-semibold text-slate-900">{new Date().toLocaleString()}</p>
                <p className="text-sm text-slate-600">Current session</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard