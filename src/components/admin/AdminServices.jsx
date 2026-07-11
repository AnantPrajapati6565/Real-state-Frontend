

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
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
      {/* Header Card */}
      <div className="mb-8 bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Manage Services</h2>
            <p className="text-slate-500 text-sm">Total: {services.length} services</p>
          </div>
          <button
            onClick={() => {
              setEditingService(null)
              setShowForm(true)
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
          >
            <span className="text-xl">➕</span>
            Add Service
          </button>
        </div>
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
        <div className="text-center py-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100">
          <div className="text-6xl mb-4">🔧</div>
          <p className="text-gray-500 text-lg">No services added yet</p>
          <p className="text-gray-400 text-sm">Add your first service to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="group bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              {/* Service Image */}
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img
                  src={service.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=Service'}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Service'
                  }}
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleToggleActive(service.id, service.is_active)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${
                      service.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {service.is_active ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-b from-white to-slate-50">
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
                        <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-xs text-gray-500">+{service.features.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setEditingService(service)
                      setShowForm(true)
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-all"
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