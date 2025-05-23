import React from "react";
import PropertyNavbar from "../components/property/PropertyNavbar";
import { useAuth } from "../store/auth";

const Properties = () => {
  return (
    <div className="properties sm:py-10 overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
       <p className="block md:hidden text-lg font-semibold mb-4">Properties</p>
       <PropertyNavbar />
    </div>
  );
};

export default Properties;
