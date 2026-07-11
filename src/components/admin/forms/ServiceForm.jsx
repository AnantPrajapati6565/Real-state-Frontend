// import { useState, useEffect } from 'react'
// import { toast } from 'react-toastify'
// import api from '../../../services/api'
// import {
//   X, Plus, Trash2, Image as ImageIcon,
//   CheckCircle, Zap, Droplet, Wrench,
//   Home, Hammer, Smile, Sparkles
// } from 'lucide-react'

// // -----------------------------------------------------------------------------
// // Constants – Predefined options using Lucide icons
// // -----------------------------------------------------------------------------
// const ICON_OPTIONS = [
//   { icon: <Zap className="w-8 h-8" />, label: 'Electric' },
//   { icon: <Droplet className="w-8 h-8" />, label: 'Water' },
//   { icon: <Wrench className="w-8 h-8" />, label: 'Tools' },
//   { icon: <Home className="w-8 h-8" />, label: 'Home' },
//   { icon: <Hammer className="w-8 h-8" />, label: 'Construction' },
// ]

// const SERVICE_IMAGES = [
//   { id: 'electric', label: '⚡ Electric Service', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400' },
//   { id: 'water', label: '💧 Water Supply', url: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
//   { id: 'plumbing', label: '🔧 Plumbing', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400' },
//   { id: 'carpentry', label: '🪚 Carpentry', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400' },
//   { id: 'painting', label: '🎨 Painting', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400' },
//   { id: 'cleaning', label: '🧹 Cleaning', url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400' },
//   { id: 'security', label: '🔒 Security', url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
//   { id: 'landscaping', label: '🌿 Landscaping', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400' },
//   { id: 'interior', label: '🛋️ Interior Design', url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400' },
//   { id: 'renovation', label: '🔨 Renovation', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400' },
// ]

// // -----------------------------------------------------------------------------
// // Component
// // -----------------------------------------------------------------------------
// const ServiceForm = ({ service, onClose }) => {
//   // State
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     icon: '',
//     image_url: '',
//     features: [],
//     isActive: true,
//   })
//   const [loading, setLoading] = useState(false)
//   const [featureInput, setFeatureInput] = useState('')
//   const [displayType, setDisplayType] = useState('icon') // 'icon' | 'image'

//   // Pre‑fill form when editing
//   useEffect(() => {
//     if (service) {
//       setFormData({
//         title: service.title || '',
//         description: service.description || '',
//         icon: service.icon || '',
//         image_url: service.image_url || '',
//         features: service.features || [],
//         isActive: service.is_active !== undefined ? service.is_active : true,
//       })
//       if (service.icon && !service.image_url) {
//         setDisplayType('icon')
//       } else if (service.image_url) {
//         setDisplayType('image')
//       }
//     }
//   }, [service])

