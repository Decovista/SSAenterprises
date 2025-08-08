import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import asstes from "../../assets/asstes";
import "./HeroSection.css";

function HeroSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const bannerImg = [
    {
      img: asstes.mainbanner1,
      mobileImg: asstes.mobileBanner
    },
     {
      img: asstes.mainbanner2,
      mobileImg: asstes.mobileBanner2
    },
  ];
  return (
    <div className="herosection w-full h-[400px] ">
      <Slider {...settings}>
          {bannerImg.map((bannerI, index) => {
            return (
              <>
              <div>
                <picture key={index}>
                  <source
                    srcSet={bannerI.mobileImg}
                    media="(max-width:768px)"
                  />
                  <img
                    src={bannerI.img}
                    className="w-full"
                    alt="mainBanner1"
                  />
                </picture>
                </div>
              </>
            );
          })}
      </Slider>
    </div>
  );
}

export default HeroSection;
