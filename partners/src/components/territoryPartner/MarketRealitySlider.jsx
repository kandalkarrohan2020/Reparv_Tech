import React from "react";
import {
  FaUserGroup,
  FaSearchengin,
  FaWorm,
  FaSuitcase,
  FaShield,
  FaArrowTrendUp,
  FaMobileScreen,
  FaFilter,
  FaNetworkWired,
} from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const MarketRealitySlider = () => {
  const marketReality = [
    { icon: <FaUserGroup />, title: "High Competition" },
    { icon: <FaSearchengin />, title: "Limited Customer Reach" },
    { icon: <FaWorm />, title: "Unorganized Market" },
    { icon: <FaSuitcase />, title: "Lack of Skilled Sales Workforce" },
    { icon: <FaShield />, title: "Customer Trust Issues" },
    { icon: <FaArrowTrendUp />, title: "Scalability Challenges" },
    { icon: <FaFilter />, title: "Lead Conversion Struggles" },
    { icon: <FaMobileScreen />, title: "Technology Adaptation" },
    { icon: <FaNetworkWired />, title: "Market Fluctuations" },
  ];

  return (
      <div className="w-full mx-auto py-2 px-0 sm:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 1 },
            390: { slidesPerView: 1.2 },
            450: { slidesPerView: 1.4 },
            640: { slidesPerView: 1.7 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          loop
        >
          {marketReality.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="w-[300px] h-15 sm:h-18 my-2 border border-[#0000001A] flex gap-4 bg-white rounded-lg rounded-tl-none items-center justify-start py-3 px-4 shadow-sm">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-black bg-[#E0E5EB] text-lg">
                  {data.icon}
                </div>
                <p className="text-sm sm:text-base text-black">{data.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
};

export default MarketRealitySlider;