//   // ----- Handlers -----
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleAddFeature = () => {
//     const trimmed = featureInput.trim()
//     if (trimmed && !formData.features.includes(trimmed)) {
//       setFormData({
//         ...formData,
//         features: [...formData.features, trimmed],
//       })
//       setFeatureInput('')
//     }
//   }

//   const handleRemoveFeature = (index) => {
//     setFormData({
//       ...formData,
//       features: formData.features.filter((_, i) => i !== index),
//     })
//   }

//   const handleSelectIcon = (iconValue) => {
//     setDisplayType('icon')
//     setFormData({ ...formData, icon: iconValue, image_url: '' })
//   }

//   const handleSelectImage = (url) => {
//     setDisplayType('image')
//     setFormData({ ...formData, image_url: url, icon: '' })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       // Validate: at least one of icon or image_url must be set
//       if (!formData.icon && !formData.image_url) {
//         toast.error('❌ Please select either an icon or an image')
//         setLoading(false)
//         return
//       }

//       const payload = { ...formData, features: formData.features }

//       if (service) {
//         await api.put(`/services/${service.id}`, payload)
//         toast.success('✅ Service updated successfully!')
//       } else {
//         await api.post('/services', payload)
//         toast.success('✅ Service created successfully!')
//       }

//       onClose()
//     } catch (error) {
//       console.error('Error saving service:', error)
//       toast.error(error.response?.data?.message || '❌ Failed to save service')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ----- Render -----
//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/50 to-indigo-900/70 backdrop-blur-md flex items-center justify-center z-50 p-6">
//       <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl border border-white max-w-5xl w-full max-h-[92vh] overflow-y-auto p-8 animate-[fadeIn_.25s_ease]">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8 pb-5 border-b border-blue-200">
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
//             {service ? '✏️ Edit Service' : '➕ Add New Service'}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* ---- Title & Description ---- */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Service Title *
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
//                 placeholder="e.g., Residential Properties"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Description *
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 rows="3"
//                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
//                 placeholder="Describe the service..."
//               />
//             </div>
//           </div>

//           {/* ---- Features ---- */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Features
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={featureInput}
//                 onChange={(e) => setFeatureInput(e.target.value)}
//                 placeholder="Add a feature (e.g., 24/7 Support)"
//                 className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
//                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
//               />
//               <button
//                 type="button"
//                 onClick={handleAddFeature}
//                 className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
//               >
//                 <Plus className="w-5 h-5" />
//               </button>
//             </div>
//             {formData.features.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {formData.features.map((feature, index) => (
//                   <span
//                     key={index}
//                     className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full shadow-sm"
//                   >
//                     {feature}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveFeature(index)}
//                       className="text-red-500 hover:text-red-700 font-bold"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* ---- Display Type Selection ---- */}
//           <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200 rounded-2xl shadow-inner p-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-3">
//               Choose Display Type *
//             </label>
//             <div className="flex gap-4 mb-5">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setDisplayType('icon')
//                   setFormData({ ...formData, image_url: '' })
//                 }}
//                 className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
//                   displayType === 'icon'
//                     ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
//                     : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 <Smile className="w-5 h-5" /> Use Icon
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setDisplayType('image')
//                   setFormData({ ...formData, icon: '' })
//                 }}
//                 className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
//                   displayType === 'image'
//                     ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
//                     : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 <ImageIcon className="w-5 h-5" /> Use Image
//               </button>
//             </div>

//             {/* ---- Icon Options (Lucide icons) ---- */}
//             {displayType === 'icon' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Choose an Icon (5 Fixed Options)
//                 </label>
//                 <div className="grid grid-cols-5 gap-3">
//                   {ICON_OPTIONS.map((item) => (
//                     <button
//                       key={item.label}
//                       type="button"
//                       onClick={() => handleSelectIcon(item.label.toLowerCase())}
//                       className={`
//                         p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl
//                         ${
//                           formData.icon === item.label.toLowerCase()
//                             ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 ring-4 ring-blue-200 shadow-xl'
//                             : 'border-gray-200 bg-white hover:border-blue-300'
//                         }
//                       `}
//                     >
//                       <div className="flex justify-center text-blue-600">
//                         {item.icon}
//                       </div>
//                       <div className="text-xs text-gray-600 mt-2 text-center">{item.label}</div>
//                     </button>
//                   ))}
//                 </div>
//                 {formData.icon && (
//                   <p className="text-sm text-green-600 mt-3 flex items-center gap-1">
//                     <CheckCircle className="w-4 h-4" /> Selected: {formData.icon}
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* ---- Image Options ---- */}
//             {displayType === 'image' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Choose a Service Image
//                 </label>
//                 <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
//                   {SERVICE_IMAGES.map((img) => (
//                     <button
//                       key={img.id}
//                       type="button"
//                       onClick={() => handleSelectImage(img.url)}
//                       className={`
//                         relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300
//                         ${formData.image_url === img.url ? 'ring-4 ring-blue-500 border-2 border-blue-500' : 'border border-gray-200'}
//                       `}
//                     >
//                       <img
//                         src={img.url}
//                         alt={img.label}
//                         className="w-full h-28 object-cover"
//                         onError={(e) => {
//                           e.target.onerror = null
//                           e.target.src = 'https://via.placeholder.com/100x80/cccccc/666666?text=No+Image'
//                         }}
//                       />
//                       <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center truncate">
//                         {img.label}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//                 {formData.image_url && (
//                   <div className="mt-4">
//                     <p className="text-sm text-green-600 flex items-center gap-1">
//                       <CheckCircle className="w-4 h-4" /> Image Selected
//                     </p>
//                     <img
//                       src={formData.image_url}
//                       alt="Selected"
//                       className="w-full max-w-md h-48 object-cover rounded-2xl shadow-xl border-4 border-white mt-2"
//                       onError={(e) => {
//                         e.target.onerror = null
//                         e.target.src = 'https://via.placeholder.com/200x100/cccccc/666666?text=No+Image'
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* ---- Active Status ---- */}
//           <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-5 shadow-sm border border-green-200">
//             <label className="flex items-center gap-3 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.isActive}
//                 onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
//                 className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
//               />
//               <span className="text-sm font-semibold text-gray-700">
//                 Active (visible on website)
//               </span>
//               {formData.isActive && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
//             </label>
//           </div>

