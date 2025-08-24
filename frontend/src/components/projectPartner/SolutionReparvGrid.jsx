import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import {
  FaUsers,
  FaUserTie,
  FaBullhorn,
  FaCogs,
  FaGraduationCap,
} from "react-icons/fa";

const solutions = [
  {
    icon: <FaUsers className="md:w-6 md:h-6" />,
    title: "Customer Reach",
    desc: "Customer reach in the real estate business with Reparv's trusted approach depends on effective marketing, a strong digital presence, and strategic network expansion to connect with potential buyers and investors across diverse locations.",
  },
  {
    icon: <FaUserTie className="md:w-6 md:h-6" />,
    title: "Skilled Sales Workforce",
    desc: "Skilled Sales Workforce Reparv's skilled sales workforce ensures trust, transparency, and expert guidance, delivering seamless real estate experiences for buyers and investors.",
  },
  {
    icon: <FaBullhorn className="md:w-6 md:h-6" />,
    title: "Marketing Support",
    desc: "Reparv's marketing support empowers partners with strategic promotions, digital reach, and trusted branding to maximize real estate success.",
  },
  {
    icon: <FaCogs className="md:w-6 md:h-6" />,
    title: "Business Management Technology Tools Support",
    desc: "Reparv's business management technology tools provide smart, efficient, and data-driven solutions to streamline operations and drive real estate success.",
  },
  {
    icon: <FaGraduationCap className="md:w-6 md:h-6" />,
    title: "Business Growth Training Support",
    desc: "Reparv's Business Growth Training Support equips partners with expert knowledge, strategic insights, and skill development to scale success in the real estate market.",
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
          slidesPerView={1.1}
          autoplay={{ delay: 2000 }}
          className="h-[250px]"
        >
          {solutions.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="group border border-[#0000001A] flex gap-2 flex-col bg-white rounded-xl shadow-md p-6 h-[240px] hover:bg-[#FBF8F1]">
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