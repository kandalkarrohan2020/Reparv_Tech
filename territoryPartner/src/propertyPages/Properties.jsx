import React from "react";
import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import propertyPicture from "../assets/property/propertyPicture.svg";
import cardAssuredTag from "../assets/property/cardAssuredTag.svg";
import populerTag from "../assets/property/populerTag.svg";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import FormatPrice from "../components/FormatPrice";
import FilterSidebar from "../components/FilterSidebar";
import { usePropertyFilter } from "../store/propertyFilter";
import { IoMdDoneAll } from "react-icons/io";

export default function Properties() {
  const navigate = useNavigate();
  const { filteredLocations, setFilteredLocations, minBudget, maxBudget } =
    usePropertyFilter();

  const {
    URI,
    setPriceSummery,
    setShowPriceSummery,
    propertyType,
    selectedCity,
    setSelectedCity,
    showFilterePopup,
    setShowFilterPopup,
  } = useAuth();
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = filteredProperties.filter((item) =>
    item.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    try {
      let url = `${URI}/territory-partner/properties?`;
      const params = [];

      if (selectedCity && selectedCity.trim() !== "") {
        params.push(`city=${encodeURIComponent(selectedCity)}`);
      }

      if (propertyType && propertyType.trim() !== "") {
        params.push(`propertyCategory=${encodeURIComponent(propertyType)}`);
      }

      url += params.join("&");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
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

  const fetchLocationByCity = async () => {
    try {
      const queryParams = [];

      if (propertyType && propertyType.trim() !== "") {
        queryParams.push(
          `propertyCategory=${encodeURIComponent(propertyType)}`
        );
      }

      if (selectedCity && selectedCity.trim() !== "") {
        queryParams.push(`city=${encodeURIComponent(selectedCity)}`);
      }

      const url = `${URI}/territory-partner/properties/location${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch locations.");

      const data = await response.json();
      setLocations([...data]);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setLocations([]);
    }
  };

  // *Fetch Data from API*
  const fetchLocation = async () => {
    try {
      const response = await fetch(
        URI + "/territory-partner/properties/location/all",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      const locationList = data.map((item) => item.location);
      setLocations(locationList);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchData();
    if (selectedCity) {
      fetchLocationByCity();
    } else {
      fetchLocation();
    }
  }, [propertyType, selectedCity]);

  useEffect(() => {
    const filtered = properties.filter((item) => {
      const matchesLocation =
        filteredLocations.length === 0 ||
        filteredLocations.includes(item.location);

      const matchesBudget =
        item.totalOfferPrice >= minBudget && item.totalOfferPrice <= maxBudget;

      return matchesLocation && matchesBudget;
    });

    setFilteredProperties(filtered);
  }, [properties, filteredLocations, minBudget, maxBudget]);

  return (
    <div className="properties w-full max-w-[1400px] flex flex-col p-4 sm:py-4 sm:px-0 mx-auto">
      {/* Search Bar */}
      <div className="w-full flex flex-wrap gap-4 justify-beteen sm:justify-end sm:py-2 sm:px-5">
        <div className="w-1/2 sm:min-w-[350px] flex items-center justify-center relative">
          <span className="absolute inset-y-0 left-4 md:left-4 flex items-center text-gray-400">
            <IoSearchSharp className="w-4 md:w-5 h-4 md:h-5" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search For Your Favourite Property"
            className="w-full pl-10 md:pl-11 pr-4 py-2 text-xs md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-[#00000066]"
          />
        </div>

        {/* City Selector And Location Filter For MobileScreen  */}
        <div className="min-w-[140px]  flex sm:hidden gap-1 items-center justify-between">
          <div
            onClick={() => {
              setShowFilterPopup(true);
            }}
            className="filterIcon p-2 border border-gray-300 rounded-md flex items-center justify-center"
          >
            <IoFilter />
          </div>
          <div className="selectCity min-w-[100px] max-w-[180px] relative inline-block">
            <div className="flex gap-1 items-center justify-center text-xs font-semibold  text-black p-1 ">
              <CiLocationOn className="w-5 h-5" />
              <span>{selectedCity || "Select City"}</span>
              <RiArrowDropDownLine className="w-6 h-6 text-black" />
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
              <option value="Nagpur">Nagpur</option>
              <option value="Chandrapur">Chandrapur</option>
              <option value="Wardha">Wardha</option>
            </select>
          </div>
        </div>
      </div>
      <div className=" relative w-full min-h-[77vh] flex gap-5 py-4 sm:p-4">
        {/* Properties Filter */}
        <div
          className={`fixed
          propertiesFilter overflow-y-scroll overflow-x-visible scrollbar-hide hidden sm:flex
          !min-w-[220px] w-[220px] h-[75vh] transition-all duration-300`}
        >
          <FilterSidebar />
        </div>

        {/* Properties Grid */}
        <div className="w-full overflow-scroll scrollbar-hide sm:pl-[260px] flex flex-col">
          <div className="w-full text-lg sm:text-2xl ">
            <h2 className="text-black font-semibold ">
              {filteredData.length} Result
              <span className="text-[#9C9CA3] font-normal"> Found </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 py-4">
            {filteredData.length > 0 ? (
              filteredData.map((property) => (
                <div
                  onClick={() =>
                    navigate(`/property-info/${property.propertyid}`)
                  }
                  key={property.propertyid}
                  className="border max-w-[400px] border-[#00000033] rounded-2xl shadow-md bg-white overflow-hidden"
                >
                  <img
                    src={(() => {
                      try {
                        const images = JSON.parse(property.frontView || "[]");
                        return images.length > 0
                          ? `${URI}${images[0]}`
                          : `${propertyPicture}`;
                      } catch {
                        return `${propertyPicture}`;
                      }
                    })()}
                    alt={property.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${propertyPicture}`;
                    }}
                    className="object-cover h-[200px] w-full bg-[#00000020]"
                  />
                  <div className="relative flex flex-col gap-2">
                    {property.likes > 500 && (
                      <img
                        src={populerTag}
                        className="absolute top-[-15px] left-[-8px]"
                      ></img>
                    )}

                    <div className="w-full px-4 pt-4 flex text-base font-semibold leading-[150%] spacing-[-1%] ">
                      <span className="text-[#000929] group-hover:text-white">
                        {property.propertyName.length > 26
                          ? `${property.propertyName.slice(0, 25)}...`
                          : property.propertyName}
                      </span>
                    </div>

                    <div className="w-full px-4 flex gap-2 text-sm font-semibold">
                      <span className="text-[#076300] group-hover:text-white">
                        {property.propertyCategory}
                      </span>
                      <span className="text-[#076300] group-hover:text-white">
                        {property.propertyType?.length > 16
                          ? `${property.propertyType?.slice(0, 15)}...`
                          : property.propertyType}
                      </span>
                    </div>

                    <div className="w-full px-4 flex flex-col items-center justify-between">
                      <div className="w-full flex justify-between gap-2 text-base lg:text-xl font-extrabold">
                        <div
                          className={`${
                            property.propertyCategory === "RentalFlat" ||
                            property.propertyCategory === "RentalShop" ||
                            property.propertyCategory === "RentalOffice" ||
                            property.loanAvailability === "No"
                              ? "hidden"
                              : "flex"
                          } text-black gap-1 items-center justify-center `}
                        >
                          EMI <FormatPrice price={property.emi} />
                          /m
                        </div>
                        <div className="text-black flex flex-col gap-1 items-start justify-center ">
                          <span className="text-[#00000066] line-through text-xs font-medium ">
                            <FormatPrice
                              price={Math.floor(property.totalSalesPrice)}
                            />
                          </span>
                          <FormatPrice price={property.totalOfferPrice} />
                          <span
                            onClick={() => {
                              setShowPriceSummery(true);
                              setPriceSummery(property);
                            }}
                            className="text-[#00000066] underline text-xs font-medium cursor-pointer "
                          >
                            +Other Charged
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 px-4 text-[10px] md:text-xs font-medium  text-[#00092966] group-hover:text-[#e2e2e2] mt-2">
                      <div
                        className={`${
                          property.propertyCategory === "FarmLand"
                            ? "hidden"
                            : "flex"
                        } py-1 px-3 gap-1 items-center justify-center text-gray-600 bg-[#eeffec] rounded-xl `}
                      >
                        <IoMdDoneAll className="w-[17px] h-[17px] text-green-700" />
                        <span>{property.propertyApprovedBy}</span>
                      </div>

                      <div
                        className={`py-1 px-3 gap-1 items-center justify-center text-gray-600 bg-[#eeffec] rounded-xl ${
                          ["NewFlat", "NewPlot"].includes(
                            property.propertyCategory
                          )
                            ? "flex"
                            : "hidden"
                        }`}
                      >
                        <IoMdDoneAll className="w-[17px] h-[17px] text-green-700" />
                        <span>RERA Approved</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 px-4 text-[10px] md:text-xs font-medium  text-[#00092966] group-hover:text-[#e2e2e2]">
                      <div className="py-1 px-3 bg-[#0000000F] rounded-xl ">
                        {property.distanceFromCityCenter} KM Distance from city
                        center
                      </div>
                    </div>
                    <hr className="text-[#F0EFFB] my-2 " />
                    <div className="w-full flex px-4 justify-between mb-1">
                      <img src={cardAssuredTag} alt="" className="w-40" />
                      <div className="text-sm py-1 px-3 bg-[#0000000F] rounded-xl ">
                        {property.propertyCategory}
                      </div>
                    </div>
                    <div className="w-full flex gap-1 items-center justify-start py-3 px-4 rounded-bl-lg rounded-br-lg address text-[10px] md:text-xs lg:text-sm font-normal text-[#808080] group-hover:text-[#e2e2e2] bg-[#0000000F] ">
                      <CiLocationOn className="text-[#07630066] group-hover:text-white w-5 h-5" />
                      <p className="text-[#808080] ">
                        {property.location.length > 25
                          ? `${property.location.slice(0, 24)}...`
                          : property.location}
                        , {property.city}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-2xl font-bold m-4">No Properties Found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
