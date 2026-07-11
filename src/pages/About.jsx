// const About = () => {
//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
//       <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//         Learn more about our company and mission
//       </p>

//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
//           <h2 className="text-2xl font-bold mb-4">Our Story</h2>
//           <p className="text-gray-700 mb-4">
//             Founded in 2014, Prime Estate has been a trusted name in the real estate industry. 
//             We specialize in providing premium residential and commercial properties to our clients.
//           </p>
//           <p className="text-gray-700">
//             Our mission is to make the property buying and selling process seamless, transparent, 
//             and enjoyable for everyone involved.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//             <div className="text-4xl mb-3">🏢</div>
//             <h3 className="font-semibold text-lg">500+</h3>
//             <p className="text-gray-600">Properties Sold</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//             <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
//             <h3 className="font-semibold text-lg">1000+</h3>
//             <p className="text-gray-600">Happy Clients</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//             <div className="text-4xl mb-3">⭐</div>
//             <h3 className="font-semibold text-lg">4.8</h3>
//             <p className="text-gray-600">Average Rating</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <h2 className="text-2xl font-bold mb-4">Our Values</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h4 className="font-semibold text-blue-600">Integrity</h4>
//               <p className="text-gray-600">We believe in honest and transparent dealings</p>
//             </div>
//             <div>
//               <h4 className="font-semibold text-blue-600">Excellence</h4>
//               <p className="text-gray-600">We strive for perfection in everything we do</p>
//             </div>
//             <div>
//               <h4 className="font-semibold text-blue-600">Innovation</h4>
//               <p className="text-gray-600">We embrace new ideas and technologies</p>
//             </div>
//             <div>
//               <h4 className="font-semibold text-blue-600">Client First</h4>
//               <p className="text-gray-600">Our clients are at the heart of everything we do</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default About




import { Building, Users, Star, Shield, Rocket, Lightbulb, HeartHandshake } from "lucide-react"

const About = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        About Us
      </h1>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
        Learn more about our company, mission, and values
      </p>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Our Story */}
        <div className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Story</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Founded in 2014, Prime Estate has been a trusted name in the real estate industry. 
            We specialize in providing premium residential and commercial properties to our clients.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to make the property buying and selling process seamless, transparent, 
            and enjoyable for everyone involved.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition">
            <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-2xl text-gray-800">500+</h3>
            <p className="text-gray-600">Properties Sold</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-2xl text-gray-800">1000+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-bold text-2xl text-gray-800">4.8</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-bold mb-8 text-blue-600">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Integrity</h4>
                <p className="text-gray-600">We believe in honest and transparent dealings</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Rocket className="w-8 h-8 text-purple-600" />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Excellence</h4>
                <p className="text-gray-600">We strive for perfection in everything we do</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-yellow-500" />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Innovation</h4>
                <p className="text-gray-600">We embrace new ideas and technologies</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <HeartHandshake className="w-8 h-8 text-green-600" />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Client First</h4>
                <p className="text-gray-600">Our clients are at the heart of everything we do</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
