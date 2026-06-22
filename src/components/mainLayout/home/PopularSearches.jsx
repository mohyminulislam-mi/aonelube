"use client";

import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

// ক্যাটাগরি ডেটা স্ট্রাকচার
const categoriesData = [
  {
    id: 1,
    title: "Bus & Truck Oils",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Vehicle Care",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Industrial Lubricants",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1538334057867-fa6d767c2937?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Car Engine Oils",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Motorcycle Oils",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=500&auto=format&fit=crop",
  },
];

export default function PopularSearches() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Title & Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">
              Popular Searches
            </h2>
            <p className="text-gray-500 text-sm mt-1">Browse by category</p>
          </div>

          {/* View All Details */}
          <a
            href="#"
            className="flex items-center text-sm font-semibold text-[#005CA9] hover:text-[#004480] transition-colors group"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-0.5 transform group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* 5-Column Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categoriesData.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Category Image Wrapper */}
              <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Category Footer Content */}
              <div className="p-4 flex flex-col justify-between flex-grow bg-white">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#005CA9] transition-colors line-clamp-1">
                  {category.title}
                </h3>

                {/* View All Text Link with Arrow */}
                <span className="inline-flex items-center text-xs font-medium text-gray-400 mt-2 group-hover:text-[#005CA9] transition-colors">
                  View all
                  <ArrowRight className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
