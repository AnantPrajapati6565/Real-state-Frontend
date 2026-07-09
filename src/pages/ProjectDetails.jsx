import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`)
        setProject(response.data.data)
        setLoading(false)
      } catch (error) {
        setError('Project not found')
        setLoading(false)
      }
    }
    fetchProject()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
        <Link to="/projects" className="text-blue-600 hover:text-blue-800 font-semibold">
          ← Back to Projects
        </Link>
      </div>
    )
  }

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-red-100 text-red-800',
    ongoing: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/projects" className="text-blue-600 hover:text-blue-800 font-semibold mb-8 inline-block">
        ← Back to Projects
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-96 bg-gray-200 flex items-center justify-center text-gray-400 text-4xl">
          🏗️ {project.name}
        </div>
        
        <div className="p-8">
          <div className="flex flex-wrap justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <p className="text-gray-600">{project.location}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[project.status]}`}>
              {project.status?.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-bold text-blue-600">₹{project.price?.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Category</p>
              <p className="text-lg font-semibold capitalize">{project.category}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Area</p>
              <p className="text-lg font-semibold">{project.area || 'N/A'}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{project.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features?.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Bedrooms</p>
              <p className="text-lg font-semibold">{project.bedrooms || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Bathrooms</p>
              <p className="text-lg font-semibold">{project.bathrooms || 'N/A'}</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Inquire About This Property
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails