"use client";

import { Hotel } from "lucide-react";
import { Link } from "react-router-dom";

const hotels = [
  {
    title: "Royal Dubai Dreams",
    img: "https://images.pexels.com/photos/5619280/pexels-photo-5619280.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    meta: "Dubai | 3 / 5-Star Luxury",
    desc: "Panoramic views, prime location & exceptional dining.",
  },
  {
    title: "Thailand Paradise Escape",
    img: "/image/hotels/Mandarian.webp",
    meta: "Bangkok, Thailand | 3 / 5-Star Luxury",
    desc: "Historic prestige, river views, spa & award-winning restaurants.",
  },
  {
    title: "Premium Dubai Hotels",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSbCDZn444257alhMxzWcB2GRce0Dpj0UmuPVdHVqQ8zkNTegGY",
    meta: "Palm Jumeirah, Dubai | Ultra Luxury",
    desc: "Spectacular architecture & ultra-luxury accommodations.",
  },
  {
    title: "Goa Resort Collection",
    img: "/image/hotels/GResort.jpg",
    meta: "Goa | 3 / 5-Star Luxury",
    desc: "Iconic views, spa facilities & beach proximity.",
  },
  {
    title: "Dalhousie Mountain Lodges",
    img: "/image/hotels/Dalhousie.jpg",
    meta: "Dalhousie | Luxury Villa Stay",
    desc: "Panchpula, Dainkund Peak & Kalatop Sanctuary.",
  },
  {
    title: "Manali Mountain Stay",
    img: "/image/hotels/ManaliMountains.jpg",
    meta: "Manali | 3 / 5-Star Heritage",
    desc: "Hadimba Temple, Old Manali & Solang Valley nearby.",
  },
  {
    title: "Shimla Premium Lodging",
    img: "/image/hotels/shimla.jpg",
    meta: "Shimla | Himachal Pradesh",
    desc: "Mall Road, Christ Church, Jakhoo Temple access.",
  },
  {
    title: "Dalhousie Honeymoon Bliss",
    img: "/image/hotels/Honeymoon.png",
    meta: "Dalhousie | Elite View Stay",
    desc: "Scenic routes, Jogini Waterfall & Rohtang access.",
  },
  {
    title: "Hotel Mareema Regency",
    img: "/image/hotels/Mareema.jpg",
    meta: "Manali | 3 / 5-Star Luxury",
    desc: "Heritage charm & Himalayan sightseeing nearby.",
  },
  {
    title: "Hotel NatureVille",
    img: "/image/hotels/NatureVille.jpg",
    meta: "Shimla | 3 / 5-Star Luxury",
    desc: "Mall Road, Tara Devi Temple & river views.",
  },
  {
    title: "Hotel Shimla Regency",
    img: "/image/hotels/ShimlaRegency.jpg",
    meta: "Shimla | 3 / 5-Star Luxury",
    desc: "Ridge, Jakhu Temple & Victory Tunnel nearby.",
  },
  {
    title: "The Westin Goa",
    img: "/image/hotels/westin.jfif",
    meta: "Goa | 5-Star Resort",
    desc: "Wellness programs & premium pool experience.",
  },
];

export default function Hotels() {
  return (
    <section
      id="hotels"
      className="bg-white py-16 md:py-24"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "1px 1200px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-4">
          <Hotel className="inline-block mr-2 mb-1" />
          Our Channel Partner{" "}
          <span className="text-[#0077b6]">Hotels & Resorts</span>
        </h2>

        <p className="text-center text-slate-500 mb-10">
          Hand-picked 4-star & 5-star properties for premium experiences.
        </p>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition flex flex-col"
            >
              {/* IMAGE – NO HANG */}
              <img
                src={hotel.img}
                alt={hotel.title}
                loading="lazy"
                decoding="async"
                width="420"
                height="280"
                className="h-48 w-full object-cover bg-gray-100"
              />

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                <h5 className="font-bold text-slate-900 mb-1">
                  {hotel.title}
                </h5>

                <p className="text-xs text-slate-500 mb-2">
                  {hotel.meta}
                </p>

                <p className="text-sm text-slate-600 mb-4">
                  {hotel.desc}
                </p>

                <Link
                  to="/enquiry"
                  className="mt-auto text-center w-full py-2 rounded-lg border border-[#0077b6] text-[#0077b6] font-semibold hover:bg-[#0077b6] hover:text-white transition"
                >
                  Book This Hotel
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
