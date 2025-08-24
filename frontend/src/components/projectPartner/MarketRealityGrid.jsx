import React from "react";
import { FaTools, FaExclamationTriangle, FaChartLine, FaUserAlt, FaUserCog } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const issues = [
  {
    icon: <FaTools className="sm:w-5 sm:h-5" />,
    title: "Unorganized Market",
    desc: "Unorganized real estate market is plagued by inconsistent pricing, lack of regulatory enforcement, fraudulent dealings, and complex legal procedures, making property transactions risky and challenging for buyers and investors.",
  },
  {
    icon: <FaExclamationTriangle className="sm:w-5 sm:h-5" />,
    title: "Lack of Transparency",
    desc: "A lack of transparency in the real estate business leads to hidden costs, unclear property titles, misleading information, and fraudulent dealings, making it difficult for buyers and investors to make informed decisions.",
  },
  {
    icon: <FaChartLine className="sm:w-5 sm:h-5" />,
    title: "Scalability Challenges",
    desc: "Scalability challenges in the real estate business arise due to high capital requirements, market fluctuations, and the difficulty of standardizing operations across different locations.",
  },
  {
    icon: <FaUserAlt className="sm:w-5 sm:h-5" />,
    title: "No Customer Reach",
    desc: "Many real estate businesses struggle to reach potential buyers due to ineffective marketing, weak digital presence, and a lack of strong networks, resulting in low sales and missed opportunities.",
  },
  {
    icon: <FaUserCog className="sm:w-5 sm:h-5" />,
    title: "No Skilled Sales Workforce",
    desc: "The real estate industry often faces a shortage of a skilled sales workforce, leading to poor client handling, ineffective deal closures, and lost opportunities, ultimately affecting revenue and customer trust.",
  },
];

const MarketRealityGrid = () => {
  return (
    <div className="w-full">
      {/* Mobile View: Slider */}
      <div className="block md:hidden py-2">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.1}
          autoplay={{ delay: 2500 }}
          className="h-[350px]"
        >
          {issues.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="group border border-[#0000001A] flex flex-col gap-3 bg-white rounded-xl shadow-md p-6 min-w-[280px] h-[300px] hover:bg-[#FBF8F1]">
                <div className="w-8 h-8 rounded-full bg-[#E4E4E4] group-hover:bg-[#F7EFD8] group-hover:text-[#C0862C] flex items-center justify-center text-[#1E1E1E]">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-[#1E1E1E]">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {issues.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-md p-8 hover:bg-[#FBF8F1]"
          >
            <div className="flex flex-col gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#E4E4E4] group-hover:bg-[#F7EFD8] group-hover:text-[#C0862C] flex items-center justify-center text-[#1E1E1E]">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#1E1E1E]">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketRealityGrid;