


import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { 
  Plus, 
  Image as ImageIcon, 
  Edit, 
  Trash2, 
  X, 
  Check, 
  // FolderOpen,
  // Home,
  // Building2,
  // Layout,
  // Trees,
  // Video,
  // Camera
} from 'lucide-react'

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
      console.log('Gallery API Response:', response.data)
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
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
      {/* Header */}
      <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl p-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <ImageIcon className="h-8 w-8 text-blue-600" />
            Gallery Management
          </h2>
          <p className="text-gray-500 mt-1">Manage all gallery images and videos</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null)
            setFormData({
              title: '',
              image_url: '',
              category: 'residential',
              type: 'image',
              description: ''
            })
            setShowForm(true)
          }}
          className="mt-4 md:mt-0 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Gallery Item
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            {editingItem ? <Edit className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                placeholder="e.g., Luxury Villa Exterior"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL *</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition outline-none"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                  <option value="amenities">Amenities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition outline-none"
                >
                  <option value="image">📸 Image</option>
                  <option value="video">🎥 Video</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="2"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition outline-none"
                placeholder="Brief description of the image"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
              >
                <Check className="h-5 w-5" />
                {editingItem ? 'Update' : 'Add'} Gallery Item
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingItem(null)
                }}
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition flex items-center gap-2"
              >
                <X className="h-5 w-5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      {items.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 py-20 text-center">
          <div className="text-7xl mb-4 flex justify-center">
            <ImageIcon className="h-24 w-24 text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700">Gallery is Empty</h3>
          <p className="text-slate-500 mt-2">Upload your first gallery image to showcase your projects.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase ${
                    item.type === 'image' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-slate-800 text-lg truncate">{item.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium capitalize">
                    {item.category}
                  </span>
                </div>
                {item.description && (
                  <p className="text-sm text-slate-500 truncate mt-1">{item.description}</p>
                )}
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition font-medium flex items-center justify-center gap-1"
                  >
                    <Edit className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 py-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition font-medium flex items-center justify-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
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