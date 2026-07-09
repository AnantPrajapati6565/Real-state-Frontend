import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import TestimonialForm from './forms/TestimonialForm'

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [filterApproved, setFilterApproved] = useState('all')

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const response = await api.get('/testimonials/admin')
      setTestimonials(response.data.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      toast.error('Failed to load testimonials')
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return
    
    try {
      await api.delete(`/testimonials/${id}`)
      toast.success('✅ Testimonial deleted successfully!')
      fetchTestimonials()
    } catch (error) {
      toast.error('❌ Failed to delete testimonial')
    }
  }

  const handleApprove = async (id) => {
    try {
      await api.put(`/testimonials/${id}/approve`)
      toast.success('✅ Testimonial approved successfully!')
      fetchTestimonials()
    } catch (error) {
      toast.error('❌ Failed to approve testimonial')
    }
  }

  const filteredTestimonials = testimonials.filter(t => {
    if (filterApproved === 'all') return true
    if (filterApproved === 'approved') return t.is_approved
    if (filterApproved === 'pending') return !t.is_approved
    return true
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Testimonials</h2>
          <p className="text-gray-600 text-sm">Total: {testimonials.length} testimonials</p>
        </div>
        <button
          onClick={() => {
            setEditingTestimonial(null)
            setShowForm(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">➕</span>
          Add Testimonial
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterApproved('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterApproved === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({testimonials.length})
          </button>
          <button
            onClick={() => setFilterApproved('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterApproved === 'approved' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved ({testimonials.filter(t => t.is_approved).length})
          </button>
          <button
            onClick={() => setFilterApproved('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterApproved === 'pending' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({testimonials.filter(t => !t.is_approved).length})
          </button>
        </div>
      </div>

      {/* Testimonial Form Modal */}
      {showForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onClose={() => {
            setShowForm(false)
            setEditingTestimonial(null)
            fetchTestimonials()
          }}
        />
      )}

      {/* Testimonials Grid */}
      {filteredTestimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">⭐</div>
          <p className="text-gray-500 text-lg">No testimonials found</p>
          <p className="text-gray-400 text-sm">Add your first testimonial to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="text-yellow-400 text-lg">
                  {'⭐'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  testimonial.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {testimonial.is_approved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">"{testimonial.content}"</p>
              <div className="border-t pt-3">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-sm text-blue-600">{testimonial.project}</p>
              </div>
              <div className="flex gap-3 mt-4 pt-3 border-t">
                {!testimonial.is_approved && (
                  <button
                    onClick={() => handleApprove(testimonial.id)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditingTestimonial(testimonial)
                    setShowForm(true)
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminTestimonials




