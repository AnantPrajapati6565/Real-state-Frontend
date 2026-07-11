


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

  // Stats data (static for demo, can be dynamic)
  const stats = [
    { value: '120+', label: 'Projects Completed' },
    { value: '25+', label: 'Years Experience' },
    { value: '500+', label: 'Happy Clients' },
    { value: '98%', label: 'Satisfaction Rate' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading premium services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12 md:py-20">
      {/* Font imports (optional, can be moved to index.html) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ============================================ */}
        {/* HERO SECTION - Luxury Style */}
        {/* ============================================ */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-black via-gray-900 to-black text-white py-24 mb-20">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          {/* Decorative gold accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <span className="inline-block px-5 py-2 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-sm tracking-widest uppercase font-inter">
              Premium Real Estate Services
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-playfair font-bold leading-tight">
              Luxury Services<br />
              <span className="text-[#D4AF37]">Crafted for Modern Living</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto font-inter leading-relaxed">
              From property investment to premium home consultation, we provide complete real estate solutions
              tailored to your lifestyle.
            </p>
            {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-[#D4AF37] text-black font-inter font-semibold rounded-full hover:bg-[#C5A035] transition duration-300">
                Explore Services
              </button>
              <button className="px-8 py-3 border border-white/30 text-white font-inter font-medium rounded-full hover:bg-white hover:text-black transition duration-300 backdrop-blur-sm">
                Contact Us
              </button>
            </div> */}
          </div>
        </div>

        {/* ============================================ */}
        {/* STATISTICS SECTION */}
        {/* ============================================ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECE7DD] p-6 text-center shadow-sm hover:shadow-lg transition duration-300">
              <div className="text-3xl md:text-4xl font-bold text-[#111111] font-playfair">{stat.value}</div>
              <div className="text-sm text-[#6E6E73] font-inter mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ============================================ */}
        {/* SERVICES GRID */}
        {/* ============================================ */}
        {services.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#ECE7DD] shadow-xl">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-2xl font-playfair font-semibold text-[#111111] mb-2">No services available</h3>
            <p className="text-[#6E6E73] font-inter">Check back soon for our premium offerings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-3xl border border-[#ECE7DD] shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-3 overflow-hidden"
              >
                {/* Image Section with Overlay */}
                <div className="relative h-64 overflow-hidden bg-[#F5F2ED]">
                  <img
                    src={service.image_url || 'https://via.placeholder.com/600x400/cccccc/666666?text=Service'}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=Service'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Floating Service Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-[#D4AF37] text-[10px] uppercase tracking-widest border border-[#D4AF37]/30 font-inter font-semibold">
                      Premium
                    </span>
                  </div>

                  {/* Icon (if any) or small indicator */}
                  {service.icon && (
                    <div className="absolute bottom-5 left-5 text-white text-4xl opacity-80">
                      {service.icon}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-playfair font-bold text-[#111111] tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[#6E6E73] font-inter leading-7 mt-3 text-sm">
                    {service.description}
                  </p>

                  {/* Features as Premium Badges */}
                  {service.features && service.features.length > 0 && (
                    <div className="mt-6 space-y-2">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#D4AF37] text-sm font-bold">✓</span>
                          </div>
                          <span className="text-[#444] font-inter text-sm">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 4 && (
                        <div className="text-[#6E6E73] text-xs font-inter mt-1">
                          +{service.features.length - 4} more features
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTA Button */}
                  {/* <button className="mt-8 w-full py-3.5 rounded-full bg-[#111111] text-white font-inter font-medium hover:bg-[#D4AF37] hover:text-black transition duration-300 ease-out group-hover:shadow-lg">
                    Learn More →
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Services