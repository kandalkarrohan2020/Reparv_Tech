import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import swipper1 from "../../assets/swiper/swiper1.svg";
import swipper2 from "../../assets/swiper/swiper2.svg";
import swipper3 from "../../assets/swiper/swiper3.svg";
import swipper4 from "../../assets/swiper/swiper4.svg";
import swipper5 from "../../assets/swiper/swiper5.svg";

const images = [swipper1, swipper2, swipper3, swipper4, swipper5];

export default function ImageSlider() {
  return (
    <div className="relative w-full mx-auto max-w-7xl flex items-center justify-center mb-15 md:mb-25">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        touchEventsTarget="wrapper"
        touchRatio={1}
        simulateTouch={true}
        grabCursor={true}
        className="shadow-lg overflow-scroll scrollbar-hide sm:overflow-hidden"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination flex items-center justify-center gap-1 m-5 absolute bottom-[60px] z-10"></div>
    </div>
  );
}
