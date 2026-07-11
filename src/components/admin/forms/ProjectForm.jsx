


import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../../../services/api'
import { X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react'

const ProjectForm = ({ project, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    image: '',
    status: 'available',
    category: 'residential',
    features: [],
    bedrooms: '',
    bathrooms: '',
    area: ''
  })
  const [loading, setLoading] = useState(false)
  const [featureInput, setFeatureInput] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        price: project.price?.toString() || '',
        location: project.location || '',
        image: project.image || '',
        status: project.status || 'available',
        category: project.category || 'residential',
        features: project.features || [],
        bedrooms: project.bedrooms?.toString() || '',
        bathrooms: project.bathrooms?.toString() || '',
        area: project.area || ''
      })
      if (project.image) {
        setImagePreview(project.image)
      }
    }
  }, [project])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      })
      setFeatureInput('')
    }
  }

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      // We'll send the actual file via FormData, so we don't need to store filename here
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Use FormData to support file upload
      const submitData = new FormData()

      // Append all text fields
      submitData.append('name', formData.name)
      submitData.append('description', formData.description)
      submitData.append('price', formData.price)
      submitData.append('location', formData.location)
      submitData.append('status', formData.status)
      submitData.append('category', formData.category)
      submitData.append('bedrooms', formData.bedrooms || '')
      submitData.append('bathrooms', formData.bathrooms || '')
      submitData.append('area', formData.area || '')
      submitData.append('features', JSON.stringify(formData.features))

      // If there's a new image file, append it
      if (imageFile) {
        submitData.append('image', imageFile)
      } else if (formData.image) {
        // If no new file but we have an existing image URL, send it as a string
        submitData.append('existingImage', formData.image)
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      if (project) {
        await api.put(`/projects/${project.id}`, submitData, config)
        toast.success('✅ Project updated successfully!')
      } else {
        await api.post('/projects', submitData, config)
        toast.success('✅ Project created successfully!')
      }
      
      onClose()
    } catch (error) {
      console.error('Error saving project:', error)
      toast.error(error.response?.data?.message || '❌ Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  // Unsplash image suggestions
  const unsplashImages = [
    { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', label: 'Luxury Villa' },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', label: 'Modern House' },
    { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600', label: 'Apartment Building' },
    { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600', label: 'Luxury Home' },
    { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600', label: 'Modern Villa' },
    { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600', label: 'Contemporary House' },
  ]

  const selectUnsplashImage = (url) => {
    // When selecting an Unsplash image, we treat it as a URL (not a file)
    setImageFile(null) // clear any file selection
    setFormData({
      ...formData,
      image: url
    })
    setImagePreview(url)
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-slate-900/60 to-blue-900/60 backdrop-blur-md flex items-center justify-center z-50 p-5">
      <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl border border-white max-w-5xl w-full max-h-[92vh] overflow-y-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-5 border-b border-blue-200">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            {project ? '✏️ Edit Project' : '🏗️ Add New Project'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="e.g., Luxury Villa in Juhu"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="e.g., Mumbai"
              />
            </div>
          </div>

          {/* Description */}
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
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
              placeholder="Describe the property..."
            />
          </div>

          {/* Price, Area, Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="25000000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Area (sq ft)
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="2500 sq ft"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Image URL (optional)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-blue-300 rounded-2xl p-6 bg-blue-50/30 hover:border-blue-500 hover:bg-blue-50 transition">
            <label className="block cursor-pointer">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto text-blue-400 mb-3" />
                <p className="font-semibold text-gray-700">Upload Project Image</p>
                <p className="text-gray-500 text-sm">Click here to choose an image (JPG, PNG, WebP)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Project preview"
                className="w-full h-72 object-cover rounded-2xl shadow-xl border-4 border-white"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null)
                  setImageFile(null)
                  setFormData({ ...formData, image: '' })
                }}
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Unsplash Image Suggestions */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-3">Or choose from suggested images:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {unsplashImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectUnsplashImage(img.url)}
                  className="relative h-20 rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  <img 
                    src={img.url} 
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Status and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="4"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                placeholder="3"
                min="0"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Features
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature (e.g., Swimming Pool)"
                className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
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
              <div className="flex flex-wrap gap-2 mt-3">
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

          {/* Form Actions */}
          <div className="flex gap-3 pt-5 border-t border-blue-200 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                project ? 'Update Project' : 'Create Project'
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

export default ProjectForm

