


// // import { useEffect, useState } from 'react'
// // import { toast } from 'react-toastify'
// // import api from '../../services/api'
// // import ProjectForm from './forms/ProjectForm'

// // const AdminProjects = () => {
// //   const [projects, setProjects] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [showForm, setShowForm] = useState(false)
// //   const [editingProject, setEditingProject] = useState(null)
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [filterStatus, setFilterStatus] = useState('')

// //   useEffect(() => {
// //     fetchProjects()
// //   }, [])

// //   const fetchProjects = async () => {
// //     try {
// //       setLoading(true)
// //       const response = await api.get('/projects')
// //       setProjects(response.data.data || [])
// //       setLoading(false)
// //     } catch (error) {
// //       console.error('Error fetching projects:', error)
// //       toast.error('Failed to load projects')
// //       setLoading(false)
// //     }
// //   }

// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Are you sure you want to delete this project?')) return
    
// //     try {
// //       await api.delete(`/projects/${id}`)
// //       toast.success('✅ Project deleted successfully!')
// //       fetchProjects()
// //     } catch (error) {
// //       toast.error('❌ Failed to delete project')
// //     }
// //   }

// //   const handleEdit = (project) => {
// //     setEditingProject(project)
// //     setShowForm(true)
// //   }

// //   const handleFormClose = () => {
// //     setShowForm(false)
// //     setEditingProject(null)
// //     fetchProjects()
// //   }

// //   // Filter and search projects
// //   const filteredProjects = projects.filter(project => {
// //     const matchesSearch = project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                           project.location?.toLowerCase().includes(searchTerm.toLowerCase())
// //     const matchesStatus = filterStatus ? project.status === filterStatus : true
// //     return matchesSearch && matchesStatus
// //   })

// //   const getStatusColor = (status) => {
// //     const colors = {
// //       available: 'bg-emerald-100 text-emerald-700',
// //       sold: 'bg-rose-100 text-rose-700',
// //       ongoing: 'bg-amber-100 text-amber-700',
// //       completed: 'bg-blue-100 text-blue-700'
// //     }
// //     return colors[status] || 'bg-gray-100 text-gray-700'
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading projects...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-white to-slate-100">
// //       {/* Header Section */}
// //       <div className="flex flex-col lg:flex-row justify-between items-center bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8">
// //         <div>
// //           <h2 className="text-4xl font-black text-slate-900">Manage Projects</h2>
// //           <p className="text-slate-500 mt-1">Total {projects.length} Properties</p>
// //         </div>
// //         <button
// //           onClick={() => {
// //             setEditingProject(null)
// //             setShowForm(true)
// //           }}
// //           className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
// //         >
// //           <span className="text-xl">➕</span>
// //           Add Project
// //         </button>
// //       </div>

// //       {/* Search and Filter */}
// //       <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 mb-8">
// //         <div className="flex flex-col sm:flex-row gap-4">
// //           <div className="flex-1">
// //             <input
// //               type="text"
// //               placeholder="🔍 Search by name or location..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all outline-none"
// //             />
// //           </div>
// //           <div>
// //             <select
// //               value={filterStatus}
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //               className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all outline-none bg-white"
// //             >
// //               <option value="">All Status</option>
// //               <option value="available">Available</option>
// //               <option value="sold">Sold</option>
// //               <option value="ongoing">Ongoing</option>
// //               <option value="completed">Completed</option>
// //             </select>
// //           </div>
// //           <button
// //             onClick={() => {
// //               setSearchTerm('')
// //               setFilterStatus('')
// //             }}
// //             className="px-5 py-3 rounded-2xl text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 transition"
// //           >
// //             Clear Filters
// //           </button>
// //         </div>
// //       </div>

// //       {/* Project Form Modal */}
// //       {showForm && (
// //         <ProjectForm
// //           project={editingProject}
// //           onClose={handleFormClose}
// //         />
// //       )}

