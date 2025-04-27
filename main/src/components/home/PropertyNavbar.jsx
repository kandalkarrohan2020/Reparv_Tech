import React from "react";
import flatIcon from "../../assets/home/flaticon.svg";
import plotIcon from "../../assets/home/ploticon.svg";
import rentalIcon from "../../assets/home/rentalicon.svg";
import resaleIcon from "../../assets/home/resaleicon.svg";
import leaseIcon from "../../assets/home/leaseIcon.svg";
import rowHouseIcon from "../../assets/home/rowhouseicon.svg";
import farmHouseIcon from "../../assets/home/farmhouseicon.svg";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PropertyNavbar = () => {
  const navigate = useNavigate();

  const propertyTypes = [
    { icon: flatIcon, label: "New Flat", to: "/flat" },
    { icon: plotIcon, label: "New Plot", to: "/plot" },
    { icon: rentalIcon, label: "Rental", to: "/rental" },
    { icon: resaleIcon, label: "Resale", to: "/resale" },
    { icon: rowHouseIcon, label: "Row House", to: "/row-house" },
    { icon: leaseIcon, label: "Lease", to: "/lease" },
    { icon: farmHouseIcon, label: "Farm House", to: "/farm-house" },
    { icon: flatIcon, label: "Commercial", to: "/commercial" },
  ];

  return (
    <div className="w-full max-w-[1050px] mx-auto mb-6 lg:mb-0 bg-white z-10 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-4 sm:px-15 sm:py-6 flex flex-col gap-6 items-center">
      {/* Property Types */}
      <div className="w-full grid place-items-center grid-cols-4 md:grid-cols-8 gap-3 sm:gap-8">
        {propertyTypes.map((property, index) => (
          <div
            onClick={() => {
              navigate(property.to);
            }}
            key={index}
            className="flex flex-col items-center text-center cursor-pointer hover:text-[#0BB501] transition"
          >
            <img
              src={property.icon}
              alt=""
              className="w-15 sm:w-16 h-14 sm:h-16 object-cover"
            />
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-sm font-medium">{property.label}</span>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="w-full max-w-5xl">
        <div className="relative">
          <span className="absolute inset-y-0 left-4 md:left-6 flex items-center text-gray-400">
            <IoSearchSharp className="w-4 md:w-5 h-4 md:h-5"/>
          </span>
          <input
            type="text"
            placeholder="Search For Your Favourite Property"
            className="w-full pl-10 md:pl-14 pr-6 py-3 text-xs md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-[#00000066]"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyNavbar;
