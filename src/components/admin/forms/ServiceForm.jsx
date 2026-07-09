import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../../../services/api'

const ServiceForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    image_url: '',
    features: [],
    isActive: true
  })
  const [loading, setLoading] = useState(false)
  const [featureInput, setFeatureInput] = useState('')
  const [selectedType, setSelectedType] = useState('icon') // 'icon' or 'image'

  // Fixed Service Images (Admin can choose from these)
  const serviceImages = [
    { 
      id: 'electric', 
      label: '⚡ Electric Service', 
      url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
      category: 'electric'
    },
    { 
      id: 'water', 
      label: '💧 Water Supply', 
      url: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
      category: 'water'
    },
    { 
      id: 'plumbing', 
      label: '🔧 Plumbing', 
      url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400',
      category: 'plumbing'
    },
    { 
      id: 'carpentry', 
      label: '🪚 Carpentry', 
      url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
      category: 'carpentry'
    },
    { 
      id: 'painting', 
      label: '🎨 Painting', 
      url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
      category: 'painting'
    },
    { 
      id: 'cleaning', 
      label: '🧹 Cleaning', 
      url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400',
      category: 'cleaning'
    },
    { 
      id: 'security', 
      label: '🔒 Security', 
      url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400',
      category: 'security'
    },
    { 
      id: 'landscaping', 
      label: '🌿 Landscaping', 
      url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
      category: 'landscaping'
    },
    { 
      id: 'interior', 
      label: '🛋️ Interior Design', 
      url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400',
      category: 'interior'
    },
    { 
      id: 'renovation', 
      label: '🔨 Renovation', 
      url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400',
      category: 'renovation'
    }
  ]

  // Fixed Emoji Icons (5 options)
  const iconOptions = [
    { emoji: '⚡', label: 'Electric' },
    { emoji: '💧', label: 'Water' },
    { emoji: '🔧', label: 'Tools' },
    { emoji: '🏠', label: 'Home' },
    { emoji: '🔨', label: 'Construction' }
  ]

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        description: service.description || '',
        icon: service.icon || '',
        image_url: service.image_url || '',
        features: service.features || [],
        isActive: service.is_active !== undefined ? service.is_active : true
      })
      // Determine if service uses icon or image
      if (service.icon && !service.image_url) {
        setSelectedType('icon')
      } else if (service.image_url) {
        setSelectedType('image')
      }
    }
  }, [service])

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

  const handleSelectIcon = (emoji) => {
    setSelectedType('icon')
    setFormData({
      ...formData,
      icon: emoji,
      image_url: '' // Clear image when icon is selected
    })
  }

  const handleSelectImage = (imageUrl) => {
    setSelectedType('image')
    setFormData({
      ...formData,
      image_url: imageUrl,
      icon: '' // Clear icon when image is selected
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate: Either icon or image must be selected
      if (!formData.icon && !formData.image_url) {
        toast.error('❌ Please select either an icon or an image')
        setLoading(false)
        return
      }

      const data = {
        ...formData,
        features: formData.features
      }

      if (service) {
        await api.put(`/services/${service.id}`, data)
        toast.success('✅ Service updated successfully!')
      } else {
        await api.post('/services', data)
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {service ? '✏️ Edit Service' : '➕ Add New Service'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Residential Properties"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the service..."
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature (e.g., 24/7 Support)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* SELECTION TYPE - Choose Icon or Image */}
          <div className="border rounded-lg p-4 bg-blue-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Display Type *
            </label>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedType('icon')
                  setFormData({ ...formData, image_url: '' })
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === 'icon' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                😊 Use Icon
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedType('image')
                  setFormData({ ...formData, icon: '' })
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === 'image' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🖼️ Use Image
              </button>
            </div>

            {/* FIXED ICON OPTIONS - 5 Options */}
            {selectedType === 'icon' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose an Icon (5 Fixed Options)
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon.emoji}
                      type="button"
                      onClick={() => handleSelectIcon(icon.emoji)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.icon === icon.emoji
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                          : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-4xl">{icon.emoji}</div>
                      <div className="text-xs text-gray-600 mt-1">{icon.label}</div>
                    </button>
                  ))}
                </div>
                {formData.icon && (
                  <p className="text-sm text-green-600 mt-2">
                    ✅ Selected: {formData.icon}
                  </p>
                )}
              </div>
            )}

            {/* FIXED IMAGE OPTIONS - 10+ Options */}
            {selectedType === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a Service Image
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {serviceImages.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => handleSelectImage(img.url)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                        formData.image_url === img.url
                          ? 'border-blue-500 ring-2 ring-blue-500'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img 
                        src={img.url} 
                        alt={img.label}
                        className="w-full h-20 object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = 'https://via.placeholder.com/100x80/cccccc/666666?text=No+Image'
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 text-center truncate">
                        {img.label}
                      </div>
                    </button>
                  ))}
                </div>
                {formData.image_url && (
                  <div className="mt-3">
                    <p className="text-sm text-green-600">✅ Image Selected</p>
                    <img 
                      src={formData.image_url} 
                      alt="Selected" 
                      className="h-24 object-cover rounded-lg mt-2"
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

          {/* Active Status */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Active (visible on website)</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                service ? 'Update Service' : 'Create Service'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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







