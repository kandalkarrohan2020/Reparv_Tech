import React, { useState } from "react";
import flatIcon from "../../assets/property/flatIcon.svg";
import plotIcon from "../../assets/property/plotIcon.svg";
import rentalIcon from "../../assets/property/rentalIcon.svg";
import farmvillaIcon from "../../assets/property/farmvillaIcon.svg";
import leaseIcon from "../../assets/property/leaseIcon.svg";
import farmIcon from "../../assets/property/farmIcon.svg";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function HomePropertyGrid() {
  const [showMore, setShowMore ] = useState(false);
  const navigate = useNavigate();

  const items = [
    { icon: flatIcon, label: "New Project", to:"/new-project" },
    { icon: flatIcon, label: "Resale", to:"/resale"},
    { icon: rentalIcon, label: "Rental", to:"/rental" },
    { icon: leaseIcon, label: "Lease", to:"/lease" },
    { icon: farmIcon, label: "Farm House", to:"/farm-house" },
    { icon: flatIcon, label: "Flat", to:"/flat" },
    { icon: plotIcon, label: "Plot", to:"/plot" },
    { icon: flatIcon, label: "Row House", to:"/row-house" },
    
  ];
  
  return (
    <div className="flex flex-col items-center justify-center sm:px-4 pb-5 sm:pb-15 md:pb-25">
      {/* Grid Container */}
      <div className={`overflow-hidden w-full max-w-6xl grid grid-cols-2 lg:grid-cols-3 p-4 gap-3 sm:gap-6`} >
        {items.map((item, index) => (
          <div 
            onClick={()=>{navigate(item.to)}}
            key={index}
            className="flex flex-col gap-2 md:gap-4 items-center justify-end px-0 py-3 sm:py-5 md:px-10 md:py-8 bg-white shadow-[2px_2px_4px_0px_#0000001A] sm:shadow-[4px_4px_8px_0px_#0000001A] sm:hover:shadow-[8px_8px_15px_0px_#0000001A] hover:shadow-[4px_4px_8px_0px_#0000001A] rounded-lg sm:rounded-[36px] transition-all duration-200 ease-linear cursor-pointer"
          >
            {/* Icon */}
            <img src={item.icon} className="w-7 sm:w-12 sm:h-12 md:w-16  md:h-16 lg:w-20" alt="" />
            {/* Label */}
            <div className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-semibold text-black">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}