"use client";
import { useState } from "react";
import {
  Landmark,
  Hotel,
  BedDouble,
  Coffee,
  Shield,
  Bus,
  Ship,
  Trees,
  PawPrint,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";

const ThailandSpecial = () => {
  const [open, setOpen] = useState(true);

  return (
    <section id="thailand-special" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-12">
          Featured International Deal:{" "}
          <span className="text-[#0077b6]">Thailand</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* IMAGE */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
              loading="lazy"
                src="image/domestic/TV17.jpg"
                alt="Pattaya Beach"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-center text-slate-500 mt-2">
              Thailand: Coral Island View
            </p>
          </div>

          {/* ACCORDION */}
          <div className="lg:col-span-7">
            <div className="border rounded-xl shadow-lg overflow-hidden">

              {/* HEADER */}
              <button
                onClick={() => setOpen(!open)}
                className="
                  w-full
                  flex items-center justify-between
                  px-6 py-4
                  bg-slate-50
                  font-bold text-left text-base md:text-lg
                "
              >
                <span className="flex items-center gap-2">
                  <Info className="text-[#0077b6]" />
                  6 Nights / 5 Days Thailand Exclusive Package
                  <span className="block text-sm font-semibold text-[#ff5722]">
                    Starting @ ₹74,999 /-
                  </span>
                </span>
                <span className="text-xl">
                  {open ? "−" : "+"}
                </span>
              </button>

              {/* CONTENT */}
              {open && (
                <div className="bg-slate-100 px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* LEFT */}
                    <div className="md:border-r md:pr-6">
                      <h5 className="font-bold text-[#ef476f] mb-3">
                        Accommodation & Meals
                      </h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <Hotel className="text-[#0077b6]" size={18} />
                          3★ / 5★ Hotel Stay
                        </li>
                        <li className="flex gap-2">
                          <BedDouble className="text-[#0077b6]" size={18} />
                          Airport Pickup & Drop
                        </li>
                        <li className="flex gap-2">
                          <Coffee className="text-[#0077b6]" size={18} />
                          All Meals Included
                        </li>
                        <li className="flex gap-2">
                          <Shield className="text-[#0077b6]" size={18} />
                          Sightseeing & Assistance
                        </li>
                      </ul>
                    </div>

                    {/* RIGHT */}
                    <div className="md:pl-6">
                      <h5 className="font-bold text-[#ef476f] mb-3">
                        Tours & Transfers
                      </h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <Bus className="text-[#0077b6]" size={18} />
                          Airport Transfers (Private)
                        </li>
                        <li className="flex gap-2">
                          <Landmark className="text-[#0077b6]" size={18} />
                          Sanctuary of Truth (Private Transfer)
                        </li>
                        <li className="flex gap-2">
                          <Ship className="text-[#0077b6]" size={18} />
                          Coral Island Speed Boat Tour + Lunch
                        </li>
                        <li className="flex gap-2">
                          <Trees className="text-[#0077b6]" size={18} />
                          Nong Nooch Garden + Cultural Show
                        </li>
                        <li className="flex gap-2">
                          <PawPrint className="text-[#0077b6]" size={18} />
                          Tiger Park Transfer (Ticket by own)
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/enquiry"
                    className="
                      mt-6 block w-full text-center
                      bg-[#ff5722] text-white
                      py-3 rounded-lg
                      font-semibold
                      hover:brightness-110
                      transition
                    "
                  >
                    Book Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThailandSpecial;
