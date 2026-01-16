"use client";

import { TrendingUp, UserPlus } from "lucide-react";

const CashbackSection = () => {
  return (
    <section
      id="cashback-modern"
      className="relative py-20 md:py-28 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1600&q=80')",
        contentVisibility: "auto",
        containIntrinsicSize: "1px 800px",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            Exclusive Offer
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            100% Cash Back{" "}
            <span className="text-yellow-400">Policy</span>
          </h2>

          <p className="max-w-2xl mx-auto text-white/80 text-sm md:text-base leading-relaxed">
            Experience the world for free. Book your dream tour package and
            enjoy a guaranteed 100% return on your travel bookings through our
            secure wallet system.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* CARD 1 */}
          <div
            className="
              relative
              bg-white/10
              backdrop-blur-lg
              border border-white/15
              rounded-3xl
              p-8
              text-white
              transition
              hover:-translate-y-2
              will-change-transform
            "
          >
            <div className="w-16 h-16 mb-6 rounded-xl bg-white/10 flex items-center justify-center">
              <TrendingUp className="text-yellow-400" size={32} />
            </div>

            <h3 className="text-2xl font-extrabold mb-1">
              5% <span className="text-yellow-400">Monthly</span>
            </h3>

            <p className="font-semibold mb-3">
              Passive Returns Every 30 Days
            </p>

            <p className="text-sm text-white/70 leading-relaxed">
              Earn 5% of your total package value every month. Your vacation
              gradually pays itself back — credited directly to your secure
              TravelVedas wallet.
            </p>

            <span className="absolute top-6 right-8 text-[10px] tracking-widest opacity-60 uppercase">
              Steady Growth
            </span>
          </div>

          {/* CARD 2 */}
          <div
            className="
              relative
              bg-yellow-400
              text-black
              rounded-3xl
              p-8
              transition
              hover:-translate-y-2
              will-change-transform
            "
          >
            <div className="w-16 h-16 mb-6 rounded-xl bg-black/10 flex items-center justify-center">
              <UserPlus size={32} />
            </div>

            <h3 className="text-2xl font-extrabold mb-1">
              10% Referral
            </h3>

            <p className="font-semibold mb-3">
              Accelerate Your Earnings
            </p>

            <p className="text-sm leading-relaxed">
              Refer friends & family and instantly earn an additional 10%
              cashback for every successful booking. Faster rewards, bigger
              returns.
            </p>

            <span className="absolute top-6 right-8 text-[10px] tracking-widest opacity-70 uppercase">
              Fast Track
            </span>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-12 text-center text-xs text-white/60">
          *Terms & conditions apply. Cashback managed through the TravelVedas
          Secure Wallet App.
        </p>
      </div>
    </section>
  );
};

export default CashbackSection;
