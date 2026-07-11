

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
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
      {/* Header */}
      <div className="mb-8 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">⭐ Manage Testimonials</h2>
          <p className="text-gray-500 mt-1">Total Testimonials : {testimonials.length}</p>
        </div>
        <button
          onClick={() => {
            setEditingTestimonial(null)
            setShowForm(true)
          }}
          className="mt-4 sm:mt-0 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-xl">➕</span>
          Add Testimonial
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-5 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterApproved('all')}
            className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
              filterApproved === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            All ({testimonials.length})
          </button>
          <button
            onClick={() => setFilterApproved('approved')}
            className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
              filterApproved === 'approved'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Approved ({testimonials.filter(t => t.is_approved).length})
          </button>
          <button
            onClick={() => setFilterApproved('pending')}
            className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
              filterApproved === 'pending'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 py-20 text-center">
          <div className="text-7xl mb-5">⭐</div>
          <h2 className="text-2xl font-bold text-gray-800">No Testimonials Found</h2>
          <p className="text-gray-500 mt-2">Add your first customer review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="p-6">
                {/* Quote Icon */}
                <div className="text-5xl text-blue-100 mb-3">❝</div>

                {/* Rating Stars */}
                <div className="flex text-yellow-400 text-xl mb-4">
                  {'⭐'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>

                {/* Status Badge */}
                <div className="flex justify-end -mt-12">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${
                      testimonial.is_approved
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {testimonial.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </div>

                {/* Content */}
                <p className="text-gray-600 italic leading-7 mb-5 line-clamp-4">
                  "{testimonial.content}"
                </p>

                {/* Client Info */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-lg text-slate-800">{testimonial.name}</h4>
                  <p className="text-gray-500">📍 {testimonial.location}</p>
                  <span className="inline-block mt-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {testimonial.project}
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {!testimonial.is_approved && (
                    <button
                      onClick={() => handleApprove(testimonial.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2 transition-all font-medium text-sm"
                    >
                      ✔ Approve
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingTestimonial(testimonial)
                      setShowForm(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 transition-all font-medium text-sm"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-2 transition-all font-medium text-sm"
                  >
                    🗑 Delete
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

export default AdminTestimonials

