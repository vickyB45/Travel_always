"use client";
import {
  Info,
  Sparkles,
  Wallet,
  MapPin,
  Truck,
} from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="
        relative
        py-16 md:py-24
        bg-[url('https://picsum.photos/1920/1080?random=110')]
        bg-cover bg-center
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* TITLE */}
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-white mb-6">
          <Info className="inline-block mb-1 mr-2" size={28} />
          About TravelVedas:{" "}
          <span className="text-sky-400">Redefining Travel Experiences</span>
        </h2>

        {/* STORY – FULL TEXT (UNCHANGED MEANING) */}
        <p className="max-w-5xl mx-auto text-center text-white/90 leading-relaxed mb-12 text-sm md:text-base">
          TravelVedas was founded on a simple yet revolutionary principle:{" "}
          <span className="inline-block bg-yellow-400 text-black px-2 py-1 rounded font-bold">
            Travel Now, Earn Back Later.
          </span>{" "}
          At TravelVedas, we believe that exploring the world’s most breathtaking
          destinations shouldn’t just be a memory — it should be a rewarding
          experience. As a premier travel management company, we specialize in
          curating personalized 5-star domestic and international tours that
          blend opulence with an unprecedented financial advantage.
          <br />
          <br />
          TravelVedas is revolutionizing the travel industry by combining
          unforgettable, luxury-focused journeys with a unique financial
          assurance model — all backed by our unprecedented{" "}
          <span className="inline-block bg-yellow-400 text-black px-2 py-1 rounded font-bold">
            100% Cash Back Policy.
          </span>{" "}
          Our commitment is to deliver seamless, high-quality travel experiences
          that are not only memorable but also financially rewarding.
        </p>

        {/* VIDEO – AUTOPLAY | LOOP | MUTE | NO CONTROLS */}
        <div className="max-w-4xl mx-auto mb-16 rounded-xl overflow-hidden shadow-2xl aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/cEgcKOmZ2M4?autoplay=1&mute=1&controls=1&rel=0&loop=0&playlist=5K1t4p0BDQY"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* WHY BOOK */}
        <h3 className="text-center text-xl md:text-2xl font-extrabold text-white mb-10">
          <Sparkles className="inline-block mr-2" size={24} />
          Why Book With TravelVedas?
        </h3>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:-translate-y-2 transition">
            <Wallet className="mx-auto text-sky-400 mb-4" size={40} />
            <h5 className="font-bold text-white mb-2">Risk-Free Travel</h5>
            <p className="text-sm text-white/85">
              Travel without fear. We are the only travel company offering a
              guaranteed 100% Cash Back policy on your bookings.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:-translate-y-2 transition">
            <MapPin className="mx-auto text-yellow-400 mb-4" size={40} />
            <h5 className="font-bold text-white mb-2">Global Coverage</h5>
            <p className="text-sm text-white/85">
              From Goa to Dubai, Thailand to Vietnam — we cover the world’s most
              iconic and desired destinations.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:-translate-y-2 transition">
            <Truck className="mx-auto text-sky-400 mb-4" size={40} />
            <h5 className="font-bold text-white mb-2">Seamless Service</h5>
            <p className="text-sm text-white/85">
              Flight tickets, visas, airport transfers, luxury stays, and 24/7
              on-ground assistance — everything handled end-to-end.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
