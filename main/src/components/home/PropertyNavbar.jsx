import React from "react";
import { useState, useEffect } from "react";
import flatIcon from "../../assets/home/flaticon.svg";
import plotIcon from "../../assets/home/ploticon.svg";
import rentalIcon from "../../assets/home/rentalicon.svg";
import rentalShopIcon from "../../assets/home/industrialSpaceIcon.svg";
import rentalOfficeIcon from "../../assets/home/rentalOfficeIcon.svg";
import resaleIcon from "../../assets/home/resaleicon.svg";
import leaseIcon from "../../assets/home/leaseIcon.svg";
import rowHouseIcon from "../../assets/home/rowhouseicon.svg";
import farmHouseIcon from "../../assets/home/farmhouseicon.svg";
import farmLandIcon from "../../assets/home/farmLandIcon.svg";
import commercialFlatIcon from "../../assets/home/commercialFlatIcon.svg";
import commercialPlotIcon from "../../assets/home/commercialPlotIcon.svg";
import industrialSpaceIcon from "../../assets/home/industrialSpaceIcon.svg";

import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const PropertyNavbar = () => {
  const navigate = useNavigate();
  const { propertyType, setPropertyType, propertySearch, setPropertySearch } = useAuth();
  const [ showMore, setShowMore ] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setShowMore(mediaQuery.matches); // set true if screen < md

    const handleResize = () => {
      setShowMore(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const propertyTypes = [
    { icon: flatIcon, label: "New Flat", type: "NewFlat", show: "true"},
    { icon: plotIcon, label: "New Plot", type: "NewPlot", show: "true" },
    { icon: rentalIcon, label: "Rental", type: "Rental", show: "true" },
    { icon: resaleIcon, label: "Resale", type: "Resale", show: "true" },
    { icon: rowHouseIcon, label: "Row House", type: "RowHouse", show: "true" },
    { icon: leaseIcon, label: "Lease", type: "Lease", show: "true" },
    { icon: null, label: !showMore ? "Show More" : "Show Less", type: "", show: "true" },
    { icon: farmHouseIcon, label: "Farm House", type: "FarmHouse", show: showMore },
    { icon: farmLandIcon, label: "Farm Land", type: "FarmLand", show: showMore },
    { icon: commercialFlatIcon, label: "Commercial Flat", type: "CommercialFlat", show: showMore },
    { icon: commercialPlotIcon, label: "Commercial Plot", type: "CommercialPlot", show: showMore },
    { icon: rentalOfficeIcon, label: "Rental Office", type: "RentalOffice", show: showMore },
    { icon: industrialSpaceIcon, label: "Industrial Space", type: "IndustrialSpace", show: showMore },
    { icon: rentalShopIcon, label: "Rental Shop", type: "RentalShop", show: showMore },
    
  ];

  return (
    <div className="w-full max-w-[1000px] mx-auto sm:mb-6 lg:mb-0 bg-white z-10 sm:rounded-3xl sm:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-4 sm:px-15 sm:py-6 flex flex-col gap-6 items-center">
      {/* Property Types */}
      <div className="w-full grid place-items-center grid-cols-4 md:grid-cols-7 gap-3 sm:gap-8">
        {propertyTypes.map((property, index) => (
          <div
            onClick={() => {
              if (property.label !== "Show More" && property.label !== "Show Less"){
                navigate("/properties");
                setPropertyType(property.type);
              } else {
                setShowMore(!showMore);
              }
            }}
            key={index}
            className={`${property.show ? "flex" : "hidden"} ${property.label === "Show More" || property.label === "Show Less" && "hidden md:flex"} flex-col items-center text-center cursor-pointer hover:text-[#0BB501] transition`}
          >
            <img
              src={property.icon}
              alt=""
              className={` ${property.icon !== null ? "block":"hidden"} w-15 sm:w-16 h-14 sm:h-16 object-cover `}
            />
            <span className={`text-[10px] sm:text-xs md:text-sm lg:text-sm font-medium `} >{property.label}</span>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="w-full max-w-5xl hidden sm:block">
        <div className="relative">
          <span className="absolute inset-y-0 left-4 md:left-6 flex items-center text-gray-400">
            <IoSearchSharp className="w-4 md:w-5 h-4 md:h-5"/>
          </span>
          <input
            type="text"
            value={propertySearch}
            onChange={(e)=> {setPropertySearch(e.target.value)}}
            placeholder="Search For Your Favourite Property"
            className="w-full pl-10 md:pl-14 pr-6 py-3 text-xs md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-[#00000066]"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyNavbar;
