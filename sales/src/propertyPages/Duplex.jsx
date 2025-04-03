import React, { useEffect } from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineKingBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { FaDiamond } from "react-icons/fa6";
import populerTag from "../assets/property/populerTag.svg";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export default function Duplex() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [allCity, setAllCity] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [properties, setProperties] = useState([]);
  const { URI } = useAuth();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
    fetchAllCity();
    fetchLocation();
  }, []);

  useEffect(() => {
    if (city) {
      fetchLocationByCity();
    }
  }, [city]);

  useEffect(() => {
    setFilteredProperties(properties); // Show all properties initially
  }, [properties]);

  const handleSearch = () => {
    const filtered = properties.filter((property) => {
      return (
        (city ? property.city === city : true) &&
        (location ? property.location === location : true) &&
        (budget ? property.sqft_price <= budget : true)
      );
    });

    setFilteredProperties(filtered);
  };
  useEffect(() => {
    setFilteredProperties(properties); // Show all properties initially
  }, [properties]);

  const filteredData = filteredProperties.filter((item) =>
    item.property_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchLocationByCity = async () => {
    try {
      const response = await fetch(URI + "/sales/duplex/location/" + city, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();

      setAllLocation([...data]);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // *Fetch Data from API*
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/sales/duplex", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // *Fetch Data from API*
  const fetchAllCity = async () => {
    try {
      const response = await fetch(URI + "/sales/duplex/allcity", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();

      setAllCity([...data]);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // *Fetch Data from API*
  const fetchLocation = async () => {
    try {
      const response = await fetch(URI + "/sales/duplex/alllocation", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();

      setAllLocation([...data]);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const addLike = async (id) => {
    try {
      const response = await fetch(URI + "/frontend/duplex/like/" + id, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to Add Like.");
      else{
        console.log("Like added Successfully!");
        fetchData();
      }
    } catch (err) {
      console.log("Error Updating Like:", err);
    }
  };

  return (
    <div className="properties w-full max-w-[1400px] flex flex-col p-4 sm:py-6 sm:px-0 mx-auto">
      {/* Search Bar */}
      <div className="w-full flex flex-wrap gap-2 justify-between sm:px-5">
        <div className="w-full sm:w-[350px] h-10 sm:h-15 flex gap-3 items-center justify-start border border-[#00000033] rounded-lg px-4 sm:p-4 focus:outline-none">
          <FiSearch className=" sm:w-6 sm:h-6 text-[#076300] " />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-5 bg-transparent">
          <div className="flex">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-10 px-2 border  appearance-none border-[#00000033] rounded-md"
            >
              <option value="">Select City</option>
              {allCity?.map((city) => (
                <option value={city.city} key={city.city}>
                  {city.city.charAt(0).toUpperCase() + city.city.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-10 px-2 border  appearance-none border-[#00000033] rounded-md"
            >
              <option value="">Select Location</option>
              {allLocation?.map((location) => (
                <option value={location.location} key={location.location}>
                  {location.location.charAt(0).toUpperCase() +
                    location.location.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full h-10 px-2 border  appearance-none border-[#00000033] rounded-md"
            >
              <option value="">Select Budget</option>
              <option value="1000">Up to 1,000</option>
              <option value="5000">Up to 5,000</option>
              <option value="10000">Up to 10,000</option>
              <option value="50000">Up to 50,000</option>
              <option value="100000">Up to 10,00,00</option>
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
        {filteredData.length > 0 ? (
          filteredData.map((property) => (
            <div
              onClick={() => navigate(`/property-info/${property.propertyid}`)}
              key={property.propertyid}
              className="group rounded-lg shadow-md bg-white hover:bg-[#076300] overflow-hidden"
            >
              <img
                src={`${URI}${property.image}`}
                alt={property.name}
                className=" object-cover h-[250px] w-full"
              />
              <div className="relative p-4">
                {property.likes > 500 && (
                  <img
                    src={populerTag}
                    className="absolute top-[-15px] left-[-8px]"
                  ></img>
                )}
                <div className="w-full py-3 flex items-center justify-between">
                  <div className="flex flex-col justify-between gap-2 text-xl lg:text-2xl font-extrabold p-2">
                    <div className="text-[#076300] group-hover:text-white flex items-center justify-start">
                      <FaRupeeSign />
                      <p> {property.sqft_price} </p>
                    </div>
                    <h2 className="text-[#000929] group-hover:text-white ml-1">
                      {property.property_name.length > 18
                        ? `${property.property_name.slice(0, 18)}...`
                        : property.property_name}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-1 items-center justify-center p-2">
                    <div
                      onClick={(event) => {
                        event.stopPropagation();
                        addLike(property.propertyid);
                        
                      }}
                      className={`likeBtn w-12 h-12 flex items-center justify-center border border-[#E8E6F9] rounded-full bg-white ${
                        property.likes > 0
                          ? "text-[#076300]"
                          : "text-[#E8E6F9]"
                      } `}
                    >
                      <FaHeart />
                    </div>
                    <span className="text-[#076300] font-semibold group-hover:text-white">
                      {property.likes}
                    </span>
                  </div>
                </div>

                <div className="address text-[10px] md:text-xs lg:text-base font-normal px-3">
                  <p className="text-[#808080] group-hover:text-[#e2e2e2]">
                    {property.location.length > 20
                      ? `${property.location.slice(0, 20)}...`
                      : property.location}
                    , {property.city}
                  </p>
                </div>

                <hr className="text-[#F0EFFB] my-3" />

                <div className="flex justify-between text-xs md:text-sm text-[#808080] group-hover:text-[#e2e2e2] mt-2 px-2">
                  {/*<div className="flex items-center justify-start gap-2">
                                        {
                                          //<MdOutlineKingBed className="text-[#076300] group-hover:text-white w-4 h-4" />
                                        }
                                        {property.area} Sq.ft Area
                                      </div>
                                      <div className="flex items-center justify-start gap-2">
                                        <BiBath className="text-[#076300] group-hover:text-white w-4 h-4" />
                                        {property.baths} Bathrooms
                                      </div>
                                      */}
                  <div className="flex items-center justify-start gap-2">
                    <FaDiamond className="text-[#076300] group-hover:text-white w-3 h-3" />
                    {property.area} Sq.ft Area
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-2xl font-bold m-4">No Properties Found</h1>
        )}
      </div>

    </div>
  );
}
