// 

import { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'
import { MapPin, Phone, Mail, Clock, Send, Award, Users, Building2, Headphones } from 'lucide-react'

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
      console.error('Contact form submission error:', error)
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.'
      toast.error(`❌ ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  // Stats data
  const stats = [
    { icon: <Award className="h-6 w-6" />, value: '15+', label: 'Years Experience' },
    { icon: <Building2 className="h-6 w-6" />, value: '120+', label: 'Projects Delivered' },
    { icon: <Users className="h-6 w-6" />, value: '500+', label: 'Happy Families' },
    { icon: <Headphones className="h-6 w-6" />, value: '24/7', label: 'Support Available' },
  ]

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12 md:py-20">
      {/* Font imports – can be moved to index.html */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ========== HERO SECTION ========== */}
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 md:py-24 mb-16">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <span className="inline-flex px-5 py-2 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] uppercase tracking-[4px] text-sm font-inter">
              Contact Our Experts
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-playfair font-bold leading-tight">
              Let's Build Your Dream Property
            </h1>
            <p className="mt-5 text-lg text-gray-300 font-inter max-w-2xl mx-auto">
              Our luxury real estate consultants are here to guide you through every step of your journey.
            </p>
          </div>
        </div>

        {/* ========== STATISTICS ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECE7DD] p-6 text-center shadow-sm hover:shadow-lg transition duration-300">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                {stat.icon}
              </div>
              <div className="mt-2 text-2xl md:text-3xl font-bold text-[#111111] font-playfair">{stat.value}</div>
              <div className="text-sm text-[#6E6E73] font-inter mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ========== FORM + CONTACT INFO ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ====== FORM ====== */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] border border-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8 md:p-10">
            <h2 className="text-3xl font-playfair font-bold text-[#111111] mb-2">Send us a Message</h2>
            <p className="text-[#6E6E73] font-inter mb-8">We'll respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest text-[#6E6E73] font-inter font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-[#ECE7DD] rounded-2xl focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all duration-300 font-inter text-[#111111] placeholder-[#6E6E73]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-[#6E6E73] font-inter font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-[#ECE7DD] rounded-2xl focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all duration-300 font-inter text-[#111111] placeholder-[#6E6E73]"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-[#6E6E73] font-inter font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-[#ECE7DD] rounded-2xl focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all duration-300 font-inter text-[#111111] placeholder-[#6E6E73]"
                  placeholder="Property Inquiry"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-[#6E6E73] font-inter font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-5 py-4 bg-gray-50 border border-[#ECE7DD] rounded-2xl focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all duration-300 font-inter text-[#111111] placeholder-[#6E6E73] resize-y"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#111111] text-white font-inter font-semibold tracking-wide hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ====== CONTACT INFO ====== */}
          <div className="space-y-6">
            {/* Main Contact Card */}
            <div className="bg-[#111111] text-white rounded-[30px] shadow-2xl p-8 md:p-10">
              <h3 className="text-2xl font-playfair font-bold mb-8">Contact Information</h3>
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-[#D4AF37] font-inter font-semibold">Address</h4>
                    <p className="text-gray-300 font-inter mt-1">123, Prime Estate Tower,<br />Mumbai, Maharashtra - 400001<br />India</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-[#D4AF37] font-inter font-semibold">Phone</h4>
                    <p className="text-gray-300 font-inter mt-1">+91 12345 67890<br />+91 98765 43210</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-[#D4AF37] font-inter font-semibold">Email</h4>
                    <p className="text-gray-300 font-inter mt-1">info@primeestate.com<br />support@primeestate.com</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-[#D4AF37] font-inter font-semibold">Working Hours</h4>
                    <p className="text-gray-300 font-inter mt-1">Mon–Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 2:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-[30px] overflow-hidden shadow-xl border border-[#ECE7DD]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.412157616345!2d72.83092187499999!3d19.076131699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f7c1f7f7f7%3A0x3f7c7f7c7f7c7f7c!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prime Estate Location"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* ========== CTA SECTION ========== */}
        <section className="mt-24 rounded-[40px] bg-[#111111] py-20 text-center px-6">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white max-w-2xl mx-auto">
            Ready To Find Your Dream Home?
          </h2>
          <p className="mt-4 text-gray-300 font-inter max-w-xl mx-auto">
            Book a free consultation with our luxury property experts today.
          </p>
          {/* <button className="mt-8 px-10 py-4 rounded-full bg-[#D4AF37] hover:bg-[#C5A035] text-black font-inter font-semibold transition duration-300 shadow-lg hover:shadow-xl">
            Schedule Appointment
          </button> */}
        </section>
      </div>
    </div>
  )
}

export default Contact