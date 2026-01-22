"use client";

import { CheckCircle, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicPackages } from "../hooks/public/publicQuery";

export default function InternationalPackages() {
  const { data, isLoading } = usePublicPackages();
  
  // Filter only international packages that are public
  const packages = data?.filter(pkg => 
    pkg.isActive === "public" && 
    pkg.category?.slug === "global-travel-experiences"
  ) || [];

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

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl overflow-hidden shadow animate-pulse"
              >
                {/* IMAGE SKELETON */}
                <div className="h-56 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>

                {/* CONTENT SKELETON */}
                <div className="p-6 space-y-3">
                  {/* TITLE */}
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  
                  {/* META */}
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  
                  {/* PRICE */}
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  
                  {/* POINTS */}
                  <div className="space-y-2 py-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  </div>
                  
                  {/* BUTTON */}
                  <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No international packages available at the moment</p>
          </div>
        ) : (
          /* GRID */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
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
                {/* IMAGE */}
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
                  {pkg.isPopular && (
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
                    {pkg.desc}
                  </p>

                  <p className="text-2xl font-extrabold text-[#FF5722] mb-4">
                    ₹{pkg.price.toLocaleString("en-IN")}
                  </p>

                  {/* POINTS */}
                  {pkg.points && pkg.points.length > 0 && (
                    <ul className="space-y-2 text-sm text-slate-700 font-medium mb-6">
                      {pkg.points.map((pt, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 items-start"
                          style={{ willChange: "transform" }}
                        >
                          <CheckCircle size={16} className="text-green-500 mt-[3px] flex-shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

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
        )}

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