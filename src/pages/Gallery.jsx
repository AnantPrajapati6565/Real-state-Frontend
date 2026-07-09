import { useState, useEffect } from 'react'
import api from '../services/api'

const Gallery = () => {

  // STATE

  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [categories, setCategories] = useState(['all'])


  // EFFECT - Fetch on mount (Bulletproof Pattern)

  useEffect(() => {
    // 1. Define the async function INSIDE the effect
    const fetchGallery = async () => {
      try {
        const response = await api.get('/gallery')
        const items = response.data.data || []
        
        // 2. All state updates happen AFTER the await (asynchronously)
        setGalleryItems(items)
        
        const uniqueCategories = [...new Set(
          items
            .map(item => item?.category || 'uncategorized')
            .filter(cat => cat && cat !== 'null' && cat !== 'undefined')
        )]
        setCategories(['all', ...uniqueCategories])
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching gallery:', error)
        setLoading(false)
      }
    }

    // 3. Call it immediately
    fetchGallery()
  }, []) // ✅ Empty array means this runs exactly once, safely.


  // FILTER ITEMS

  const getFilteredItems = () => {
    if (activeTab === 'all') return galleryItems
    if (activeTab === 'images') return galleryItems.filter(item => item?.type === 'image')
    if (activeTab === 'videos') return galleryItems.filter(item => item?.type === 'video')
    return galleryItems.filter(item => item?.category === activeTab)
  }

  const filteredItems = getFilteredItems()

  // LOADING SCREEN
 
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </div>
    )
  }

  // MAIN UI

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Explore our collection of property images, videos, and virtual tours
      </p>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category === 'all' ? 'All' : 
             category === 'images' ? 'Images' :
             category === 'videos' ? 'Videos' :
             `${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No gallery items found</p>
          <p className="text-gray-400 text-sm">Check back later for new images</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => {
                if (item?.type === 'image') {
                  setSelectedImage(item)
                } else {
                  window.open(item?.image_url, '_blank')
                }
              }}
            >
              <div className="relative h-56 overflow-hidden">
                {item?.type === 'video' ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-sm font-medium">{item?.title || 'Video'}</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item?.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'}
                    alt={item?.title || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'
                    }}
                  />
                )}
                {item?.category && (
                  <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{item?.title || 'Untitled'}</h3>
                {item?.description && (
                  <p className="text-sm text-gray-500 truncate">{item.description}</p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {item?.type === 'video' ? 'Video' : 'Image'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title || 'Gallery image'}
                className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Found'
                }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedImage.title || 'Untitled'}</h2>
              {selectedImage.description && (
                <p className="text-gray-600 mb-2">{selectedImage.description}</p>
              )}
              <div className="flex gap-4 text-sm text-gray-500">
                <span>Category: {selectedImage.category || 'Uncategorized'}</span>
                <span>Type: {selectedImage.type || 'image'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery










// import { useState, useEffect, useCallback } from 'react'
// import api from '../services/api'

// const Gallery = () => {
//   // ============================================
//   // STATE
//   // ============================================
//   const [galleryItems, setGalleryItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedImage, setSelectedImage] = useState(null)
//   const [categories, setCategories] = useState(['all'])

//   // ============================================
//   // FETCH DATA - using useCallback
//   // ============================================
//   const fetchGalleryItems = useCallback(async () => {
//     try {
//       const response = await api.get('/gallery')
//       const items = response.data.data || []
//       setGalleryItems(items)
      
//       // Extract unique categories
//       const uniqueCategories = [...new Set(
//         items
//           .map(item => item?.category || 'uncategorized')
//           .filter(cat => cat && cat !== 'null' && cat !== 'undefined')
//       )]
//       setCategories(['all', ...uniqueCategories])
      
//       setLoading(false)
//     } catch (error) {
//       console.error('Error fetching gallery:', error)
//       setLoading(false)
//     }
//   }, [])

//   // ============================================
//   // EFFECT - Fetch on mount
//   // ============================================
//   useEffect(() => {
//     fetchGalleryItems()
//   }, [fetchGalleryItems])

//   // ============================================
//   // FILTER ITEMS
//   // ============================================
//   const getFilteredItems = () => {
//     if (activeTab === 'all') return galleryItems
//     if (activeTab === 'images') return galleryItems.filter(item => item?.type === 'image')
//     if (activeTab === 'videos') return galleryItems.filter(item => item?.type === 'video')
//     return galleryItems.filter(item => item?.category === activeTab)
//   }

//   const filteredItems = getFilteredItems()

//   // ============================================
//   // LOADING SCREEN
//   // ============================================
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-16">
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading gallery...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // MAIN UI
//   // ============================================
//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
//       <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//         Explore our collection of property images, videos, and virtual tours
//       </p>

//       {/* Category Filter Tabs */}
//       <div className="flex flex-wrap justify-center gap-2 mb-8">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setActiveTab(category)}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//               activeTab === category
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             {category === 'all' ? 'All' : 
//              category === 'images' ? 'Images' :
//              category === 'videos' ? 'Videos' :
//              `${category.charAt(0).toUpperCase() + category.slice(1)}`}
//           </button>
//         ))}
//       </div>

//       {/* Gallery Grid */}
//       {filteredItems.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No gallery items found</p>
//           <p className="text-gray-400 text-sm">Check back later for new images</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredItems.map((item) => (
//             <div
//               key={item.id}
//               className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
//               onClick={() => {
//                 if (item?.type === 'image') {
//                   setSelectedImage(item)
//                 } else {
//                   window.open(item?.image_url, '_blank')
//                 }
//               }}
//             >
//               <div className="relative h-56 overflow-hidden">
//                 {item?.type === 'video' ? (
//                   <div className="w-full h-full bg-gray-800 flex items-center justify-center">
//                     <div className="text-center text-white">
//                       <p className="text-sm font-medium">{item?.title || 'Video'}</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <img
//                     src={item?.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'}
//                     alt={item?.title || 'Gallery image'}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     onError={(e) => {
//                       e.target.onerror = null
//                       e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'
//                     }}
//                   />
//                 )}
//                 {item?.category && (
//                   <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
//                     {item.category}
//                   </span>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-900 truncate">{item?.title || 'Untitled'}</h3>
//                 {item?.description && (
//                   <p className="text-sm text-gray-500 truncate">{item.description}</p>
//                 )}
//                 <div className="mt-2 flex items-center gap-2">
//                   <span className="text-xs text-gray-400">
//                     {item?.type === 'video' ? 'Video' : 'Image'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Image Lightbox Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div
//             className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="relative">
//               <img
//                 src={selectedImage.image_url}
//                 alt={selectedImage.title || 'Gallery image'}
//                 className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
//                 onError={(e) => {
//                   e.target.onerror = null
//                   e.target.src = 'https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Found'
//                 }}
//               />
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors text-2xl"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="p-6">
//               <h2 className="text-2xl font-bold mb-2">{selectedImage.title || 'Untitled'}</h2>
//               {selectedImage.description && (
//                 <p className="text-gray-600 mb-2">{selectedImage.description}</p>
//               )}
//               <div className="flex gap-4 text-sm text-gray-500">
//                 <span>Category: {selectedImage.category || 'Uncategorized'}</span>
//                 <span>Type: {selectedImage.type || 'image'}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Gallery





// import { useState, useEffect, useCallback } from 'react'
// import api from '../services/api'

// const Gallery = () => {
//   // ============================================
//   // STATE
//   // ============================================
//   const [galleryItems, setGalleryItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedImage, setSelectedImage] = useState(null)
//   const [categories, setCategories] = useState(['all'])

//   // ============================================
//   // FETCH DATA - using useCallback
//   // ============================================
//   const fetchGalleryItems = useCallback(async () => {
//     try {
//       setLoading(true)
//       const response = await api.get('/gallery')
//       const items = response.data.data || []
//       setGalleryItems(items)
      
//       // Extract unique categories
//       const uniqueCategories = [...new Set(
//         items
//           .map(item => item?.category || 'uncategorized')
//           .filter(cat => cat && cat !== 'null' && cat !== 'undefined')
//       )]
//       setCategories(['all', ...uniqueCategories])
      
//       setLoading(false)
//     } catch (error) {
//       console.error('Error fetching gallery:', error)
//       setLoading(false)
//     }
//   }, [])  // ✅ Empty array = function never changes

//   // ============================================
//   // EFFECT - Fetch on mount
//   // ============================================
//   useEffect(() => {
//     fetchGalleryItems()
//   }, [fetchGalleryItems])  // ✅ Now safe

//   // ============================================
//   // FILTER ITEMS
//   // ============================================
//   const getFilteredItems = () => {
//     if (activeTab === 'all') return galleryItems
//     if (activeTab === 'images') return galleryItems.filter(item => item?.type === 'image')
//     if (activeTab === 'videos') return galleryItems.filter(item => item?.type === 'video')
//     return galleryItems.filter(item => item?.category === activeTab)
//   }

//   const filteredItems = getFilteredItems()

//   // ============================================
//   // LOADING SCREEN
//   // ============================================
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-16">
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading gallery...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // MAIN UI
//   // ============================================
//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
//       <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//         Explore our collection of property images, videos, and virtual tours
//       </p>

//       {/* Category Filter Tabs */}
//       <div className="flex flex-wrap justify-center gap-2 mb-8">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setActiveTab(category)}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//               activeTab === category
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             {category === 'all' ? 'All' : 
//              category === 'images' ? 'Images' :
//              category === 'videos' ? 'Videos' :
//              `${category.charAt(0).toUpperCase() + category.slice(1)}`}
//           </button>
//         ))}
//       </div>

//       {/* Gallery Grid */}
//       {filteredItems.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No gallery items found</p>
//           <p className="text-gray-400 text-sm">Check back later for new images</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredItems.map((item) => (
//             <div
//               key={item.id}
//               className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
//               onClick={() => {
//                 if (item?.type === 'image') {
//                   setSelectedImage(item)
//                 } else {
//                   window.open(item?.image_url, '_blank')
//                 }
//               }}
//             >
//               <div className="relative h-56 overflow-hidden">
//                 {item?.type === 'video' ? (
//                   <div className="w-full h-full bg-gray-800 flex items-center justify-center">
//                     <div className="text-center text-white">
//                       <p className="text-sm font-medium">{item?.title || 'Video'}</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <img
//                     src={item?.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'}
//                     alt={item?.title || 'Gallery image'}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     onError={(e) => {
//                       e.target.onerror = null
//                       e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'
//                     }}
//                   />
//                 )}
//                 {item?.category && (
//                   <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
//                     {item.category}
//                   </span>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-900 truncate">{item?.title || 'Untitled'}</h3>
//                 {item?.description && (
//                   <p className="text-sm text-gray-500 truncate">{item.description}</p>
//                 )}
//                 <div className="mt-2 flex items-center gap-2">
//                   <span className="text-xs text-gray-400">
//                     {item?.type === 'video' ? 'Video' : 'Image'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Image Lightbox Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div
//             className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="relative">
//               <img
//                 src={selectedImage.image_url}
//                 alt={selectedImage.title || 'Gallery image'}
//                 className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
//                 onError={(e) => {
//                   e.target.onerror = null
//                   e.target.src = 'https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Found'
//                 }}
//               />
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors text-2xl"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="p-6">
//               <h2 className="text-2xl font-bold mb-2">{selectedImage.title || 'Untitled'}</h2>
//               {selectedImage.description && (
//                 <p className="text-gray-600 mb-2">{selectedImage.description}</p>
//               )}
//               <div className="flex gap-4 text-sm text-gray-500">
//                 <span>Category: {selectedImage.category || 'Uncategorized'}</span>
//                 <span>Type: {selectedImage.type || 'image'}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Gallery













// import { useState, useEffect, useCallback } from 'react'
// import api from '../services/api'

// // ============================================
// // MAIN COMPONENT
// // ============================================
// const Gallery = () => {
//   // ============================================
//   // STATE MANAGEMENT
//   // ============================================
//   const [galleryItems, setGalleryItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedImage, setSelectedImage] = useState(null)
//   const [categories, setCategories] = useState(['all'])
//   const [error, setError] = useState(null)

//   // ============================================
//   // FETCH DATA - Using useCallback for stability
//   // ============================================
//   const fetchGalleryItems = useCallback(async () => {
//     try {
//       setLoading(true)
//       setError(null)
      
//       const response = await api.get('/gallery')
//       const items = response.data.data || []
      
//       setGalleryItems(items)
      
//       // Extract unique categories safely
//       const uniqueCategories = [...new Set(
//         items
//           .map(item => item?.category || 'uncategorized')
//           .filter(cat => cat && cat !== 'null' && cat !== 'undefined')
//       )]
//       setCategories(['all', ...uniqueCategories])
      
//     } catch (error) {
//       console.error('Error fetching gallery:', error)
//       setError('Failed to load gallery. Please try again later.')
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   // ============================================
//   // EFFECT - Fetch on mount
//   // ============================================
//   useEffect(() => {
//     fetchGalleryItems()
//   }, [fetchGalleryItems])

//   // ============================================
//   // FILTER ITEMS - Based on active tab
//   // ============================================
//   const getFilteredItems = useCallback(() => {
//     if (activeTab === 'all') return galleryItems
//     if (activeTab === 'images') return galleryItems.filter(item => item?.type === 'image')
//     if (activeTab === 'videos') return galleryItems.filter(item => item?.type === 'video')
//     return galleryItems.filter(item => item?.category === activeTab)
//   }, [activeTab, galleryItems])

//   const filteredItems = getFilteredItems()

//   // ============================================
//   // HANDLE IMAGE CLICK
//   // ============================================
//   const handleItemClick = useCallback((item) => {
//     if (item?.type === 'image') {
//       setSelectedImage(item)
//     } else if (item?.type === 'video') {
//       window.open(item?.image_url, '_blank')
//     }
//   }, [])

//   // ============================================
//   // CLOSE LIGHTBOX
//   // ============================================
//   const closeLightbox = useCallback(() => {
//     setSelectedImage(null)
//   }, [])

//   // ============================================
//   // LOADING SCREEN
//   // ============================================
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-16">
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading gallery...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // ERROR SCREEN
//   // ============================================
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchGalleryItems}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // MAIN UI
//   // ============================================
//   return (
//     <div className="container mx-auto px-4 py-16">
//       {/* HEADER */}
//       <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
//       <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//         Explore our collection of property images, videos, and virtual tours
//       </p>

//       {/* CATEGORY FILTER TABS */}
//       <div className="flex flex-wrap justify-center gap-2 mb-8">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setActiveTab(category)}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//               activeTab === category
//                 ? 'bg-blue-600 text-white shadow-md'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//             aria-pressed={activeTab === category}
//           >
//             {category === 'all' ? 'All' : 
//              category === 'images' ? 'Images' :
//              category === 'videos' ? 'Videos' :
//              `${category.charAt(0).toUpperCase() + category.slice(1)}`}
//           </button>
//         ))}
//       </div>

//       {/* GALLERY GRID */}
//       {filteredItems.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No gallery items found</p>
//           <p className="text-gray-400 text-sm">Check back later for new images</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredItems.map((item) => (
//             <GalleryCard
//               key={item.id}
//               item={item}
//               onClick={handleItemClick}
//             />
//           ))}
//         </div>
//       )}

//       {/* IMAGE LIGHTBOX */}
//       {selectedImage && (
//         <Lightbox
//           image={selectedImage}
//           onClose={closeLightbox}
//         />
//       )}
//     </div>
//   )
// }

// // ============================================
// // SUB-COMPONENT: Gallery Card
// // ============================================
// const GalleryCard = ({ item, onClick }) => {
//   const [imageError, setImageError] = useState(false)

//   const handleClick = () => {
//     onClick(item)
//   }

//   return (
//     <div
//       className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
//       onClick={handleClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' || e.key === 'Space') {
//           handleClick()
//         }
//       }}
//     >
//       {/* THUMBNAIL */}
//       <div className="relative h-56 overflow-hidden">
//         {item?.type === 'video' ? (
//           <div className="w-full h-full bg-gray-800 flex items-center justify-center">
//             <div className="text-center text-white">
//               <p className="text-sm font-medium">{item?.title || 'Video'}</p>
//             </div>
//           </div>
//         ) : (
//           <img
//             src={imageError ? 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image' : (item?.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image')}
//             alt={item?.title || 'Gallery image'}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//             onError={() => setImageError(true)}
//             loading="lazy"
//           />
//         )}
        
//         {/* CATEGORY BADGE */}
//         {item?.category && (
//           <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
//             {item.category}
//           </span>
//         )}
//       </div>

//       {/* DETAILS */}
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-900 truncate">{item?.title || 'Untitled'}</h3>
//         {item?.description && (
//           <p className="text-sm text-gray-500 truncate">{item.description}</p>
//         )}
//         <div className="mt-2 flex items-center gap-2">
//           <span className="text-xs text-gray-400">
//             {item?.type === 'video' ? 'Video' : 'Image'}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ============================================
// // SUB-COMPONENT: Lightbox
// // ============================================
// const Lightbox = ({ image, onClose }) => {
//   const [imageError, setImageError] = useState(false)

//   // Close on Escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         onClose()
//       }
//     }
//     document.addEventListener('keydown', handleEscape)
//     return () => document.removeEventListener('keydown', handleEscape)
//   }, [onClose])

//   // Prevent body scroll when lightbox is open
//   useEffect(() => {
//     document.body.style.overflow = 'hidden'
//     return () => {
//       document.body.style.overflow = 'unset'
//     }
//   }, [])

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//       aria-label="Image viewer"
//     >
//       <div
//         className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="relative">
//           <img
//             src={imageError ? 'https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Found' : image.image_url}
//             alt={image.title || 'Gallery image'}
//             className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
//             onError={() => setImageError(true)}
//           />
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors text-2xl"
//             aria-label="Close image viewer"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-2">{image.title || 'Untitled'}</h2>
//           {image.description && (
//             <p className="text-gray-600 mb-2">{image.description}</p>
//           )}
//           <div className="flex gap-4 text-sm text-gray-500">
//             <span>Category: {image.category || 'Uncategorized'}</span>
//             <span>Type: {image.type || 'image'}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Gallery







// // // ============================================
// // // IMPORTS - What we need to make this work
// // // ============================================
// // import { useState, useEffect } from 'react'
// // import api from '../services/api'

// // // ============================================
// // // MAIN COMPONENT - Displays image/video gallery
// // // ============================================
// // const Gallery = () => {
// //   // ============================================
// //   // STATE - Data that changes over time
// //   // ============================================
// //   const [galleryItems, setGalleryItems] = useState([])  // All gallery items
// //   const [loading, setLoading] = useState(true)          // Loading state
// //   const [activeTab, setActiveTab] = useState('all')     // Current filter
// //   const [selectedImage, setSelectedImage] = useState(null) // For lightbox
// //   const [categories, setCategories] = useState(['all']) // Unique categories

// //   // ============================================
// //   // EFFECT - Runs when component loads
// //   // ============================================
// //   useEffect(() => {
// //     fetchGalleryItems()  // Get data from backend
// //   }, [])  // Empty array = runs once

// //   // ============================================
// //   // FETCH DATA - Gets gallery from backend
// //   // ============================================
// //   const fetchGalleryItems = async () => {
// //     try {
// //       setLoading(true)
// //       const response = await api.get('/gallery')        // GET request
// //       const items = response.data.data || []           // Get items array
// //       setGalleryItems(items)                           // Store in state
      
// //       // Extract unique categories from items
// //       const uniqueCategories = [...new Set(
// //         items
// //           .map(item => item?.category || 'uncategorized')  // Get category
// //           .filter(cat => cat && cat !== 'null' && cat !== 'undefined')  // Remove bad values
// //       )]
// //       setCategories(['all', ...uniqueCategories])       // Set categories for filter
      
// //       setLoading(false)
// //     } catch (error) {
// //       console.error('Error fetching gallery:', error)
// //       setLoading(false)
// //     }
// //   }

// //   // ============================================
// //   // FILTER ITEMS - Based on selected tab
// //   // ============================================
// //   const getFilteredItems = () => {
// //     if (activeTab === 'all') return galleryItems           // Show all
// //     if (activeTab === 'images') return galleryItems.filter(item => item?.type === 'image')  // Only images
// //     if (activeTab === 'videos') return galleryItems.filter(item => item?.type === 'video')  // Only videos
// //     return galleryItems.filter(item => item?.category === activeTab)  // Filter by category
// //   }

// //   const filteredItems = getFilteredItems()  // Get filtered items

// //   // ============================================
// //   // LOADING SCREEN - Shows while data loads
// //   // ============================================
// //   if (loading) {
// //     return (
// //       <div className="container mx-auto px-4 py-16">
// //         <div className="flex justify-center items-center min-h-[400px]">
// //           <div className="text-center">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //             <p className="text-gray-600">Loading gallery...</p>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   // ============================================
// //   // MAIN UI - Renders when data is ready
// //   // ============================================
// //   return (
// //     <div className="container mx-auto px-4 py-16">
// //       {/* HEADER */}
// //       <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
// //       <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
// //         Explore our collection of property images, videos, and virtual tours
// //       </p>

// //       {/* CATEGORY FILTER TABS */}
// //       <div className="flex flex-wrap justify-center gap-2 mb-8">
// //         {categories.map((category) => (
// //           <button
// //             key={category}
// //             onClick={() => setActiveTab(category)}
// //             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
// //               activeTab === category
// //                 ? 'bg-blue-600 text-white'    // Active tab
// //                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'  // Inactive tab
// //             }`}
// //           >
// //             {category === 'all' ? '📸 All' : 
// //              category === 'images' ? '🖼️ Images' :
// //              category === 'videos' ? '🎥 Videos' :
// //              `📁 ${category.charAt(0).toUpperCase() + category.slice(1)}`}
// //           </button>
// //         ))}
// //       </div>

