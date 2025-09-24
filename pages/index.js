import Header from "@/components/Header";
import Banner from "@/components/Home/Banner";
import Listings from "@/components/Home/Listings";
import PopularCategories from "@/components/PopularCategories";

const categories = [
  {
    id: 1,
    label: "westernwear",
    image: "https://picsum.photos/seed/westernwear/600/600",
  },
  {
    id: 2,
    label: "indianwear",
    image: "https://picsum.photos/seed/indianwear/600/600",
  },
  {
    id: 3,
    label: "Men",
    image: "https://picsum.photos/seed/men-fashion/600/600",
  },
  {
    id: 4,
    label: "kids",
    image: "https://picsum.photos/seed/kids-fashion/600/600",
  },
  {
    id: 5,
    label: "home",
    image: "https://picsum.photos/seed/home-decor/600/600",
  },
  {
    id: 6,
    label: "footwear",
    image: "https://picsum.photos/seed/footwear/600/600",
  },
  {
    id: 7,
    label: "lingerie",
    image: "https://picsum.photos/seed/lingerie/600/600",
  },
  {
    id: 8,
    label: "sports & active",
    image: "https://picsum.photos/seed/sports-active/600/600",
  },
  { id: 9, label: "bags", image: "https://picsum.photos/seed/bags/600/600" },
  {
    id: 10,
    label: "jewellery",
    image: "https://picsum.photos/seed/jewellery/600/600",
  },
  {
    id: 11,
    label: "sneakers",
    image: "https://picsum.photos/seed/sneakers/600/600",
  },
  {
    id: 12,
    label: "watches",
    image: "https://picsum.photos/seed/watches/600/600",
  },
  {
    id: 13,
    label: "sunglasses",
    image: "https://picsum.photos/seed/sunglasses/600/600",
  },
];

export default function Home() {
  return (
    <section className="banner">
      <Banner />
      <Listings categories={categories} />
      <div>
        <Header className="font-semibold text-4xl mx-14" element="h2">
          Top Categories on offer
        </Header>
        <Listings
          categories={categories}
          options={{ slidesToShow: 5 }}
          className="h-[300px]"
        />
      </div>
      <PopularCategories />
    </section>
  );
}
