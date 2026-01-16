"use client";

import { useEffect, useState } from "react";
import { Plane } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1761069449669-1b17dc39831b?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 🔥 LOCAL + WEBP
    title: (
      <>
        Plan Your{" "}
        <span className="bg-yellow-400 text-black px-2 py-1 rounded">
          100% Free Holiday Trip
        </span>{" "}
        Today
      </>
    ),
    desc: "Guaranteed 100% Cash Back policy on all tour packages.",
    cta: {
      text: "Get Started Now",
      link: "#enquiry-content",
      primary: true,
    },
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1663036285889-1130c4e78bec?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: (
      <>
        <span className="text-yellow-400">ULTIMATE</span>{" "}
        <span className="text-white font-extrabold">LUXURY TOURS</span>
      </>
    ),
    desc:
      "Unrivaled Luxury Travel: Indulge in 5-star accommodation and bespoke itineraries worldwide.",
    cta: {
      text: "Explore 5-Star Packages",
      link: "#international",
    },
  },
  {
    image: "https://images.unsplash.com/photo-1766717419153-31fbcb65c9b7?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: (
      <>
        Incredible India Packages{" "}
        <span className="bg-yellow-400 text-black px-2 py-1 rounded">
          starting at ₹9,900
        </span>
      </>
    ),
    desc:
      "Affordable, all-inclusive trips to Goa, Manali, Shimla and more.",
    cta: {
      text: "View Domestic Deals",
      link: "#domestic",
    },
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header  className="relative w-full h-[75vh] md:h-screen overflow-hidden">

      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === active ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* IMAGE (Lazy & Optimized) */}
          {idx === active && (
            <img
              src={slide.image}
              alt="TravelVedas Hero"
              className="absolute inset-0 w-full h-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              fetchpriority={idx === 0 ? "high" : "low"}
            />
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/50" />

          {/* CONTENT */}
          <div className="relative z-20 flex h-full items-end md:items-center justify-center px-4 pb-14 md:pb-0">
            <div className="max-w-3xl text-center text-white">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                {slide.title}
              </h1>

              <p className="text-sm md:text-lg font-medium mb-6 text-white/90">
                {slide.desc}
              </p>

              <Link
                to="/enquiry"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition
                  ${
                    slide.cta.primary
                      ? "bg-green-500 hover:bg-green-400 shadow-lg"
                      : "border border-white hover:bg-white hover:text-black"
                  }`}
              >
                <Plane size={18} />
                {slide.cta.text}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full ${
              i === active ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </header>
  );
};

export default Hero;
