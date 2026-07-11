import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import { 
  ArrowRight, 
  CheckCircle, 
  Award, 
  Users, 
  Clock,
  Star,
  ChevronRight,
  Home as HomeIcon,
  Building2,
  Briefcase,
  Shield,
  TrendingUp,
  MapPin,
  Sparkles,
  Rocket,
  Globe,
  Heart,
  Zap,
  Crown,
  Diamond,
  Sun,
  Trees,
  Dumbbell,
  Utensils,
  Camera,
  Car,
  Wifi,
  Coffee,
  GraduationCap,
  Waves,
  Mountain,
  Plane,
  Smartphone,
  Watch,
  Headphones,
  Gift,
  Gem,
  PenTool,
  Palette
} from 'lucide-react'

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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-purple-500 animate-ping opacity-75"></div>
          </div>
          <p className="text-white/80 font-medium text-lg animate-pulse">Loading Prime Estate...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      
      {/* ============================================ */}
      {/* SECTION 1: HERO - Deep Blue Gradient with Glass */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500 rounded-full filter blur-3xl"></div>
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 px-5 py-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-white/90 font-medium text-sm tracking-wide">#1 Trusted Real Estate Platform</span>
                <Crown className="h-4 w-4 text-yellow-400 ml-1" />
              </div>
              <h1 className="text-5xl font-bold text-white sm:text-6xl md:text-7xl leading-tight">
                Build Your
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Future Today</span>
                <span className="text-2xl md:text-3xl font-light text-blue-200/70 mt-2 block">Where Dreams Find a Home</span>
              </h1>
              <p className="max-w-xl text-lg text-blue-100/80 leading-relaxed">
                Discover premium residential & commercial properties, backed by expert consulting 
                and state-of-the-art infrastructure mapping for your next big investment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/projects">
                  <button className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-2">Explore Properties <Rocket className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /></span>
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="group inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/50">
                    Get In Touch <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  {['A', 'B', 'C', 'D'].map((letter, i) => (
                    <div key={i} className="inline-block h-12 w-12 rounded-full border-2 border-white/30 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-xl ring-2 ring-white/10">
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="text-white/80">
                  <span className="font-bold text-white text-lg block">500+ Families</span>
                  <span className="text-sm">Trusted us</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div><div className="text-4xl font-bold text-white">₹8.5 Cr</div><div className="text-blue-200/80 text-sm">Luxury Villa, Juhu</div></div>
                    <div className="p-3 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors"><Diamond className="h-6 w-6 text-blue-400" /></div>
                  </div>
                </div>
                <div className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div><div className="text-4xl font-bold text-white">50+</div><div className="text-blue-200/80 text-sm">Completed Projects</div></div>
                    <div className="p-3 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors"><Building2 className="h-6 w-6 text-purple-400" /></div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 mt-10">
                <div className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div><div className="text-4xl font-bold text-white">4.9 ⭐</div><div className="text-blue-200/80 text-sm">Client Rating</div></div>
                    <div className="p-3 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/30 transition-colors"><Star className="h-6 w-6 text-yellow-400" /></div>
                  </div>
                </div>
                <div className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div><div className="text-4xl font-bold text-white">10+</div><div className="text-blue-200/80 text-sm">Years Excellence</div></div>
                    <div className="p-3 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors"><Award className="h-6 w-6 text-emerald-400" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="h-12 w-7 rounded-full border-2 border-white/20 backdrop-blur-sm flex items-start justify-center p-2">
            <div className="h-2 w-1.5 rounded-full bg-white/60 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: SERVICES - Gradient White to Gray */}
      {/* ============================================ */}
      <section className="py-28 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200/30 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" /> Our Expertise
            </div>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
              Premium Services
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tailored for You</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Comprehensive real estate solutions designed to exceed your expectations
            </p>
          </div>
          {services.length === 0 ? (
            <p className="text-center text-gray-500">No services available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={service.id} className="group relative rounded-2xl bg-white shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative p-6">
                    <div className="h-56 bg-gray-200 rounded-xl overflow-hidden">
                      <img src={service.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=Service'} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Service' }} />
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                          {index === 0 && <HomeIcon className="h-5 w-5 text-blue-600" />}
                          {index === 1 && <Building2 className="h-5 w-5 text-purple-600" />}
                          {index === 2 && <Briefcase className="h-5 w-5 text-emerald-600" />}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                      <ul className="mt-4 space-y-2">
                        {service.features?.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
                            <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" /> {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-400">Trusted by 500+ clients</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: STATS - Vibrant Gradient */}
      {/* ============================================ */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Award className="h-8 w-8 mx-auto mb-3" />, number: '10+', label: 'Years Experience' },
              { icon: <Users className="h-8 w-8 mx-auto mb-3" />, number: '500+', label: 'Happy Clients' },
              { icon: <Building2 className="h-8 w-8 mx-auto mb-3" />, number: '50+', label: 'Projects Delivered' },
              { icon: <Star className="h-8 w-8 mx-auto mb-3" />, number: '4.9/5', label: 'Client Rating' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                {stat.icon}
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4: WHY CHOOSE US - Light Gradient */}
      {/* ============================================ */}
      <section className="py-28 relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full filter blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200/30">
              <Shield className="h-4 w-4" /> Why Choose Us
            </div>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">What Makes Us Different</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              We combine expertise, trust, and innovation to deliver exceptional real estate solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Award className="h-8 w-8" />, title: '10+ Years', desc: 'Industry Excellence', stats: 'Trusted Since 2014', color: 'from-blue-500 to-cyan-400' },
              { icon: <Users className="h-8 w-8" />, title: '500+', desc: 'Happy Clients', stats: 'Across India', color: 'from-purple-500 to-pink-400' },
              { icon: <Globe className="h-8 w-8" />, title: 'Digital Mapping', desc: 'Infrastructure Planning', stats: 'Future-Ready', color: 'from-emerald-500 to-teal-400' },
              { icon: <Heart className="h-8 w-8" />, title: '24/7 Support', desc: 'Dedicated Service', stats: 'Always Available', color: 'from-orange-500 to-amber-400' },
            ].map((item, index) => (
              <div key={index} className="group relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-700 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{item.title}</div>
                  <div className="text-lg font-semibold text-gray-800 mt-1">{item.desc}</div>
                  <div className="text-sm text-gray-500 mt-2">{item.stats}</div>
                  <div className="mt-4 text-xs text-gray-400">✓ Verified & Trusted</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: FEATURED PROJECTS - Subtle Gray Gradient */}
      {/* ============================================ */}
      <section className="py-28 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200/30">
                <TrendingUp className="h-4 w-4" /> Portfolio
              </div>
              <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">Featured Projects</h2>
              <p className="mt-2 text-lg text-gray-600">Handpicked premium properties for you</p>
            </div>
            <Link to="/projects" className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              View All Projects <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group rounded-2xl bg-white shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img src={project.image || 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${project.status === 'available' ? 'bg-emerald-500/90 text-white' : project.status === 'sold' ? 'bg-rose-500/90 text-white' : project.status === 'ongoing' ? 'bg-amber-500/90 text-white' : 'bg-blue-500/90 text-white'}`}>
                        {project.status === 'available' ? 'Available' : project.status === 'sold' ? 'Sold Out' : project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-2xl font-bold text-white backdrop-blur-sm bg-black/30 px-4 py-2 rounded-xl inline-block">₹{project.price?.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mb-3"><MapPin className="h-4 w-4" /> {project.location}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description?.substring(0, 80)}...</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><HomeIcon className="h-4 w-4" /> {project.bedrooms} BHK</span>
                        <span>•</span>
                        <span>{project.area}</span>
                      </div>
                      <Link to={`/projects/${project.id}`} className="group flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        View Details <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 6: AMENITIES / LIFESTYLE - Vibrant Boxes */}
      {/* ============================================ */}
      <section className="py-28 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200/30">
              <Sun className="h-4 w-4" /> The Prime Lifestyle
            </div>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">More Than Just a Home</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Experience world-class amenities and a lifestyle you deserve</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: <Wifi className="h-6 w-6" />, label: 'Smart Home' },
              { icon: <Trees className="h-6 w-6" />, label: 'Green Spaces' },
              { icon: <Dumbbell className="h-6 w-6" />, label: 'Fitness Center' },
              { icon: <Utensils className="h-6 w-6" />, label: 'Fine Dining' },
              { icon: <Camera className="h-6 w-6" />, label: 'Security' },
              { icon: <Car className="h-6 w-6" />, label: 'Parking' },
              { icon: <Coffee className="h-6 w-6" />, label: 'Café' },
              { icon: <GraduationCap className="h-6 w-6" />, label: 'Schools Nearby' },
              { icon: <Waves className="h-6 w-6" />, label: 'Pool' },
              { icon: <Mountain className="h-6 w-6" />, label: 'Scenic Views' },
              { icon: <Plane className="h-6 w-6" />, label: 'Airport Access' },
              { icon: <Smartphone className="h-6 w-6" />, label: 'Smart Security' },
            ].map((item, index) => (
              <div key={index} className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/50">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 7: TESTIMONIALS - Soft Gradient */}
      {/* ============================================ */}
      <section className="py-28 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200/30">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> Testimonials
            </div>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Real stories from people who found their dream property with us</p>
          </div>
          {testimonials.length === 0 ? (
            <p className="text-center text-gray-500">No testimonials yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/50 relative">
                  <div className="absolute -top-3 -left-3 text-6xl text-blue-100 opacity-50 group-hover:opacity-100 transition-opacity duration-300">"</div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                      <p className="text-sm text-blue-600 font-medium">{testimonial.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/testimonials" className="group inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors">
              Read more stories <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 8: CTA - Deep Gradient with Glow */}
      {/* ============================================ */}
      <section className="relative overflow-hidden py-32 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-4xl text-center px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white mb-6">
            <Zap className="h-4 w-4 text-yellow-400" /> Limited Time Offer
          </div>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl leading-tight">
            Ready to Find Your
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Perfect Property?</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-blue-100/80 leading-relaxed">
            Join 500+ happy families. Get personalized consultation and exclusive property deals.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  Start Your Journey <Rocket className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>
            <Link to="/projects">
              <button className="group inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/50">
                Browse Properties <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" /> No Hidden Charges</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" /> 100% Verified Properties</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" /> Expert Support</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" /> 24/7 Assistance</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home






