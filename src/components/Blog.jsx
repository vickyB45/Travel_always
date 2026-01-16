"use client";

import { Compass } from "lucide-react";

const blogs = [
  {
    title: "Hidden Gems of Vietnam",
    highlight: "Vietnam",
    desc: "A guide to off-the-beaten-path destinations.",
    img: "https://i.pinimg.com/736x/f9/4f/9c/f94f9c3a21f994204512f7ec0c1879ba.jpg",
    link: "#",
  },
  {
    title: "Maximizing Your Cash Back",
    highlight: "Cash Back",
    desc: "Tips on utilizing our 5% monthly return policy.",
    img: "https://i.pinimg.com/736x/2f/6e/47/2f6e47a8f371433bd21287b566d57e14.jpg",
    link: "#",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="py-16 md:py-24 bg-slate-50"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "1px 500px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* HEADER */}
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
          <Compass className="inline-block mr-2 mb-1" size={26} />
          Travel Inspiration &{" "}
          <span className="text-[#0077b6]">Guides</span>
        </h2>

        <p className="text-slate-500 max-w-2xl mx-auto mb-12">
          Read our latest posts on destination highlights, visa tips, and
          money-saving travel hacks.
        </p>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 justify-center max-w-4xl mx-auto">
          {blogs.map((blog, i) => (
            <a
              key={i}
              href={blog.link}
              className="
                group
                bg-white
                rounded-xl
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                transition
                will-change-transform
                hover:-translate-y-2
                text-left
              "
            >
              {/* IMAGE */}
              <img
                src={blog.img}
                alt={blog.title}
                loading="lazy"
                decoding="async"
                width="300"
                height="200"
                className="w-full h-40 object-cover bg-gray-100"
              />

              {/* CONTENT */}
              <div className="p-4">
                <h5 className="font-bold text-slate-900 mb-1">
                  {blog.title.split(blog.highlight)[0]}
                  <span className="text-[#0077b6] font-extrabold">
                    {blog.highlight}
                  </span>
                </h5>

                <p className="text-xs text-slate-500">
                  {blog.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
