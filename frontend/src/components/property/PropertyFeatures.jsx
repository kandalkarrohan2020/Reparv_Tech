import React, { useState } from "react";
import { FaBandcamp } from "react-icons/fa";
import { BsBootstrapFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaDiamond } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import { MdBalcony } from "react-icons/md";
import { MdBuildCircle } from "react-icons/md";
import { MdChair } from "react-icons/md";
import { TbSmartHome } from "react-icons/tb";
import { MdConstruction } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";

import { BiSolidCctv } from "react-icons/bi";
import { MdPool } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { GiGreenhouse } from "react-icons/gi";
import { RiSendPlaneFill } from "react-icons/ri";

const PropertyFeatures = ({ propertyInfo }) => {
  const [activeTab, setActiveTab] = useState("features");

  const features = [
    {
      icon: <MdLocationOn />,
      label: propertyInfo?.locationFeature,
      show: "flex"
    },
    {
      icon: <FaDiamond />,
      label: propertyInfo?.sizeAreaFeature,
      show: "flex",
    },
    {
      icon: <GiHomeGarage />,
      label: propertyInfo?.parkingFeature,
      show: "flex",
    },
    {
      icon: <MdBalcony />,
      label: propertyInfo?.terraceFeature,
      show: ["NewPlot", "CommercialPlot"].includes(propertyInfo?.propertyCategory) ? "hidden" : "flex",
    },
    {
      icon: <MdBuildCircle />,
      label: propertyInfo?.ageOfPropertyFeature,
      show: "flex",
    },
    {
      icon: <MdConstruction />,
      label: propertyInfo?.propertyStatusFeature,
      show: "flex",
    },
    {
      icon: <BiSolidBuildingHouse />,
      label: propertyInfo?.amenitiesFeature,
      show: "flex",
    },
    {
      icon: <TbSmartHome />,
      label: propertyInfo?.smartHomeFeature,
      show: ["NewPlot", "CommercialPlot"].includes(propertyInfo?.propertyCategory) ? "hidden" : "flex",
    },
  ];

  const benefits = [
    {
      icon: <MdOutlineSecurity />,
      label: propertyInfo?.securityBenefit,
      show: "flex",
    },
    {
      icon: <MdLocationOn />,
      label: propertyInfo?.primeLocationBenefit,
      show: "flex",
    },
    {
      icon: <FaKey />,
      label: propertyInfo?.rentalIncomeBenefit,
      show: "flex",
    },
    {
      icon: <FaBuilding />,
      label: propertyInfo?.qualityBenefit,
      show: ["NewPlot", "CommercialPlot"].includes(propertyInfo?.propertyCategory) ? "hidden" : "flex",
    },
    {
      icon: <RiSendPlaneFill />,
      label: propertyInfo?.capitalAppreciationBenefit,
      show: "flex",
    },
    {
      icon: <GiGreenhouse />,
      label: propertyInfo?.ecofriendlyBenefit,
      show: "flex",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-6">Features and Benefits</h2>

      <div className="flex items-center justify-between gap-20 px-6 mb-6">
        <button
          onClick={() => setActiveTab("features")}
          className={`w-full text-sm font-medium px-4 py-2 border-b-2 ${
            activeTab === "features"
              ? "text-[#0BB501] border-[#0BB501] "
              : "text-black border-[#0000001A] hover:text-[#0BB501]"
          }`}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab("benefits")}
          className={`w-full text-sm font-medium px-4 py-2 border-b-2 ${
            activeTab === "benefits"
              ? "text-[#0BB501] border-[#0BB501] "
              : "text-black border-[#0000001A] hover:text-green-600"
          }`}
        >
          Benefits
        </button>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-blue-900">
        {(activeTab === "features" ? features : benefits).map((item, index) => (
          <div
            key={index}
            className={`${item.show} w-full items-center justify-start space-x-3`}
          >
            <span className=" text-lg text-black">{item.icon}</span>
            <span className="text-black">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;
