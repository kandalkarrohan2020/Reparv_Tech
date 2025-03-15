import React from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import propertyPicture from "../assets/property/propertyPicture.svg";
import { FaHeart } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineKingBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { FaDiamond } from "react-icons/fa6";
import populerTag from "../assets/property/populerTag.svg";
import { useNavigate, Navigate } from "react-router-dom";
import VideoReviewSection from "../components/VideoReviewSection";

const properties = [
  {
    id: 1,
    price: "2,09,500",
    name: "Palm Harbor",
    beds: 3,
    baths: 2,
    size: "5×7 m²",
    popular: true,
    like: true,
    image: propertyPicture,
  },
  {
    id: 2,
    price: "2,70,000",
    name: "Beverly Springfield",
    beds: 4,
    baths: 2,
    size: "6×7.5 m²",
    popular: true,
    like: true,
    image: propertyPicture,
  },
  {
    id: 3,
    price: "4,55,000",
    name: "Faulkner Ave",
    beds: 4,
    baths: 3,
    size: "8×10 m²",
    popular: true,
    like: true,
    image: propertyPicture,
  },
  {
    id: 4,
    price: "2,40,000",
    name: "St. Crystal",
    beds: 4,
    baths: 2,
    size: "6×8 m²",
    popular: false,
    like: false,
    image: propertyPicture,
  },
  {
    id: 5,
    price: "1,50,000",
    name: "Cove Red",
    beds: 2,
    baths: 1,
    size: "5×7.5 m²",
    popular: false,
    like: false,
    image: propertyPicture,
  },
  {
    id: 6,
    price: "1,60,000",
    name: "Tarpon Bay",
    beds: 3,
    baths: 1,
    size: "5×7 m²",
    popular: false,
    like: false,
    image: propertyPicture,
  },
];

export default function Flat() {
  const navigate = useNavigate();
  //filter
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    onSearch({ location, budget });
  };

  return (
    <div className="properties w-full max-w-[1400px] flex flex-col p-4 sm:py-6 sm:px-0 mx-auto">
      <div className="propertiesHeading w-full h-30 hidden sm:flex flex-col items-center justify-center gap-5 mb-4">
        <h2 className="text-[40px] leading-14 text-black font-bold">
          Based On Your Location
        </h2>
        <p className="text-base font-normal leading-[25.6px] text-[#00000066]">
          Some of our picked properties near you location.
        </p>
      </div>
      {/* Search Bar */}
      <div className="w-full flex flex-wrap gap-2 justify-between sm:px-5">
        <div className="w-full sm:w-[350px] h-10 sm:h-15 flex gap-3 items-center justify-start border border-[#00000033] rounded-lg px-4 sm:p-4 focus:outline-none">
          <FiSearch className=" sm:w-6 sm:h-6 text-[#076300] " />
          <input
            type="text"
            placeholder="Search..."
            className=" focus:outline-none text-sm sm:text-base"
          />
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-5 bg-white">
          <div className="flex">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-10 px-2 border border-[#00000033] rounded-md"
            >
              <option value="">Select City</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Amaravati">Amaravati</option>
              <option value="Chandrapur">Chandrapur</option>
            </select>
          </div>
          <div className="flex">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-10 px-2 border border-[#00000033] rounded-md"
            >
              <option value="">Select Location</option>
              <option value="Ram Nagar">Ram Nagar</option>
              <option value="Sharda Nagar">Sharda Nagar</option>
              <option value="Rk Nagar">RK Nagar</option>
            </select>
          </div>

          <div className="flex">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full h-10 px-2 border border-[#00000033] rounded-md"
            >
              <option value="">Select Budget</option>
              <option value="1000">Up to 1,000</option>
              <option value="5000">Up to 5,000</option>
              <option value="10000">Up to 10,000</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="w-[100px] h-10 bg-[#076300] text-white rounded-lg active:scale-95"
          >
            Search
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-4 sm:p-5">
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => {
              navigate("/property");
            }}
            className="group rounded-lg shadow-md bg-white hover:bg-[#076300] "
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full object-cover"
            />
            <div className="relative p-4">
              {property.popular && (
                <img
                  src={populerTag}
                  className="absolute top-[-15px] left-[-8px]"
                ></img>
              )}
              <div className="w-full py-3 flex items-center justify-between">
                <div className="flex flex-col justify-between gap-2 text-xl lg:text-2xl font-extrabold p-2">
                  <div className="text-[#076300] group-hover:text-white flex items-center justify-start">
                    <FaRupeeSign />
                    <p> {property.price} </p>
                  </div>
                  <h2 className="text-[#000929] group-hover:text-white ml-1">
                    {property.name}
                  </h2>
                </div>
                <div
                  className={`likeBtn w-12 h-12 mr-4 flex items-center justify-center border border-[#E8E6F9] rounded-full bg-white ${
                    property.like === true ? "text-[#076300]" : "text-[#E8E6F9]"
                  } `}
                >
                  <FaHeart />
                </div>
              </div>

              <div className="address text-[10px] md:text-xs lg:text-base font-normal px-3">
                <p className="text-[#808080] group-hover:text-[#e2e2e2]">
                  Trimurti Nagar, Nagpur
                </p>
              </div>

              <hr className="text-[#F0EFFB] my-3" />

              <div className="flex justify-between text-xs md:text-sm text-[#808080] group-hover:text-[#e2e2e2] mt-2 px-2">
                <div className="flex items-center justify-start gap-2">
                  <MdOutlineKingBed className="text-[#076300] group-hover:text-white w-4 h-4" />
                  {property.beds} Beds
                </div>
                <div className="flex items-center justify-start gap-2">
                  <BiBath className="text-[#076300] group-hover:text-white w-4 h-4" />
                  {property.baths} Bathrooms
                </div>
                <div className="flex items-center justify-start gap-2">
                  <FaDiamond className="text-[#076300] group-hover:text-white w-3 h-3" />
                  {property.size}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Review */}
      <VideoReviewSection />
    </div>
  );
}
