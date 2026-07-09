import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'

const Home = () => {
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, servicesRes, testimonialsRes] = await Promise.all([
          api.get('/projects'),
          api.get('/services'),
          api.get('/testimonials')
        ])
        setProjects(projectsRes.data.data?.slice(0, 3) || [])
        setServices(servicesRes.data.data?.slice(0, 3) || [])
        setTestimonials(testimonialsRes.data.data?.slice(0, 3) || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Property
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover luxury homes, commercial spaces, and investment opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>


{/* Services Overview */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
    <p className="text-center text-gray-600 mb-12">Comprehensive real estate solutions tailored to your needs</p>
    
    {services.length === 0 ? (
      <p className="text-center text-gray-500">No services available</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
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
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="text-sm text-gray-500 space-y-1">
                {service.features?.slice(0, 3).map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>



      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🏆', title: '10+ Years Experience', desc: 'Trusted by thousands of clients' },
              { icon: '⭐', title: 'Quality Assurance', desc: 'Premium properties only' },
              { icon: '🤝', title: 'Expert Guidance', desc: 'Professional consultation' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive market rates' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects - UPDATED WITH IMAGES */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-center text-gray-600 mb-12">Discover our portfolio of premium properties</p>
          
          {projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Image Section - Now with actual images */}
                  <div className="h-56 bg-gray-200 relative">
                    <img
                      src={project.image || 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'available' ? 'bg-green-100 text-green-800' :
                        project.status === 'sold' ? 'bg-red-100 text-red-800' :
                        project.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{project.location}</p>
                    <p className="text-gray-700 text-sm mb-4">{project.description?.substring(0, 80)}...</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-blue-600 font-bold text-xl">₹{project.price?.toLocaleString()}</p>
                        <div className="flex gap-2 text-sm text-gray-500">
                          <span>{project.bedrooms} BHK</span>
                          <span>•</span>
                          <span>{project.area}</span>
                        </div>
                      </div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link to="/projects" className="text-blue-600 hover:text-blue-800 font-semibold">
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Testimonials</h2>
          <p className="text-center text-gray-600 mb-12">What our clients say about us</p>
          
          {testimonials.length === 0 ? (
            <p className="text-center text-gray-500">No testimonials yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-yellow-400 text-xl mb-2">
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <p className="text-sm text-blue-600">{testimonial.project}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-xl mb-8 text-blue-100">Contact us today for a personalized consultation</p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home



