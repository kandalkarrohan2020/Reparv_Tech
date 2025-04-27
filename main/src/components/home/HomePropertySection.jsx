import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineKingBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { FaDiamond } from "react-icons/fa6";
import populerTag from "../../assets/property/populerTag.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormatPrice from "../FormatPrice";
import { useAuth } from "../../store/auth";

function HomePropertySection({ city }) {
  const navigate = useNavigate();
  const { URI } = useAuth();
  const [properties, setProperties] = useState([]);

  // fetch Properties
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/properties/${city}`, {
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

  useEffect(() => {
    fetchData();
  }, [city]);

  return (
    <div className="flex flex-col items-center p-4 gap-2 lg:pt-25 pb-5 md:pb-15">
      <h2 className="text-[20px] sm:text-[28px] leading-6 md:leading-15 font-medium text-black ">
        Property Nearest To You
      </h2>
      <div className=" HomeProperties w-full max-w-[1135px] overflow-scroll scrollbar-hide grid place-items-center grid-flow-col gap-6 py-4 px-1 sm:p-5">
        {properties.map((property) => (
          <div
            onClick={() => navigate(`/property-info/${property.propertyid}`)}
            key={property.propertyid}
            className="w-[350px] group border border-[#00000033] rounded-lg shadow-md bg-white hover:bg-[#076300] overflow-hidden"
          >
            <img
              src={`${URI}${property.image}`}
              alt={property.name}
              className=" object-cover h-[200px] w-full"
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
                    <FormatPrice price={property.sqft_price} />
                  </div>
                  <h2 className="text-[#000929] group-hover:text-white ml-1">
                    {property.property_name.length > 16
                      ? `${property.property_name.slice(0, 15)}...`
                      : property.property_name}
                  </h2>
                </div>
              </div>

              <div className="address text-[10px] md:text-xs lg:text-base font-normal px-3">
                <p className="text-[#808080] group-hover:text-[#e2e2e2]">
                  {property.location.length > 16
                    ? `${property.location.slice(0, 15)}...`
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
        ))}
      </div>
    </div>
  );
}

export default HomePropertySection;