// //       {/* GALLERY GRID */}
// //       {filteredItems.length === 0 ? (
// //         <div className="text-center py-12">
// //           <div className="text-6xl mb-4">🖼️</div>
// //           <p className="text-gray-500 text-lg">No gallery items found</p>
// //           <p className="text-gray-400 text-sm">Check back later for new images</p>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {filteredItems.map((item) => (
// //             <div
// //               key={item.id}
// //               className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
// //               onClick={() => {
// //                 if (item?.type === 'image') {
// //                   setSelectedImage(item)  // Open lightbox for images
// //                 } else {
// //                   window.open(item?.image_url, '_blank')  // Open video in new tab
// //                 }
// //               }}
// //             >
// //               {/* IMAGE/VIDEO THUMBNAIL */}
// //               <div className="relative h-56 overflow-hidden">
// //                 {item?.type === 'video' ? (
// //                   <div className="w-full h-full bg-gray-800 flex items-center justify-center">
// //                     <div className="text-center text-white">
// //                       <div className="text-6xl mb-2">▶️</div>
// //                       <p className="text-sm font-medium">{item?.title || 'Video'}</p>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <img
// //                     src={item?.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'}
// //                     alt={item?.title || 'Gallery image'}
// //                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
// //                     onError={(e) => {
// //                       e.target.onerror = null
// //                       e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'
// //                     }}
// //                   />
// //                 )}
// //                 {/* CATEGORY BADGE */}
// //                 {item?.category && (
// //                   <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
// //                     {item.category}
// //                   </span>
// //                 )}
// //               </div>

