"use client";
import { useEffect, useState } from "react";
import { Bell, X, ArrowRight } from "lucide-react";

const CashbackModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      {/* MODAL */}
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] animate-fadeUp overflow-hidden">

        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 cursor-pointer right-4 text-slate-400 hover:text-slate-700 transition"
        >
          <X size={20} />
        </button>

        {/* ICON */}
        <div className="flex justify-center pt-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400/20">
            <Bell className="text-yellow-500" size={28} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-8 pb-10 pt-6 text-center">
          <p className="text-xs tracking-widest font-bold text-yellow-500 uppercase mb-2">
            Limited Time Offer
          </p>

          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            100% Cash Back GUARANTEED!
          </h3>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
            Book your dream holiday and receive{" "}
            <span className="font-semibold text-slate-900">
              5% monthly cashback
            </span>{" "}
            credited directly to your TravelVedas wallet.
          </p>

          {/* CTA */}
          <a
            href="#cashback-modern"
            onClick={() => setOpen(false)}
            className="
              inline-flex items-center justify-center gap-2
              w-full
              rounded-xl
              bg-slate-900
              py-3.5
              text-white
              font-bold
              tracking-wide
              hover:bg-slate-800
              transition
            "
          >
            View Cashback Policy
            <ArrowRight size={18} />
          </a>

          <p className="text-xs text-slate-400 mt-4">
            *T&C apply. Cashback credited monthly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CashbackModal;
