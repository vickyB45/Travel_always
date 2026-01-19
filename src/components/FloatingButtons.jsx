"use client";
import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingButtons = () => {
  return (
    <>
      {/* CALL BUTTON - Bottom Left */}
      <a
        href="tel:+918879151953"
        aria-label="Call TravelVedas"
        className="
          fixed bottom-5 left-5 z-[3000]
          w-14 h-14
          flex items-center justify-center
          rounded-full
          bg-[#0077b6]
          text-white
          shadow-[0_8px_25px_rgba(0,119,182,0.45)]
          hover:scale-110
          transition-all duration-300
        "
      >
        <FaPhoneAlt size={22} />
      </a>

      {/* WHATSAPP BUTTON - Bottom Right */}
      <a
        href="https://wa.me/918879151953?text=Hi%20TravelVedas,%20I%20am%20interested%20in%20planning%20a%20trip.%20Could%20you%20please%20provide%20more%20details%20about%20your%20available%20packages?"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp TravelVedas"
        className="
          fixed bottom-5 right-5 z-[3000]
          w-16 h-16
          flex items-center justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-[0_10px_30px_rgba(37,211,102,0.55)]
          hover:scale-110
          transition-all duration-300
        "
      >
        <FaWhatsapp size={30} />
      </a>
    </>
  );
};

export default FloatingButtons;
