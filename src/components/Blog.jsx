
"use client";

import { Compass } from "lucide-react";
import { usePublicBlogs } from "../hooks/public/publicQuery";

export default function Blog() {
  const { data, isLoading } = usePublicBlogs();

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

          {/* 🔄 SKELETON LOADER */}
          {isLoading &&
            Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="w-full h-40 bg-slate-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                  <div className="flex gap-1 mt-2">
                    <div className="h-4 w-12 bg-slate-200 rounded-full" />
                    <div className="h-4 w-14 bg-slate-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))}

          {/* ✅ REAL DATA */}
          {!isLoading && data?.length > 0 &&
            data.map((blog) => (
              <div
                key={blog._id}
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
                  className="w-full h-60 object-cover bg-gray-100"
                />

                {/* CONTENT */}
                <div className="p-4">
                  <h5 className="font-bold text-slate-900 mb-1">
                    {blog.title.split(blog.highlight)[0]}
                    <span className="text-[#0077b6] font-extrabold">
                      {blog.highlight}
                    </span>
                  </h5>

                  <p className="text-xs text-slate-500 mb-2">
                    {blog.desc}
                  </p>

                  {/* 🏷 META DATA TAGS */}
                  {blog.metaData?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1">
                      {blog.metaData.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="
                            text-[10px]
                            font-medium
                            text-orange-600
                            bg-orange-50
                            border
                            border-orange-200
                            px-2
                            py-0.5
                            rounded-full
                            leading-tight
                          "
                        >
                          {tag}
                        </span>
                      ))}

                      {blog.metaData.length > 3 && (
                        <span className="text-[10px] text-slate-400 ml-1">
                          +{blog.metaData.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

          {/* 🚫 EMPTY STATE */}
          {!isLoading && data?.length === 0 && (
            <p className="text-slate-500 text-sm col-span-full">
              No blogs available right now.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
