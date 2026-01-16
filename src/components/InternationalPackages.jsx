"use client";

import { CheckCircle, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    title: "Dubai Gateway",
    img: "/image/international/TV19.jpg",
    meta: "Dubai (International) • 5N / 6D",
    price: "₹99,000",
    points: [
      "Flights, Visa & Transfers",
      "4★ / 5★ Luxury Hotels",
      "All Meals Included",
      "Private Airport Transfers",
      "Burj Khalifa & Desert Safari",
    ],
  },
  {
    title: "Explore Vietnam",
    img: "/image/international/TV15.jpg",
    meta: "Vietnam / Thailand • 4N / 5D",
    price: "₹99,999",
    points: [
      "Air Tickets + Visa",
      "Premium 4★ / 5★ Hotels",
      "All Meals Included",
      "Private Sightseeing",
    ],
  },
  {
    title: "Exotic Explorer",
    img: "/image/international/TV25.jpg",
    meta: "Azerbaijan • Egypt • Thailand",
    price: "₹1,49,000",
    featured: true,
    points: [
      "International Flights",
      "3★ / 4★ / 5★ Hotels",
      "All Meals & Sightseeing",
    ],
  },
  {
    title: "Malaysia Getaway",
    img: "/image/international/TV18.jpg",
    meta: "Langkawi & Kuala Lumpur • 7N / 8D",
    price: "₹1,49,999",
    points: [
      "Flights & Visa Support",
      "Luxury Hotels Across Cities",
      "Best Value Experiences",
    ],
  },
  {
    title: "Cambodia Awaits",
    img: "/image/international/Combodia.jpg",
    meta: "Phnom Penh & Koh Rong • 6N / 7D",
    price: "₹99,999",
    points: [
      "Flights & Visa Included",
      "Beachfront 3★ / 5★ Resorts",
      "International Service Quality",
    ],
  },
  {
    title: "Honeymoon Escapes",
    img: "/image/international/honeymoon.jpg",
    meta: "Romantic Destinations • 3N / 4D",
    price: "₹49,999",
    points: [
      "Couple-Only Packages",
      "Jacuzzi / Ocean View Rooms",
      "Candle Light & Cruise Dinner",
    ],
  },
  {
    title: "Bali – Luxury at Value",
    img: "/image/international/Bali.jpg",
    meta: "Bali, Indonesia • 4N / 5D",
    price: "₹99,999",
    points: [
      "Handpicked Villas & Resorts",
      "Spa, Beach Dinners & Adventures",
      "Private Airport Transfers",
    ],
  },
];

export default function InternationalPackages() {
  return (
    <section
      id="international"
      className="bg-slate-50 py-20"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "1px 1200px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* SECTION TITLE */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest font-semibold text-[#FF5722] uppercase mb-2">
            International Tours
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Global Travel Experiences
          </h2>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="
                group
                bg-white
                rounded-2xl
                overflow-hidden
                shadow
                hover:shadow-2xl
                transition
                flex flex-col
              "
            >
              {/* IMAGE – PERFORMANCE SAFE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.img}
                  alt={pkg.title}
                  loading="lazy"
                  decoding="async"
                  width="420"
                  height="300"
                  className="h-full w-full object-cover bg-gray-100 group-hover:scale-105 transition duration-500"
                />
                {pkg.featured && (
                  <span className="absolute top-4 left-4 bg-[#FF5722] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                  {pkg.title}
                </h3>

                <p className="text-sm text-slate-500 font-medium mb-3">
                  {pkg.meta}
                </p>

                <p className="text-2xl font-extrabold text-[#FF5722] mb-4">
                  {pkg.price}
                </p>

                <ul className="space-y-2 text-sm text-slate-700 font-medium mb-6">
                  {pkg.points.map((pt, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 items-start"
                      style={{ willChange: "transform" }}
                    >
                      <CheckCircle size={16} className="text-green-500 mt-[3px]" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/enquiry"
                  className="
                    mt-auto
                    block
                    text-center
                    rounded-xl
                    bg-slate-900
                    text-white
                    py-3
                    font-bold
                    tracking-wide
                    hover:bg-[#FF5722]
                    transition
                  "
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ULTIMATE LUXURY */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-12 text-center text-white">
          <Crown className="mx-auto text-yellow-400 mb-4" size={40} />
          <h3 className="text-3xl font-extrabold mb-2">
            Ultimate Luxury Experience
          </h3>
          <p className="text-lg text-slate-300 mb-4">
            2 Domestic + 2 International Holidays
          </p>
          <p className="text-4xl font-extrabold text-yellow-400 mb-8">
            ₹2,99,000/-
          </p>

          <Link
            to="/enquiry"
            className="
              inline-block
              px-10
              py-4
              rounded-xl
              bg-yellow-400
              text-slate-900
              font-extrabold
              hover:scale-105
              transition
            "
          >
            Get Ultimate Package
          </Link>
        </div>

      </div>
    </section>
  );
}
