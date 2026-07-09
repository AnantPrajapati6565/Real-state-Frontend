


import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import ServiceForm from './forms/ServiceForm'

const AdminServices = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await api.get('/services/admin')
      setServices(response.data.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Failed to load services')
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return
    
    try {
      await api.delete(`/services/${id}`)
      toast.success('✅ Service deleted successfully!')
      fetchServices()
    } catch (error) {
      toast.error('❌ Failed to delete service')
    }
  }

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await api.put(`/services/${id}`, { isActive: !currentStatus })
      toast.success(`✅ Service ${!currentStatus ? 'activated' : 'deactivated'} successfully!`)
      fetchServices()
    } catch (error) {
      toast.error('❌ Failed to update service status')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Services</h2>
          <p className="text-gray-600 text-sm">Total: {services.length} services</p>
        </div>
        <button
          onClick={() => {
            setEditingService(null)
            setShowForm(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">➕</span>
          Add Service
        </button>
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <ServiceForm
          service={editingService}
          onClose={() => {
            setShowForm(false)
            setEditingService(null)
            fetchServices()
          }}
        />
      )}

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">🔧</div>
          <p className="text-gray-500 text-lg">No services added yet</p>
          <p className="text-gray-400 text-sm">Add your first service to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
              {/* Service Image */}
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={service.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=Service'}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Service'
                  }}
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleToggleActive(service.id, service.is_active)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {service.is_active ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  {service.icon && (
                    <span className="text-3xl">{service.icon}</span>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                
                {service.features && service.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-xs text-gray-500">+{service.features.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3 pt-3 border-t">
                  <button
                    onClick={() => {
                      setEditingService(service)
                      setShowForm(true)
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminServices

