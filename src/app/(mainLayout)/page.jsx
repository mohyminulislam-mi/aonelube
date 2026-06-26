import CarEngineOils from "@/components/mainLayout/home/category/CarEngineOils";
import FeaturedProducts from "@/components/mainLayout/home/FeaturedProducts";
import HeroSlider from "@/components/mainLayout/home/Hero";
import PopularSearches from "@/components/mainLayout/home/PopularSearches";

async function getProducts() {
  try {
    const res = await fetch("https://aonelube-server.vercel.app/api/products", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.products)) return data.products;

    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <HeroSlider />
      <PopularSearches />
      <FeaturedProducts />
      <CarEngineOils initialProducts={products} />
    </div>
  );
}