//           {/* ---- Actions ---- */}
//           <div className="flex gap-3 pt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
//                   Saving...
//                 </span>
//               ) : (
//                 service ? 'Update Service' : 'Create Service'
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ServiceForm










// // import { useState, useEffect } from 'react'
// // import { toast } from 'react-toastify'
// // import api from '../../../services/api'
// // import { X, Plus, Trash2, Image as ImageIcon, CheckCircle, Upload, Check } from 'lucide-react'

// // const ServiceForm = ({ service, onClose }) => {
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     description: '',
// //     icon: '',
// //     image_url: '',
// //     features: [],
// //     isActive: true
// //   })
// //   const [loading, setLoading] = useState(false)
// //   const [featureInput, setFeatureInput] = useState('')
// //   const [selectedType, setSelectedType] = useState('icon') // 'icon' or 'image'

// //   // Fixed Service Images
// //   const serviceImages = [
// //     { id: 'electric', label: '⚡ Electric Service', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400' },
// //     { id: 'water', label: '💧 Water Supply', url: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
// //     { id: 'plumbing', label: '🔧 Plumbing', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400' },
// //     { id: 'carpentry', label: '🪚 Carpentry', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400' },
// //     { id: 'painting', label: '🎨 Painting', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400' },
// //     { id: 'cleaning', label: '🧹 Cleaning', url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400' },
// //     { id: 'security', label: '🔒 Security', url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
// //     { id: 'landscaping', label: '🌿 Landscaping', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400' },
// //     { id: 'interior', label: '🛋️ Interior Design', url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400' },
// //     { id: 'renovation', label: '🔨 Renovation', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400' }
// //   ]

// //   const iconOptions = [
// //     { emoji: '⚡', label: 'Electric' },
// //     { emoji: '💧', label: 'Water' },
// //     { emoji: '🔧', label: 'Tools' },
// //     { emoji: '🏠', label: 'Home' },
// //     { emoji: '🔨', label: 'Construction' }
// //   ]

// //   useEffect(() => {
// //     if (service) {
// //       setFormData({
// //         title: service.title || '',
// //         description: service.description || '',
// //         icon: service.icon || '',
// //         image_url: service.image_url || '',
// //         features: service.features || [],
// //         isActive: service.is_active !== undefined ? service.is_active : true
// //       })
// //       if (service.icon && !service.image_url) {
// //         setSelectedType('icon')
// //       } else if (service.image_url) {
// //         setSelectedType('image')
// //       }
// //     }
// //   }, [service])

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     })
// //   }

