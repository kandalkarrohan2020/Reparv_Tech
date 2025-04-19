import React from "react";
import HomePropertyGrid from "../components/property/HomePropertyGrid";

const Properties = () => {
  return (
    <div className="properties overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="properties-table overflow-scroll scrollbar-hide w-full h-[500px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <p className="block md:hidden text-lg font-semibold">Properties</p>
        <HomePropertyGrid />
      </div>
    </div>
  );
};

export default Properties;
