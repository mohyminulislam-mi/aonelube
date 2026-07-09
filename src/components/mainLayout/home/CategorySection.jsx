import React from "react";
import Link from "next/link";
import ProductCard from "@/components/mainLayout/products/ProductCard/ProductCard";

// Per-category high-resolution themed fallback images
const CATEGORY_FALLBACK_IMAGES = {
  "car-engine-oils":
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200",
  "motorcycle-engine-oils":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
  "bus-truck-engine-oils":
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200",
  "cng-engine-oils":
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200",
  "vehicle-care":
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1200",
  "vehicle-care-other-lubricants":
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1200",
  "industrial-lubricants":
    "https://images.unsplash.com/photo-1565984429576-c83f5e6b0b7a?q=80&w=1200",
  "industrial-specialty-lubricants":
    "https://images.unsplash.com/photo-1565984429576-c83f5e6b0b7a?q=80&w=1200",
};

const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200";

function getCategoryImage(category) {
  const rawImage = category?.image_url || category?.image || "";
  // If the image is missing, empty, or a broken local placeholder, use themed fallback
  if (
    !rawImage ||
    rawImage.includes("placeholder") ||
    rawImage.startsWith("/placeholder")
  ) {
    return (
      CATEGORY_FALLBACK_IMAGES[category?.slug] || DEFAULT_FALLBACK_IMAGE
    );
  }
  return rawImage;
}


export default function CategorySection({ category, products }) {
  // If no products in this category, don't render this section
  if (!products || products.length === 0) {
    return null;
  }

  // Show max 4 products per category
  const displayedProducts = products.slice(0, 4);
  const categorySlug = category?.slug || "";
  const categoryLink = `/products/category/${categorySlug}`;

  // Use smart image resolution: DB image → themed slug-based fallback → generic fallback
  const bannerImage = getCategoryImage(category);

  return (
    <section className="w-full font-sans mb-14">
      {/* Full-width Category Banner */}
      <div
        className="relative w-full h-[200px] md:h-[240px] bg-cover bg-center overflow-hidden flex items-center"
        style={{ backgroundImage: `url('${bannerImage}')` }}
      >
        {/* Dark overlay: gradient from left (dark) to transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/60 to-transparent" />

        {/* Banner Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
          <div className="max-w-xl">
            {/* Category Name */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm uppercase">
              {category?.name}
            </h2>
            {/* Description */}
            {category?.description && (
              <p className="text-gray-200 text-xs md:text-sm mt-2 line-clamp-2 font-medium max-w-lg leading-relaxed">
                {category.description}
              </p>
            )}
            {/* View All Button */}
            <div className="mt-4 md:mt-5">
              <Link
                href={categoryLink}
                className="inline-flex items-center text-xs md:text-sm font-bold text-white bg-[#005CA9] hover:bg-[#004480] px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 group"
              >
                <span>View All</span>
                <span className="ml-1.5 transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid below banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
