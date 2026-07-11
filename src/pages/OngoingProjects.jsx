



import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const OngoingProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects?status=ongoing')
        setProjects(response.data.data || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FAF8F4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading ongoing projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] py-16 md:py-20">
      {/* Font imports (optional – add to index.html for performance) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-14">
          <span className="inline-block px-5 py-2 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-widest text-sm font-inter">
            Under Construction
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-playfair font-bold text-[#111111]">
            Ongoing Projects
          </h1>
          <p className="mt-3 text-[#6E6E73] font-inter max-w-2xl mx-auto">
            Discover our latest developments currently under construction.
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#ECE7DD] shadow-xl">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-2xl font-playfair font-semibold text-[#111111] mb-2">No ongoing projects</h3>
            <p className="text-[#6E6E73] font-inter">Check back soon for updates on our latest developments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#ECE7DD] shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden bg-[#F5F2ED]">
                  <img
                    src={project.image || 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'
                    }}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Status Badge */}
                  <span className="absolute top-5 right-5 bg-[#D4AF37] text-black px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-inter">
                    Ongoing
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-[#111111] mb-1 line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-[#6E6E73] text-sm font-inter mb-3">{project.location}</p>
                  <p className="text-[#6E6E73] text-sm font-inter mb-4 line-clamp-2">
                    {project.description?.substring(0, 100)}...
                  </p>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#111111] font-playfair">
                      ₹{project.price?.toLocaleString()}
                    </span>
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#111111] text-white text-sm font-inter font-medium hover:bg-[#D4AF37] hover:text-black transition duration-300"
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
    </div>
  )
}

export default OngoingProjects