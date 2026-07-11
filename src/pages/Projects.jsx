// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import api from '../services/api'

// const Projects = () => {
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState({
//     status: '',
//     category: ''
//   })
//   const [search, setSearch] = useState('')

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const params = new URLSearchParams()
//         if (filters.status) params.append('status', filters.status)
//         if (filters.category) params.append('category', filters.category)
        
//         const response = await api.get(`/projects?${params.toString()}`)
//         setProjects(response.data.data || [])
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching projects:', error)
//         setLoading(false)
//       }
//     }
//     fetchProjects()
//   }, [filters])

//   const filteredProjects = projects.filter(project =>
//     project.name?.toLowerCase().includes(search.toLowerCase()) ||
//     project.location?.toLowerCase().includes(search.toLowerCase())
//   )

//   const statusColors = {
//     available: 'bg-green-100 text-green-800',
//     sold: 'bg-red-100 text-red-800',
//     ongoing: 'bg-yellow-100 text-yellow-800',
//     completed: 'bg-blue-100 text-blue-800'
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-xl">Loading...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-4xl font-bold text-center mb-4">Our Projects</h1>
//       <p className="text-center text-gray-600 mb-12">Discover our portfolio of premium properties</p>

//       {/* Search and Filters */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row gap-4">
//           <input
//             type="text"
//             placeholder="Search by name or location..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <select
//             value={filters.status}
//             onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Status</option>
//             <option value="available">Available</option>
//             <option value="sold">Sold</option>
//             <option value="ongoing">Ongoing</option>
//             <option value="completed">Completed</option>
//           </select>
//           <select
//             value={filters.category}
//             onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Categories</option>
//             <option value="residential">Residential</option>
//             <option value="commercial">Commercial</option>
//             <option value="luxury">Luxury</option>
//           </select>
//         </div>
//       </div>

//       {filteredProjects.length === 0 ? (
//         <div className="text-center text-gray-500 py-12">No projects found</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project) => (
//             <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
//               {/* Image Section */}
//               <div className="h-56 bg-gray-200 relative">
//                 <img
//                   src={project.image || 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'}
//                   alt={project.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null
//                     e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'
//                   }}
//                 />
//                 <div className="absolute top-4 right-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status]}`}>
//                     {project.status}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-xl font-semibold">{project.name}</h3>
//                 </div>
//                 <p className="text-gray-600 text-sm mb-2">{project.location}</p>
//                 <p className="text-gray-700 text-sm mb-4">{project.description?.substring(0, 100)}...</p>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-blue-600 font-bold text-xl">₹{project.price?.toLocaleString()}</p>
//                     <div className="flex gap-2 text-sm text-gray-500">
//                       <span>{project.bedrooms} BHK</span>
//                       <span>•</span>
//                       <span>{project.area}</span>
//                     </div>
//                   </div>
//                   <Link
//                     to={`/projects/${project.id}`}
//                     className="text-blue-600 hover:text-blue-800 font-medium"
//                   >
//                     View Details →
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Projects









import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { Search, ChevronDown, MapPin, Bed, Bath, Maximize, Sparkles } from 'lucide-react'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    category: ''
  })
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)
        if (filters.category) params.append('category', filters.category)
        
        const response = await api.get(`/projects?${params.toString()}`)
        setProjects(response.data.data || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }
    fetchProjects()
  }, [filters])

  const filteredProjects = projects.filter(project =>
    project.name?.toLowerCase().includes(search.toLowerCase()) ||
    project.location?.toLowerCase().includes(search.toLowerCase())
  )

  // Status badge styles (luxury: black + gold)
  const statusBadgeClass = "bg-black/80 text-white border border-[#C9A96E] px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"

  // Gold accent color
  const gold = '#C9A96E'

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#C9A96E] mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading premium properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12 md:py-20">
      {/* Optional: add a style block for fonts if not already imported */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header - Luxury Style */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-black/5 text-[#111111] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#ECE8DF]">
            Our Portfolio
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-playfair font-bold text-[#111111] leading-tight">
            Exclusive Properties
          </h1>
          <p className="mt-4 text-lg text-[#6E6E73] max-w-2xl mx-auto font-inter font-light tracking-wide">
            Discover a curated selection of exceptional residences designed for extraordinary living.
          </p>
          <div className="mt-4 w-16 h-0.5 bg-[#C9A96E] mx-auto rounded-full"></div>
        </div>

        {/* Glassmorphism Search Bar */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 md:p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6E6E73]" />
              <input
                type="text"
                placeholder="Search by location or property name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/60 backdrop-blur-sm border border-[#ECE8DF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all duration-300 font-inter text-[#111111] placeholder-[#6E6E73]"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative min-w-[180px]">
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full appearance-none pl-5 pr-12 py-4 bg-white/60 backdrop-blur-sm border border-[#ECE8DF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all duration-300 font-inter text-[#111111] cursor-pointer"
                >
                  <option value="">All Status</option>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6E6E73] pointer-events-none" />
              </div>
              <div className="relative min-w-[180px]">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full appearance-none pl-5 pr-12 py-4 bg-white/60 backdrop-blur-sm border border-[#ECE8DF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all duration-300 font-inter text-[#111111] cursor-pointer"
                >
                  <option value="">All Categories</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="luxury">Luxury</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6E6E73] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {filteredProjects.length > 0 && (
          <div className="mb-8 text-sm text-[#6E6E73] flex justify-between items-center font-inter">
            <span>Showing <strong className="text-[#111111]">{filteredProjects.length}</strong> properties</span>
            <span className="hidden sm:inline-block">Sort by: <span className="font-medium text-[#111111]">Latest</span></span>
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#ECE8DF] shadow-xl">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-2xl font-playfair font-semibold text-[#111111] mb-2">No properties found</h3>
            <p className="text-[#6E6E73] font-inter">Try adjusting your search or filters to find your dream home.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out hover:-translate-y-3 overflow-hidden border border-[#ECE8DF]"
              >
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden bg-[#F5F2ED]">
                  <img
                    src={project.image || 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Status Badge - Luxury Style */}
                  <div className="absolute top-5 left-5">
                    <span className={statusBadgeClass}>
                      {project.status === 'available' ? 'Available' :
                       project.status === 'sold' ? 'Sold' :
                       project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                    </span>
                  </div>

                  {/* Floating "View" button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link
                      to={`/projects/${project.id}`}
                      className="bg-black/90 backdrop-blur-md text-white font-inter font-medium px-8 py-3 rounded-full border border-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-colors duration-300"
                    >
                      Explore Property
                    </Link>
                  </div>

                  {/* Price Tag - Starting From */}
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                    <div>
                      <p className="text-white/70 text-xs font-inter tracking-wider uppercase">Starting From</p>
                      <p className="text-white text-3xl font-black tracking-tight">
                        ₹{project.price?.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#C9A96E]/30">
                      <span className="text-white text-sm font-semibold">{project.bedrooms} BHK</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-playfair font-bold text-[#111111] mb-1 line-clamp-1">{project.name}</h3>
                  <div className="flex items-center text-[#6E6E73] text-sm font-inter mb-4">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <p className="text-[#6E6E73] text-sm font-inter mb-6 line-clamp-2">
                    {project.description?.substring(0, 100)}...
                  </p>

                  {/* Property Details - Mini Glass Cards */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="bg-[#F5F2ED]/50 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-center gap-1.5 border border-[#ECE8DF]">
                      <Bed className="h-4 w-4 text-[#111111]" />
                      <span className="text-xs font-medium text-[#111111]">{project.bedrooms} Beds</span>
                    </div>
                    <div className="bg-[#F5F2ED]/50 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-center gap-1.5 border border-[#ECE8DF]">
                      <Bath className="h-4 w-4 text-[#111111]" />
                      <span className="text-xs font-medium text-[#111111]">{project.bathrooms} Baths</span>
                    </div>
                    <div className="bg-[#F5F2ED]/50 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-center gap-1.5 border border-[#ECE8DF]">
                      <Maximize className="h-4 w-4 text-[#111111]" />
                      <span className="text-xs font-medium text-[#111111]">{project.area}</span>
                    </div>
                  </div>

                  {/* View Details Button - Black with Gold hover */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C9A96E] text-white hover:text-black font-inter font-medium py-3 px-6 rounded-full transition-all duration-300 group-hover:shadow-lg"
                  >
                    View Details
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects