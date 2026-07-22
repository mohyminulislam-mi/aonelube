import React from "react";
import Link from "next/link";
import Image from "next/image";

const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

export default function ProductCard({ product, priority = false }) {
  const productSlug = product?.slug || product?._id || product?.id;
  const productHref = productSlug
    ? `/products/${encodeURIComponent(productSlug)}`
    : "/products";
  const price = Number(product?.price || 0);

  const imageSrc =
    (Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : null) ||
    product.image_url ||
    product.image ||
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600";

  return (
    <Link
      href={productHref}
      className="bg-white rounded-xl sm:rounded-2xl h-[550px] border border-gray-150/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden h-full">
        {/* Quality/Premium Badge */}
        <div className="absolute top-2 left-2 bg-primary text-white text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 sm:px-2 rounded-md shadow-xs z-10">
          German Quality
        </div>

        <div className="relative h-96 w-full overflow-hidden group">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            priority={priority}
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[9px] sm:text-[10px] text-primary font-bold tracking-wider uppercase">
            {typeof product.category === "object"
              ? product.category?.name || "Engine Oil"
              : product.category || "Engine Oil"}
          </span>
          <h3 className="text-[11px] sm:text-xs md:text-xl font-bold text-gray-800 group-hover:text-accent transition-colors mt-0.5 sm:mt-1 line-clamp-2 leading-snug sm:leading-normal">
            {product.name}
          </h3>

          {/* Star Rating */}
          {/* <div className="flex items-center gap-1 mt-1 sm:mt-1.5">
            <div className="flex text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-3.5 sm:h-3.5">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[9px] sm:text-xs text-gray-400 font-semibold">5.0 (12)</span>
          </div> */}

          {/* Division Availability */}
          {/* <div className="flex items-center gap-1 mt-1 sm:mt-1.5 text-[9px] sm:text-xs text-gray-400 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400 shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="truncate">
              {!product.availableDivisions || product.availableDivisions.length === 0
                ? "Available Nationwide"
                : `${product.availableDivisions.join(", ")}`}
            </span>
          </div> */}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-gray-100">
          <span className="text-xs sm:text-sm md:text-base font-extrabold text-accent">
            ৳{price.toFixed(2)}
          </span>
          {/* Single responsive cart button: icon-only circle on mobile, icon+text on desktop */}
          <span className="flex items-center justify-center gap-1.5 bg-gray-900 group-hover:bg-primary text-white text-xs font-bold w-7 h-7 sm:w-auto sm:h-auto rounded-full sm:rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 sm:px-3 sm:py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-3.5 h-3.5 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="hidden sm:inline">Add to Cart</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
