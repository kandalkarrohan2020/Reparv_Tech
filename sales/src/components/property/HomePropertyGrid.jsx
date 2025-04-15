import React, { useState } from "react";
import flatIcon from "../../assets/property/flaticon.svg";
import plotIcon from "../../assets/property/ploticon.svg";
import rentalIcon from "../../assets/property/rentalicon.svg";
import farmvillaIcon from "../../assets/property/farmvillaicon.svg";
import leaseIcon from "../../assets/property/leaseicon.svg";
import resaleIcon from "../../assets/property/resaleicon.svg";
import farmHouseIcon from "../../assets/property/farmhouseicon.svg";
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
    { icon: flatIcon, label: "Row House", to:"/row-house" },
    { icon: leaseIcon, label: "Lease", to:"/lease" },
    { icon: farmHouseIcon, label: "Farm House", to:"/farm-house" },
   
  ];
  
  return (
    <div className="flex flex-col items-center justify-center sm:px-4 pb-5 sm:pb-15 md:pb-25">
      {/* Grid Container */}
      <div className={`overflow-hidden w-full max-w-6xl grid grid-cols-2 lg:grid-cols-3 p-4 gap-3 sm:gap-6`} >
        {items.map((item, index) => (
          <div 
            onClick={()=>{navigate(item.to)}}
            key={index}
            className="flex flex-col gap-0 md:gap-2 items-center justify-end px-0 py-3 sm:py-5 md:px-10 md:py-8 bg-white shadow-[2px_2px_4px_0px_#0000001A] sm:shadow-[4px_4px_8px_0px_#0000001A] sm:hover:shadow-[8px_8px_15px_0px_#0000001A] hover:shadow-[4px_4px_8px_0px_#0000001A] rounded-lg sm:rounded-[36px] transition-all duration-200 ease-linear cursor-pointer"
          >
            {/* Icon */}
            <img src={item.icon} className="w-14 sm:w-20 md:w-24" alt="" />
            {/* Label */}
            <div className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-semibold text-black">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}