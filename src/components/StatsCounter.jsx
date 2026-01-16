"use client";

import { useEffect, useRef } from "react";
import {
  MapPinned,
  Users,
  Globe2,
  Star,
} from "lucide-react";

const stats = [
  {
    label: "Total Tours",
    value: 1500,
    icon: MapPinned,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Happy Clients",
    value: 8752,
    icon: Users,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Destinations",
    value: 450,
    icon: Globe2,
    color: "bg-red-100 text-red-600",
  },
  {
    label: "Satisfaction",
    value: 99,
    suffix: "%",
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function StatsCounter() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-target]");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = Number(el.dataset.target);
          const suffix = el.dataset.suffix || "";
          let current = 0;
          const step = Math.max(1, Math.floor(target / 100));

          const tick = () => {
            current += step;
            if (current < target) {
              el.textContent = current.toLocaleString() + suffix;
              requestAnimationFrame(tick);
            } else {
              el.textContent = target.toLocaleString() + suffix;
            }
          };

          tick();
          obs.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-counter"
      ref={containerRef}
      className="relative py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "1px 600px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block bg-white text-blue-600 text-xs font-bold px-4 py-1 rounded-full shadow mb-3 tracking-widest uppercase">
            Our Track Record
          </span>

          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
            We Create Unforgettable{" "}
            <span className="text-blue-600">Memories</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="
                  bg-white/80
                  backdrop-blur
                  rounded-2xl
                  p-6
                  text-center
                  shadow
                  transition
                  hover:-translate-y-2
                  will-change-transform
                "
              >
                <div
                  className={`mx-auto mb-4 w-14 h-14 rounded-xl flex items-center justify-center ${stat.color}`}
                >
                  <Icon size={26} />
                </div>

                <h3
                  data-target={stat.value}
                  data-suffix={stat.suffix || ""}
                  className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1"
                >
                  0
                </h3>

                <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
