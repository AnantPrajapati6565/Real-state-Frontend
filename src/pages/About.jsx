const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Learn more about our company and mission
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2014, Prime Estate has been a trusted name in the real estate industry. 
            We specialize in providing premium residential and commercial properties to our clients.
          </p>
          <p className="text-gray-700">
            Our mission is to make the property buying and selling process seamless, transparent, 
            and enjoyable for everyone involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">🏢</div>
            <h3 className="font-semibold text-lg">500+</h3>
            <p className="text-gray-600">Properties Sold</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
            <h3 className="font-semibold text-lg">1000+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-semibold text-lg">4.8</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-600">Integrity</h4>
              <p className="text-gray-600">We believe in honest and transparent dealings</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600">Excellence</h4>
              <p className="text-gray-600">We strive for perfection in everything we do</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600">Innovation</h4>
              <p className="text-gray-600">We embrace new ideas and technologies</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600">Client First</h4>
              <p className="text-gray-600">Our clients are at the heart of everything we do</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About