import Banner from "@/components/Home/Banner";
import PopularCategories from "@/components/PopularCategories";

export default function Home() {
  return (
    <section className="banner">
      <Banner />
      <PopularCategories />
    </section>
  );
}
