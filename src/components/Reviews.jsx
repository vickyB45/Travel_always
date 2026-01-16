"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Anjali V.",
    city: "Mumbai",
    package: "Azerbaijan Tour",
    img: "https://i.pinimg.com/736x/27/00/0d/27000d40ffa579773d09f4b6c171b973.jpg",
    text:
      "The Exotic Explorer package was incredible. 5-star stay and flawless logistics. The 100% cash back promise truly sets them apart!",
  },
  {
    name: "Karthik R.",
    city: "Bangalore",
    package: "Manali Package",
    img: "https://i.pinimg.com/736x/98/b5/f7/98b5f7643a7cc0738d6114a577b02226.jpg",
    text:
      "Used the Domestic Air Travel package for Shimla. Flights were smooth and meals were a lifesaver.",
  },
  {
    name: "Shivani G.",
    city: "Delhi",
    package: "Thailand Special",
    img: "https://i.pinimg.com/1200x/d5/ca/de/d5cade9fd271a5681c998073354e7f62.jpg",
    text:
      "Excellent Goa tour with perfect planning, smooth transfers and great hotels. Highly recommended.",
  },
  {
    name: "Rahul M.",
    city: "Pune",
    package: "European Wonders",
    img: "https://i.pinimg.com/736x/6c/d9/4f/6cd94fa3f6b2b7959c48309c5be7ea3e.jpg",
    text:
      "Swiss Alps tour was a dream. Everything from passes to hotels was premium.",
  },
  {
    name: "Meera K.",
    city: "Chennai",
    package: "Bali Retreat",
    img: "https://i.pinimg.com/736x/7a/47/4e/7a474e92a1d6928557ee42d9fc368fe6.jpg",
    text:
      "Bali private villa and driver were exceptional. Truly stress-free experience.",
  },
  {
    name: "Vikram S.",
    city: "Hyderabad",
    package: "Dubai Glitz",
    img: "https://i.pinimg.com/736x/39/7f/a5/397fa5af7dcc73ef618c7db590cdb96d.jpg",
    text:
      "Dubai desert safari was the highlight! Simple process and real cashback.",
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // auto slide (safe)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section
      id="reviews"
      className="relative py-20 md:py-28 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800')] bg-cover bg-center"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "1px 700px",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">

        {/* HEADER */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Our Happy Clients
        </h2>
        <div className="mx-auto w-20 h-1 bg-yellow-400 mb-10 rounded-full" />

        {/* CARD */}
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl px-6 py-10 shadow-xl">
          <img
            src={reviews[index].img}
            alt={reviews[index].name}
            loading="lazy"
            decoding="async"
            width="96"
            height="96"
            className="mx-auto mb-5 rounded-full object-cover bg-gray-200"
          />

          {/* stars */}
          <div className="flex justify-center mb-4 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>

          <p className="italic text-white/90 mb-6 leading-relaxed">
            “{reviews[index].text}”
          </p>

          <h4 className="font-bold">
            {reviews[index].name} ({reviews[index].city})
          </h4>
          <p className="text-sm uppercase tracking-widest text-yellow-400 mt-1">
            {reviews[index].package}
          </p>
        </div>

        {/* INDICATORS */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition ${
                index === i ? "bg-yellow-400 scale-125" : "bg-white/40"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