// //   const handleAddFeature = () => {
// //     if (featureInput.trim()) {
// //       setFormData({
// //         ...formData,
// //         features: [...formData.features, featureInput.trim()]
// //       })
// //       setFeatureInput('')
// //     }
// //   }

// //   const handleRemoveFeature = (index) => {
// //     setFormData({
// //       ...formData,
// //       features: formData.features.filter((_, i) => i !== index)
// //     })
// //   }

// //   const handleSelectIcon = (emoji) => {
// //     setSelectedType('icon')
// //     setFormData({
// //       ...formData,
// //       icon: emoji,
// //       image_url: ''
// //     })
// //   }

// //   const handleSelectImage = (imageUrl) => {
// //     setSelectedType('image')
// //     setFormData({
// //       ...formData,
// //       image_url: imageUrl,
// //       icon: ''
// //     })
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setLoading(true)

// //     try {
// //       if (!formData.icon && !formData.image_url) {
// //         toast.error('❌ Please select either an icon or an image')
// //         setLoading(false)
// //         return
// //       }

// //       const data = {
// //         ...formData,
// //         features: formData.features
// //       }

// //       if (service) {
// //         await api.put(`/services/${service.id}`, data)
// //         toast.success('✅ Service updated successfully!')
// //       } else {
// //         await api.post('/services', data)
// //         toast.success('✅ Service created successfully!')
// //       }
      
// //       onClose()
// //     } catch (error) {
// //       console.error('Error saving service:', error)
// //       toast.error(error.response?.data?.message || '❌ Failed to save service')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="fixed inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/50 to-indigo-900/70 backdrop-blur-md flex items-center justify-center z-50 p-6">
// //       <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl border border-white max-w-5xl w-full max-h-[92vh] overflow-y-auto p-8 animate-[fadeIn_.25s_ease]">
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-8 pb-5 border-b border-blue-200">
// //           <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
// //             {service ? '✏️ Edit Service' : '➕ Add New Service'}
// //           </h2>
// //           <button 
// //             onClick={onClose} 
// //             className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
// //           >
// //             <X className="w-6 h-6" />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Title & Description Card */}
// //           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-1">
// //                 Service Title *
// //               </label>
// //               <input
// //                 type="text"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
// //                 placeholder="e.g., Residential Properties"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-1">
// //                 Description *
// //               </label>
// //               <textarea
// //                 name="description"
// //                 value={formData.description}
// //                 onChange={handleChange}
// //                 required
// //                 rows="3"
// //                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
// //                 placeholder="Describe the service..."
// //               />
// //             </div>
// //           </div>

// //           {/* Features Card */}
// //           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //             <label className="block text-sm font-semibold text-gray-700 mb-2">
// //               Features
// //             </label>
// //             <div className="flex gap-2">
// //               <input
// //                 type="text"
// //                 value={featureInput}
// //                 onChange={(e) => setFeatureInput(e.target.value)}
// //                 placeholder="Add a feature (e.g., 24/7 Support)"
// //                 className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
// //                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
// //               />
// //               <button
// //                 type="button"
// //                 onClick={handleAddFeature}
// //                 className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
// //               >
// //                 <Plus className="w-5 h-5" />
// //               </button>
// //             </div>
// //             {formData.features.length > 0 && (
// //               <div className="flex flex-wrap gap-2 mt-4">
// //                 {formData.features.map((feature, index) => (
// //                   <span
// //                     key={index}
// //                     className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full shadow-sm"
// //                   >
// //                     {feature}
// //                     <button
// //                       type="button"
// //                       onClick={() => handleRemoveFeature(index)}
// //                       className="text-red-500 hover:text-red-700 font-bold"
// //                     >
// //                       <Trash2 className="w-4 h-4" />
// //                     </button>
// //                   </span>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Display Type Selection Card */}
// //           <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200 rounded-2xl shadow-inner p-6">
// //             <label className="block text-sm font-semibold text-gray-700 mb-3">
// //               Choose Display Type *
// //             </label>
// //             <div className="flex gap-4 mb-5">
// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   setSelectedType('icon')
// //                   setFormData({ ...formData, image_url: '' })
// //                 }}
// //                 className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
// //                   selectedType === 'icon'
// //                     ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
// //                     : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
// //                 }`}
// //               >
// //                 <span className="text-xl">😊</span> Use Icon
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   setSelectedType('image')
// //                   setFormData({ ...formData, icon: '' })
// //                 }}
// //                 className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
// //                   selectedType === 'image'
// //                     ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
// //                     : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
// //                 }`}
// //               >
// //                 <ImageIcon className="w-5 h-5" /> Use Image
// //               </button>
// //             </div>

