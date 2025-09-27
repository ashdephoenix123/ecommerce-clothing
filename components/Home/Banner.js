import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Carousel from "./Carousel";
import { bannerContent } from "@/constants/home";
import Link from "next/link";

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
        <div key={cont.id} className="relative h-[450px] w-full">
          <Link href={cont.href}>
            <Image
              src={cont.image}
              alt={cont.label}
              fill
              className="object-cover"
            />
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
