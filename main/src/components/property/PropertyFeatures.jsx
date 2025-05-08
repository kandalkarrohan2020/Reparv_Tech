import React, { useState } from "react";
import { FaBandcamp } from "react-icons/fa";
import { BsBootstrapFill } from "react-icons/bs";

const PropertyFeatures = ({ propertyFeatures, propertyBenefits }) => {
  const [activeTab, setActiveTab] = useState("features");

  const features = propertyFeatures
    ? propertyFeatures.split(",").map((item) => item.trim())
    : [];
  const benefits = propertyBenefits
    ? propertyBenefits.split(",").map((item) => item.trim())
    : [];

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-6">Features and Benefits</h2>

      <div className="flex items-center justify-between gap-20 px-6 mb-6">
        <button
          onClick={() => setActiveTab("features")}
          className={`w-full text-sm font-medium px-4 py-2 border-b-2 ${
            activeTab === "features"
              ? "text-[#0078DB] border-[#0078DB] "
              : "text-black border-[#0000001A] hover:text-blue-600"
          }`}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab("benefits")}
          className={`w-full text-sm font-medium px-4 py-2 border-b-2 ${
            activeTab === "benefits"
              ? "text-[#0078DB] border-[#0078DB] "
              : "text-black border-[#0000001A] hover:text-blue-600"
          }`}
        >
          Benefits
        </button>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-blue-900">
        {(activeTab === "features" ? features : benefits).map((item, index) => (
          <div key={index} className="w-full flex items-center justify-start space-x-3">
            <span className=" text-lg text-[#00345F]">
              {activeTab === "features" ? <FaBandcamp/> : <BsBootstrapFill />}
            </span>
            <span className="text-[#00345F]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;
