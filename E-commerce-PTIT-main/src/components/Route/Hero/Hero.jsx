import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Hero = () => {
  const slides = [
    {
      url: "https://fbshop.vn/wp-content/uploads/2024/01/Banner-website-4-min.webp",
    },
    {
      url: "https://cdn.shopvnb.com/img/1920x640/uploads/slider/nanoflare-800_1698800723.webp",
    },
    {
      url: "https://cdn.shopvnb.com/img/1920x640/uploads/slider/65z3ltd-launch-website_1695177820.webp",
    },
    {
      url: "https://fbshop.vn/wp-content/uploads/2024/01/2-1-min.webp",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="mb-4 mt-[58px] sm:mb-10 md:mb-12 lg:mb-10 flex gap-2 p-4">
      <div className="shrink-0 basis-8/12 flex-grow">
        <div className=" relative col-span-6 overflow-hidden rounded-lg group">
          <div className="hidden group-hover:block absolute top-[50%] left-5 transform -translate-y-1/2 text-xl rounded-full p-2 bg-[#f66315] text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={25} />
          </div>
          <img src='/static/images/banner-2.png' alt="" />
          <div className="hidden group-hover:block absolute top-[50%] right-5 transform -translate-y-1/2 text-xl rounded-full p-2 bg-[#f66315] text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={25} />
          </div>
        </div>

      </div>
      <div className="lg:flex flex-col justify-between hidden gap-y-[5px]">
        <div className="overflow-hidden rounded hidden lg:block lg:col-span-2 items-center justify-center">
          <img src='/static/images/promotion1.jpg' alt="" />
        </div>
        <div className="overflow-hidden rounded hidden lg:block lg:col-span-2 items-center justify-center">
          <img src='/static/images/promotion2.jpg' alt="" />

        </div>
      </div>
    </div>
  );
};


export default Hero;



{/* <Link to="/san-pham">
  <div
    style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
    className="w-full h-64 sm:h-80 md:h-96 lg:h-[480px] bg-center bg-cover duration-500"
  ></div>
</Link>
<div className="hidden group-hover:block absolute top-[50%] left-5 transform -translate-y-1/2 text-xl rounded-full p-2 bg-[#f66315] text-white cursor-pointer">
  <BsChevronCompactLeft onClick={prevSlide} size={25} />
</div>
<div className="hidden group-hover:block absolute top-[50%] right-5 transform -translate-y-1/2 text-xl rounded-full p-2 bg-[#f66315] text-white cursor-pointer">
  <BsChevronCompactRight onClick={nextSlide} size={25} />
</div> */}