// //               {/* ITEM DETAILS */}
// //               <div className="p-4">
// //                 <h3 className="font-semibold text-gray-900 truncate">{item?.title || 'Untitled'}</h3>
// //                 {item?.description && (
// //                   <p className="text-sm text-gray-500 truncate">{item.description}</p>
// //                 )}
// //                 <div className="mt-2 flex items-center gap-2">
// //                   <span className="text-xs text-gray-400">
// //                     {item?.type === 'video' ? '🎥 Video' : '📸 Image'}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* IMAGE LIGHTBOX - Full screen image viewer */}
// //       {selectedImage && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
// //           onClick={() => setSelectedImage(null)}  // Close on background click
// //         >
// //           <div
// //             className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
// //             onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside
// //           >
// //             <div className="relative">
// //               <img
// //                 src={selectedImage.image_url}
// //                 alt={selectedImage.title || 'Gallery image'}
// //                 className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
// //                 onError={(e) => {
// //                   e.target.onerror = null
// //                   e.target.src = 'https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Found'
// //                 }}
// //               />
// //               <button
// //                 onClick={() => setSelectedImage(null)}
// //                 className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors text-2xl"
// //               >
// //                 ✕
// //               </button>
// //             </div>
// //             <div className="p-6">
// //               <h2 className="text-2xl font-bold mb-2">{selectedImage.title || 'Untitled'}</h2>
// //               {selectedImage.description && (
// //                 <p className="text-gray-600 mb-2">{selectedImage.description}</p>
// //               )}
// //               <div className="flex gap-4 text-sm text-gray-500">
// //                 <span>Category: {selectedImage.category || 'Uncategorized'}</span>
// //                 <span>Type: {selectedImage.type || 'image'}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Gallery








