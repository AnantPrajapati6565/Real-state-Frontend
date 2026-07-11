// import { useState, useEffect } from 'react'
// import api from '../services/api'

// const Gallery = () => {

//   // STATE

//   const [galleryItems, setGalleryItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedImage, setSelectedImage] = useState(null)
//   const [categories, setCategories] = useState(['all'])


//   // EFFECT - Fetch on mount (Bulletproof Pattern)

//   useEffect(() => {
//     // 1. Define the async function INSIDE the effect
//     const fetchGallery = async () => {
//       try {
//         const response = await api.get('/gallery')
//         const items = response.data.data || []
        
//         // 2. All state updates happen AFTER the await (asynchronously)
//         setGalleryItems(items)
        
//         const uniqueCategories = [...new Set(
//           items
//             .map(item => item?.category || 'uncategorized')
//             .filter(cat => cat && cat !== 'null' && cat !== 'undefined')
//         )]
//         setCategories(['all', ...uniqueCategories])
        
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching gallery:', error)
//         setLoading(false)
//       }
//     }

//     // 3. Call it immediately
//     fetchGallery()
//   }, []) // ✅ Empty array means this runs exactly once, safely.


//   // FILTER ITEMS

//   const getFilteredItems = () => {
//     if (activeTab === 'all') return galleryItems
//     if (activeTab === 'images') return galleryItems.filter(item => item?.type === 'image')
//     if (activeTab === 'videos') return galleryItems.filter(item => item?.type === 'video')
//     return galleryItems.filter(item => item?.category === activeTab)
//   }

//   const filteredItems = getFilteredItems()

//   // LOADING SCREEN
 
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

//   // MAIN UI

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








import { useState, useEffect } from 'react'
import api from '../services/api'

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [categories, setCategories] = useState(['all'])

  // Statistics (static or dynamic)
  const imageCount = galleryItems.filter(i => i?.type === 'image').length
  const videoCount = galleryItems.filter(i => i?.type === 'video').length
  const projectCount = galleryItems.length // or distinct projects, using length as placeholder

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get('/gallery')
        const items = response.data.data || []
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
    fetchGallery()
  }, [])

  const getFilteredItems = () => {
    if (activeTab === 'all') return galleryItems
    if (activeTab === 'images') return galleryItems.filter(item => item?.type === 'image')
    if (activeTab === 'videos') return galleryItems.filter(item => item?.type === 'video')
    return galleryItems.filter(item => item?.category === activeTab)
  }

  const filteredItems = getFilteredItems()

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-[#FAF8F4] min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-3xl h-[350px] bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12 md:py-20">
      {/* Font imports (can be moved to index.html) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ========== HERO SECTION ========== */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 md:py-24 mb-16">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <span className="px-5 py-2 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] uppercase tracking-widest text-sm font-inter">
              Luxury Collection
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-playfair font-bold leading-tight">
              Property Gallery
            </h1>
            <p className="mt-5 text-lg text-gray-300 font-inter max-w-2xl mx-auto">
              Explore our premium collection of luxury residences, interiors and architectural masterpieces.
            </p>
          </div>
        </div>

        {/* ========== STATISTICS ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: `${imageCount}+`, label: 'Photos' },
            { value: `${videoCount}+`, label: 'Videos' },
            { value: `${projectCount}`, label: 'Projects' },
            { value: '15K+', label: 'Visitors' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECE7DD] p-6 text-center shadow-sm hover:shadow-lg transition duration-300">
              <div className="text-3xl md:text-4xl font-bold text-[#111111] font-playfair">{stat.value}</div>
              <div className="text-sm text-[#6E6E73] font-inter mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ========== FILTER TABS ========== */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                activeTab === category
                  ? 'bg-[#111111] text-white shadow-xl'
                  : 'bg-white border border-[#ECE7DD] hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#6E6E73]'
              }`}
            >
              {category === 'all' ? 'All' :
               category === 'images' ? 'Images' :
               category === 'videos' ? 'Videos' :
               category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* ========== GALLERY GRID ========== */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#ECE7DD] shadow-xl">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-2xl font-playfair font-semibold text-[#111111] mb-2">No gallery items found</h3>
            <p className="text-[#6E6E73] font-inter">Check back later for new imagery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#ECE7DD] shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_35px_100px_rgba(0,0,0,0.18)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                onClick={() => {
                  if (item?.type === 'image') {
                    setSelectedImage(item)
                  } else {
                    window.open(item?.image_url, '_blank')
                  }
                }}
              >
                <div className="relative h-64 overflow-hidden bg-[#F5F2ED]">
                  {item?.type === 'video' ? (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-5xl mb-2">▶</div>
                        <p className="text-sm font-inter">{item?.title || 'Video'}</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item?.image_url || 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'}
                      alt={item?.title || 'Gallery image'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=No+Image'
                      }}
                    />
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Category Badge */}
                  {item?.category && (
                    <span className="absolute top-5 left-5 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-[#D4AF37] text-[10px] uppercase tracking-widest font-inter font-semibold border border-[#D4AF37]/30">
                      {item.category}
                    </span>
                  )}

                  {/* Image count placeholder */}
                  {item?.type === 'image' && (
                    <span className="absolute bottom-5 left-5 text-white/80 text-sm font-inter">
                      {imageCount} Photos
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-[#111111] tracking-tight">
                    {item?.title || 'Untitled'}
                  </h3>
                  {item?.description && (
                    <p className="text-[#6E6E73] font-inter leading-7 mt-2 text-sm">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-[#6E6E73] font-inter uppercase tracking-wider">
                      {item?.type === 'video' ? 'Video' : 'Image'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========== PREMIUM CTA ========== */}
        <section className="bg-[#111111] rounded-[40px] py-20 text-center mt-24 px-6">
          <h2 className="text-white text-4xl md:text-5xl font-playfair font-bold max-w-2xl mx-auto">
            Interested in Our Projects?
          </h2>
          <p className="mt-4 text-gray-300 font-inter max-w-xl mx-auto">
            Get in touch with us to schedule a private viewing of our exclusive properties.
          </p>

        </section>
      </div>

      {/* ========== LIGHTBOX ========== */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title || 'Gallery image'}
              className="w-full h-auto max-h-[70vh] object-contain rounded-t-3xl shadow-2xl"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Found'
              }}
            />
            <div className="bg-black rounded-b-3xl p-6 md:p-8 text-white">
              <h2 className="text-2xl font-playfair font-bold">{selectedImage.title || 'Untitled'}</h2>
              {selectedImage.description && (
                <p className="text-gray-300 font-inter mt-2">{selectedImage.description}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-inter mt-4">
                <span>Category: {selectedImage.category || 'Uncategorized'}</span>
                <span>Type: {selectedImage.type || 'image'}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery