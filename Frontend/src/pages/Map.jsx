import React from "react";
import { FaUserCircle } from "react-icons/fa";
import map from "../assets/map.png"
import CitySelector from "../components/CitySelector";
import { useAuth } from "../store/auth";
import LogoutButton from "../components/LogoutButton";

const Map = () => {
  const { setShowProfile } = useAuth();
  
  return (
    <div className="map overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      
      <div className="map w-full  h-[578px] flex flex-col p-4 sm:p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <div className="w-full  flex align-center justify-end">
          <div className="w-full flex flex-wrap gap-2 lg:gap-6 items-center justify-end">
            <div className="search-bar w-[259px] h-[36px] flex border border-[#00000033] rounded-[8px] items-center justify-center ">
              <input
                type="text"
                placeholder="Enter Complate Address"
                className="address-input w-[259px] h-[36px] py-[8px] px-[12px] text-sm text-black bg-transparent border-none outline-none"
              />
            </div>

            <div className="search-bar w-[123px] h-[36px] flex border border-[#00000033] rounded-[8px] items-center justify-center ">
              <input
                type="text"
                placeholder="Enter Pin Code"
                className="pincode-input w-[123px] h-[36px] text-sm text-black bg-transparent border-none outline-none py-[8px] px-[12px]"
              />
            </div>
      
            <div className="searchBtn w-[71px] h-[36px] text-white bg-[#076300] flex items-center justify-center text-sm py-[8px] px-[12px] border border-[#00000033] rounded-[8px]">
              <p>Search</p>
            </div>

            <CitySelector></CitySelector>
          </div>
        </div>
        <div style={{ backgroundImage: `url(${map})` }} className={`mapContainer w-full max-w-[1088px] h-[547px] bg-cover overflow-scroll rounded-[16px]`}>
          
        </div>
      </div>
    </div>
  );
};

export default Map;