// // import { useState, useEffect } from 'react'
// // import api from '../services/api'

// // const Gallery = () => {
// //   const [galleryItems, setGalleryItems] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [activeTab, setActiveTab] = useState('all')
// //   const [selectedImage, setSelectedImage] = useState(null)
// //   const [categories, setCategories] = useState(['all'])

// //   useEffect(() => {
// //     fetchGalleryItems()
// //   }, [])

// //   const fetchGalleryItems = async () => {
// //     try {
// //       setLoading(true)
// //       const response = await api.get('/gallery')
// //       const items = response.data.data || []
// //       setGalleryItems(items)
      
// //       // Extract unique categories - FIX: handle undefined/null
// //       const uniqueCategories = [...new Set(
// //         items
// //           .map(item => item?.category || 'uncategorized')
// //           .filter(cat => cat && cat !== 'null' && cat !== 'undefined')
// //       )]
// //       setCategories(['all', ...uniqueCategories])
      
// //       setLoading(false)
// //     } catch (error) {
// //       console.error('Error fetching gallery:', error)
// //       setLoading(false)
// //     }
// //   }

// //   const getFilteredItems = () => {
// //     if (activeTab === 'all') return galleryItems
// //     if (activeTab === 'images') return galleryItems.filter(item => item?.type === 'image')
// //     if (activeTab === 'videos') return galleryItems.filter(item => item?.type === 'video')
// //     return galleryItems.filter(item => item?.category === activeTab)
// //   }