// //             {/* Icon Options */}
// //             {selectedType === 'icon' && (
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-3">
// //                   Choose an Icon (5 Fixed Options)
// //                 </label>
// //                 <div className="grid grid-cols-5 gap-3">
// //                   {iconOptions.map((icon) => (
// //                     <button
// //                       key={icon.emoji}
// //                       type="button"
// //                       onClick={() => handleSelectIcon(icon.emoji)}
// //                       className={`
// //                         p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl
// //                         ${
// //                           formData.icon === icon.emoji
// //                             ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 ring-4 ring-blue-200 shadow-xl'
// //                             : 'border-gray-200 bg-white hover:border-blue-300'
// //                         }
// //                       `}
// //                     >
// //                       <div className="text-5xl">{icon.emoji}</div>
// //                       <div className="text-xs text-gray-600 mt-1">{icon.label}</div>
// //                     </button>
// //                   ))}
// //                 </div>
// //                 {formData.icon && (
// //                   <p className="text-sm text-green-600 mt-3 flex items-center gap-1">
// //                     <CheckCircle className="w-4 h-4" /> Selected: {formData.icon}
// //                   </p>
// //                 )}
// //               </div>
// //             )}

// //             {/* Image Options */}
// //             {selectedType === 'image' && (
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-3">
// //                   Choose a Service Image
// //                 </label>
// //                 <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
// //                   {serviceImages.map((img) => (
// //                     <button
// //                       key={img.id}
// //                       type="button"
// //                       onClick={() => handleSelectImage(img.url)}
// //                       className={`
// //                         relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300
// //                         ${formData.image_url === img.url ? 'ring-4 ring-blue-500 border-2 border-blue-500' : 'border border-gray-200'}
// //                       `}
// //                     >
// //                       <img 
// //                         src={img.url} 
// //                         alt={img.label}
// //                         className="w-full h-28 object-cover"
// //                         onError={(e) => {
// //                           e.target.onerror = null
// //                           e.target.src = 'https://via.placeholder.com/100x80/cccccc/666666?text=No+Image'
// //                         }}
// //                       />
// //                       <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center truncate">
// //                         {img.label}
// //                       </div>
// //                     </button>
// //                   ))}
// //                 </div>
// //                 {formData.image_url && (
// //                   <div className="mt-4">
// //                     <p className="text-sm text-green-600 flex items-center gap-1">
// //                       <CheckCircle className="w-4 h-4" /> Image Selected
// //                     </p>
// //                     <img 
// //                       src={formData.image_url} 
// //                       alt="Selected" 
// //                       className="w-full max-w-md h-48 object-cover rounded-2xl shadow-xl border-4 border-white mt-2"
// //                       onError={(e) => {
// //                         e.target.onerror = null
// //                         e.target.src = 'https://via.placeholder.com/200x100/cccccc/666666?text=No+Image'
// //                       }}
// //                     />
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Active Status Card */}
// //           <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-5 shadow-sm border border-green-200">
// //             <label className="flex items-center gap-3 cursor-pointer">
// //               <input
// //                 type="checkbox"
// //                 checked={formData.isActive}
// //                 onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
// //                 className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
// //               />
// //               <span className="text-sm font-semibold text-gray-700">Active (visible on website)</span>
// //               {formData.isActive && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
// //             </label>
// //           </div>

