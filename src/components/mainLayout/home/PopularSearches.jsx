"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getCategories } from "@/lib/api";

function normalizeCategories(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

const CATEGORY_FALLBACK_IMAGES = {
  "car-engine-oils":
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600",
  "motorcycle-engine-oils":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600",
  "bus-truck-engine-oils":
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600",
  "cng-engine-oils":
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600",
  "vehicle-care":
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=600",
  "industrial-lubricants":
    "https://images.unsplash.com/photo-1565984429576-c83f5e6b0b7a?q=80&w=600",
};

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600";

function getCategoryImage(category) {
  const img = category?.image || category?.image_url;
  if (!img || img.includes("placeholder") || img.startsWith("/")) {
    return CATEGORY_FALLBACK_IMAGES[category?.slug] || DEFAULT_FALLBACK;
  }
  return img;
}

export default function PopularSearches() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (active) {
          const list = normalizeCategories(data);
          list.sort((a, b) => {
            if (
              a.display_order !== undefined &&
              b.display_order !== undefined
            ) {
              return a.display_order - b.display_order;
            }
            return (a.name || "").localeCompare(b.name || "");
          });
          setCategories(list);
        }
      } catch (error) {
        console.error("Silently failed to fetch categories:", error);
        if (active) {
          setCategories([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCategories();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Section Title & Header (Skeleton) */}
          <div className="flex items-end justify-between mb-8">
            <div className="w-1/3 space-y-2">
              <div className="h-8 bg-gray-150 rounded animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
            </div>
            <div className="h-4 bg-gray-150 rounded w-16 animate-pulse" />
          </div>

          {/* 5-Column Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-xs animate-pulse overflow-hidden flex flex-col"
              >
                {/* Category Image Wrapper */}
                <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden" />

                {/* Category Footer Content */}
                <div className="p-4 flex flex-col justify-between flex-grow bg-white">
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

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
            className="flex items-center text-sm font-semibold text-primary hover:text-[#004480] transition-colors group"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-0.5 transform group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* 5-Column Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((category) => {
            const categoryId = category.id || category._id;
            const categoryLink = `/products/category/${category.slug}`;

            return (
              <a
                key={categoryId}
                href={categoryLink}
                className="bg-white rounded-2xl border border-gray-150/70 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Category Image Wrapper */}
                <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
                  <img
                    src={getCategoryImage(category)}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Category Footer Content */}
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow bg-white">
                  <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                    {category.name}
                  </h3>

                  {/* View All Text Link with Arrow */}
                  <span className="inline-flex items-center text-[10px] sm:text-xs font-semibold text-gray-400 mt-2 group-hover:text-primary transition-colors">
                    View all
                    <ArrowRight className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
