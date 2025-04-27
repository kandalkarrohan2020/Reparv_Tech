import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAuth } from "../../store/auth";
import PropertyNavbar from "./PropertyNavbar";

export default function ImageSlider() {
  const { URI } = useAuth();
  const [sliderImages, setSliderImages] = useState([]);
  
  // **Fetch Data from API**
  const getSliderImages = async () => {
    try {
      const response = await fetch(URI + "/frontend/slider", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch slider Images.");
      const data = await response.json();
      setSliderImages(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(()=>{
    getSliderImages(); 
  },[]);

  return (
    <div className="relative w-full mx-auto max-w-7xl flex items-center justify-center mb-5">
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
        {sliderImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={URI+"/uploads/"+img.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination hidden sm:flex items-center justify-center gap-1 m-5 absolute bottom-[60px] z-10"></div>
      <div className = "hidden lg:block absolute w-full z-10 lg:bottom-[-60px] xl:bottom-[-50px]" >
        <PropertyNavbar />
      </div>
    </div>
  );
}
