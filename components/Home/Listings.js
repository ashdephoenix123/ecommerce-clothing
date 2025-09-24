import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import NextArrow from "../icons/NextArrow";
import PrevArrow from "../icons/PrevArrow";
import Carousel from "./Carousel";

const Listings = ({ categories, options, className = "" }) => {
  let settings = {
    dots: false,
    slidesToShow: 8,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    ...options,
  };
  return (
    <Carousel settings={settings} className="md:m-12">
      {categories.map((cont) => (
        <div key={cont.id} className="px-2">
          <div
            className={`relative w-full h-72 px-4 md:rounded-xl overflow-hidden ${className}`}
          >
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
