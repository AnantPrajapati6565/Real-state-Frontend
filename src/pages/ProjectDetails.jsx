// import { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import api from '../services/api'

// const ProjectDetails = () => {
//   const { id } = useParams()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await api.get(`/projects/${id}`)
//         setProject(response.data.data)
//         setLoading(false)
//       } catch (error) {
//         setError('Project not found')
//         setLoading(false)
//       }
//     }
//     fetchProject()
//   }, [id])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-xl">Loading...</div>
//       </div>
//     )
//   }

//   if (error || !project) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
//         <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
//         <Link to="/projects" className="text-blue-600 hover:text-blue-800 font-semibold">
//           ← Back to Projects
//         </Link>
//       </div>
//     )
//   }

//   const statusColors = {
//     available: 'bg-green-100 text-green-800',
//     sold: 'bg-red-100 text-red-800',
//     ongoing: 'bg-yellow-100 text-yellow-800',
//     completed: 'bg-blue-100 text-blue-800'
//   }

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <Link to="/projects" className="text-blue-600 hover:text-blue-800 font-semibold mb-8 inline-block">
//         ← Back to Projects
//       </Link>

//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="h-96 bg-gray-200 flex items-center justify-center text-gray-400 text-4xl">
//           🏗️ {project.name}
//         </div>
        
//         <div className="p-8">
//           <div className="flex flex-wrap justify-between items-start mb-6">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
//               <p className="text-gray-600">{project.location}</p>
//             </div>
//             <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[project.status]}`}>
//               {project.status?.toUpperCase()}
//             </span>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Price</p>
//               <p className="text-2xl font-bold text-blue-600">₹{project.price?.toLocaleString()}</p>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Category</p>
//               <p className="text-lg font-semibold capitalize">{project.category}</p>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Area</p>
//               <p className="text-lg font-semibold">{project.area || 'N/A'}</p>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-3">Description</h2>
//             <p className="text-gray-700">{project.description}</p>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-3">Features</h2>
//             <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
//               {project.features?.map((feature, idx) => (
//                 <li key={idx} className="flex items-center text-gray-700">
//                   <span className="text-green-500 mr-2">✓</span>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Bedrooms</p>
//               <p className="text-lg font-semibold">{project.bedrooms || 'N/A'}</p>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Bathrooms</p>
//               <p className="text-lg font-semibold">{project.bathrooms || 'N/A'}</p>
//             </div>
//           </div>

//           <div className="mt-8 pt-8 border-t">
//             <Link
//               to="/contact"
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
//             >
//               Inquire About This Property
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProjectDetails



import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { Bed, Bath, Maximize, MapPin, CheckCircle, ArrowLeft, Calendar, Home, Building2 } from 'lucide-react'

const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`)
        setProject(response.data.data)
        setLoading(false)
      } catch (error) {
        setError('Project not found')
        setLoading(false)
      }
    }
    fetchProject()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FAF8F4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-[#ECE7DD] shadow-xl p-12 max-w-xl mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-playfair font-bold text-[#111111] mb-4">Project Not Found</h1>
            <p className="text-[#6E6E73] font-inter mb-8">The property you're looking for doesn't exist.</p>
            <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-black transition duration-300 font-inter">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusColors = {
    available: 'bg-emerald-500/90 text-white',
    sold: 'bg-rose-500/90 text-white',
    ongoing: 'bg-amber-500/90 text-white',
    completed: 'bg-blue-500/90 text-white'
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] py-8 md:py-12">
      {/* Font imports (add to index.html for performance) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-[#6E6E73] hover:text-[#111111] font-inter font-medium transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-[#ECE7DD] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-[450px] md:h-[550px] overflow-hidden bg-[#F5F2ED]">
            <img
              src={project.image || 'https://via.placeholder.com/1200x700/cccccc/666666?text=No+Image'}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://via.placeholder.com/1200x700/cccccc/666666?text=No+Image'
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Status Badge */}
            <div className="absolute top-6 right-6">
              <span className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg backdrop-blur-sm ${statusColors[project.status] || 'bg-gray-500/90 text-white'}`}>
                {project.status || 'Unknown'}
              </span>
            </div>

            {/* Title & Location Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white leading-tight">
                {project.name}
              </h1>
              <p className="text-gray-200 font-inter mt-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#D4AF37]" />
                {project.location}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 space-y-10">
            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-[#ECE7DD] p-6 shadow-sm hover:shadow-md transition duration-300">
                <p className="text-sm text-[#6E6E73] font-inter uppercase tracking-wider">Price</p>
                <p className="text-2xl md:text-3xl font-bold text-[#111111] font-playfair mt-1">
                  ₹{project.price?.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-[#ECE7DD] p-6 shadow-sm hover:shadow-md transition duration-300">
                <p className="text-sm text-[#6E6E73] font-inter uppercase tracking-wider">Category</p>
                <p className="text-xl font-semibold text-[#111111] capitalize mt-1">
                  {project.category || 'N/A'}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-[#ECE7DD] p-6 shadow-sm hover:shadow-md transition duration-300">
                <p className="text-sm text-[#6E6E73] font-inter uppercase tracking-wider">Area</p>
                <p className="text-xl font-semibold text-[#111111] mt-1">
                  {project.area || 'N/A'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-[#ECE7DD] p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-playfair font-bold text-[#111111] mb-4">Overview</h2>
              <p className="text-[#6E6E73] font-inter leading-8">
                {project.description}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#ECE7DD] p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-playfair font-bold text-[#111111] mb-6">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-[#FAF8F4] rounded-2xl p-4 border border-[#ECE7DD] hover:border-[#D4AF37] transition duration-300">
                      <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-[#D4AF37]" />
                      </span>
                      <span className="text-[#111111] font-inter">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-[#ECE7DD] p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition duration-300">
                <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Bed className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-[#6E6E73] font-inter uppercase tracking-wider">Bedrooms</p>
                  <p className="text-2xl font-bold text-[#111111]">{project.bedrooms || 'N/A'}</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#ECE7DD] p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition duration-300">
                <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Bath className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-[#6E6E73] font-inter uppercase tracking-wider">Bathrooms</p>
                  <p className="text-2xl font-bold text-[#111111]">{project.bathrooms || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-[#ECE7DD]">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 rounded-full bg-[#111111] text-white font-inter font-semibold hover:bg-[#D4AF37] hover:text-black transition duration-300 shadow-lg hover:shadow-xl"
              >
                <Calendar className="h-5 w-5" />
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails