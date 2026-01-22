"use client";

import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicCategories, usePublicPackages } from "../hooks/public/publicQuery";

const DomesticPackages = () => {
  const { data, isLoading } = usePublicPackages();

  
  // Filter only domestic packages that are public
  const packages = data?.filter(pkg => 
    pkg.isActive === "public" && 
    pkg.category?.slug === "domestic-tour-packages-(incredible-india)"
    
  ) || [];

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

        {/* LOADING STATE */}
        {isLoading ? (
         
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
              >
                {/* IMAGE SKELETON */}
                <div className="h-48 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>

                {/* CONTENT SKELETON */}
                <div className="p-5 space-y-3">
                  {/* TITLE */}
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  
                  {/* DESCRIPTION */}
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  
                  {/* PRICE */}
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  
                  {/* POINTS */}
                  <div className="space-y-2 py-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                  
                  {/* BUTTON */}
                  <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No packages available at the moment</p>
          </div>
        ) : (
          /* GRID */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col"
              >
                {/* IMAGE */}
                <img
                  src={pkg.img}
                  alt={pkg.title}
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
                    Starting ₹{pkg.price.toLocaleString("en-IN")}
                  </p>

                  {/* POINTS */}
                  {pkg.points && pkg.points.length > 0 && (
                    <ul className="space-y-1 text-sm mb-4">
                      {pkg.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 items-start"
                          style={{ willChange: "transform" }}
                        >
                          <CheckCircle
                            size={16}
                            className="text-green-500 mt-[2px] flex-shrink-0"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* POPULAR BADGE */}
                  {pkg.isPopular && (
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                        ⭐ Popular
                      </span>
                    </div>
                  )}

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
        )}

        {/* NOTE */}
        <p className="text-center text-xs text-slate-500 mt-6 italic">
          Note: Hotel & flights subject to availability. 5% TCS not included.
        </p>
      </div>
    </section>
  );
};

export default DomesticPackages;