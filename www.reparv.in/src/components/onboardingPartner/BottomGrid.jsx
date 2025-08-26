import React from "react";
import {
  FaUserGraduate,
  FaBriefcase,
  FaHome,
  FaBuilding,
  FaUserFriends,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const joinOptions = [
  {
    icon: <FaUserGraduate className="w-5 h-5" />,
    title: "Students",
    desc: "Perfect for students looking to earn while they learn and build valuable real estate connections.",
  },
  {
    icon: <FaBriefcase className="w-5 h-5" />,
    title: "Working Professionals",
    desc: "Ideal for those seeking additional income streams alongside their regular careers.",
  },
  {
    icon: <FaHome className="w-5 h-5" />,
    title: "House Wife",
    desc: "Flexible opportunity for homemakers to utilize their network and earn from home.",
  },
  {
    icon: <FaBuilding className="w-5 h-5" />,
    title: "Property Owners",
    desc: "For those who already own properties and understand the real estate market.",
  },
  {
    icon: <FaUserFriends className="w-5 h-5" />,
    title: "& As per interest",
    desc: "Anyone with interest in real estate and a desire to earn through property listings.",
  },
];

const BottomGrid = () => {
  return (
    <div className="w-full max-w-[1130px] bg-black py-7 sm:py-10 px-4 text-white">
      {/* Mobile View: Slider */}
      <div className="block md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            320: { slidesPerView: 1.3 },
            390: { slidesPerView: 1.7 },
            450: { slidesPerView: 2 },
            640: { slidesPerView: 2.7 },
            768: { slidesPerView: 3 },
          }}
          loop
          className="h-[330px] flex gap-4"
        >
          {joinOptions.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-50 h-80 hover:shadow-sm hover:shadow-white bg-[#2E2E2E] text-white rounded-xl  px-6 py-10 flex flex-col gap-5 items-center justify-start shadow-md">
                <div className="w-8 h-8 rounded-full bg-[#666] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base text-center font-semibold">{item.title}</h3>
                <p className="text-sm text-center text-gray-300">{item.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-6">
        {joinOptions.map((item, index) => (
          <div
            key={index}
            className="w-50 h-80 hover:shadow-sm hover:shadow-white bg-[#2E2E2E] text-white rounded-xl px-6 py-10 flex flex-col gap-5 items-center justify-start shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-[#666] flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="text-base text-center font-semibold">{item.title}</h3>
            <p className="text-sm text-center text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomGrid;