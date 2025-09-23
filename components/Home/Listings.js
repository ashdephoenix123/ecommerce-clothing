import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import NextArrow from "../icons/NextArrow";
import PrevArrow from "../icons/PrevArrow";
import Carousel from "./Carousel";

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

const Listings = () => {
  let settings = {
    dots: false,
    slidesToShow: 8,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Carousel settings={settings} className="md:m-12">
      {categories.map((cont) => (
        <div key={cont.id} className="px-2">
          <div className="relative w-full h-72 px-4 md:rounded-xl overflow-hidden">
            <Image
              fill
              src={cont.image}
              alt={cont.label}
              className="absolute object-cover"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Listings;
