import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Carousel from "./Carousel";
import { bannerContent } from "@/constants/home";

let settings = {
  dots: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  cssEase: "linear",
  fade: true,
  pauseOnHover: false,
};

const Banner = () => {
  return (
    <Carousel settings={settings} className="overflow-hidden">
      {bannerContent.map((cont) => (
        <div key={cont.id} className="relative h-[350px] w-full">
          <Image
            src={cont.image}
            alt={cont.label}
            fill
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
