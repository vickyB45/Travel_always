"use client";

import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    title: <>Goa <b>Budget Trip</b></>,
    img: "image/domestic/TV13.jpg",
    desc: "Destination: Goa | Duration: 2N/3D",
    price: "₹9,999",
    points: [
      "3★ / 5★ Hotel Stay",
      "Breakfast & Dinner (All Meals)",
      "Sightseeing",
      "Pickup & Drop",
      "Casino Free Visit",
    ],
  },
  {
    title: <>Hill Stations <span className="text-blue-500">Value</span></>,
    img: "image/domestic/TV22.jpg",
    desc: "Manali or Shimla | Duration: 2N/3D",
    price: "₹24,999",
    points: [
      "3★ Accommodation",
      "Bus / Train (3rd AC)",
      "All Meals Included",
      "Sightseeing",
    ],
  },
  {
    title: <>Domestic <span className="text-green-600">Air Travel</span></>,
    img: "image/domestic/TV20.jpg",
    desc: "Goa or Manali | Duration: 4N/5D",
    price: "₹49,999",
    points: [
      "Flight tickets (optional)",
      "Private Villa / Apartment",
      "All Meals Included",
      "Casino Visit",
      "Airport Pickup & Drop",
      "Cruise Dinner",
    ],
  },
  {
    title: <>Goa <b>Villa</b></>,
    img: "image/domestic/GoaHotels.PNG",
    desc: "Doodhsagar, North & South Goa | Duration: 4N/5D",
    price: "₹39,999",
    points: [
      "Flights (Optional)",
      "Private Villa + 5★ Hotel",
      "Cruise Party & Night Club",
      "Casino Entry",
      "Private Airport Transfer",
    ],
  },
];

const DomesticPackages = () => {
  return (
    <section
      id="domestic"
      className="py-16 md:py-24 bg-slate-50"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "1px 900px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-12">
          Domestic Tour Packages{" "}
          <span className="text-blue-500">(Incredible India)</span>
        </h2>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col"
            >
              {/* IMAGE – PERFORMANCE SAFE */}
              <img
                src={pkg.img}
                alt="Tour Package"
                loading="lazy"
                decoding="async"
                width="400"
                height="300"
                className="h-48 w-full object-cover bg-gray-100"
              />

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                <h5 className="font-bold mb-1">{pkg.title}</h5>

                <p className="text-xs text-slate-500 mb-3">
                  {pkg.desc}
                </p>

                <p className="text-xl font-extrabold text-[#0077b6] mb-3">
                  Starting {pkg.price}
                </p>

                <ul className="space-y-1 text-sm mb-4">
                  {pkg.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 items-start"
                      style={{ willChange: "transform" }}
                    >
                      <CheckCircle
                        size={16}
                        className="text-green-500 mt-[2px]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/enquiry"
                  className="mt-auto inline-block text-center w-full py-2 rounded-lg bg-[#ff5722] text-white font-semibold hover:brightness-110 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* NOTE */}
        <p className="text-center text-xs text-slate-500 mt-6 italic">
          Note: Hotel & flights subject to availability. 5% TCS not included.
        </p>
      </div>
    </section>
  );
};

export default DomesticPackages;
