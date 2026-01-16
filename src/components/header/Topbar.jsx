import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Topbar = () => {
  return (
    <div
      className="
        fixed top-0 left-0 w-full
        h-[45px] md:h-[40px]
        bg-[#355E3B]
        z-[2050]
        flex items-center
        shadow-md
      "
    >
      <div
        className="
          w-full max-w-[1200px] mx-auto
          flex justify-center md:justify-end
          px-4
          gap-5
        "
      >
        <a
          href="https://www.facebook.com/YOUR_PAGE"
          target="_blank"
          aria-label="Visit us on Facebook"
          className="text-[#F7E8D3] transition-transform duration-200 hover:scale-110 hover:opacity-90"
        >
          <Facebook size={20} />
        </a>

        <a
          href="https://www.instagram.com/travelvedass/?igsh=MWJwajZmNXQ5MzVtZQ%3D%3D#"
          target="_blank"
          aria-label="Visit us on Instagram"
          className="text-[#F7E8D3] transition-transform duration-200 hover:scale-110 hover:opacity-90"
        >
          <Instagram size={20} />
        </a>

        <a
          href="https://twitter.com/"
          target="_blank"
          aria-label="Visit us on X (Twitter)"
          className="text-[#F7E8D3] transition-transform duration-200 hover:scale-110 hover:opacity-90"
        >
          <Twitter size={20} />
        </a>

        <a
          href="https://www.youtube.com/@TravelVedasTours"
          target="_blank"
          aria-label="Visit us on YouTube"
          className="text-[#F7E8D3] transition-transform duration-200 hover:scale-110 hover:opacity-90"
        >
          <Youtube size={20} />
        </a>
      </div>
    </div>
  );
};

export default Topbar;
