import React from "react";
import CustomDateRangePicker from "../components/CustomDateRangePicker";

const Calender = () => {

  return (
    <div className="calender overflow-scroll w-full h-screen flex flex-col items-start justify-start">
      <p className="block md:hidden text-lg font-semibold">Calender</p>
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
