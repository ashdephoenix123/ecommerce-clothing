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
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    ...options,
  };
  return (
    <Carousel settings={settings} className="mx-4 my-8 md:m-12">
      {categories.map((cont) => (
        <div key={cont.id} className="px-2">
          <div
            className={`relative w-full h-72 px-4 overflow-hidden ${className}`}
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
