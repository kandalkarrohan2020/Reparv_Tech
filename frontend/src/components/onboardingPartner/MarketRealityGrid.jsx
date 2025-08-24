import React from "react";
import {
  FaExclamationTriangle,
  FaChartBar,
  FaClock,
  FaUserFriends,
  FaFileAlt,
  FaRupeeSign,
  FaBookOpen,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const issues = [
  {
    icon: <FaExclamationTriangle className="md:w-6 md:h-6" />,
    title: "Property Owner Trust Issues",
    desc: "Owners hesitate to list properties due to concerns about transparency, hidden costs, or unfair deals.",
  },
  {
    icon: <FaChartBar className="md:w-6 md:h-6" />,
    title: "Limited Property Visibility",
    desc: "Many listings fail to reach the right buyers due to poor marketing or low platform reach.",
  },
  {
    icon: <FaClock className="md:w-6 md:h-6" />,
    title: "Delayed Sales & Earnings",
    desc: "Onboarding partners often face long sales cycles, delaying their commission payouts.",
  },
  {
    icon: <FaUserFriends className="md:w-6 md:h-6" />,
    title: "Competition & Market Saturation",
    desc: "High competition makes it challenging to secure exclusive property listings.",
  },
  {
    icon: <FaFileAlt className="md:w-6 md:h-6" />,
    title: "Verification & Documentation Hassles",
    desc: "Ensuring property authenticity and managing paperwork can be time-consuming.",
  },
  {
    icon: <FaRupeeSign className="md:w-6 md:h-6" />,
    title: "Unclear Earning Potential",
    desc: "Many platforms lack structured incentive programs, making earnings unpredictable.",
  },
  {
    icon: <FaBookOpen className="md:w-6 md:h-6" />,
    title: "Lack of Training & Support",
    desc: "Onboarding partners may struggle without proper guidance on listing optimization and client handling.",
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
          slidesPerView={1.2}
          autoplay={{ delay: 2000 }}
          className="h-[210px]"
        >
          {issues.map((item, index) => (
            <SwiperSlide key={index} >
              <div className="group border border-[#0000001A] flex gap-2 flex-col justify-center bg-white rounded-xl shadow-md p-6 h-[200px] hover:bg-[#FBF8F1] ">
                <div className="w-8 h-8 rounded-full bg-[#DBDBDB] group-hover:bg-[#F7EFD8] group-hover:text-[#C0862C] flex items-center justify-center text-[#1E1E1E] ">
                  {item.icon}
                </div>

                <h3 className="text-base font-semibold text-[#1E1E1E] ">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-md p-8 hover:bg-[#FBF8F1] "
          >
            <div className="flex flex-col gap-4 items-start">
              <div className="w-13 h-13 rounded-full bg-[#DBDBDB] group-hover:bg-[#F7EFD8] group-hover:text-[#C0862C] flex items-center justify-center text-[#1E1E1E] ">
                {item.icon}
              </div>

              <h3 className="text-base sm:text-xl font-semibold text-[#1E1E1E] ">
                {item.title}
              </h3>
              <p className="text-xs sm:text-base text-gray-600 mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketRealityGrid;
