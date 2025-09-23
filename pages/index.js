import Banner from "@/components/Home/Banner";
import Listings from "@/components/Home/Listings";
import PopularCategories from "@/components/PopularCategories";

export default function Home() {
  return (
    <section className="banner">
      <Banner />
      <Listings />
      <PopularCategories />
    </section>
  );
}
