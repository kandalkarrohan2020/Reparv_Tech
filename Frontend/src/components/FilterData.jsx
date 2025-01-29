import React, { useState } from "react";
import { HiMiniFunnel } from "react-icons/hi2";

const filterOptions = [
  { label: "Received", color: "text-[#0BB501] bg-green-100" },
  { label: "Visit Schedule", color: "text-[#0068FF] bg-blue-100" },
  { label: "Token", color: "text-[#FFCA00] bg-yellow-100" },
  { label: "Ongoing", color: "text-[#5D00FF] bg-purple-100" },
  { label: "Cancelled", color: "text-[#FF4646] bg-red-100 " },
  { label: "Visit Reschedule", color: "text-[#7E7E7E] bg-[#E8E9EA]" },
];

const FilterData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
    console.log("Selected Filter:", filter);
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <div
        className="city-selector w-[40px] h-[32px] flex items-center justify-center leading-[20px] border border-[#0000001A] rounded-[8px] gap-4 py-2 px-3 text-sm text-[#000000] cursor-pointer"
        onClick={toggleDropdown}
      >
        <HiMiniFunnel />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-[40px] right-0 w-[200px] bg-white shadow-md border rounded-bl-[10px] overflow-hidden rounded-br-[10px] z-10">
          {filterOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleFilterClick(option.label)}
              className={`flex items-center w-full h-12 gap-2 p-3 cursor-pointer ${option.color}`}
            >
              <input
                type="radio"
                name="filter"
                checked={selectedFilter === option.label}
                readOnly
                className="cursor-pointer"
              />
              <span className="text-sm">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterData;