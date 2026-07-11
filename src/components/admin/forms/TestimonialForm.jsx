// import { useState, useEffect } from 'react'
// import { toast } from 'react-toastify'
// import api from '../../../services/api'

// const TestimonialForm = ({ testimonial, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     project: '',
//     content: '',
//     rating: 5,
//     isApproved: false
//   })
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (testimonial) {
//       setFormData({
//         name: testimonial.name || '',
//         location: testimonial.location || '',
//         project: testimonial.project || '',
//         content: testimonial.content || '',
//         rating: testimonial.rating || 5,
//         isApproved: testimonial.is_approved || false
//       })
//     }
//   }, [testimonial])

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       if (testimonial) {
//         await api.put(`/testimonials/${testimonial.id}`, formData)
//         toast.success('✅ Testimonial updated successfully!')
//       } else {
//         await api.post('/testimonials', formData)
//         toast.success('✅ Testimonial created successfully!')
//       }
//       onClose()
//     } catch (error) {
//       console.error('Error saving testimonial:', error)
//       toast.error(error.response?.data?.message || '❌ Failed to save testimonial')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 pb-4 border-b">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {testimonial ? '✏️ Edit Testimonial' : '➕ Add New Testimonial'}
//           </h2>
//           <button 
//             onClick={onClose} 
//             className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
//           >
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name and Location */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Client Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="e.g., Rahul Sharma"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Location *
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="e.g., Mumbai"
//               />
//             </div>
//           </div>

//           {/* Project */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Name *
//             </label>
//             <input
//               type="text"
//               name="project"
//               value={formData.project}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="e.g., Luxury Villa in Juhu"
//             />
//           </div>

//           {/* Content */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Testimonial Content *
//             </label>
//             <textarea
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               required
//               rows="4"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="What did the client say?"
//             />
//           </div>

//           {/* Rating */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Rating
//             </label>
//             <select
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="5">⭐⭐⭐⭐⭐ - Excellent (5)</option>
//               <option value="4">⭐⭐⭐⭐ - Very Good (4)</option>
//               <option value="3">⭐⭐⭐ - Good (3)</option>
//               <option value="2">⭐⭐ - Fair (2)</option>
//               <option value="1">⭐ - Poor (1)</option>
//             </select>
//           </div>

//           {/* Approve Status */}
//           <div>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.isApproved}
//                 onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
//                 className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//               />
//               <span className="text-sm font-medium text-gray-700">Approve immediately (show on website)</span>
//             </label>
//           </div>

//           {/* Form Actions */}
//           <div className="flex gap-3 pt-4 border-t mt-6">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   Saving...
//                 </span>
//               ) : (
//                 testimonial ? 'Update Testimonial' : 'Create Testimonial'
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default TestimonialForm



import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../../../services/api'
import { X, Plus, Star, CheckCircle, User, MapPin, Building2, MessageSquare, PenSquare, Sparkles } from 'lucide-react'

const TestimonialForm = ({ testimonial, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    project: '',
    content: '',
    rating: 5,
    isApproved: false
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name || '',
        location: testimonial.location || '',
        project: testimonial.project || '',
        content: testimonial.content || '',
        rating: testimonial.rating || 5,
        isApproved: testimonial.is_approved || false
      })
    }
  }, [testimonial])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (testimonial) {
        await api.put(`/testimonials/${testimonial.id}`, formData)
        toast.success('✅ Testimonial updated successfully!')
      } else {
        await api.post('/testimonials', formData)
        toast.success('✅ Testimonial created successfully!')
      }
      onClose()
    } catch (error) {
      console.error('Error saving testimonial:', error)
      toast.error(error.response?.data?.message || '❌ Failed to save testimonial')
    } finally {
      setLoading(false)
    }
  }

  const renderStarPreview = (rating) => (
    <div className="flex gap-1 text-yellow-500 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/50 to-indigo-900/70 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl border border-white max-w-3xl w-full max-h-[92vh] overflow-y-auto p-8 animate-[fadeIn_.25s_ease]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-5 border-b border-blue-200">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent flex items-center gap-3">
            {testimonial ? (
              <>
                <PenSquare className="w-7 h-7 text-blue-600" />
                Edit Testimonial
              </>
            ) : (
              <>
                <Plus className="w-7 h-7 text-blue-600" />
                Add New Testimonial
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Location Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Client Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                  placeholder="e.g., Rahul Sharma"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                  placeholder="e.g., Mumbai"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Project Name *
              </label>
              <input
                type="text"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="e.g., Luxury Villa in Juhu"
              />
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Testimonial Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="4"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
              placeholder="What did the client say?"
            />
          </div>

          {/* Rating & Approval Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                >
                  <option value="5">⭐⭐⭐⭐⭐ - Excellent (5)</option>
                  <option value="4">⭐⭐⭐⭐ - Very Good (4)</option>
                  <option value="3">⭐⭐⭐ - Good (3)</option>
                  <option value="2">⭐⭐ - Fair (2)</option>
                  <option value="1">⭐ - Poor (1)</option>
                </select>
                {renderStarPreview(formData.rating)}
              </div>

              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-5 shadow-sm border border-green-200 w-full">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isApproved}
                      onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Approve immediately (show on website)</span>
                    {formData.isApproved && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {testimonial ? 'Update Testimonial' : 'Create Testimonial'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TestimonialForm