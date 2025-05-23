import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SalesTestimonial = () => {
  const [testimonials, setTestimonials] = useState([
    {
      name: "Hannah Schmitt",
      feedback: "Lorem ipsum...",
      image: "https://yourdomain.com/uploads/hannah.jpg",
    },
    {
      name: "John Doe",
      feedback: "Another feedback...",
      image: "https://yourdomain.com/uploads/john.jpg",
    },
    // Add more...
  ]);

  return (
    <div className="w-full bg-[#0BB5011A] py-8 sm:py-16 px-6 md:px-12 relative">
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
        What Our Partner Say About Us
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} custom-bullet"></span>`,
        }}
        autoplay={{ delay: 6000 }}
        slidesPerView={1}
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10 relative">
              {/* Large quote mark */}
              <div className="relative">
                <div className="absolute text-[150px] text-[#0BB5011A] -left-10 -top-10 z-0 select-none">
                  &ldquo;
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 rounded-md object-cover z-10 relative shadow-lg"
                />
              </div>

              {/* Text Content */}
              <div className="max-w-xl z-10">
                <p className="text-gray-700 leading-relaxed">{item.feedback}</p>
                <h3 className="mt-4 font-semibold text-lg text-gray-800">
                  {item.name}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev !flex !items-center !justify-center !bg-white !text-black  !rounded-full !w-10 !h-10 !shadow-md absolute top-1/2 left-2 z-20 -translate-y-1/2 cursor-pointer">
          <FaChevronLeft className="!w-5 !h-5" />
        </div>
        <div className="swiper-button-next !flex !items-center !justify-center !bg-white !text-black  !rounded-full !w-10 !h-10 !shadow-md absolute top-1/2 right-2 z-20 -translate-y-1/2 cursor-pointer">
          <FaChevronRight className="!w-5 !h-5" />
        </div>
      </Swiper>

      {/* Custom Pagination */}
      <div className="custom-pagination flex justify-center items-center gap-1 sm:gap-2 mt-10" />
    </div>
  );
};

export default SalesTestimonial;
