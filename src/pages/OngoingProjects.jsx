
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Ongoing Projects</h1>
      <p className="text-center text-gray-600 mb-12">Current development projects in progress</p>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <div className="text-6xl mb-4">🏗️</div>
          <p className="text-xl">No ongoing projects at the moment</p>
          <p className="text-gray-400 mt-2">Check back soon for updates</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 relative">
                🏗️ {project.name}
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                  In Progress
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{project.location}</p>
                <p className="text-gray-700 mb-4">{project.description?.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">₹{project.price?.toLocaleString()}</span>
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

export default OngoingProjects