// //           {/* Form Actions */}
// //           <div className="flex gap-3 pt-2">
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               {loading ? (
// //                 <span className="flex items-center justify-center gap-2">
// //                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
// //                   </svg>
// //                   Saving...
// //                 </span>
// //               ) : (
// //                 service ? 'Update Service' : 'Create Service'
// //               )}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ServiceForm



import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../../../services/api'
import {
  X, Plus, Trash2, Image as ImageIcon,
  CheckCircle, Zap, Droplet, Wrench,
  Home, Hammer, Smile
} from 'lucide-react'

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------
const ICON_OPTIONS = [
  { icon: <Zap className="w-8 h-8" />, label: 'Electric' },
  { icon: <Droplet className="w-8 h-8" />, label: 'Water' },
  { icon: <Wrench className="w-8 h-8" />, label: 'Tools' },
  { icon: <Home className="w-8 h-8" />, label: 'Home' },
  { icon: <Hammer className="w-8 h-8" />, label: 'Construction' },
]

const SERVICE_IMAGES = [
  { id: 'electric', label: '⚡ Electric Service', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400' },
  { id: 'water', label: '💧 Water Supply', url: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
  { id: 'plumbing', label: '🔧 Plumbing', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400' },
  { id: 'carpentry', label: '🪚 Carpentry', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400' },
  { id: 'painting', label: '🎨 Painting', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400' },
  { id: 'cleaning', label: '🧹 Cleaning', url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400' },
  { id: 'security', label: '🔒 Security', url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
  { id: 'landscaping', label: '🌿 Landscaping', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400' },
  { id: 'interior', label: '🛋️ Interior Design', url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400' },
  { id: 'renovation', label: '🔨 Renovation', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400' },
]

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
const ServiceForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    image_url: '',
    features: [],
    isActive: true,
  })
  const [loading, setLoading] = useState(false)
  const [featureInput, setFeatureInput] = useState('')
  const [displayType, setDisplayType] = useState('icon') // 'icon' | 'image'
  const [customImageUrl, setCustomImageUrl] = useState('') // for manual input

  // Pre‑fill form when editing
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        description: service.description || '',
        icon: service.icon || '',
        image_url: service.image_url || '',
        features: service.features || [],
        isActive: service.is_active !== undefined ? service.is_active : true,
      })
      // If there's an image_url, set display type to 'image' and pre‑fill custom input
      if (service.image_url) {
        setDisplayType('image')
        setCustomImageUrl(service.image_url)
      } else if (service.icon) {
        setDisplayType('icon')
      }
    }
  }, [service])

  // ----- Handlers -----
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddFeature = () => {
    const trimmed = featureInput.trim()
    if (trimmed && !formData.features.includes(trimmed)) {
      setFormData({
        ...formData,
        features: [...formData.features, trimmed],
      })
      setFeatureInput('')
    }
  }

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  // When selecting a predefined image
  const handleSelectImage = (url) => {
    setDisplayType('image')
    setFormData({ ...formData, image_url: url, icon: '' })
    setCustomImageUrl(url) // sync the input field
  }

  // When typing a custom image URL
  const handleCustomImageChange = (e) => {
    const url = e.target.value
    setCustomImageUrl(url)
    setFormData({ ...formData, image_url: url, icon: '' })
  }

  const handleSelectIcon = (iconValue) => {
    setDisplayType('icon')
    setFormData({ ...formData, icon: iconValue, image_url: '' })
    setCustomImageUrl('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate: at least one of icon or image_url must be set
      if (!formData.icon && !formData.image_url) {
        toast.error('❌ Please select either an icon or an image')
        setLoading(false)
        return
      }

      const payload = { ...formData, features: formData.features }

      if (service) {
        await api.put(`/services/${service.id}`, payload)
        toast.success('✅ Service updated successfully!')
      } else {
        await api.post('/services', payload)
        toast.success('✅ Service created successfully!')
      }

      onClose()
    } catch (error) {
      console.error('Error saving service:', error)
      toast.error(error.response?.data?.message || '❌ Failed to save service')
    } finally {
      setLoading(false)
    }
  }

  // ----- Render -----
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/50 to-indigo-900/70 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl border border-white max-w-5xl w-full max-h-[92vh] overflow-y-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-5 border-b border-blue-200">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            {service ? '✏️ Edit Service' : '➕ Add New Service'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ---- Title & Description ---- */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Service Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="e.g., Residential Properties"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="Describe the service..."
              />
            </div>
          </div>

          {/* ---- Features ---- */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Features
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature (e.g., 24/7 Support)"
                className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full shadow-sm"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ---- Display Type Selection ---- */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200 rounded-2xl shadow-inner p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Choose Display Type *
            </label>
            <div className="flex gap-4 mb-5">
              <button
                type="button"
                onClick={() => {
                  setDisplayType('icon')
                  setFormData({ ...formData, image_url: '' })
                  setCustomImageUrl('')
                }}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  displayType === 'icon'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Smile className="w-5 h-5" /> Use Icon
              </button>
              <button
                type="button"
                onClick={() => {
                  setDisplayType('image')
                  setFormData({ ...formData, icon: '' })
                }}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  displayType === 'image'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ImageIcon className="w-5 h-5" /> Use Image
              </button>
            </div>

            {/* ---- Icon Options ---- */}
            {displayType === 'icon' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose an Icon (5 Fixed Options)
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {ICON_OPTIONS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleSelectIcon(item.label.toLowerCase())}
                      className={`
                        p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl
                        ${
                          formData.icon === item.label.toLowerCase()
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 ring-4 ring-blue-200 shadow-xl'
                            : 'border-gray-200 bg-white hover:border-blue-300'
                        }
                      `}
                    >
                      <div className="flex justify-center text-blue-600">
                        {item.icon}
                      </div>
                      <div className="text-xs text-gray-600 mt-2 text-center">{item.label}</div>
                    </button>
                  ))}
                </div>
                {formData.icon && (
                  <p className="text-sm text-green-600 mt-3 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Selected: {formData.icon}
                  </p>
                )}
              </div>
            )}

            {/* ---- Image Options (Predefined + Custom URL) ---- */}
            {displayType === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose a Service Image
                </label>

                {/* Predefined image grid */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  {SERVICE_IMAGES.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => handleSelectImage(img.url)}
                      className={`
                        relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300
                        ${formData.image_url === img.url ? 'ring-4 ring-blue-500 border-2 border-blue-500' : 'border border-gray-200'}
                      `}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-28 object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = 'https://via.placeholder.com/100x80/cccccc/666666?text=No+Image'
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center truncate">
                        {img.label}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom URL input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Or enter a custom image URL
                  </label>
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={handleCustomImageChange}
                    placeholder="https://your-custom-image-url.com/image.jpg"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                  />
                </div>

                {/* Image preview */}
                {formData.image_url && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Image Selected
                    </p>
                    <img
                      src={formData.image_url}
                      alt="Selected"
                      className="w-full max-w-md h-48 object-cover rounded-2xl shadow-xl border-4 border-white mt-2"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/200x100/cccccc/666666?text=No+Image'
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ---- Active Status ---- */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-5 shadow-sm border border-green-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                Active (visible on website)
              </span>
              {formData.isActive && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
            </label>
          </div>

          {/* ---- Actions ---- */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Saving...
                </span>
              ) : (
                service ? 'Update Service' : 'Create Service'
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

export default ServiceForm