import React from "react";
import calender from "../assets/overview/calender.svg";
import { FaUserCircle } from "react-icons/fa";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import { useAuth } from "../store/auth";

const Calender = () => {
  const { setShowProfile } = useAuth();
  return (
    <div className="calender w-[1168px] h-[744px] pt-10 px-4 flex flex-col items-start justify-start">
      <div className="calender-heading w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[16px] leading-[19.36px] text-black">
          Calender
        </div>
        <div className="right-heading w-[135px] h-[32px] flex items-center justify-between mr-5">
          <FaUserCircle onClick={()=>{setShowProfile("true")}} className="w-8 h-8 text-[#076300]" />
          <div className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px]">
            <p>Logout</p>
          </div>
        </div>
      </div>

      <div className="calenderContainer w-[1136px] h-[578px] flex flex-col p-6 gap-4 my-[10px]">
        <div className="searchBarContainer w-[1088px] h-[36px] flex align-center justify-end">
        <CustomDateRangePicker/>
        </div>
        <div className="calender w-[1136px] h-[506px] flex gap-[26px] overflow-hidden">
          <div className="visitCalender w-[314px] h-[327px] bg-white">

          </div>
          <div className="showVisit w-[761px] h-[506px] bg-white">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