// //       {/* Projects Table */}
// //       <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
// //         {filteredProjects.length === 0 ? (
// //           <div className="text-center py-16">
// //             <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-5xl mx-auto mb-4">
// //               🏢
// //             </div>
// //             <p className="text-slate-500 text-lg">No projects found</p>
// //             <p className="text-slate-400 text-sm">Add your first project to get started</p>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-slate-200">
// //               <thead className="bg-slate-900">
// //                 <tr>
// //                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">
// //                     Project
// //                   </th>
// //                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">
// //                     Image
// //                   </th>
// //                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">
// //                     Location
// //                   </th>
// //                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">
// //                     Price
// //                   </th>
// //                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">
// //                     Status
// //                   </th>
// //                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">
// //                     Category
// //                   </th>
// //                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-slate-200">
// //                 {filteredProjects.map((project) => (
// //                   <tr key={project.id} className="hover:bg-indigo-50 transition-all duration-300">
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center">
// //                         <div className="ml-0">
// //                           <div className="text-sm font-medium text-slate-900">
// //                             {project.name}
// //                           </div>
// //                           <div className="text-sm text-slate-500">
// //                             {project.bedrooms || 'N/A'} BHK
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <img
// //                         src={project.image || 'https://via.placeholder.com/100x60/cccccc/666666?text=No+Image'}
// //                         alt={project.name}
// //                         className="w-24 h-16 rounded-xl object-cover shadow-md border border-slate-200"
// //                         onError={(e) => {
// //                           e.target.onerror = null
// //                           e.target.src = 'https://via.placeholder.com/100x60/cccccc/666666?text=No+Image'
// //                         }}
// //                       />
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-slate-500">
// //                       {project.location}
// //                     </td>
// //                     <td className="px-6 py-4 text-sm font-semibold text-slate-900">
// //                       ₹{project.price?.toLocaleString()}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${getStatusColor(project.status)}`}>
// //                         {project.status}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-slate-500 capitalize">
// //                       {project.category}
// //                     </td>
// //                     <td className="px-6 py-4 text-sm font-medium">
// //                       <div className="flex gap-2">
// //                         <button
// //                           onClick={() => handleEdit(project)}
// //                           className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white transition"
// //                         >
// //                           ✏️ Edit
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(project.id)}
// //                           className="px-4 py-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition"
// //                         >
// //                           🗑 Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default AdminProjects



// import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import api from '../../services/api'
// import ProjectForm from './forms/ProjectForm'

// const AdminProjects = () => {
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showForm, setShowForm] = useState(false)
//   const [editingProject, setEditingProject] = useState(null)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filterStatus, setFilterStatus] = useState('')

//   useEffect(() => {
//     fetchProjects()
//   }, [])

//   const fetchProjects = async () => {
//     try {
//       setLoading(true)
//       const response = await api.get('/projects')
//       setProjects(response.data.data || [])
//       setLoading(false)
//     } catch (error) {
//       console.error('Error fetching projects:', error)
//       toast.error('Failed to load projects')
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this project?')) return
    
//     try {
//       await api.delete(`/projects/${id}`)
//       toast.success('✅ Project deleted successfully!')
//       fetchProjects()
//     } catch (error) {
//       toast.error('❌ Failed to delete project')
//     }
//   }

//   const handleEdit = (project) => {
//     setEditingProject(project)
//     setShowForm(true)
//   }

//   const handleFormClose = () => {
//     setShowForm(false)
//     setEditingProject(null)
//     fetchProjects()
//   }

//   const filteredProjects = projects.filter(project => {
//     const matchesSearch = project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           project.location?.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = filterStatus ? project.status === filterStatus : true
//     return matchesSearch && matchesStatus
//   })

//   const getStatusColor = (status) => {
//     const colors = {
//       available: 'bg-emerald-100 text-emerald-700',
//       sold: 'bg-rose-100 text-rose-700',
//       ongoing: 'bg-amber-100 text-amber-700',
//       completed: 'bg-blue-100 text-blue-700'
//     }
//     return colors[status] || 'bg-gray-100 text-gray-700'
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading projects...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-white to-slate-100">
//       {/* Header Section */}
//       <div className="flex flex-col lg:flex-row justify-between items-center bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8">
//         <div>
//           <h2 className="text-4xl font-black text-slate-900">Manage Projects</h2>
//           <p className="text-slate-500 mt-1">Total {projects.length} Properties</p>
//         </div>
//         <button
//           onClick={() => {
//             setEditingProject(null)
//             setShowForm(true)
//           }}
//           className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
//         >
//           <span className="text-xl">➕</span>
//           Add Project
//         </button>
//       </div>

//       {/* Search and Filter */}
//       <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 mb-8">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <input
//               type="text"
//               placeholder="🔍 Search by name or location..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all outline-none"
//             />
//           </div>
//           <div>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all outline-none bg-white"
//             >
//               <option value="">All Status</option>
//               <option value="available">Available</option>
//               <option value="sold">Sold</option>
//               <option value="ongoing">Ongoing</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//           <button
//             onClick={() => {
//               setSearchTerm('')
//               setFilterStatus('')
//             }}
//             className="px-5 py-3 rounded-2xl text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 transition"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {showForm && (
//         <ProjectForm
//           project={editingProject}
//           onClose={handleFormClose}
//         />
//       )}

