import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'

const AdminGallery = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    category: 'residential',
    type: 'image',
    description: ''
  })

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      setLoading(true)
      const response = await api.get('/gallery')
      console.log('Gallery API Response:', response.data) // Debug log
      setItems(response.data.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching gallery:', error)
      toast.error('Failed to load gallery')
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    
    try {
      await api.delete(`/gallery/${id}`)
      toast.success('✅ Gallery item deleted successfully!')
      fetchGalleryItems()
    } catch (error) {
      toast.error('❌ Failed to delete item')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingItem) {
        await api.put(`/gallery/${editingItem.id}`, formData)
        toast.success('✅ Gallery item updated successfully!')
      } else {
        await api.post('/gallery', formData)
        toast.success('✅ Gallery item added successfully!')
      }
      setShowForm(false)
      setEditingItem(null)
      setFormData({ title: '', image_url: '', category: 'residential', type: 'image', description: '' })
      fetchGalleryItems()
    } catch (error) {
      console.error('Error saving gallery item:', error)
      toast.error('❌ Failed to save gallery item')
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      image_url: item.image_url || '',
      category: item.category || 'residential',
      type: item.type || 'image',
      description: item.description || ''
    })
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Gallery</h2>
          <p className="text-gray-600 text-sm">Total: {items.length} items</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null)
            setFormData({ title: '', image_url: '', category: 'residential', type: 'image', description: '' })
            setShowForm(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">➕</span>
          Add Image
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">
            {editingItem ? '✏️ Edit Gallery Item' : '➕ Add New Gallery Item'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Luxury Villa Exterior"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                  <option value="amenities">Amenities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="image">📸 Image</option>
                  <option value="video">🎥 Video</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the image"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingItem ? 'Update' : 'Add'} Gallery Item
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingItem(null)
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-gray-500 text-lg">No gallery items found</p>
          <p className="text-gray-400 text-sm">Click "Add Image" to add your first gallery item</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200">
                <img
                  src={item.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'
                  }}
                />
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{item.category}</span>
                  <span className="text-xs text-gray-400">{item.type}</span>
                </div>
                <div className="flex gap-2 mt-2 pt-2 border-t">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminGallery




