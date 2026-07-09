import { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

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
      await api.post('/contacts', formData)
      toast.success('✅ Message sent successfully!')
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      // ✅ Use error for better debugging
      console.error('Contact form submission error:', error)
      
      // Show specific error message
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.'
      toast.error(`❌ ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Get in touch with us for any inquiries, feedback, or assistance
      </p>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Property Inquiry"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">📍 Address</h3>
                  <p>123, Prime Estate Tower,</p>
                  <p>Mumbai, Maharashtra - 400001</p>
                  <p>India</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">📞 Phone</h3>
                  <p>+91 12345 67890</p>
                  <p>+91 98765 43210</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">✉️ Email</h3>
                  <p>info@primeestate.com</p>
                  <p>support@primeestate.com</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">🕐 Working Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact




// import { useState } from 'react'
// import { toast } from 'react-toastify'
// import api from '../services/api'

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     subject: '',
//     message: ''
//   })
//   const [loading, setLoading] = useState(false)

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
//       await api.post('/contacts', formData)
//       toast.success('✅ Message sent successfully!')
//       setFormData({
//         fullName: '',
//         email: '',
//         subject: '',
//         message: ''
//       })
//     } catch (error) {
//       toast.error('❌ Failed to send message. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
//       <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//         Get in touch with us for any inquiries, feedback, or assistance
//       </p>

//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Contact Form */}
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="John Doe"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="john@example.com"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Subject *
//                 </label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Property Inquiry"
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Message *
//                 </label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows="5"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Tell us about your requirements..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
//               >
//                 {loading ? 'Sending...' : 'Send Message'}
//               </button>
//             </form>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-6">
//             <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8">
//               <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="font-semibold text-lg mb-2">📍 Address</h3>
//                   <p>123, Prime Estate Tower,</p>
//                   <p>Mumbai, Maharashtra - 400001</p>
//                   <p>India</p>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-lg mb-2">📞 Phone</h3>
//                   <p>+91 12345 67890</p>
//                   <p>+91 98765 43210</p>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-lg mb-2">✉️ Email</h3>
//                   <p>info@primeestate.com</p>
//                   <p>support@primeestate.com</p>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-lg mb-2">🕐 Working Hours</h3>
//                   <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
//                   <p>Saturday: 10:00 AM - 2:00 PM</p>
//                   <p>Sunday: Closed</p>
//                 </div>
//               </div>
//             </div>

//             {/* Map Placeholder */}
//             {/* <div className="bg-white rounded-lg shadow-lg p-6">
//               <h3 className="font-semibold text-lg mb-4">📍 Find Us</h3>
//               <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">
//                 Google Map Integration

                
//               </div>

              
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Contact









