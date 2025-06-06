import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAuth } from "../../store/auth";
import PropertyNavbar from "./PropertyNavbar";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

export default function ImageSlider() {
  const { URI, selectedCity, setSelectedCity, propertySearch, setPropertySearch  } = useAuth();
  const [sliderImages, setSliderImages] = useState([]);
  const [mobileImage, setMobileImage] = useState([]);
  
  // **Fetch Data from API**
  const getSliderImages = async () => {
    try {
      const response = await fetch(URI + "/frontend/slider", {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
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
    <div className="w-full mx-auto max-w-[1650px] flex flex-col items-center justify-center mb-5">
      <div className="w-full flex sm:hidden items-center justify-between gap-2 px-4 pt-3 pb-2">
        {/* Mobile Search */}
        <div className="relative min-w-[140px] max-w-[250px] bg-white rounded-md ">
          <span className="absolute inset-y-0 left-2 md:left-6 flex items-center text-gray-400">
            <IoSearchSharp className="w-4 md:w-5 h-4 md:h-5" />
          </span>
          <input
            type="text"
            value={propertySearch}
            onChange={(e)=> {setPropertySearch(e.target.value)}}
            placeholder="Search Property"
            className="w-full pl-7 md:pl-14 pr-4 py-2 text-xs md:text-base rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-[#00000066]"
          />
        </div>
        {/* Mobile City Selector */}
        <div className="selectCity min-w-[100px] max-w-[180px] relative inline-block">
          <div className="flex gap-1 items-center justify-center text-sm font-semibold  text-black p-1 ">
            <CiLocationOn className="w-5 h-5" />
            <span>{selectedCity || "Select City"}</span>
            <RiArrowDropDownLine className="w-6 h-6 text-black" />
          </div>
          <select
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            value={selectedCity}
            onChange={(e) => {
              const action = e.target.value;
              setSelectedCity(action);
            }}
          >
            <option value="">Select City</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Chandrapur">Chandrapur</option>
            <option value="Wardha">Wardha</option>
          </select>
        </div>
      </div>
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
        className="w-full shadow-lg overflow-scroll scrollbar-hide sm:overflow-hidden"
      >
        {sliderImages?.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={URI+"/uploads/"+img.image}
              alt={`Slide ${index + 1}`}
              className="hidden sm:block w-full h-auto object-cover"
            />
            <img
              src={URI+"/uploads/"+img?.mobileimage}
              alt={`Slide ${index + 1}`}
              className={`block sm:hidden w-full h-auto object-cover`}
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
