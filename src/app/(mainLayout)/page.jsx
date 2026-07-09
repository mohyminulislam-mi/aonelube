import { Suspense } from "react";
import FeaturedProducts from "@/components/mainLayout/home/FeaturedProducts";
import HeroSlider from "@/components/mainLayout/home/Hero";
import PopularSearches from "@/components/mainLayout/home/PopularSearches";
import CategorySection from "@/components/mainLayout/home/CategorySection";
import { getCategories, getProducts } from "@/lib/api";

function normalizeCategories(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function normalizeProducts(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function CategorySectionSkeleton() {
  return (
    <div className="w-full font-sans mb-14 animate-pulse">
      {/* Banner Skeleton */}
      <div className="w-full h-[200px] md:h-[240px] bg-gray-200 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
          <div className="max-w-xl space-y-4">
            <div className="h-9 w-64 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-96 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="h-4 w-72 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="h-9 w-28 bg-gray-300 rounded-lg mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col justify-between aspect-[3/4] animate-pulse">
              <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4"></div>
              <div className="space-y-2 flex-grow">
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded mt-1"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mt-1"></div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="h-5 w-12 bg-gray-200 rounded"></div>
                <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategorySectionsSkeleton() {
  return (
    <>
      <CategorySectionSkeleton />
      <CategorySectionSkeleton />
    </>
  );
}

async function CategorySectionsList() {
  try {
    const categoriesRaw = await getCategories();
    const categories = normalizeCategories(categoriesRaw);

    // Sort categories by display_order
    categories.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

    // Parallel fetch products for each category
    const categorySections = await Promise.all(
      categories.map(async (category) => {
        try {
          const productsRaw = await getProducts({ category: category.slug, limit: 4 });
          const products = normalizeProducts(productsRaw);
          return { category, products };
        } catch (error) {
          console.error(`Error fetching products for category: ${category.slug}`, error);
          return { category, products: [] };
        }
      })
    );

    // Filter categories that have at least 1 product
    const activeSections = categorySections.filter((section) => section.products.length > 0);

    if (activeSections.length === 0) {
      return null;
    }

    return (
      <>
        {activeSections.map(({ category, products }) => (
          <CategorySection
            key={category._id || category.id || category.slug}
            category={category}
            products={products}
          />
        ))}
      </>
    );
  } catch (error) {
    console.error("Error loading category sections:", error);
    return null;
  }
}

export default async function Home() {
  return (
    <div>
      <HeroSlider />
      <PopularSearches />
      <FeaturedProducts />
      
      <Suspense fallback={<CategorySectionsSkeleton />}>
        <CategorySectionsList />
      </Suspense>
    </div>
  );
}
