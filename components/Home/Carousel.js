import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

let defaultSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = ({ settings, className, children }) => {
  const options = { ...defaultSettings, ...settings };
  return (
    <Slider {...options} className={`carousel ${className && className}`}>
      {children}
    </Slider>
  );
};

export default Carousel;
