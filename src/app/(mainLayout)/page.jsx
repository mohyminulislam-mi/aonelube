import FeaturedProducts from "@/components/mainLayout/home/FeaturedProducts";
import HeroSlider from "@/components/mainLayout/home/Hero";


export default async function Home() {
  return (
    <section>
      <HeroSlider />
      <FeaturedProducts />
    </section>
  );
}
