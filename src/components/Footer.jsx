"use client";

import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="text-center lg:text-left">
            <img
              src="/image/header/TravelVedaLogo.PNG"
              alt="TravelVedas Logo"
              className="mx-auto lg:mx-0 h-12 mb-4"
              loading="lazy"
            />
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Leading the way in personalized global travel with an{" "}
              <span className="text-white font-semibold">
                unparalleled financial assurance policy
              </span>
              .
            </p>

            {/* SOCIALS */}
            <div className="flex justify-center lg:justify-start gap-4">
              <a
                href="https://www.facebook.com/YourPageName"
                aria-label="Facebook"
                className="p-2 rounded-full bg-white/10 hover:bg-[#1877F2] transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/travelvedass"
                target="_blank"
                aria-label="Instagram"
                className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://x.com/YourUsername"
                aria-label="X"
                className="p-2 rounded-full bg-white/10 hover:bg-black transition"
              >
                <FaXTwitter size={18} />
              </a>
              <a
                href="https://www.youtube.com/watch?v=5K1t4p0BDQY"
                target="_blank"
                aria-label="YouTube"
                className="p-2 rounded-full bg-white/10 hover:bg-red-600 transition"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* EXPLORE */}
          <div className="text-center md:text-left">
            <h6 className="font-bold tracking-wide mb-4">Explore Tours</h6>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#domestic" className="hover:text-white">Domestic Deals</a></li>
              <li><a href="#international" className="hover:text-white">International Packages</a></li>
              <li><a href="#cashback-modern" className="text-[#FF5722] font-semibold">100% Cash Back Offer</a></li>
              <li><a href="#blog" className="hover:text-white">Travel Blog</a></li>
            </ul>
          </div>

          {/* CORPORATE */}
          <div className="text-center md:text-left">
            <h6 className="font-bold tracking-wide mb-4">Corporate</h6>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#about" className="hover:text-white">Our Story</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#contact-section" className="hover:text-white">Support Center</a></li>
              <li><Link to="/admin/login" className="hover:text-white">Login as Admin</Link></li>

            </ul>
          </div>

          {/* CONTACT */}
          <div className="text-center md:text-left">
            <h6 className="font-bold tracking-wide mb-4">Get In Touch</h6>

            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Phone size={16} className="mt-0.5 text-[#FF5722]" />
                <span>
                  <span className="text-white font-semibold">Call:</span>{" "}
                  +91 8879151953
                </span>
              </li>

              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Phone size={16} className="mt-0.5 text-green-500" />
                <span>
                  <span className="text-white font-semibold">WhatsApp:</span>{" "}
                  +91 8879151953
                </span>
              </li>

              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Mail size={16} className="mt-0.5 text-[#FF5722]" />
                <span>sales@travelvedas.com</span>
              </li>

              <li className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin size={16} className="mt-0.5 text-[#FF5722]" />
                <span>
                  Pioneer Heritage, 2nd Floor, Office 201, SV Road,
                  Santacruz West, Mumbai – 400054
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-12 py-6 text-center text-xs text-white/50">
          © 2025{" "}
          <span className="text-white font-semibold">TravelVedas</span>. All
          Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
