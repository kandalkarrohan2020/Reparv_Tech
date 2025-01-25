import React from "react";
import { FaUserCircle } from "react-icons/fa";
import cityIcon from "../assets/overview/cityIcon.svg";
import downArrow from "../assets/overview/downArrow.svg";
import map from "../assets/map.png"

const Map = () => {
  return (
    <div className="map w-[1168px] h-[744px] pt-10 px-4 flex flex-col items-start justify-start bg-white ">
      <div className="map-heading w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[16px] leading-[19.36px] text-black">
          Map
        </div>
        <div className="right-heading w-[135px] h-[32px] flex items-center justify-between mr-5">
          <FaUserCircle className="w-8 h-8 text-[#076300]" />
          <div className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px]">
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="map w-[1136px] h-[631px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <div className="w-[1088px] h-[36px] flex align-center justify-end">
          <div className="w-full h-[36px] flex gap-6 items-center justify-end">
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

            <div className="city-selector w-[107px] h-[32px] flex items-center justify-center leading-[20px] border border-[#0000001A] rounded-[8px] gap-4 py-2 px-3 text-sm text-[#000000] cursor-pointer">
              <img src={cityIcon} alt="" />
              <p>City</p>
              <img src={downArrow} alt="" />
            </div>
          </div>
        </div>
        <div className="mapContainer w-[1088px] h-[547px] overflow-hidden rounded-[16px]">
          <img src={map} alt="" className="w-[1088px] h-[547px]"/>
        </div>
      </div>
    </div>
  );
};

export default Map;
