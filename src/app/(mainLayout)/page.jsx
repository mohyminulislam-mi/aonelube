import CarEngineOils from "@/components/mainLayout/home/category/CarEngineOils";
import FeaturedProducts from "@/components/mainLayout/home/FeaturedProducts";
import HeroSlider from "@/components/mainLayout/home/Hero";
import PopularSearches from "@/components/mainLayout/home/PopularSearches";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <PopularSearches />
      <FeaturedProducts />
      <CarEngineOils />
    </div>
  );
}
