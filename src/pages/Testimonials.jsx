// import { useEffect, useState } from 'react'
// import api from '../services/api'

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await api.get('/testimonials')
//         setTestimonials(response.data.data || [])
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching testimonials:', error)
//         setLoading(false)
//       }
//     }
//     fetchTestimonials()
//   }, [])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-xl">Loading...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-4xl font-bold text-center mb-4">Testimonials</h1>
//       <p className="text-center text-gray-600 mb-12">What our clients say about us</p>

//       {testimonials.length === 0 ? (
//         <div className="text-center text-gray-500 py-12">
//           <div className="text-6xl mb-4">⭐</div>
//           <p className="text-xl">No testimonials available yet</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
//               <div className="text-yellow-400 text-xl mb-3">
//                 {'⭐'.repeat(testimonial.rating)}
//                 {'☆'.repeat(5 - testimonial.rating)}
//               </div>
//               <p className="text-gray-700 mb-4 italic text-lg">"{testimonial.content}"</p>
//               <div className="border-t pt-4">
//                 <h4 className="font-semibold text-lg">{testimonial.name}</h4>
//                 <p className="text-gray-500 text-sm">{testimonial.location}</p>
//                 <p className="text-blue-600 text-sm font-medium">{testimonial.project}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Testimonials




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

  // Calculate stats
  const totalTestimonials = testimonials.length
  const avgRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '0'
  // For demonstration, we use fixed stats – you can make them dynamic as needed
  const stats = [
    { value: `${totalTestimonials}+`, label: 'Happy Families' },
    { value: `${avgRating}★`, label: 'Average Rating' },
    { value: '15+', label: 'Years Experience' },
    { value: '120+', label: 'Luxury Projects' },
  ]

  // Helper to render stars
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  if (loading) {
    return (
      <div className="bg-[#FAF8F4] min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[320px] rounded-3xl bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12 md:py-20">
      {/* Font imports – can be moved to index.html for performance */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ========== HERO SECTION ========== */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 md:py-24 mb-16">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <span className="inline-block px-5 py-2 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] uppercase tracking-widest text-sm font-inter">
              Client Stories
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-playfair font-bold leading-tight">
              Trusted By Hundreds Of Happy Families
            </h1>
            <p className="mt-5 text-lg text-gray-300 font-inter max-w-2xl mx-auto">
              Discover why homeowners and investors choose us for exceptional real estate experiences.
            </p>
          </div>
        </div>

        {/* ========== STATISTICS SECTION ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECE7DD] p-6 text-center shadow-sm hover:shadow-lg transition duration-300">
              <div className="text-3xl md:text-4xl font-bold text-[#111111] font-playfair">{stat.value}</div>
              <div className="text-sm text-[#6E6E73] font-inter mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ========== TESTIMONIALS GRID ========== */}
        {testimonials.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#ECE7DD] shadow-xl">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-playfair font-semibold text-[#111111] mb-2">No testimonials yet</h3>
            <p className="text-[#6E6E73] font-inter">We’re collecting feedback from our clients – check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => {
              // Generate avatar initials
              const initials = testimonial.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)

              return (
                <div
                  key={testimonial.id}
                  className="group bg-white rounded-[30px] border border-[#ECE7DD] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.15)] hover:-translate-y-3 transition-all duration-500"
                >
                  {/* Quote Icon */}
                  <div className="text-6xl text-[#D4AF37] leading-none mb-2">“</div>

                  {/* Rating */}
                  <div className="flex gap-1 text-[#D4AF37] text-xl mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Content */}
                  <p className="text-[#444] font-inter leading-8 italic text-base">
                    "{testimonial.content}"
                  </p>

                  {/* Client Info */}
                  <div className="mt-6 flex items-center gap-4 border-t border-[#ECE7DD] pt-6">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#D4AF37]">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = ''
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-white font-bold text-lg">
                          {initials}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-[#111111] font-playfair tracking-tight">
                        {testimonial.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                        <span className="text-sm text-[#6E6E73] font-inter">{testimonial.location}</span>
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
                        <span className="text-sm text-[#D4AF37] font-medium font-inter">{testimonial.project}</span>
                      </div>
                      {/* Verified badge */}
                      <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#111111] text-[#D4AF37] text-[10px] font-inter font-semibold uppercase tracking-wider">
                        Verified Client
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ========== PREMIUM CTA ========== */}
        <section className="mt-24 bg-[#111111] rounded-[40px] py-20 text-center px-6">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white max-w-2xl mx-auto">
            Ready To Find Your Dream Home?
          </h2>
          <p className="mt-4 text-gray-300 font-inter max-w-xl mx-auto">
            Join hundreds of satisfied homeowners today – let's start your journey.
          </p>

        </section>
      </div>
    </div>
  )
}

export default Testimonials

