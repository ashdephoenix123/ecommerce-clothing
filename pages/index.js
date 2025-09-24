import Banner from "@/components/Home/Banner";
import Listings from "@/components/Home/Listings";
import Offers from "@/components/Offers";
import PopularCategories from "@/components/PopularCategories";
import { categories } from "@/constants/home";

export default function Home() {
  return (
    <section className="banner">
      <Banner />
      <Listings categories={categories} />
      <Offers
        heading="Trending Now"
        subHeading="Top categories on offer"
        options={categories}
      />
      <PopularCategories />
      <Offers
        heading="Our Stores"
        subHeading="Find everything for your every need"
        options={categories}
      />
    </section>
  );
}
