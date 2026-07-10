import React from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const productSlug = product?.slug || product?._id || product?.id;
  const productHref = productSlug
    ? `/products/${encodeURIComponent(productSlug)}`
    : "/products";
  const price = Number(product?.price || 0);

  return (
    <Link
      href={productHref}
      className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={
            (Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : null) ||
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
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] text-gray-400 font-medium uppercase">
            {typeof product.category === "object"
              ? product.category?.name || "Engine Oil"
              : product.category || "Engine Oil"}
          </span>
          <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#005CA9] transition-colors mt-0.5 line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <span className="text-base font-black text-[#005CA9]">
            ${price.toFixed(2)}
          </span>
          <span className="bg-gray-950 group-hover:bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-md transition-colors">
            Add to Cart
          </span>
        </div>
      </div>
    </Link>
  );
}