//       {/* Projects Table */}
//       <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
//         {filteredProjects.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-5xl mx-auto mb-4">
//               🏢
//             </div>
//             <p className="text-slate-500 text-lg">No projects found</p>
//             <p className="text-slate-400 text-sm">Add your first project to get started</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-200">
//               <thead className="bg-slate-900">
//                 <tr>
//                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Project</th>
//                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Image</th>
//                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Location</th>
//                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Price</th>
//                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Status</th>
//                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Category</th>
//                   <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-200">
//                 {filteredProjects.map((project) => (
//                   <tr key={project.id} className="hover:bg-indigo-50 transition-all duration-300">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="ml-0">
//                           <div className="text-sm font-medium text-slate-900">{project.name}</div>
//                           <div className="text-sm text-slate-500">{project.bedrooms || 'N/A'} BHK</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <img
//                         src={project.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="60"%3E%3Crect width="100" height="60" fill="%23cccccc"/%3E%3Ctext x="50" y="35" font-family="Arial" font-size="12" fill="%23666666" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E'}
//                         alt={project.name}
//                         className="w-24 h-16 rounded-xl object-cover shadow-md border border-slate-200"
//                         onError={(e) => {
//                           e.target.onerror = null
//                           e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="60"%3E%3Crect width="100" height="60" fill="%23cccccc"/%3E%3Ctext x="50" y="35" font-family="Arial" font-size="12" fill="%23666666" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E'
//                         }}
//                       />
//                     </td>
//                     <td className="px-6 py-4 text-sm text-slate-500">{project.location}</td>
//                     <td className="px-6 py-4 text-sm font-semibold text-slate-900">₹{project.price?.toLocaleString()}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${getStatusColor(project.status)}`}>
//                         {project.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-slate-500 capitalize">{project.category}</td>
//                     <td className="px-6 py-4 text-sm font-medium">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(project)}
//                           className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white transition"
//                         >
//                           ✏️ Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(project.id)}
//                           className="px-4 py-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition"
//                         >
//                           🗑 Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AdminProjects








import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import ProjectForm from './forms/ProjectForm'

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="60"%3E%3Crect width="100" height="60" fill="%23cccccc"/%3E%3Ctext x="50" y="35" font-family="Arial" font-size="12" fill="%23666666" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

const AdminProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Helper to build image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const rootURL = baseURL.replace(/\/api$/, '');
    const cleanPath = imagePath.startsWith('/') ? imagePath : '/' + imagePath;
    return `${rootURL}${cleanPath}`;
  };

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await api.get('/projects')
      setProjects(response.data.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast.error('Failed to load projects')
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    try {
      await api.delete(`/projects/${id}`)
      toast.success('✅ Project deleted successfully!')
      fetchProjects()
    } catch (error) {
      toast.error('❌ Failed to delete project')
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProject(null)
    fetchProjects()
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.location?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus ? project.status === filterStatus : true
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-emerald-100 text-emerald-700',
      sold: 'bg-rose-100 text-rose-700',
      ongoing: 'bg-amber-100 text-amber-700',
      completed: 'bg-blue-100 text-blue-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-white to-slate-100">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900">Manage Projects</h2>
          <p className="text-slate-500 mt-1">Total {projects.length} Properties</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="text-xl">➕</span>
          Add Project
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all outline-none bg-white"
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            onClick={() => {
              setSearchTerm('')
              setFilterStatus('')
            }}
            className="px-5 py-3 rounded-2xl text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
        />
      )}

      {/* Projects Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-5xl mx-auto mb-4">🏢</div>
            <p className="text-slate-500 text-lg">No projects found</p>
            <p className="text-slate-400 text-sm">Add your first project to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Project</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Image</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Location</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Price</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Status</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Category</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-indigo-50 transition-all duration-300">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-slate-900">{project.name}</div>
                          <div className="text-sm text-slate-500">{project.bedrooms || 'N/A'} BHK</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={getImageUrl(project.image) || PLACEHOLDER_IMAGE}
                        alt={project.name}
                        className="w-24 h-16 rounded-xl object-cover shadow-md border border-slate-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{project.location}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">₹{project.price?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 capitalize">{project.category}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-4 py-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProjects