import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./UI/Button";
import sliderHomeData from "../data/sliderHomeData.json";

export default function SliderHome() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };
  return (
    <div className="slider-container mx-2 text-txtLight lg:ml-32 lg:mr-10">
      <Slider {...settings}>
        {sliderHomeData.map((data, i) => {
          return (
            <div key={i} className="h-auto p-2">
              <h2 className="font-dancing text-3xl md:text-6xl">
                {data.header}
              </h2>
              <p className="my-5">{data.text}</p>
              <Button el="link" to="/menu">
                Hemen Sipariş Ver
              </Button>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
