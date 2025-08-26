import React from "react";
import {
  FaShieldAlt,
  FaGlobe,
  FaBolt,
  FaMedal,
  FaCheckSquare,
  FaRupeeSign,
  FaLightbulb,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const solutions = [
  {
    icon: <FaShieldAlt className="md:w-6 md:h-6" />,
    title: "Building Trust with Property Owners",
    desc: "Reparv ensures a transparent listing process with fair deals, clear terms, and no hidden costs.",
  },
  {
    icon: <FaGlobe className="md:w-6 md:h-6" />,
    title: "Wider Market Reach",
    desc: "Our platform offers high visibility through digital marketing, verified buyer networks, and strategic promotions.",
  },
  {
    icon: <FaBolt className="md:w-6 md:h-6" />,
    title: "Faster Sales & Guaranteed Earnings",
    desc: "With an active buyer base and efficient sales processes, partners receive quicker conversions and timely bonus payouts.",
  },
  {
    icon: <FaMedal className="md:w-6 md:h-6" />,
    title: "Less Competition, More Opportunities",
    desc: "Reparv provides exclusive listing opportunities and supports partners in securing high-value properties.",
  },
  {
    icon: <FaCheckSquare className="md:w-6 md:h-6" />,
    title: "Simplified Verification & Documentation",
    desc: "We assist in property verification and streamline paperwork to ensure hassle-free listings.",
  },
  {
    icon: <FaRupeeSign className="md:w-6 md:h-6" />,
    title: "Structured Bonus & Commission Model",
    desc: "A transparent incentive system ensures onboarding partners earn well for every successful sale.",
  },
  {
    icon: <FaLightbulb className="md:w-6 md:h-6" />,
    title: "Training & Support System",
    desc: "Reparv offers expert guidance, tools, and training to help onboarding partners optimize listings and close deals effectively.",
  },
];

const SolutionReparvGrid = () => {
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
          {solutions.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="group border border-[#0000001A] flex gap-2 flex-col justify-center bg-white rounded-xl shadow-md p-6 h-[200px] hover:bg-[#FBF8F1]">
                <div className="w-8 h-8 rounded-full bg-[#DBDBDB] group-hover:bg-[#F7EFD8] group-hover:text-[#C0862C] flex items-center justify-center text-[#1E1E1E]">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-[#1E1E1E]">{item.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-md p-8 hover:bg-[#FBF8F1]"
          >
            <div className="flex flex-col gap-4 items-start">
              <div className="w-13 h-13 rounded-full bg-[#DBDBDB] group-hover:bg-[#F7EFD8] group-hover:text-[#C0862C] flex items-center justify-center text-[#1E1E1E]">
                {item.icon}
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-[#1E1E1E]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-base text-gray-600 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionReparvGrid;