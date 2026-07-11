// import { Link } from 'react-router-dom'

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto border-t border-gray-700/50">
//       <div className="container mx-auto px-6 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
//           {/* Company Info */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <img
//                 src="/real-estate-logo--removebg-preview.png"
//                 alt="Prime Estate Logo"
//                 className="h-14 w-auto drop-shadow-lg"
//               />
//             </div>
//             <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Prime Estate
//             </h3>
//             <p className="text-gray-400 leading-relaxed max-w-xs">
//               Your trusted partner in finding the perfect property. We turn dreams into addresses.
//             </p>
//             <div className="flex space-x-4 pt-2">
//               <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
//                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
//                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
//                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
//                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.08 20.31H3.55V8.97h3.53v11.34zM5.31 7.47c-1.13 0-2.04-.92-2.04-2.04s.91-2.04 2.04-2.04 2.04.92 2.04 2.04-.91 2.04-2.04 2.04zM20.31 20.31h-3.53v-5.63c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.97v5.72h-3.53V8.97h3.38v1.55h.05c.47-.89 1.61-1.83 3.31-1.83 3.54 0 4.19 2.33 4.19 5.36v6.26z"/></svg>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links - FIXED: Home points to "/" */}
//           <div>
//             <h4 className="font-semibold text-lg mb-5 text-gray-200 relative">
//               Quick Links
//               <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
//             </h4>
//             <ul className="space-y-3 text-gray-400">
//               <li>
//                 <Link 
//                   to="/" 
//                   className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/about" 
//                   className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/projects" 
//                   className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
//                 >
//                   Projects
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/contact" 
//                   className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="font-semibold text-lg mb-5 text-gray-200 relative">
//               Services
//               <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-purple-500 rounded-full"></span>
//             </h4>
//             <ul className="space-y-3 text-gray-400">
//               {[
//                 'Residential Properties',
//                 'Commercial Properties',
//                 'Property Management',
//                 'Consulting Services',
//                 'Construction & Renovation'
//               ].map((service) => (
//                 <li key={service} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1 cursor-pointer">
//                   {service}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="font-semibold text-lg mb-5 text-gray-200 relative">
//               Contact Info
//               <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-green-500 rounded-full"></span>
//             </h4>
//             <ul className="space-y-3 text-gray-400">
//               <li className="flex items-center gap-3 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
//                 <span className="text-xl">📞</span> +91 12345 67890
//               </li>
//               <li className="flex items-center gap-3 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
//                 <span className="text-xl">✉️</span> info@primeestate.com
//               </li>
//               <li className="flex items-center gap-3 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
//                 <span className="text-xl">📍</span> Mumbai, India
//               </li>
//               <li className="flex items-center gap-3 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
//                 <span className="text-xl">🕐</span> Mon-Sat 9AM - 6PM
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
//           <p>&copy; {new Date().getFullYear()} Prime Estate. All rights reserved.</p>
//           <div className="flex gap-6 mt-3 md:mt-0">
//             <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
//             <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
//             <Link to="/sitemap" className="hover:text-blue-400 transition-colors">Sitemap</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer









import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto border-t border-gray-700/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/real-estate-logo--removebg-preview.png"
                alt="Prime Estate Logo"
                className="h-14 w-auto drop-shadow-lg"
              />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Prime Estate
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Your trusted partner in finding the perfect property. We turn dreams into addresses.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-5 text-gray-200 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-gray-400">
              {['Home','About','Projects','Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} 
                    className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-5 text-gray-200 relative">
              Services
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-gray-400">
              {[
                'Residential Properties',
                'Commercial Properties',
                'Property Management',
                'Consulting Services',
                'Construction & Renovation'
              ].map((service) => (
                <li 
                  key={service} 
                  className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1 cursor-pointer"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-5 text-gray-200 relative">
              Contact Info
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-green-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                <Phone className="w-5 h-5" /> +91 12345 67890
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                <Mail className="w-5 h-5" /> info@primeestate.com
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                <MapPin className="w-5 h-5" /> Mumbai, India
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                <Clock className="w-5 h-5" /> Mon-Sat 9AM - 6PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Prime Estate. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-blue-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
