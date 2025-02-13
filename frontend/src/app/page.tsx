import Link from 'next/link'
import { FaHome, FaSearch, FaUserCheck, FaMapMarkerAlt } from 'react-icons/fa'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover the perfect property from our extensive listings. Whether you're buying, selling, or renting, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/listings"
                className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Listings
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <FaHome className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extensive Listings</h3>
              <p className="text-gray-600">
                Browse through our comprehensive database of properties, featuring detailed information and high-quality images.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <FaSearch className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with our powerful search tools and filtering options.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <FaUserCheck className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Get assistance from our team of real estate professionals who are ready to help you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Properties</h3>
              <p className="text-gray-600">
                Browse our listings and use filters to find properties that match your criteria.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule Viewing</h3>
              <p className="text-gray-600">
                Book appointments to view properties that interest you at your convenience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Close the Deal</h3>
              <p className="text-gray-600">
                Work with our experts to finalize the purchase or rental of your chosen property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8">
            Start browsing our listings today and take the first step towards your new home.
          </p>
          <Link
            href="/listings"
            className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
