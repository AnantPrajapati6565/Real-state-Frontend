import { useEffect, useState } from 'react'
import api from '../services/api'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials')
        setTestimonials(response.data.data || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        setLoading(false)
      }
    }
    fetchTestimonials()
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
      <h1 className="text-4xl font-bold text-center mb-4">Testimonials</h1>
      <p className="text-center text-gray-600 mb-12">What our clients say about us</p>

      {testimonials.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <div className="text-6xl mb-4">⭐</div>
          <p className="text-xl">No testimonials available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-yellow-400 text-xl mb-3">
                {'⭐'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-4 italic text-lg">"{testimonial.content}"</p>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
                <p className="text-blue-600 text-sm font-medium">{testimonial.project}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Testimonials




