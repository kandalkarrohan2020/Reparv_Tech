import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PropertyImageSlider = ({ property }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(window.innerWidth >= 768 ? 2 : 1);
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto border border-[#00000033] rounded-lg sm:p-4 relative flex flex-col">
      {/* Thumbnail Swiper (Above main image on medium and large screens, below on small screens) */}
      <div className="order-1 md:order-0 m-2 overflow-scroll whitespace-nowrap scrollbar-hide border border-[#00000033] rounded-lg p-3">
        <div className="flex gap-3 w-full">
          {property.images.map((img, index) => (
            <div
              key={index}
              className={`w-[100px] h-[65px] flex-shrink-0 cursor-pointer border rounded-lg overflow-hidden bg-center bg-cover transition-opacity duration-300 ${activeIndex === index ? "opacity-100" : "opacity-50"}`}
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => {
                mainSwiper && mainSwiper.slideTo(index);
                setActiveIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Image Swiper - Single Image for Small Screens, Two for Medium Screens and Above */}
      <div className="relative order-0 md:order-1 sm:my-2">
        <Swiper
          key={slidesPerView}
          modules={[Navigation, Pagination, Thumbs]}
          navigation={{ prevEl: "#prev-slide", nextEl: "#next-slide" }}
          pagination={{ clickable: true, el: ".custom-pagination2" }}
          thumbs={{ swiper: thumbsSwiper }}
          slidesPerView={slidesPerView}
          spaceBetween={10}
          loop={true}
          onSwiper={setMainSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="relative overflow-hidden"
        >
          {property.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} className="w-full h-90 object-cover rounded-tr-lg rounded-tl-lg sm:rounded-lg" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Navigation Arrows and Pagination Always Below Everything */}
      <div className="flex justify-between sm:justify-center items-center m-2 sm:mx-0 gap-3 order-3">
        <button className="p-3 border border-[#00000033] rounded-full" id="prev-slide">
          <FaArrowLeft />
        </button>
        <div className="flex items-center justify-center">
          <div className="custom-pagination2 flex items-center justify-center gap-[2px] sm:gap-1 z-10"></div>
        </div>
        <button className="p-3 border border-[#00000033] rounded-full" id="next-slide">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PropertyImageSlider;