// //   const filteredItems = getFilteredItems()

// //   if (loading) {
// //     return (
// //       <div className="container mx-auto px-4 py-16">
// //         <div className="flex justify-center items-center min-h-[400px]">
// //           <div className="text-center">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //             <p className="text-gray-600">Loading gallery...</p>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-16">
// //       <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
// //       <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
// //         Explore our collection of property images, videos, and virtual tours
// //       </p>

// //       {/* Category Filter Tabs - FIX: use safe check */}
// //       <div className="flex flex-wrap justify-center gap-2 mb-8">
// //         {categories && categories.length > 0 ? (
// //           categories.map((category) => (
// //             <button
// //               key={category}
// //               onClick={() => setActiveTab(category)}
// //               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
// //                 activeTab === category
// //                   ? 'bg-blue-600 text-white'
// //                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// //               }`}
// //             >
// //               {category === 'all' ? ' All' : 
// //                category === 'images' ? ' Images' :
// //                category === 'videos' ? ' Videos' :
// //                `${category.charAt(0).toUpperCase() + category.slice(1)}`}
// //             </button>
// //           ))
// //         ) : (
// //           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
// //              All
// //           </button>
// //         )}
// //       </div>

// //       {/* Gallery Grid */}
// //       {filteredItems.length === 0 ? (
// //         <div className="text-center py-12">
// //           <div className="text-6xl mb-4"></div>
// //           <p className="text-gray-500 text-lg">No gallery items found</p>
// //           <p className="text-gray-400 text-sm">Check back later for new images</p>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {filteredItems.map((item) => (
// //             <div
// //               key={item.id}
// //               className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
// //               onClick={() => {
// //                 if (item?.type === 'image') {
// //                   setSelectedImage(item)
// //                 } else {
// //                   window.open(item?.image_url, '_blank')
// //                 }
// //               }}
// //             >
// //               <div className="relative h-56 overflow-hidden">
// //                 {item?.type === 'video' ? (
// //                   <div className="w-full h-full bg-gray-800 flex items-center justify-center">
// //                     <div className="text-center text-white">
// //                       <div className="text-6xl mb-2"></div>
// //                       <p className="text-sm font-medium">{item?.title || 'Video'}</p>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <img
// //                     src={item?.image_url || 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'}
// //                     alt={item?.title || 'Gallery image'}
// //                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
// //                     onError={(e) => {
// //                       e.target.onerror = null
// //                       e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'
// //                     }}
// //                   />
// //                 )}
// //                 {item?.category && (
// //                   <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
// //                     {item.category}
// //                   </span>
// //                 )}
// //               </div>
// //               <div className="p-4">
// //                 <h3 className="font-semibold text-gray-900 truncate">{item?.title || 'Untitled'}</h3>
// //                 {item?.description && (
// //                   <p className="text-sm text-gray-500 truncate">{item.description}</p>
// //                 )}
// //                 <div className="mt-2 flex items-center gap-2">
// //                   <span className="text-xs text-gray-400">
// //                     {item?.type === 'video' ? ' Video' : ' Image'}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Image Lightbox Modal */}
// //       {selectedImage && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
// //           onClick={() => setSelectedImage(null)}
// //         >
// //           <div
// //             className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div className="relative">
// //               <img
// //                 src={selectedImage.image_url}
// //                 alt={selectedImage.title || 'Gallery image'}
// //                 className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
// //                 onError={(e) => {
// //                   e.target.onerror = null
// //                   e.target.src = 'https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Found'
// //                 }}
// //               />
// //               <button
// //                 onClick={() => setSelectedImage(null)}
// //                 className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors text-2xl"
// //               >
// //                 ✕
// //               </button>
// //             </div>
// //             <div className="p-6">
// //               <h2 className="text-2xl font-bold mb-2">{selectedImage.title || 'Untitled'}</h2>
// //               {selectedImage.description && (
// //                 <p className="text-gray-600 mb-2">{selectedImage.description}</p>
// //               )}
// //               <div className="flex gap-4 text-sm text-gray-500">
// //                 <span>Category: {selectedImage.category || 'Uncategorized'}</span>
// //                 <span>Type: {selectedImage.type || 'image'}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Gallery





