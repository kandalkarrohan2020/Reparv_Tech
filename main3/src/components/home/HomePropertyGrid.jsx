import React, { useState } from "react";
import flatIcon from "../../assets/home/flaticon.svg";
import plotIcon from "../../assets/home/ploticon.svg";
import rentalIcon from "../../assets/home/rentalicon.svg";
import resaleIcon from "../../assets/home/resaleicon.svg";
import leaseIcon from "../../assets/home/leaseIcon.svg";
import rowHouseIcon from "../../assets/home/rowhouseicon.svg";
import farmHouseIcon from "../../assets/home/farmhouseicon.svg";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function HomePropertyGrid() {
  const [showMore, setShowMore ] = useState(false);
  const navigate = useNavigate();

  const items = [
    { icon: flatIcon, label: "New Flat", to:"/flat" },
    { icon: plotIcon, label: "New Plot", to:"/plot" },
    { icon: rentalIcon, label: "Rental", to:"/rental" },
    { icon: resaleIcon, label: "Resale", to:"/resale"},
    { icon: rowHouseIcon, label: "Row House", to:"/row-house" },
    { icon: leaseIcon, label: "Lease", to:"/lease" },
    { icon: farmHouseIcon, label: "Farm House", to:"/farm-house" },
    { icon: flatIcon, label: "Commercial", to:"/commercial" },
  
    
  ];
  
  return (
    <div className="flex flex-col items-center justify-center sm:px-4 pb-5 sm:pb-15 md:pb-25">
      {/* Grid Container */}
      <div className={`overflow-hidden w-full max-w-6xl grid ${showMore? "grid-cols-3 md:grid-cols-4 h-auto":"grid-cols-3 h-[185px] sm:h-[300px] md:h-[410px] lg:h-[480px]"} p-4 gap-3 sm:gap-6`} >
        {items.map((item, index) => (
          <div 
            onClick={()=>{navigate(item.to)}}
            key={index}
            className="flex flex-col gap-2 md:gap-4 items-center justify-end px-0 py-3 sm:py-5 md:px-10 md:py-8 bg-white shadow-[2px_2px_4px_0px_#0000001A] sm:shadow-[4px_4px_8px_0px_#0000001A] sm:hover:shadow-[8px_8px_15px_0px_#0000001A] hover:shadow-[4px_4px_8px_0px_#0000001A] rounded-lg sm:rounded-[36px] transition-all duration-200 ease-linear cursor-pointer"
          >
            {/* Icon */}
            <img src={item.icon} className="w-7 sm:w-12 md:w-16 lg:w-24" alt="" />
            {/* Label */}
            <div className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-semibold text-black">{item.label}</div>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      <button onClick={()=>{setShowMore(!showMore)}}
      className="flex items-center gap-1 mt-2 sm:mt-6 text-[#1C55E0] hover:scale-105 active:scale-100 text-xs sm:text-base md:text-xl font-semibold transition-all duration-200 ease-linear cursor-pointer">
       { !showMore? <>Show More <GoArrowDownRight className="sm:w-5 sm:h-5 md:w-7 md:h-7 "/></>:<>Show Less <GoArrowUpRight className=" sm:w-5 sm:h-5 md:w-7 md:h-7 "/></>}
      </button>
    </div>
  );
}