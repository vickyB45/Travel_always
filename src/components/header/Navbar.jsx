"use client";
import React, { useState } from "react";
import { Menu, X, Send } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItem =
    "px-4 py-2 font-semibold text-gray-700 hover:text-[#0077b6] transition whitespace-nowrap";

  // 🔥 SMOOTH SCROLL HANDLER
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setOpen(false);

    const target = document.querySelector(targetId);
    if (!target) return;

    const navOffset = 90; // navbar + topbar height
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - navOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="
          fixed top-[45px] md:top-[40px]
          left-0 right-0 z-[2040]
          h-[60px] md:h-[56px]
          bg-white shadow-lg
          md:min-w-[1050px]
          md:left-1/2 md:-translate-x-1/2
          md:rounded-full
          flex items-center justify-center
        "
      >
        <div className="w-full px-4 md:px-6 flex items-center justify-between max-w-[1200px]">

          {/* LOGO */}
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, "#hero")}
            className="flex-shrink-0"
          >
            <img
              src="/image/header/TravelVedaLogo.PNG"
              alt="TravelVedas"
              className="h-[36px] md:h-[40px] object-contain"
            />
          </a>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-2 mx-auto flex-1 justify-center max-w-[700px]">
            <li><a href="#hero" onClick={(e) => handleScroll(e, "#hero")} className={navItem}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleScroll(e, "#about")} className={navItem}>About Us</a></li>
            <li><a href="#domestic" onClick={(e) => handleScroll(e, "#domestic")} className={navItem}>Domestic Tours</a></li>
            <li><a href="#international" onClick={(e) => handleScroll(e, "#international")} className={navItem}>International Tours</a></li>
            <li><a href="#blog" onClick={(e) => handleScroll(e, "#blog")} className={navItem}>Blog</a></li>

            <li className="ml-3">
              <a
                href="#cashback-modern"
                onClick={(e) => handleScroll(e, "#cashback-modern")}
                className="
                  px-4 py-2 font-extrabold text-sm whitespace-nowrap
                  bg-gradient-to-r from-yellow-400 to-yellow-300
                  text-black rounded-full
                  shadow-[0_6px_20px_rgba(255,195,0,0.45)]
                  hover:scale-105 transition
                "
              >
                100% Cash Back
              </a>
            </li>
          </ul>

          {/* WALLET DESKTOP */}
          <div className="hidden lg:flex ml-auto">
            <a
              href="#tv-quote-request"
              onClick={(e) => handleScroll(e, "#tv-quote-request")}
              className="
                flex items-center gap-1 px-4 py-2
                rounded-lg bg-[#0077b6]
                text-white font-bold text-sm
                hover:bg-[#005f8f] transition
              "
            >
              <Send size={16} /> Wallet
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden ml-auto text-gray-700 p-1"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            fixed top-[105px] left-0 right-0 z-[2030]
            bg-white shadow-2xl border-t
            px-6 py-8 lg:hidden
            mx-auto max-w-md
          "
        >
          <ul className="flex flex-col gap-4 text-center">
            {[
              ["Home", "#hero"],
              ["About Us", "#about"],
              ["Domestic Tours", "#domestic"],
              ["International Tours", "#international"],
              ["Blog", "#blog"],
            ].map(([label, id]) => (
              <li key={id}>
                <a
                  href={id}
                  onClick={(e) => handleScroll(e, id)}
                  className={`${navItem} py-3 text-lg`}
                >
                  {label}
                </a>
              </li>
            ))}

            <li>
              <a
                href="#cashback-modern"
                onClick={(e) => handleScroll(e, "#cashback-modern")}
                className="
                  block w-full px-6 py-4
                  rounded-full font-extrabold text-lg
                  bg-gradient-to-r from-yellow-400 to-yellow-300
                "
              >
                100% Cash Back
              </a>
            </li>

            <li>
              <a
                href="#tv-quote-request"
                onClick={(e) => handleScroll(e, "#tv-quote-request")}
                className="
                  flex justify-center items-center gap-2
                  w-full px-8 py-4 rounded-xl
                  bg-[#0077b6] text-white
                  font-bold text-lg
                "
              >
                <Send size={20} /> Wallet
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
