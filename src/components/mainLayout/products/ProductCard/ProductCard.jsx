import React from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const productSlug = product?.slug || product?._id || product?.id;
  const productHref = productSlug ? `/products/${encodeURIComponent(productSlug)}` : "/products";
  const price = Number(product?.price || 0);

  return (
    <Link
      href={productHref}
      className="bg-white rounded-2xl border border-gray-150/70 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {/* Quality/Premium Badge */}
        <div className="absolute top-2 left-2 bg-[#ED1C24] text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs z-10">
          German Quality
        </div>

        <img
          src={
            (Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null) ||
            product.image_url ||
            product.image ||
            "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600"
          }
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[10px] sm:text-[11px] text-[#ED1C24] font-extrabold tracking-wider uppercase">
            {typeof product.category === "object"
              ? product.category?.name || "Engine Oil"
              : product.category || "Engine Oil"}
          </span>
          <h3 className="text-xs sm:text-sm font-extrabold text-gray-800 group-hover:text-[#005CA9] transition-colors mt-1 line-clamp-2 leading-snug">
            {product.name}
          </h3>
          
          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400 font-extrabold">5.0 (12)</span>
          </div>

          {/* Division Availability */}
          <div className="flex items-center gap-1 mt-1.5 text-[10px] sm:text-xs text-gray-500 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="truncate">
              {!product.availableDivisions || product.availableDivisions.length === 0
                ? "Available Nationwide"
                : `${product.availableDivisions.join(", ")}`}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
          <span className="text-sm sm:text-base font-black text-[#005CA9]">
            ${price.toFixed(2)}
          </span>
          {/* Desktop Buy Button */}
          <span className="hidden sm:inline-block bg-gray-950 group-hover:bg-[#ED1C24] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors duration-200">
            Add to Cart
          </span>
          {/* Mobile Icon Button */}
          <span className="inline-block sm:hidden bg-gray-950 group-hover:bg-[#ED1C24] text-white p-1.5 rounded-lg transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
