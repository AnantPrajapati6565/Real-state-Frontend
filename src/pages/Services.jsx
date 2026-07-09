



import { useEffect, useState } from 'react'
import api from '../services/api'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services')
        setServices(response.data.data || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching services:', error)
        setLoading(false)
      }
    }
    fetchServices()
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
      <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Comprehensive real estate solutions tailored to your needs
      </p>

      {services.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No services available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image instead of icon */}
              <div className="h-48 bg-gray-200">
                <img
                  src={service.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=Service'}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Service'
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Services