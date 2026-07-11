// 

import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] px-6">
      <div className="text-center max-w-lg">
        <span className="text-yellow-500 uppercase tracking-[4px] text-sm font-medium">
          Error 404
        </span>

        <h1 className="text-8xl font-bold text-black mt-4">
          404
        </h1>

        <h2 className="text-3xl font-semibold text-gray-900 mt-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300"
        >
          Back to Home →
        </Link>
      </div>
    </div>
  )
}

export default NotFound
