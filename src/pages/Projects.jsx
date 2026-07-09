import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

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

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-red-100 text-red-800',
    ongoing: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Our Projects</h1>
      <p className="text-center text-gray-600 mb-12">Discover our portfolio of premium properties</p>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No projects found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image Section */}
              <div className="h-56 bg-gray-200 relative">
                <img
                  src={project.image || 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">{project.location}</p>
                <p className="text-gray-700 text-sm mb-4">{project.description?.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-blue-600 font-bold text-xl">₹{project.price?.toLocaleString()}</p>
                    <div className="flex gap-2 text-sm text-gray-500">
                      <span>{project.bedrooms} BHK</span>
                      <span>•</span>
                      <span>{project.area}</span>
                    </div>
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects



