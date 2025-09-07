import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerContent = [
  {
    id: 1,
    image: "/banner/banner-image-1.png",
    label: "Banner 1",
  },
  {
    id: 2,
    image: "/banner/banner-2.png",
    label: "Banner 2",
  },
];

const Banner = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="md:m-12">
      {bannerContent.map((cont) => (
        <div
          key={cont.id}
          className="relative w-full h-[calc(100vh-140px)] md:rounded-xl overflow-hidden"
        >
          <Image
            fill
            src={cont.image}
            alt={cont.label}
            className="absolute object-cover object-bottom"
          />
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
