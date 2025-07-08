import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import PropertyNavbar from "../components/property/PropertyNavbar";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";

const Properties = () => {
  const { setShowPropertyForm, URI, selectedCity, setSelectedCity } = useAuth();
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [cities, setCities] = useState([]);

  // *Fetch Data from API*
  const fetchAllCity = async () => {
    try {
      const response = await fetch(URI + "/frontend/properties/cities", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cities.");

      const data = await response.json();
      setCities(data); // Sets the cities array
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchAllCity();
  }, []);

  return (
    <div className="properties sm:py-10 overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div
        className={`selectCity ${
          location.pathname != "/about" ? "sm:inline-block" : "hidden"
        } inline-block min-w-[50px] max-w-[180px] relative py-2 rounded-lg px-4 mb-2 `}
      >
        <div className="flex lg:gap-1 items-center justify-center text-base font-semibold  text-black lg:p-1 ">
          <CiLocationOn className="w-5 h-5" />
          <span className="block">{selectedCity || "Select City"}</span>
          <RiArrowDropDownLine className="w-6 h-6 text-[#000000B2]" />
        </div>
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          value={selectedCity}
          onChange={(e) => {
            const action = e.target.value;
            setSelectedCity(action);
          }}
        >
          <option value="">Select City</option>
          {cities?.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <PropertyNavbar />
    </div>
  );
};

export default Properties;
