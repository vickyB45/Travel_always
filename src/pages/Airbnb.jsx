import React from 'react'
import Topbar from '../components/header/Topbar'
import Footer from '../components/Footer'

import { useNavigate } from 'react-router-dom'


const dummyPackages = [
  {
    title: 'Luxury Beachside Stay',
    desc: 'Enjoy a premium Airbnb stay near the beach with all modern amenities.',
    price: '₹4,999 / night',
    points: [
      'Sea View Rooms',
      'Free Wi-Fi',
      '24x7 Support',
      'Private Balcony'
    ],
  },
  {
    title: 'Mountain View Villa',
    desc: 'Peaceful villas surrounded by nature for a relaxing holiday.',
    price: '₹6,499 / night',
    points: [
      'Mountain View',
      'Private Parking',
      'Fully Furnished',
      'Local Guide'
    ],
  },
  {
    title: 'City Center Apartment',
    desc: 'Stay in the heart of the city with easy access to attractions.',
    price: '₹3,299 / night',
    points: [
      'Prime Location',
      'Metro Nearby',
      'Self Check-in',
      'AC Rooms'
    ],
  },
  {
    title: 'Luxury Beachside Stay',
    desc: 'Enjoy a premium Airbnb stay near the beach with all modern amenities.',
    price: '₹4,999 / night',
    points: [
      'Sea View Rooms',
      'Free Wi-Fi',
      '24x7 Support',
      'Private Balcony'
    ],
  },
  {
    title: 'Mountain View Villa',
    desc: 'Peaceful villas surrounded by nature for a relaxing holiday.',
    price: '₹6,499 / night',
    points: [
      'Mountain View',
      'Private Parking',
      'Fully Furnished',
      'Local Guide'
    ],
  },
  {
    title: 'City Center Apartment',
    desc: 'Stay in the heart of the city with easy access to attractions.',
    price: '₹3,299 / night',
    points: [
      'Prime Location',
      'Metro Nearby',
      'Self Check-in',
      'AC Rooms'
    ],
  },
]

const Airbnb = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-50">
      <Topbar />



      {/* ABOUT SECTION */}
<section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16">
  <div className="max-w-7xl mx-auto px-6">
          <button
  onClick={() => navigate(-1)}
  className="inline-flex items-center gap-2 mb-6 px-4 py-2 
             bg-white text-gray-700 border border-gray-200 
             rounded-full shadow-sm hover:bg-gray-100 
             transition"
>
  ← Back
</button>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

      {/* TEXT */}
      <div>
        <span className="inline-block mb-3 px-4 py-1 text-sm font-semibold text-orange-600 bg-orange-100 rounded-full">
          Trusted Airbnb Experiences
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
          Airbnb Stays by <span className="text-orange-600">TravelVedas</span>
        </h1>

        <p className="text-gray-600 leading-relaxed text-base max-w-xl">
          Discover hand-picked Airbnb accommodations curated by TravelVedas.  
          From luxury villas to cozy city apartments and peaceful retreats —
          every stay is verified for comfort, safety, and quality.  
          Travel worry-free with expert support and transparent pricing.
        </p>
      </div>

      {/* IMAGE / VISUAL */}
      <div className="h-64 md:h-72 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center text-gray-500 text-sm shadow-inner">
        Airbnb Preview Image
      </div>

    </div>
  </div>
</section>


      {/* PACKAGES SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Popular Airbnb Packages
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyPackages.map((pkg, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              {/* IMAGE DUMMY */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-sm">
                Image Placeholder
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {pkg.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {pkg.desc}
                </p>

                <p className="text-lg font-bold text-orange-600">
                  {pkg.price}
                </p>

                <ul className="text-sm text-gray-600 space-y-1 pt-2">
                  {pkg.points.map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>

                <button
                  onClick={() => {}}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD BROCHURE */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Download Airbnb Brochure
          </h3>
          <p className="text-gray-600 mb-6">
            Get complete details of our Airbnb stays, inclusions, and offers.
          </p>

          <a
            href="/img.jpg"
            download
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Download Brochure
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Airbnb
